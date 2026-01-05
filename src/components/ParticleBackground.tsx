import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  colors?: string[];
  maxSpeed?: number;
  connectDistance?: number;
  mouseRadius?: number;
}

const ParticleBackground = ({
  particleCount = 80,
  colors = ["#a855f7", "#06b6d4", "#ec4899"],
  maxSpeed = 0.5,
  connectDistance = 120,
  mouseRadius = 150,
}: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * maxSpeed,
      vy: (Math.random() - 0.5) * maxSpeed,
      size: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.5 + 0.2,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Helper function: Apply mouse force to particle
    const applyMouseForce = (particle: Particle, mouse: { x: number; y: number }) => {
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouseRadius) {
        const force = (mouseRadius - distance) / mouseRadius;
        particle.vx -= (dx / distance) * force * 0.02;
        particle.vy -= (dy / distance) * force * 0.02;
      }

      return distance;
    };

    // Helper function: Update particle position with boundary check
    const updateParticlePosition = (particle: Particle, canvasWidth: number, canvasHeight: number) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Boundary check - bounce off edges
      if (particle.x < 0 || particle.x > canvasWidth) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvasHeight) particle.vy *= -1;
    };

    // Helper function: Draw a single particle
    const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity;
      ctx.fill();
    };

    // Helper function: Draw connections between nearby particles
    const drawConnections = (
      ctx: CanvasRenderingContext2D,
      particle: Particle,
      particles: Particle[],
      startIndex: number
    ) => {
      for (let j = startIndex + 1; j < particles.length; j++) {
        const other = particles[j];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectDistance) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = particle.color;
          ctx.globalAlpha = (1 - dist / connectDistance) * 0.2;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    };

    // Helper function: Draw connection to mouse
    const drawMouseConnection = (
      ctx: CanvasRenderingContext2D,
      particle: Particle,
      mouse: { x: number; y: number },
      distance: number
    ) => {
      const maxMouseDistance = mouseRadius * 1.5;

      if (distance < maxMouseDistance) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = particle.color;
        ctx.globalAlpha = (1 - distance / maxMouseDistance) * 0.3;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Apply mouse interaction force and get distance
        const mouseDistance = applyMouseForce(particle, mouse);

        // Update particle position
        updateParticlePosition(particle, canvas.width, canvas.height);

        // Draw the particle
        drawParticle(ctx, particle);

        // Draw connections to nearby particles
        drawConnections(ctx, particle, particles, i);

        // Draw connection to mouse
        drawMouseConnection(ctx, particle, mouse, mouseDistance);
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, colors, maxSpeed, connectDistance, mouseRadius]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default ParticleBackground;
