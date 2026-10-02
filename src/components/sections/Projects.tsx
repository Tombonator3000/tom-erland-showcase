import Sheet from "@/components/ikea/Sheet";
import IkeaMan from "@/components/ikea/IkeaMan";
import { Scene } from "@/components/ikea/svg";
import { HiddenScrew } from "@/components/ikea/ScrewHunt";
import { person, projects } from "@/data/cv";
import ProjectArt from "./ProjectArt";
import { ExternalIcon, GitHubIcon } from "./icons";

const Projects = () => (
  <Sheet
    id="games"
    page={6}
    title="Tilleggsprodukter"
    lead="Kompatible hobbyprosjekter. Spillprototyper og interaktive eksperimenter laget på fritiden, for moro skyld. Ingen montering nødvendig, de kjører rett i nettleseren."
  >
    <ul className="products">
      {projects.map((project) => (
        <li key={project.title} className="product">
          <div className="product-art">
            <ProjectArt kind={project.art} />
            <span className="price-tag" aria-label="Pris: gratis">
              <span className="price">0,-</span>
              <span className="price-sub">Gratis</span>
            </span>
          </div>
          <div className="product-body">
            <p className="product-part">Art.nr. {project.part}</p>
            <h3 className="product-name">{project.title}</h3>
            <p className="product-desc">{project.description}</p>
            <ul className="product-tags" aria-label="Stikkord">
              {project.tags.map((tag) => (
                <li key={tag} className="tag">
                  {tag}
                </li>
              ))}
            </ul>
            <div className="product-foot">
              <span className="status">
                <span className="status-dot" aria-hidden="true" />
                Spillbar
              </span>
              <a className="btn btn-sm" href={project.link} target="_blank" rel="noopener noreferrer">
                Spill nå
                <ExternalIcon />
                <span className="sr-only"> {project.title} (åpnes i ny fane)</span>
              </a>
            </div>
          </div>
        </li>
      ))}

      <li className="product product-more">
        <div className="product-more-art">
          <Scene viewBox="0 0 220 190">
            <IkeaMan x={92} y={102} scale={0.82} pose="point" anim="nod" />
          </Scene>
          <HiddenScrew id="tillegg" x={86} y={90} rotate={115} size={26} />
        </div>
        <div className="product-body">
          <p className="product-part">Art.nr. 703.999</p>
          <h3 className="product-name">Flere produkter i serien</h3>
          <p className="product-desc">
            Disse er hobbyprosjekter og prototyper laget for moro skyld. For profesjonell erfaring, se
            monteringsanvisningen på side 5. Resten av sortimentet ligger på GitHub.
          </p>
          <div className="product-foot">
            <a className="btn" href={person.github} target="_blank" rel="noopener noreferrer">
              <GitHubIcon />
              Se alt på GitHub
              <span className="sr-only"> (åpnes i ny fane)</span>
            </a>
          </div>
        </div>
      </li>
    </ul>
  </Sheet>
);

export default Projects;
