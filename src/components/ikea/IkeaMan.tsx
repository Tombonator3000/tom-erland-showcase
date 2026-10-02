import { CSSProperties, ReactNode } from "react";
import { AnimName, POSES, Pose, PoseName, poseToVars } from "./poses";
import {
  FOREARM,
  HEAD_CX,
  HEAD_CY,
  HEAD_RX,
  HEAD_RY,
  HIP_B,
  HIP_F,
  NECK,
  NOSE,
  SHIN,
  SHOE,
  SHOULDER,
  THIGH,
  TORSO,
  UPPER_ARM,
} from "./geometry";

/*
 * A rigged version of the faceless little man from flat-pack manuals.
 *
 * Coordinates are in the figure's own space with the hip at (0, 0) and the
 * floor at y = 80. Each joint is a nested <g>: the outer group carries the
 * fixed offset as an SVG attribute, the inner group rotates with a CSS
 * transform that reads a custom property (--sf, --ef ...). Changing the
 * pose therefore only swaps a handful of CSS variables and the browser
 * tweens every joint on its own.
 *
 * Arms and legs are drawn twice: first a thick ink stroke, then a thinner
 * paper stroke on top along the same joints. That gives seamless, rounded
 * "tube" limbs with no seams at the elbows or knees.
 */

type Layer = "ol" | "fl";
type Side = "f" | "b";

const Arm = ({ side, layer, item }: { side: Side; layer: Layer; item?: ReactNode }) => (
  <g transform={`translate(${SHOULDER.x} ${SHOULDER.y})`}>
    <g className={`im-j im-s${side}`}>
      <line className={`im-${layer} im-arm`} x1={0} y1={0} x2={0} y2={UPPER_ARM} />
      <g transform={`translate(0 ${UPPER_ARM})`}>
        <g className={`im-j im-e${side}`}>
          <line className={`im-${layer} im-arm`} x1={0} y1={0} x2={0} y2={FOREARM} />
          <circle className={`im-${layer}-hand`} cx={0} cy={FOREARM + 2} r={layer === "ol" ? 7.6 : 5.1} />
          {layer === "fl" && item ? (
            <g className="im-item" transform={`translate(0 ${FOREARM + 2})`}>
              {item}
            </g>
          ) : null}
        </g>
      </g>
    </g>
  </g>
);

const Leg = ({ side, layer }: { side: Side; layer: Layer }) => {
  const hip = side === "f" ? HIP_F : HIP_B;
  return (
    <g transform={`translate(${hip.x} ${hip.y})`}>
      <g className={`im-j im-h${side}`}>
        <line className={`im-${layer} im-leg`} x1={0} y1={0} x2={0} y2={THIGH} />
        <g transform={`translate(0 ${THIGH})`}>
          <g className={`im-j im-k${side}`}>
            <line className={`im-${layer} im-leg`} x1={0} y1={0} x2={0} y2={SHIN} />
            {layer === "fl" ? <path className="im-solid" d={SHOE} transform={`translate(0 ${SHIN})`} /> : null}
          </g>
        </g>
      </g>
    </g>
  );
};

export interface IkeaManProps {
  pose?: PoseName | Pose;
  anim?: AnimName;
  x?: number;
  y?: number;
  scale?: number;
  flip?: boolean;
  /** Rendered in the front hand's coordinate space (origin = palm). */
  frontItem?: ReactNode;
  backItem?: ReactNode;
  /** Rendered in head space, e.g. a hard hat. Origin = neck joint. */
  hat?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const IkeaMan = ({
  pose = "stand",
  anim,
  x = 0,
  y = 0,
  scale = 1,
  flip = false,
  frontItem,
  backItem,
  hat,
  className = "",
  style,
}: IkeaManProps) => {
  const resolved = typeof pose === "string" ? POSES[pose] : pose;
  const vars = poseToVars(resolved) as CSSProperties;

  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      <g className={`ikea-man ${anim ? `im-anim-${anim}` : ""} ${className}`} style={{ ...vars, ...style }}>
        <g className="im-root">
          <g className="im-torso">
            <Arm side="b" layer="ol" />
            <Arm side="b" layer="fl" item={backItem} />
          </g>
          <Leg side="b" layer="ol" />
          <Leg side="b" layer="fl" />
          <Leg side="f" layer="ol" />
          <Leg side="f" layer="fl" />
          <g className="im-torso">
            <path className="im-solid" d={TORSO} />
            <g transform={`translate(${NECK.x} ${NECK.y})`}>
              <g className="im-j im-head">
                <ellipse className="im-solid" cx={HEAD_CX} cy={HEAD_CY} rx={HEAD_RX} ry={HEAD_RY} />
                <path className="im-nose" d={NOSE} />
                {hat}
              </g>
            </g>
            <Arm side="f" layer="ol" />
            <Arm side="f" layer="fl" item={frontItem} />
          </g>
        </g>
      </g>
    </g>
  );
};

export default IkeaMan;
