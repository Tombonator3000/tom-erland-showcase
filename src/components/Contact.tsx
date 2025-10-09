import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Linkedin, Github, Twitter } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-tech-gradient bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <div className="h-1 w-20 bg-tech-gradient mx-auto mb-12 rounded-full" />
        
        <Card className="p-8 border-primary/20 bg-card/50 backdrop-blur-sm">
          <p className="text-center text-muted-foreground mb-8 text-lg">
            Interested in collaborating or discussing game development? 
            I'd love to hear from you!
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <a 
              href="mailto:tom@example.com"
              className="flex items-center gap-3 p-4 border border-border rounded-lg bg-background/50 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="p-2 bg-primary/10 rounded-lg group-hover:shadow-[var(--glow-primary)] transition-all">
                <Mail className="text-primary" size={20} />
              </div>
              <div>
                <div className="font-semibold text-sm">Email</div>
                <div className="text-xs text-muted-foreground">tom@example.com</div>
              </div>
            </a>
            
            <a 
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-border rounded-lg bg-background/50 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="p-2 bg-primary/10 rounded-lg group-hover:shadow-[var(--glow-primary)] transition-all">
                <Linkedin className="text-primary" size={20} />
              </div>
              <div>
                <div className="font-semibold text-sm">LinkedIn</div>
                <div className="text-xs text-muted-foreground">Connect with me</div>
              </div>
            </a>
            
            <a 
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-border rounded-lg bg-background/50 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="p-2 bg-primary/10 rounded-lg group-hover:shadow-[var(--glow-primary)] transition-all">
                <Github className="text-primary" size={20} />
              </div>
              <div>
                <div className="font-semibold text-sm">GitHub</div>
                <div className="text-xs text-muted-foreground">Check my code</div>
              </div>
            </a>
            
            <a 
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-border rounded-lg bg-background/50 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="p-2 bg-primary/10 rounded-lg group-hover:shadow-[var(--glow-primary)] transition-all">
                <Twitter className="text-primary" size={20} />
              </div>
              <div>
                <div className="font-semibold text-sm">Twitter</div>
                <div className="text-xs text-muted-foreground">Follow updates</div>
              </div>
            </a>
          </div>
          
          <div className="text-center">
            <Button variant="glow" size="lg" className="w-full sm:w-auto">
              <Mail className="mr-2" size={20} />
              Send Message
            </Button>
          </div>
        </Card>
        
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>© 2025 Tom Erland Husby. All rights reserved.</p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
