import { RefObject, createContext, useContext } from "react";

export const SCREW_IDS = ["forside", "innhold", "montering", "tillegg", "bakside"] as const;
export type ScrewId = (typeof SCREW_IDS)[number];

export interface Hunt {
  found: ScrewId[];
  total: number;
  isGone: (id: ScrewId) => boolean;
  collect: (id: ScrewId, from: DOMRect) => void;
  counterRef: RefObject<HTMLDivElement>;
  bump: number;
  celebrate: boolean;
  closeCelebration: () => void;
}

export const HuntContext = createContext<Hunt | null>(null);

export const useScrewHunt = () => {
  const ctx = useContext(HuntContext);
  if (!ctx) throw new Error("useScrewHunt must be used inside ScrewHuntProvider");
  return ctx;
};
