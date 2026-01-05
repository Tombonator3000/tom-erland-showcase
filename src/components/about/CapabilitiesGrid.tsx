import { Bot, Briefcase, Sparkles } from "lucide-react";
import TiltCard from "@/components/TiltCard";

const capabilities = [
  {
    icon: Briefcase,
    title: "Administrasjon & IT-støtte",
    description: "Kalenderstyring, saksbehandling og møteplanlegging. Håndterer IT- og telefoniløsninger med Microsoft 365, Public 360 og Xledger.",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400"
  },
  {
    icon: Bot,
    title: "AI & Generativ Kreativitet",
    description: "Omfattende praktisk erfaring med Stable Diffusion, ComfyUI, Photoshop AI-plugins og store språkmodeller for kreative prosjekter og effektivisering.",
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400"
  },
  {
    icon: Sparkles,
    title: "Digitalisering & Struktur",
    description: "Skaper struktur og støtter både ledelse og medarbeidere. Finner smarte måter å effektivisere administrative oppgaver med moderne teknologi.",
    gradient: "from-pink-500/20 to-purple-500/20",
    iconColor: "text-pink-400"
  }
];

interface CapabilitiesGridProps {
  isVisible: boolean;
}

const CapabilitiesGrid = ({ isVisible }: CapabilitiesGridProps) => {
  return (
    <div className={`grid md:grid-cols-3 gap-6 mb-24 stagger-children ${isVisible ? 'visible' : ''}`}>
      {capabilities.map((capability) => {
        const Icon = capability.icon;
        return (
          <TiltCard key={capability.title} intensity={10}>
            <div className="glass rounded-2xl p-8 card-hover group h-full">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${capability.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <Icon className={capability.iconColor} size={28} />
              </div>
              <h4 className="text-xl font-bold mb-3">{capability.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {capability.description}
              </p>
            </div>
          </TiltCard>
        );
      })}
    </div>
  );
};

export default CapabilitiesGrid;
