import Sheet from "@/components/ikea/Sheet";
import { HiddenScrew } from "@/components/ikea/ScrewHunt";
import { steps } from "@/data/cv";
import StepArt from "./StepScenes";
import { ArrowIcon } from "./icons";

const AssemblySteps = () => (
  <Sheet
    id="montering"
    page={5}
    title="Monteringsanvisning"
    lead="Følg trinnene i rekkefølge. Tom har allerede gjort jobben, så du kan bare se på. Kaffekoppene er ikke en del av leveransen."
  >
    <ol className="steps">
      {steps.map((step, i) => (
        <li key={step.title} className="step">
          <div className="step-head">
            <span className="step-no" aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <p className="kicker">
                <span className="sr-only">Trinn {i + 1}. </span>
                {step.kind === "utdanning" ? "Utdanning" : "Arbeid"} / {step.period}
              </p>
              <p className="step-instruction">{step.instruction}</p>
            </div>
          </div>

          <div className="step-art">
            <StepArt scene={step.scene} />
            {step.scene === "archive" ? <HiddenScrew id="montering" x={95} y={93} rotate={-60} size={26} /> : null}
          </div>

          <div className="callout step-detail">
            <span className="callout-lens" aria-hidden="true" />
            <h3 className="step-title">{step.title}</h3>
            <p className="step-place">{step.place}</p>
            <p className="step-text">{step.text}</p>
            <ul className="step-tags" aria-label="Stikkord">
              {step.tags.map((tag) => (
                <li key={tag} className="tag">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}

      <li className="step step-final">
        <div className="step-head">
          <span className="step-no" aria-hidden="true">
            {steps.length + 1}
          </span>
          <div>
            <p className="kicker">
              <span className="sr-only">Trinn {steps.length + 1}. </span>Ferdig
            </p>
            <p className="step-instruction">Én skrue til overs. Det er helt normalt. Ikke tenk mer på det.</p>
          </div>
        </div>
        <div className="step-art">
          <StepArt scene="final" />
        </div>
        <div className="callout step-detail">
          <span className="callout-lens" aria-hidden="true" />
          <h3 className="step-title">Neste trinn: din arbeidsplass?</h3>
          <p className="step-text">
            Åpen for nye muligheter innen administrasjon, IT-støtte, digitalisering eller roller der struktur møter
            moderne teknologi.
          </p>
          <a href="#contact" className="btn btn-ink mt-5">
            Ta kontakt <ArrowIcon className="btn-arrow" />
          </a>
        </div>
      </li>
    </ol>
  </Sheet>
);

export default AssemblySteps;
