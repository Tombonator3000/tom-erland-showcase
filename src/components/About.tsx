import { useParallax, useElementInView } from "@/hooks/use-parallax";
import SkillsSection from "@/components/about/SkillsSection";
import CapabilitiesGrid from "@/components/about/CapabilitiesGrid";
import ExperienceTimeline from "@/components/about/ExperienceTimeline";
import EducationSection from "@/components/about/EducationSection";

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
        <SkillsSection isVisible={skillsInView} sectionRef={skillsRef} />

        {/* Capabilities grid */}
        <CapabilitiesGrid isVisible={skillsInView} />

        {/* Experience section */}
        <ExperienceTimeline isVisible={expInView} sectionRef={expRef} />

        {/* Education section */}
        <EducationSection isVisible={eduInView} sectionRef={eduRef} />
      </div>
    </section>
  );
};

export default About;
