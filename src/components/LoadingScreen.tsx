import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
  duration?: number;
}

const LoadingScreen = ({ onComplete, duration = 2500 }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setIsExiting(true);
        setTimeout(onComplete, 800);
      }
    };

    requestAnimationFrame(updateProgress);
  }, [duration, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center transition-all duration-700 ${
        isExiting ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/15 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Logo animation */}
      <div className="relative mb-12">
        <div className="text-6xl md:text-8xl font-bold">
          <span className="inline-block loading-letter" style={{ animationDelay: "0s" }}>T</span>
          <span className="inline-block loading-letter" style={{ animationDelay: "0.1s" }}>E</span>
          <span className="inline-block loading-letter" style={{ animationDelay: "0.2s" }}>H</span>
        </div>

        {/* Glowing ring */}
        <div className="absolute -inset-8 border-2 border-purple-500/30 rounded-full animate-spin-slow" />
        <div className="absolute -inset-12 border border-cyan-500/20 rounded-full animate-spin-reverse" />
      </div>

      {/* Progress bar */}
      <div className="w-64 md:w-80 relative">
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-3 text-sm text-muted-foreground">
          <span className="loading-text">Loading experience</span>
          <span className="font-mono">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Animated dots */}
      <div className="absolute bottom-12 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
