import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Linkedin, Github, Twitter } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-muted">
      <div className="container mx-auto max-w-4xl">
        <div className="border-4 border-foreground p-4 bg-white mb-12">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">
            Customer Service & Support
          </h2>
          <p className="text-sm font-mono mt-2">Need assistance? Contact information below | Response time: 24-48 hours</p>
        </div>
        
        <Card className="border-2 border-foreground p-0 bg-white mb-8">
          {/* Connection diagram */}
          <div className="border-b-2 border-foreground p-6 bg-muted">
            <div className="flex items-center justify-center gap-4">
              <div className="w-20 h-20 border-4 border-foreground rounded-full flex items-center justify-center bg-white">
                <Mail size={32} strokeWidth={3} />
              </div>
              <svg width="60" height="40" className="hidden sm:block">
                <line x1="0" y1="20" x2="50" y2="20" stroke="currentColor" strokeWidth="3" strokeDasharray="5,5" />
              </svg>
              <div className="w-20 h-20 border-4 border-foreground flex items-center justify-center bg-primary text-primary-foreground font-bold text-xs text-center p-2">
                TOM<br/>HUSBY
              </div>
              <svg width="60" height="40" className="hidden sm:block">
                <line x1="10" y1="20" x2="60" y2="20" stroke="currentColor" strokeWidth="3" strokeDasharray="5,5" />
              </svg>
              <div className="w-20 h-20 border-4 border-foreground rounded-full flex items-center justify-center bg-white">
                <span className="text-3xl">✓</span>
              </div>
            </div>
            <p className="text-center text-xs font-mono mt-4">
              STEP 1: Choose method → STEP 2: Connect → STEP 3: Receive response
            </p>
          </div>
          
          <div className="p-6">
            <p className="text-center font-mono mb-6 border-2 border-foreground p-3 bg-secondary">
              <span className="font-bold">⚡ QUICK START:</span> Interested in collaborating or discussing game development? 
              Select a connection method below!
            </p>
            
            {/* Contact methods as product specs */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <a 
                href="mailto:tom@example.com"
                className="border-2 border-foreground p-4 bg-muted hover:bg-white transition-colors flex items-center gap-3"
              >
                <div className="w-12 h-12 border-2 border-foreground flex items-center justify-center bg-white">
                  <Mail size={24} strokeWidth={3} />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase">Email Connection</p>
                  <p className="text-xs font-mono">tom@example.com</p>
                </div>
              </a>
              
              <a 
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-foreground p-4 bg-muted hover:bg-white transition-colors flex items-center gap-3"
              >
                <div className="w-12 h-12 border-2 border-foreground flex items-center justify-center bg-primary text-primary-foreground">
                  <Linkedin size={24} strokeWidth={3} />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase">LinkedIn Profile</p>
                  <p className="text-xs font-mono">Professional Network</p>
                </div>
              </a>
              
              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-foreground p-4 bg-muted hover:bg-white transition-colors flex items-center gap-3"
              >
                <div className="w-12 h-12 border-2 border-foreground flex items-center justify-center bg-white">
                  <Github size={24} strokeWidth={3} />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase">GitHub Repository</p>
                  <p className="text-xs font-mono">Code & Projects</p>
                </div>
              </a>
              
              <a 
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-foreground p-4 bg-muted hover:bg-white transition-colors flex items-center gap-3"
              >
                <div className="w-12 h-12 border-2 border-foreground flex items-center justify-center bg-white">
                  <Twitter size={24} strokeWidth={3} />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase">Social Updates</p>
                  <p className="text-xs font-mono">Latest News</p>
                </div>
              </a>
            </div>
            
            <div className="text-center">
              <Button 
                variant="default" 
                size="lg" 
                className="border-2 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all font-bold uppercase"
              >
                <Mail className="mr-2" size={20} strokeWidth={3} />
                → Send Message Now
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Footer as warranty info */}
        <div className="border-2 border-foreground bg-white p-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">ⓘ</div>
            <div>
              <p className="font-bold text-sm mb-2">WARRANTY & COPYRIGHT INFORMATION</p>
              <p className="text-xs font-mono">
                © 2025 Tom Erland Husby. All games and projects are protected by copyright law. 
                Collaboration inquiries welcome. Response time may vary based on project complexity.
              </p>
            </div>
          </div>
        </div>
        
        <footer className="mt-6 text-center">
          <p className="text-xs font-mono border-2 border-foreground p-3 bg-white">
            Made with ❤️ and ☕ | Version 2.0.25 | Last updated: 2025
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
