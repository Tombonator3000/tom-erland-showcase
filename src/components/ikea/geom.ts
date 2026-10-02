import { useId } from "react";

/* ---------- Path helpers. Everything is a <path> so pathLength works everywhere. ---------- */

export const n = (v: number) => Math.round(v * 100) / 100;

export const rect = (x: number, y: number, w: number, h: number, r = 0) => {
  if (!r) return `M${n(x)} ${n(y)}H${n(x + w)}V${n(y + h)}H${n(x)}Z`;
  return (
    `M${n(x + r)} ${n(y)}H${n(x + w - r)}A${r} ${r} 0 0 1 ${n(x + w)} ${n(y + r)}` +
    `V${n(y + h - r)}A${r} ${r} 0 0 1 ${n(x + w - r)} ${n(y + h)}` +
    `H${n(x + r)}A${r} ${r} 0 0 1 ${n(x)} ${n(y + h - r)}` +
    `V${n(y + r)}A${r} ${r} 0 0 1 ${n(x + r)} ${n(y)}Z`
  );
};

export const circle = (cx: number, cy: number, r: number) =>
  `M${n(cx - r)} ${n(cy)}A${r} ${r} 0 1 0 ${n(cx + r)} ${n(cy)}A${r} ${r} 0 1 0 ${n(cx - r)} ${n(cy)}Z`;

export const ellipse = (cx: number, cy: number, rx: number, ry: number) =>
  `M${n(cx - rx)} ${n(cy)}A${rx} ${ry} 0 1 0 ${n(cx + rx)} ${n(cy)}A${rx} ${ry} 0 1 0 ${n(cx - rx)} ${n(cy)}Z`;

export const line = (x1: number, y1: number, x2: number, y2: number) => `M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}`;

export const poly = (pts: [number, number][], close = true) =>
  "M" + pts.map(([x, y]) => `${n(x)} ${n(y)}`).join("L") + (close ? "Z" : "");

/** Arc of a circle between two angles (degrees, 0 = right, clockwise). */
export const arc = (cx: number, cy: number, r: number, from: number, to: number) => {
  const p = (a: number) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)];
  const [x1, y1] = p(from);
  const [x2, y2] = p(to);
  const large = Math.abs(to - from) > 180 ? 1 : 0;
  const sweep = to > from ? 1 : 0;
  return `M${n(x1)} ${n(y1)}A${r} ${r} 0 ${large} ${sweep} ${n(x2)} ${n(y2)}`;
};

/** Faces of a box in cabinet projection (depth goes up and to the right). */
export const DEPTH_X = 0.56;
export const DEPTH_Y = -0.4;
export const boxFaces = (x: number, y: number, w: number, h: number, d: number) => {
  const dx = d * DEPTH_X;
  const dy = d * DEPTH_Y;
  return {
    front: poly([
      [x, y],
      [x + w, y],
      [x + w, y + h],
      [x, y + h],
    ]),
    top: poly([
      [x, y],
      [x + dx, y + dy],
      [x + w + dx, y + dy],
      [x + w, y],
    ]),
    side: poly([
      [x + w, y],
      [x + w + dx, y + dy],
      [x + w + dx, y + h + dy],
      [x + w, y + h],
    ]),
  };
};


export const useSvgId = (prefix = "s") => prefix + useId().replace(/[^a-zA-Z0-9]/g, "");
