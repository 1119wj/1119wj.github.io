import { Children, type ReactNode } from "react";
import type { MDXComponents } from "mdx/types";

import { YouTubePlayer } from "@/components/YouTubePlayer";

/* 「— "인용구"」 패턴: 긴 대시 뒤에 붙는 인용은 본문 흐름의 곁가지라 회색으로 낮춘다 */
const DASH_QUOTE = /(—\s*(?:"[^"\n]*"|“[^”\n]*”))/g;

function withDashAsides(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child !== "string" || !child.includes("—")) return child;
    const parts = child.split(DASH_QUOTE);
    if (parts.length === 1) return child;
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <span key={i} className="dash-aside">
          {part}
        </span>
      ) : (
        part
      ),
    );
  });
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    YouTubePlayer,
    h1: (props) => (
      <h1
        className="mt-12 mb-4 font-[family-name:var(--font-display)] font-black"
        style={{ fontSize: "clamp(1.5rem, 1.125rem + 1vw, 2rem)", lineHeight: 1.2, letterSpacing: "-0.01em" }}
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="mt-12 mb-3 font-[family-name:var(--font-display)] font-bold scroll-mt-24"
        style={{ fontSize: "clamp(1.25rem, 1rem + 0.75vw, 1.625rem)", lineHeight: 1.25, letterSpacing: "-0.01em" }}
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="mt-8 mb-2 font-[family-name:var(--font-display)] font-semibold scroll-mt-24"
        style={{ fontSize: "clamp(1.0625rem, 0.875rem + 0.5vw, 1.25rem)", lineHeight: 1.3 }}
        {...props}
      />
    ),
    p: ({ children, ...props }) => (
      <p className="text-body my-4 leading-[1.75]" {...props}>
        {withDashAsides(children)}
      </p>
    ),
    ul: (props) => <ul className="my-4 list-disc pl-6 space-y-1" {...props} />,
    ol: (props) => <ol className="post-ol my-5" {...props} />,
    strong: (props) => <strong className="post-strong" {...props} />,
    hr: () => <hr className="post-hr" />,
    a: (props) => (
      <a
        className="font-medium underline underline-offset-[3px] hover:no-underline"
        {...props}
      />
    ),
    blockquote: (props) => <blockquote className="post-quote" {...props} />,
    pre: ({ className, ...props }) => (
      <div className="my-6 overflow-hidden rounded-md border border-[var(--color-border)]">
        <pre
          className={`overflow-x-auto p-4 text-sm leading-[1.7] ${className ?? ""}`}
          {...props}
        />
      </div>
    ),
    /* 인라인/블록 구분은 CSS(:not(pre) > code)가 한다 — shiki 블록의 code에는 클래스가 없어서 여기서는 판별 불가 */
    code: (props) => <code {...props} />,
    table: (props) => (
      <div className="my-6 overflow-x-auto">
        <table className="post-table w-full text-left border-collapse text-body-sm" {...props} />
      </div>
    ),
    th: (props) => (
      <th
        className="border-b-2 py-2 px-3 font-bold"
        style={{ borderColor: "var(--color-border)" }}
        {...props}
      />
    ),
    td: (props) => (
      <td className="border-b py-2 px-3" style={{ borderColor: "var(--color-border)" }} {...props} />
    ),
  };
}
