/*
 * All the content of the site in one place. The components only decide
 * how it looks; if a job, skill or game changes, change it here.
 */

export const person = {
  name: "Tom Erland Husby",
  product: "HUSBY",
  role: "Førstekonsulent",
  summary:
    "Førstekonsulent i Hamar bispedømme med over 15 års erfaring fra administrasjon, kundeservice og IT. Kombinerer administrativ kompetanse med lidenskap for digital kreativitet og generativ AI.",
  location: "Hamar / Innlandet",
  remote: "Hjemmekontor mulig",
  responseTime: "Vanligvis innen 24 til 48 timer",
  linkedin: "https://www.linkedin.com/in/tom-husby-29611392/",
  linkedinHandle: "tom-husby-29611392",
  github: "https://github.com/Tombonator3000",
  githubHandle: "@Tombonator3000",
};

export const roles = [
  "Administrasjon",
  "IT-støtte",
  "Digitalisering",
  "AI og automatisering",
  "Microsoft 365",
];

export const techStack = [
  "Microsoft 365",
  "Public 360",
  "Xledger",
  "Stable Diffusion",
  "ComfyUI",
  "Photoshop AI",
  "LLM / AI",
  "Automatisering",
  "Cybersikkerhet",
  "Digitalisering",
];

export const skills = [
  { name: "Microsoft 365", level: 95, part: "110365" },
  { name: "Administrasjon", level: 95, part: "100195" },
  { name: "Stable Diffusion / AI", level: 92, part: "100892" },
  { name: "Public 360", level: 90, part: "100360" },
  { name: "Xledger", level: 85, part: "100485" },
  { name: "Cybersikkerhet", level: 80, part: "100580" },
];

export type CapabilityKey = "A" | "B" | "C" | "D";

export const capabilities: { key: CapabilityKey; part: string; title: string; text: string }[] = [
  {
    key: "A",
    part: "Bein",
    title: "Stødig understell",
    text: "Over 15 år i arbeidslivet. Står støtt i kundeservice, saksbehandling, arkivering, kontering og fakturering.",
  },
  {
    key: "B",
    part: "Overkropp",
    title: "Digitalisering og struktur",
    text: "Skaper struktur og støtter både ledelse og medarbeidere. Finner smarte måter å effektivisere administrative oppgaver med moderne teknologi.",
  },
  {
    key: "C",
    part: "Armer",
    title: "Administrasjon og IT-støtte",
    text: "Kalenderstyring, saksbehandling og møteplanlegging. Håndterer IT- og telefoniløsninger med Microsoft 365, Public 360 og Xledger.",
  },
  {
    key: "D",
    part: "Hode",
    title: "AI og generativ kreativitet",
    text: "Omfattende praktisk erfaring med Stable Diffusion, ComfyUI, AI-plugins i Photoshop og store språkmodeller, både til kreative prosjekter og til å effektivisere hverdagen.",
  },
];

export type StepScene = "modem" | "rack" | "archive" | "aml" | "church";

export interface Step {
  kind: "utdanning" | "jobb";
  period: string;
  title: string;
  place: string;
  text: string;
  tags: string[];
  scene: StepScene;
  /** The parody instruction printed next to the drawing. */
  instruction: string;
}

