"use client";

import { Check, Pause, Play } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const HERO_VIDEO = "/hero-nearu.mp4";
const HERO_VIDEO_WEBM = "/hero-nearu.webm";
const HERO_IMAGE = "/hero-nearu.png";

function HeroVideo({
  sources,
  poster,
  onError,
  onPlayingChange,
  videoRef,
}: {
  sources: { src: string; type: string }[];
  poster?: string;
  onError?: () => void;
  onPlayingChange?: (playing: boolean) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const updatePlaying = useCallback(
    (playing: boolean) => {
      setIsPlaying(playing);
      onPlayingChange?.(playing);
    },
    [onPlayingChange]
  );

  const handlePlay = useCallback(() => updatePlaying(true), [updatePlaying]);
  const handleEnded = useCallback(() => updatePlaying(false), [updatePlaying]);
  const handlePause = useCallback(() => updatePlaying(false), [updatePlaying]);

  return (
    <div className="relative h-full w-full">
      {!isPlaying && poster && (
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${poster})`, backgroundPosition: "top" }}
          aria-hidden
        />
      )}
      <video
        ref={videoRef}
        playsInline
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        onError={onError}
        className={`h-full w-full object-cover object-top ${!isPlaying ? "absolute inset-0 opacity-0 pointer-events-none" : ""}`}
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>
    </div>
  );
}

export function Hero() {
  const [avatarMode, setAvatarMode] = useState<"video" | "image" | "placeholder">("video");
  const [videoPlaying, setVideoPlaying] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const onVideoError = useCallback(() => setAvatarMode("image"), []);
  const onImageError = useCallback(() => setAvatarMode("placeholder"), []);

  const handleHeroPlayClick = useCallback(() => {
    heroVideoRef.current?.play().catch(onVideoError);
  }, [onVideoError]);

  const handleHeroPauseClick = useCallback(() => {
    heroVideoRef.current?.pause();
  }, []);

  return (
    <section className="relative bg-[var(--bg)] pb-20 pt-[100px]" style={{ overflow: "visible" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 60% 50%, rgba(20,40,80,0.55) 0%, rgba(10,20,50,0.25) 45%, transparent 70%)",
        }}
      />
      <div className="container relative z-10" style={{ overflow: "visible" }}>
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-[1.12fr_0.88fr] md:gap-[50px]" style={{ overflow: "visible" }}>
          <Reveal className="overflow-visible">
            <p className="text-[0.75rem] font-normal uppercase tracking-[0.06em] text-[var(--text-2)]">
              Emotional Intelligence Infrastructure for Embodied AI
            </p>

            <h1 className="mt-6 bg-[linear-gradient(135deg,#fff_40%,rgba(255,255,255,0.6))] bg-clip-text text-[clamp(2.2rem,3.8vw,4rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-transparent">
              The{" "}
              <em
                className="not-italic bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)",
                  backgroundSize: "120% 120%",
                  backgroundPosition: "center",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Emotional Layer
              </em>
              <br />
              AI Has Been Missing
            </h1>

            <p className="mt-5 max-w-[480px] text-[1.1rem] leading-[1.7] text-[var(--text-2)]">
              AI models provide intelligence. Nearu provides presence, empathy, and trust — the layer that turns AI agents into entities people actually bond with.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#nearuvibe"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_0_20px_var(--accent-40)] transition hover:translate-y-[-1px] hover:opacity-90 hover:shadow-[0_0_30px_var(--accent-glow)]"
              >
                Request a Demo
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-transparent px-7 py-3.5 text-[0.95rem] font-semibold text-[var(--text-2)] transition hover:border-white/25 hover:bg-white/5 hover:text-[var(--text)]"
              >
                Explore the API
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              {["AI-agnostic", "REST API + WebSocket", "~1.6s latency"].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-[0.78rem] text-[var(--text-3)]">
                  <Check className="h-3.5 w-3.5 shrink-0 text-[var(--green)]" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  {t}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="flex flex-col items-center overflow-visible">
            {/* Parent wrapper — no border/background, overflow visible */}
            <div className="relative w-[420px] shrink-0" style={{ overflow: "visible" }}>
              {/* Video/avatar container — single clean border, 24px radius */}
              <div
                className="relative w-full rounded-[24px]"
                style={{
                  aspectRatio: "4/5",
                  background: "#1a1a1a",
                  border: "1px solid rgba(255, 255, 255, 0.10)",
                  overflow: "visible",
                }}
              >
                {/* Inner clip for video + gradient — overflow hidden only here */}
                <div className="absolute inset-0 overflow-hidden rounded-[24px]">
              {/* 1. Avatar — fills container */}
              <div className="absolute inset-0">
                {avatarMode === "video" && (
                  <HeroVideo
                    sources={[
                      { src: HERO_VIDEO, type: "video/mp4" },
                      { src: HERO_VIDEO_WEBM, type: "video/webm" },
                    ]}
                    poster={HERO_IMAGE}
                    onError={onVideoError}
                    onPlayingChange={setVideoPlaying}
                    videoRef={heroVideoRef}
                  />
                )}
                {avatarMode === "image" && (
                  <Image
                    src={HERO_IMAGE}
                    alt="Nearu — emotional AI"
                    fill
                    className="object-cover object-top"
                    onError={onImageError}
                    unoptimized
                  />
                )}
                {avatarMode === "placeholder" && (
                  <div className="flex h-full w-full items-center justify-center bg-[var(--surface)] text-white">
                    <span className="text-6xl opacity-90">✦</span>
                  </div>
                )}
              </div>

              {/* 2. Bottom gradient overlay */}
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/80 to-transparent"
                aria-hidden
              />
                </div>

                {/* Player bar — pinned to bottom, same bottom radius as container */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-10 flex flex-col"
                  style={{ borderRadius: "0 0 24px 24px" }}
                >
                <div
                  className="flex items-center gap-[14px]"
                  style={{ padding: "20px 20px 22px" }}
                >
                  {avatarMode === "video" ? (
                    !videoPlaying ? (
                      <button
                        type="button"
                        onClick={handleHeroPlayClick}
                        className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full text-white transition hover:scale-[1.08] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
                        style={{
                          background: "#2D9CDB",
                          boxShadow: "0 0 20px rgba(45,156,219,0.4)",
                        }}
                        aria-label="Play video"
                      >
                        <Play className="h-4 w-4 shrink-0 fill-current pl-0.5" strokeWidth={2} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleHeroPauseClick}
                        className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full text-white transition hover:scale-[1.08] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
                        style={{
                          background: "#2D9CDB",
                          boxShadow: "0 0 20px rgba(45,156,219,0.4)",
                        }}
                        aria-label="Pause video"
                      >
                        <Pause className="h-4 w-4 shrink-0 fill-current" strokeWidth={2} />
                      </button>
                    )
                  ) : (
                    <div
                      className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full text-white/50"
                      style={{ background: "rgba(255,255,255,0.1)" }}
                    >
                      <Play className="h-4 w-4 shrink-0 fill-current pl-0.5" strokeWidth={2} />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="text-[0.82rem] font-extrabold text-[#F5F5F5]">Meet Nearu</div>
                    <div className="text-[0.62rem] text-[var(--text-2)] font-[var(--font-body)]">
                      2:14 · Nearu introduces herself
                    </div>
                  </div>
                </div>
                {/* 5. Progress bar — very bottom */}
                <div className="h-0.5 w-full bg-white/[0.07]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "0%",
                      background: "linear-gradient(90deg, #2D9CDB, #5B8DEF)",
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Caption below container */}
            <p
              className="mt-3.5 text-center text-[0.62rem] font-[var(--font-body)]"
              style={{ color: "rgba(245,245,245,0.22)" }}
            >
              Click play to hear Nearu speak
            </p>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
