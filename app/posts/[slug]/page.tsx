import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Comments } from "@/components/Comments";
import { PostNav } from "@/components/PostNav";
import { Toc } from "@/components/article/Toc";
import { loadPostBySlug, loadPosts } from "@/lib/posts";

export const generateStaticParams = async () => {
  const posts = await loadPosts();
  return posts.map((p) => ({ slug: p.slug }));
};

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = await loadPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} — 1119wj`, description: post.description };
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await loadPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  // posts는 최신순 정렬 — 이전 글(더 오래된 글)은 인덱스 +1, 다음 글(더 새 글)은 -1
  const index = posts.indexOf(post);
  const prevPost = posts[index + 1] ?? null;
  const nextPost = posts[index - 1] ?? null;

  const PostBody = (await import(`@/content/posts/${slug}.mdx`)).default;

  return (
    <>
      <ScrollReveal />
      <SiteHeader />
      <main data-color-scheme="paper">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <header className="pt-10 sm:pt-16 pb-8 sm:pb-10 max-w-3xl">
            <div className="flex items-center gap-3">
              <span
                className="badge"
                style={{
                  backgroundColor: `var(--color-${post.accent})`,
                  color: "var(--color-black)",
                }}
              >
                {post.category}
              </span>
              <p className="text-body-sm text-[var(--color-grey-dark)] font-medium">
                {post.date} · {post.readingTimeMin}분
              </p>
            </div>
            <h1
              className="mt-3 font-[family-name:var(--font-display)] font-black"
              style={{
                fontSize: "clamp(1.75rem, 1.25rem + 1.5vw, 2.75rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              {post.title}
            </h1>
            {post.description && (
              <p className="mt-3 text-body text-[var(--color-grey-dark)]">{post.description}</p>
            )}
          </header>

          <div className="relative lg:grid lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-12 pb-16">
            <article
              id="post-body"
              className="min-w-0 max-w-3xl"
              style={{ "--post-accent": `var(--color-${post.accent})` } as CSSProperties}
            >
              <PostBody />
            </article>
            <Toc containerSelector="#post-body" />
          </div>

          <Comments />

          <div className="pb-8">
            <PostNav prev={prevPost} next={nextPost} />
          </div>

          <div className="pb-16">
            <Link href="/" className="text-body-sm font-semibold underline underline-offset-4 hover:no-underline">
              ← All posts
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
