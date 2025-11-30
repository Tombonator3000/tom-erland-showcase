import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, Twitter, Send, MapPin, Clock } from "lucide-react";
import { useParallax, useElementInView } from "@/hooks/use-parallax";

const contactMethods = [
  {
    name: "Email",
    value: "tom@example.com",
    href: "mailto:tom@example.com",
    icon: Mail,
    gradient: "from-purple-500 to-pink-500",
    description: "Best for detailed inquiries",
  },
  {
    name: "LinkedIn",
    value: "tom-husby-29611392",
    href: "https://www.linkedin.com/in/tom-husby-29611392/",
    icon: Linkedin,
    gradient: "from-blue-500 to-cyan-500",
    description: "Professional networking",
  },
  {
    name: "GitHub",
    value: "@Tombonator3000",
    href: "https://github.com/Tombonator3000",
    icon: Github,
    gradient: "from-gray-500 to-gray-700",
    description: "Check out my code",
  },
  {
    name: "Twitter",
    value: "@TomHusby",
    href: "https://twitter.com",
    icon: Twitter,
    gradient: "from-cyan-500 to-blue-500",
    description: "Latest updates",
  },
];

const Contact = () => {
  const parallaxOffset = useParallax(0.2);
  const [headerRef, headerInView] = useElementInView(0.2);
  const [formRef, formInView] = useElementInView(0.1);
  const [linksRef, linksInView] = useElementInView(0.1);

  return (
    <section id="contact" className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px]"
        style={{ transform: `translateY(${-parallaxOffset * 0.5}px)` }}
      />

      {/* Decorative elements */}
      <div className="absolute top-20 right-[10%] w-32 h-32 border border-purple-500/20 rounded-full float" />
      <div className="absolute bottom-32 left-[5%] w-20 h-20 border border-cyan-500/20 rounded-lg rotate-45 float-delayed" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 reveal ${headerInView ? 'visible' : ''}`}
        >
          <span className="inline-block px-4 py-1 glass rounded-full text-sm text-pink-400 mb-4">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Let's Create</span>
            <br />
            <span className="text-foreground">Something Amazing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can work together
            to bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <div
            ref={formRef}
            className={`reveal ${formInView ? 'visible' : ''}`}
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-3 glass rounded-xl border border-white/10 bg-white/5 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 glass rounded-xl border border-white/10 bg-white/5 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 glass rounded-xl border border-white/10 bg-white/5 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 glass rounded-xl border border-white/10 bg-white/5 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-0 glow"
                >
                  <Send size={18} className="mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* Contact info */}
          <div
            ref={linksRef}
            className={`space-y-6 reveal ${linksInView ? 'visible' : ''}`}
            style={{ transitionDelay: '0.2s' }}
          >
            {/* Quick info */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Clock className="text-purple-400" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold">Response Time</h4>
                  <p className="text-muted-foreground text-sm">Usually within 24-48 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                  <MapPin className="text-cyan-400" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-muted-foreground text-sm">Norway (Remote-friendly)</p>
                </div>
              </div>
            </div>

            {/* Contact methods */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-muted-foreground">Connect with me</h3>
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <a
                    key={method.name}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block glass rounded-xl p-4 card-hover"
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.gradient} p-0.5 group-hover:scale-110 transition-transform`}>
                        <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                          <Icon size={20} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold group-hover:text-purple-400 transition-colors">
                          {method.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                      <div className="text-muted-foreground text-sm hidden sm:block">
                        {method.value}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className={`mt-24 pt-8 border-t border-white/10 reveal ${linksInView ? 'visible' : ''}`} style={{ transitionDelay: '0.5s' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-2xl font-bold gradient-text">Tom Erland Husby</p>
              <p className="text-muted-foreground text-sm">Game Developer & Creative Technologist</p>
            </div>
            <div className="flex items-center gap-4">
              {contactMethods.slice(0, 4).map((method) => {
                const Icon = method.icon;
                return (
                  <a
                    key={method.name}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Tom Erland Husby. Crafted with passion.
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
