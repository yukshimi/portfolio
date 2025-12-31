import { useEffect, useMemo, useRef, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

interface Props {
  turnstileSiteKey?: string;
}

declare global {
  interface Window {
    turnstile?: { reset: () => void };
  }
}

function ensureTurnstileScriptLoaded() {
  const id = "cf-turnstile-script";
  if (document.getElementById(id)) return;

  const script = document.createElement("script");
  script.id = id;
  script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

export default function ContactModal({ turnstileSiteKey }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  const showTurnstile = Boolean(turnstileSiteKey);

  const titleId = useMemo(() => "contact-modal-title", []);

  const close = () => {
    const shouldGoHome = status === "sent";
    setIsOpen(false);
    setStatus("idle");
    setErrorMessage("");
    window.turnstile?.reset?.();
    if (shouldGoHome) window.location.assign("/");
  };

  useEffect(() => {
    if (!showTurnstile) return;
    ensureTurnstileScriptLoaded();
  }, [showTurnstile]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const trigger = target.closest(
        "[data-contact-open]",
      ) as HTMLElement | null;
      if (!trigger) return;

      e.preventDefault();
      lastActiveRef.current = document.activeElement as HTMLElement | null;
      setIsOpen(true);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus after paint
    requestAnimationFrame(() => firstInputRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      lastActiveRef.current?.focus?.();
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          "X-Contact-Modal": "1",
        },
      });

      if (!res.ok) {
        const text = await res.text();
        setStatus("error");
        setErrorMessage(text || "送信に失敗しました。");
        window.turnstile?.reset?.();
        return;
      }

      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (json.ok) {
        setStatus("sent");
        form.reset();
        window.turnstile?.reset?.();
        return;
      }

      setStatus("error");
      setErrorMessage(json.error || "送信に失敗しました。");
      window.turnstile?.reset?.();
    } catch {
      setStatus("error");
      setErrorMessage("送信に失敗しました。");
      window.turnstile?.reset?.();
    }
  };

  return (
    <div aria-hidden={!isOpen}>
      <div
        className={[
          "fixed inset-0 z-[9999] transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div
          className="absolute inset-0 bg-dark/50"
          onClick={close}
          aria-hidden="true"
        />

        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={[
              "w-full max-w-[720px] rounded-[1.5rem] bg-white border border-line",
              "shadow-[0_20px_80px_rgba(0,0,0,0.18)]",
              "max-h-[85vh] overflow-auto",
              "transition-transform duration-200",
              isOpen ? "scale-100" : "scale-[0.98]",
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-4 p-6 border-b border-line">
              <h2 id={titleId}>Contact</h2>
              <button
                type="button"
                onClick={close}
                className="w-10 h-10 grid place-items-center bg-transparent hover:opacity-60 transition-opacity duration-200"
                aria-label="Close"
              >
                <span aria-hidden="true" className="text-[1.4rem] leading-none">
                  ×
                </span>
              </button>
            </div>

            <div className="p-6 flex flex-col gap-thin-gap">
              {status === "sent" && (
                <div className="flex flex-col gap-thin-gap">
                  <p className="opacity-50 leading-8">
                    送信しました。ありがとうございます。
                  </p>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={close}
                      className="text-small font-semibold px-[calc(var(--thin-gap)/1.5)] py-[calc(var(--thin-gap)/2.5)] rounded-[8rem] bg-line hover:scale-105 transition-all duration-200"
                    >
                      閉じる
                    </button>
                  </div>
                </div>
              )}
              {status === "error" && (
                <p className="opacity-50 leading-8">
                  {errorMessage || "送信に失敗しました。"}
                </p>
              )}

              {status !== "sent" && (
                <form
                  method="POST"
                  action="/api/contact"
                  onSubmit={onSubmit}
                  className="flex flex-col gap-thin-gap"
                >
                  <label className="flex flex-col gap-[calc(var(--thin-gap)/4)]">
                    <small className="opacity-50">お名前</small>
                    <input
                      ref={firstInputRef}
                      type="text"
                      name="name"
                      required
                      className="w-full rounded-[1rem] border border-line bg-white px-4 py-3"
                    />
                  </label>

                  <label className="flex flex-col gap-[calc(var(--thin-gap)/4)]">
                    <small className="opacity-50">メールアドレス</small>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full rounded-[1rem] border border-line bg-white px-4 py-3"
                    />
                  </label>

                  <label className="flex flex-col gap-[calc(var(--thin-gap)/4)]">
                    <small className="opacity-50">メッセージ</small>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      className="w-full rounded-[1rem] border border-line bg-white px-4 py-3"
                    ></textarea>
                  </label>

                  {/* Honeypot (bots only) */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                  />

                  {showTurnstile && (
                    <div
                      className="cf-turnstile"
                      data-sitekey={turnstileSiteKey}
                    />
                  )}

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className={[
                        "text-small font-semibold w-full max-w-[420px] px-[calc(var(--thin-gap)/1.5)] py-[calc(var(--thin-gap)/2.5)] rounded-[8rem] text-white bg-dark hover:scale-105 transition-all duration-200",
                        status === "sending"
                          ? "opacity-50 pointer-events-none"
                          : "",
                      ].join(" ")}
                    >
                      {status === "sending" ? "送信中…" : "送信"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
