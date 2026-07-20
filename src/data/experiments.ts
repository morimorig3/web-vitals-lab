import type { Tone } from "../theme/tone";

export type Metric = "LCP" | "INP" | "CLS";

export type Experiment =
  | {
      id: string;
      metric: Metric;
      title: string;
      bad: string;
      good: string | null;
      diff: string;
      inactive?: false;
    }
  | {
      id: string;
      metric: Metric;
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
    id: "LCP-01",
    metric: "LCP",
    title: "無圧縮ヒーロー画像 + 誤ったlazy指定",
    bad: "/experiments/lcp-01/bad",
    good: "/experiments/lcp-01/good",
    diff: "+2.4s",
  },
  {
    id: "INP-01",
    metric: "INP",
    title: "メインスレッドを塞ぐ巨大onClickハンドラ",
    bad: "/experiments/inp-01/bad",
    good: "/experiments/inp-01/good",
    diff: "+180ms",
  },
  {
    id: "CLS-01",
    metric: "CLS",
    title: "サイズ未指定広告枠の遅延挿入",
    bad: "/experiments/cls-01/bad",
    good: "/experiments/cls-01/good",
    diff: "+0.31",
  },
  {
    id: "LCP-02",
    metric: "LCP",
    title: "Webフォント読み込みによるレンダリングブロック",
    bad: "/experiments/lcp-02/bad",
    good: null,
    diff: "計測中",
  },
  {
    id: "CLS-02",
    metric: "CLS",
    title: "フォントスワップ時の行送りジャンプ",
    bad: "/experiments/cls-02/bad",
    good: "/experiments/cls-02/good",
    diff: "未計測",
  },
  { id: "LCP-03", metric: "LCP", inactive: true },
  { id: "INP-02", metric: "INP", inactive: true },
  { id: "CLS-03", metric: "CLS", inactive: true },
];
