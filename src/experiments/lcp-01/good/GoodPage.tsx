import { Accordion } from "../../../components/Accordion";
import { ExperimentLayout } from "../../ExperimentLayout";
import { Text } from "../../../components/typography/Text";

const heroImageUrl = "/experiments/lcp-01/nekochan-1600x1067.webp";

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

export function GoodPage() {
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
          ページのトップに大きなヒーロー画像を持つランディングページのgood実装パターンです。
        </Text>
        <Text tone="tertiary" className="text-sm mb-2">
          badパターンと比較して、メインコンテンツの表示が速くなっていることがわかります。
          <br />
          3つの変更を行いました。
          <br />
          ・大きすぎた元画像の解像度をリサイズして圧縮
          <br />
          ・Webに適切なフォーマット（WebP）に変換
          <br />
          ・LCPコンテンツの画像がダウンロードされる優先度を上げるため、loading="lazy"を外して、LCP画像をHTMLパース時点で取得開始できるようにする
        </Text>
        <Text tone="tertiary" className="text-sm">
          この画像はReactコンポーネント内でimportせず、public配下の固定パスから配信しています。
          そのうえでHTMLのlink要素にrel="preload"を追加し、JSの読み込み・実行を待たずにHTMLパース時点で画像取得を開始できるようにしています。
        </Text>
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
            fetchPriority="high"
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
