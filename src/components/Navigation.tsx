import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { sections } from "@/data/cv";
import { ScrewCounter } from "@/components/ikea/ScrewHunt";

/** Top bar: product name, one numbered dot per page, and the screw counter. */
const Navigation = () => {
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 8);
      const line = window.innerHeight * 0.35;
      let current = 0;
      sections.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className={cn("topbar", scrolled && "is-scrolled")}>
      <div className="topbar-inner">
        <a href="#home" className="brand" aria-label="HUSBY monteringsanvisning, til forsiden">
          <span className="brand-name">HUSBY</span>
          <span className="brand-sub">Monteringsanvisning</span>
        </a>

        <nav aria-label="Sider i anvisningen" className="steps-nav">
          <ol>
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={cn("step-dot", i === active && "is-active", i < active && "is-done")}
                  aria-current={i === active ? "step" : undefined}
                  aria-label={`Side ${i + 1}: ${s.label}`}
                >
                  <span className="step-dot-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="step-dot-label" aria-hidden="true">
                    {s.label}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <ScrewCounter />
      </div>
    </header>
  );
};

export default Navigation;
