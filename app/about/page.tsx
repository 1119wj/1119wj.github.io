import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = { title: "About — 1119wj" };

const TECH_STACK = [
  "TypeScript",
  "Next.js",
  "React",
  "Tailwind CSS",
  "TanStack Query",
  "Zustand",
];

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
            도원진
          </h1>
          <div className="mt-6 space-y-4 text-body-lg">
            <p>프론트엔드 개발자 도원진입니다.</p>
            <p>
              현재는 AI 레시피 플랫폼{" "}
              <a
                className="font-medium underline underline-offset-[3px] hover:no-underline"
                href="https://recipio.kr"
                target="_blank"
                rel="noreferrer"
              >
                레시피오
              </a>{" "}
              프로젝트를 운영 중입니다.
            </p>
          </div>

          <section className="mt-12">
            <h2 className="text-body-sm font-semibold uppercase tracking-wider text-[var(--color-grey-dark)]">
              Tech stack
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {TECH_STACK.map((t) => (
                <li
                  key={t}
                  className="rounded border px-2.5 py-1 text-body-sm border-[var(--color-border)]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-body-sm font-semibold uppercase tracking-wider text-[var(--color-grey-dark)]">
              Contact
            </h2>
            <ul className="mt-4 space-y-2 text-body">
              <li>
                GitHub —{" "}
                <a
                  className="font-medium underline underline-offset-[3px] hover:no-underline"
                  href="https://github.com/1119wj"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/1119wj
                </a>
              </li>
              <li>
                Email —{" "}
                <a
                  className="font-medium underline underline-offset-[3px] hover:no-underline"
                  href="mailto:1119wj@naver.com"
                >
                  1119wj@naver.com
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
