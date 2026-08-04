import { Accordion } from "../../../components/Accordion";
import { ExperimentLayout } from "../../ExperimentLayout";
import { Text } from "../../../components/typography/Text";
import heroImageUrl from "./nekochan-6720x4480.jpg?url";
import lcpImageUrl from "./lcp.png?url";

const FEATURES = [
  {
    title: "毎日のお世話ログ",
    body: "ごはん・トイレ・体重をワンタップで記録。家族やペットシッターとリアルタイムに共有できます。",
  },
  {
    title: "かかりつけ病院と連携",
    body: "予防接種や通院の予定を自動リマインド。接種履歴はアプリ内にずっと残ります。",
  },
  {
    title: "多頭飼いにも対応",
    body: "猫が増えても大丈夫。プロフィールを追加するだけで、それぞれの記録を分けて管理できます。",
  },
];

export function BadPage() {
  return (
    <ExperimentLayout
      id="LCP-01"
      metric="LCP"
      title="無圧縮ヒーロー画像 + 誤ったlazy指定"
      badHref="/experiments/lcp-01/bad/"
      goodHref="/experiments/lcp-01/good/"
    >
      <Accordion label="実験の説明">
        <Text tone="tertiary" className="text-sm mb-2">
          ページのトップに大きなヒーロー画像を持つランディングページのbad実装パターンです。
        </Text>
        <Text tone="tertiary" className="text-sm">
          6720×4480px・約8MBの無圧縮JPEGをそのままヒーロー画像として指定し、さらにページのメインコンテンツ要素のヒーロー画像要素にloading="lazy"を指定してしまうことで、遅れてメインコンテンツが表示されるという問題が発生しています。
        </Text>
        <img src={lcpImageUrl} alt="LCP" className="my-4 w-40 shadow rounded" />
      </Accordion>

      <div className="overflow-hidden rounded-[8px] border border-[oklch(0.88_0.005_90)]">
        <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-[oklch(0.9_0.004_90)] bg-white px-6 py-4">
          <span className="text-[15px] font-semibold tracking-[-0.01em]">🐾 Nekochan Log</span>
          <div className="flex items-center gap-5 text-[13px] text-[oklch(0.4_0.006_90)]">
            <span>特徴</span>
            <span>料金</span>
            <span>お客様の声</span>
            <span>お問い合わせ</span>
          </div>
          <button
            type="button"
            className="rounded-[4px] bg-[oklch(0.3_0.02_90)] px-4 py-2 text-[13px] font-semibold text-white"
          >
            無料で始める
          </button>
        </nav>

        <div className="relative">
          <img
            src={heroImageUrl}
            loading="lazy"
            alt="くつろぐ猫のヒーロー画像"
            className="h-[420px] w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-start justify-center gap-4 bg-black/35 px-10">
            <h2 className="max-w-md text-[28px] leading-[1.4] font-bold text-white">
              猫との暮らしを、もっと安心に。
            </h2>
            <p className="max-w-sm text-[14px] leading-[1.7] text-white/90">
              ごはん・体重・通院履歴をまとめて記録。大切な家族の変化を見逃さないための、猫専用の記録アプリです。
            </p>
            <button
              type="button"
              className="rounded-[4px] bg-white px-5 py-2.5 text-[13px] font-semibold text-[oklch(0.25_0.01_90)]"
            >
              今すぐ無料で始める
            </button>
          </div>
        </div>

        <section className="grid grid-cols-1 gap-6 bg-white px-8 py-10 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="grid gap-2">
              <h3 className="text-[15px] font-semibold">{feature.title}</h3>
              <p className="text-[13px] leading-[1.7] text-[oklch(0.5_0.008_90)]">{feature.body}</p>
            </div>
          ))}
        </section>

        <section className="bg-[oklch(0.97_0.003_90)] px-8 py-12 text-center">
          <h3 className="mb-3 text-[18px] font-semibold">今日から、猫の記録をはじめよう</h3>
          <p className="mb-6 text-[13px] text-[oklch(0.5_0.008_90)]">
            クレジットカード登録不要。いつでも解約できます。
          </p>
          <button
            type="button"
            className="rounded-[4px] bg-[oklch(0.3_0.02_90)] px-6 py-3 text-[13px] font-semibold text-white"
          >
            無料アカウントを作成
          </button>
        </section>
      </div>
    </ExperimentLayout>
  );
}
