export const remarkPlugins = ["remark-gfm"];

export const rehypePlugins = [
  "rehype-slug",
  ["rehype-autolink-headings", { behavior: "wrap" }],
  ["rehype-mermaid", { strategy: "pre-mermaid" }],
];
