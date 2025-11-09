import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: "Home", id: "home", step: "1" },
    { label: "About", id: "about", step: "2" },
    { label: "Games", id: "games", step: "3" },
    { label: "Contact", id: "contact", step: "4" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white border-b-4 border-foreground shadow-[0_6px_0px_0px_rgba(0,0,0,1)]" 
          : "bg-white/95 border-b-2 border-foreground"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo as manual style */}
          <button 
            onClick={() => scrollToSection("home")}
            className="font-bold cursor-pointer bg-transparent border-2 border-foreground px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <span className="text-lg font-mono">T.E.HUSBY</span>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-bold cursor-pointer bg-transparent border-2 border-foreground px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors uppercase font-mono"
              >
                {item.step}. {item.label}
              </button>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden border-2 border-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t-2 border-foreground bg-white">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left px-4 py-3 text-sm font-bold border-2 border-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer bg-transparent uppercase font-mono"
                >
                  STEP {item.step}: {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
