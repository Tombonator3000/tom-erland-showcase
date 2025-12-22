import { ArrowDown, Gamepad2, Code2, Sparkles } from "lucide-react";
import { useParallax, useMouseParallax } from "@/hooks/use-parallax";
import { useTypingEffect } from "@/hooks/use-fancy-effects";
import { GlitchText, TypingCursor } from "@/components/AnimatedText";
import MagneticButton from "@/components/MagneticButton";
import ParticleBackground from "@/components/ParticleBackground";
import Marquee, { MarqueeItem } from "@/components/Marquee";

const roles = [
  "Game Developer",
  "Creative Technologist",
  "Unity Expert",
  "Unreal Enthusiast",
  "Interactive Designer",
];

const techStack = [
  "Unity", "Unreal Engine", "C#", "C++", "React", "TypeScript",
  "Blender", "Shader Programming", "Multiplayer", "AI Systems"
];

const Hero = () => {
  const parallaxSlow = useParallax(0.3);
  const parallaxMedium = useParallax(0.5);
  const parallaxFast = useParallax(0.7);
  const mouseParallax = useMouseParallax(0.02);
  const { text: typedRole, isTyping } = useTypingEffect(roles, 80, 40, 2000);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Particle background */}
      <ParticleBackground particleCount={60} />

      {/* Background layers with parallax */}

      {/* Layer 1: Grid background */}
      <div
        className="absolute inset-0 bg-grid opacity-50"
        style={{ transform: `translateY(${parallaxSlow}px)` }}
      />

      {/* Layer 2: Gradient orbs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translate(${mouseParallax.x}px, ${mouseParallax.y}px)` }}
      >
        {/* Purple orb */}
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-purple-500/20 blur-[120px] morph"
          style={{ transform: `translateY(${-parallaxMedium}px)` }}
        />
        {/* Cyan orb */}
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[100px] morph"
          style={{
            transform: `translateY(${-parallaxSlow}px)`,
            animationDelay: '-4s'
          }}
        />
        {/* Pink orb */}
        <div
          className="absolute top-1/2 right-1/3 w-[400px] h-[400px] rounded-full bg-pink-500/15 blur-[80px] morph"
          style={{
            transform: `translateY(${-parallaxFast}px)`,
            animationDelay: '-2s'
          }}
        />
      </div>

      {/* Layer 3: Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating rings */}
        <div
          className="absolute top-20 left-[10%] w-24 h-24 border-2 border-purple-500/30 rounded-full float-enhanced"
          style={{ transform: `translateY(${-parallaxFast}px)` }}
        />
        <div
          className="absolute top-40 right-[15%] w-16 h-16 border-2 border-cyan-500/30 rounded-full float-delayed"
          style={{ transform: `translateY(${-parallaxMedium}px)` }}
        />
        <div
          className="absolute bottom-32 left-[20%] w-20 h-20 border-2 border-pink-500/30 rounded-full float-slow"
          style={{ transform: `translateY(${-parallaxSlow}px)` }}
        />

        {/* Floating squares */}
        <div
          className="absolute top-1/3 left-[5%] w-12 h-12 border border-purple-500/20 rotate-45 float-delayed"
          style={{ transform: `translateY(${-parallaxFast}px) rotate(45deg)` }}
        />
        <div
          className="absolute bottom-1/3 right-[8%] w-8 h-8 border border-cyan-500/20 rotate-12 float"
          style={{ transform: `translateY(${-parallaxMedium}px) rotate(12deg)` }}
        />

        {/* Dots */}
        <div
          className="absolute top-1/4 right-[25%] w-3 h-3 bg-purple-400/40 rounded-full float"
          style={{ transform: `translateY(${-parallaxFast}px)` }}
        />
        <div
          className="absolute bottom-1/4 left-[30%] w-2 h-2 bg-cyan-400/40 rounded-full float-delayed"
          style={{ transform: `translateY(${-parallaxMedium}px)` }}
        />
        <div
          className="absolute top-1/2 left-[8%] w-4 h-4 bg-pink-400/30 rounded-full float-slow"
          style={{ transform: `translateY(${-parallaxSlow}px)` }}
        />
      </div>

      {/* Layer 4: Rotating decoration ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{ transform: `translate(-50%, -50%) translateY(${-parallaxSlow * 0.5}px)` }}
      >
        <div className="absolute inset-0 border border-white/5 rounded-full spin-slow" />
        <div className="absolute inset-8 border border-white/5 rounded-full spin-reverse" />
        <div className="absolute inset-16 border border-purple-500/10 rounded-full spin-slow" style={{ animationDuration: '30s' }} />
      </div>

      {/* Main content */}
      <div
        className="relative z-10 container mx-auto px-4 text-center"
        style={{ transform: `translateY(${-parallaxMedium * 0.3}px)` }}
      >
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8 glow pulse-glow">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">Available for opportunities</span>
        </div>

        {/* Main title with glitch effect */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
          <GlitchText text="Tom Erland" className="gradient-text" />
          <br />
          <span className="text-foreground">Husby</span>
        </h1>

        {/* Subtitle with typing effect */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500" />
          <p className="text-xl md:text-2xl text-muted-foreground font-light h-8">
            {typedRole}
            <TypingCursor className="ml-1" />
          </p>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500" />
        </div>

        {/* Feature cards */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:scale-105 transition-transform">
            <Gamepad2 size={18} className="text-purple-400" />
            <span className="text-sm">Game Development</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:scale-105 transition-transform">
            <Code2 size={18} className="text-cyan-400" />
            <span className="text-sm">Unity & Unreal</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:scale-105 transition-transform">
            <Sparkles size={18} className="text-pink-400" />
            <span className="text-sm">Interactive Experiences</span>
          </div>
        </div>

        {/* CTA buttons with magnetic effect */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <MagneticButton
            onClick={() => scrollToSection("games")}
            className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-0 px-8 py-6 text-lg glow transition-all duration-300"
            strength={0.3}
          >
            <span className="relative z-10">View My Work</span>
          </MagneticButton>
          <MagneticButton
            variant="outline"
            onClick={() => scrollToSection("contact")}
            className="glass hover:bg-white/10 px-8 py-6 text-lg transition-all duration-300"
            strength={0.3}
          >
            Get in Touch
          </MagneticButton>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
          <button
            onClick={() => scrollToSection("about")}
            className="group cursor-pointer bg-transparent border-none"
            aria-label="Scroll to next section"
          >
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2">
              <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
            </div>
          </button>
        </div>
      </div>

      {/* Tech stack marquee */}
      <div className="absolute bottom-24 left-0 right-0 z-10">
        <Marquee speed={40} className="py-4">
          {techStack.map((tech, index) => (
            <MarqueeItem key={index} className="text-muted-foreground/50 text-sm font-medium">
              <span className="w-2 h-2 bg-purple-500/50 rounded-full mr-3" />
              {tech}
            </MarqueeItem>
          ))}
        </Marquee>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
