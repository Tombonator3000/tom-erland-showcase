import { CSSProperties, ReactNode } from "react";
import { At, P, Reveal } from "./svg";
import { boxFaces, circle, ellipse, line, poly, rect, useSvgId } from "./geom";

/*
 * Furniture and everyday objects for the scenes. Same conventions as
 * parts.tsx: drawn around a local origin, placed with x/y/r/s.
 * Unless noted, the origin is the bottom centre (where it meets the floor).
 */

interface PropProps {
  x?: number;
  y?: number;
  r?: number;
  s?: number;
  delay?: number;
  className?: string;
}

/** Window with a sill. Sun by day, moon by night. Origin = top-left. */
export const Window = ({
  x,
  y,
  s,
  delay = 0,
  w = 64,
  h = 70,
  night = false,
}: PropProps & { w?: number; h?: number; night?: boolean }) => {
  const id = useSvgId("win");
  const cx = w / 2;
  const cy = h / 2;
  const rays: string[] = [];
  for (let i = 0; i < 12; i++) {
    const a = (i * 30 * Math.PI) / 180;
    rays.push(line(cx + Math.cos(a) * 13, cy + Math.sin(a) * 13, cx + Math.cos(a) * 19, cy + Math.sin(a) * 19));
  }
  return (
    <At x={x} y={y} s={s}>
      <defs>
        <clipPath id={id}>
          <rect x={4} y={4} width={w - 8} height={h - 8} />
        </clipPath>
      </defs>
      <path className="win-pane" d={rect(4, 4, w - 8, h - 8)} style={{ fill: night ? "var(--ink)" : "var(--sheet)" }} />
      <g clipPath={`url(#${id})`}>
        <g className="win-sun" style={{ opacity: night ? 0 : 1 }}>
          <P k="sf" d={circle(cx, cy, 9)} delay={delay + 0.3} />
          <g className="spin">
            <P k="ln" className="thin" d={rays.join("")} delay={delay + 0.5} />
          </g>
        </g>
        <g className="win-moon" style={{ opacity: night ? 1 : 0 }}>
          <path d={circle(cx - 2, cy, 10)} fill="var(--sheet)" />
          <path d={circle(cx + 3, cy - 3, 9)} fill="var(--ink)" />
          <path d={circle(cx + 14, cy - 16, 1.2)} fill="var(--sheet)" className="blink" />
          <path d={circle(cx - 15, cy + 14, 1)} fill="var(--sheet)" />
        </g>
      </g>
      <P k="ln" d={rect(0, 0, w, h)} delay={delay} />
      <P k="ln" className="thin" d={rect(4, 4, w - 8, h - 8)} delay={delay + 0.15} />
      <P k="sf" d={rect(-7, h, w + 14, 5, 1.5)} delay={delay + 0.2} />
    </At>
  );
};

/** Coffee mug with steam. */
export const Mug = ({ x, y, r, s, delay = 0, steam = true }: PropProps & { steam?: boolean }) => (
  <At x={x} y={y} r={r} s={s}>
    {steam ? (
      <g>
        {[-3.5, 3].map((sx, i) => (
          <path
            key={sx}
            className="ln thin steam"
            style={{ animationDelay: `${i * -1.3}s` } as CSSProperties}
            d={`M${sx} -23 c-3 -3 2.5 -6 -0.5 -9.5`}
          />
        ))}
      </g>
    ) : null}
    <P k="ln" d="M8.6 -15.5 C16 -15.5 16 -4.5 7.7 -4.5" delay={delay + 0.2} />
    <P k="sf" d="M-9 -19 H9 L7.7 -1.8 Q7.4 0.8 4.9 0.8 H-4.9 Q-7.4 0.8 -7.7 -1.8 Z" delay={delay} />
  </At>
);

/** Laptop, seen from the front. `children` render on the screen (origin = screen centre). */
export const Laptop = ({ x, y, r, s, delay = 0, children }: PropProps & { children?: ReactNode }) => (
  <At x={x} y={y} r={r} s={s}>
    <P k="sf" d={rect(-27, -48, 54, 40, 3.5)} delay={delay} />
    <P k="ln" className="thin" d={rect(-22, -43, 44, 30, 1.5)} delay={delay + 0.2} />
    <P k="sh" d={poly([[-36, 0], [36, 0], [30, -8], [-30, -8]])} delay={delay + 0.1} />
    <P k="ln" className="hair" d="M-24 -4.5 H24" delay={delay + 0.4} />
    {children ? (
      <At y={-28}>
        <Reveal as="fade" delay={delay + 0.6}>
          {children}
        </Reveal>
      </At>
    ) : null}
  </At>
);

