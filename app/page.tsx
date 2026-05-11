import { Hero } from "@/components/Hero";
import { PostCard } from "@/components/PostCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { loadPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await loadPosts();

  return (
    <>
      <ScrollReveal />
      <SiteHeader />
      <main>
        <Hero />
        <section data-color-scheme="paper" className="section-padding">
          <div className="container-wide">
            <h2
              className="text-h3 font-[family-name:var(--font-display)] font-black mb-8"
              data-reveal="up"
            >
              Posts
            </h2>
            {posts.length === 0 ? (
              <p className="text-body-lg text-[var(--color-grey-dark)]">
                아직 글이 없어요.
              </p>
            ) : (
              <div className="flex flex-col gap-4 sm:gap-6">
                {posts.map((post, i) => (
                  <PostCard key={post.slug} post={post} index={i} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
