import { Accordion } from "../../../components/Accordion";
import { ExperimentLayout } from "../../ExperimentLayout";
import { Text } from "../../../components/typography/Text";
import image01 from "../image-01.jpg?url";
import image02 from "../image-02.jpg?url";
import image03 from "../image-03.jpg?url";
import image04 from "../image-04.jpg?url";
import image05 from "../image-05.jpg?url";
import image06 from "../image-06.jpg?url";
import clsImageUrl from "./cls.png?url";

const GALLERY_IMAGES = [image01, image02, image03, image04, image05, image06];

export function BadPage() {
  return (
    <ExperimentLayout
      id="CLS-01"
      metric="CLS"
      variant="bad"
      title="画像に width/height 未指定"
      badHref="/experiments/cls-01/bad/"
      goodHref="/experiments/cls-01/good/"
    >
      <Accordion label="実験の説明">
        <Text tone="tertiary" className="text-sm mb-2">
          画面の上部に商品画像をタイル状に並べた商品ページのbad実装パターンです。
        </Text>
        <Text tone="tertiary" className="text-sm">
          タイル状に並ぶ商品写真6枚に画像の横幅/高さ（またはアスペクト比）を指定していないため、画像の読み込みが完了するたびにタイルの高さが変化し、その下にある「今すぐカートに入れる」ボタンの位置が大きく下にずれ続けます。
          <br />
          ユーザーにとってはボタンの位置がズレるという現象はUXが悪く、ボタンを押そうとしたときに誤って別のボタンを押してしまうなど、操作ミスの原因にもなります。
        </Text>
        <img src={clsImageUrl} alt="CLS" className="my-4 w-40 shadow rounded" />
      </Accordion>

      <div className="overflow-hidden rounded-[8px] border border-[oklch(0.88_0.005_90)] bg-white p-2 flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-3 bg-white">
          {GALLERY_IMAGES.map((src, i) => (
            <img key={src} src={src} alt={`商品写真${i + 1}`} className="w-full rounded-[4px]" />
          ))}
        </div>
        <section className="">
          <h2 className="mb-2 text-[22px] font-bold">涎まみれでも壊れない ねこロープトイ</h2>
          <p className="mb-4 text-[13px] leading-[1.7] text-[oklch(0.5_0.008_90)]">
            天然コットン100%だから、思いきり噛んでも安心。丈夫な編み込み構造で、遊び盛りの猫にも負けません。
          </p>
          <p className="text-[20px] font-bold">¥1,980</p>
        </section>

        <section className="px-8 text-center">
          <button
            type="button"
            className="rounded-[4px] bg-[oklch(0.55_0.13_250)] px-8 py-3.5 text-[14px] font-semibold text-white"
          >
            今すぐカートに入れる
          </button>
          <p className="mt-3 text-[12px] text-[oklch(0.55_0.01_90)]">在庫残りわずか。送料無料。</p>
        </section>
      </div>
    </ExperimentLayout>
  );
}
