import { useCallback, useEffect, useRef, useState } from "react";

const ROW_HEIGHT = 32;
const OVERSCAN = 8;

// テーブルの行数が何万件あっても、実際にDOMへ生成するのは
// 「スクロール領域に見えている範囲＋前後の余白（オーバースキャン）」分の行だけにする。
// 上下にスペーサー用の行（高さだけ持つ空行）を置くことで、スクロールバーの見た目・挙動は
// 全件表示しているときと変わらないまま、DOM生成コストを表示件数に依存させない。
export function useRowVirtualizer(itemCount: number, containerHeight: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const onScroll = useCallback(() => {
    if (containerRef.current) setScrollTop(containerRef.current.scrollTop);
  }, []);

  // フィルタ結果が変わって件数が変化したら、古いスクロール位置を引きずらないよう先頭に戻す
  useEffect(() => {
    setScrollTop(0);
    if (containerRef.current) containerRef.current.scrollTop = 0;
  }, [itemCount]);

  const visibleCount = Math.ceil(containerHeight / ROW_HEIGHT);
  const centerIndex = Math.floor(scrollTop / ROW_HEIGHT);
  const startIndex = Math.min(itemCount, Math.max(0, centerIndex - OVERSCAN));
  const endIndex = Math.min(itemCount, centerIndex + visibleCount + OVERSCAN);

  const topSpacerHeight = startIndex * ROW_HEIGHT;
  const bottomSpacerHeight = (itemCount - endIndex) * ROW_HEIGHT;

  return {
    containerRef,
    onScroll,
    startIndex,
    endIndex,
    topSpacerHeight,
    bottomSpacerHeight,
    rowHeight: ROW_HEIGHT,
  };
}
