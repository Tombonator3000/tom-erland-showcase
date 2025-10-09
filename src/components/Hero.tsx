import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      <div className="relative z-10 container mx-auto px-4 text-center animate-slide-in-bottom">
        <div className="inline-block mb-4 px-4 py-2 border border-primary/50 rounded-full text-sm text-primary animate-glow-pulse">
          Game Developer & Creative Technologist
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-tech-gradient bg-clip-text text-transparent animate-float">
          Tom Erland Husby
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Crafting immersive gaming experiences with cutting-edge technology
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="glow" 
            size="lg"
            onClick={() => scrollToSection("games")}
          >
            View My Games
          </Button>
          <Button 
            variant="glowSecondary" 
            size="lg"
            onClick={() => scrollToSection("contact")}
          >
            Get In Touch
          </Button>
        </div>
      </div>
      
      <button 
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary animate-bounce cursor-pointer bg-transparent border-none"
        aria-label="Scroll to next section"
      >
        <ArrowDown size={32} />
      </button>
    </section>
  );
};

export default Hero;
