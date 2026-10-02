import { CSSProperties, ReactNode } from "react";
import { At, P, Reveal } from "./svg";
import { arc, boxFaces, circle, line, rect, poly } from "./geom";

/*
 * Hardware and manual symbols. Every part is drawn around its own origin
 * and positioned with x/y/r/s, so the same screw can show up in the parts
 * list, in a step or lying on the floor.
 */

interface PartProps {
  x?: number;
  y?: number;
  r?: number;
  s?: number;
  delay?: number;
  className?: string;
}

/* ---------- Hardware ---------- */

/** Side view of a screw. Origin = top of the head. */
export const Screw = ({ x, y, r, s, delay = 0, len = 30, className }: PartProps & { len?: number }) => {
  const w = 5.6;
  const head = `M-7 5 C-7 1.2 -4 0 0 0 C4 0 7 1.2 7 5 Z`;
  const shaft = `M${-w / 2} 5 V${len - 6} L0 ${len} L${w / 2} ${len - 6} V5`;
  let threads = "";
  for (let ty = 9; ty < len - 7; ty += 3.6) threads += `M${-w / 2} ${ty + 1.3}L${w / 2} ${ty - 1.1}`;
  return (
    <At x={x} y={y} r={r} s={s} className={className}>
      <P k="sf" d={shaft} delay={delay} />
      <P k="ln" className="hair" d={threads} delay={delay + 0.25} />
      <P k="sf" d={head} delay={delay} />
      <P k="ln" className="thin" d="M-2.8 2.4H2.8" delay={delay + 0.3} />
    </At>
  );
};

/** Screw seen from above: a hex socket in a round head. */
export const ScrewTop = ({ x, y, r, s, delay = 0, className }: PartProps) => (
  <At x={x} y={y} r={r} s={s} className={className}>
    <P k="sf" d={circle(0, 0, 8)} delay={delay} />
    <P
      k="ln"
      className="thin"
      d={poly([
        [3.4, 0],
        [1.7, 2.95],
        [-1.7, 2.95],
        [-3.4, 0],
        [-1.7, -2.95],
        [1.7, -2.95],
      ])}
      delay={delay + 0.2}
    />
  </At>
);

/** Wooden dowel. Origin = top centre. */
export const Dowel = ({ x, y, r, s, delay = 0, len = 26, className }: PartProps & { len?: number }) => {
  let grooves = "";
  for (let gy = 5; gy < len - 3; gy += 3.2) grooves += `M-3.6 ${gy + 1.2}L3.6 ${gy - 0.6}`;
  return (
    <At x={x} y={y} r={r} s={s} className={className}>
      <P k="sf" d={rect(-3.8, 0, 7.6, len, 3.6)} delay={delay} />
      <P k="ln" className="hair" d={grooves} delay={delay + 0.25} />
    </At>
  );
};

/** Cam lock fitting, top view. */
export const CamLock = ({ x, y, r, s, delay = 0, className }: PartProps) => (
  <At x={x} y={y} r={r} s={s} className={className}>
    <P k="sf" d={circle(0, 0, 10)} delay={delay} />
    <P k="ln" className="thin" d={arc(0, 0, 6.4, -140, 140)} delay={delay + 0.2} />
    <P k="ln" d="M-3.2 0H3.2" delay={delay + 0.3} />
    <P k="ink" d="M7.4 -1.6 L10.6 0 L7.4 1.6 Z" delay={delay + 0.4} />
  </At>
);

/** L-shaped hex key. Origin = the bend. Long arm points up. */
export const AllenKey = ({ x, y, r, s, delay = 0, len = 40, short = 15, className }: PartProps & { len?: number; short?: number }) => (
  <At x={x} y={y} r={r} s={s} className={className}>
    <P
      k="sf"
      d={`M-2.6 ${-len} H2.6 V-4 Q2.6 -2.6 4 -2.6 H${short} V2.6 H1 Q-2.6 2.6 -2.6 -1 Z`}
      delay={delay}
    />
    <P k="ln" className="hair" d={`M-2.6 ${-len + 3}H2.6 M${short - 3} -2.6V2.6`} delay={delay + 0.3} />
  </At>
);

