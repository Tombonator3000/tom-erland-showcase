import { CSSProperties, ReactNode } from "react";
import Sheet from "@/components/ikea/Sheet";
import IkeaMan from "@/components/ikea/IkeaMan";
import { AllenKey } from "@/components/ikea/parts";
import { Calendar, Diploma, Gamepad, Mug, Office } from "@/components/ikea/props";
import { At, P, Scene } from "@/components/ikea/svg";
import { rect } from "@/components/ikea/geom";
import { HiddenScrew } from "@/components/ikea/ScrewHunt";
import { useScrewHunt } from "@/components/ikea/hunt-context";
import { useCountUp, useInView, useWidth } from "@/hooks/use-in-view";
import { person, skills } from "@/data/cv";

/* ---------- Innhold i pakken ---------- */

interface Item {
  count: string;
  name: string;
  note?: string;
  part: string;
  art: ReactNode;
}

const items: Item[] = [
  {
    count: "1x",
    name: "Førstekonsulent",
    note: "Ferdig montert",
    part: "100001",
    art: <IkeaMan x={70} y={64} scale={0.43} pose="stand" anim="idle" />,
  },
  {
    count: "15x",
    name: "År med erfaring",
    note: "Minst",
    part: "101500",
    art: (
      <>
        <Calendar x={54} y={30} r={6} month="2014" delay={0.1} />
        <Calendar x={46} y={36} month="2026" delay={0.25} />
      </>
    ),
  },
  {
    count: "3x",
    name: "Arbeidsgivere",
    note: "Organisasjon, bank og kirke",
    part: "100003",
    art: (
      <>
        <Office x={8} y={96} s={0.62} delay={0.1} />
        <Office x={48} y={96} s={0.62} delay={0.2} />
        <Office x={88} y={96} s={0.62} delay={0.3} />
      </>
    ),
  },
  {
    count: "2x",
    name: "Utdanninger",
    note: "HiST / NTNU og IT Akademiet",
    part: "100002",
    art: (
      <>
        <Diploma x={70} y={48} r={-10} delay={0.1} />
        <Diploma x={70} y={80} r={6} delay={0.3} />
      </>
    ),
  },
  {
    count: "7x",
    name: "Hobbyspill",
    note: "Se side 6",
    part: "100007",
    art: <Gamepad x={70} y={62} s={1.45} delay={0.1} />,
  },
  {
    count: "1x",
    name: "Insexnøkkel",
    note: "Følger med",
    part: "100100",
    art: <AllenKey x={56} y={96} r={-38} len={74} short={26} s={1.05} delay={0.1} />,
  },
  {
    count: "1x",
    name: "Kaffekopp",
    note: "Alltid full",
    part: "100042",
    art: <Mug x={68} y={98} s={2.2} delay={0.1} />,
  },
];

const ExtraScrew = () => {
  const { found } = useScrewHunt();
  const gone = found.includes("innhold");
  return (
    <li className="inv-cell">
      <span className="inv-count">{gone ? "0x" : "1x"}</span>
      <div className="inv-art relative">
        <Scene viewBox="0 0 140 110">
          {gone ? (
            <At x={70} y={56} r={-35}>
              <P k="ln" className="thin dash" draw={false} d={rect(-7, -22, 14, 44, 6)} />
            </At>
          ) : null}
        </Scene>
        <HiddenScrew id="innhold" x={50} y={50} size={70} rotate={10} className="is-obvious" />
      </div>
      <p className="inv-name">Ekstra skrue</p>
      <p className="inv-note">{gone ? "Funnet. Den lå her hele tiden." : "Du finner aldri ut hvor den skal."}</p>
      <p className="inv-part">100404</p>
    </li>
  );
};

/* ---------- Skrueoversikt 1:1 ---------- */

const HEAD = 15;
const PAD_RIGHT = 14;

const shaftLength = (width: number, level: number) => Math.max(0, ((width - HEAD - PAD_RIGHT) * level) / 100);

const ScrewBar = ({ level, width, visible, index }: { level: number; width: number; visible: boolean; index: number }) => {
  const len = shaftLength(width, level);
  const tip = 13;
  let threads = "";
  for (let x = HEAD + 6; x < HEAD + len - tip - 2; x += 7) threads += `M${x} 12.5 L${x + 5} 23.5`;
  return (
    <svg className="screw-svg" viewBox={`0 0 ${Math.max(width, 1)} 36`} height={36} aria-hidden="true" focusable="false">
      <g
        className={visible ? "screw-move is-in" : "screw-move"}
        style={{ transform: visible ? "translateX(0)" : `translateX(${-(len + HEAD + 4)}px)`, "--d": `${index * 0.12}s` } as CSSProperties}
      >
        <path
          d={`M${HEAD - 2} 12 H${HEAD + len - tip} L${HEAD + len} 18 L${HEAD + len - tip} 24 H${HEAD - 2} Z`}
          fill="var(--sheet)"
          stroke="var(--ink)"
          strokeWidth={2.4}
          strokeLinejoin="round"
        />
        <path d={threads} stroke="var(--ink)" strokeWidth={1.2} />
        <path
          d={`M${HEAD} 3 C6 3 2 9 2 18 C2 27 6 33 ${HEAD} 33 Z`}
          fill="var(--sheet)"
          stroke="var(--ink)"
          strokeWidth={2.4}
          strokeLinejoin="round"
        />
        <path className="screw-slot" d="M7 13 V23" stroke="var(--ink)" strokeWidth={2.2} strokeLinecap="round" />
      </g>
    </svg>
  );
};

