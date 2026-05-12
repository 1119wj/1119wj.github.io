import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = { title: "About — 1119wj" };

export default function AboutPage() {
  return (
    <>
      <ScrollReveal />
      <SiteHeader />
      <main data-color-scheme="paper">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 py-16 sm:py-20" data-reveal="up">
          <p className="text-body-sm text-[var(--color-grey-dark)] font-medium uppercase tracking-wider">
            About
          </p>
          <h1
            className="mt-3 font-[family-name:var(--font-display)] font-black"
            style={{ fontSize: "clamp(2rem, 1.25rem + 2vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            1119WJ
          </h1>
          <div className="mt-8 space-y-4 text-body-lg">
            <p>안녕하세요. 웹 만드는 사람이에요.</p>
            <p>
              주로 Next.js · TypeScript · React 로 일해요. 가끔 만난 문제를 여기 정리합니다.
            </p>
            <p>
              연락: <a className="underline underline-offset-4 hover:no-underline" href="https://github.com/1119wj">github.com/1119wj</a>
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
