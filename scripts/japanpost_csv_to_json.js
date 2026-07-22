import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import { dirname, resolve } from "path";
import { parse } from "csv-parse/sync";
import { unzipSync } from "fflate";

const ZIP_URL =
  "https://www.post.japanpost.jp/service/search/zipcode/download/utf/zip/utf_ken_all.zip";
const OUTPUT_PATH = resolve(import.meta.dirname, "../public/data/japanpost/utf_ken_all.json");

const main = async () => {
  if (existsSync(OUTPUT_PATH) && !process.argv.includes("--force")) {
    console.log(`生成済みのためスキップ: ${OUTPUT_PATH} (再生成する場合は --force)`);
    return;
  }

  console.log(`ダウンロード中: ${ZIP_URL}`);
  const res = await fetch(ZIP_URL);
  if (!res.ok) {
    throw new Error(`ダウンロードに失敗しました: ${res.status} ${res.statusText}`);
  }
  const zip = unzipSync(new Uint8Array(await res.arrayBuffer()));

  const csvFileName = Object.keys(zip).find((name) => name.toLowerCase().endsWith(".csv"));
  if (!csvFileName) {
    throw new Error("zip内にCSVファイルが見つかりませんでした");
  }
  const csvText = new TextDecoder("utf-8").decode(zip[csvFileName]);

  const records = parse(csvText, {
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

  // Cloudflare Workers の静的アセットは1ファイル25MiBまで。
  // オブジェクト配列だとキー名が12万行分繰り返されて肥大化するため、
  // キーなしのタプル配列にする。列の並びは下記 columns の順で固定。
  const columns = ["zipCode", "pref", "city", "town", "prefKana", "cityKana", "townKana"];
  const entries = records.map(({ zipCode, pref, city, town, prefKana, cityKana, townKana }) => [
    zipCode,
    pref,
    city,
    town,
    prefKana,
    cityKana,
    townKana,
  ]);

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, JSON.stringify({ columns, entries }), "utf-8");

  console.log(`件数: ${entries.length}, JSONを保存しました: ${OUTPUT_PATH}`);
};
main();
