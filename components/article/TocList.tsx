"use client";

import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/toc";

type Props = {
  items: TocItem[];
  activeId: string | null;
  onScrollToSection: (id: string) => void;
};

export const TocList = ({ items, activeId, onScrollToSection }: Props) => (
  <nav aria-label="목차">
    <ul className="space-y-0.5">
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <li key={item.id} style={{ paddingLeft: item.level === 3 ? "1rem" : 0 }}>
            <button
              type="button"
              onClick={() => onScrollToSection(item.id)}
              className={cn(
                "block w-full rounded-md px-2 py-1.5 text-left text-[0.8125rem] transition-colors",
                isActive
                  ? "font-semibold text-[var(--color-black)] bg-black/5"
                  : "text-[var(--color-grey-dark)] hover:text-[var(--color-black)] hover:bg-black/5",
              )}
            >
              {item.title}
            </button>
          </li>
        );
      })}
    </ul>
  </nav>
);
