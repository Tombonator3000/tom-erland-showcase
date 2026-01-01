import { Bot, Briefcase, Sparkles, GraduationCap, Award, Zap, Shield } from "lucide-react";
import { useParallax, useElementInView } from "@/hooks/use-parallax";
import { useAnimatedCounter } from "@/hooks/use-fancy-effects";
import TiltCard from "@/components/TiltCard";

const skills = [
  { name: "Microsoft 365", level: 95, color: "from-purple-500 to-pink-500" },
  { name: "Public 360", level: 90, color: "from-cyan-500 to-blue-500" },
  { name: "Xledger", level: 85, color: "from-purple-500 to-cyan-500" },
  { name: "Stable Diffusion/AI", level: 92, color: "from-pink-500 to-purple-500" },
  { name: "Administrasjon", level: 95, color: "from-cyan-500 to-pink-500" },
  { name: "Cybersikkerhet", level: 80, color: "from-blue-500 to-purple-500" },
];

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

const education = [
  {
    degree: "Configuring and Administering Microsoft Server/Infrastructure",
    school: "IT Akademiet",
    year: "2001-2002",
    description: "Spesialisering i Microsoft-teknologi og serverinfrastruktur.",
  },
  {
    degree: "Drift av Internett tjenester",
    school: "Høgskolen i Sør-Trøndelag (HiST) / NTNU",
    year: "2000-2001",
    description: "Utdanning i nettverksadministrasjon og internettjenester.",
  },
];

// Animated skill bar component
const AnimatedSkillBar = ({ skill, index, isVisible }: { skill: typeof skills[0]; index: number; isVisible: boolean }) => {
  const { count, ref } = useAnimatedCounter(skill.level, 1500);

  return (
    <TiltCard intensity={8} glare={true}>
      <div
        ref={ref}
        className="glass rounded-xl p-5 card-hover"
        style={{ transitionDelay: `${index * 0.1}s` }}
      >
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold">{skill.name}</span>
          <span className="text-sm text-muted-foreground font-mono">{isVisible ? count : 0}%</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000`}
            style={{
              width: isVisible ? `${skill.level}%` : '0%',
              transitionDelay: `${index * 0.15}s`
            }}
          />
        </div>
      </div>
    </TiltCard>
  );
};

const About = () => {
  const parallaxOffset = useParallax(0.2);
  const [headerRef, headerInView] = useElementInView(0.2);
  const [skillsRef, skillsInView] = useElementInView(0.2);
  const [expRef, expInView] = useElementInView(0.1);
  const [eduRef, eduInView] = useElementInView(0.2);

  return (
    <section id="about" className="relative py-32 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]"
        style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]"
        style={{ transform: `translateY(${-parallaxOffset * 0.3}px)` }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`text-center mb-20 reveal ${headerInView ? 'visible' : ''}`}
        >
          <span className="inline-block px-4 py-1 glass rounded-full text-sm text-purple-400 mb-4">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Om meg</span>
            <br />
            <span className="text-foreground">Min bakgrunn</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Førstekonsulent i Hamar bispedømme med over 15 års erfaring fra administrasjon,
            kundeservice og IT. Jeg kombinerer administrativ kompetanse med lidenskap for
            digital kreativitet og generativ AI.
          </p>
        </div>

        {/* Skills section */}
        <div
          ref={skillsRef}
          className={`mb-24 reveal ${skillsInView ? 'visible' : ''}`}
          style={{ transitionDelay: '0.2s' }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 glass rounded-xl flex items-center justify-center glow">
              <Zap className="text-purple-400" size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Technical Skills</h3>
              <p className="text-muted-foreground text-sm">Core competencies</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <AnimatedSkillBar
                key={skill.name}
                skill={skill}
                index={index}
                isVisible={skillsInView}
              />
            ))}
          </div>
        </div>

        {/* Capabilities grid */}
        <div className={`grid md:grid-cols-3 gap-6 mb-24 stagger-children ${skillsInView ? 'visible' : ''}`}>
          <TiltCard intensity={10}>
            <div className="glass rounded-2xl p-8 card-hover group h-full">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="text-purple-400" size={28} />
              </div>
              <h4 className="text-xl font-bold mb-3">Administrasjon & IT-støtte</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Kalenderstyring, saksbehandling og møteplanlegging. Håndterer IT- og
                telefoniløsninger med Microsoft 365, Public 360 og Xledger.
              </p>
            </div>
          </TiltCard>

          <TiltCard intensity={10}>
            <div className="glass rounded-2xl p-8 card-hover group h-full">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bot className="text-cyan-400" size={28} />
              </div>
              <h4 className="text-xl font-bold mb-3">AI & Generativ Kreativitet</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Omfattende praktisk erfaring med Stable Diffusion, ComfyUI, Photoshop
                AI-plugins og store språkmodeller for kreative prosjekter og effektivisering.
              </p>
            </div>
          </TiltCard>

          <TiltCard intensity={10}>
            <div className="glass rounded-2xl p-8 card-hover group h-full">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="text-pink-400" size={28} />
              </div>
              <h4 className="text-xl font-bold mb-3">Digitalisering & Struktur</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Skaper struktur og støtter både ledelse og medarbeidere. Finner smarte
                måter å effektivisere administrative oppgaver med moderne teknologi.
              </p>
            </div>
          </TiltCard>
        </div>

        {/* Experience section */}
        <div
          ref={expRef}
          className={`mb-24 reveal ${expInView ? 'visible' : ''}`}
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

        {/* Education section */}
        <div
          ref={eduRef}
          className={`reveal ${eduInView ? 'visible' : ''}`}
          style={{ transitionDelay: '0.4s' }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 glass rounded-xl flex items-center justify-center glow-pink">
              <GraduationCap className="text-pink-400" size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Education</h3>
              <p className="text-muted-foreground text-sm">Academic background</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <TiltCard key={index} intensity={8}>
                <div className="glass rounded-2xl p-6 card-hover h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <Award className="text-pink-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{edu.degree}</h4>
                      <p className="text-purple-400 text-sm mb-1">{edu.school}</p>
                      <p className="text-muted-foreground text-sm mb-2">{edu.year}</p>
                      <p className="text-muted-foreground text-sm">{edu.description}</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
