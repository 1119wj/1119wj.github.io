"use client";

import { useEffect, useRef, useState } from "react";
import { useToc } from "./useToc";
import { TocList } from "./TocList";

type Props = {
  containerSelector: string;
};

export const Toc = ({ containerSelector }: Props) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    containerRef.current = document.querySelector<HTMLElement>(containerSelector);
    setReady(true);
  }, [containerSelector]);

  const { items, activeId, scrollToSection } = useToc({ containerRef });

  if (!ready || items.length === 0) return null;

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24">
        <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-grey)]">
          On this page
        </p>
        <TocList items={items} activeId={activeId} onScrollToSection={scrollToSection} />
      </div>
    </aside>
  );
};
