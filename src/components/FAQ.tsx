"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "./Reveal";

const FAQS = [
  {
    q: "How exactly do you detect emotion?",
    a: "We analyse three independent emotion channels from a single API call: acoustic emotion (voice prosody — tone, pitch, volume, pace, tremor), semantic emotion (emotional meaning behind the words), and facial emotion (micro-expressions via camera frames). Each channel produces a label and a confidence score, then fused into a single interpreted emotional state via confidence-weighted multimodal fusion.",
  },
  {
    q: "How many emotions does Nearu recognize?",
    a: "9 emotions are available right now in our MVP. We're expanding to up to 30 emotions and emotional states soon.",
  },
  {
    q: "What is the system latency?",
    a: "Total API response time is approximately 1.6 seconds for a 30-second audio clip. Image upload + facial analysis runs in 50–100ms per frame. The acoustic + semantic emotion pipeline takes 1.2–1.5s. Response serialization and fusion adds less than 10ms. For applications that need a conversational response, the same call can return both emotion analysis and an emotion-adapted text reply with no additional round trip.",
  },
  {
    q: "How do you handle privacy and compliance?",
    a: "Camera frames are processed for facial emotion extraction and immediately discarded — never stored, never used for training. Audio is forwarded to the speech pipeline for analysis, then discarded. Raw biometric data is transient only — it exists in memory during processing and is never persisted to disk. For regulated industries, the VER model can run inside the customer's own infrastructure (on-premises). Architecture is designed for GDPR, CCPA, and BIPA compatibility.",
  },
  {
    q: "How does Nearu integrate with existing AI agents?",
    a: "Nearu exposes a REST API (POST /api/v1/analyze-emotion) and a WebSocket endpoint for real-time streaming. You send audio clips and optional camera frames; you get structured JSON with emotion labels, confidence scores, trend analysis, and evidence summaries. The system is AI-agnostic — it works with any LLM (GPT, Claude, Gemini, local models) without rewiring. Integration typically takes less than a day for a competent developer.",
  },
  {
    q: "What makes Nearu defensible against big AI companies?",
    a: "Large AI companies could build this — the same way they could build Figma, Stripe, or Datadog. They don't, because it's a vertical product (not a horizontal platform feature), the emotional layer is the entire product, and enterprise customers want a specialist. The real defensibility is being 12–18 months ahead in a domain nobody else is focused on, with production-grade APIs, empirical fusion calibration rules that come from extensive real-world testing, and weekly iteration cycles that big company teams can't match.",
  },
  {
    q: "What does the persistent personality layer do?",
    a: "In session mode, each interaction is stored as an episode with transcript, emotion summary, and timestamp. Recent turns are injected into analysis to enable trend detection across a conversation. The interpreted_emotion response includes a trend field (improving, worsening, stable). Long-term behavioral memory is stored in a vector DB — Nearu remembers user preferences and relationship history. The Personality Matrix defines the avatar's specific traits so it stays in character across every session. Full GDPR-style deletion is supported at any time.",
  },
] as const;

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="bg-[var(--bg-2)]" id="faq">
      <div className="container">
        <Reveal className="text-center">
          <div className="flex flex-col items-center">
            <div className="label">FAQ</div>
            <div className="divider-line" />
          </div>
          <h2 className="text-[clamp(2rem,3.5vw,3.2rem)] font-extrabold tracking-[-0.03em]">Frequently Asked Questions</h2>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-[860px]">
          <div className="flex flex-col gap-3">
            {FAQS.map((f, i) => {
              const open = openIdx === i;
              return (
                <div key={f.q} className="overflow-hidden rounded-[16px] border border-white/10 bg-[var(--surface)]">
                  <button
                    type="button"
                    onClick={() => setOpenIdx((v) => (v === i ? null : i))}
                    className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left"
                  >
                    <span className="text-[0.95rem] font-semibold text-[var(--text)]">{f.q}</span>
                    <motion.span
                      className="text-[1.1rem] font-bold text-[var(--text-3)]"
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-5 pb-5 text-[0.9rem] leading-[1.75] text-[var(--text-2)]">{f.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

