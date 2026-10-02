import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SheetProps {
  id: string;
  page: number;
  title: ReactNode;
  kicker?: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
}

/** One page of the manual: white sheet, title, page number in the outer corner. */
const Sheet = ({ id, page, title, kicker, lead, children, className, headerClassName }: SheetProps) => (
  <section id={id} className={cn("sheet", className)} aria-labelledby={`${id}-title`}>
    <header className={cn("mb-10 md:mb-14", headerClassName)}>
      <p className="kicker">{kicker ?? `Side ${page}`}</p>
      <h2 id={`${id}-title`} className="sheet-title mt-3">
        {title}
      </h2>
      {lead ? <p className="lead mt-5">{lead}</p> : null}
    </header>
    {children}
    <div className={cn("sheet-foot", page % 2 === 0 && "flex-row-reverse")} aria-hidden="true">
      <span>AA-2026-HUSBY-{String(page).padStart(2, "0")}</span>
      <span className="page-no">{page}</span>
    </div>
  </section>
);

export default Sheet;
