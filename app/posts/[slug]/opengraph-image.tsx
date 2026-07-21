import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { loadPostBySlug, loadPosts, type Accent } from "@/lib/posts";

export const generateStaticParams = async () => {
  const posts = await loadPosts();
  return posts.map((p) => ({ slug: p.slug }));
};

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "포스트 미리보기";

/* satori는 CSS 변수를 모른다 — globals.css @theme의 hex를 그대로 복사 */
const ACCENT_HEX: Record<Accent, string> = {
  spice: "#f0b0d0",
  aqua: "#b4acfa",
  lavender: "#e8d5ff",
  yellow: "#ffdae9",
  blue: "#cce9ff",
  green: "#d4f5dc",
  orange: "#fff2cc",
};

const pretendardBold = await readFile(join(process.cwd(), "assets/og/Pretendard-Bold.otf"));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await loadPostBySlug(slug);
  if (!post) notFound();

  const accent = ACCENT_HEX[post.accent];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f5f3ff",
          color: "#08080f",
          fontFamily: "Pretendard",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              padding: "10px 28px",
              borderRadius: 999,
              background: accent,
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {post.category}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#5e5a72" }}>
            {post.date} · {post.readingTimeMin}분
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            maxWidth: 1000,
          }}
        >
          {post.title}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 700 }}>1119WJ</div>
          <div style={{ display: "flex", width: 220, height: 12, borderRadius: 999, background: accent }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Pretendard", data: pretendardBold, style: "normal", weight: 700 }],
    },
  );
}