/** Old CRT computer with keyboard, around year 2000. */
export const Crt = ({ x, y, s, delay = 0, children }: PropProps & { children?: ReactNode }) => (
  <At x={x} y={y} s={s}>
    <P k="sh" d={poly([[18, -58], [29, -66], [29, -25], [18, -17]])} delay={delay} />
    <P k="sf" d={poly([[-27, -58], [-16, -66], [29, -66], [18, -58]])} delay={delay} />
    <P k="sf" d={rect(-27, -58, 45, 41, 3)} delay={delay} />
    <P k="ln" className="thin" d={rect(-22, -53, 35, 30, 6)} delay={delay + 0.2} />
    <P k="sf" d={rect(-10, -17, 19, 6, 1)} delay={delay + 0.15} />
    <P k="sf" d={poly([[-36, 0], [30, 0], [25, -9], [-31, -9]])} delay={delay + 0.25} />
    <P k="ln" className="hair" d="M-28 -6 H25 M-30 -3 H27" delay={delay + 0.45} />
    {children ? (
      <At x={-4.5} y={-38}>
        <Reveal as="fade" delay={delay + 0.7}>
          {children}
        </Reveal>
      </At>
    ) : null}
  </At>
);

/** Server rack. Origin = bottom-left of the front. `pulled` slides one unit out. */
export const Rack = ({ x, y, s, delay = 0, pulled = 0 }: PropProps & { pulled?: number }) => {
  const f = boxFaces(0, -112, 56, 112, 34);
  const units = [0, 1, 3, 4, 5];
  return (
    <At x={x} y={y} s={s}>
      <P k="sh" d={f.side} delay={delay} />
      <P k="sf" d={f.top} delay={delay} />
      <P k="sf" d={f.front} delay={delay} />
      <P k="ln" className="thin" d={rect(5, -106, 46, 100, 1)} delay={delay + 0.15} />
      {units.map((u, i) => (
        <g key={u}>
          <P k="ln" className="thin" d={rect(8, -102 + u * 16.5, 40, 12, 1.5)} delay={delay + 0.3 + i * 0.06} />
          <path
            className="ink blink"
            style={{ animationDelay: `${(u * 0.37) % 1.2}s`, animationDuration: `${0.9 + (u % 3) * 0.35}s` } as CSSProperties}
            d={circle(42, -96 + u * 16.5, 1.7)}
          />
        </g>
      ))}
      {/* the unit that is being pushed in */}
      <g className="rack-unit" style={{ transform: `translate(${pulled * -0.6}px, ${pulled * 0.45}px)` } as CSSProperties}>
        <P k="sh" d={poly([[48, -69], [48 + 10, -76], [48 + 10, -64], [48, -57]])} delay={delay + 0.4} />
        <P k="sf" d={rect(8, -69, 40, 12, 1.5)} delay={delay + 0.4} />
        <path className="ink" d={circle(42, -63, 1.7)} />
        <P k="ln" className="hair" d="M12 -63 H30" delay={delay + 0.6} />
      </g>
    </At>
  );
};

/** Row of binders on a shelf. Origin = bottom-left. */
export const Binders = ({ x, y, s, delay = 0, n = 6 }: PropProps & { n?: number }) => (
  <At x={x} y={y} s={s}>
    {Array.from({ length: n }).map((_, i) => {
      const tilt = i === n - 1 ? 9 : 0;
      return (
        <At key={i} x={i * 13} y={0} r={tilt}>
          <P k="sf" d={rect(0, -52, 12, 52, 1.5)} delay={delay + i * 0.07} />
          <P k="ln" className="hair" d={rect(2.2, -45, 7.6, 15, 1)} delay={delay + 0.3 + i * 0.07} />
          <P k="ln" className="thin" d={circle(6, -12, 2.6)} delay={delay + 0.35 + i * 0.07} />
        </At>
      );
    })}
    <P k="sf" d={rect(-6, 0, n * 13 + 16, 5, 1)} delay={delay} />
  </At>
);

