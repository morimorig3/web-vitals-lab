import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { TONE_COLORS, type Tone } from "../../theme/tone";

type HeadingLevel = 1 | 2 | 3;

const TAGS: Record<HeadingLevel, "h1" | "h2" | "h3"> = { 1: "h1", 2: "h2", 3: "h3" };

const LEVEL_STYLES: Record<HeadingLevel, string> = {
  1: "text-[40px] leading-tight font-semibold tracking-[-0.01em]",
  2: "text-[15px] leading-tight font-semibold tracking-[0.02em] uppercase",
  3: "text-lg leading-normal font-medium",
};

type HeadingProps = {
  level: HeadingLevel;
  tone?: Tone;
  id?: string;
  className?: string;
  children: ReactNode;
};

export function Heading({ level, tone, id, className, children }: HeadingProps) {
  const Tag = TAGS[level];

  return (
    <Tag
      id={id}
      className={cn(LEVEL_STYLES[level], className)}
      style={tone ? { color: TONE_COLORS[tone] } : undefined}
    >
      {children}
    </Tag>
  );
}
