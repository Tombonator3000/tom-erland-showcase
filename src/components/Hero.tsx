import { Button } from "@/components/ui/button";
import { ArrowDown, User } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Manual grid background */}
      <div className="absolute inset-0 bg-manual-grid opacity-30" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Stick figure illustration */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Stick figure */}
            <svg width="120" height="180" viewBox="0 0 120 180" className="mx-auto">
              {/* Head */}
              <circle cx="60" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="3" />
              {/* Body */}
              <line x1="60" y1="50" x2="60" y2="100" stroke="currentColor" strokeWidth="3" />
              {/* Arms */}
              <line x1="60" y1="65" x2="35" y2="80" stroke="currentColor" strokeWidth="3" />
              <line x1="60" y1="65" x2="85" y2="80" stroke="currentColor" strokeWidth="3" />
              {/* Legs */}
              <line x1="60" y1="100" x2="40" y2="140" stroke="currentColor" strokeWidth="3" />
              <line x1="60" y1="100" x2="80" y2="140" stroke="currentColor" strokeWidth="3" />
              {/* Computer */}
              <rect x="75" y="75" width="30" height="20" fill="hsl(var(--primary))" stroke="currentColor" strokeWidth="2" />
              <rect x="80" y="95" width="20" height="2" fill="currentColor" />
            </svg>
            
            {/* Arrow pointing to person */}
            <div className="absolute -left-20 top-8 flex items-center gap-2">
              <span className="text-sm font-bold border-2 border-foreground px-2 py-1">1</span>
              <svg width="40" height="20" viewBox="0 0 40 20">
                <line x1="0" y1="10" x2="35" y2="10" stroke="currentColor" strokeWidth="2" />
                <polygon points="35,10 30,7 30,13" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Title with manual styling */}
          <div className="border-4 border-foreground p-6 bg-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-2 tracking-tight uppercase">
              Tom Erland Husby
            </h1>
            <p className="text-lg md:text-xl font-mono">
              GAME DEVELOPER v2.0
            </p>
          </div>

          {/* Assembly instructions style */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="border-2 border-foreground p-4 bg-card text-center">
              <div className="w-12 h-12 border-2 border-foreground rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-xl">
                2
              </div>
              <p className="text-sm font-bold">VIEW PROJECTS</p>
            </div>
            
            <div className="border-2 border-foreground p-4 bg-card text-center">
              <div className="w-12 h-12 border-2 border-foreground rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-xl">
                3
              </div>
              <p className="text-sm font-bold">READ CV</p>
            </div>
            
            <div className="border-2 border-foreground p-4 bg-card text-center">
              <div className="w-12 h-12 border-2 border-foreground rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-xl">
                4
              </div>
              <p className="text-sm font-bold">CONTACT</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button 
              variant="default"
              size="lg"
              onClick={() => scrollToSection("games")}
              className="border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              → STEP 2
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              → STEP 4
            </Button>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer bg-transparent border-none animate-bounce-manual"
        aria-label="Scroll to next section"
      >
        <ArrowDown size={32} strokeWidth={3} />
      </button>
    </section>
  );
};

export default Hero;