/** Messy pile of paper. Origin = bottom centre. */
export const PaperMess = ({ x, y, s, delay = 0 }: PropProps) => (
  <At x={x} y={y} s={s}>
    {[
      [-26, -4, -18],
      [8, -2, 14],
      [-6, -10, 32],
      [22, -12, -8],
      [-18, -22, 52],
      [6, -26, -34],
    ].map(([px, py, pr], i) => (
      <At key={i} x={px} y={py} r={pr}>
        <P k="sf" d={rect(-11, -8, 22, 15, 1)} delay={delay + i * 0.08} />
        <P k="ln" className="hair" d="M-7 -3 H7 M-7 1 H4" delay={delay + 0.3 + i * 0.08} />
      </At>
    ))}
  </At>
);

/** Neat stack of folders. Origin = bottom centre. */
export const PaperStack = ({ x, y, s, delay = 0, n = 5 }: PropProps & { n?: number }) => (
  <At x={x} y={y} s={s}>
    {Array.from({ length: n }).map((_, i) => (
      <P key={i} k={i % 2 ? "sh" : "sf"} d={rect(-24, -6 - i * 5.5, 48, 5.5, 1)} delay={delay + i * 0.08} />
    ))}
  </At>
);

/** Washing machine. Origin = bottom-left. */
export const WashingMachine = ({ x, y, s, delay = 0, children }: PropProps & { children?: ReactNode }) => (
  <At x={x} y={y} s={s}>
    <P k="sh" d={poly([[60, -66], [71, -74], [71, -8], [60, 0]])} delay={delay} />
    <P k="sf" d={poly([[0, -66], [11, -74], [71, -74], [60, -66]])} delay={delay} />
    <P k="sf" d={rect(0, -66, 60, 66, 3)} delay={delay} />
    <P k="ln" className="thin" d="M0 -54 H60" delay={delay + 0.2} />
    <P k="ln" className="thin" d={circle(49, -60, 3)} delay={delay + 0.3} />
    <P k="ln" className="thin" d="M6 -60 H22" delay={delay + 0.35} />
    <P k="sf" d={circle(30, -27, 18)} delay={delay + 0.25} />
    <P k="ln" className="thin" d={circle(30, -27, 12.5)} delay={delay + 0.4} />
    {children ? <At x={30} y={-27}>{children}</At> : null}
  </At>
);

/** Bank note. Origin = centre. */
export const Bill = ({ x, y, r, s, delay = 0 }: PropProps) => (
  <At x={x} y={y} r={r} s={s}>
    <P k="sf" d={rect(-15, -8.5, 30, 17, 2)} delay={delay} />
    <P k="ln" className="thin" d={circle(0, 0, 4.5)} delay={delay + 0.2} />
    <P k="ln" className="hair" d="M-11 -4.5 V4.5 M11 -4.5 V4.5" delay={delay + 0.3} />
  </At>
);

/** Magnifying glass. Origin = centre of the lens. */
export const Magnifier = ({ x, y, r, s, delay = 0 }: PropProps) => (
  <At x={x} y={y} r={r} s={s}>
    <P k="ln" className="bold" d="M7 7 L17 17" delay={delay} />
    <P k="sf" d={circle(0, 0, 10)} delay={delay} />
    <P k="ln" className="hair" d="M-5 -3 A6 6 0 0 1 -2 -6" delay={delay + 0.3} />
  </At>
);

/** Small church with a tower. Origin = bottom-left of the nave. */
export const Church = ({ x, y, s, delay = 0 }: PropProps) => (
  <At x={x} y={y} s={s}>
    <P k="sf" d={poly([[0, 0], [0, -34], [30, -56], [60, -34], [60, 0]])} delay={delay} />
    <P k="sf" d={rect(-22, -64, 24, 64)} delay={delay + 0.1} />
    <P k="sf" d={poly([[-25, -64], [-10, -102], [5, -64]])} delay={delay + 0.2} />
    <P k="ln" d="M-10 -102 V-114 M-14.5 -109 H-5.5" delay={delay + 0.5} />
    <P k="ln" className="thin" d="M-15 0 V-13 A5 5 0 0 1 -5 -13 V0" delay={delay + 0.4} />
    <P k="ln" className="thin" d="M-14 -40 V-48 A4 4 0 0 1 -6 -48 V-40 Z" delay={delay + 0.45} />
    <P k="ln" className="thin" d="M16 -14 V-24 A4 4 0 0 1 24 -24 V-14 Z M36 -14 V-24 A4 4 0 0 1 44 -24 V-14 Z" delay={delay + 0.5} />
  </At>
);

