"use client";

import Image from "next/image";
import {
  Mic,
  MessageSquare,
  Eye,
  Radio,
  Activity,
  Zap,
  Brain,
  ScanSearch,
  Globe,
  ShieldCheck,
  BarChart2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Reveal } from "./Reveal";

const TABS = [
  {
    id: "acoustic",
    label: "ACOUSTIC",
    icon: Mic,
    title: "Acoustic Channel",
    subtitle: "Prosody — tone, pitch, volume, pace, tremor",
    bullets: [
      { Icon: Radio, text: "Voice tremor detection" },
      { Icon: Activity, text: "Real-time pitch analysis" },
      { Icon: Zap, text: "50–100ms latency per frame" },
    ],
  },
  {
    id: "semantic",
    label: "SEMANTIC",
    icon: MessageSquare,
    title: "Semantic Channel",
    subtitle: "Emotional meaning behind the words spoken",
    bullets: [
      { Icon: Brain, text: "LLM-powered linguistic analysis" },
      { Icon: ScanSearch, text: 'Detects masking ("I\'m fine" ≠ fine)' },
      { Icon: Globe, text: "Multilingual support" },
    ],
  },
  {
    id: "facial",
    label: "FACIAL",
    icon: Eye,
    title: "Facial Channel",
    subtitle: "Micro-expressions via camera frames",
    bullets: [
      { Icon: Eye, text: "AffectNet-trained VER model" },
      { Icon: ShieldCheck, text: "Frames discarded immediately after processing" },
      { Icon: BarChart2, text: "Confidence score per expression" },
    ],
  },
];

const SEMANTIC_WORDS = [
  { word: "I'm", tag: null },
  { word: "feeling", tag: null },
  { word: "overwhelmed,", tag: "DISTRESS" },
  { word: "but", tag: null },
  { word: "I'm", tag: null },
  { word: "fine.", tag: "MASKING" },
];

const BAR_COUNT = 48;

