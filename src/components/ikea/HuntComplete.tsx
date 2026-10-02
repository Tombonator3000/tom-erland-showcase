import { CSSProperties, useEffect, useRef } from "react";
import IkeaMan from "./IkeaMan";
import { Bookcase } from "./props";
import { ScrewIcon } from "./ScrewHunt";
import { useScrewHunt } from "./hunt-context";

/** Shown once all five loose screws have been found. */
const HuntComplete = () => {
  const { celebrate, closeCelebration } = useScrewHunt();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!celebrate) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCelebration();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [celebrate, closeCelebration]);

  if (!celebrate) return null;

  return (
    <div className="hunt-overlay" role="dialog" aria-modal="true" aria-labelledby="hunt-title" onClick={closeCelebration}>
      <div className="hunt-rain" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <ScrewIcon
            key={i}
            className="hunt-drop"
            style={
              {
                left: `${(i * 37) % 100}%`,
                animationDelay: `${(i * 0.23) % 2.4}s`,
                animationDuration: `${2.2 + (i % 5) * 0.35}s`,
                "--spin": `${i % 2 ? 1 : -1}`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="hunt-card" onClick={(e) => e.stopPropagation()}>
        <svg viewBox="-10 -10 260 210" className="scene is-drawn" aria-hidden="true">
          <Bookcase x={132} y={186} h={170} />
          <IkeaMan x={78} y={106} pose="cheer" anim="cheer" />
        </svg>
        <p className="kicker">5 av 5 skruer</p>
        <h2 id="hunt-title" className="hunt-title">
          HUSBY er komplett
        </h2>
        <p className="hunt-text">
          Du fant alle de løse skruene. Det har aldri skjedd før i flatpakkens historie. Tom vil gjerne høre fra
          noen som er så grundig.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="#contact" className="btn btn-ink" onClick={closeCelebration}>
            Til kundeservice
          </a>
          <button ref={closeRef} type="button" className="btn" onClick={closeCelebration}>
            Lukk esken
          </button>
        </div>
      </div>
    </div>
  );
};

export default HuntComplete;
