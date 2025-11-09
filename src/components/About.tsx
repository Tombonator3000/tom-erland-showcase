import { Card } from "@/components/ui/card";
import { Code2, Gamepad2, Sparkles } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 px-4 bg-muted">
      <div className="container mx-auto max-w-6xl">
        {/* Manual header */}
        <div className="border-4 border-foreground p-4 bg-white mb-12">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">
            Assembly Instructions: Tom Erland Husby
          </h2>
          <p className="text-sm font-mono mt-2">Model: GAME-DEV-2025 | Version: 2.0 | Parts included: Skills, Experience, Education</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Parts list style */}
          <div className="border-2 border-foreground bg-white p-6">
            <div className="flex items-center gap-2 mb-4 border-b-2 border-foreground pb-2">
              <div className="w-8 h-8 border-2 border-foreground flex items-center justify-center font-bold bg-primary text-primary-foreground">
                A
              </div>
              <h3 className="text-xl font-bold uppercase">Core Components</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-6 h-6 border-2 border-foreground flex items-center justify-center text-xs font-bold">1</div>
                <div>
                  <p className="font-semibold">Game Development Skills</p>
                  <p className="text-sm text-muted-foreground">Passion for creating engaging interactive experiences</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 w-6 h-6 border-2 border-foreground flex items-center justify-center text-xs font-bold">2</div>
                <div>
                  <p className="font-semibold">Technical Expertise</p>
                  <p className="text-sm text-muted-foreground">Modern game development technologies</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 w-6 h-6 border-2 border-foreground flex items-center justify-center text-xs font-bold">3</div>
                <div>
                  <p className="font-semibold">Creative Problem Solving</p>
                  <p className="text-sm text-muted-foreground">Bringing ideas to life through code</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Function diagram */}
          <div className="border-2 border-foreground bg-white p-6">
            <div className="flex items-center gap-2 mb-4 border-b-2 border-foreground pb-2">
              <div className="w-8 h-8 border-2 border-foreground flex items-center justify-center font-bold bg-secondary text-secondary-foreground">
                B
              </div>
              <h3 className="text-xl font-bold uppercase">Capabilities</h3>
            </div>
            <div className="space-y-3">
              <div className="border-2 border-foreground p-3 flex items-center gap-3">
                <Gamepad2 size={24} strokeWidth={3} />
                <div>
                  <p className="font-bold text-sm">Game Development</p>
                  <p className="text-xs text-muted-foreground">Engaging gameplay mechanics</p>
                </div>
              </div>
              <div className="border-2 border-foreground p-3 flex items-center gap-3">
                <Code2 size={24} strokeWidth={3} />
                <div>
                  <p className="font-bold text-sm">Technical Design</p>
                  <p className="text-xs text-muted-foreground">Robust systems & optimization</p>
                </div>
              </div>
              <div className="border-2 border-foreground p-3 flex items-center gap-3">
                <Sparkles size={24} strokeWidth={3} />
                <div>
                  <p className="font-bold text-sm">Creative Innovation</p>
                  <p className="text-xs text-muted-foreground">Cutting-edge technology</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Skills as parts diagram */}
        <Card className="border-2 border-foreground p-6 bg-white mb-6">
          <div className="flex items-center gap-2 mb-6 border-b-2 border-foreground pb-2">
            <div className="w-8 h-8 border-2 border-foreground flex items-center justify-center font-bold bg-primary text-primary-foreground">
              C
            </div>
            <h3 className="text-xl font-bold uppercase">Technical Specifications</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="font-bold mb-3 text-sm uppercase border-b border-foreground pb-1">◆ Technical Skills</p>
              <div className="flex flex-wrap gap-2">
                {["Unity", "Unreal Engine", "C#", "C++", "Game Design", "3D Modeling", "Web Technologies"].map((skill, i) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 border-2 border-foreground text-xs font-bold"
                  >
                    C{i+1}. {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <p className="font-bold mb-3 text-sm uppercase border-b border-foreground pb-1">◆ Specializations</p>
              <div className="flex flex-wrap gap-2">
                {["Gameplay Programming", "Audio Design", "UI/UX", "Level Design", "Optimization", "Multiplayer Systems"].map((spec, i) => (
                  <span 
                    key={spec}
                    className="px-3 py-1 border-2 border-foreground bg-secondary text-xs font-bold"
                  >
                    C{i+8}. {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>
        
        {/* Work experience as assembly steps */}
        <Card className="border-2 border-foreground p-6 bg-white mb-6">
          <div className="flex items-center gap-2 mb-6 border-b-2 border-foreground pb-2">
            <div className="w-8 h-8 border-2 border-foreground flex items-center justify-center font-bold">
              📋
            </div>
            <h3 className="text-xl font-bold uppercase">Assembly History (Work Experience)</h3>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 border-2 border-foreground flex items-center justify-center font-bold text-xl bg-muted">
                1
              </div>
              <div className="flex-1 border-l-4 border-dashed border-foreground pl-4">
                <p className="font-bold">Game Developer</p>
                <p className="text-sm text-muted-foreground mb-2">Company Name • Year - Present</p>
                <p className="text-sm">Add your work experience details here.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 border-2 border-foreground flex items-center justify-center font-bold text-xl bg-muted">
                2
              </div>
              <div className="flex-1 border-l-4 border-dashed border-foreground pl-4">
                <p className="font-bold">Previous Position</p>
                <p className="text-sm text-muted-foreground mb-2">Company Name • Year - Year</p>
                <p className="text-sm">Add your previous work experience here.</p>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Education */}
        <Card className="border-2 border-foreground p-6 bg-white">
          <div className="flex items-center gap-2 mb-6 border-b-2 border-foreground pb-2">
            <div className="w-8 h-8 border-2 border-foreground flex items-center justify-center font-bold">
              🎓
            </div>
            <h3 className="text-xl font-bold uppercase">Certification & Training</h3>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 border-2 border-foreground flex items-center justify-center font-bold bg-muted">
                ✓
              </div>
              <div>
                <p className="font-bold">Degree/Certification</p>
                <p className="text-sm text-muted-foreground mb-1">Institution Name • Year</p>
                <p className="text-sm">Add your education details here.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Warning label */}
        <div className="mt-8 border-2 border-foreground bg-secondary p-4 flex items-center gap-3">
          <div className="text-3xl">⚠️</div>
          <div>
            <p className="font-bold text-sm">IMPORTANT!</p>
            <p className="text-xs">This developer requires regular caffeine maintenance and occasional debugging sessions.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
