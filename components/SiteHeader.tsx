"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-color-scheme={scrolled ? "paper" : "dark"}
      className="sticky top-0 z-30"
      style={{
        height: "var(--header-height)",
        backgroundColor: scrolled
          ? "color-mix(in srgb, var(--color-bg) 70%, transparent)"
          : "var(--color-bg)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        color: "var(--color-fg)",
        transition:
          "background-color var(--duration-mid) ease, color var(--duration-mid) ease",
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
};
