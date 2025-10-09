import { Card } from "@/components/ui/card";
import { Code2, Gamepad2, Sparkles } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-tech-gradient bg-clip-text text-transparent">
          About Me
        </h2>
        <div className="h-1 w-20 bg-tech-gradient mx-auto mb-12 rounded-full" />
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">Who I Am</h3>
            <p className="text-muted-foreground leading-relaxed">
              I'm a passionate game developer with a keen eye for detail and a drive to create 
              engaging interactive experiences. My journey in game development has led me to 
              explore various aspects of the creative process, from gameplay mechanics to 
              immersive sound design.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With expertise in modern game development technologies and a creative approach 
              to problem-solving, I bring ideas to life through code and innovation.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">What I Do</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                <Gamepad2 className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">Game Development</h4>
                  <p className="text-sm text-muted-foreground">
                    Creating engaging gameplay mechanics and immersive experiences
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                <Code2 className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">Technical Design</h4>
                  <p className="text-sm text-muted-foreground">
                    Implementing robust systems and optimized solutions
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                <Sparkles className="text-primary mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">Creative Innovation</h4>
                  <p className="text-sm text-muted-foreground">
                    Pushing boundaries with cutting-edge technology and design
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Card className="p-8 border-primary/20 bg-card/50 backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-6 text-primary">Experience & Skills</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-lg">Technical Skills</h4>
              <div className="flex flex-wrap gap-2">
                {["Unity", "Unreal Engine", "C#", "C++", "Game Design", "3D Modeling"].map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-lg">Specializations</h4>
              <div className="flex flex-wrap gap-2">
                {["Gameplay Programming", "Audio Design", "UI/UX", "Level Design", "Optimization"].map((spec) => (
                  <span 
                    key={spec}
                    className="px-3 py-1 bg-secondary/10 border border-secondary/30 rounded-full text-sm text-secondary"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default About;
