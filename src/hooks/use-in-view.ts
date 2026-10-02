import { useEffect, useRef, useState } from "react";
import { onReady } from "@/lib/ready";

/**
 * Tracks whether an element is on screen.
 * `seen` flips to true the first time it shows up and stays true,
 * `inView` follows the element in and out of the viewport.
 */
export function useInView<T extends Element>(threshold = 0.25, rootMargin = "0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setSeen(true);
      },
      { threshold, rootMargin },
    );
    // Wait for the unboxing intro, otherwise the cover draws itself behind it.
    const stop = onReady(() => io.observe(el));
    return () => {
      stop();
      io.disconnect();
    };
  }, [threshold, rootMargin]);

  return { ref, inView, seen };
}

/** True once `ms` milliseconds have passed after `flag` became true. */
export function useAfter(flag: boolean, ms: number) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!flag) return;
    const t = window.setTimeout(() => setDone(true), ms);
    return () => window.clearTimeout(t);
  }, [flag, ms]);
  return done;
}

/**
 * Steps through a list of phase durations (ms) while `active` is true.
 * Returns the index of the current phase. With `loop` it starts over.
 */
export function useTimeline(active: boolean, durations: number[], loop = false) {
  const [phase, setPhase] = useState(0);
  const key = durations.join(",");

  useEffect(() => {
    if (!active) return;
    const steps = key.split(",").map(Number);
    if (phase >= steps.length - 1 && !loop) return;
    const t = window.setTimeout(() => setPhase((p) => (p + 1) % steps.length), steps[phase]);
    return () => window.clearTimeout(t);
  }, [active, phase, key, loop]);

  return phase;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

/** Width of an element in CSS pixels, kept up to date with ResizeObserver. */
export function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(el.clientWidth);
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, width };
}

/** Counts from 0 to `target` once `active` turns true. */
export function useCountUp(target: number, active: boolean, duration = 1400, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t + delay;
      const p = Math.min(1, Math.max(0, (t - start) / duration));
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [target, active, duration, delay]);
  return value;
}
