"use client";

import { Sparkles, Layers, Database, Headphones, Activity, Code } from "lucide-react";
import { Reveal } from "./Reveal";

const STROKE = { strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const ADVANTAGES = [
  {
    title: "Emotion AI Engine",
    desc: "Emotion recognition across multiple channels that processes signals in real time.",
    Icon: Sparkles,
    iconColor: "#22D3A5",
    iconBg: "rgba(45,156,219,0.08)",
    iconBorder: "rgba(45,156,219,0.15)",
  },
  {
    title: "AI-Agnostic",
    desc: "Works with any LLM — GPT, Claude, Gemini, local. Persona and emotional layer survive model swaps.",
    Icon: Layers,
    iconColor: "var(--accent)",
    iconBg: "rgba(59,130,246,0.08)",
    iconBorder: "rgba(59,130,246,0.15)",
  },
  {
    title: "Persistent Memory",
    desc: "Identity and relationship history that carries across sessions. No more reset to zero.",
    Icon: Database,
    iconColor: "#A78BFA",
    iconBg: "rgba(167,139,250,0.08)",
    iconBorder: "rgba(167,139,250,0.15)",
  },
  {
    title: "Prosodic EQ",
    desc: "Voice prosody — pitch, pace, tremor — so the system hears how you feel, not just what you say.",
    Icon: Headphones,
    iconColor: "#FBBF24",
    iconBg: "rgba(251,191,36,0.08)",
    iconBorder: "rgba(251,191,36,0.15)",
  },
  {
    title: "3-Channel Fusion",
    desc: "Acoustic, semantic, and facial emotion fused with confidence weighting for higher accuracy.",
    Icon: Activity,
    iconColor: "#22C55E",
    iconBg: "rgba(34,211,165,0.08)",
    iconBorder: "rgba(34,211,165,0.15)",
  },
  {
    title: "Structured JSON Output",
    desc: "Clean API response with labels, confidence scores, trend, and evidence summary for every call.",
    Icon: Code,
    iconColor: "#8B5CF6",
    iconBg: "rgba(59,130,246,0.08)",
    iconBorder: "rgba(59,130,246,0.15)",
  },
] as const;

export function Competitive() {
  return (
    <section className="bg-[var(--bg)]" id="competitive">
      <div className="container">
        <Reveal className="text-center">
          <div className="flex flex-col items-center">
            <div className="label">Competitive Advantage</div>
            <div className="divider-line" />
          </div>
          <h2 className="text-[clamp(2rem,3.5vw,3.2rem)] font-extrabold tracking-[-0.03em] text-white">
            What Nobody Else Has
          </h2>
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ADVANTAGES.map((a) => (
              <div
                key={a.title}
                className="rounded-[var(--radius-lg)] border p-6 backdrop-blur-[8px] transition hover:bg-[rgba(255,255,255,0.055)] hover:border-[rgba(255,255,255,0.11)]"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] border"
                  style={{
                    color: a.iconColor,
                    background: a.iconBg,
                    borderColor: a.iconBorder,
                  }}
                >
                  <a.Icon className="h-5 w-5" fill="none" {...STROKE} />
                </div>
                <h4 className="text-[1.05rem] font-bold text-white">{a.title}</h4>
                <p className="mt-2 text-[0.875rem] leading-[1.6] text-[rgba(255,255,255,0.7)]">{a.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
