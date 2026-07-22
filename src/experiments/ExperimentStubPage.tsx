import { MonoLabel } from "../components/typography/MonoLabel";
import { Text } from "../components/typography/Text";
import { METRIC_COLORS, type Metric } from "../data/experiments";

type ExperimentStubPageProps = {
  id: string;
  metric: Metric;
  title: string;
  badHref: string;
  goodHref: string;
};

export function ExperimentStubPage({
  id,
  metric,
  title,
  badHref,
  goodHref,
}: ExperimentStubPageProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-[860px] flex-col px-8 pt-14 pb-16">
      <header className="mb-14">
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

        <h1 className="mt-4 mb-6 text-[28px] leading-[1.4] font-semibold tracking-[-0.01em]">
          {title}
        </h1>

        <div className="flex items-center gap-5 border-b border-[oklch(0.88_0.005_90)] pb-6">
          <MonoLabel href={badHref} className="text-sm">
            bad ↗
          </MonoLabel>
          <MonoLabel href={goodHref} className="text-sm">
            good ↗
          </MonoLabel>
        </div>
      </header>

      <main className="flex-1">{/* コンテンツはここに追加 */}</main>

      <footer className="mt-16 border-t border-[oklch(0.88_0.005_90)] pt-6">
        <Text tone="muted" leading={1.8} className="text-[13px]">
          個人運営の技術実験サイトです。掲載内容は再現性を優先し、継続的に追試・更新します。
        </Text>
      </footer>
    </div>
  );
}
