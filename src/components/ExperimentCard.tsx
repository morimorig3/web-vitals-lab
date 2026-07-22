import { METRIC_COLORS, type Experiment, getDiffTone } from "../data/experiments";
import { Heading } from "./typography/Heading";
import { MonoLabel } from "./typography/MonoLabel";
import { Text } from "./typography/Text";

type ExperimentCardProps = {
  experiment: Experiment;
};

export function ExperimentCard({ experiment }: ExperimentCardProps) {
  if (experiment.inactive) {
    const { id, metric, title } = experiment;

    return (
      <article className="grid grid-cols-[160px_1fr] gap-6 border-b border-[oklch(0.9_0.004_90)] px-1 py-7 opacity-50">
        <div className="flex h-[110px] w-40 items-center justify-center rounded-[6px] border border-dashed border-[oklch(0.75_0.006_90)]">
          <MonoLabel tone="subtle" className="text-[11px]">
            準備中
          </MonoLabel>
        </div>

        <div className="grid content-start gap-3.5">
          <div className="flex flex-wrap items-center gap-3">
            <MonoLabel tone="subtle" className="text-[13px]">
              {id}
            </MonoLabel>
            <MonoLabel
              tone="tertiary"
              className="rounded-[3px] border border-[oklch(0.82_0.005_90)] bg-[oklch(0.92_0.004_90)] px-2 py-[3px] text-[11px] font-semibold tracking-[0.03em]"
            >
              {metric}
            </MonoLabel>
          </div>

          <Heading level={3} tone="muted" className="m-0">
            {title ?? "近日追加予定"}
          </Heading>

          {title && (
            <MonoLabel tone="subtle" className="text-[12px]">
              近日追加予定
            </MonoLabel>
          )}
        </div>
      </article>
    );
  }

  const { id, metric, title, thumb, bad, good, diff } = experiment;

  return (
    <article className="grid grid-cols-[160px_1fr] gap-6 border-b border-[oklch(0.9_0.004_90)] px-1 py-7">
      <div className="flex h-[110px] w-40 items-center justify-center overflow-hidden rounded-[6px] border border-[oklch(0.88_0.005_90)] bg-[oklch(0.94_0.004_90)] text-[13px] text-[oklch(0.6_0.008_90)]">
        {thumb ? <img src={thumb} alt="" className="h-full w-full object-cover" /> : "計測画面"}
      </div>

      <div className="grid gap-3.5">
        <div className="flex flex-wrap items-center gap-3">
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

        <Heading level={3} className="m-0">
          {title}
        </Heading>

        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-3.5">
            <MonoLabel href={bad} className="text-[13px]">
              bad ↗
            </MonoLabel>
            {good ? (
              <MonoLabel href={good} className="text-[13px]">
                good ↗
              </MonoLabel>
            ) : (
              <MonoLabel tone="faint" className="text-[13px]">
                good — 準備中
              </MonoLabel>
            )}
          </div>

          <div className="flex items-baseline gap-1.5">
            <Text as="span" tone="subtle" className="text-xs">
              実測差分
            </Text>
            <MonoLabel tone={getDiffTone(diff)} className="font-semibold">
              {diff}
            </MonoLabel>
          </div>
        </div>
      </div>
    </article>
  );
}
