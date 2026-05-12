import Link from "next/link";
import type { Accent, PostMeta } from "@/lib/posts";

const ACCENT_CSS_VAR: Record<Accent, string> = {
  spice: "var(--color-spice)",
  aqua: "var(--color-aqua)",
  lavender: "var(--color-lavender)",
  yellow: "var(--color-yellow)",
  blue: "var(--color-blue)",
};

type Props = {
  post: PostMeta;
  index: number;
};

type CSSVars = React.CSSProperties & Record<`--${string}`, string>;

export const PostCard = ({ post, index }: Props) => {
  const accentColor = ACCENT_CSS_VAR[post.accent];
  return (
    <Link
      href={`/posts/${post.slug}`}
      data-reveal="up"
      style={{ "--reveal-delay": `${index * 0.06}s` } as CSSVars}
      className="card-lift block p-5 sm:p-6"
    >
      <div className="flex items-center gap-3">
        <span
          className="badge"
          style={{ backgroundColor: accentColor, color: "var(--color-black)" }}
        >
          {post.category}
        </span>
        <p className="text-body-sm text-[var(--color-grey-dark)] font-medium">
          {post.date}
        </p>
      </div>
      <h3
        className="mt-2 font-[family-name:var(--font-display)] font-bold leading-snug"
        style={{ fontSize: "clamp(1.125rem, 0.875rem + 0.5vw, 1.375rem)", letterSpacing: "-0.01em" }}
      >
        {post.title}
      </h3>
      {post.description && (
        <p className="text-body-sm mt-2 text-[var(--color-grey-dark)] line-clamp-2">
          {post.description}
        </p>
      )}
    </Link>
  );
};
