import { useEffect, useRef, useState } from "react";
import IkeaMan from "./IkeaMan";
import { P } from "./svg";
import { rect } from "./geom";

/*
 * Scroll progress, manual style: a small man carries a plank along the
 * bottom edge of the screen. He walks while you scroll, turns around when
 * you scroll back up and celebrates when you reach the last page.
 */
const Walker = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const manRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [walking, setWalking] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    let stop = 0;
    let last = window.scrollY;

    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const width = trackRef.current?.clientWidth ?? window.innerWidth;
      const x = 14 + p * (width - 64);
      if (manRef.current) manRef.current.style.transform = `translateX(${x}px)`;
      if (fillRef.current) fillRef.current.style.width = `${x + 18}px`;

      const dy = window.scrollY - last;
      last = window.scrollY;
      if (dy !== 0) {
        setDir(dy > 0 ? 1 : -1);
        setWalking(true);
        window.clearTimeout(stop);
        stop = window.setTimeout(() => setWalking(false), 220);
      }
      setDone(p > 0.985);
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
      window.clearTimeout(stop);
    };
  }, []);

  const plank = (
    <g transform="translate(-6 0)">
      <P k="sf" draw={false} d={rect(-4.5, -58, 9, 104, 1.5)} />
    </g>
  );

  return (
    <div ref={trackRef} className="walker" aria-hidden="true">
      <div className="walker-floor">
        <div ref={fillRef} className="walker-fill" />
      </div>
      <div ref={manRef} className="walker-man">
        <svg viewBox="-70 -118 140 204" className="scene is-drawn">
          {done ? (
            <IkeaMan pose="cheer" anim="cheer" />
          ) : (
            <IkeaMan
              pose="carry"
              anim={walking ? "walk" : "idle"}
              flip={dir < 0}
              className="im-carrying"
              frontItem={plank}
            />
          )}
        </svg>
      </div>
    </div>
  );
};

export default Walker;
