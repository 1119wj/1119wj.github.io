import Link from "next/link";
import { notFound } from "next/navigation";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
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
  const post = await loadPostBySlug(slug);
  if (!post) notFound();

  const PostBody = (await import(`@/content/posts/${slug}.mdx`)).default;

  return (
    <>
      <ScrollReveal />
      <SiteHeader />
      <main data-color-scheme="paper">
        <div className="mx-auto max-w-4xl px-6 sm:px-8">
          <header className="pt-10 sm:pt-16 pb-8 sm:pb-10">
            <p className="text-body-sm text-[var(--color-grey-dark)] font-medium">
              {post.date} · {post.readingTimeMin} min read
            </p>
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

          <article className="pb-16">
            <PostBody />
          </article>

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
