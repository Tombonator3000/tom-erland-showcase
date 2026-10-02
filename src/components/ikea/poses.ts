/**
 * Joint angles for the IKEA man rig, in degrees.
 *
 * The figure faces right (+x). Every limb is drawn pointing straight down
 * from its joint, so 0 means "hanging", negative angles swing a limb
 * forward/up and positive angles swing it backward.
 *
 *   torso  lean around the hip (positive = forward)
 *   head   tilt around the neck
 *   sf/ef  front shoulder / elbow      sb/eb  back shoulder / elbow
 *   hf/kf  front hip / knee            hb/kb  back hip / knee
 *   y      lowers the whole body (sitting, kneeling)
 *   rot    rotates the whole body around the hip (lying down)
 */
export interface Pose {
  torso?: number;
  head?: number;
  sf?: number;
  ef?: number;
  sb?: number;
  eb?: number;
  hf?: number;
  kf?: number;
  hb?: number;
  kb?: number;
  y?: number;
  rot?: number;
}

const stand: Pose = { sf: -4, ef: -12, sb: 8, eb: -10, hf: -3, kf: 3, hb: 4, kb: 2 };

export const POSES = {
  stand,
  point: { ...stand, sf: -84, ef: -6, head: -4 },
  present: { ...stand, sf: -128, ef: -28, sb: 14, head: -6 },
  think: { ...stand, sf: -62, ef: -140, head: -6 },
  scratch: { ...stand, sb: 128, eb: 76, sf: -10, ef: -20, head: 6 },
  read: { ...stand, sb: 128, eb: 76, sf: -58, ef: -40, head: 12 },
  phone: { ...stand, sf: -85, ef: -132, head: -6 },
  carry: { ...stand, sf: -38, ef: -52, sb: -30, eb: -56 },
  cheer: { ...stand, sf: -168, ef: -12, sb: -150, eb: -20, head: -10 },
  shrug: { ...stand, sf: -40, ef: -70, sb: -30, eb: -75, head: 8 },
  kneel: {
    torso: 34,
    head: -14,
    sf: -62,
    ef: -26,
    sb: -42,
    eb: -38,
    hf: -14,
    kf: 99,
    hb: -6,
    kb: 94,
    y: 34,
  },
  sit: { torso: -2, sf: -18, ef: -40, sb: 0, eb: -40, hf: -88, kf: 88, hb: -84, kb: 86, y: 37 },
  type: { torso: 6, head: 4, sf: -52, ef: -46, sb: -44, eb: -52, hf: -88, kf: 88, hb: -84, kb: 86, y: 37 },
  lie: { rot: -90, y: 62, sf: -10, ef: -6, sb: 4, eb: -4, hf: -2, kf: 2, hb: 2, kb: 0, head: -8 },
  inspect: { ...stand, torso: 14, head: 10, sf: -70, ef: -48, sb: 6 },
} satisfies Record<string, Pose>;

export type PoseName = keyof typeof POSES;

export const ANIMS = [
  "idle",
  "walk",
  "run",
  "scratch",
  "wave",
  "cheer",
  "type",
  "screw",
  "talk",
  "nod",
  "shake",
] as const;

export type AnimName = (typeof ANIMS)[number];

const JOINTS: (keyof Pose)[] = ["torso", "head", "sf", "ef", "sb", "eb", "hf", "kf", "hb", "kb", "rot"];

/** Turns a pose into CSS custom properties that the rig reads. */
export const poseToVars = (pose: Pose): Record<string, string> => {
  const vars: Record<string, string> = {};
  for (const joint of JOINTS) {
    vars[`--${joint}`] = `${pose[joint] ?? 0}deg`;
  }
  vars["--y"] = `${pose.y ?? 0}px`;
  return vars;
};
