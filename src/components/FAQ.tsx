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

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      className="shrink-0 transition-transform duration-200 ease-out"
      style={{
        color: "#555555",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
      }}
    >
      <polyline points="6 9 12 15 18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const handleClick = (i: number) => {
    setOpenIdx((v) => (v === i ? null : i));
  };

  return (
    <section className="bg-[var(--bg)]" id="faq">
      <div className="container">
        <Reveal className="text-center">
          <div
            className="mb-2.5 font-semibold uppercase tracking-[0.1em]"
            style={{ fontSize: "11px", color: "#a0a0a0" }}
          >
            FAQ
          </div>
          <div className="divider-line" />
          <h2
            className="font-bold tracking-tight"
            style={{ fontSize: "44px", fontWeight: 700 }}
          >
            Frequently Asked Questions
          </h2>
        </Reveal>

        <Reveal className="mx-auto mt-12" style={{ maxWidth: 720 }}>
          <div className="flex flex-col gap-2">
            {FAQS.map((f, i) => {
              const open = openIdx === i;
              return (
                <div
                  key={f.q}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleClick(i)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleClick(i)}
                  className="cursor-pointer overflow-hidden rounded-xl border transition-colors duration-[150ms]"
                  style={{
                    background: open ? "#181818" : "#111111",
                    borderColor: open ? "#2a2a2a" : "#1e1e1e",
                    marginBottom: 8,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#181818";
                    e.currentTarget.style.borderColor = "#2a2a2a";
                  }}
                  onMouseLeave={(e) => {
                    if (!open) {
                      e.currentTarget.style.background = "#111111";
                      e.currentTarget.style.borderColor = "#1e1e1e";
                    }
                  }}
                >
                  <div
                    className="flex w-full items-center justify-between bg-transparent px-5 py-4"
                    style={{ padding: "16px 20px" }}
                  >
                    <span
                      className="text-left font-semibold"
                      style={{ fontSize: 14, color: "#ffffff" }}
                    >
                      {f.q}
                    </span>
                    <ChevronDown open={open} />
                  </div>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-[#1a1a1a] pt-3.5"
                        style={{
                          paddingLeft: 20,
                          paddingRight: 20,
                          paddingBottom: 16,
                          paddingTop: 14,
                        }}
                      >
                        <p
                          className="leading-[1.65]"
                          style={{ fontSize: 14, color: "#a0a0a0" }}
                        >
                          {f.a}
                        </p>
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
