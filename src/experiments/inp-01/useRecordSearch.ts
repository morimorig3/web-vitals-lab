import { useState } from "react";

export type RecordRow = {
  id: number;
  zipCode: string;
  pref: string;
  city: string;
};

export type SortKey = Exclude<keyof RecordRow, "id">;
type SortDir = "asc" | "desc";

// 町域が指定されていない場合に入る決まり文句。この場合は市区町村名に混ぜない。
const NO_DETAIL_TOWN = "以下に掲載がない場合";

// 郵便番号データのentries([zipCode, pref, city, town, ...])から表示用の行を作る。
// 町域(town)は独立した列にはせず、市区町村名に混ぜて表示する
// （町域を出さないと同じ市区町村・別郵便番号の行が見分けづらくなるため）。
export function parseZipEntries(entries: string[][]): RecordRow[] {
  return entries.map(([zipCode, pref, city, town], id) => ({
    id,
    zipCode,
    pref,
    city: town && town !== NO_DETAIL_TOWN ? `${city}${town}` : city,
  }));
}

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
