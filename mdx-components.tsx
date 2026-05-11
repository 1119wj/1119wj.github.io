import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => <h1 className="text-h2 mt-12 mb-4" {...props} />,
    h2: (props) => <h2 className="text-h3 mt-10 mb-3" {...props} />,
    h3: (props) => <h3 className="text-body-xl mt-8 mb-2 font-bold" {...props} />,
    p: (props) => <p className="text-body-lg my-4 leading-relaxed" {...props} />,
    ul: (props) => <ul className="my-4 list-disc pl-6 space-y-1" {...props} />,
    ol: (props) => <ol className="my-4 list-decimal pl-6 space-y-1" {...props} />,
    a: (props) => <a className="text-highlight" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="border-l-4 pl-4 my-6 italic text-[var(--color-grey-dark)]"
        style={{ borderColor: "var(--color-spice)" }}
        {...props}
      />
    ),
    pre: (props) => (
      <div data-color-scheme="dark" className="my-6 rounded-2xl overflow-hidden">
        <pre className="p-4 overflow-x-auto" {...props} />
      </div>
    ),
    code: (props) => <code className="font-mono text-[0.9em]" {...props} />,
    table: (props) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full text-left border-collapse" {...props} />
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
