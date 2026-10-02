import IkeaMan from "@/components/ikea/IkeaMan";
import { Scene } from "@/components/ikea/svg";
import { HiddenScrew } from "@/components/ikea/ScrewHunt";
import { person } from "@/data/cv";
import { ArrowUpIcon } from "./icons";

/** The back page: small print, a wave goodbye and the last loose screw. */
const BackCover = () => (
  <footer className="sheet back-cover" aria-labelledby="back-title">
    <div className="back-grid">
      <div className="back-art">
        <Scene viewBox="0 0 220 200" label="Tom vinker farvel">
          {({ seen }) => <IkeaMan x={100} y={110} scale={0.95} pose="present" anim={seen ? "wave" : undefined} />}
        </Scene>
        <HiddenScrew id="bakside" x={84} y={92} rotate={-100} size={24} />
      </div>
      <div>
        <p className="kicker">Bakside</p>
        <h2 id="back-title" className="back-title">
          HUSBY
        </h2>
        <p className="back-thanks">Takk for at du valgte HUSBY. Ta vare på anvisningen, du trenger den kanskje igjen.</p>
        <a href="#home" className="btn mt-6">
          <ArrowUpIcon />
          Tilbake til start
        </a>
      </div>
    </div>

    <div className="small-print">
      <p>
        HUSBY er ikke et IKEA-produkt, og denne siden har ingen tilknytning til IKEA. Den er en hyllest til verdens mest
        ordløse bruksanvisninger. {person.name} leveres ikke flatpakket, men kan ansettes.
      </p>
      <p className="mt-3">
        Inspirert av &laquo;IKEA Instructions&raquo; av Mike Sacks og Julian Sancton (Esquire, juni 2006). Ingen
        møbler ble skadet under produksjonen av denne siden. Én skrue er fortsatt savnet.
      </p>
      <p className="mt-6 flex flex-wrap justify-between gap-3 font-mono text-[12px] tracking-wider text-ink-3">
        <span>© {new Date().getFullYear()} {person.name}</span>
        <span>AA-2026-HUSBY-08</span>
      </p>
    </div>
  </footer>
);

export default BackCover;
