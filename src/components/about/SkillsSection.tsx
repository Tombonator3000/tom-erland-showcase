import { Zap } from "lucide-react";
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

interface AnimatedSkillBarProps {
  skill: typeof skills[0];
  index: number;
  isVisible: boolean;
}

const AnimatedSkillBar = ({ skill, index, isVisible }: AnimatedSkillBarProps) => {
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

interface SkillsSectionProps {
  isVisible: boolean;
  sectionRef: (node?: Element | null) => void;
}

const SkillsSection = ({ isVisible, sectionRef }: SkillsSectionProps) => {
  return (
    <div
      ref={sectionRef}
      className={`mb-24 reveal ${isVisible ? 'visible' : ''}`}
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
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
