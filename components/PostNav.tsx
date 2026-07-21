import Link from "next/link";
import { ACCENT_CSS_VAR } from "@/components/PostCard";
import type { PostMeta } from "@/lib/posts";

type Props = {
  prev: PostMeta | null;
  next: PostMeta | null;
};

const NavCard = ({ post, label, align }: { post: PostMeta; label: string; align: "left" | "right" }) => (
  <Link
    href={`/posts/${post.slug}`}
    className="card-lift block p-5 min-w-0"
    style={{ textAlign: align }}
  >
    <p className="text-body-xs font-bold text-[var(--color-grey)]">{label}</p>
    <div
      className="mt-2 flex items-center gap-2 min-w-0"
      style={{ justifyContent: align === "right" ? "flex-end" : "flex-start" }}
    >
      <span
        className="badge shrink-0"
        style={{ backgroundColor: ACCENT_CSS_VAR[post.accent], color: "var(--color-black)" }}
      >
        {post.category}
      </span>
    </div>
    <p
      className="mt-2 font-[family-name:var(--font-display)] font-bold leading-snug text-body line-clamp-2"
      style={{ letterSpacing: "-0.01em" }}
    >
      {post.title}
    </p>
  </Link>
);

export const PostNav = ({ prev, next }: Props) => {
  if (!prev && !next) return null;
  return (
    <nav aria-label="이전/다음 글" className="grid gap-3 sm:gap-4 sm:grid-cols-2 max-w-3xl">
      {prev ? <NavCard post={prev} label="← 이전 글" align="left" /> : <div className="hidden sm:block" />}
      {next ? <NavCard post={next} label="다음 글 →" align="right" /> : null}
    </nav>
  );
};
