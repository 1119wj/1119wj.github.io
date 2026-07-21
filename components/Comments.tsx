"use client";

import { useEffect, useRef } from "react";
import { GISCUS } from "@/lib/site";

const enabled = Boolean(GISCUS.repoId && GISCUS.categoryId);

export const Comments = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !ref.current || ref.current.hasChildNodes()) return;
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", GISCUS.repo);
    script.setAttribute("data-repo-id", GISCUS.repoId);
    script.setAttribute("data-category", GISCUS.category);
    script.setAttribute("data-category-id", GISCUS.categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "ko");
    script.setAttribute("data-loading", "lazy");
    ref.current.appendChild(script);
  }, []);

  if (!enabled) return null;

  return (
    <section aria-label="댓글" className="max-w-3xl pb-8">
      <div ref={ref} />
    </section>
  );
};
