"use client";

import { Check, Pause, Play } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const HERO_TOTAL_SECONDS = 134; // 2:14
const HERO_PROGRESS_TICK_MS = 200;
const HERO_PROGRESS_TICK = 100 / (HERO_TOTAL_SECONDS * (1000 / HERO_PROGRESS_TICK_MS)); // 100/670 per 200ms

const HERO_VIDEO = "/hero-nearu.mp4";
const HERO_VIDEO_WEBM = "/hero-nearu.webm";
const HERO_IMAGE = "/hero-nearu.png";

function HeroVideo({
  sources,
  poster,
  onError,
  onPlayingChange,
  onEnded,
  videoRef,
}: {
  sources: { src: string; type: string }[];
  poster?: string;
  onError?: () => void;
  onPlayingChange?: (playing: boolean) => void;
  onEnded?: () => void;
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
  const handleEnded = useCallback(() => {
    updatePlaying(false);
    onEnded?.();
  }, [updatePlaying, onEnded]);
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

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function Hero() {
  const [avatarMode, setAvatarMode] = useState<"video" | "image" | "placeholder">("video");
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0–100, starts empty
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const onVideoError = useCallback(() => setAvatarMode("image"), []);
  const onImageError = useCallback(() => setAvatarMode("placeholder"), []);

  const handleHeroPlayClick = useCallback(() => {
    heroVideoRef.current?.play().catch(onVideoError);
  }, [onVideoError]);

  const handleHeroPauseClick = useCallback(() => {
    heroVideoRef.current?.pause();
  }, []);

  // Simulated progress when playing (200ms tick)
  useEffect(() => {
    if (!videoPlaying) return;
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        const next = p + HERO_PROGRESS_TICK;
        return next >= 100 ? 100 : next;
      });
    }, HERO_PROGRESS_TICK_MS);
    return () => clearInterval(id);
  }, [videoPlaying]);

  const handleProgressBarClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const bar = progressBarRef.current;
      if (!bar) return;
      const rect = bar.getBoundingClientRect();
      const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      setProgress(percent);
      const video = heroVideoRef.current;
      if (video?.duration && Number.isFinite(video.duration)) {
        video.currentTime = (percent / 100) * video.duration;
      }
    },
    []
  );

  return (
    <section className="relative pb-28 pt-[100px] md:pb-32" style={{ overflow: "visible", background: "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(0, 102, 204, 0.08) 0%, transparent 70%), #0e0e0e" }}>
      <div className="container relative z-10" style={{ overflow: "visible" }}>
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-[1.12fr_0.88fr] md:gap-[50px]" style={{ overflow: "visible" }}>
          <Reveal className="overflow-visible">
            <p className="text-[0.75rem] font-normal uppercase tracking-[0.06em] text-[var(--text-2)]">
              Emotional Intelligence Infrastructure for Embodied AI
            </p>

            <h1 className="mt-6 bg-[linear-gradient(135deg,#fff_40%,rgba(255,255,255,0.6))] bg-clip-text text-[clamp(2.2rem,3.8vw,4rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-transparent">
              The{" "}
              <em
                className="not-italic"
                style={{
                  color: "#0099ff",
                  background: "none",
                  WebkitBackgroundClip: "unset",
                  WebkitTextFillColor: "unset",
                  backgroundClip: "unset",
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
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_0_20px_var(--accent-40)] transition hover:translate-y-[-1px] hover:opacity-90 hover:shadow-[0_0_30px_var(--accent-glow)]"
              >
                Request Demo
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-transparent px-7 py-3.5 text-[0.95rem] font-semibold text-[var(--text-2)] transition hover:border-white/25 hover:bg-white/5 hover:text-[var(--text)]"
              >
                Explore the API
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              {["AI-agnostic", "REST API + WebSocket"].map((t) => (
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
              {/* Video/avatar container — thin blue outline; overflow hidden to avoid bottom line artifact */}
              <div
                className="relative w-full overflow-hidden rounded-[24px]"
                style={{
                  aspectRatio: "4/5",
                  background: "#1a1a1a",
                  border: "1px solid rgba(0, 153, 255, 0.35)",
                  boxShadow: "0 0 0 1px rgba(0, 153, 255, 0.1), 0 0 30px rgba(0, 153, 255, 0.08)",
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
                    onEnded={() => setProgress(100)}
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

                {/* Emotion chip — top-right of avatar */}
                <div
                  className="absolute top-[14px] right-[14px] z-10 flex items-center gap-1.5 rounded-[20px] px-2.5 py-1.5 text-[10px] font-semibold text-[#0099ff]"
                  style={{
                    background: "rgba(0,8,18,0.75)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(0,153,255,0.2)",
                  }}
                >
                  <span
                    className="hero-emotion-dot h-[5px] w-[5px] shrink-0 rounded-full bg-[#22c55e]"
                    style={{ boxShadow: "0 0 6px rgba(34,197,94,0.6)" }}
                    aria-hidden
                  />
                  Happy · 0.85
                </div>

                {/* Player bottom panel */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-10 flex border-t border-[#1a1a1a] bg-[#111111]"
                  style={{ borderRadius: "0 0 24px 24px" }}
                >
                  {/* Left — play button (72×74px), clip children, content centered */}
                  <div
                    className="group flex h-[74px] w-[72px] shrink-0 cursor-pointer items-center justify-center overflow-hidden border-r border-[#1a1a1a] transition-[background] duration-150 hover:bg-[rgba(0,153,255,0.05)]"
                    onClick={avatarMode === "video" ? (videoPlaying ? handleHeroPauseClick : handleHeroPlayClick) : undefined}
                    onKeyDown={(e) => {
                      if (e.key !== "Enter" && e.key !== " ") return;
                      e.preventDefault();
                      if (avatarMode === "video") videoPlaying ? handleHeroPauseClick() : handleHeroPlayClick();
                    }}
                    role="button"
                    tabIndex={avatarMode === "video" ? 0 : -1}
                    aria-label={videoPlaying ? "Pause" : "Play"}
                    style={{ position: "relative" }}
                  >
                    {/* Pulsing ring — absolute, centered via keyframes */}
                    <span
                      className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-[rgba(0,153,255,0.25)]"
                      style={{
                        width: 44,
                        height: 44,
                        transform: "translate(-50%, -50%)",
                        animation: "hero-ring-out 2s ease-out infinite",
                      }}
                      aria-hidden
                    />
                    {/* Play circle + icon — position relative, z-index 1 */}
                    <span
                      className="relative z-[1] flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-150 group-hover:bg-[rgba(0,153,255,0.2)] group-hover:border-[rgba(0,153,255,0.65)]"
                      style={{
                        width: 40,
                        height: 40,
                        background: "rgba(0,153,255,0.1)",
                        borderWidth: "1.5px",
                        borderColor: "rgba(0,153,255,0.35)",
                      }}
                    >
                      {avatarMode === "video" && videoPlaying ? (
                        <Pause className="h-[15px] w-[15px] shrink-0 text-[#0099ff]" strokeWidth={2} fill="currentColor" />
                      ) : (
                        <Play
                          className="h-[15px] w-[15px] shrink-0 text-[#0099ff]"
                          strokeWidth={2}
                          fill="currentColor"
                          style={{ marginLeft: 2 }}
                        />
                      )}
                    </span>
                  </div>

                  {/* Right — info + timeline, locked height 74px */}
                  <div
                    className="flex min-h-[74px] max-h-[74px] min-w-0 flex-1 flex-col justify-center gap-2 px-4 py-[13px]"
                    style={{ paddingLeft: 16, paddingRight: 16 }}
                  >
                    <div className="flex flex-col gap-[2px]">
                      <div className="text-[13px] font-semibold leading-[1.2] text-[#ffffff]">Meet Nearu</div>
                      <div className="m-0 text-[11px] leading-[1.2] text-[#555555]">2:14 · Nearu introduces herself</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        ref={progressBarRef}
                        className="h-[3px] flex-1 cursor-pointer overflow-hidden rounded-[2px] bg-[#2a2a2a]"
                        onClick={handleProgressBarClick}
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="h-full rounded-[2px] bg-[#0099ff]"
                          style={{ width: `${progress}%`, transition: "width 100ms linear" }}
                        />
                      </div>
                      <span
                        className="shrink-0 whitespace-nowrap text-[10px] text-[#555555]"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                      >
                        {formatTime(Math.round((progress / 100) * HERO_TOTAL_SECONDS))}
                      </span>
                    </div>
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