function AcousticEqualizer() {
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const animRef = useRef<number>(0);
  const heightsRef = useRef<number[]>(Array(BAR_COUNT).fill(0.15));
  const targetsRef = useRef<number[]>(Array(BAR_COUNT).fill(0.3));

  useEffect(() => {
    const animate = () => {
      if (typeof document !== "undefined" && document.hidden) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }
      heightsRef.current = heightsRef.current.map((h, i) => {
        const t = targetsRef.current[i]!;
        const next = h + (t - h) * 0.08;
        if (Math.abs(next - t) < 0.01) {
          const isCenter = i > 16 && i < 32;
          const isEdge = i < 8 || i > 40;
          const min = isEdge ? 0.05 : isCenter ? 0.3 : 0.1;
          const max = isEdge ? 0.4 : isCenter ? 1.0 : 0.65;
          targetsRef.current[i] = min + Math.random() * (max - min);
        }
        const el = barsRef.current[i];
        if (el) el.style.transform = `scaleY(${next})`;
        return next;
      });
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div
      className="relative flex h-full min-h-[200px] w-full flex-col justify-between overflow-hidden rounded-xl border"
      style={{
        background: "#0d1520",
        borderColor: "#1a2a3a",
        padding: "16px 20px 14px",
      }}
    >
      <div
        className="absolute left-5 top-4 font-mono text-[10px] tracking-[0.06em]"
        style={{ color: "rgba(0, 153, 255, 0.6)" }}
      >
        ACOUSTIC · LIVE INPUT
      </div>

      <div
        className="flex flex-1 items-end justify-center gap-[3px] pt-7 pb-1"
        style={{ padding: "28px 4px 4px" }}
      >
        {Array.from({ length: BAR_COUNT }, (_, i) => {
          const isCenter = i > 16 && i < 32;
          const isEdge = i < 8 || i > 40;
          const opacity = isCenter ? 0.95 : isEdge ? 0.45 : 0.65;
          return (
            <div
              key={i}
              ref={(el) => { barsRef.current[i] = el; }}
              className="shrink-0 rounded-t"
              style={{
                width: 6,
                height: "100%",
                borderRadius: "3px 3px 0 0",
                transformOrigin: "bottom",
                background: "linear-gradient(to top, #0066cc, #00aaff)",
                opacity,
                transform: `scaleY(${heightsRef.current[i] ?? 0.15})`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function SemanticVisual() {
  const [visibleCount, setVisibleCount] = useState(0);
  useEffect(() => {
    if (visibleCount >= SEMANTIC_WORDS.length) return;
    const t = setTimeout(() => setVisibleCount((c) => c + 1), 400);
    return () => clearTimeout(t);
  }, [visibleCount]);
  useEffect(() => {
    const t = setInterval(() => setVisibleCount(0), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="semantic-preview flex h-full w-full flex-wrap items-center justify-center gap-x-2 gap-y-8 self-center px-6 py-4 text-center">
      {SEMANTIC_WORDS.map((item, i) => (
        <span key={i} className="relative inline-flex flex-col items-center gap-1">
          <AnimatePresence>
            {i <= visibleCount && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={item.tag ? "text-[#0099ff] font-semibold break-words whitespace-normal" : "text-[var(--text-2)] break-words whitespace-normal"}
              >
                {item.word}
              </motion.span>
            )}
          </AnimatePresence>
          {item.tag && i <= visibleCount && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-6 text-[0.65rem] font-bold uppercase tracking-wider text-[#0099ff]"
            >
              {item.tag}
            </motion.span>
          )}
        </span>
      ))}
    </div>
  );
}

function FacialVisual() {
  return (
    <div className="image-wrapper relative h-full w-full">
      <Image
        src="/nearu-avatar-facial.png"
        alt="Facial channel — fearful expression (emotion detection preview)"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={false}
      />
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.8))",
        }}
      />
      {/* 1. Horizontal scan line */}
      <div className="scan-line" aria-hidden />
      {/* 2. Face detection corners */}
      <div className="detect-box" aria-hidden>
        <div className="corner tl" />
        <div className="corner tr" />
        <div className="corner bl" />
        <div className="corner br" />
      </div>
      {/* 3. Emotion label */}
      <div className="detect-label">fearful · 0.80</div>
    </div>
  );
}

export function EmotionChannels() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tab = TABS[activeIndex]!;

  return (
    <section
      className="relative overflow-hidden py-16 md:py-20"
      id="emotion-channels"
      style={{ background: "radial-gradient(ellipse 50% 60% at 50% 40%, rgba(0, 102, 204, 0.07) 0%, transparent 60%), #0e0e0e" }}
    >
      <div className="container relative z-10">
        <Reveal className="emotion-channels-header mb-10 text-center">
          <div className="label">EMOTION CHANNELS</div>
          <div className="divider-line" />
          <h2 className="text-[clamp(2rem,3.5vw,3.2rem)] font-extrabold tracking-[-0.03em] text-white">
            Three Signals. Zero Guesswork.
          </h2>
        </Reveal>

        <Reveal className="flex flex-col items-center">
          {/* Tabs — OUTSIDE and ABOVE the card (LiveKit style) */}
          <div className="channels-tabs w-full max-w-5xl">
            {TABS.map((t, i) => {
              const TabIcon = t.icon;
              const isActive = i === activeIndex;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={["channels-tab flex items-center gap-2 font-semibold uppercase tracking-wider", isActive ? "active" : ""].join(" ")}
                >
                  <TabIcon className="h-4 w-4 shrink-0" strokeWidth={2} />
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* One unified card — two columns; no top radius so tabs sit flush on card */}
          <div className="channels-card w-full max-w-5xl">
            <div className="channels-card-left flex flex-col justify-center">
              <h3 className="text-xl font-bold tracking-tight text-white md:text-2xl">{tab.title}</h3>
              <p className="mt-1.5 text-[0.9rem] text-[var(--text-2)]">{tab.subtitle}</p>
              <ul className="mt-6 space-y-3">
                {tab.bullets.map((b, i) => {
                  const BulletIcon = b.Icon;
                  return (
                    <li
                      key={i}
                      className="flex items-center gap-[10px] text-[0.85rem] text-[var(--text-2)]"
                    >
                      <span
                        style={{ color: "#0099ff", opacity: 0.8, flexShrink: 0 }}
                        aria-hidden
                      >
                        <BulletIcon size={15} />
                      </span>
                      {b.text}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="channels-card-right min-h-[352px]">
              <AnimatePresence mode="wait">
                {activeIndex === 0 && (
                  <motion.div
                    key="acoustic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-full w-full items-center justify-center"
                  >
                    <AcousticEqualizer />
                  </motion.div>
                )}
                {activeIndex === 1 && (
                  <motion.div
                    key="semantic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-full w-full items-center justify-center"
                  >
                    <SemanticVisual />
                  </motion.div>
                )}
                {activeIndex === 2 && (
                  <motion.div
                    key="facial"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 h-full w-full"
                  >
                    <FacialVisual />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
