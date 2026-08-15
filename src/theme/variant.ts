export type Variant = "bad" | "good";

type VariantPalette = {
  bg: string;
  color: string;
  dot: string;
  border: string;
  hoverBg: string;
  bar: string;
  note: string;
};

export const VARIANT_LABELS: Record<Variant, string> = {
  bad: "BAD",
  good: "GOOD",
};

export const VARIANT_PALETTE: Record<Variant, VariantPalette> = {
  bad: {
    bg: "oklch(0.95 0.028 25)",
    color: "oklch(0.42 0.16 25)",
    dot: "oklch(0.58 0.19 25)",
    border: "oklch(0.82 0.08 25)",
    hoverBg: "oklch(0.91 0.05 25)",
    bar: "oklch(0.52 0.17 25)",
    note: "意図的にCore Web Vitalsが悪化するように実装しています",
  },
  good: {
    bg: "oklch(0.95 0.03 148)",
    color: "oklch(0.38 0.13 148)",
    dot: "oklch(0.55 0.15 148)",
    border: "oklch(0.8 0.08 148)",
    hoverBg: "oklch(0.91 0.055 148)",
    bar: "oklch(0.48 0.13 148)",
    note: "同じ機能をCore Web Vitalsが改善するように実装しています",
  },
};

export const VARIANT_INACTIVE = {
  color: "oklch(0.6 0.01 90)",
  dot: "oklch(0.85 0.005 90)",
};
