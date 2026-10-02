import { CSSProperties, ReactNode } from "react";
import IkeaMan from "@/components/ikea/IkeaMan";
import { Bubble, Click, Cross, Screw } from "@/components/ikea/parts";
import {
  Binders,
  Bill,
  Bookcase,
  Calendar,
  Chair,
  Church,
  Crt,
  Desk,
  Handset,
  Laptop,
  Magnifier,
  Mug,
  PaperStack,
  Rack,
  WashingMachine,
  Window,
} from "@/components/ikea/props";
import { At, P, Reveal, Scene, SceneState } from "@/components/ikea/svg";
import { rect } from "@/components/ikea/geom";
import { useAfter, useTimeline } from "@/hooks/use-in-view";
import type { StepScene } from "@/data/cv";

/*
 * One drawing per assembly step. They share a 400 x 250 canvas with the
 * floor at y = 232. A running gag: the number of coffee cups goes up with
 * every step.
 */

const FLOOR = 232;

const Mugs = ({ n, x, y = FLOOR, delay = 0.8 }: { n: number; x: number; y?: number; delay?: number }) => (
  <>
    {Array.from({ length: n }).map((_, i) => (
      <Mug key={i} x={x + (i % 3) * 21} y={y - Math.floor(i / 3) * 21} s={0.95} delay={delay + i * 0.1} steam={i === n - 1} />
    ))}
  </>
);

/* A binder held in the hand, kept upright against the arm angle. */
const HeldBinder = ({ upright }: { upright: number }) => (
  <g transform={`rotate(${upright})`}>
    <path className="sf" d={rect(-6, -26, 12, 34, 1.5)} />
    <path className="ln thin" d="M0 -6 m-2.4 0 a2.4 2.4 0 1 0 4.8 0 a2.4 2.4 0 1 0 -4.8 0" />
  </g>
);

const Modem = ({ seen }: SceneState) => {
  const noisy = useAfter(seen, 1600);
  return (
    <>
      <Window x={20} y={18} w={70} h={78} night delay={0.1} />
      <Desk x={238} y={FLOOR} w={160} h={70} delay={0.2} />
      <Chair x={120} y={FLOOR} delay={0.3} />
      <Crt x={222} y={FLOOR - 70} delay={0.4}>
        <text className="t-mono" fontSize={7} x={-12} y={2}>
          C:\&gt;
        </text>
        <path className="ink blink" d={rect(5, -4, 4, 6)} />
      </Crt>
      {/* the modem with its blinking lights */}
      <At x={286} y={FLOOR - 70}>
        <P k="sf" d={rect(-20, -11, 40, 11, 2)} delay={0.6} />
        {[-11, -4, 3].map((lx, i) => (
          <path
            key={lx}
            className="ink blink"
            style={{ animationDelay: `${i * 0.21}s`, animationDuration: `${0.35 + i * 0.12}s` } as CSSProperties}
            d={`M${lx} -5.5 m-1.6 0 a1.6 1.6 0 1 0 3.2 0 a1.6 1.6 0 1 0 -3.2 0`}
          />
        ))}
      </At>
      {noisy ? (
        <Reveal delay={0}>
          <g className="bob">
            <path className="ln thin" d="M276 122 l6 -8 l6 8 l6 -8 l6 8 l6 -8 l6 8" />
            <text className="t-label" x={316} y={104} fontSize={12.5} textAnchor="middle">
              PIIIP KRSSSJ
            </text>
          </g>
        </Reveal>
      ) : null}
      <Mugs n={1} x={332} y={FLOOR - 70} />
      <Reveal as="fade" delay={0.5}>
        <IkeaMan x={124} y={FLOOR - 80} pose="type" anim="type" />
      </Reveal>
    </>
  );
};

const RackScene = ({ seen }: SceneState) => {
  const pushed = useAfter(seen, 1200);
  return (
    <>
      <Window x={22} y={18} w={70} h={78} delay={0.1} />
      <Rack x={214} y={FLOOR} s={1.25} pulled={pushed ? 0 : 34} delay={0.2} />
      <Reveal as="fade" delay={0.5}>
        <IkeaMan
          x={142}
          y={FLOOR - 80}
          pose={pushed ? { torso: 8, sf: -58, ef: -22, sb: -40, eb: -30, hf: -16, kf: 10, hb: 18, kb: 4 } : "stand"}
        />
      </Reveal>
      {pushed ? <Click x={336} y={92} delay={0.9} /> : null}
      <Mugs n={1} x={50} />
    </>
  );
};

const Archive = ({ seen }: SceneState) => {
  const filed = useAfter(seen, 1400);
  return (
    <>
      <At x={196} y={FLOOR}>
        <P k="sh" d="M146 -150 L160 -160 L160 -10 L146 0 Z" delay={0.1} />
        <P k="sf" d="M0 -150 L14 -160 L160 -160 L146 -150 Z" delay={0.1} />
        <P k="ln" d={rect(0, -150, 146, 150)} delay={0.1} />
      </At>
      <Binders x={206} y={FLOOR - 82} n={filed ? 8 : 7} delay={0.3} />
      <Binders x={206} y={FLOOR - 6} n={8} delay={0.5} />
      <PaperStack x={110} y={FLOOR} n={6} delay={0.6} />
      <Reveal as="fade" delay={0.4}>
        <IkeaMan
          x={150}
          y={FLOOR - 80}
          pose={filed ? { sf: -100, ef: -6, sb: 8, eb: -10, hf: -3, kf: 3, hb: 4, kb: 2, head: -6 } : "stand"}
          frontItem={filed ? undefined : <HeldBinder upright={0} />}
        />
      </Reveal>
      {filed ? <Click x={372} y={60} delay={0.4} text="KLIKK!" /> : null}
      <Mugs n={2} x={36} />
    </>
  );
};

