import { CSSProperties, ReactNode, SVGProps } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";
import { n } from "./geom";

/* ---------- Drawable path ---------- */

export type Kind = "ln" | "sf" | "sh" | "sh2" | "yl" | "ink" | "ink-ln";

export type PProps = Omit<SVGProps<SVGPathElement>, "ref"> & {
  k?: Kind;
  draw?: boolean;
  delay?: number;
  dur?: number;
};

export const P = ({ k = "ln", draw = true, delay, dur, className, style, ...rest }: PProps) => {
  const vars: Record<string, string> = {};
  if (delay !== undefined) vars["--d"] = `${delay}s`;
  if (dur !== undefined) vars["--dur"] = `${dur}s`;
  return (
    <path
      pathLength={draw ? 1 : undefined}
      className={cn(k, draw && k !== "ink" && "draw", draw && k === "ink" && "fade", className)}
      style={{ ...vars, ...style } as CSSProperties}
      {...rest}
    />
  );
};

/** Group that pops/fades in with a delay. Never put a transform attribute on it. */
export const Reveal = ({
  as = "pop",
  delay = 0,
  children,
  className,
}: {
  as?: "pop" | "fade" | "drop";
  delay?: number;
  children: ReactNode;
  className?: string;
}) => (
  <g className={cn(as, className)} style={{ "--d": `${delay}s` } as CSSProperties}>
    {children}
  </g>
);

export const At = ({
  x = 0,
  y = 0,
  r = 0,
  s = 1,
  children,
  className,
}: {
  x?: number;
  y?: number;
  r?: number;
  s?: number;
  children: ReactNode;
  className?: string;
}) => (
  <g transform={`translate(${n(x)} ${n(y)})${r ? ` rotate(${r})` : ""}${s !== 1 ? ` scale(${s})` : ""}`} className={className}>
    {children}
  </g>
);

/* ---------- Scene ---------- */

export interface SceneState {
  seen: boolean;
  inView: boolean;
}

interface SceneProps {
  viewBox: string;
  className?: string;
  label?: string;
  threshold?: number;
  style?: CSSProperties;
  children: ReactNode | ((state: SceneState) => ReactNode);
}

export const Scene = ({ viewBox, className, label, threshold = 0.3, style, children }: SceneProps) => {
  const { ref, inView, seen } = useInView<SVGSVGElement>(threshold);
  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      className={cn("scene", seen && "is-drawn", !inView && "is-paused", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      style={style}
    >
      {typeof children === "function" ? children({ seen, inView }) : children}
    </svg>
  );
};

/** Falls into place from above. */
export const Drop = ({ delay = 0, children }: { delay?: number; children: ReactNode }) => (
  <Reveal as="drop" delay={delay}>
    {children}
  </Reveal>
);
