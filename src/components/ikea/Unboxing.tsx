import { useEffect, useState } from "react";
import IkeaMan from "./IkeaMan";
import { Carton } from "./parts";
import { P } from "./svg";
import { poly } from "./geom";

/*
 * Intro: the HUSBY box shakes, the flaps open and Tom pops out to say hi.
 * Plays once per session, can be skipped, and never runs with reduced motion.
 */

const W = 170;
const D = 70;
const DX = D * 0.56;
const DY = D * -0.4;

const messages = [
  "Åpner esken",
  "Teller skruer: 144 av 145",
  "Leter etter insexnøkkelen",
  "Leser anvisningen (for første gang)",
  "Klar!",
];

const Unboxing = ({ onDone }: { onDone: () => void }) => {
  const [phase, setPhase] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const times = [700, 1250, 1800, 2350];
    const timers = times.map((t, i) => window.setTimeout(() => setPhase(i + 1), t));
    timers.push(window.setTimeout(() => setLeaving(true), 2900));
    timers.push(window.setTimeout(onDone, 3400));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [onDone]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDone();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onDone]);

  const open = phase >= 1;
  const out = phase >= 2;

  const lid = open ? (
    <>
      <P k="sh2" draw={false} d={poly([[0, 0], [W, 0], [W + DX, DY], [DX, DY]])} />
      <P k="sf" draw={false} className="flap" d={poly([[DX, DY], [W + DX, DY], [W + DX + 6, DY - 52], [DX + 6, DY - 52]])} />
      <P k="sf" draw={false} className="flap" d={poly([[0, 0], [DX, DY], [DX - 46, DY - 18], [-46, -18]])} />
      <P k="sh" draw={false} className="flap" d={poly([[W, 0], [W + DX, DY], [W + DX + 42, DY - 24], [W + 42, -24]])} />
      <g clipPath="url(#unbox-clip)">
        <g className={out ? "unbox-man is-out" : "unbox-man"}>
          <IkeaMan x={W / 2 + 12} y={96} scale={0.82} pose={out ? "cheer" : "stand"} anim={out ? "cheer" : undefined} />
        </g>
      </g>
    </>
  ) : undefined;

  return (
    <div className={leaving ? "unboxing is-leaving" : "unboxing"} role="status" aria-live="polite">
      <div className="unboxing-card">
        <svg viewBox="-70 -110 330 240" className="scene is-drawn unboxing-svg" aria-hidden="true">
          <defs>
            <clipPath id="unbox-clip">
              <rect x={-80} y={-260} width={W + 160} height={260 + 106} />
            </clipPath>
          </defs>
          <g className={open ? "unbox-box" : "unbox-box is-shaking"}>
            <Carton x={0} y={0} w={W} h={110} d={D} label="HUSBY" lid={lid} />
          </g>
        </svg>
        <p className="unboxing-text">{messages[phase]}</p>
        <div className="unboxing-bar" aria-hidden="true">
          <span style={{ transform: `scaleX(${Math.min(1, (phase + 1) / messages.length)})` }} />
        </div>
        <button type="button" className="unboxing-skip" onClick={onDone}>
          Hopp over
        </button>
      </div>
    </div>
  );
};

export default Unboxing;
