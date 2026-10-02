import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import Sheet from "@/components/ikea/Sheet";
import IkeaMan from "@/components/ikea/IkeaMan";
import { HEAD_CX, HEAD_CY, HEAD_RX, HEAD_RY, NECK, NOSE, SHOE, TORSO } from "@/components/ikea/geometry";
import { TurnArrow } from "@/components/ikea/parts";
import { useReducedMotion } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { capabilities } from "@/data/cv";

/*
 * Sprengskisse: the man comes in pieces and is put together by scrolling.
 * The section is tall; the drawing sticks to the screen while the scroll
 * position inside the section drives every part from its exploded spot to
 * where it belongs. No React re-render per frame: transforms are written
 * straight to the DOM, state only changes when a part clicks into place.
 */

type Pt = [number, number];

const INK = "var(--ink)";
const PAPER = "var(--sheet)";

const Tube = ({ pts, kind, hand }: { pts: Pt[]; kind: "arm" | "leg"; hand?: Pt }) => {
  const d = "M" + pts.map((p) => p.join(" ")).join("L");
  const [outer, inner] = kind === "arm" ? [12.2, 7.2] : [17, 12];
  return (
    <>
      <path d={d} fill="none" stroke={INK} strokeWidth={outer} strokeLinecap="round" strokeLinejoin="round" />
      {hand ? <circle cx={hand[0]} cy={hand[1]} r={7.6} fill={INK} /> : null}
      <path d={d} fill="none" stroke={PAPER} strokeWidth={inner} strokeLinecap="round" strokeLinejoin="round" />
      {hand ? <circle cx={hand[0]} cy={hand[1]} r={5.1} fill={PAPER} /> : null}
    </>
  );
};

const Shoe = ({ at, angle }: { at: Pt; angle: number }) => (
  <path
    d={SHOE}
    transform={`translate(${at[0]} ${at[1]}) rotate(${angle})`}
    fill={PAPER}
    stroke={INK}
    strokeWidth={2.5}
    strokeLinejoin="round"
  />
);

const Badge = ({ x, y, letter }: { x: number; y: number; letter: string }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={11.5} fill="var(--yellow)" stroke={INK} strokeWidth={2.5} />
    <text y={5} textAnchor="middle" fontSize={14} fontWeight={900} fill={INK}>
      {letter}
    </text>
  </g>
);

interface PartDef {
  key: string;
  /** Joint the part rotates around and attaches to. */
  at: Pt;
  /** Exploded offset and rotation. */
  off: Pt;
  rot: number;
  /** Scroll window (0..1) in which the part travels. */
  from: number;
  to: number;
  draw: ReactNode;
  /** Letter badge, placed in assembled coordinates. Follows the part but never rotates. */
  badge?: { letter: string; pos: Pt };
}

const PARTS: PartDef[] = [
  {
    key: "armB",
    at: [1, -50],
    off: [-166, -38],
    rot: -32,
    from: 0.5,
    to: 0.66,
    draw: <Tube kind="arm" pts={[[1, -50], [-2.9, -22.27], [-1.99, 3.71]]} hand={[-1.92, 5.71]} />,
  },
  {
    key: "legs",
    at: [0, 0],
    off: [76, 34],
    rot: 14,
    from: 0.1,
    to: 0.28,
    draw: (
      <>
        <Tube kind="leg" pts={[[-4, -2], [-6.65, 35.9], [-10.3, 70.7]]} />
        <Shoe at={[-10.3, 70.7]} angle={6} />
        <Tube kind="leg" pts={[[4, -2], [5.99, 35.95], [5.99, 70.95]]} />
        <Shoe at={[5.99, 70.95]} angle={0} />
      </>
    ),
    badge: { letter: "A", pos: [-34, 44] },
  },
  {
    key: "torso",
    at: [0, 0],
    off: [-104, 4],
    rot: -16,
    from: 0.28,
    to: 0.46,
    draw: <path d={TORSO} fill={PAPER} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />,
    badge: { letter: "B", pos: [-36, -28] },
  },
  {
    key: "head",
    at: [NECK.x, NECK.y],
    off: [0, -74],
    rot: 540,
    from: 0.68,
    to: 0.86,
    draw: (
      <>
        <g transform={`translate(${NECK.x} ${NECK.y})`}>
          <ellipse cx={HEAD_CX} cy={HEAD_CY} rx={HEAD_RX} ry={HEAD_RY} fill={PAPER} stroke={INK} strokeWidth={2.5} />
          <path d={NOSE} fill={PAPER} stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
        </g>
      </>
    ),
    badge: { letter: "D", pos: [-32, -98] },
  },
  {
    key: "armF",
    at: [1, -50],
    off: [98, -34],
    rot: 42,
    from: 0.48,
    to: 0.66,
    draw: <Tube kind="arm" pts={[[1, -50], [2.95, -22.07], [10.12, 2.92]]} hand={[10.67, 4.85]} />,
    badge: { letter: "C", pos: [34, -16] },
  },
];

