import { createHighlighter } from "shiki";

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

export const getHighlighter = () => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark"],
      langs: ["ts", "tsx", "js", "jsx", "json", "css", "bash", "yaml", "md", "mdx", "go", "rust"],
    });
  }
  return highlighterPromise;
};

export const highlight = async (code: string, lang: string) => {
  const hl = await getHighlighter();
  return hl.codeToHtml(code, { lang, theme: "github-dark" });
};
