import { useEffect, useState } from "react";
import { Accordion } from "../../../components/Accordion";
import { ExperimentLayout } from "../../ExperimentLayout";
import { Text } from "../../../components/typography/Text";
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

function NoticeSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="border-b border-[oklch(0.82_0.06_80)] bg-[oklch(0.93_0.045_80)] px-4 py-3">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-4 w-4 flex-none rounded-full bg-[oklch(0.6_0.13_60)]/40" />
          <span className="h-[18px] w-28 rounded-sm bg-[oklch(0.75_0.03_60)]/40" />
        </div>
        <div className="pl-6">
          <span className="block h-[14px] w-3/4 max-w-md rounded-sm bg-[oklch(0.75_0.03_60)]/30" />
        </div>
      </div>
      <div className="border-b border-[oklch(0.9_0.004_90)] bg-[oklch(0.97_0.003_90)] px-4 py-2.5">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 flex-none rounded-full bg-[oklch(0.65_0.008_90)]" />
          <span className="h-[18px] w-24 rounded-sm bg-[oklch(0.88_0.004_90)]" />
        </div>
        <div className="flex flex-col gap-1 pl-[14px]">
          <span className="block h-[14px] w-full max-w-sm rounded-sm bg-[oklch(0.92_0.003_90)]" />
          <span className="block h-[14px] w-full max-w-xs rounded-sm bg-[oklch(0.92_0.003_90)]" />
          <span className="block h-[14px] w-full max-w-sm rounded-sm bg-[oklch(0.92_0.003_90)]" />
        </div>
      </div>
    </div>
  );
}

export function GoodPage() {
  const [noticeGroups, setNoticeGroups] = useState<NoticeGroup[] | null>(null);

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
      variant="good"
      title="後から挿入されるお知らせでCLSが発生"
      badHref="/experiments/cls-02/bad/"
      goodHref="/experiments/cls-02/good/"
    >
      <Accordion label="実験の説明">
        <Text tone="tertiary" className="text-sm mb-2">
          ページの上部にお知らせを後から挿入するページのgood実装パターンです。
        </Text>
        <Text tone="tertiary" className="text-sm mb-2">
          お知らせを取得中の間、実際のお知らせと同じ枠・行数のスケルトン（プレースホルダー）を表示してあらかじめスペースを確保しています。
          <br />
          取得が完了したら、同じ位置・同じ高さのままスケルトンを実際のお知らせに差し替えるため、その下にあるヒーロー画像やCTAボタンの位置がズレません。
        </Text>
        <Text tone="tertiary" className="text-sm">
          ※ただし、スケルトンの高さは実際のお知らせ内容にあわせた見積もりのため、極端に長い文言が届いた場合など完全にズレをゼロにできるとは限りませんが、bad実装のように「読み込み前は高さゼロ」という状態は避けられます。
        </Text>
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

        {noticeGroups === null ? (
          <NoticeSkeleton />
        ) : (
          noticeGroups.map((group) =>
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
          )
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
    </ExperimentLayout>
  );
}
