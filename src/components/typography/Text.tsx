import type { ReactNode } from "react";
import { TONE_COLORS, type Tone } from "../../theme/tone";

const DEFAULT_LEADING = 1.5;

type TextProps = {
  tone?: Tone;
  as?: "p" | "span";
  leading?: number | string;
  className?: string;
  children: ReactNode;
};

export function Text({
  tone,
  as: Tag = "p",
  leading = DEFAULT_LEADING,
  className,
  children,
}: TextProps) {
  return (
    <Tag
      className={className}
      style={{
        lineHeight: leading,
        ...(tone ? { color: TONE_COLORS[tone] } : undefined),
      }}
    >
      {children}
    </Tag>
  );
}
