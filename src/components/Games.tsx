import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Gamepad2 } from "lucide-react";

const games = [
  {
    title: "Project Nebula",
    description: "A space exploration game featuring dynamic procedural generation and immersive storytelling. Navigate through star systems, discover alien civilizations, and uncover ancient mysteries.",
    tech: ["Unity", "C#", "Procedural Gen"],
    status: "In Development",
    link: "#",
  },
  {
    title: "Shadow Realms",
    description: "Dark fantasy action RPG with intense combat mechanics and a deep narrative. Features custom AI systems and dynamic lighting effects for an atmospheric experience.",
    tech: ["Unreal Engine", "C++", "AI Systems"],
    status: "Released",
    link: "#",
  },
  {
    title: "Cyber Runner",
    description: "Fast-paced cyberpunk endless runner with reactive music system. The soundtrack adapts to player performance, creating a unique audio-visual experience.",
    tech: ["Unity", "Audio Middleware", "Shaders"],
    status: "Released",
    link: "#",
  },
  {
    title: "Puzzle Dimension",
    description: "Mind-bending puzzle game featuring impossible geometry and perspective-based mechanics. Challenges players to think in multiple dimensions simultaneously.",
    tech: ["Unity", "Custom Physics", "Level Editor"],
    status: "Released",
    link: "#",
  },
];

const Games = () => {
  return (
    <section id="games" className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-tech-gradient bg-clip-text text-transparent">
          My Games
        </h2>
        <div className="h-1 w-20 bg-tech-gradient mx-auto mb-12 rounded-full" />
        
        <div className="grid md:grid-cols-2 gap-6">
          {games.map((game, index) => (
            <Card 
              key={index}
              className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:shadow-[var(--glow-primary)] transition-all duration-300">
                    <Gamepad2 className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{game.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      game.status === "Released" 
                        ? "bg-primary/20 text-primary" 
                        : "bg-secondary/20 text-secondary"
                    }`}>
                      {game.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {game.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {game.tech.map((tech) => (
                  <span 
                    key={tech}
                    className="px-2 py-1 bg-muted text-xs rounded border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full border border-primary/30 hover:border-primary group-hover:shadow-[var(--glow-primary)] transition-all duration-300"
              >
                View Details <ExternalLink size={16} className="ml-2" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Games;
