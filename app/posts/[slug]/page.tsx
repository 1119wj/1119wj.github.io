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

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const post = await loadPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} — 1119wj`, description: post.description };
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await loadPostBySlug(slug);
  if (!post) notFound();

  const PostBody = (await import(`@/content/posts/${slug}.mdx`)).default;

  return (
    <>
      <ScrollReveal />
      <SiteHeader />
      <main data-color-scheme="paper">
        <header
          data-reveal="scale"
          className="section-padding"
          style={{ paddingBlock: "clamp(48px, 8vw, 96px)" }}
        >
          <div className="container-sm">
            <span
              className="inline-block font-[family-name:var(--font-display)] font-black"
              style={{
                fontSize: "0.875rem",
                backgroundColor: "var(--color-spice)",
                color: "var(--color-black)",
                padding: "4px 12px 6px",
                borderRadius: "8px",
                transform: "rotate(2deg)",
                marginBottom: "1.5rem",
              }}
            >
              {post.date} · {post.readingTimeMin} min
            </span>
            <h1
              className="font-[family-name:var(--font-display)] font-black"
              style={{
                fontSize: "clamp(2.5rem, 1.5rem + 4vw, 5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
              }}
            >
              {post.title}
            </h1>
            {post.description && (
              <p className="text-body-lg mt-4 text-[var(--color-grey-dark)]">
                {post.description}
              </p>
            )}
          </div>
        </header>
        <article className="container-sm pb-24">
          <PostBody />
        </article>
        <div className="container-sm pb-16">
          <Link href="/" className="text-body font-semibold text-highlight">
            ← All posts
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
