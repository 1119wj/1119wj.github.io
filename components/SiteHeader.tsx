import Link from "next/link";

export const SiteHeader = () => (
  <header className="sticky top-0 z-30 backdrop-blur-md" style={{ height: "var(--header-height)" }}>
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
