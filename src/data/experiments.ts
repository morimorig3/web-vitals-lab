import type { Tone } from "../theme/tone";

export type Metric = "LCP" | "INP" | "CLS";

export type Experiment =
  | {
      id: string;
      metric: Metric;
      title: string;
      thumb?: string;
      bad: string;
      good: string | null;
      diff: string;
      inactive?: false;
    }
  | {
      id: string;
      metric: Metric;
      title?: string;
      inactive: true;
    };

export const METRIC_COLORS: Record<Metric, string> = {
  LCP: "oklch(0.58 0.16 25)",
  INP: "oklch(0.62 0.14 80)",
  CLS: "oklch(0.55 0.13 250)",
};

const PENDING_DIFF_LABELS = new Set(["計測中", "未計測"]);

export function getDiffTone(diff: string): Tone {
  return PENDING_DIFF_LABELS.has(diff) ? "subtle" : "secondary";
}

export const EXPERIMENTS: Experiment[] = [
  {
    id: "INP-01",
    metric: "INP",
    title: "入力イベントごとに1万件を同期フィルタ+全行再レンダリング",
    thumb: "/thumbs/inp-01.svg",
    bad: "/experiments/inp-01/bad/",
    good: "/experiments/inp-01/good/",
    diff: "計測中",
  },
  {
    id: "LCP-01",
    metric: "LCP",
    title: "無圧縮ヒーロー画像 + 誤ったlazy指定",
    inactive: true,
  },
  {
    id: "CLS-01",
    metric: "CLS",
    title: "画像に width/height 未指定",
    inactive: true,
  },
];
