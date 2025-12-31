type Env = {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
  TURNSTILE_SECRET_KEY?: string;
};

type Context = {
  request: Request;
  env: Env;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function parseBody(request: Request): Promise<Record<string, string>> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const json = (await request.json()) as Record<string, unknown>;
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(json)) out[k] = String(v ?? "");
    return out;
  }

  const form = await request.formData();
  const out: Record<string, string> = {};
  for (const [k, v] of form.entries()) out[k] = String(v ?? "");
  return out;
}

async function verifyTurnstile(params: {
  secret: string;
  token: string;
  ip?: string | null;
}): Promise<boolean> {
  const body = new URLSearchParams({
    secret: params.secret,
    response: params.token,
  });

  if (params.ip) body.set("remoteip", params.ip);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body },
  );

  if (!res.ok) return false;

  const json = (await res.json()) as { success?: boolean };
  return json.success === true;
}

export const onRequestPost = async ({
  request,
  env,
}: Context): Promise<Response> => {
  const data = await parseBody(request);

  // Honeypot: bots tend to fill hidden fields.
  if ((data.company ?? "").trim() !== "") {
    return new Response("ok", { status: 200 });
  }

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const message = (data.message ?? "").trim();

  if (!name || !email || !message) {
    return new Response("Bad Request", { status: 400 });
  }
  if (!isValidEmail(email)) {
    return new Response("Bad Request", { status: 400 });
  }
  if (name.length > 200 || email.length > 320 || message.length > 5000) {
    return new Response("Bad Request", { status: 400 });
  }

  const turnstileSecret = (env.TURNSTILE_SECRET_KEY ?? "").trim();
  if (turnstileSecret) {
    const token = (data["cf-turnstile-response"] ?? "").trim();
    if (!token) return new Response("Forbidden", { status: 403 });

    const ip = request.headers.get("CF-Connecting-IP");
    const ok = await verifyTurnstile({ secret: turnstileSecret, token, ip });
    if (!ok) return new Response("Forbidden", { status: 403 });
  }

  const resendApiKey = (env.RESEND_API_KEY ?? "").trim();
  if (!resendApiKey) {
    return new Response("Server Misconfigured", { status: 500 });
  }

  const to = (env.CONTACT_TO ?? "yukish1013@gmail.com").trim();
  const from = (env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>").trim();

  const sendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Contact from ${name}`,
      text: `name: ${name}\nemail: ${email}\n\n${message}`,
      reply_to: email,
    }),
  });

  const referer = request.headers.get("Referer");
  const fallback = new URL("https://example.invalid/");
  const targetUrl = (() => {
    try {
      return referer ? new URL(referer) : fallback;
    } catch {
      return fallback;
    }
  })();

  // Always land back at the contact section.
  targetUrl.hash = "#contact";
  targetUrl.searchParams.set(sendRes.ok ? "sent" : "error", "1");

  const location =
    targetUrl.origin === fallback.origin
      ? `/${sendRes.ok ? "?sent=1#contact" : "?error=1#contact"}`
      : `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`;

  return new Response(null, {
    status: 303,
    headers: { Location: location },
  });
};
