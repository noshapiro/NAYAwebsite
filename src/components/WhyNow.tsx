"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

type TimelineItem = {
  era: string;
  name: string;
  traits: readonly string[];
  current?: true;
};

const TIMELINE: TimelineItem[] = [
  {
    era: "2000s – 2010s",
    name: "Intelligent Tool",
    traits: ["Rule-based responses", "Does what it's told", "No context, no memory"],
  },
  {
    era: "2020 – 2024",
    name: "LLM Agent",
    traits: ["Generates language", "Solves tasks", "Stateless, no identity"],
  },
  {
    era: "2024 – 2030",
    name: "Embodied Agent",
    traits: ["Physical presence", "Multimodal sensing", "Still cold, inconsistent"],
  },
  {
    era: "NOW →",
    name: "Relational Machine",
    traits: ["Stable identity", "Emotional responsiveness", "Trust, retention, bonding"],
    current: true,
  },
];

export function WhyNow() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg)]" id="why-now">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(15,30,65,0.35) 0%, transparent 65%)",
        }}
      />
      <div className="container relative z-10">
        {/* Label + accent line */}
        <Reveal className="flex flex-col items-center text-center">
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: "var(--accent)" }}
          >
            WHERE WE&apos;RE HEADED
          </div>
          <div className="divider-line" />
        </Reveal>

        {/* Title: From Tool to Relationship */}
        <Reveal delay={0.05} className="text-center">
          <h2 className="mt-6 font-[var(--font-syne)] text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.0] tracking-[-0.03em] text-[var(--text)]">
            From Tool to
            <br />
            Relationship
          </h2>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={0.1} className="text-center">
          <p className="mx-auto mt-5 max-w-[640px] text-[1.05rem] leading-[1.7] text-[var(--text-2)]">
            The evolution of AI isn&apos;t just technical — it&apos;s relational. Every generation has moved closer to something people can actually bond with.
          </p>
        </Reveal>

        {/* Timeline: hairline + dots + cards */}
        <Reveal delay={0.15} className="mt-12">
          <div className="relative">
            {/* Horizontal hairline */}
            <div
              className="absolute left-0 right-0 top-[10px] z-0 h-px"
              style={{ background: "var(--border)" }}
            />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {TIMELINE.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: 0.2 + i * 0.08,
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="relative flex flex-col items-center"
                >
                  {/* Timeline dot */}
                  <div className="relative z-10 flex h-5 w-full items-center justify-center">
                    {t.current ? (
                      <motion.div
                        className="relative flex h-3 w-3 items-center justify-center rounded-full bg-[var(--accent)]"
                        initial={{ boxShadow: "0 0 0 0 var(--accent-35)" }}
                        animate={{
                          boxShadow: [
                            "0 0 0 0 var(--accent-35)",
                            "0 0 0 10px transparent",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    ) : (
                      <div
                        className="h-3 w-3 shrink-0 rounded-full"
                        style={{ background: "var(--surface-2)" }}
                      />
                    )}
                  </div>
                  {/* Card */}
                  <div
                    className={[
                      "mt-4 w-full rounded-[12px] border p-5 text-left backdrop-blur-[8px]",
                      !t.current && "transition hover:bg-[rgba(255,255,255,0.055)]",
                    ].join(" ")}
                    style={
                      t.current
                        ? {
                            background: "rgba(45, 156, 219, 0.06)",
                            borderColor: "rgba(45, 156, 219, 0.25)",
                          }
                        : {
                            background: "rgba(255, 255, 255, 0.03)",
                            borderColor: "rgba(255, 255, 255, 0.07)",
                          }
                    }
                  >
                    <div
                      className="mb-2 text-[0.7rem] font-medium uppercase tracking-[0.08em]"
                      style={
                        t.current
                          ? { color: "var(--accent)", fontWeight: 700 }
                          : { color: "var(--text-3)" }
                      }
                    >
                      {t.era}
                    </div>
                    <div className="text-[1rem] font-bold text-[var(--text)]">
                      {t.name}
                    </div>
                    <ul className="mt-3 space-y-1.5 text-[0.75rem] text-[var(--text-2)]">
                      {t.traits.map((tr) => (
                        <li key={tr} className="flex items-start gap-2">
                          {t.current ? (
                            <>
                              <span
                                className="mt-0.5 shrink-0 text-[var(--green)]"
                                aria-hidden
                              >
                                ✓
                              </span>
                              <span>{tr}</span>
                            </>
                          ) : (
                            <>
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--text-3)]" aria-hidden />
                              <span>{tr}</span>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Insight quote block */}
        <Reveal delay={0.25} className="mt-12">
          <blockquote
            className="rounded-[12px] border px-6 py-6 text-center backdrop-blur-[8px]"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              borderColor: "rgba(255, 255, 255, 0.07)",
            }}
          >
            <p className="mx-auto max-w-[680px] text-[1.05rem] leading-[1.75] text-[var(--text-2)]">
              The shift from <strong className="font-semibold text-[var(--text-2)]">functional AI</strong> to{" "}
              <strong className="font-semibold text-[var(--text)]">relational AI</strong> is the defining product transition of this decade.{" "}
              <strong className="font-semibold text-[var(--text)]">Empathy</strong> is becoming the{" "}
              <strong className="font-semibold text-[var(--text)]">primary differentiator</strong> for user retention in AI.
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
