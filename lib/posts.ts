import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type Accent = "spice" | "aqua" | "lavender" | "yellow" | "blue";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  accent: Accent;
  readingTimeMin: number;
};

const DEFAULT_DIR = path.join(process.cwd(), "content", "posts");

export const loadPosts = async (dir: string = DEFAULT_DIR): Promise<PostMeta[]> => {
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }

  const mdxFiles = entries.filter((f) => f.endsWith(".mdx"));

  const posts = await Promise.all(
    mdxFiles.map(async (file): Promise<PostMeta> => {
      const filepath = path.join(dir, file);
      const src = await fs.readFile(filepath, "utf8");
      const { data, content } = matter(src);
      const slug = file.replace(/\.mdx$/, "");
      const stats = readingTime(content);
      const rawDate = data.date;
      const date =
        rawDate instanceof Date
          ? rawDate.toISOString().slice(0, 10)
          : String(rawDate ?? "");
      const category = String(data.category ?? "").trim();
      if (!category) {
        throw new Error(
          `Post "${slug}" is missing required frontmatter: category. Every post must declare a category (e.g. 디버깅, 리팩토링, 회고).`,
        );
      }
      return {
        slug,
        title: String(data.title ?? slug),
        date,
        description: String(data.description ?? ""),
        category,
        accent: (data.accent ?? "spice") as Accent,
        readingTimeMin: Math.max(1, Math.round(stats.minutes)),
      };
    }),
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const loadPostBySlug = async (
  slug: string,
  dir: string = DEFAULT_DIR,
): Promise<PostMeta | null> => {
  const all = await loadPosts(dir);
  return all.find((p) => p.slug === slug) ?? null;
};
