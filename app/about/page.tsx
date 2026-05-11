import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = { title: "About — 1119wj" };

export default function AboutPage() {
  return (
    <>
      <ScrollReveal />
      <SiteHeader />
      <main data-color-scheme="lavender">
        <section className="section-padding">
          <div className="container-sm" data-reveal="up">
            <span
              className="inline-block font-[family-name:var(--font-display)] font-black"
              style={{
                fontSize: "0.875rem",
                backgroundColor: "var(--color-aqua)",
                color: "var(--color-black)",
                padding: "4px 12px 6px",
                borderRadius: "8px",
                transform: "rotate(-2deg)",
                marginBottom: "1.5rem",
              }}
            >
              ABOUT
            </span>
            <h1
              className="font-[family-name:var(--font-display)] font-black"
              style={{ fontSize: "clamp(3rem, 1.5rem + 5vw, 6rem)", lineHeight: 0.9, letterSpacing: "-0.04em" }}
            >
              1119WJ
            </h1>
            <div className="mt-8 space-y-4 text-body-lg">
              <p>안녕하세요. 웹 만드는 사람이에요.</p>
              <p>
                주로 Next.js · TypeScript · React 로 일해요. 가끔 만난 문제를 여기 정리합니다.
              </p>
              <p>
                연락: <a className="text-highlight" href="https://github.com/1119wj">github.com/1119wj</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
