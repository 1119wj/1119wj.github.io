export const Hero = () => (
  <section
    data-color-scheme="dark"
    data-reveal="up"
    className="relative flex flex-col items-start justify-center px-[var(--page-margin)]"
    style={{ minHeight: "60vh", paddingBlock: "var(--space-08)" }}
  >
    <div className="container-wide w-full flex flex-col items-start" style={{ gap: "clamp(8px, 2vw, 20px)" }}>
      <span
        className="font-[family-name:var(--font-display)] lowercase"
        style={{
          fontSize: "clamp(1.25rem, 0.5rem + 2vw, 2.5rem)",
          fontWeight: 900,
          backgroundColor: "var(--color-spice)",
          color: "var(--color-black)",
          borderRadius: "12px",
          padding: "4px 14px 8px",
          transform: "rotate(-3deg)",
          lineHeight: 1,
          letterSpacing: "-0.05em",
        }}
      >
        I WRITE
      </span>
      <h1
        className="font-[family-name:var(--font-display)] text-[var(--color-white)]"
        style={{
          fontSize: "clamp(3.5rem, 1rem + 12vw, 12rem)",
          lineHeight: 0.9,
          letterSpacing: "-0.05em",
          fontWeight: 900,
        }}
      >
        1119WJ
      </h1>
      <p
        className="text-[var(--color-grey)] mt-2 max-w-xl"
        style={{ fontSize: "clamp(1rem, 0.5rem + 1vw, 1.5rem)", fontWeight: 500, lineHeight: 1.4 }}
      >
        building things on the web. notes on what i learn.
      </p>
    </div>
  </section>
);
