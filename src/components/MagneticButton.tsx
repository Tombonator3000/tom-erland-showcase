import { useRef, useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  strength?: number;
  disabled?: boolean;
}

const MagneticButton = ({
  children,
  className = "",
  onClick,
  variant = "default",
  size = "default",
  strength = 0.4,
  disabled = false,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const button = ref.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    setPosition({
      x: distanceX * strength,
      y: distanceY * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <span
        className="inline-flex items-center transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${position.x * 0.3}px, ${position.y * 0.3}px)`,
        }}
      >
        {children}
      </span>
    </Button>
  );
};

export default MagneticButton;