/* Where each "KLIKK!" shows up, in figure space, by capability index (A..D). */
const CLICKS: Pt[] = [
  [-54, 14],
  [44, -26],
  [42, -60],
  [-50, -66],
];

/* Which parts belong to which capability card (A..D). */
const CARD_PARTS = [["legs"], ["torso"], ["armF", "armB"], ["head"]];

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const SCALE = 1.45;

const ExplodedView = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const partRefs = useRef<Record<string, SVGGElement | null>>({});
  const guideRefs = useRef<Record<string, SVGPathElement | null>>({});
  const badgeRefs = useRef<Record<string, SVGGElement | null>>({});
  const turnRef = useRef<SVGGElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [attached, setAttached] = useState(0);
  const [current, setCurrent] = useState(-1);
  const [done, setDone] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const apply = (p: number) => {
      const ts: Record<string, number> = {};
      for (const part of PARTS) {
        const t = ease(clamp((p - part.from) / (part.to - part.from)));
        ts[part.key] = t;
        const el = partRefs.current[part.key];
        if (el) {
          const k = 1 - t;
          el.style.transform = `translate(${part.off[0] * k}px, ${part.off[1] * k}px) rotate(${part.rot * k}deg)`;
        }
        const guide = guideRefs.current[part.key];
        if (guide) guide.style.opacity = String(Math.min(1, (1 - t) * 1.6));
        const badge = badgeRefs.current[part.key];
        if (badge) {
          const k = 1 - t;
          badge.style.transform = `translate(${part.off[0] * k}px, ${part.off[1] * k}px)`;
          badge.style.opacity = String(Math.min(1, (1 - t) * 2.2));
        }
      }
      if (turnRef.current) {
        const th = ts.head;
        turnRef.current.style.opacity = th > 0.02 && th < 0.98 ? "1" : "0";
      }

      const count = CARD_PARTS.filter((keys) => keys.every((k) => ts[k] >= 0.999)).length;
      const moving = CARD_PARTS.findIndex((keys) => keys.some((k) => ts[k] > 0.001 && ts[k] < 0.999));
      setAttached(count);
      setCurrent(moving >= 0 ? moving : count > 0 ? count - 1 : -1);
      setDone(p >= 0.9);

      const pct = Math.round(clamp((p - 0.1) / 0.76) * 100);
      if (percentRef.current) percentRef.current.textContent = `${pct} %`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${pct / 100})`;
    };

    if (reduced) {
      apply(1);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      apply(total > 0 ? clamp(-rect.top / total) : 1);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <Sheet
      id="sprengskisse"
      page={4}
      title="Sprengskisse"
      lead="Scroll for å montere. Delene klikker på plass av seg selv. Det gjør de aldri i virkeligheten, men dette er nettet."
    >
      <div ref={trackRef} className={cn("explode-track", reduced && "is-static")}>
        <div className="explode-stage">
          <div className="explode-figure">
            <svg viewBox="-275 -258 470 424" className="scene is-drawn explode-svg" role="img" aria-label="Sprengskisse av HUSBY: bein, overkropp, armer og hode som monteres sammen">
              <g transform={`scale(${SCALE})`}>
                {/* dashed assembly guides */}
                {PARTS.map((part) => (
                  <path
                    key={`g-${part.key}`}
                    ref={(el) => {
                      guideRefs.current[part.key] = el;
                    }}
                    d={`M${part.at[0] + part.off[0]} ${part.at[1] + part.off[1]} L${part.at[0]} ${part.at[1]}`}
                    className="explode-guide"
                  />
                ))}

                <g className={cn("explode-parts", done && "is-hidden")}>
                  {PARTS.map((part) => (
                    <g key={part.key} transform={`translate(${part.at[0]} ${part.at[1]})`}>
                      <g
                        ref={(el) => {
                          partRefs.current[part.key] = el;
                        }}
                        className="explode-part"
                      >
                        <g transform={`translate(${-part.at[0]} ${-part.at[1]})`}>{part.draw}</g>
                      </g>
                    </g>
                  ))}
                </g>

                {PARTS.filter((part) => part.badge).map((part) => (
                  <g key={`b-${part.key}`} transform={`translate(${part.badge!.pos[0]} ${part.badge!.pos[1]})`}>
                    <g
                      ref={(el) => {
                        badgeRefs.current[part.key] = el;
                      }}
                      className="explode-part"
                    >
                      <Badge x={0} y={0} letter={part.badge!.letter} />
                    </g>
                  </g>
                ))}

                {/* the finished, living version takes over at the end */}
                <g className={cn("explode-live", done && "is-visible")}>
                  <IkeaMan pose={done ? "present" : "stand"} anim={done ? "wave" : undefined} />
                </g>

                <g ref={turnRef} className="explode-turn" style={{ opacity: 0 }}>
                  <TurnArrow x={NECK.x} y={NECK.y - 20} radius={34} from={-150} to={110} />
                </g>

                {CLICKS.map(([cx, cy], i) => (
                  <g key={i} transform={`translate(${cx} ${cy})`}>
                    <g className={cn("explode-click", attached > i && "is-on")}>
                      <path d="M-4 -14l-4 -7M4 -15l1 -8M11 -12l5 -6" stroke={INK} strokeWidth={1.6} strokeLinecap="round" />
                      <text y={4} textAnchor="middle" fontSize={12.5} fontWeight={800} fill={INK} letterSpacing="0.04em">
                        KLIKK!
                      </text>
                    </g>
                  </g>
                ))}
              </g>
            </svg>
            <div className={cn("explode-stamp", done && "is-on")} aria-hidden={!done}>
              Ferdig montert
            </div>
          </div>

          <div className="explode-side">
            <p className={cn("explode-hint", current >= 0 && "is-hidden")} aria-hidden="true">
              Scroll videre for å starte monteringen.
            </p>
            <ol className="explode-cards">
              {capabilities.map((c, i) => (
                <li
                  key={c.key}
                  className={cn("explode-card", i === current && "is-active", i < attached && "is-done")}
                  style={{ "--i": i } as CSSProperties}
                >
                  <span className="explode-letter" aria-hidden="true">
                    {c.key}
                  </span>
                  <div>
                    <p className="explode-kicker">
                      Del {c.key}: {c.part}
                    </p>
                    <h3 className="explode-title">{c.title}</h3>
                    <p className="explode-text">{c.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="explode-meter" aria-hidden="true">
              <span className="explode-meter-label">Monteringsgrad</span>
              <span className="explode-meter-bar">
                <span ref={barRef} />
              </span>
              <span ref={percentRef} className="explode-meter-value">
                0 %
              </span>
            </p>
          </div>
        </div>
      </div>
    </Sheet>
  );
};

export default ExplodedView;
