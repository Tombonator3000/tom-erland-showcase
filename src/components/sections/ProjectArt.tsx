import { CSSProperties } from "react";
import IkeaMan from "@/components/ikea/IkeaMan";
import { At, P, Reveal, Scene } from "@/components/ikea/svg";
import { circle, rect } from "@/components/ikea/geom";
import type { ProjectArt as ArtKey } from "@/data/cv";

/* Line drawings for the hobby games. Canvas: 240 x 150. */

const waves = (y: number, from = 0, to = 240, amp = 4, len = 20) => {
  let d = `M${from} ${y}`;
  for (let x = from; x < to; x += len) d += ` q${len / 4} ${-amp} ${len / 2} 0 t${len / 2} 0`;
  return d;
};

const VectorWar = () => (
  <>
    {[30, 60, 90, 120].map((y) => (
      <path key={y} className="ln hair grey" d={`M0 ${y} H240`} />
    ))}
    {[40, 80, 120, 160, 200].map((x) => (
      <path key={x} className="ln hair grey" d={`M${x} 0 V150`} />
    ))}
    <At x={52} y={92} r={-12}>
      <P k="sf" d="M-20 -13 L20 0 L-20 13 L-11 0 Z" delay={0.2} />
    </At>
    <At x={190} y={52} r={168}>
      <P k="sf" d="M-20 -13 L20 0 L-20 13 L-11 0 Z" delay={0.35} />
    </At>
    <path className="ln laser" d="M76 86 L166 58" />
    <path className="ln laser" style={{ animationDelay: "-0.6s" } as CSSProperties} d="M168 64 L80 94" />
    <At x={122} y={74}>
      <Reveal delay={0.9}>
        <g className="pulse">
          <path className="yl thin" d="M0 -12 L3 -4 L12 -3 L5 2 L7 11 L0 6 L-7 11 L-5 2 L-12 -3 L-3 -4 Z" />
        </g>
      </Reveal>
    </At>
  </>
);

const DeepOnes = () => (
  <>
    <path className="ln thin grey" d={waves(84, 0, 240, 3, 24)} />
    <g className="bob">
      <P k="sf" d="M58 78 H118 L108 92 H68 Z" delay={0.2} />
      <P k="ln" d="M88 78 V44" delay={0.4} />
      <P k="sf" d="M88 46 L108 54 L88 62 Z" delay={0.5} />
    </g>
    <path className="ln" d={waves(90, 0, 240, 4, 30)} />
    <g className="wiggle" style={{ transformOrigin: "50% 100%" } as CSSProperties}>
      <P
        k="sf"
        d="M170 150 C168 120 186 110 182 86 C179 66 160 62 166 46 C170 36 184 40 182 50 C180 58 172 60 176 70 C182 86 198 96 196 120 C195 134 192 142 192 150 Z"
        delay={0.3}
      />
      {[
        [180, 70],
        [186, 92],
        [188, 116],
        [184, 136],
      ].map(([cx, cy], i) => (
        <P key={i} k="ln" className="thin" d={circle(cx, cy, 2.4)} delay={0.8 + i * 0.1} />
      ))}
    </g>
    {[
      [40, 118],
      [120, 128],
      [142, 108],
    ].map(([cx, cy], i) => (
      <path key={i} className="ln thin steam" style={{ animationDelay: `${i * -0.8}s` } as CSSProperties} d={circle(cx, cy, 3)} />
    ))}
  </>
);

const Runner = () => (
  <>
    {[
      [6, 60, 26],
      [34, 40, 22],
      [58, 74, 30],
      [150, 50, 26],
      [178, 30, 24],
      [204, 64, 30],
    ].map(([x, top, w], i) => (
      <g key={i}>
        <P k="sh" d={rect(x, top, w, 128 - top)} delay={0.1 + i * 0.06} />
        <P k="ln" className="hair" d={`M${x + 6} ${top + 10} h4 M${x + w - 10} ${top + 10} h4 M${x + 6} ${top + 22} h4`} delay={0.5} />
      </g>
    ))}
    <path className="ln" d="M0 128 H240" />
    <path className="ln thin dash road" d="M0 140 H240" />
    <Reveal as="fade" delay={0.3}>
      <IkeaMan x={118} y={92} scale={0.44} pose="stand" anim="run" />
    </Reveal>
    {[
      [138, 40],
      [158, 26],
    ].map(([x, y], i) => (
      <g key={i} className="bob" style={{ animationDelay: `${i * -1.2}s` } as CSSProperties}>
        <path className="ink" d={circle(x, y + 12, 4)} />
        <path className="ln thin" d={`M${x + 3.6} ${y + 12} V${y} l7 3`} />
      </g>
    ))}
  </>
);