/** Wall calendar. Origin = top-left. */
export const Calendar = ({ x, y, r, s, delay = 0, month = "AUG" }: PropProps & { month?: string }) => {
  let grid = "";
  for (let row = 0; row < 3; row++) for (let col = 0; col < 4; col++) grid += rect(5 + col * 9.5, 18 + row * 9, 6, 5, 1);
  return (
    <At x={x} y={y} r={r} s={s}>
      <P k="sf" d={rect(0, 0, 46, 48, 3)} delay={delay} />
      <P k="sh" d={rect(0, 0, 46, 13, 3)} delay={delay + 0.1} />
      <P k="ln" className="thin" d="M12 -4 V5 M34 -4 V5" delay={delay + 0.2} />
      <P k="ln" className="hair" d={grid} delay={delay + 0.35} />
      <P k="ln" className="thin" d={circle(27.5, 29.5, 6.5)} delay={delay + 0.8} />
      <Reveal as="fade" delay={delay + 0.4}>
        <text className="t-label" x={23} y={10} fontSize={8} textAnchor="middle">
          {month}
        </text>
      </Reveal>
    </At>
  );
};

/** Phone handset. Origin = middle of the grip; earpiece up, mouthpiece down, cups face right. */
export const Handset = ({ x, y, r, s, delay = 0 }: PropProps) => (
  <At x={x} y={y} r={r} s={s}>
    <P k="sf" d="M0.5 -16 C-8.5 -9 -8.5 9 0.5 16 L4.5 12.5 C-1.5 7 -1.5 -7 4.5 -12.5 Z" delay={delay} />
    <At x={4} y={-17} r={38}>
      <P k="sf" d={rect(-7, -4.5, 14, 9, 4)} delay={delay + 0.1} />
    </At>
    <At x={4} y={17} r={-38}>
      <P k="sf" d={rect(-7, -4.5, 14, 9, 4)} delay={delay + 0.1} />
    </At>
  </At>
);

/** The handset as held by the "phone" pose. Pass as the man's frontItem. */
export const PhoneInHand = () => <Handset r={185} s={0.8} />;

/** Office building with a sign on the roof. Origin = bottom-left. */
export const Building = ({ x, y, s, delay = 0, sign = "HAMAR" }: PropProps & { sign?: string }) => {
  const f = boxFaces(0, -78, 104, 78, 40);
  let windows = "";
  for (let row = 0; row < 3; row++)
    for (let col = 0; col < 4; col++) if (!(row === 2 && (col === 1 || col === 2))) windows += rect(10 + col * 23, -68 + row * 21, 15, 12, 1);
  return (
    <At x={x} y={y} s={s}>
      <P k="sh" d={f.side} delay={delay} />
      <P k="sf" d={f.top} delay={delay} />
      <P k="sf" d={f.front} delay={delay} />
      <P k="ln" className="thin" d={windows} delay={delay + 0.3} />
      <P k="ln" className="thin" d="M40 0 V-22 H64 V0 M52 -22 V0" delay={delay + 0.4} />
      <P k="ln" className="thin" d="M22 -78 V-90 M82 -78 V-90" delay={delay + 0.5} />
      <P k="yl" d={rect(10, -106, 84, 20, 2)} delay={delay + 0.55} />
      <Reveal as="fade" delay={delay + 0.9}>
        <text className="t-label" x={52} y={-91} fontSize={14} textAnchor="middle" style={{ letterSpacing: "0.08em" }}>
          {sign}
        </text>
      </Reveal>
    </At>
  );
};

/** Desk, side-on. Origin = floor centre. */
export const Desk = ({ x, y, s, delay = 0, w = 110, h = 52 }: PropProps & { w?: number; h?: number }) => (
  <At x={x} y={y} s={s}>
    <P k="ln" className="bold" d={`M${-w / 2 + 7} ${-h + 5} V0 M${w / 2 - 7} ${-h + 5} V0`} delay={delay} />
    <P k="sf" d={rect(-w / 2, -h, w, 6, 1.5)} delay={delay} />
  </At>
);

/** Office chair, side-on, facing right. Seat top is 34 units above the floor. */
export const Chair = ({ x, y, s, delay = 0 }: PropProps) => (
  <At x={x} y={y} s={s}>
    <P k="ln" className="bold" d="M0 -30 V-11 M-15 -9 H16" delay={delay} />
    <P k="sf" d={circle(-13, -4, 3.6)} delay={delay + 0.2} />
    <P k="sf" d={circle(14, -4, 3.6)} delay={delay + 0.2} />
    <P k="sf" d={rect(-20, -80, 7, 48, 3.5)} delay={delay + 0.1} />
    <P k="sf" d={rect(-17, -36, 35, 6, 2.5)} delay={delay} />
  </At>
);