const Aml = ({ seen }: SceneState) => {
  const stopped = useAfter(seen, 1500);
  return (
    <>
      <Window x={22} y={18} w={70} h={78} night delay={0.1} />
      <WashingMachine x={256} y={FLOOR} s={1.25} delay={0.2}>
        <g className="spin-fast">
          <Bill s={0.55} r={20} delay={0.6} />
        </g>
      </WashingMachine>
      {/* a bank note on its way into the machine, stopped mid-air */}
      <P k="ln" className="thin dash" draw={false} d="M182 132 C214 88 262 92 292 158" />
      <At x={214} y={104} r={-18}>
        <g className="bob">
          <Bill delay={0.5} />
        </g>
      </At>
      <Cross x={262} y={100} s={1.4} delay={1.6} />
      <Reveal as="fade" delay={0.4}>
        <IkeaMan
          x={118}
          y={FLOOR - 80}
          pose="inspect"
          anim={stopped ? "nod" : undefined}
          frontItem={
            <g transform="rotate(70)">
              <Magnifier s={0.95} />
            </g>
          }
        />
      </Reveal>
      <Mugs n={3} x={30} />
    </>
  );
};

const ChurchScene = ({ seen }: SceneState) => {
  const ringing = useAfter(seen, 1800);
  return (
    <>
      {/* window with the church outside */}
      <At x={16} y={18}>
        <P k="ln" d={rect(0, 0, 128, 104)} delay={0.1} />
        <P k="ln" className="thin" d={rect(5, 5, 118, 94)} delay={0.15} />
        <Church x={60} y={96} s={0.72} delay={0.3} />
        <P k="sf" d={rect(-7, 104, 142, 5, 1.5)} delay={0.2} />
      </At>
      <Calendar x={176} y={22} s={1.15} month="AUG" delay={0.4} />
      <Desk x={262} y={FLOOR} w={170} h={70} delay={0.2} />
      <Chair x={170} y={FLOOR} delay={0.3} />
      <Laptop x={252} y={FLOOR - 70} s={0.9} delay={0.5}>
        <text className="t-mono" fontSize={7} textAnchor="middle" y={2}>
          360
        </text>
      </Laptop>
      {/* desk phone */}
      <At x={316} y={FLOOR - 70}>
        <P k="sf" d="M-15 0 L-11 -12 H11 L15 0 Z" delay={0.6} />
        <g className={ringing ? "ring" : undefined}>
          <Handset x={0} y={-16} r={90} s={0.62} delay={0.7} />
        </g>
        {ringing ? (
          <Reveal>
            <path className="ln thin" d="M-16 -28 l-6 -6 M0 -34 v-9 M16 -28 l6 -6" />
          </Reveal>
        ) : null}
      </At>
      <Mugs n={4} x={262} delay={0.9} />
      <Reveal as="fade" delay={0.5}>
        <IkeaMan x={174} y={FLOOR - 80} pose="type" anim="type" />
      </Reveal>
      {ringing ? <Bubble x={226} y={86} text="!" size={15} tail="left" /> : null}
    </>
  );
};

const FinalScene = ({ seen, inView }: SceneState) => {
  // cheer, then spot the leftover screw, then cheer again anyway
  const phase = useTimeline(seen && inView, [2600, 2600, 3000], true);
  const puzzled = phase === 1;
  return (
    <>
      <Bookcase x={222} y={FLOOR} h={176} delay={0.2} />
      <Reveal as="fade" delay={0.4}>
        <IkeaMan
          x={150}
          y={FLOOR - 80}
          pose={puzzled ? "scratch" : "cheer"}
          anim={puzzled ? "scratch" : "cheer"}
          flip={puzzled}
        />
      </Reveal>
      <Screw x={92} y={FLOOR - 6} r={96} len={24} delay={1} />
      {puzzled ? <Bubble x={112} y={70} text="?" size={17} tail="right" /> : null}
      <Mugs n={6} x={322} delay={1.1} />
    </>
  );
};

const scenes: Record<StepScene | "final", { label: string; draw: (s: SceneState) => ReactNode }> = {
  modem: {
    label: "Tom sitter ved en gammel PC om natten mens modemet piper",
    draw: (s) => <Modem {...s} />,
  },
  rack: { label: "Tom skyver en server inn i et rack til det sier klikk", draw: (s) => <RackScene {...s} /> },
  archive: { label: "Tom setter en perm på plass i en full arkivhylle", draw: (s) => <Archive {...s} /> },
  aml: {
    label: "Tom kontrollerer en pengeseddel med lupe. Penger i vaskemaskinen er forbudt.",
    draw: (s) => <Aml {...s} />,
  },
  church: {
    label: "Tom ved skrivebordet med kalender, PC og en ringende telefon. Kirken sees gjennom vinduet.",
    draw: (s) => <ChurchScene {...s} />,
  },
  final: {
    label: "Tom jubler foran den ferdige bokhyllen. En skrue ligger igjen på gulvet.",
    draw: (s) => <FinalScene {...s} />,
  },
};

const StepArt = ({ scene }: { scene: StepScene | "final" }) => (
  <Scene viewBox="0 0 400 250" label={scenes[scene].label} threshold={0.35}>
    {(state) => scenes[scene].draw(state)}
  </Scene>
);

export default StepArt;
