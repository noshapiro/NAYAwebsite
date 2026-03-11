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

const WAVE_LAYERS = [
  { y: 0.35, amp: 0.12, freq: 0.018, speed: 0.7, color: [56, 189, 248], alpha: 0.9 },
  { y: 0.52, amp: 0.15, freq: 0.026, speed: 1.0, color: [56, 189, 248], alpha: 0.55 },
  { y: 0.68, amp: 0.1, freq: 0.038, speed: 1.35, color: [99, 165, 247], alpha: 0.35 },
  { y: 0.8, amp: 0.08, freq: 0.052, speed: 1.7, color: [167, 139, 250], alpha: 0.2 },
];

function AcousticVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !container || !ctx) return;

    const canvasEl: HTMLCanvasElement = canvas;
    const containerEl: HTMLDivElement = container;
    const context: CanvasRenderingContext2D = ctx;

    let t = 0;
    let raf: number;
    let w = 0;
    let h = 0;

    function resize() {
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio ?? 1 : 1;
      const rect = containerEl.getBoundingClientRect();
      w = Math.floor(rect.width);
      h = Math.floor(rect.height);
      canvasEl.width = w * dpr;
      canvasEl.height = h * dpr;
      canvasEl.style.width = `${w}px`;
      canvasEl.style.height = `${h}px`;
    }

    function draw() {
      if (w <= 0 || h <= 0) {
        raf = requestAnimationFrame(draw);
        return;
      }
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio ?? 1 : 1;
      context.save();
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, w, h);
      context.restore();

      context.save();
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      WAVE_LAYERS.forEach((l) => {
        const baseY = h * l.y;
        const amp = h * l.amp;

        context.beginPath();
        context.moveTo(0, baseY);
        for (let x = 0; x <= w; x += 2) {
          const y =
            baseY +
            Math.sin(x * l.freq + t * l.speed) * amp +
            Math.sin(x * l.freq * 2.1 + t * l.speed * 0.6) * amp * 0.35;
          context.lineTo(x, y);
        }
        context.lineTo(w, h);
        context.lineTo(0, h);
        context.closePath();
        const grad = context.createLinearGradient(0, baseY - amp, 0, h);
        grad.addColorStop(0, `rgba(${l.color[0]},${l.color[1]},${l.color[2]},${l.alpha * 0.18})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        context.fillStyle = grad;
        context.fill();

        context.beginPath();
        for (let x = 0; x <= w; x += 2) {
          const y =
            baseY +
            Math.sin(x * l.freq + t * l.speed) * amp +
            Math.sin(x * l.freq * 2.1 + t * l.speed * 0.6) * amp * 0.35;
          x === 0 ? context.moveTo(x, y) : context.lineTo(x, y);
        }
        context.strokeStyle = `rgba(${l.color[0]},${l.color[1]},${l.color[2]},${l.alpha})`;
        context.lineWidth = 2;
        context.lineJoin = "round";
        context.stroke();
      });

      context.restore();
      t += 0.012;
      raf = requestAnimationFrame(draw);
    }

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(containerEl);

    draw();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full min-h-[200px]">
      <canvas ref={canvasRef} className="block h-full w-full" />
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
                className={item.tag ? "text-[#38bdf8] font-semibold break-words whitespace-normal" : "text-[var(--text-2)] break-words whitespace-normal"}
              >
                {item.word}
              </motion.span>
            )}
          </AnimatePresence>
          {item.tag && i <= visibleCount && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-6 text-[0.65rem] font-bold uppercase tracking-wider text-[#38bdf8]"
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
      className="relative overflow-hidden bg-transparent py-16 md:py-20"
      id="emotion-channels"
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

          {/* One unified card — two columns */}
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
                        style={{ color: "#38bdf8", opacity: 0.8, flexShrink: 0 }}
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
                    <AcousticVisual />
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
