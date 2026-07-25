import { useState } from "react";

export type RecordRow = {
  id: number;
  zipCode: string;
  pref: string;
  city: string;
};

export type SortKey = Exclude<keyof RecordRow, "id">;
type SortDir = "asc" | "desc";

// キーワード/都道府県/ソートの状態と、全件を同期でフィルタ+ソートするロジックをまとめたもの。
// メモ化や最適化は行わないため、記録件数に比例して呼び出しコストが増える。
export function useRecordSearch(records: RecordRow[]) {
  const [keyword, setKeyword] = useState("");
  const [pref, setPref] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("zipCode");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((dir) => (dir === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const prefectures = [...new Set(records.map((r) => r.pref))];
  const visibleRecords = records
    .filter((r) => (pref ? r.pref === pref : true))
    .filter((r) => (keyword ? `${r.zipCode}${r.pref}${r.city}`.includes(keyword) : true))
    .sort((a, b) => {
      const result = a[sortKey].localeCompare(b[sortKey], "ja");
      return sortDir === "asc" ? result : -result;
    });

  return {
    keyword,
    setKeyword,
    pref,
    setPref,
    sortKey,
    sortDir,
    handleSort,
    prefectures,
    visibleRecords,
  };
}
