"use client";

import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg)]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(20,40,80,0.6) 0%, rgba(10,20,50,0.3) 40%, transparent 70%)",
        }}
        aria-hidden
      />
      <div className="container relative z-10 text-center">
        <Reveal className="flex flex-col items-center">
          <div className="label">Get Involved</div>
          <div className="divider-line" />
        </Reveal>
        <Reveal>
          <h2 className="text-[clamp(2.4rem,4vw,4rem)] font-extrabold tracking-[-0.03em]">
            AI shouldn&apos;t feel like a tool.
            <br />
            It should feel like{" "}
            <span
              className="bg-clip-text bg-[length:120%_120%] bg-center bg-no-repeat"
              style={{
                backgroundImage: "linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              someone
            </span>
            .
          </h2>
        </Reveal>
        <Reveal>
          <p className="mx-auto mt-5 max-w-[720px] text-[1.05rem] leading-[1.75] text-[var(--text-2)]">
            We&apos;re looking for design partners, robotics OEMs, and investors who believe the next frontier of AI is relational.
          </p>
        </Reveal>
        <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-8 py-4 text-[1rem] font-semibold text-white shadow-[0_0_22px_var(--accent-glow)] transition hover:translate-y-[-1px] hover:opacity-90"
          >
            Request a Demo
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-transparent px-8 py-4 text-[1rem] font-semibold text-[var(--text-2)] transition hover:border-white/25 hover:bg-white/5 hover:text-[var(--text)]"
          >
            Become a Design Partner
          </a>
        </Reveal>
      </div>
    </section>
  );
}

