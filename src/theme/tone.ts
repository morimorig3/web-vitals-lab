export type Tone = "primary" | "secondary" | "tertiary" | "muted" | "subtle" | "faint";

export const TONE_COLORS: Record<Tone, string> = {
  primary: "oklch(0.22 0.005 90)",
  secondary: "oklch(0.4 0.006 90)",
  tertiary: "oklch(0.5 0.008 90)",
  muted: "oklch(0.55 0.01 90)",
  subtle: "oklch(0.6 0.008 90)",
  faint: "oklch(0.65 0.008 90)",
};
