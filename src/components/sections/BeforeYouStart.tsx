import { ReactNode } from "react";
import Sheet from "@/components/ikea/Sheet";
import IkeaMan from "@/components/ikea/IkeaMan";
import { AllenKey, Bubble, Check, Count, Cross, Sweat } from "@/components/ikea/parts";
import { BigPanel, Binders, Building, Hourglass, Laptop, Mug, PaperMess, PhoneInHand } from "@/components/ikea/props";
import { At, P, Reveal, Scene } from "@/components/ikea/svg";
import { rect } from "@/components/ikea/geom";

/* A framed pictogram half with the wrong/right mark in the corner. */
const Frame = ({ x, ok, delay = 0, children }: { x: number; ok: boolean; delay?: number; children: ReactNode }) => (
  <At x={x}>
    <P k="ln" d={rect(4, 4, 212, 222, 16)} delay={delay} />
    {children}
    {ok ? <Check x={190} y={30} delay={delay + 1.1} /> : <Cross x={190} y={30} delay={delay + 1.1} />}
  </At>
);

const ToolsScene = () => (
  <Scene viewBox="0 0 440 150" label="Du trenger: kaffe, Microsoft 365, tålmodighet og en insexnøkkel">
    <Mug x={55} y={112} s={2} delay={0.1} />
    <Laptop x={165} y={118} s={1.15} delay={0.25}>
      <text className="t-label" fontSize={11} textAnchor="middle" y={4}>
        365
      </text>
    </Laptop>
    <Hourglass x={275} y={80} s={1.25} delay={0.4} />
    <AllenKey x={372} y={112} r={-30} len={62} short={22} s={1.1} delay={0.55} />
    <Count x={14} y={142} n="1x" size={15} delay={0.9} />
    <Count x={124} y={142} n="1x" size={15} delay={1} />
    <Count x={234} y={142} n="∞" size={15} delay={1.1} />
    <Count x={344} y={142} n="1x" size={15} delay={1.2} />
  </Scene>
);

const TeamScene = () => (
  <Scene viewBox="0 0 440 230" label="Én person som sliter med en tung plate er feil. To personer som bærer sammen er riktig.">
    <Frame x={0} ok={false}>
      <Reveal as="fade" delay={0.5}>
        <IkeaMan
          x={84}
          y={152}
          scale={0.6}
          pose={{ torso: -12, head: 10, sf: -64, ef: -60, sb: -50, eb: -62, hf: -16, kf: 24, hb: 20, kb: 6 }}
          anim="shake"
        />
      </Reveal>
      <At x={152} y={170} r={34}>
        <BigPanel w={140} delay={0.3} />
      </At>
      <Sweat x={64} y={82} delay={1.2} />
    </Frame>
    <Frame x={224} ok delay={0.2}>
      <BigPanel x={112} y={139} w={128} delay={0.5} />
      <Reveal as="fade" delay={0.7}>
        <IkeaMan x={52} y={152} scale={0.6} pose="carry" />
        <IkeaMan x={176} y={152} scale={0.6} pose="carry" flip />
      </Reveal>
    </Frame>
  </Scene>
);

const OrderScene = () => (
  <Scene viewBox="0 0 440 230" label="Papirkaos er feil. Pent sorterte permer er riktig.">
    <Frame x={0} ok={false}>
      <PaperMess x={136} y={200} s={1.1} delay={0.3} />
      <Reveal as="fade" delay={0.5}>
        <IkeaMan x={58} y={152} scale={0.6} pose="shrug" anim="shake" />
      </Reveal>
      <Bubble x={92} y={70} size={14} tail="left" delay={1.3} />
    </Frame>
    <Frame x={224} ok delay={0.2}>
      <Binders x={100} y={200} n={6} delay={0.4} />
      <Reveal as="fade" delay={0.7}>
        <IkeaMan x={52} y={152} scale={0.6} pose="point" anim="nod" />
      </Reveal>
    </Frame>
  </Scene>
);

const CallScene = () => (
  <Scene viewBox="0 0 440 230" label="Ved spørsmål, ring til HUSBY i Hamar">
    <P k="ln" d={rect(4, 4, 432, 222, 16)} delay={0} />
    <Reveal as="fade" delay={0.3}>
      <IkeaMan x={84} y={156} scale={0.62} pose="phone" anim="nod" frontItem={<PhoneInHand />} />
    </Reveal>
    <Bubble x={128} y={60} size={15} tail="left" delay={1.4} />
    <P k="ln" className="dots" draw={false} d="M140 112 C200 60 250 60 292 104" />
    <At x={292} y={104}>
      <Reveal delay={1.2}>
        <path className="ink" d="M2 4 L-9 1 L-4 -8 Z" />
      </Reveal>
    </At>
    <Building x={296} y={204} s={0.95} delay={0.5} />
    <g className="ring" style={{ transformOrigin: "50% 50%" }}>
      <P k="ln" className="thin" d="M300 64 l-9 -8 M308 58 l-3 -11 M318 58 l3 -11" delay={1.5} />
    </g>
  </Scene>
);

const panels = [
  {
    title: "Du trenger",
    text: "Kaffe, Microsoft 365, tålmodighet og insexnøkkelen som følger med. Tålmodighet selges dessverre ikke separat.",
    scene: <ToolsScene />,
    labels: ["Kaffe", "Microsoft 365", "Tålmodighet", "Insexnøkkel"],
  },
  {
    title: "Monteres best sammen med andre",
    text: "HUSBY er laget for samarbeid. Fungerer også alene, men det blir mindre hyggelig for alle.",
    scene: <TeamScene />,
  },
  {
    title: "Hold orden",
    text: "Struktur er inkludert i leveransen. Arkivet ditt kommer til å takke deg, og det gjør sjelden noe sånt.",
    scene: <OrderScene />,
  },
  {
    title: "Ved spørsmål",
    text: "Ta kontakt. Han svarer, vanligvis innen 24 til 48 timer. Ingen ventemusikk.",
    scene: <CallScene />,
  },
];

const BeforeYouStart = () => (
  <Sheet
    id="for-du-starter"
    page={2}
    title="Før du starter"
    lead="Les hele anvisningen før du begynner. Det er det ingen som gjør, men det står alltid her likevel."
  >
    <div className="grid gap-6 md:grid-cols-2 md:gap-8">
      {panels.map((panel) => (
        <article key={panel.title} className="pictogram">
          {panel.scene}
          {panel.labels ? (
            <ul className="tool-labels" aria-hidden="true">
              {panel.labels.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          ) : null}
          <h3 className="pictogram-title">{panel.title}</h3>
          <p className="pictogram-text">{panel.text}</p>
        </article>
      ))}
    </div>
  </Sheet>
);

export default BeforeYouStart;
