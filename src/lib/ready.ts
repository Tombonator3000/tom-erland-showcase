/*
 * The unboxing intro plays once per browser session. While it runs, the
 * scenes underneath should not start drawing themselves, so useInView
 * waits for the "ready" signal before it starts observing.
 */

const KEY = "husby-unboxed";
const EVENT = "husby:ready";

export const shouldUnbox = () => {
  try {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
    return window.sessionStorage.getItem(KEY) !== "1";
  } catch {
    return false;
  }
};

export const isReady = () => document.documentElement.dataset.ready !== "false";

export const holdReady = () => {
  document.documentElement.dataset.ready = "false";
};

export const markReady = () => {
  try {
    window.sessionStorage.setItem(KEY, "1");
  } catch {
    /* ignore */
  }
  document.documentElement.dataset.ready = "true";
  window.dispatchEvent(new Event(EVENT));
};

export const onReady = (cb: () => void) => {
  if (isReady()) {
    cb();
    return () => {};
  }
  window.addEventListener(EVENT, cb, { once: true });
  return () => window.removeEventListener(EVENT, cb);
};
