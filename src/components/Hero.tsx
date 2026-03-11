"use client";

import { Check, Pause, Play } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
          style={{ backgroundImage: `url(${poster})`, backgroundPosition: "center 18%" }}
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
        className={`h-full w-full object-cover ${!isPlaying ? "absolute inset-0 opacity-0 pointer-events-none" : ""}`}
        style={{ objectPosition: "center 18%" }}
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>
    </div>
  );
}

type LiveState = {
  bars: { anxiety: number; engage: number; conf: number; frus: number };
  verdictHtml: string;
  pill: string;
  pillStyle: { bg: string; border: string; text: string };
};

export function Hero() {
  const states = useMemo<LiveState[]>(
    () => [
      {
        bars: { anxiety: 72, engage: 45, conf: 18, frus: 24 },
        verdictHtml:
          'Hesitant cadence + low confidence → <strong>ANXIETY</strong> detected. Activating reassurance mode.',
        pill: "Anxious • 88%",
        pillStyle: {
          bg: "rgba(251,191,36,0.15)",
          border: "rgba(251,191,36,0.3)",
          text: "var(--yellow)",
        },
      },
      {
        bars: { anxiety: 12, engage: 78, conf: 62, frus: 8 },
        verdictHtml:
          'Open cadence + active engagement + rising confidence → <strong>ENGAGED / CONFIDENT</strong>. Maintaining positive mode.',
        pill: "Confident • 92%",
        pillStyle: {
          bg: "rgba(34,211,165,0.15)",
          border: "rgba(34,211,165,0.3)",
          text: "var(--green)",
        },
      },
      {
        bars: { anxiety: 35, engage: 42, conf: 28, frus: 58 },
        verdictHtml:
          'Sharp tone shifts + clipped speech → <strong>FRUSTRATION</strong> detected. Switching to empathic de-escalation.',
        pill: "Frustrated • 79%",
        pillStyle: {
          bg: "rgba(248,113,113,0.15)",
          border: "rgba(248,113,113,0.3)",
          text: "var(--red)",
        },
      },
    ],
    [],
  );

  const [idx, setIdx] = useState(0);
  const state = states[idx % states.length];
  useEffect(() => {
    const id = setInterval(() => setIdx((v) => v + 1), 4000);
    return () => clearInterval(id);
  }, []);

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
    <section className="relative overflow-hidden pb-20 pt-[100px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_50%,var(--accent-08)_0%,transparent_70%),radial-gradient(ellipse_50%_80%_at_20%_50%,var(--accent-08)_0%,transparent_60%)]" />

      <div className="container relative z-[1]">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-[1.12fr_0.88fr] md:gap-[50px]">
          <Reveal>
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
                Start Building →
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-transparent px-7 py-3.5 text-[0.95rem] font-semibold text-[var(--text-2)] transition hover:border-white/25 hover:bg-white/5 hover:text-[var(--text)]"
              >
                Request Demo
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

          <Reveal className="relative flex min-h-[500px] flex-col items-center justify-center py-8">
            <div className="relative h-[420px] w-[420px] shrink-0 rounded-full">
              <div className="absolute inset-[-30px] rounded-full bg-[radial-gradient(ellipse,var(--accent-20)_0%,transparent_70%)]" />
              <motion.div
                aria-hidden
                className="absolute inset-[-30px] rounded-full bg-[radial-gradient(ellipse,var(--accent-20)_0%,transparent_70%)]"
                animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Круглый контейнер: тёмное кольцо + светящаяся граница + видео */}
              <div className="relative z-[1] flex h-full w-full items-center justify-center rounded-full p-[14px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)]" style={{ background: "var(--surface)" }}>
                <div
                  className="relative h-full w-full overflow-hidden rounded-full border-2 border-[var(--accent-25)] shadow-[0_0_20px_var(--accent-35),inset_0_0_20px_var(--accent-08)]"
                  style={{ boxShadow: "0 0 20px var(--accent-35), 0 0 40px var(--accent-15), inset 0 0 20px var(--accent-08)" }}
                >
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
                      className="object-cover"
                      style={{ objectPosition: "center 18%" }}
                      onError={onImageError}
                      unoptimized
                    />
                  )}
                  {avatarMode === "placeholder" && (
                    <div className="flex h-full w-full items-center justify-center text-white">
                      <span className="text-6xl opacity-90">✦</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {avatarMode === "video" && (
              <div className="mt-5 flex h-14 w-14 items-center justify-center">
                {!videoPlaying ? (
                  <button
                    type="button"
                    onClick={handleHeroPlayClick}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-lg transition hover:scale-110 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
                    aria-label="Play video"
                  >
                    <Play className="h-6 w-6 shrink-0 fill-current pl-0.5" strokeWidth={2} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleHeroPauseClick}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-lg transition hover:scale-110 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
                    aria-label="Pause video"
                  >
                    <Pause className="h-6 w-6 shrink-0 fill-current" strokeWidth={2} />
                  </button>
                )}
              </div>
            )}

            {/* NearuVibe™ Live — справа от персонажа, чуть правее и выше чтобы не загораживать лицо */}
            <motion.div
              className="absolute right-[-56px] top-[38%] z-[2] w-[300px] -translate-y-1/2 rounded-[var(--radius-lg)] border border-[var(--accent-25)] bg-[var(--surface)]/95 px-3.5 py-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-[20px]"
              animate={{ y: ["-50%", "-52%", "-50%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ translateY: "-50%" }}
            >
              <div className="mb-2 flex items-center gap-2 border-b border-white/10 pb-2">
                <span className="h-[5px] w-[5px] shrink-0 animate-pulse rounded-full bg-[var(--green)] shadow-[0_0_8px_var(--green)]" />
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.05em] text-[var(--text-2)]">
                  NearuVibe™ Live
                </span>
                <span className="ml-auto rounded bg-[var(--green)]/20 px-1.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider text-[var(--green)]">
                  Analyzing…
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                {[
                  { key: "anxiety", label: "Anxiety", color: "var(--yellow)" },
                  { key: "engage", label: "Engagement", color: "var(--accent)" },
                  { key: "conf", label: "Confidence", color: "var(--green)" },
                  { key: "frus", label: "Frustration", color: "var(--red)" },
                ].map((row) => {
                  const value = state.bars[row.key as keyof LiveState["bars"]];
                  return (
                    <div key={row.key} className="flex items-center gap-1">
                      <span className="w-[58px] shrink-0 text-[0.6rem] text-[var(--text-3)]">{row.label}</span>
                      <div className="h-[2.5px] w-[36px] overflow-hidden rounded-sm bg-white/10">
                        <motion.div
                          className="h-full rounded-sm"
                          style={{ background: row.color }}
                          animate={{ width: `${value}%` }}
                          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                      <span className="w-[22px] shrink-0 text-right text-[0.55rem] text-[var(--text-3)]">{value}%</span>
                    </div>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  className="mt-2 rounded border border-[var(--accent-20)] bg-[var(--accent-12)] px-2 py-1 text-[0.6rem] leading-[1.3] text-[var(--accent)]"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  dangerouslySetInnerHTML={{ __html: state.verdictHtml }}
                />
              </AnimatePresence>

              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-[0.55rem] text-[var(--text-3)]">Detected emotion</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={idx}
                    className="rounded-full border px-1.5 py-0.5 text-[0.6rem] font-extrabold"
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -2 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background: state.pillStyle.bg,
                      borderColor: state.pillStyle.border,
                      color: state.pillStyle.text,
                    }}
                  >
                    {state.pill}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