const RulerBar = ({ width }: { width: number }) => {
  const usable = width - HEAD - PAD_RIGHT;
  const step = usable / 100 >= 4 ? 1 : 2;
  const ticks: string[] = [];
  const labels: ReactNode[] = [];
  for (let i = 0; i <= 100; i += step) {
    const x = HEAD + (usable * i) / 100;
    const h = i % 10 === 0 ? 13 : i % 5 === 0 ? 8 : 4.5;
    ticks.push(`M${x.toFixed(1)} 30 V${30 - h}`);
    if (i % (width < 520 ? 20 : 10) === 0) {
      labels.push(
        <text key={i} x={x} y={12} textAnchor="middle" className="ruler-num">
          {i}
        </text>,
      );
    }
  }
  return (
    <svg className="screw-svg" viewBox={`0 0 ${Math.max(width, 1)} 34`} height={34} aria-hidden="true" focusable="false">
      {labels}
      <path d={ticks.join("")} stroke="var(--ink)" strokeWidth={1.2} />
      <path d={`M${HEAD} 30 H${HEAD + usable}`} stroke="var(--ink)" strokeWidth={2} />
    </svg>
  );
};

const SkillRow = ({ name, level, part, index, visible }: { name: string; level: number; part: string; index: number; visible: boolean }) => {
  const { ref, width } = useWidth<HTMLDivElement>();
  const value = useCountUp(level, visible, 1300, index * 120);
  return (
    <li className="skill-row">
      <div className="skill-label">
        <span className="skill-name">{name}</span>
        <span className="skill-part">Del {part}</span>
        <span className="skill-value" aria-label={`${level} av 100`}>
          {value} mm
        </span>
      </div>
      <div ref={ref} className="skill-track">
        {width ? <ScrewBar level={level} width={width} visible={visible} index={index} /> : null}
      </div>
    </li>
  );
};

const ScrewChart = () => {
  const { ref, seen } = useInView<HTMLDivElement>(0.25);
  const ruler = useWidth<HTMLDivElement>();
  return (
    <div ref={ref} className="screw-chart">
      <div className="screw-chart-head">
        <div className="scale-stamp" aria-hidden="true">
          1:1
        </div>
        <div>
          <h3 className="text-2xl font-extrabold tracking-tight">Skrueoversikt</h3>
          <p className="mt-1 max-w-[56ch] text-ink-2">
            Hold skruen mot skjermen for å finne riktig størrelse. Jo lengre skrue, jo mer kompetanse. Linjalen er
            dessverre ikke kalibrert.
          </p>
        </div>
      </div>

      <div className="skill-row skill-ruler" aria-hidden="true">
        <div className="skill-label">
          <span className="skill-part">Nivå i mm</span>
        </div>
        <div ref={ruler.ref} className="skill-track">
          {ruler.width ? <RulerBar width={ruler.width} /> : null}
        </div>
      </div>
      <ol className="skill-list">
        {skills.map((s, i) => (
          <SkillRow key={s.name} name={s.name} level={s.level} part={s.part} index={i} visible={seen} />
        ))}
      </ol>
    </div>
  );
};

const PartsList = () => (
  <Sheet
    id="about"
    page={3}
    title="Innhold i pakken"
    lead="Tell delene før du starter. Mangler det noe, kontakt kundeservice. Har du noe til overs, er det helt normalt."
  >
    <ul className="inventory">
      {items.map((item) => (
        <li key={item.name} className="inv-cell">
          <span className="inv-count">{item.count}</span>
          <div className="inv-art">
            <Scene viewBox="0 0 140 110">{item.art}</Scene>
          </div>
          <p className="inv-name">{item.name}</p>
          {item.note ? <p className="inv-note">{item.note}</p> : null}
          <p className="inv-part">{item.part}</p>
        </li>
      ))}
      <ExtraScrew />
    </ul>

    <div className="product-info">
      <p className="kicker">Produktbeskrivelse</p>
      <p className="product-info-text">{person.summary}</p>
    </div>

    <ScrewChart />
  </Sheet>
);

export default PartsList;