/** Flat board in cabinet projection, with pre-drilled holes. Origin = front top-left. */
export const Plank = ({
  x,
  y,
  r,
  s,
  delay = 0,
  w = 120,
  h = 10,
  d = 30,
  holes = 3,
  className,
}: PartProps & { w?: number; h?: number; d?: number; holes?: number }) => {
  const f = boxFaces(0, 0, w, h, d);
  const hs: ReactNode[] = [];
  for (let i = 0; i < holes; i++) {
    const hx = (w / (holes + 1)) * (i + 1) + d * 0.28;
    hs.push(<P key={i} k="ln" className="thin" d={circle(hx, -d * 0.2, 2.2)} delay={delay + 0.4 + i * 0.08} />);
  }
  return (
    <At x={x} y={y} r={r} s={s} className={className}>
      <P k="sh" d={f.side} delay={delay} />
      <P k="sf" d={f.top} delay={delay} />
      <P k="sf" d={f.front} delay={delay} />
      {hs}
    </At>
  );
};

/** Cardboard flat-pack box. Origin = front top-left. */
export const Carton = ({
  x,
  y,
  r,
  s,
  delay = 0,
  w = 120,
  h = 70,
  d = 40,
  label,
  className,
  lid,
}: PartProps & { w?: number; h?: number; d?: number; label?: string; lid?: ReactNode }) => {
  const f = boxFaces(0, 0, w, h, d);
  const dx = d * 0.56;
  const dy = d * -0.4;
  return (
    <At x={x} y={y} r={r} s={s} className={className}>
      <P k="sh" d={f.side} delay={delay} />
      {lid ?? (
        <>
          <P k="sf" d={f.top} delay={delay} />
          <P k="ln" className="thin" d={line(dx / 2, dy / 2, w + dx / 2, dy / 2)} delay={delay + 0.4} />
        </>
      )}
      <P k="sf" d={f.front} delay={delay} />
      {/* this way up arrows */}
      <P k="ln" className="thin" d={`M${w + dx * 0.35} ${h * 0.5 + dy * 0.35}v-12m-3 4l3-4l3 4`} delay={delay + 0.5} />
      <P k="ln" className="thin" d={`M${w + dx * 0.65} ${h * 0.5 + dy * 0.65}v-12m-3 4l3-4l3 4`} delay={delay + 0.55} />
      {label ? (
        <Reveal as="fade" delay={delay + 0.6}>
          <text className="t-label" x={10} y={h * 0.52} fontSize={h * 0.26}>
            {label}
          </text>
          <text className="t-mono" x={10} y={h * 0.52 + h * 0.2} fontSize={h * 0.11}>
            1 STK
          </text>
        </Reveal>
      ) : null}
    </At>
  );
};

/* ---------- Symbols ---------- */

/** The big black arrow from the manuals. Points right; origin = tail centre. */
export const Arrow = ({ x, y, r, s, delay = 0, len = 60, className }: PartProps & { len?: number }) => (
  <At x={x} y={y} r={r} s={s} className={className}>
    <Reveal delay={delay}>
      <path
        className="ink-ln"
        style={{ strokeWidth: 2 } as CSSProperties}
        d={`M0 -6.5H${len - 16}V-15L${len} 0L${len - 16} 15V6.5H0Z`}
      />
    </Reveal>
  </At>
);

/** Thin motion arrow (dashed path + head) showing where a part goes. */
export const MoveArrow = ({ d, delay = 0, head }: { d: string; delay?: number; head: [number, number, number] }) => (
  <g>
    <P k="ln" className="thin" d={d} delay={delay} />
    <At x={head[0]} y={head[1]} r={head[2]}>
      <Reveal delay={delay + 0.6}>
        <path className="ink" d="M0 0 L-9 -5 L-9 5 Z" />
      </Reveal>
    </At>
  </g>
);

