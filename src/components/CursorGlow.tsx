import { useEffect, useState } from "react";

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect hovering over interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("card-hover") ||
        target.closest(".card-hover");

      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", handleElementHover);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleElementHover);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main glow */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-screen transition-transform duration-150"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      >
        {/* Outer glow */}
        <div
          className={`absolute rounded-full transition-all duration-300 ${
            isHovering
              ? "w-20 h-20 bg-purple-500/20 blur-xl"
              : "w-32 h-32 bg-purple-500/10 blur-2xl"
          }`}
          style={{ transform: "translate(-50%, -50%)" }}
        />

        {/* Inner glow */}
        <div
          className={`absolute rounded-full transition-all duration-300 ${
            isHovering
              ? "w-10 h-10 bg-cyan-400/30 blur-lg"
              : "w-16 h-16 bg-cyan-400/15 blur-xl"
          }`}
          style={{ transform: "translate(-50%, -50%)" }}
        />

        {/* Core */}
        <div
          className={`absolute rounded-full transition-all duration-200 ${
            isHovering
              ? "w-3 h-3 bg-white/60"
              : "w-2 h-2 bg-white/40"
          }`}
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </div>

      {/* Trail effect */}
      <div
        className="fixed pointer-events-none z-[9998] w-24 h-24 rounded-full bg-purple-500/5 blur-2xl transition-all duration-500"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
};

export default CursorGlow;
