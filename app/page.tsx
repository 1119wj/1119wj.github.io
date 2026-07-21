import { PostsExplorer } from "@/components/PostsExplorer";
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
      <main data-color-scheme="paper" className="min-h-screen">
        <section className="section-padding">
          <div className="container-wide">
            <h1
              className="font-[family-name:var(--font-display)] font-black mb-8"
              style={{ fontSize: "clamp(1.75rem, 1rem + 1.5vw, 2.5rem)", letterSpacing: "-0.02em" }}
              data-reveal="up"
            >
              Posts{" "}
              <sup
                className="font-bold text-[var(--color-grey)]"
                style={{ fontSize: "0.45em", letterSpacing: "0" }}
              >
                {posts.length}
              </sup>
            </h1>
            {posts.length === 0 ? (
              <p className="text-body-lg text-[var(--color-grey-dark)]">
                아직 글이 없어요.
              </p>
            ) : (
              <PostsExplorer posts={posts} />
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
