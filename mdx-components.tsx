import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => (
      <h1
        className="mt-12 mb-4 font-[family-name:var(--font-display)] font-black"
        style={{ fontSize: "clamp(1.5rem, 1.125rem + 1vw, 2rem)", lineHeight: 1.2, letterSpacing: "-0.01em" }}
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="mt-10 mb-3 font-[family-name:var(--font-display)] font-bold scroll-mt-24"
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
    p: (props) => <p className="text-body my-4 leading-relaxed" {...props} />,
    ul: (props) => <ul className="my-4 list-disc pl-6 space-y-1" {...props} />,
    ol: (props) => <ol className="my-4 list-decimal pl-6 space-y-1" {...props} />,
    a: (props) => <a className="underline underline-offset-2 hover:no-underline" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="border-l-2 pl-4 my-6 italic text-[var(--color-grey-dark)]"
        style={{ borderColor: "var(--color-grey)" }}
        {...props}
      />
    ),
    pre: (props) => (
      <div data-color-scheme="dark" className="my-6 rounded-xl overflow-hidden">
        <pre className="p-4 overflow-x-auto text-sm" {...props} />
      </div>
    ),
    code: (props) => <code className="font-mono text-[0.9em]" {...props} />,
    table: (props) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full text-left border-collapse text-body-sm" {...props} />
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
