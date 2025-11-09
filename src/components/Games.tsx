import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const games = [
  {
    title: "Vector War",
    description: "An intense multiplayer battle game featuring vector-based graphics and fast-paced action.",
    tech: ["Web Technologies", "Real-time Multiplayer", "Vector Graphics"],
    status: "Released",
    link: "https://vector-war-games.lovable.app/",
    partNumber: "VW-001",
  },
  {
    title: "Shadow Realms",
    description: "Dark fantasy action RPG with intense combat mechanics and a deep narrative.",
    tech: ["Unreal Engine", "C++", "AI Systems"],
    status: "Released",
    link: "#",
    partNumber: "SR-002",
  },
  {
    title: "Cyber Runner",
    description: "Fast-paced cyberpunk endless runner with reactive music system.",
    tech: ["Unity", "Audio Middleware", "Shaders"],
    status: "Released",
    link: "#",
    partNumber: "CR-003",
  },
  {
    title: "Puzzle Dimension",
    description: "Mind-bending puzzle game featuring impossible geometry and perspective-based mechanics.",
    tech: ["Unity", "Custom Physics", "Level Editor"],
    status: "Released",
    link: "#",
    partNumber: "PD-004",
  },
];

const Games = () => {
  return (
    <section id="games" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="border-4 border-foreground p-4 bg-white mb-12">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">
            Product Catalog
          </h2>
          <p className="text-sm font-mono mt-2">Available Game Components | Assembly Required | Fun Guaranteed</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {games.map((game, index) => (
            <Card 
              key={index}
              className="border-2 border-foreground bg-white p-0 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
            >
              {/* Product header */}
              <div className="border-b-2 border-foreground p-4 bg-muted flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border-2 border-foreground flex items-center justify-center font-bold text-lg bg-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold uppercase">{game.title}</h3>
                    <p className="text-xs font-mono">{game.partNumber}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 border-2 border-foreground text-xs font-bold ${
                  game.status === "Released" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-secondary-foreground"
                }`}>
                  {game.status}
                </div>
              </div>
              
              {/* Product illustration (simple diagram) */}
              <div className="p-6 border-b-2 border-foreground">
                <div className="bg-muted p-4 border-2 border-dashed border-foreground flex items-center justify-center h-24">
                  <svg width="100" height="60" viewBox="0 0 100 60">
                    {/* Simple game icon representation */}
                    <rect x="10" y="10" width="80" height="40" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="30" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                    <polygon points="60,20 75,30 60,40" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              
              {/* Product description */}
              <div className="p-4">
                <p className="text-sm mb-4 leading-relaxed font-mono">
                  {game.description}
                </p>
                
                {/* Components included */}
                <div className="mb-4">
                  <p className="text-xs font-bold mb-2 uppercase">◆ Components Included:</p>
                  <div className="flex flex-wrap gap-2">
                    {game.tech.map((tech, i) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 border border-foreground text-xs font-mono"
                      >
                        × {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Action button */}
                <Button 
                  variant="default"
                  size="sm"
                  className="w-full border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-bold uppercase"
                  onClick={() => window.open(game.link, '_blank')}
                  disabled={game.link === "#"}
                >
                  {game.link === "#" ? "⏰ Coming Soon" : "→ Play Game"} 
                  {game.link !== "#" && <ExternalLink size={16} className="ml-2" />}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Assembly note */}
        <div className="mt-8 border-2 border-foreground bg-white p-4">
          <p className="text-xs font-mono text-center">
            <span className="font-bold">NOTE:</span> All games are fully assembled and ready to play. No additional tools required. 
            Internet connection recommended for multiplayer features.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Games;
