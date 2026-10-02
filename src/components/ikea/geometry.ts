/*
 * Shared geometry for the IKEA man. Coordinates have the hip at (0, 0)
 * and the floor at y = 80. Used by the rig and by the exploded view.
 */

export const FLOOR_Y = 80;

export const SHOULDER = { x: 1, y: -50 };
export const HIP_F = { x: 4, y: -2 };
export const HIP_B = { x: -4, y: -2 };
export const NECK = { x: 2, y: -58 };
export const UPPER_ARM = 28;
export const FOREARM = 26;
export const THIGH = 38;
export const SHIN = 35;

export const TORSO =
  "M-14.5 6 C-17 -14 -19 -38 -15 -51 C-11.5 -61 12 -62 16.5 -52 C20.5 -38 20 -14 17.5 6 C9 10.5 -6 10.5 -14.5 6 Z";
export const SHOE = "M-7.5 -2 C-8.5 5 -6.5 8 -1 8 L13 8 C18.5 8 18.5 1.5 13 -0.5 L6.5 -2.5 C2.5 -5.5 -5 -5.5 -7.5 -2 Z";
/** Head is drawn relative to the neck joint. The open nose stroke covers the head outline where they meet. */
export const HEAD_CX = 1.5;
export const HEAD_CY = -21;
export const HEAD_RX = 18.4;
export const HEAD_RY = 19.2;
export const NOSE = "M17.4 -27.5 C23.8 -26.5 25.6 -20.6 19.6 -18.4";

