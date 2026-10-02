import { useEffect, useState } from "react";
import IkeaMan from "@/components/ikea/IkeaMan";
import { AllenKey, Bubble, CamLock, Carton, Dowel, Plank, Screw } from "@/components/ikea/parts";
import { Mug, Window } from "@/components/ikea/props";
import { At, Drop, P, Reveal, Scene, SceneState } from "@/components/ikea/svg";
import { poly, rect } from "@/components/ikea/geom";
import { HiddenScrew } from "@/components/ikea/ScrewHunt";
import { useTimeline } from "@/hooks/use-in-view";
import { person, roles, techStack } from "@/data/cv";
import Conveyor from "./Conveyor";
import { ArrowIcon } from "./icons";

/* Box flaps for the opened carton (see Carton's cabinet projection). */
const W = 170;
const D = 70;
const DX = D * 0.56;
const DY = D * -0.4;
const openLid = (
  <>
    <P k="sh2" d={poly([[0, 0], [W, 0], [W + DX, DY], [DX, DY]])} delay={0.3} />
    <P k="sf" d={poly([[DX, DY], [W + DX, DY], [W + DX + 6, DY - 52], [DX + 6, DY - 52]])} delay={0.35} />
    <P k="sf" d={poly([[0, 0], [DX, DY], [DX - 46, DY - 18], [-46, -18]])} delay={0.4} />
    <P k="sh" d={poly([[W, 0], [W + DX, DY], [W + DX + 42, DY - 24], [W + 42, -24]])} delay={0.45} />
  </>
);

const CoverScene = () => (
  <Scene
    viewBox="0 0 640 480"
    threshold={0.2}
    label="Tom som IKEA-figur ved siden av en åpnet HUSBY-eske med skruer og plugger"
  >
    {({ seen, inView }) => <CoverSceneContent seen={seen} inView={inView} />}
  </Scene>
);

/* Split out so the timeline hooks can read the scene state. */
const CoverSceneContent = ({ seen, inView }: SceneState) => {
  // stand -> wave -> idle -> scratch head over the extra screw -> idle, repeat
  const phase = useTimeline(seen && inView, [1900, 3400, 3800, 3400, 4200], true);
  const [night, setNight] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setNight((n) => !n), night ? 3500 : 7500);
    return () => window.clearTimeout(t);
  }, [inView, night]);

  const pose = phase === 1 ? "present" : phase === 3 ? "scratch" : "stand";
  const anim = phase === 1 ? "wave" : phase === 3 ? "scratch" : "idle";

  return (
    <>
      <Window x={250} y={40} w={86} h={98} night={night} delay={0.1} />

      {/* height dimension */}
      <g>
        <P k="ln" className="hair dash" draw={false} d="M206 228 H150 M196 442 H150" />
        <P k="ln" className="thin" d="M158 230 V440" delay={1.2} />
        <P k="ln" className="thin" d="M150 230 H166 M150 440 H166" delay={1.1} />
        <Reveal delay={1.8}>
          <path className="ink" d="M158 231 l-5 11 h10 Z M158 439 l-5 -11 h10 Z" />
        </Reveal>
        <Reveal as="fade" delay={2}>
          <text className="t-label" fontSize={17} transform="translate(141 336) rotate(-90)" textAnchor="middle">
            15+ år
          </text>
        </Reveal>
      </g>

      {/* the open carton */}
      <Carton x={392} y={330} w={W} h={110} d={D} label="HUSBY" delay={0.2} lid={openLid} />

      {/* width dimension above the box */}
      <g>
        <P k="ln" className="hair dash" draw={false} d="M392 322 V236 M562 322 V236" />
        <P k="ln" className="thin" d="M394 244 H560" delay={1.4} />
        <Reveal delay={2}>
          <path className="ink" d="M395 244 l11 -5 v10 Z M559 244 l-11 -5 v10 Z" />
        </Reveal>
        <Reveal as="fade" delay={2.1}>
          <text className="t-label" fontSize={15} x={477} y={232} textAnchor="middle">
            1 stk. flatpakket
          </text>
        </Reveal>
      </g>

      {/* plank leaning on the box */}
      <Plank x={318} y={420} r={-66} w={150} h={8} d={24} holes={4} delay={0.6} />

      {/* loose parts on the floor */}
      <Drop delay={1.0}>
        <Screw x={316} y={458} r={96} len={30} delay={1} />
      </Drop>
      <Drop delay={1.1}>
        <Screw x={358} y={468} r={70} len={26} delay={1.1} />
      </Drop>
      <Drop delay={1.2}>
        <Dowel x={420} y={470} r={-80} delay={1.2} />
      </Drop>
      <Drop delay={1.3}>
        <Dowel x={452} y={462} r={-100} len={22} delay={1.3} />
      </Drop>
      <Drop delay={1.4}>
        <CamLock x={500} y={466} delay={1.4} />
      </Drop>
      <Drop delay={1.5}>
        <AllenKey x={548} y={470} r={-64} len={34} short={13} delay={1.5} />
      </Drop>

      {/* the manual itself, lying on the floor */}
      <At x={44} y={418} r={-8}>
        <P k="sf" d={rect(0, 0, 64, 44, 2)} delay={0.9} />
        <P k="ln" className="hair" d="M8 30 H40 M8 36 H30" delay={1.2} />
        <Reveal as="fade" delay={1.3}>
          <text className="t-label" x={8} y={20} fontSize={12}>
            HUSBY
          </text>
        </Reveal>
      </At>

      <Mug x={124} y={460} s={1.05} delay={0.9} />

      {/* Tom */}
      <Reveal as="fade" delay={0.5}>
        <IkeaMan x={232} y={350} scale={1.15} pose={pose} anim={seen ? anim : undefined} />
      </Reveal>

      {phase === 1 ? <Bubble x={318} y={214} text="Hei!" size={26} kind="say" tail="left" fontSize={19} /> : null}
      {phase === 3 ? <Bubble x={300} y={206} text="?" size={20} /> : null}
    </>
  );
};

