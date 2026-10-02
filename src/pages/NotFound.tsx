import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import IkeaMan from "@/components/ikea/IkeaMan";
import { Bubble, Dowel, Plank, Screw } from "@/components/ikea/parts";
import { Mug } from "@/components/ikea/props";
import { Scene } from "@/components/ikea/svg";
import { ArrowIcon } from "@/components/sections/icons";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: fant ikke siden", location.pathname);
  }, [location.pathname]);

  return (
    <main className="notfound">
      <section className="sheet" aria-labelledby="nf-title">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <Scene viewBox="0 0 420 300" label="Tom ligger utslitt på gulvet mellom løse deler">
            <Plank x={40} y={238} w={150} h={8} d={26} holes={4} />
            <Plank x={250} y={262} r={-8} w={120} h={8} d={22} holes={3} />
            <Screw x={60} y={276} r={80} len={26} delay={0.2} />
            <Dowel x={200} y={286} r={-70} delay={0.3} />
            <Screw x={340} y={226} r={-120} len={22} delay={0.4} />
            <Mug x={380} y={290} delay={0.5} />
            <IkeaMan x={210} y={196} pose="lie" />
            <Bubble x={250} y={92} text="?" size={22} delay={0.8} />
          </Scene>
          <div>
            <p className="kicker">Feilkode 404</p>
            <h1 id="nf-title" className="sheet-title mt-3">
              Del 404 mangler
            </h1>
            <p className="lead mt-5">
              Denne siden fulgte ikke med i pakken. Sjekk under esken, eller gå tilbake til start og prøv igjen.
            </p>
            <p className="kicker mt-4">Adresse: {location.pathname}</p>
            <Link to="/" className="btn btn-ink mt-8">
              Tilbake til forsiden <ArrowIcon className="btn-arrow" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
