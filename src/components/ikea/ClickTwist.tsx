import { useEffect } from "react";

/*
 * Every click gets the little "turn" arrow from the manuals, as if the
 * cursor (an Allen key) just tightened something. Mouse only, and not with
 * reduced motion.
 */
const ClickTwist = () => {
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      const el = document.createElement("div");
      el.className = "click-twist";
      el.setAttribute("aria-hidden", "true");
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      el.innerHTML =
        '<svg viewBox="-20 -20 40 40"><path d="M-12.6 -6.1 A14 14 0 1 1 -6.1 12.6" fill="none" stroke="#151515" stroke-width="2.6" stroke-linecap="round"/><path d="M-11.5 18.2 L-3.6 14.3 L-9.4 7.9 Z" fill="#151515"/></svg>';
      el.addEventListener("animationend", () => el.remove());
      document.body.appendChild(el);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);
  return null;
};

export default ClickTwist;
