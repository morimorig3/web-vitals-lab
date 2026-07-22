# Web Vitals LAB

コアウェブバイタルの指標（LCP/CLS/INP）の数値向上のための実験サイトです。

「やってしまいがちな実装」をテーマにして良い実装／悪い実装を比較し、実際に数値を計測可能な状態で提供します。

# Public URL

https://web-vitals-lab.morimorig3.workers.dev/

# Developper

## 1. 郵便番号データの生成

`public/data/japanpost/utf_ken_all.json` は日本郵便が配布するZIPをダウンロードして生成する、git管理外のファイルです。`pnpm run dev` / `pnpm run build` の実行時に自動生成されます(既に生成済みならスキップ)。

手動で再生成・強制再生成する場合:

```
node scripts/japanpost_csv_to_json.js [--force]
```

# データ出典

本サイトの検索・フィルタ実験には、日本郵便株式会社が提供する郵便番号データ（KEN_ALL.CSV）を使用しています。  
（出典: https://www.post.japanpost.jp/zipcode/dl/readme.html）
