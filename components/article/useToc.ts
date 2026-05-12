"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { extractTocItems, type TocItem } from "@/lib/toc";

const HEADER_OFFSET_PX = 96;
const PROGRAMMATIC_SCROLL_LOCK_MS = 500;

type Args = {
  containerRef: React.RefObject<HTMLElement | null>;
};

type Result = {
  items: TocItem[];
  activeId: string | null;
  scrollToSection: (id: string) => void;
};

export const useToc = ({ containerRef }: Args): Result => {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const lockRef = useRef(false);
  const lockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const collected = extractTocItems(container);
    setItems(collected);
    setActiveId(collected[0]?.id ?? null);
  }, [containerRef]);

  useEffect(() => {
    if (items.length === 0) return;

    const update = () => {
      if (lockRef.current) return;
      const elements = items
        .map((it) => document.getElementById(it.id))
        .filter((el): el is HTMLElement => el !== null);
      if (elements.length === 0) return;

      const next = elements.find((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top >= HEADER_OFFSET_PX;
      });

      if (!next) {
        setActiveId(elements[elements.length - 1].id);
        return;
      }

      const rect = next.getBoundingClientRect();
      const half = window.innerHeight / 2;
      if (rect.top < half) {
        setActiveId(next.id);
      } else {
        const idx = elements.indexOf(next);
        const prev = elements[idx - 1];
        setActiveId(prev ? prev.id : elements[0].id);
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [items]);

  const scrollToSection = useCallback((id: string) => {
    lockRef.current = true;
    setActiveId(id);
    if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
    lockTimeoutRef.current = setTimeout(() => {
      lockRef.current = false;
    }, PROGRAMMATIC_SCROLL_LOCK_MS);

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(
    () => () => {
      if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
    },
    [],
  );

  return { items, activeId, scrollToSection };
};
