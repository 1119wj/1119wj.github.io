export const SiteFooter = () => (
  <footer data-color-scheme="lavender" className="section-padding">
    <div className="container-wide flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <p className="font-[family-name:var(--font-display)] text-2xl font-black">1119WJ</p>
      <p className="text-body-sm text-[var(--color-grey-dark)]">
        © {new Date().getFullYear()} 1119wj. Built with Next.js.
      </p>
      <div className="flex gap-4 text-sm">
        <a href="https://github.com/1119wj" target="_blank" rel="noreferrer" className="font-semibold">GitHub</a>
      </div>
    </div>
  </footer>
);
