import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadPosts } from "./posts";

describe("loadPosts", () => {
  let dir: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "posts-"));
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it("returns empty array when no posts", async () => {
    const posts = await loadPosts(dir);
    expect(posts).toEqual([]);
  });

  it("parses frontmatter and returns metadata sorted by date desc", async () => {
    writeFileSync(
      join(dir, "2026-01-01-older.mdx"),
      "---\ntitle: Older\ndate: 2026-01-01\ndescription: a\ncategory: 회고\naccent: aqua\n---\nbody",
    );
    writeFileSync(
      join(dir, "2026-05-11-newer.mdx"),
      "---\ntitle: Newer\ndate: 2026-05-11\ndescription: b\ncategory: 디버깅\naccent: spice\n---\nthis is a longer body for reading time test",
    );

    const posts = await loadPosts(dir);

    expect(posts).toHaveLength(2);
    expect(posts[0].slug).toBe("2026-05-11-newer");
    expect(posts[0].title).toBe("Newer");
    expect(posts[0].category).toBe("디버깅");
    expect(posts[0].accent).toBe("spice");
    expect(posts[0].readingTimeMin).toBeGreaterThanOrEqual(1);
    expect(posts[1].slug).toBe("2026-01-01-older");
    expect(posts[1].category).toBe("회고");
  });

  it("throws when a post is missing category frontmatter", async () => {
    writeFileSync(
      join(dir, "2026-02-02-uncat.mdx"),
      "---\ntitle: Uncategorized\ndate: 2026-02-02\ndescription: x\naccent: spice\n---\nbody",
    );
    await expect(loadPosts(dir)).rejects.toThrow(/category/);
  });

  it("ignores non-mdx files", async () => {
    writeFileSync(join(dir, "readme.txt"), "ignore me");
    const posts = await loadPosts(dir);
    expect(posts).toEqual([]);
  });
});
