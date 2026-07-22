import { globSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const root = import.meta.dirname;

// experiments/**/index.html を自動収集し、追加のたびにここを手で編集しなくて済むようにする
function htmlEntryInput(): Record<string, string> {
  const files = ["index.html", ...globSync("experiments/**/index.html", { cwd: root })];

  return Object.fromEntries(
    files.map((file) => {
      const name =
        file === "index.html" ? "main" : file.replace(/\/index\.html$/, "").replaceAll("/", "-");
      return [name, resolve(root, file)];
    }),
  );
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      input: htmlEntryInput(),
    },
  },
});
