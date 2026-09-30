/**
 * スクロールで要素をフェードインさせる（[data-reveal] が対象）
 */
function initReveal() {
  // Markdown本文（<Content />）の直下要素もリビール対象にする
  document.querySelectorAll<HTMLElement>(".work-markdown > *").forEach((el) => {
    el.setAttribute("data-reveal", "true");
    el.style.setProperty("--reveal-delay", "0ms");
  });

  const targets = document.querySelectorAll("[data-reveal]:not(.is-revealed)");
  if (!targets.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
  );

  targets.forEach((el) => observer.observe(el));
}

// 初回ロード時と、View Transitions によるページ遷移後の両方で発火する
document.addEventListener("astro:page-load", initReveal);