/** Tall bookcase, the finished product. Origin = bottom-left. */
export const Bookcase = ({ x, y, s, delay = 0, h = 170, books = true }: PropProps & { h?: number; books?: boolean }) => {
  const w = 70;
  const f = boxFaces(0, -h, w, h, 30);
  const shelfYs = [-h + 6 + (h - 12) / 4, -h + 6 + ((h - 12) * 2) / 4, -h + 6 + ((h - 12) * 3) / 4];
  return (
    <At x={x} y={y} s={s}>
      <P k="sh" d={f.side} delay={delay} />
      <P k="sf" d={f.top} delay={delay} />
      <P k="sf" d={f.front} delay={delay} />
      <P k="sh2" d={rect(6, -h + 6, w - 12, h - 12)} delay={delay + 0.1} />
      {shelfYs.map((sy, i) => (
        <P key={i} k="sf" d={rect(6, sy, w - 12, 4)} delay={delay + 0.2 + i * 0.1} />
      ))}
      <P k="sf" d={rect(6, -10, w - 12, 4)} delay={delay + 0.5} />
      {books ? (
        <g>
          {[
            [9, 0, 7, 30],
            [17, 0, 6, 26],
            [24, 0, 8, 32],
            [33, 0, 5, 24],
          ].map(([bx, , bw, bh], i) => (
            <P key={i} k={i % 2 ? "sh" : "sf"} d={rect(bx, shelfYs[1] - bh, bw, bh, 1)} delay={delay + 0.7 + i * 0.06} />
          ))}
          <At x={50} y={shelfYs[1]} r={-16}>
            <P k="sf" d={rect(-3, -28, 6, 28, 1)} delay={delay + 0.95} />
          </At>
          {[
            [10, 22, 10],
            [12, 18, 8],
          ].map(([bx, bw, bh], i) => (
            <P key={`s${i}`} k="sf" d={rect(bx, shelfYs[2] - bh - i * 10, bw, bh, 1)} delay={delay + 1 + i * 0.08} />
          ))}
          <P k="sf" d={circle(46, shelfYs[0] - 9, 9)} delay={delay + 1.05} />
          <P k="ln" className="thin" d={`M40 ${shelfYs[0] - 14} Q46 ${shelfYs[0] - 7} 52 ${shelfYs[0] - 14}`} delay={delay + 1.15} />
        </g>
      ) : null}
    </At>
  );
};

/** Wall clock with hands that run far too fast. Origin = centre. */
export const Clock = ({ x, y, s, delay = 0 }: PropProps) => (
  <At x={x} y={y} s={s}>
    <P k="sf" d={circle(0, 0, 22)} delay={delay} />
    <P k="ln" className="thin" d="M0 -18 V-14 M18 0 H14 M0 18 V14 M-18 0 H-14" delay={delay + 0.3} />
    <g className="spin" style={{ animationDuration: "3s" } as CSSProperties}>
      <path className="ln bold" d="M0 0 V-14" />
    </g>
    <g className="spin" style={{ animationDuration: "36s" } as CSSProperties}>
      <path className="ln bold" d="M0 0 H9" />
    </g>
    <path className="ink" d={circle(0, 0, 2.6)} />
  </At>
);

/** The tiny pencil every flat-pack store hands out. Origin = tip. */
export const Pencil = ({ x, y, r, s, delay = 0 }: PropProps) => (
  <At x={x} y={y} r={r} s={s}>
    <P k="yl" d="M14 -4.5 H60 V4.5 H14 Z" delay={delay} />
    <P k="sf" d="M0 0 L14 -4.5 V4.5 Z" delay={delay + 0.1} />
    <P k="ink" d="M0 0 L4.5 -1.45 V1.45 Z" delay={delay + 0.2} />
    <P k="ln" className="hair" d="M14 -1.5 H60 M14 1.5 H60" delay={delay + 0.3} />
  </At>
);

