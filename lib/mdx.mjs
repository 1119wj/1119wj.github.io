export const remarkPlugins = ["remark-gfm", "remark-frontmatter"];

export const rehypePlugins = [
  "rehype-slug",
  ["rehype-autolink-headings", { behavior: "wrap" }],
  ["rehype-mermaid", { strategy: "pre-mermaid" }],
];
