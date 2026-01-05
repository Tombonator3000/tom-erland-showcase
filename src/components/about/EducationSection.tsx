import { GraduationCap, Award } from "lucide-react";
import TiltCard from "@/components/TiltCard";

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

interface EducationSectionProps {
  isVisible: boolean;
  sectionRef: (node?: Element | null) => void;
}

const EducationSection = ({ isVisible, sectionRef }: EducationSectionProps) => {
  return (
    <div
      ref={sectionRef}
      className={`reveal ${isVisible ? 'visible' : ''}`}
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
  );
};

export default EducationSection;