/** Potted plant. */
export const Plant = ({ x, y, s, delay = 0 }: PropProps) => (
  <At x={x} y={y} s={s}>
    <g className="wiggle">
      <P k="sf" d="M0 -20 C-14 -26 -20 -42 -14 -52 C-4 -44 -1 -32 0 -20 Z" delay={delay + 0.3} />
      <P k="sf" d="M0 -20 C12 -28 22 -40 18 -54 C6 -46 1 -34 0 -20 Z" delay={delay + 0.35} />
      <P k="sf" d="M0 -22 C-4 -38 -2 -54 4 -64 C10 -52 6 -36 0 -22 Z" delay={delay + 0.4} />
    </g>
    <P k="sf" d="M-13 -22 H13 L10 0 H-10 Z" delay={delay} />
  </At>
);

/** Hourglass that flips over now and then. Origin = centre. */
export const Hourglass = ({ x, y, s, delay = 0 }: PropProps) => (
  <At x={x} y={y} s={s}>
    <g className="hourglass">
      <P k="ln" className="bold" d="M-14 -24 H14 M-14 24 H14" delay={delay} />
      <P k="ln" d="M-10 -24 C-10 -8 -2 -4 -2 0 C-2 4 -10 8 -10 24 M10 -24 C10 -8 2 -4 2 0 C2 4 10 8 10 24" delay={delay + 0.1} />
      <path className="ink sand-top" d="M-7 -14 H7 L0 -3 Z" />
      <path className="ink sand-bottom" d="M-8 22 H8 L0 12 Z" />
    </g>
  </At>
);

/** Game controller. Origin = centre. */
export const Gamepad = ({ x, y, r, s, delay = 0 }: PropProps) => (
  <At x={x} y={y} r={r} s={s}>
    <P
      k="sf"
      d="M-20 -10 H20 C28 -10 32 2 31 10 C30 17 24 19 20 14 L15 8 H-15 L-20 14 C-24 19 -30 17 -31 10 C-32 2 -28 -10 -20 -10 Z"
      delay={delay}
    />
    <P k="ln" className="thin" d="M-18 -4 V6 M-23 1 H-13" delay={delay + 0.3} />
    <P k="ink" d={circle(15, -2, 2.6) + circle(21, 4, 2.6)} delay={delay + 0.4} />
  </At>
);

/** Rolled diploma with a ribbon. Origin = centre. */
export const Diploma = ({ x, y, r, s, delay = 0 }: PropProps) => (
  <At x={x} y={y} r={r} s={s}>
    <P k="sf" d={rect(-26, -7, 52, 14, 7)} delay={delay} />
    <P k="ln" className="thin" d={ellipse(-19, 0, 3, 7)} delay={delay + 0.2} />
    <P k="yl" d="M2 -7 V7 M-2 7 L-6 16 L0 13 L4 16 L2 7" delay={delay + 0.35} />
  </At>
);

/** Building blocks for "employers": little office house. Origin = bottom-left. */
export const Office = ({ x, y, s, delay = 0 }: PropProps) => {
  const f = boxFaces(0, -40, 46, 40, 20);
  return (
    <At x={x} y={y} s={s}>
      <P k="sh" d={f.side} delay={delay} />
      <P k="sf" d={f.top} delay={delay} />
      <P k="sf" d={f.front} delay={delay} />
      <P k="ln" className="thin" d={rect(7, -32, 10, 9, 1) + rect(29, -32, 10, 9, 1) + "M18 0 V-15 H28 V0"} delay={delay + 0.3} />
    </At>
  );
};

/** A long, heavy board for the "lift together" pictogram. Origin = centre of the bottom edge. */
export const BigPanel = ({ x, y, r, s, delay = 0, w = 170 }: PropProps & { w?: number }) => {
  const f = boxFaces(-w / 2, -9, w, 9, 46);
  return (
    <At x={x} y={y} r={r} s={s}>
      <P k="sh" d={f.side} delay={delay} />
      <P k="sf" d={f.top} delay={delay} />
      <P k="sf" d={f.front} delay={delay} />
    </At>
  );
};

/** Ruler with ticks. Origin = top-left. */
export const Ruler = ({ x, y, s, delay = 0, len = 300, unit = 3, every = 10 }: PropProps & { len?: number; unit?: number; every?: number }) => {
  let ticks = "";
  for (let i = 0; i * unit <= len; i++) {
    const tx = i * unit;
    const th = i % every === 0 ? 12 : i % 5 === 0 ? 8 : 4.5;
    ticks += line(tx, 0, tx, th);
  }
  return (
    <At x={x} y={y} s={s}>
      <P k="ln" className="hair" d={ticks} delay={delay} dur={1.4} />
      <P k="ln" className="thin" d={line(0, 0, len, 0)} delay={delay} dur={1.4} />
    </At>
  );
};
