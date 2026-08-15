import type { ReactNode } from "react";
import { MonoLabel } from "../components/typography/MonoLabel";
import { Text } from "../components/typography/Text";
import { cn } from "../lib/cn";
import { METRIC_COLORS, type Metric } from "../data/experiments";
import { VARIANT_INACTIVE, VARIANT_LABELS, VARIANT_PALETTE, type Variant } from "../theme/variant";

type ExperimentLayoutProps = {
  id: string;
  metric: Metric;
  variant: Variant;
  title: string;
  badHref: string;
  goodHref: string;
  children?: ReactNode;
};

export function ExperimentLayout({
  id,
  metric,
  variant,
  title,
  badHref,
  goodHref,
  children,
}: ExperimentLayoutProps) {
  const palette = VARIANT_PALETTE[variant];

  return (
    <div className="flex min-h-screen flex-col">
      <div className="px-8 py-2.5 text-white" style={{ backgroundColor: palette.bar }}>
        <div className="mx-auto flex max-w-[860px] flex-wrap items-center gap-3">
          <span className="font-mono text-[13px] font-bold tracking-[0.08em]">
            {VARIANT_LABELS[variant]} 実装
          </span>
          <span className="text-[12px] opacity-[0.85]">{palette.note}</span>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[860px] flex-1 flex-col p-8">
        <header className="mb-4">
          <MonoLabel href="/" tone="muted" className="text-[13px]">
            ← Web Vitals LAB
          </MonoLabel>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <MonoLabel tone="tertiary" className="text-[13px]">
              {id}
            </MonoLabel>
            <MonoLabel
              className="rounded-[3px] px-2 py-[3px] text-[11px] font-semibold tracking-[0.03em]"
              style={{ color: "white", backgroundColor: METRIC_COLORS[metric] }}
            >
              {metric}
            </MonoLabel>
          </div>

          <h1 className="mt-4 mb-5 text-[28px] leading-[1.4] font-semibold tracking-[-0.01em]">
            {title}
          </h1>

          <div className="border-b border-[oklch(0.88_0.005_90)] pb-6">
            <div className="inline-flex overflow-hidden rounded-[5px] border border-[oklch(0.85_0.005_90)] bg-white">
              <ExperimentTab href={badHref} variant="bad" active={variant === "bad"} />
              <ExperimentTab
                href={goodHref}
                variant="good"
                active={variant === "good"}
                withDivider
              />
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-16 border-t border-[oklch(0.88_0.005_90)] pt-6">
          <Text tone="muted" leading={1.8} className="text-[13px]">
            個人運営の技術実験サイトです。掲載内容は再現性を優先し、継続的に追試・更新します。
          </Text>
        </footer>
      </div>
    </div>
  );
}

type ExperimentTabProps = {
  href: string;
  variant: Variant;
  active: boolean;
  withDivider?: boolean;
};

const TAB_LABELS: Record<Variant, string> = { bad: "BAD 実装", good: "GOOD 実装" };

function ExperimentTab({ href, variant, active, withDivider }: ExperimentTabProps) {
  const palette = VARIANT_PALETTE[variant];

  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-[7px] px-[18px] py-[9px] font-mono text-[12px] font-bold tracking-[0.04em] no-underline",
        withDivider && "border-l border-[oklch(0.85_0.005_90)]",
      )}
      style={{
        color: active ? palette.color : VARIANT_INACTIVE.color,
        backgroundColor: active ? palette.bg : "transparent",
      }}
    >
      <span
        className="inline-block h-[7px] w-[7px] rounded-full"
        style={{ backgroundColor: active ? palette.dot : VARIANT_INACTIVE.dot }}
      />
      {TAB_LABELS[variant]}
    </a>
  );
}
