const { globSync } = require("node:fs");

const root = __dirname;

// experiments/**/index.html を自動収集し、追加のたびにここを手で編集しなくて済むようにする（vite.config.ts と同じ方針）
// ルート("/")だけ末尾がpathnameとして空文字になりファイル名が壊れるため、index.htmlを残したパスで揃える
function collectUrls() {
  const files = ["index.html", ...globSync("experiments/**/index.html", { cwd: root })];

  return files.map((file) => "/" + file);
}

module.exports = {
  ci: {
    collect: {
      staticDistDir: "./dist",
      url: collectUrls(),
      numberOfRuns: 1,
    },
    upload: {
      target: "filesystem",
      outputDir: "./.lighthouseci",
      // デフォルトは %%HOSTNAME%%-%%PATHNAME%%-%%DATETIME%%.report.%%EXTENSION%% で
      // 常にlocalhost表記＋実行ごとのタイムスタンプが付き数が膨れるため、パスだけのシンプルな名前にする。
      // %%DATETIME%%を外すと3回の計測がすべて同じファイル名になり、中央値(median)の1本だけが残る。
      reportFilenamePattern: "%%PATHNAME%%.report.%%EXTENSION%%",
    },
  },
};
