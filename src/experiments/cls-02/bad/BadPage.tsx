import { useEffect, useState } from "react";
import { Accordion } from "../../../components/Accordion";
import { ExperimentLayout } from "../../ExperimentLayout";
import { Text } from "../../../components/typography/Text";
import clsImageUrl from "./cls.png?url";
import heroCatUrl from "../hero-cat.jpg?url";

const NOTICE_FETCH_DELAY_MS = 1500;

type NoticeGroup = {
  type: "important" | "normal";
  heading: string;
  items: string[];
};

// 重要なお知らせ1件・通常のお知らせ3件がまとめて届く想定
const NOTICE_GROUPS: NoticeGroup[] = [
  {
    type: "important",
    heading: "重要なお知らせ",
    items: ["【重要】現在、一部の機能でアクセスしづらい状況が発生しています。"],
  },
  {
    type: "normal",
    heading: "通常のお知らせ",
    items: [
      "夏季メンテナンスのお知らせを更新しました。",
      "新機能「アルバム共有」をリリースしました。",
      "利用規約を改定しました。",
    ],
  },
];

export function BadPage() {
  const [noticeGroups, setNoticeGroups] = useState<NoticeGroup[]>([]);

  // マウント後、クライアント側でお知らせ一覧をまとめて取得する処理を模擬
  useEffect(() => {
    const timer = setTimeout(() => {
      setNoticeGroups(NOTICE_GROUPS);
    }, NOTICE_FETCH_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ExperimentLayout
      id="CLS-02"
      metric="CLS"
      title="後から挿入されるお知らせでCLSが発生"
      badHref="/experiments/cls-02/bad/"
      goodHref="/experiments/cls-02/good/"
    >
      <Accordion label="実験の説明">
        <Text tone="tertiary">
          架空のねこ写真共有サービス「ねこパレット」のトップページをサンプルにCLSを計測するbadパターン実装です。
        </Text>
        <Text tone="tertiary">
          CLSはページ読み込み中に発生する予期しないレイアウトのズレを数値化するCore Web
          Vitalsの指標です。画像だけでなく、画面上部に後から挿入される要素があると発生しやすくなります。
        </Text>
        <Text tone="tertiary">
          本ページでは、画面上部に表示されるお知らせを、ヘッダー直下へ高さ0の状態から挿入しています。
          挿入前はこの高さを一切確保していないため、取得できた瞬間にヒーローのCTAボタンや画像がまとめて大きく押し下げられます。
        </Text>
        <img src={clsImageUrl} alt="CLS" className="my-4 w-40 shadow rounded" />
      </Accordion>

      <div className="overflow-hidden rounded-[8px] border border-[oklch(0.88_0.005_90)] bg-white">
        <header className="flex items-center justify-between border-b border-[oklch(0.88_0.005_90)] px-4 py-3">
          <span className="text-[15px] font-bold">ねこパレット</span>
          <nav className="flex gap-4 text-[12px] text-[oklch(0.55_0.01_90)]">
            <span>さがす</span>
            <span>投稿する</span>
            <span>マイページ</span>
          </nav>
        </header>

        {noticeGroups.map((group) =>
          group.type === "important" ? (
            <div
              key={group.heading}
              className="border-b border-[oklch(0.82_0.06_80)] bg-[oklch(0.93_0.045_80)] px-4 py-3"
            >
              <p className="mb-2 flex items-center gap-2 text-[16px] font-bold text-[oklch(0.4_0.1_60)]">
                <span className="flex h-4 w-4 flex-none items-center justify-center rounded-full bg-[oklch(0.6_0.13_60)] text-[10px] font-bold text-white">
                  !
                </span>
                {group.heading}
              </p>
              <ul className="flex flex-col gap-1.5 pl-6">
                {group.items.map((item) => (
                  <li key={item} className="text-[14px] leading-[1.6] text-[oklch(0.35_0.03_60)]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div
              key={group.heading}
              className="border-b border-[oklch(0.9_0.004_90)] bg-[oklch(0.97_0.003_90)] px-4 py-2.5"
            >
              <p className="mb-1.5 flex items-center gap-2 text-[16px] font-bold text-[oklch(0.45_0.006_90)]">
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-[oklch(0.65_0.008_90)]" />
                {group.heading}
              </p>
              <ul className="flex flex-col gap-1 pl-[14px]">
                {group.items.map((item) => (
                  <li key={item} className="text-[14px] text-[oklch(0.5_0.008_90)]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ),
        )}

        <img
          src={heroCatUrl}
          alt="くつろぐねこ"
          width={1200}
          height={400}
          className="block h-[220px] w-full object-cover"
        />

        <section className="px-6 py-8 text-center">
          <h2 className="mb-2 text-[20px] font-bold">ねこのしっぽ、記録しませんか？</h2>
          <p className="mb-5 text-[13px] leading-[1.7] text-[oklch(0.5_0.008_90)]">
            愛猫の写真をアルバムにまとめて、家族やフォロワーと一緒に楽しめるサービスです。
          </p>
          <button
            type="button"
            className="rounded-[4px] bg-[oklch(0.55_0.13_250)] px-8 py-3.5 text-[14px] font-semibold text-white"
          >
            今すぐはじめる
          </button>
        </section>
      </div>

      <div className="mt-4">
        <Text className="text-[12px]" tone="subtle">
          ※「重要なお知らせ」「通常のお知らせ」の見出し＋項目はページ読み込み時点のHTMLには含まれておらず、マウントの約1.5秒後にクライアント側でまとめて取得された場合のみ表示されます。取得前は高さ0のため、その間にユーザーがCTAボタンへ向けて操作を始めていても、取得完了時に見出し行を含めた分の高さがまとめて挿入され、表示位置が一気にずれます。
        </Text>
      </div>
    </ExperimentLayout>
  );
}
