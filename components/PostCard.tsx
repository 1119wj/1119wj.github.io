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
      style={{ "--reveal-delay": `${index * 0.08}s` } as CSSVars}
      className="card-lift block p-6 sm:p-8 relative overflow-hidden"
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-2"
        style={{ backgroundColor: accentColor }}
        aria-hidden
      />
      <div className="pl-4 sm:pl-6">
        <p className="text-body-sm text-[var(--color-grey-dark)] font-medium">
          {post.date} · {post.readingTimeMin} min
        </p>
        <h3 className="text-h3 mt-3 font-[family-name:var(--font-display)] font-black leading-tight">
          {post.title}
        </h3>
        {post.description && (
          <p className="text-body mt-3 text-[var(--color-grey-dark)] line-clamp-2">
            {post.description}
          </p>
        )}
      </div>
    </Link>
  );
};
