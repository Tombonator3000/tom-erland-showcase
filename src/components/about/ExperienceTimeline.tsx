import { Briefcase } from "lucide-react";
import TiltCard from "@/components/TiltCard";

const experience = [
  {
    title: "Førstekonsulent",
    company: "Den Norske Kirke, Hamar Bispedømme",
    period: "Aug 2022 - Nå",
    description: "Daglig støttespiller for biskop og stiftsdirektør. Kalenderstyring, saksbehandling, møteplanlegging for organisasjon med 10 prostier og 163 sogn. Håndterer IT- og telefoniløsninger, samt støtte med kontering og fakturering.",
    tech: ["Microsoft 365", "Public 360", "Xledger", "Saksbehandling"],
  },
  {
    title: "Fagkonsulent",
    company: "SpareBank 1 Østlandet (SDS Drift)",
    period: "Okt 2018 - Apr 2021",
    description: "Produksjons-, kontroll- og oppfølgingsoppgaver innen konto/AML og kundekontroll. Rådgivning og support til kolleger og kunder. Kvalitetssikring av antihvitvaskprosesser.",
    tech: ["Kundeservice", "AML", "Kvalitetssikring"],
  },
  {
    title: "Sekretær",
    company: "Handel og Kontor Indre Østland",
    period: "Aug 2014 - Okt 2017",
    description: "Førstelinje kundeservice, saksbehandling og medlemspleie. Fysisk og digital arkivering, kontering og fakturering. Sertifisert LOfavør-veileder med kompetanse i medlemsfordeler og faglig rådgivning.",
    tech: ["Administrasjon", "Arkivering", "Medlemspleie"],
  },
];

interface ExperienceTimelineProps {
  isVisible: boolean;
  sectionRef: (node?: Element | null) => void;
}

const ExperienceTimeline = ({ isVisible, sectionRef }: ExperienceTimelineProps) => {
  return (
    <div
      ref={sectionRef}
      className={`mb-24 reveal ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: '0.3s' }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 glass rounded-xl flex items-center justify-center glow-cyan">
          <Briefcase className="text-cyan-400" size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Work Experience</h3>
          <p className="text-muted-foreground text-sm">My professional journey</p>
        </div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-cyan-500 to-pink-500 opacity-30" />

        <div className="space-y-8">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="relative pl-16 group"
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 top-2 w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 border-4 border-background group-hover:scale-125 transition-transform" />

              <TiltCard intensity={5}>
                <div className="glass rounded-2xl p-6 card-hover">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h4 className="text-xl font-bold">{exp.title}</h4>
                      <p className="text-purple-400">{exp.company}</p>
                    </div>
                    <span className="text-sm text-muted-foreground px-3 py-1 glass rounded-full">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceTimeline;
