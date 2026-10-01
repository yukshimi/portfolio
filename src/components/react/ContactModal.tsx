import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEventHandler } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const TITLE_ID = "contact-modal-title";
const DEFAULT_ERROR_MESSAGE =
  "送信に失敗しました。時間をおいて再度お試しください。";

/** サーバーのステータスコードを、ユーザー向けのメッセージに変換する */
function toErrorMessage(status: number): string {
  if (status === 400) return "入力内容をご確認ください。";
  if (status === 403) return "認証に失敗しました。もう一度お試しください。";
  return DEFAULT_ERROR_MESSAGE;
}

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

  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  const showTurnstile = Boolean(turnstileSiteKey);

  const close = useCallback(() => {
    const shouldGoHome = status === "sent";
    setIsOpen(false);
    setStatus("idle");
    setErrorMessage("");
    window.turnstile?.reset?.();
    if (shouldGoHome) window.location.assign("/");
  }, [status]);

  const fail = (message: string = DEFAULT_ERROR_MESSAGE) => {
    setStatus("error");
    setErrorMessage(message);
    window.turnstile?.reset?.();
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
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
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

      // サーバーのエラー本文はそのまま表示せず、ステータスから文言を決める
      if (!res.ok) {
        fail(toErrorMessage(res.status));
        return;
      }

      const json = (await res.json()) as { ok?: boolean };
      if (json.ok) {
        setStatus("sent");
        form.reset();
        window.turnstile?.reset?.();
        return;
      }

      fail();
    } catch {
      fail();
    }
  };

  return (
    // 閉じている間は inert でフォーカス・クリック・読み上げの対象から外す
    // （React 18 は inert を真偽値で扱えないため、空文字の属性として付与する）
    <div aria-hidden={!isOpen} {...(isOpen ? {} : { inert: "" })}>
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
            role="dialog"
            aria-modal="true"
            aria-labelledby={TITLE_ID}
            className={[
              "w-full max-w-[720px] rounded-[1.5rem] bg-white border border-line",
              "shadow-[0_20px_80px_rgba(0,0,0,0.18)]",
              "max-h-[85vh] overflow-auto",
              "transition-transform duration-200",
              isOpen ? "scale-100" : "scale-[0.98]",
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-4 p-6 border-b border-line">
              <h2 id={TITLE_ID}>Contact</h2>
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
                  <p role="status" className="opacity-50 leading-8">
                    送信しました。ありがとうございます。
                  </p>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={close}
                      className="text-small font-semibold px-4 py-[0.6rem] rounded-[8rem] bg-line hover:scale-105 transition-all duration-200"
                    >
                      閉じる
                    </button>
                  </div>
                </div>
              )}
              {status === "error" && (
                <p role="alert" className="opacity-50 leading-8">
                  {errorMessage || DEFAULT_ERROR_MESSAGE}
                </p>
              )}

              {status !== "sent" && (
                <form
                  method="POST"
                  action="/api/contact"
                  onSubmit={onSubmit}
                  className="flex flex-col gap-thin-gap"
                >
                  <label className="flex flex-col gap-1.5">
                    <small className="opacity-50">お名前</small>
                    <input
                      ref={firstInputRef}
                      type="text"
                      name="name"
                      required
                      className="w-full rounded-[1rem] border border-line bg-white px-4 py-3"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <small className="opacity-50">メールアドレス</small>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full rounded-[1rem] border border-line bg-white px-4 py-3"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
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
                        "text-small font-semibold w-full max-w-[420px] px-4 py-[0.6rem] rounded-[8rem] text-white bg-dark hover:scale-105 transition-all duration-200",
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
