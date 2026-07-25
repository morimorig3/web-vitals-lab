import { useEffect, useState } from "react";
import { MonoLabel } from "../../../components/typography/MonoLabel";
import { ExperimentLayout } from "../../ExperimentLayout";
import { type RecordRow, type SortKey, useRecordSearch } from "../useRecordSearch";
import { Text } from "../../../components/typography/Text";
import inpImageUrl from "./inp.png?url";

type ZipCodeJson = {
  columns: string[];
  entries: string[][];
};

// このJSON自体が生成スクリプト（scripts/japanpost_csv_to_json.js）側で
// 元データ（12万件超）から4件に1件へ間引き済み（約3万件）
const DATA_URL = "/data/japanpost/utf_ken_all.json";
const SEARCH_DEBOUNCE_MS = 300;

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "zipCode", label: "郵便番号" },
  { key: "pref", label: "都道府県" },
  { key: "city", label: "市区町村" },
];

export function BadPage() {
  const [records, setRecords] = useState<RecordRow[]>([]);

  useEffect(() => {
    fetch(DATA_URL)
      .then((res) => res.json())
      .then((data: ZipCodeJson) => {
        const rows = data.entries.map(([zipCode, pref, city]) => ({ zipCode, pref, city }));
        setRecords(rows);
      });
  }, []);

  // 都道府県セレクトやソートの操作のたびに約3万件全体を同期でフィルタ+ソートし、全行を再レンダリングする
  const { setKeyword, pref, setPref, sortKey, sortDir, handleSort, prefectures, visibleRecords } =
    useRecordSearch(records);

  // テキストボックスの表示は即時反映しつつ、実際のフィルタ（重い処理）はタイピングが止まってから遅延実行する
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setKeyword(inputValue), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [inputValue, setKeyword]);

  return (
    <ExperimentLayout
      id="INP-01"
      metric="INP"
      title="入力イベントごとに3万件を同期フィルタ+全行再レンダリング"
      badHref="/experiments/inp-01/bad/"
      goodHref="/experiments/inp-01/good/"
    >
      <div className="mb-8">
        <Text tone="tertiary">3万件の郵便データをサンプルにINPを計測するbadパターン実装です。</Text>
        <Text tone="tertiary">
          INPはユーザーの操作により記録されるCore Web
          Vitalsの指標です。ページを開き、ソート処理を発生させた後に計測を行うことでINPの数値を計測することができます。
        </Text>
        <Text tone="tertiary">
          本ページでは、ユーザーのテーブル並び替え操作でテーブル3万行の再レンダリングが発生することにより、INPに悪影響を与えています。
        </Text>
        <img src={inpImageUrl} alt="INP" className="my-4 w-40 shadow rounded" />
      </div>
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

      <div className="max-h-[560px] overflow-auto rounded-[6px] border border-[oklch(0.88_0.005_90)]">
        <table className="w-full border-collapse text-sm">
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
            {visibleRecords.map((r) => (
              <tr key={`${r.zipCode}-${r.city}`} className="border-b border-[oklch(0.93_0.003_90)]">
                <td className="px-3 py-1.5 font-mono text-[13px]">{r.zipCode}</td>
                <td className="px-3 py-1.5 text-[13px]">{r.pref}</td>
                <td className="px-3 py-1.5 text-[13px]">{r.city}</td>
              </tr>
            ))}
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
