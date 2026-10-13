"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const MermaidClient = () => {
  const pathname = usePathname();

  useEffect(() => {
    const blocks = document.querySelectorAll<HTMLElement>("pre.mermaid");
    if (blocks.length === 0) return;

    let cancelled = false;

    (async () => {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "neutral",
        fontFamily: "var(--font-body)",
      });
      if (cancelled) return;
      try {
        await mermaid.run({ nodes: Array.from(blocks) });
      } catch (e) {
        console.error("[mermaid] render failed", e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
};
