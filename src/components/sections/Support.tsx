import Sheet from "@/components/ikea/Sheet";
import IkeaMan from "@/components/ikea/IkeaMan";
import { Bubble } from "@/components/ikea/parts";
import { Building, Clock, Mug, Pencil, PhoneInHand } from "@/components/ikea/props";
import { At, P, Reveal, Scene } from "@/components/ikea/svg";
import { person } from "@/data/cv";
import { ExternalIcon, GitHubIcon, LinkedInIcon } from "./icons";

const CallScene = () => (
  <Scene viewBox="0 0 520 380" label="Tom ringer kundeservice i Hamar. Klokken på veggen går altfor fort.">
    {({ seen }) => (
      <>
        <Clock x={64} y={58} s={1.1} delay={0.1} />
        <Reveal as="fade" delay={0.8}>
          <text className="t-mono" x={64} y={104} fontSize={12} textAnchor="middle">
            24 - 48 t
          </text>
        </Reveal>

        <Reveal as="fade" delay={0.3}>
          <IkeaMan x={150} y={268} scale={1.05} pose="phone" anim={seen ? "nod" : undefined} frontItem={<PhoneInHand />} />
        </Reveal>
        <Bubble x={92} y={150} text="?" size={20} tail="right" delay={1.2} />
        <Mug x={232} y={354} s={1.1} delay={0.7} />

        <P k="ln" className="dots" draw={false} d="M206 146 C268 56 340 54 384 124" />
        <At x={386} y={128}>
          <Reveal delay={1.1}>
            <path className="ink" d="M3 5 L-9 2 L-3 -8 Z" />
          </Reveal>
        </At>

        <Building x={362} y={352} s={1.2} delay={0.4} />
        <g className="ring">
          <P k="ln" className="thin" d="M374 182 l-10 -9 M386 174 l-3 -12 M398 174 l4 -12" delay={1.4} />
        </g>
        <Bubble x={470} y={168} text="Hei!" size={26} kind="say" tail="left" fontSize={18} delay={1.8} />
        <Pencil x={296} y={360} r={-14} s={0.9} delay={0.9} />
      </>
    )}
  </Scene>
);

const rows = [
  { key: "LinkedIn", value: person.linkedinHandle, href: person.linkedin },
  { key: "GitHub", value: person.githubHandle, href: person.github },
  { key: "Lokasjon", value: `${person.location} (${person.remote.toLowerCase()})` },
  { key: "Svartid", value: person.responseTime },
  { key: "Åpningstider", value: "Hverdager. Stengt når kaffen er tom." },
];

const Support = () => (
  <Sheet
    id="contact"
    page={7}
    title="Kundeservice"
    lead="Åpen for nye muligheter innen administrasjon, IT-støtte, digitalisering eller roller der struktur møter moderne teknologi. Ta gjerne kontakt!"
  >
    <div className="grid items-center gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <CallScene />
      </div>

      <div className="lg:col-span-5">
        <div className="slip">
          <div className="slip-head">
            <span className="slip-title">Handleliste</span>
            <span className="slip-code">HUSBY / KUNDESERVICE</span>
          </div>
          <dl className="slip-rows">
            {rows.map((row) => (
              <div key={row.key} className="slip-row">
                <dt>{row.key}</dt>
                <dd>
                  {row.href ? (
                    <a href={row.href} target="_blank" rel="noopener noreferrer">
                      {row.value}
                      <span className="sr-only"> (åpnes i ny fane)</span>
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div className="slip-actions">
            <a className="btn btn-ink" href={person.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
              Send melding på LinkedIn
              <span className="sr-only"> (åpnes i ny fane)</span>
            </a>
            <a className="btn" href={person.github} target="_blank" rel="noopener noreferrer">
              <GitHubIcon />
              GitHub
              <ExternalIcon />
              <span className="sr-only"> (åpnes i ny fane)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </Sheet>
);

export default Support;
