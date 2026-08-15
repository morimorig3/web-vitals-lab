import { useEffect, useState } from "react";
import { Accordion } from "../../../components/Accordion";
import { MonoLabel } from "../../../components/typography/MonoLabel";
import { ExperimentLayout } from "../../ExperimentLayout";
import { parseZipEntries, type RecordRow, type SortKey, useRecordSearch } from "../useRecordSearch";
import { Text } from "../../../components/typography/Text";
import { useRowVirtualizer } from "./useRowVirtualizer";

type ZipCodeJson = {
  columns: string[];
  entries: string[][];
};

const DATA_URL = "/data/japanpost/utf_ken_all.json";
const SEARCH_DEBOUNCE_MS = 300;
const TABLE_HEIGHT = 560;

const COLUMNS: { key: SortKey; label: string; width?: number }[] = [
  { key: "zipCode", label: "郵便番号", width: 120 },
  { key: "pref", label: "都道府県", width: 110 },
  { key: "city", label: "市区町村・町域" },
];

export function GoodPage() {
  const [records, setRecords] = useState<RecordRow[]>([]);

  useEffect(() => {
    fetch(DATA_URL)
      .then((res) => res.json())
      .then((data: ZipCodeJson) => {
        setRecords(parseZipEntries(data.entries));
      });
  }, []);

  const { setKeyword, pref, setPref, sortKey, sortDir, handleSort, prefectures, visibleRecords } =
    useRecordSearch(records);

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setKeyword(inputValue), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [inputValue, setKeyword]);

  // フィルタ+ソート結果のうち、実際にスクロール領域に見えている行だけをDOMに描画する
  const {
    containerRef,
    onScroll,
    startIndex,
    endIndex,
    topSpacerHeight,
    bottomSpacerHeight,
    rowHeight,
  } = useRowVirtualizer(visibleRecords.length, TABLE_HEIGHT);
  const windowRecords = visibleRecords.slice(startIndex, endIndex);

  return (
    <ExperimentLayout
      id="INP-01"
      metric="INP"
      title="入力イベントごとに3万件を同期フィルタ+全行再レンダリング"
      badHref="/experiments/inp-01/bad/"
      goodHref="/experiments/inp-01/good/"
    >
      <Accordion label="実験の説明">
        <Text tone="tertiary" className="text-sm mb-2">
          並べ替え機能を持つテーブルUIのgood実装パターンです。bad実装と同じデータ・同じUI・同じフィルタ/ソートロジックを使用しています。
        </Text>
        <Text tone="tertiary" className="text-sm">
          INPは「入力→処理→次のフレーム描画」までの時間です。総レコード数は3万件以上ありますが、実際に画面に見えているのは20行程度で、残りの行を毎回DOMに生成するのは無駄なコストです。
          そこで表示範囲だけをDOMに描画し、それ以外は上下のスペーサー（CSS）で高さだけ確保する「仮想化」を行うことで、レコード件数が増えてもDOM生成コスト（ひいてはINP）が頭打ちになるようにしています。
          <br />
          スクロールごとに再計算をしてDOMも再描画しています。
        </Text>
      </Accordion>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="キーワード検索（郵便番号・住所）"
          className="min-w-[240px] flex-1 rounded-[4px] border border-[oklch(0.85_0.005_90)] bg-white px-3 py-2 text-sm outline-none focus:border-[oklch(0.6_0.01_90)]"
        />

        <select
          value={pref}
          onChange={(e) => setPref(e.target.value)}
          className="rounded-[4px] border border-[oklch(0.85_0.005_90)] bg-white px-3 py-2 text-sm outline-none focus:border-[oklch(0.6_0.01_90)]"
        >
          <option value="">すべての都道府県</option>
          {prefectures.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <MonoLabel tone="subtle" className="ml-auto text-[12px] whitespace-nowrap">
          {records.length === 0
            ? "読み込み中…"
            : `${visibleRecords.length.toLocaleString()} / ${records.length.toLocaleString()} 件`}
        </MonoLabel>
      </div>

      <div
        ref={containerRef}
        onScroll={onScroll}
        className="overflow-auto rounded-[6px] border border-[oklch(0.88_0.005_90)]"
        style={{ maxHeight: TABLE_HEIGHT }}
      >
        <table className="w-full table-fixed border-collapse text-sm">
          <colgroup>
            {COLUMNS.map((col) => (
              <col key={col.key} style={col.width ? { width: col.width } : undefined} />
            ))}
          </colgroup>
          <thead className="sticky top-0 bg-[oklch(0.97_0.003_90)]">
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="cursor-pointer border-b border-[oklch(0.88_0.005_90)] px-3 py-2 text-left font-mono text-[12px] font-semibold tracking-[0.02em] select-none"
                >
                  {col.label}
                  {sortKey === col.key ? (sortDir === "asc" ? " ▲" : " ▼") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topSpacerHeight > 0 && (
              <tr style={{ height: topSpacerHeight }} aria-hidden="true">
                <td colSpan={COLUMNS.length} style={{ padding: 0, border: "none" }} />
              </tr>
            )}
            {windowRecords.map((r) => (
              <tr key={r.id} style={{ height: rowHeight, boxSizing: "border-box" }}>
                <td
                  className="truncate border-b border-[oklch(0.93_0.003_90)] px-3 font-mono text-[13px]"
                  style={{ paddingTop: 0, paddingBottom: 0, lineHeight: `${rowHeight}px` }}
                >
                  {r.zipCode}
                </td>
                <td
                  className="truncate border-b border-[oklch(0.93_0.003_90)] px-3 text-[13px]"
                  style={{ paddingTop: 0, paddingBottom: 0, lineHeight: `${rowHeight}px` }}
                >
                  {r.pref}
                </td>
                <td
                  className="truncate border-b border-[oklch(0.93_0.003_90)] px-3 text-[13px]"
                  style={{ paddingTop: 0, paddingBottom: 0, lineHeight: `${rowHeight}px` }}
                >
                  {r.city}
                </td>
              </tr>
            ))}
            {bottomSpacerHeight > 0 && (
              <tr style={{ height: bottomSpacerHeight }} aria-hidden="true">
                <td colSpan={COLUMNS.length} style={{ padding: 0, border: "none" }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <Text className="text-[12px]" tone="subtle">
          ※オリジナルの郵便データは12万件超ですが、パフォーマンスチェックが主目的のため4件に1件の間隔で間引いて約3万件に調整しています。
        </Text>
      </div>
    </ExperimentLayout>
  );
}
