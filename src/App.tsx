import { ExperimentCard } from "./components/ExperimentCard";
import { Heading } from "./components/typography/Heading";
import { MonoLabel } from "./components/typography/MonoLabel";
import { Text } from "./components/typography/Text";
import { EXPERIMENTS } from "./data/experiments";

const experimentCount = EXPERIMENTS.filter((experiment) => !experiment.inactive).length;

function App() {
  return (
    <div className="mx-auto max-w-[860px] px-8 pt-24 pb-16">
      <header className="mb-16">
        <MonoLabel tone="muted" uppercase className="mb-4 block text-[13px] tracking-[0.06em]">
          Web Performance Lab
        </MonoLabel>
        <Heading level={1} className="mb-5">
          Web Vitals LAB
        </Heading>
        <Text tone="secondary" leading={1.75} className="max-w-[620px] text-[17px]">
          Webパフォーマンス改善の実験場。
        </Text>
      </header>

      <main>
        <section aria-labelledby="experiments-heading">
          <div className="mb-8 flex items-baseline justify-between border-b border-[oklch(0.88_0.005_90)] pb-4">
            <Heading level={2} id="experiments-heading" tone="secondary" className="m-0">
              実験一覧
            </Heading>
            <MonoLabel tone="muted" className="text-[13px]">
              {experimentCount} experiments
            </MonoLabel>
          </div>

          <div className="flex flex-col gap-1">
            {EXPERIMENTS.map((experiment) => (
              <ExperimentCard key={experiment.id} experiment={experiment} />
            ))}
          </div>
        </section>
      </main>

      <section aria-labelledby="about-heading" className="mt-[88px]">
        <Heading
          level={2}
          id="about-heading"
          tone="secondary"
          className="mb-5 border-b border-[oklch(0.88_0.005_90)] pb-4"
        >
          このサイトについて
        </Heading>
        <Text tone="secondary" leading={1.8} className="mb-4 max-w-[640px] text-[15px]">
          ここではパフォーマンスが悪化するパターンについて、「作る」「計測する」「直す」「計測する」のループを繰り返すことで、Webパフォーマンス改善を体感することを目的としています。
        </Text>
        <Text tone="secondary" leading={1.8} className="max-w-[640px] text-[15px]">
          それぞれのパターンには3つのコアウェブバイタル指標と実際のbad実装とgood実装があります。bad実装には該当するコアウェブバイタルの数値が悪化するように、good実装には改善するように意図的に作られています。実際に計測して、どのような違いがあるかを体感してみてください。
        </Text>
      </section>

      <footer className="mt-16 border-t border-[oklch(0.88_0.005_90)] pt-6">
        <Text tone="muted" leading={1.8} className="text-[13px]">
          個人運営の技術実験サイトです。掲載内容は再現性を優先し、継続的に追試・更新します。
        </Text>
      </footer>
    </div>
  );
}

export default App;
