export type TocItem = {
  id: string;
  title: string;
  level: 2 | 3;
};

export const extractTocItems = (container: HTMLElement): TocItem[] => {
  const headings = container.querySelectorAll<HTMLElement>("h2[id], h3[id]");
  const items: TocItem[] = [];
  for (const h of headings) {
    const title = Array.from(h.childNodes)
      .filter((node) => {
        if (node.nodeType !== Node.ELEMENT_NODE) return true;
        return !(node as HTMLElement).classList.contains("heading-anchor");
      })
      .map((node) => node.textContent ?? "")
      .join("")
      .trim();
    if (!title) continue;
    const level = h.tagName === "H2" ? 2 : 3;
    items.push({ id: h.id, title, level });
  }
  return items;
};
