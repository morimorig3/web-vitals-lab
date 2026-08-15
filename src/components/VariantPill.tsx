import type { CSSProperties } from "react";
import { cn } from "../lib/cn";
import { VARIANT_INACTIVE, VARIANT_PALETTE, type Variant } from "../theme/variant";

const LABELS: Record<Variant, string> = { bad: "BAD 実装", good: "GOOD 実装" };

type VariantPillLinkProps = {
  href: string;
  variant: Variant;
  className?: string;
};

export function VariantPillLink({ href, variant, className }: VariantPillLinkProps) {
  const palette = VARIANT_PALETTE[variant];

  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-[7px] rounded-[4px] border px-3.5 py-[7px] font-mono text-[12px] font-bold tracking-[0.04em] no-underline hover:bg-[var(--pill-hover-bg)]",
        className,
      )}
      style={
        {
          color: palette.color,
          backgroundColor: palette.bg,
          borderColor: palette.border,
          "--pill-hover-bg": palette.hoverBg,
        } as CSSProperties
      }
    >
      <span
        className="inline-block h-[7px] w-[7px] rounded-full"
        style={{ backgroundColor: palette.dot }}
      />
      {LABELS[variant]}
    </a>
  );
}

export function VariantPillPending({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[7px] rounded-[4px] border border-dashed border-[oklch(0.82_0.005_90)] px-3.5 py-[7px] font-mono text-[12px] font-bold tracking-[0.04em] text-[oklch(0.65_0.008_90)]",
        className,
      )}
    >
      <span
        className="inline-block h-[7px] w-[7px] rounded-full"
        style={{ backgroundColor: VARIANT_INACTIVE.dot }}
      />
      GOOD 準備中
    </span>
  );
}
