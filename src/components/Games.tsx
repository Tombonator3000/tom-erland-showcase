import { Button } from "@/components/ui/button";
import { ExternalLink, Play, Gamepad2, Cpu, Music, Box, Network } from "lucide-react";
import { useParallax, useElementInView } from "@/hooks/use-parallax";
import TiltCard from "@/components/TiltCard";
import MagneticButton from "@/components/MagneticButton";

const games = [
  {
    title: "Vector War",
    description: "An intense multiplayer battle game featuring vector-based graphics and fast-paced action. Real-time combat with smooth mechanics.",
    tech: ["Web Technologies", "Real-time Multiplayer", "Vector Graphics"],
    status: "Playable",
    link: "https://tombonator3000.github.io/vector-war-games/",
    icon: Gamepad2,
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    title: "The Deep Ones",
    description: "Dark fantasy action RPG with intense combat mechanics and a deep narrative. Explore mysterious dungeons and face challenging enemies.",
    tech: ["Web Technologies", "Game Development", "Adventure"],
    status: "Playable",
    link: "https://tombonator3000.github.io/the-deep-ones/",
    icon: Cpu,
    gradient: "from-cyan-500 to-blue-500",
    bgGradient: "from-cyan-500/10 to-blue-500/10",
  },
  {
    title: "3044",
    description: "Fast-paced cyberpunk endless runner with reactive music system. Navigate through neon-lit streets in this adrenaline-pumping experience.",
    tech: ["Web Technologies", "Futuristic", "Action"],
    status: "Playable",
    link: "https://tombonator3000.github.io/3044/",
    icon: Music,
    gradient: "from-pink-500 to-orange-500",
    bgGradient: "from-pink-500/10 to-orange-500/10",
  },
  {
    title: "State Shift Strategy",
    description: "Strategic puzzle game where you manipulate states and shift perspectives to solve challenging levels. Master the art of state management.",
    tech: ["Web Technologies", "Strategy", "Puzzle"],
    status: "Playable",
    link: "https://tombonator3000.github.io/state-shift-strategy/",
    icon: Box,
    gradient: "from-green-500 to-cyan-500",
    bgGradient: "from-green-500/10 to-cyan-500/10",
  },
  {
    title: "Conspiracy Canvas",
    description: "Connect the dots and uncover hidden conspiracies. Build your web of evidence by linking clues and revealing the truth behind mysterious events.",
    tech: ["Web Technologies", "Mystery", "Detective"],
    status: "Playable",
    link: "https://tombonator3000.github.io/conspiracy-canvas/",
    icon: Network,
    gradient: "from-amber-500 to-red-500",
    bgGradient: "from-amber-500/10 to-red-500/10",
  },
];

const Games = () => {
  const parallaxOffset = useParallax(0.15);
  const [headerRef, headerInView] = useElementInView(0.2);
  const [gamesRef, gamesInView] = useElementInView(0.1);

  return (
    <section id="games" className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div
        className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]"
        style={{ transform: `translateY(${-parallaxOffset}px)` }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 reveal ${headerInView ? 'visible' : ''}`}
        >
          <span className="inline-block px-4 py-1 glass rounded-full text-sm text-cyan-400 mb-4">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text-alt">Featured</span>
            <br />
            <span className="text-foreground">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of games and interactive experiences I've created.
            Each project represents a unique challenge and creative solution.
          </p>
        </div>

        {/* Games grid */}
        <div
          ref={gamesRef}
          className="grid md:grid-cols-2 gap-8"
        >
          {games.map((game, index) => {
            const Icon = game.icon;
            return (
              <div
                key={index}
                className={`group relative reveal ${gamesInView ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                {/* Card glow effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${game.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500`} />

                <TiltCard intensity={8} glare={true}>
                  <div className="relative glass rounded-2xl overflow-hidden">
                    {/* Header with icon */}
                    <div className={`relative h-48 bg-gradient-to-br ${game.bgGradient} overflow-hidden`}>
                      {/* Animated background pattern */}
                      <div className="absolute inset-0 bg-grid opacity-20" />

                      {/* Floating shapes */}
                      <div className="absolute top-4 right-4 w-20 h-20 border border-white/10 rounded-full group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute bottom-4 left-4 w-12 h-12 border border-white/10 rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-500" />

                      {/* Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${game.gradient} p-0.5 group-hover:scale-110 transition-transform duration-500`}>
                          <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                            <Icon size={40} className="text-foreground" />
                          </div>
                        </div>
                      </div>

                      {/* Status badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          game.status === "Playable"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-white/10 text-white/70 border border-white/20"
                        }`}>
                          {game.status === "Playable" && (
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                          )}
                          {game.status}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-all">
                        {game.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                        {game.description}
                      </p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {game.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action button */}
                      {game.link !== "#" ? (
                        <MagneticButton
                          className={`w-full bg-gradient-to-r ${game.gradient} hover:opacity-90 border-0`}
                          onClick={() => window.open(game.link, '_blank')}
                          strength={0.2}
                        >
                          <Play size={18} className="mr-2" />
                          Play Now
                          <ExternalLink size={16} className="ml-2" />
                        </MagneticButton>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full glass border-white/10 hover:bg-white/5"
                          disabled
                        >
                          Coming Soon
                        </Button>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 reveal ${gamesInView ? 'visible' : ''}`} style={{ transitionDelay: '0.6s' }}>
          <p className="text-muted-foreground mb-6">
            More projects in development. Stay tuned for updates!
          </p>
          <MagneticButton
            variant="outline"
            size="lg"
            className="glass hover:bg-white/10"
            onClick={() => window.open('https://github.com/Tombonator3000', '_blank')}
            strength={0.3}
          >
            View All Projects on GitHub
            <ExternalLink size={16} className="ml-2" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default Games;
