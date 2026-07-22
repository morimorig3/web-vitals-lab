import { ExperimentStubPage } from "../../ExperimentStubPage";

export function GoodPage() {
  return (
    <ExperimentStubPage
      id="INP-01"
      metric="INP"
      title="入力イベントごとに1万件を同期フィルタ+全行再レンダリング"
      badHref="/experiments/inp-01/bad/"
      goodHref="/experiments/inp-01/good/"
    />
  );
}
