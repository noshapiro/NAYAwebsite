"use client";

import { useState } from "react";
import { Clock, Signal } from "lucide-react";

const LIVE_BULLETS = [
  "Emotion detected in ~1.6s — before the LLM responds",
  "Tone, Words, and Face shown independently in real time",
  "Conversation history and emotional context persist across sessions",
  "Push Space to speak — no buttons, no friction",
];

const VIDEO_BULLETS = [
  "Heatmap across Voice, Words, and Face — per second",
  "Full transcript with topic tags and emotion per utterance",
  "Playback mode syncs emotions to video timeline",
  "Export structured JSON with all labels and confidence scores",
];

function ScreenshotFrame({
  src,
  alt,
  fallbackLabel,
}: {
  src: string;
  alt: string;
  fallbackLabel: string;
}) {
  const [errored, setErrored] = useState(false);

  return (
    <div className="relative">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute -inset-5 -z-10 rounded-2xl"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,80,180,0.1), transparent 70%)",
        }}
      />
      {/* Outer frame */}
      <div
        className="overflow-hidden rounded-xl p-[3px]"
        style={{
          background: "#0a0a0a",
          border: "1px solid #2a2a2a",
        }}
      >
        {errored ? (
          <div
            className="flex min-h-[280px] items-center justify-center rounded-[10px] text-[#555]"
            style={{ background: "#111", border: "1px dashed #2a2a2a" }}
          >
            <span className="text-sm">{fallbackLabel}</span>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-[10px] pointer-events-none">
            <img
              src={src}
              alt={alt}
              className="block w-full h-auto object-cover object-top rounded-[10px]"
              onError={() => setErrored(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function PlatformShowcase() {
  const [tab, setTab] = useState<"live" | "timeline">("live");

  return (
    <section
      className="overflow-hidden py-24"
      style={{
        padding: "96px 0",
        background:
          "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,60,140,0.07), transparent 70%)",
      }}
      id="platform"
    >
      <div className="container">
        {/* Header — container 800px so H2 fits 2 lines; H2 44px via .platform-showcase-header h2 */}
        <header className="platform-showcase-header">
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: "#a0a0a0" }}
          >
            PLATFORM
          </div>
          <div className="divider-line" />
          <h2>
            See What Nearu Actually Looks Like
          </h2>
          <p
            className="mx-auto text-center text-[16px]"
            style={{
              color: "#a0a0a0",
              lineHeight: 1.65,
              maxWidth: 600,
              margin: "16px auto 48px",
            }}
          >
            A complete emotional intelligence layer — from real-time conversation to
            deep video analysis. Built for developers, designed for humans.
          </p>
        </header>

        {/* Tab switcher */}
        <div className="mb-8 flex justify-center">
          <div
            className="flex w-fit overflow-hidden rounded-[10px] border"
            style={{ borderColor: "#1e1e1e" }}
          >
            <button
              type="button"
              onClick={() => setTab("live")}
              className={`flex cursor-pointer items-center gap-[7px] border-r border-[#1e1e1e] px-5 py-2.5 text-[13px] font-medium transition-colors ${
                tab === "live"
                  ? "bg-[#181818] text-white"
                  : "bg-transparent text-[#555] hover:bg-[#111] hover:text-[#a0a0a0]"
              }`}
            >
              <Signal className="h-[13px] w-[13px]" strokeWidth={2} />
              Live Session
            </button>
            <button
              type="button"
              onClick={() => setTab("timeline")}
              className={`flex cursor-pointer items-center gap-[7px] px-5 py-2.5 text-[13px] font-medium transition-colors ${
                tab === "timeline"
                  ? "bg-[#181818] text-white"
                  : "bg-transparent text-[#555] hover:bg-[#111] hover:text-[#a0a0a0]"
              }`}
            >
              <Clock className="h-[13px] w-[13px]" strokeWidth={2} />
              Video Analysis
            </button>
          </div>
        </div>

        {/* Main layout: grid 1fr 1.8fr, gap 40px */}
        <div
          className="grid items-center gap-10 md:grid-cols-[1fr_1.8fr]"
          style={{ gap: 40 }}
        >
          {tab === "live" ? (
            <>
              <div>
                <div
                  className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.08em]"
                  style={{ color: "#0099ff" }}
                >
                  Real-time · Live Session
                </div>
                <h3 className="mb-3 text-[26px] font-bold leading-tight text-white" style={{ lineHeight: 1.2 }}>
                  Talk to Nearu. She reads the room.
                </h3>
                <p
                  className="mb-5 text-[14px] leading-relaxed"
                  style={{ color: "#a0a0a0", lineHeight: 1.65 }}
                >
                  As you speak, NearuVibe™ analyzes your voice, words, and expressions
                  simultaneously. Three independent channels. One interpreted emotional
                  state. Nearu responds with genuine empathy — not scripted replies.
                </p>
                <ul className="flex flex-col gap-2" style={{ gap: 8 }}>
                  {LIVE_BULLETS.map((text, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-[9px] text-[13px] leading-[1.5]"
                      style={{ color: "#a0a0a0" }}
                    >
                      <span
                        className="mt-[0.45em] h-[5px] w-[5px] shrink-0 rounded-full"
                        style={{ background: "#0099ff" }}
                        aria-hidden
                      />
                      <span className="min-w-0">{text}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://nearuai.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex cursor-pointer items-center gap-2 border-none py-2.5 text-sm font-medium text-white no-underline transition-[background] duration-150 hover:bg-[#0077cc]"
                  style={{ marginTop: 24, gap: 8, background: "#0099ff", padding: "10px 22px", borderRadius: 8 }}
                >
                  Talk to Nearu
                </a>
              </div>
              <ScreenshotFrame
                src="/screenshots/live-session.png"
                alt="Live Session — Nearu platform"
                fallbackLabel="Live Session screenshot"
              />
            </>
          ) : (
            <>
              <div>
                <div
                  className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.08em]"
                  style={{ color: "#0099ff" }}
                >
                  Offline · Video Analysis
                </div>
                <h3 className="mb-3 text-[26px] font-bold leading-tight text-white" style={{ lineHeight: 1.2 }}>
                  Upload a recording. Get the full picture.
                </h3>
                <p
                  className="mb-5 text-[14px] leading-relaxed"
                  style={{ color: "#a0a0a0", lineHeight: 1.65 }}
                >
                  Drop in any video — interview, sales call, therapy session, presentation
                  — and Nearu maps every emotional shift across all three channels over
                  time. See exactly where tension spiked, where confidence dropped, where
                  masking occurred.
                </p>
                <ul className="flex flex-col gap-2" style={{ gap: 8 }}>
                  {VIDEO_BULLETS.map((text, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-[9px] text-[13px] leading-[1.5]"
                      style={{ color: "#a0a0a0" }}
                    >
                      <span
                        className="mt-[0.45em] h-[5px] w-[5px] shrink-0 rounded-full"
                        style={{ background: "#0099ff" }}
                        aria-hidden
                      />
                      <span className="min-w-0">{text}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://nearuai.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex cursor-pointer items-center gap-2 border-none py-2.5 text-sm font-medium text-white no-underline transition-[background] duration-150 hover:bg-[#0077cc]"
                  style={{ marginTop: 24, gap: 8, background: "#0099ff", padding: "10px 22px", borderRadius: 8 }}
                >
                  Upload Video
                </a>
              </div>
              <ScreenshotFrame
                src="/screenshots/video-analysis.png"
                alt="Video Analysis — Nearu platform"
                fallbackLabel="Video Analysis screenshot"
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
