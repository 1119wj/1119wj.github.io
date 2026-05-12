import Link from "next/link";

export const SiteHeader = () => (
  <header
    data-color-scheme="paper"
    className="sticky top-0 z-30"
    style={{
      height: "var(--header-height)",
      backgroundColor: "color-mix(in srgb, var(--color-bg) 70%, transparent)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      color: "var(--color-black)",
    }}
  >
    <nav className="container-wide flex items-center justify-between h-full">
      <Link href="/" className="font-[family-name:var(--font-display)] font-black tracking-tight text-xl">
        1119WJ
      </Link>
      <div className="flex gap-6">
        <Link href="/" className="nav-link text-sm font-semibold">
          <span>Posts</span>
        </Link>
        <Link href="/about" className="nav-link text-sm font-semibold">
          <span>About</span>
        </Link>
      </div>
    </nav>
  </header>
);
