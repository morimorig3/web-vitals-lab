import type { ReactNode } from "react";
import { cn } from "../lib/cn";

type AccordionProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

export function Accordion({ label, children, className }: AccordionProps) {
  return (
    <details
      className={cn("group mb-8 rounded-[6px] border border-[oklch(0.88_0.005_90)]", className)}
    >
      <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-[13px] font-semibold tracking-[0.01em] select-none [&::-webkit-details-marker]:hidden">
        <span className="inline-block text-[10px] text-[oklch(0.55_0.01_90)] transition-transform duration-150 group-open:rotate-90">
          ▶
        </span>
        {label}
      </summary>
      <div className="px-4 pb-4">{children}</div>
    </details>
  );
}
