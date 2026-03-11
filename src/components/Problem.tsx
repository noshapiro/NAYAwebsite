"use client";

import { Bot, HeartCrack, Layers } from "lucide-react";
import { Reveal } from "./Reveal";

const STROKE = { strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const MUTED_CLASS = "h-5 w-5 shrink-0 text-[var(--text-2)]";

const cards = [
  {
    Icon: Bot,
    title: "Agents are brilliant but cold",
    body: "Today's AI assistants can answer any question — but they can't read the room. They miss tone, emotion, and human context entirely.",
  },
  {
    Icon: HeartCrack,
    title: "No emotional continuity",
    body: "Every session resets to zero. No memory of who you are, how you felt, or what matters to you. Engagement drops. Trust never forms.",
  },
  {
    Icon: Layers,
    title: "The missing layer",
    body: "LLMs provide raw intelligence. Hardware provides presence. But the emotional intelligence layer — empathy, personality, expression — doesn't exist yet.",
  },
] as const;

export function Problem() {
  return (
    <section className="relative overflow-hidden bg-[#111111]" id="problem">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(15,30,65,0.35) 0%, transparent 65%)",
        }}
      />
      <div className="container relative z-10">
        <Reveal className="text-center">
          <div className="flex flex-col items-center">
            <div className="label">The Problem</div>
            <div className="divider-line" />
          </div>
          <h2 className="text-[clamp(2rem,3.5vw,3.2rem)] font-extrabold tracking-[-0.03em]">
            Intelligence Without a Soul
            <br />
            Is Just Data Processing
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[1.05rem] leading-[1.7] text-[var(--text-2)]">
            The robotics and AI industry is building brilliance. Nobody is building the emotional layer that makes it human.
          </p>
        </Reveal>

        <Reveal className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {cards.map((c, i) => (
              <div
                key={c.title}
                className={`px-9 py-10 ${i < cards.length - 1 ? "md:border-r md:border-white/10" : ""}`}
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[10px] border border-white/15 bg-[var(--surface-2)]">
                  <c.Icon className={MUTED_CLASS} fill="none" {...STROKE} />
                </div>
                <h3 className="text-[1.1rem] font-semibold tracking-[-0.02em]">{c.title}</h3>
                <p className="mt-3 text-[0.88rem] leading-[1.65] text-[var(--text-2)]">{c.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
