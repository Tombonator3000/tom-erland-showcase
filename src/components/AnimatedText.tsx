import { useEffect, useState, useRef } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  animation?: "fade" | "slide" | "wave" | "glitch";
}

const AnimatedText = ({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.05,
  animation = "fade",
}: AnimatedTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getAnimationClass = (index: number) => {
    const baseDelay = delay + index * staggerDelay;

    switch (animation) {
      case "slide":
        return isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8";
      case "wave":
        return `animate-wave`;
      case "glitch":
        return isVisible ? "animate-glitch-text" : "opacity-0";
      default:
        return isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4";
    }
  };

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-500 ${getAnimationClass(index)}`}
          style={{
            transitionDelay: `${delay + index * staggerDelay}s`,
            animationDelay: animation === "wave" ? `${index * 0.1}s` : undefined,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

// Glitch text component
export const GlitchText = ({
  text,
  className = ""
}: {
  text: string;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={`relative inline-block cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">{text}</span>
      {isHovered && (
        <>
          <span
            className="absolute inset-0 text-cyan-400 animate-glitch-1 clip-glitch-1"
            aria-hidden="true"
          >
            {text}
          </span>
          <span
            className="absolute inset-0 text-pink-400 animate-glitch-2 clip-glitch-2"
            aria-hidden="true"
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
};

// Typing cursor component
export const TypingCursor = ({ className = "" }: { className?: string }) => (
  <span className={`inline-block w-0.5 h-[1em] bg-current animate-blink ${className}`} />
);

export default AnimatedText;
