"use client";

import { Reveal } from "./Reveal";

export function SoulEngine() {
  const layers = [
    { num: "01", name: "Sensing", desc: "Vision · Audio · Touch · ToF proximity", tag: "Input", tagClass: "bg-[rgba(167,139,250,0.12)] text-[var(--purple)]", highlight: false },
    { num: "02", name: "NearuVibe™", desc: "Multi-Channel Emotion Recognition", tag: "Core IP", tagClass: "bg-[var(--accent-15)] text-[var(--accent)]", highlight: true },
    { num: "03", name: "Agentic Core", desc: "Memory · Identity · Personality Matrix", tag: "Memory", tagClass: "bg-[rgba(34,211,165,0.12)] text-[var(--green)]", highlight: false },
    { num: "04", name: "LLM (AI-Agnostic)", desc: "GPT · Claude · Gemini · Local / On-prem", tag: "Swappable", tagClass: "bg-[rgba(167,139,250,0.12)] text-[var(--purple)]", highlight: false },
    { num: "05", name: "Embodiment", desc: "Micro-expressions · Body language", tag: "Output", tagClass: "bg-[rgba(34,211,165,0.12)] text-[var(--green)]", highlight: false },
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[#111111]" id="solution">
      <div className="container relative z-10">
        <Reveal className="grid grid-cols-1 items-start gap-14 md:grid-cols-2 md:gap-20">
          <div>
            <div className="label">Our Solution</div>
            <div className="divider-line" />
            <h2 className="text-[clamp(2rem,3.5vw,3.2rem)] font-extrabold tracking-[-0.03em]">
              Meet the
              <br />
              Soul Engine™
            </h2>
            <p className="mt-4 text-[1rem] leading-[1.75] text-[var(--text-2)]">
              Nearu is not an AI model. It&apos;s the{" "}
              <span className="font-semibold text-[var(--accent)]">emotional intelligence infrastructure layer</span> that sits between humans and any intelligent system — giving AI agents the ability to recognize emotion, respond with empathy, develop unique personality over time, and build persistent, evolving relationships.
            </p>
            <p className="mt-4 text-[1rem] text-[var(--text-3)]">AI models provide intelligence. Nearu provides presence.</p>
          </div>

          <div className="flex flex-col gap-[3px]">
            {layers.map((l) => (
              <div
                key={l.num}
                className={[
                  "relative flex items-center gap-5 overflow-hidden rounded-[10px] border px-5 py-4 transition",
                  l.highlight
                    ? "border-[var(--accent-30)] bg-[linear-gradient(90deg,var(--accent-08),transparent)]"
                    : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent-30)] hover:bg-[var(--surface-2)]",
                ].join(" ")}
              >
                <div
                  className={[
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[0.72rem] font-extrabold",
                    l.highlight ? "border-[var(--accent-30)] text-[var(--accent)]" : "border-[var(--border)] text-[var(--text-3)]",
                  ].join(" ")}
                >
                  {l.num}
                </div>
                <div className="flex-1">
                  <div className="text-[0.82rem] font-extrabold tracking-[-0.01em] text-[var(--text)]">{l.name}</div>
                  <div className="text-[0.75rem] text-[var(--text-3)]">{l.desc}</div>
                </div>
                <span className={`rounded px-2 py-[3px] text-[0.65rem] font-extrabold uppercase tracking-[0.06em] ${l.tagClass}`}>
                  {l.tag}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