export const steps: Step[] = [
  {
    kind: "utdanning",
    period: "2000 - 2001",
    title: "Drift av Internett-tjenester",
    place: "Høgskolen i Sør-Trøndelag (HiST) / NTNU",
    text: "Utdanning i nettverksadministrasjon og internettjenester.",
    tags: ["Nettverk", "Servere", "Internett"],
    scene: "modem",
    instruction: "Koble til modemet. Vent. Vent litt til. Hør etter den fine lyden.",
  },
  {
    kind: "utdanning",
    period: "2001 - 2002",
    title: "Configuring and Administering Microsoft Server/Infrastructure",
    place: "IT Akademiet",
    text: "Spesialisering i Microsoft-teknologi og serverinfrastruktur.",
    tags: ["Microsoft Server", "Infrastruktur"],
    scene: "rack",
    instruction: "Skyv serveren inn til du hører et klikk. Ikke bruk hammer.",
  },
  {
    kind: "jobb",
    period: "Aug 2014 - Okt 2017",
    title: "Sekretær",
    place: "Handel og Kontor Indre Østland",
    text: "Førstelinje kundeservice, saksbehandling og medlemspleie. Fysisk og digital arkivering, kontering og fakturering. Sertifisert LOfavør-veileder med kompetanse i medlemsfordeler og faglig rådgivning.",
    tags: ["Administrasjon", "Arkivering", "Medlemspleie"],
    scene: "archive",
    instruction: "Sorter alt i permer. Absolutt alt. Også permene.",
  },
  {
    kind: "jobb",
    period: "Okt 2018 - Apr 2021",
    title: "Fagkonsulent",
    place: "SpareBank 1 Østlandet (SDS Drift)",
    text: "Produksjons-, kontroll- og oppfølgingsoppgaver innen konto/AML og kundekontroll. Rådgivning og support til kolleger og kunder. Kvalitetssikring av antihvitvaskprosesser.",
    tags: ["Kundeservice", "AML", "Kvalitetssikring"],
    scene: "aml",
    instruction: "Penger skal ikke i vaskemaskinen. Kontroller dette grundig.",
  },
  {
    kind: "jobb",
    period: "Aug 2022 - nå",
    title: "Førstekonsulent",
    place: "Den norske kirke, Hamar bispedømme",
    text: "Daglig støttespiller for biskop og stiftsdirektør. Kalenderstyring, saksbehandling og møteplanlegging for en organisasjon med 10 prostier og 163 sogn. Håndterer IT- og telefoniløsninger, og bidrar med kontering og fakturering.",
    tags: ["Microsoft 365", "Public 360", "Xledger", "Saksbehandling"],
    scene: "church",
    instruction: "Hold styr på kalenderen. 10 prostier, 163 sogn, 1 Tom.",
  },
];

export type ProjectArt = "vector" | "deep" | "runner" | "shift" | "canvas" | "regrets" | "guild";

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  art: ProjectArt;
  part: string;
}

export const projects: Project[] = [
  {
    title: "Vector War",
    description:
      "Intenst flerspiller-kampspill med vektorgrafikk og høyt tempo. Kamp i sanntid med myk og presis styring.",
    tags: ["Webteknologi", "Sanntids flerspiller", "Vektorgrafikk"],
    link: "https://tombonator3000.github.io/vector-war-games/",
    art: "vector",
    part: "703.011",
  },
  {
    title: "The Deep Ones",
    description:
      "Mørkt fantasy-actionrollespill med intens kamp og en dyp fortelling. Utforsk mystiske fangehull og møt krevende fiender.",
    tags: ["Webteknologi", "Spillutvikling", "Eventyr"],
    link: "https://tombonator3000.github.io/the-deep-ones/",
    art: "deep",
    part: "703.022",
  },
  {
    title: "3044",
    description:
      "Kjapt cyberpunk-løpespill uten ende, med musikk som reagerer på det du gjør. Løp gjennom neonopplyste gater.",
    tags: ["Webteknologi", "Futuristisk", "Action"],
    link: "https://tombonator3000.github.io/3044/",
    art: "runner",
    part: "703.044",
  },
  {
    title: "State Shift Strategy",
    description:
      "Strategisk puslespill der du manipulerer tilstander og bytter perspektiv for å løse vanskelige brett.",
    tags: ["Webteknologi", "Strategi", "Puslespill"],
    link: "https://tombonator3000.github.io/state-shift-strategy/",
    art: "shift",
    part: "703.055",
  },
  {
    title: "Conspiracy Canvas",
    description:
      "Koble sammen punktene og avslør skjulte konspirasjoner. Bygg nettet ditt av bevis ved å knytte ledetråder sammen.",
    tags: ["Webteknologi", "Mysterium", "Detektiv"],
    link: "https://tombonator3000.github.io/conspiracy-canvas/",
    art: "canvas",
    part: "703.066",
  },
  {
    title: "Deep Regrets Digital",
    description:
      "En stemningsfull fortelling om valgene vi tar og hva de koster. Hver beslutning former veien videre.",
    tags: ["Webteknologi", "Fortelling", "Atmosfærisk"],
    link: "https://tombonator3000.github.io/deep-regrets-digital/",
    art: "regrets",
    part: "703.077",
  },
  {
    title: "Guild Life",
    description:
      "Bygg og styr ditt eget laug. Rekrutter medlemmer, fullfør oppdrag og bygg opp laugets rykte.",
    tags: ["Webteknologi", "Fellesskap", "Styring"],
    link: "https://guild-life.com/",
    art: "guild",
    part: "703.088",
  },
];

export const sections = [
  { id: "home", label: "Forside" },
  { id: "for-du-starter", label: "Før du starter" },
  { id: "about", label: "Innhold" },
  { id: "sprengskisse", label: "Sprengskisse" },
  { id: "montering", label: "Montering" },
  { id: "games", label: "Tillegg" },
  { id: "contact", label: "Kundeservice" },
] as const;
