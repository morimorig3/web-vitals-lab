import type { CSSProperties, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { TONE_COLORS, type Tone } from "../../theme/tone";

type MonoLabelProps = {
  tone?: Tone;
  href?: string;
  uppercase?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function MonoLabel({ tone, href, uppercase, className, style, children }: MonoLabelProps) {
  const classes = cn("font-mono", uppercase && "uppercase", className);
  const combinedStyle: CSSProperties = {
    lineHeight: 1.5,
    ...(tone ? { color: TONE_COLORS[tone] } : undefined),
    ...style,
  };

  if (href) {
    return (
      <a href={href} className={classes} style={combinedStyle}>
        {children}
      </a>
    );
  }

  return (
    <span className={classes} style={combinedStyle}>
      {children}
    </span>
  );
}