/** Words that flip through "Bruksområde" like a label being swapped. */
const RoleFlipper = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setI((v) => (v + 1) % roles.length), 2300);
    return () => window.clearInterval(t);
  }, []);
  return (
    <p className="role-flip">
      <span className="role-flip-label">Bruksområde:</span>
      <span className="role-flip-window" aria-hidden="true">
        <span key={i} className="role-flip-word">
          {roles[i]}
        </span>
      </span>
      <span className="sr-only">{roles.join(", ")}</span>
    </p>
  );
};

const Cover = () => (
  <section id="home" className="sheet cover" aria-labelledby="home-title">
    <div className="grid items-center gap-8 md:grid-cols-12 md:gap-6">
      <div className="md:col-span-5">
        <p className="flex flex-wrap items-center gap-3">
          <span className="nyhet">Nyhet</span>
          <span className="kicker" style={{ letterSpacing: "0.08em" }}>
            Åpen for nye muligheter
          </span>
        </p>

        <h1 id="home-title" className="cover-title">
          HUSBY
        </h1>
        <p className="cover-name">{person.name}</p>
        <p className="cover-role">Førstekonsulent. Administrasjon, IT og generativ AI. Leveres med kaffe.</p>

        <RoleFlipper />

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#for-du-starter" className="btn btn-ink">
            Start monteringen <ArrowIcon className="btn-arrow" />
          </a>
          <a href="#contact" className="btn">
            Kundeservice
          </a>
        </div>

        <dl className="spec mt-9">
          <div>
            <dt>Artikkelnr.</dt>
            <dd>150.820.14</dd>
          </div>
          <div>
            <dt>Lokasjon</dt>
            <dd>{person.location}</dd>
          </div>
          <div>
            <dt>Monteringstid</dt>
            <dd>15+ år</dd>
          </div>
          <div>
            <dt>Antall</dt>
            <dd>1 stk.</dd>
          </div>
        </dl>
      </div>

      <div className="relative md:col-span-7">
        <div className="note-yellow cover-note">
          <strong className="block text-[15px] font-black uppercase tracking-wide">OBS!</strong>
          <span className="text-[15px] leading-snug">
            I motsetning til vanlige monteringsanvisninger inneholder denne ord. Vi beklager.
          </span>
        </div>
        <div className="relative">
          <CoverScene />
          <HiddenScrew id="forside" x={95} y={95.5} rotate={40} />
        </div>
      </div>
    </div>

    <Conveyor items={techStack} />

    <div className="sheet-foot" aria-hidden="true">
      <span>AA-2026-HUSBY-01</span>
      <span className="page-no">1</span>
    </div>
  </section>
);

export default Cover;
