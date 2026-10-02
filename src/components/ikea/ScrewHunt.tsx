import { CSSProperties, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Hunt, HuntContext, SCREW_IDS, ScrewId, useScrewHunt } from "./hunt-context";

/*
 * Easter egg: five loose screws are hidden around the manual. Click one and
 * it flies up to the counter in the menu. Find all five and HUSBY is,
 * for the first time in flat-pack history, complete.
 */

const STORAGE_KEY = "husby-screws";

const readStored = (): ScrewId[] => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id): id is ScrewId => SCREW_IDS.includes(id)) : [];
  } catch {
    return [];
  }
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export const ScrewIcon = ({ className, style }: { className?: string; style?: CSSProperties }) => (
  <svg viewBox="-16 -16 32 32" className={className} style={style} aria-hidden="true" focusable="false">
    <g transform="rotate(-35)">
      <path
        d="M-2.8 -6 V7 L0 13 L2.8 7 V-6"
        fill="#fff"
        stroke="#151515"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M-2.8 -1.4 L2.8 -3.2 M-2.8 2.6 L2.8 0.8 M-2.8 6.6 L2.8 4.8" stroke="#151515" strokeWidth="1" />
      <path
        d="M-7 -6 C-7 -10 -4 -11.5 0 -11.5 C4 -11.5 7 -10 7 -6 Z"
        fill="#fff"
        stroke="#151515"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M-2.6 -8.6 H2.6" stroke="#151515" strokeWidth="1.4" />
    </g>
  </svg>
);

export const ScrewHuntProvider = ({ children }: { children: ReactNode }) => {
  const [found, setFound] = useState<ScrewId[]>([]);
  const [flying, setFlying] = useState<ScrewId[]>([]);
  const [bump, setBump] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => setFound(readStored()), []);

  const total = SCREW_IDS.length;

  const finish = useCallback(
    (id: ScrewId) => {
      setFound((prev) => {
        if (prev.includes(id)) return prev;
        const next = [...prev, id];
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* private mode, the hunt just won't be remembered */
        }
        if (next.length === total) window.setTimeout(() => setCelebrate(true), 350);
        return next;
      });
      setFlying((prev) => prev.filter((f) => f !== id));
      setBump((b) => b + 1);
    },
    [total],
  );

  const collect = useCallback(
    (id: ScrewId, from: DOMRect) => {
      if (found.includes(id) || flying.includes(id)) return;
      setFlying((prev) => [...prev, id]);

      const target = counterRef.current?.getBoundingClientRect();
      if (!target || prefersReducedMotion()) {
        finish(id);
        return;
      }

      const flyer = document.createElement("div");
      flyer.className = "screw-flyer";
      flyer.setAttribute("aria-hidden", "true");
      flyer.innerHTML =
        '<svg viewBox="-16 -16 32 32"><g transform="rotate(-35)"><path d="M-2.8 -6 V7 L0 13 L2.8 7 V-6" fill="#fff" stroke="#151515" stroke-width="2" stroke-linejoin="round"/><path d="M-7 -6 C-7 -10 -4 -11.5 0 -11.5 C4 -11.5 7 -10 7 -6 Z" fill="#fff" stroke="#151515" stroke-width="2" stroke-linejoin="round"/></g></svg>';
      document.body.appendChild(flyer);

      const sx = from.left + from.width / 2 - 16;
      const sy = from.top + from.height / 2 - 16;
      const ex = target.left + 2;
      const ey = target.top + target.height / 2 - 16;
      const mx = (sx + ex) / 2 + (ex > sx ? -60 : 60);
      const my = Math.min(sy, ey) - 140;

      const anim = flyer.animate(
        [
          { transform: `translate(${sx}px, ${sy}px) rotate(0deg) scale(1)` },
          { transform: `translate(${sx}px, ${sy - 30}px) rotate(220deg) scale(1.6)`, offset: 0.18 },
          { transform: `translate(${mx}px, ${my}px) rotate(560deg) scale(1.4)`, offset: 0.55 },
          { transform: `translate(${ex}px, ${ey}px) rotate(1080deg) scale(0.7)` },
        ],
        { duration: 1100, easing: "cubic-bezier(.45,.05,.35,1)", fill: "forwards" },
      );
      anim.onfinish = () => {
        flyer.remove();
        finish(id);
      };
    },
    [found, flying, finish],
  );

  const isGone = useCallback((id: ScrewId) => found.includes(id) || flying.includes(id), [found, flying]);

  const value = useMemo<Hunt>(
    () => ({
      found,
      total,
      isGone,
      collect,
      counterRef,
      bump,
      celebrate,
      closeCelebration: () => setCelebrate(false),
    }),
    [found, total, isGone, collect, bump, celebrate],
  );

  return <HuntContext.Provider value={value}>{children}</HuntContext.Provider>;
};

/**
 * A loose screw positioned on top of a scene. x and y are percentages of
 * the wrapper, so they line up with the SVG coordinates of the drawing.
 */
export const HiddenScrew = ({
  id,
  x,
  y,
  rotate = 0,
  size = 30,
  className,
}: {
  id: ScrewId;
  x: number;
  y: number;
  rotate?: number;
  size?: number;
  className?: string;
}) => {
  const { isGone, collect, found, total } = useScrewHunt();
  const ref = useRef<HTMLButtonElement>(null);
  if (isGone(id)) return null;
  return (
    <button
      ref={ref}
      type="button"
      className={cn("hidden-screw", className)}
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, "--r": `${rotate}deg` } as CSSProperties}
      aria-label={`En løs skrue. Plukk den opp. Funnet ${found.length} av ${total}.`}
      title="En løs skrue?"
      onClick={() => ref.current && collect(id, ref.current.getBoundingClientRect())}
    >
      <ScrewIcon />
    </button>
  );
};

export const ScrewCounter = () => {
  const { found, total, counterRef, bump } = useScrewHunt();
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    if (!bump) return;
    setAnim(true);
    const t = window.setTimeout(() => setAnim(false), 600);
    return () => window.clearTimeout(t);
  }, [bump]);

  return (
    <div
      ref={counterRef}
      className={cn("screw-counter", anim && "is-bumping", found.length === total && "is-complete")}
      title="Det ligger fem løse skruer rundt omkring i anvisningen. Finner du dem?"
    >
      <ScrewIcon className="screw-counter-icon" />
      <span className="tabular" aria-hidden="true">
        {found.length}/{total}
      </span>
      <span className="sr-only" aria-live="polite">
        {found.length} av {total} løse skruer funnet
      </span>
    </div>
  );
};
