import { readFile, mkdir, writeFile } from "fs/promises";
import { dirname, resolve } from "path";
import { parse } from "csv-parse/sync";

const CSV_PATH = resolve(import.meta.dirname, "../data/japanpost/utf_ken_all.csv");
const OUTPUT_PATH = resolve(import.meta.dirname, "../public/data/japanpost/utf_ken_all.json");

const main = async () => {
  const data = await readFile(CSV_PATH, "utf-8");
  const records = parse(data, {
    columns: [
      "localGovernmentCode", // 全国地方公共団体コード
      "oldZipCode", // （旧）郵便番号（5桁）
      "zipCode", // 郵便番号（7桁）
      "prefKana", // 都道府県名
      "cityKana", // 市区町村名
      "townKana", // 町域名
      "pref", // 都道府県名
      "city", // 市区町村名
      "town", // 町域名
      "hasMultipleZipCode", // 一町域が二以上の郵便番号で表される場合の表示
      "hasChoumeNumbering", // 小字毎に番地が起番されている町域の表示
      "hasChoume", // 丁目を有する町域の場合の表示
      "hasMultipleTown", // 一つの郵便番号で二以上の町域を表す場合の表示
      "updateStatus", // 更新の表示
      "updateReason", // 変更理由
    ],
  });

  const entries = records.map(({ zipCode, pref, city, town, prefKana, cityKana, townKana }) => ({
    zipCode,
    pref,
    city,
    town,
    prefKana,
    cityKana,
    townKana,
  }));

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, JSON.stringify(entries), "utf-8");

  console.log(`件数: ${entries.length}, JSONを保存しました: ${OUTPUT_PATH}`);
};
main();