/** Curved "turn this way" arrow. */
export const TurnArrow = ({
  x,
  y,
  r,
  s,
  delay = 0,
  radius = 14,
  from = -160,
  to = 60,
  className,
}: PartProps & { radius?: number; from?: number; to?: number }) => {
  const a = (to * Math.PI) / 180;
  const hx = radius * Math.cos(a);
  const hy = radius * Math.sin(a);
  const tangent = to + 90;
  return (
    <At x={x} y={y} r={r} s={s} className={className}>
      <P k="ln" d={arc(0, 0, radius, from, to)} delay={delay} />
      <At x={hx} y={hy} r={tangent}>
        <Reveal delay={delay + 0.7}>
          <path className="ink" d="M5 0 L-4 -5.5 L-4 5.5 Z" />
        </Reveal>
      </At>
    </At>
  );
};

/** Thought or speech bubble. Tail points toward the head (bottom left by default). */
export const Bubble = ({
  x = 0,
  y = 0,
  text = "?",
  size = 18,
  kind = "think",
  tail = "left",
  delay = 0,
  fontSize,
}: {
  x?: number;
  y?: number;
  text?: string;
  size?: number;
  kind?: "think" | "say";
  tail?: "left" | "right";
  delay?: number;
  fontSize?: number;
}) => {
  const dir = tail === "left" ? -1 : 1;
  const fs = fontSize ?? size * 1.25;
  return (
    <At x={x} y={y}>
      <Reveal delay={delay}>
        {kind === "think" ? (
          <>
            <path className="sf thin" d={circle(dir * size * 1.15, size * 1.55, size * 0.16)} />
            <path className="sf thin" d={circle(dir * size * 0.82, size * 1.12, size * 0.25)} />
          </>
        ) : (
          <path
            className="sf"
            d={`M${dir * size * 0.25} ${size * 0.8} L${dir * size * 0.95} ${size * 1.55} L${dir * size * 0.75} ${size * 0.55} Z`}
          />
        )}
        <path className="sf" d={circle(0, 0, size)} />
        <text className="t-label" x={0} y={fs * 0.36} fontSize={fs} textAnchor="middle">
          {text}
        </text>
      </Reveal>
    </At>
  );
};

/** Wrong / right markers from the "do not do this" pictograms. */
export const Cross = ({ x, y, s, delay = 0 }: PartProps) => (
  <At x={x} y={y} s={s}>
    <Reveal delay={delay}>
      <path className="ln" style={{ strokeWidth: 5 }} d="M-9 -9L9 9M9 -9L-9 9" />
    </Reveal>
  </At>
);

export const Check = ({ x, y, s, delay = 0 }: PartProps) => (
  <At x={x} y={y} s={s}>
    <Reveal delay={delay}>
      <path className="ln" style={{ strokeWidth: 5 }} d="M-11 0L-3.5 8L11 -9" />
    </Reveal>
  </At>
);

/** "KLIKK!" with little sound marks. */
export const Click = ({ x, y, r, s, delay = 0, text = "KLIKK!" }: PartProps & { text?: string }) => (
  <At x={x} y={y} r={r} s={s}>
    <Reveal delay={delay}>
      <path className="ln thin" d="M-4 -14l-4 -7M4 -15l1 -8M11 -12l5 -6" />
      <text className="t-label" x={0} y={4} fontSize={13} textAnchor="middle" style={{ letterSpacing: "0.04em" }}>
        {text}
      </text>
    </Reveal>
  </At>
);

/** Sweat drops for heavy lifting. */
export const Sweat = ({ x, y, s, delay = 0 }: PartProps) => (
  <At x={x} y={y} s={s}>
    <Reveal as="fade" delay={delay}>
      <g className="steam">
        <path className="sf thin" d="M0 0 C-3 4 -3 7 0 7 C3 7 3 4 0 0 Z" />
        <path className="sf thin" d="M9 -6 C6 -2 6 1 9 1 C12 1 12 -2 9 -6 Z" />
      </g>
    </Reveal>
  </At>
);

/** Little "1x" style count label. */
export const Count = ({ x = 0, y = 0, n: count, delay = 0, size = 16 }: { x?: number; y?: number; n: string; delay?: number; size?: number }) => (
  <At x={x} y={y}>
    <Reveal as="fade" delay={delay}>
      <text className="t-label" x={0} y={0} fontSize={size}>
        {count}
      </text>
    </Reveal>
  </At>
);
