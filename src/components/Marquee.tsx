import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  className?: string;
}

const Marquee = ({
  children,
  speed = 30,
  pauseOnHover = true,
  direction = "left",
  className = "",
}: MarqueeProps) => {
  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className}`}
      style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
    >
      <div
        className={`inline-flex ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
};

// Pre-styled marquee item
export const MarqueeItem = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <span className={`inline-flex items-center mx-8 ${className}`}>{children}</span>
);

export default Marquee;
