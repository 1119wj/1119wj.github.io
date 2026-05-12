export const remarkPlugins = ["remark-gfm", "remark-frontmatter"];

export const rehypePlugins = [
  "rehype-slug",
  [
    "rehype-autolink-headings",
    {
      behavior: "append",
      properties: { className: ["heading-anchor"], ariaHidden: true, tabIndex: -1 },
      content: { type: "text", value: "#" },
    },
  ],
  ["rehype-mermaid", { strategy: "pre-mermaid" }],
];