const StateShift = () => (
  <>
    {Array.from({ length: 9 }).map((_, i) => {
      const x = 46 + (i % 3) * 34;
      const y = 22 + Math.floor(i / 3) * 34;
      return (
        <g key={i}>
          <P k="sf" d={rect(x, y, 28, 28, 4)} delay={0.1 + i * 0.05} />
          <path
            className="ink tile-flip"
            style={{ animationDelay: `${(i * 0.73) % 3.1}s` } as CSSProperties}
            d={rect(x + 4, y + 4, 20, 20, 2)}
          />
        </g>
      );
    })}
    <At x={192} y={74}>
      <g className="spin" style={{ animationDuration: "6s" } as CSSProperties}>
        <path className="ln" d="M-24 0 A24 24 0 0 1 17 -17" />
        <path className="ink" d="M23 -11 L12 -22 L10 -8 Z" />
        <path className="ln" d="M24 0 A24 24 0 0 1 -17 17" />
        <path className="ink" d="M-23 11 L-12 22 L-10 8 Z" />
      </g>
    </At>
  </>
);

const ConspiracyCanvas = () => {
  const notes: [number, number, number][] = [
    [40, 34, -6],
    [150, 26, 5],
    [70, 98, 4],
    [176, 96, -7],
  ];
  return (
    <>
      <P k="sh" d={rect(16, 10, 208, 130, 4)} delay={0.1} />
      <P k="ln" d="M50 40 L160 32 L82 104 L186 102 L120 66 L50 40" delay={0.7} dur={1.6} />
      {notes.map(([x, y, r], i) => (
        <At key={i} x={x} y={y} r={r}>
          <P k="sf" d={rect(-16, -12, 32, 26, 1)} delay={0.3 + i * 0.1} />
          <P k="ln" className="hair" d="M-10 -2 H10 M-10 4 H6" delay={0.6 + i * 0.1} />
          <path className="ink" d={circle(0, -9, 2.6)} />
        </At>
      ))}
      <At x={120} y={66}>
        <Reveal delay={1.4}>
          <path className="yl" d={rect(-14, -14, 28, 28, 2)} />
          <text className="t-label" y={7} fontSize={20} textAnchor="middle">
            ?
          </text>
        </Reveal>
      </At>
    </>
  );
};

const DeepRegrets = () => (
  <>
    <path className="ln thin" d={waves(46, 0, 240, 3, 24)} />
    {[66, 84, 102, 120, 138].map((y, i) => (
      <path key={y} className="ln hair grey" style={{ strokeDasharray: `${2 + i * 2} ${8 - i}` } as CSSProperties} d={`M0 ${y} H240`} />
    ))}
    <g className="bob">
      <P k="sf" d="M40 40 H98 L90 54 H50 Z" delay={0.2} />
      <P k="sf" d="M58 40 V26 H76 V40" delay={0.3} />
      <P k="ln" d="M90 40 L126 14" delay={0.4} />
    </g>
    <P k="ln" className="thin" d="M126 14 L134 118" delay={0.7} />
    <P k="ln" d="M134 118 c0 6 -8 6 -8 0" delay={1.1} />
    <At x={184} y={118}>
      <P k="sf" d="M-20 0 C-12 -12 12 -12 20 0 C12 12 -12 12 -20 0 Z" delay={0.9} />
      <g className="eye-blink">
        <path className="ink" d={circle(0, 0, 6)} />
        <path d={circle(2, -2, 1.6)} fill="var(--sheet)" />
      </g>
    </At>
  </>
);

const GuildLife = () => (
  <>
    <P k="sf" d="M24 128 V70 L66 40 L108 70 V128 Z" delay={0.1} />
    <P k="ln" className="thin" d="M56 128 V102 A10 10 0 0 1 76 102 V128" delay={0.4} />
    <P k="ln" className="thin" d={rect(36, 78, 14, 14, 1) + rect(82, 78, 14, 14, 1)} delay={0.5} />
    <P k="ln" d="M66 40 V12" delay={0.3} />
    <g className="wiggle" style={{ transformOrigin: "0% 50%" } as CSSProperties}>
      <P k="yl" d="M66 13 L90 19 L66 26 Z" delay={0.6} />
    </g>
    <path className="ln" d="M0 128 H240" />
    <P k="ln" className="bold" d="M146 44 L214 118 M214 44 L146 118" delay={0.5} />
    <P k="sf" d="M156 46 H204 V84 C204 102 190 112 180 118 C170 112 156 102 156 84 Z" delay={0.3} />
    <P k="ink" d="M180 62 L184 74 L196 74 L186 82 L190 94 L180 86 L170 94 L174 82 L164 74 L176 74 Z" delay={0.8} />
  </>
);

const art: Record<ArtKey, () => JSX.Element> = {
  vector: VectorWar,
  deep: DeepOnes,
  runner: Runner,
  shift: StateShift,
  canvas: ConspiracyCanvas,
  regrets: DeepRegrets,
  guild: GuildLife,
};

const ProjectArt = ({ kind }: { kind: ArtKey }) => {
  const Draw = art[kind];
  return (
    <Scene viewBox="0 0 240 150" threshold={0.3}>
      <Draw />
    </Scene>
  );
};

export default ProjectArt;
