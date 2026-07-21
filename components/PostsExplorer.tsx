"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ACCENT_CSS_VAR, PostCard } from "@/components/PostCard";
import type { Accent, PostMeta } from "@/lib/posts";

type Props = {
  posts: PostMeta[];
};

type CategoryChip = {
  category: string;
  accent: Accent;
  count: number;
};

export const PostsExplorer = ({ posts }: Props) => {
  const [selected, setSelected] = useState<string | null>(null);

  // 정적 export에서 서버는 쿼리스트링을 모른다 — 마운트 후 ?tag=를 읽어 필터를 복원
  useEffect(() => {
    const tag = new URLSearchParams(window.location.search).get("tag");
    if (tag && posts.some((p) => p.category === tag)) setSelected(tag);
  }, [posts]);

  const select = (category: string | null) => {
    setSelected(category);
    const url = new URL(window.location.href);
    if (category) url.searchParams.set("tag", category);
    else url.searchParams.delete("tag");
    window.history.replaceState(null, "", url);
  };

  const chips = useMemo(() => {
    const map = new Map<string, CategoryChip>();
    for (const post of posts) {
      const chip = map.get(post.category);
      if (chip) {
        chip.count += 1;
      } else {
        map.set(post.category, { category: post.category, accent: post.accent, count: 1 });
      }
    }
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [posts]);

  const visibleCount = selected
    ? (chips.find((c) => c.category === selected)?.count ?? 0)
    : posts.length;

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center gap-2" data-reveal="up">
        <button
          type="button"
          className="filter-chip"
          aria-pressed={selected === null}
          onClick={() => select(null)}
        >
          전체
          <span className="filter-chip-count">{posts.length}</span>
        </button>
        {chips.map((chip) => {
          const active = selected === chip.category;
          return (
            <button
              key={chip.category}
              type="button"
              className="filter-chip"
              aria-pressed={active}
              style={{ "--chip-accent": ACCENT_CSS_VAR[chip.accent] } as CSSProperties}
              onClick={() => select(active ? null : chip.category)}
            >
              <span className="filter-chip-dot" aria-hidden />
              {chip.category}
              <span className="filter-chip-count">{chip.count}</span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {selected ? `${selected} 글 ${visibleCount}개` : `전체 글 ${visibleCount}개`}
      </p>

      <div className="flex flex-col gap-3 sm:gap-4">
        {posts.map((post, i) => (
          <div
            key={post.slug}
            className={selected !== null && post.category !== selected ? "hidden" : undefined}
          >
            <PostCard post={post} index={i} />
          </div>
        ))}
      </div>
    </>
  );
};
