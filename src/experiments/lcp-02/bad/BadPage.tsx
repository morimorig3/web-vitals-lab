import { Accordion } from "../../../components/Accordion";
import { ExperimentLayout } from "../../ExperimentLayout";
import { Text } from "../../../components/typography/Text";
import lcpImageUrl from "./lcp.png?url";

const WEIGHT_SAMPLES = [
  { weight: 400, label: "Regular 400", className: "font-normal" },
  { weight: 500, label: "Medium 500", className: "font-medium" },
  { weight: 600, label: "SemiBold 600", className: "font-semibold" },
  { weight: 700, label: "Bold 700", className: "font-bold" },
  { weight: 800, label: "ExtraBold 800", className: "font-extrabold" },
];

const SECTIONS = [
  {
    title: "① 第一印象が肝心。対面はとにかくゆっくりと",
    body: "新しい猫を迎えたその日にいきなりご対面させるのはNGです。まずは別の部屋に隔離し、数日〜1週間ほどかけてお互いの存在を鳴き声や気配だけで感じさせてあげましょう。焦って距離を詰めると、先住猫が強いストレスを感じてしまい、その後の関係づくりがかえって難しくなることがあります。",
  },
  {
    title: "② においを共有して、家族の一員だと覚えてもらう",
    body: "同じタオルやブランケットを2匹で交互に使い、においを交換するのも効果的です。猫はにおいで安心・警戒を判断するため、直接顔を合わせる前に「なんだか嗅ぎ慣れたにおいがする」状態を作っておくと、対面時の警戒心をぐっと下げられます。",
  },
  {
    title: "③ それぞれの安全地帯を必ず確保する",
    body: "高い場所や隠れられる箱など、他の猫から見えない・追われても逃げ込める場所をそれぞれに用意してあげてください。逃げ場のない環境で対面させると、引くに引けず喧嘩に発展しやすくなります。特に先住猫にとっての「聖域」は絶対に奪わないようにしましょう。",
  },
  {
    title: "④ ごはんの時間と場所は別々にする",
    body: "食事は縄張り意識が最も強く出るタイミングです。同じ器・同じ場所で同時に食べさせると、新入り猫が萎縮したり、逆に先住猫がフードガーディング（威嚇して食事を守る行動）を始めたりすることがあります。しばらくは部屋を分けて給餌するのが無難です。",
  },
  {
    title: "⑤ 焦らない。関係づくりには数ヶ月かかることもある",
    body: "多頭飼いがうまくいくかどうかは、数日ではなく数週間〜数ヶ月単位で見てあげる必要があります。毛を逆立てたり威嚇したりする様子が見られても、それだけで「相性が悪い」と判断せず、根気強く距離を縮めるステップを繰り返してあげましょう。",
  },
];

export function BadPage() {
  return (
    <ExperimentLayout
      id="LCP-02"
      metric="LCP"
      title="Webフォントのブロッキング読み込み"
      badHref="/experiments/lcp-02/bad/"
      goodHref="/experiments/lcp-02/good/"
    >
      <Accordion label="実験の説明">
        <Text tone="tertiary" className="text-sm mb-2">
          ページにWebフォントをふんだんに使った、ブログ記事ページのbad実装パターンです。
        </Text>
        <Text tone="tertiary" className="text-sm mb-2">
          Google Fontsから「Shippori Mincho
          B1」の400〜800・全5ウェイトをまとめて同期読み込みしています。preconnectの指定も
          font-displayの指定もないため、フォントの取得に時間がかかるほど記事タイトルや本文といったLCP候補要素の描画開始が遅れます。
          <br />
          ユーザーにとっては、記事の本文が表示されるまでの時間も長くなり、表示された後もフォントの切り替えが発生するため、読みやすさやUXの面で悪影響を与えます。
        </Text>
        <Text tone="tertiary" className="text-sm">
          ※Webフォントの読み込みはデスクトップ環境ではあまり問題にならず、モバイル環境のようなネットワーク帯域が狭い環境で顕著に影響が出ます。
        </Text>
        <img src={lcpImageUrl} alt="LCP" className="my-4 w-40 shadow rounded" />
      </Accordion>

      <div className="overflow-hidden rounded-[8px] border border-[oklch(0.88_0.005_90)] bg-white">
        <header className="flex items-center justify-between border-b border-[oklch(0.88_0.005_90)] px-6 py-4">
          <span className="text-[15px] font-bold">🐾 ねこ日和</span>
          <nav className="flex gap-4 text-[12px] text-[oklch(0.55_0.01_90)]">
            <span>くらし</span>
            <span>健康</span>
            <span>グッズ</span>
          </nav>
        </header>

        <article className="px-8 py-10" style={{ fontFamily: '"Shippori Mincho B1"' }}>
          <p className="mb-2 text-[12px] font-light text-[oklch(0.55_0.01_90)]">
            2026/07/28 ・ くらし
          </p>
          <h1 className="mb-4 text-[26px] leading-[1.4] font-black">
            はじめての多頭飼い、ねこ同士を仲良くさせる5つのコツ
          </h1>
          <p className="mb-8 text-[15px] leading-[1.9] font-medium text-[oklch(0.4_0.006_90)]">
            新しい家族を迎えるのはうれしいものですが、先住猫との相性を間違えると思わぬ喧嘩やストレスにつながることも。今回は、我が家で3匹の保護猫を迎えてきた経験から、多頭飼いを成功させるためのポイントを5つにまとめました。
          </p>

          {SECTIONS.map((section) => (
            <section key={section.title} className="mb-8">
              <h2 className="mb-2 text-[18px] font-bold">{section.title}</h2>
              <p className="text-[14px] leading-[1.9] font-normal text-[oklch(0.4_0.006_90)]">
                {section.body}
                {section.body}
                {section.body}
              </p>
            </section>
          ))}

          <div className="rounded-[6px] border border-[oklch(0.9_0.004_90)] bg-[oklch(0.97_0.003_90)] p-5">
            <p className="mb-3 text-[12px] font-semibold text-[oklch(0.5_0.008_90)]">
              使用フォント Shippori Mincho B1 ウェイト見本
            </p>
            <div className="flex flex-col gap-1.5">
              {WEIGHT_SAMPLES.map((sample) => (
                <p key={sample.weight} className={`text-[15px] ${sample.className}`}>
                  {sample.label}　ねこがすきです
                </p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </ExperimentLayout>
  );
}
