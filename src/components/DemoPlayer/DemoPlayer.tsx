"use client";

import { VolumeX, Sparkles, Building2, Headphones, Activity, TrendingUp, RotateCcw, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import { Reveal } from "../Reveal";
import type { DemoStep, EqSnapshot } from "./DemoPlayer.types";
import { EMOTION_9_COLORS, EMOTION_9_LABELS } from "./DemoPlayer.types";
import { DEMO_SCENARIOS } from "./scenarios";

type Msg = { id: string; role: "user" | "bot"; html: string; nearu?: boolean };

const DEFAULT_EQ: EqSnapshot = {
  bars: Array(9).fill(0),
  labels: [...EMOTION_9_LABELS],
  colors: [...EMOTION_9_COLORS],
  verdictHtml: "Press Play to start the analysis...",
  pill: "Waiting...",
  pillStyle: { background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "var(--text-3)" },
};

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "").trim();
  const isShort = h.length === 3;
  const r = parseInt(isShort ? h[0] + h[0] : h.slice(0, 2), 16);
  const g = parseInt(isShort ? h[1] + h[1] : h.slice(2, 4), 16);
  const b = parseInt(isShort ? h[2] + h[2] : h.slice(4, 6), 16);
  if ([r, g, b].some((n) => Number.isNaN(n))) return `rgba(255,255,255,${alpha})`;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function playableSteps(steps: DemoStep[]) {
  return steps.filter((s) => s.type !== "eq-update").length;
}

export function DemoPlayer() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const scenario = DEMO_SCENARIOS[scenarioIdx]!;

  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [vanillaMsgs, setVanillaMsgs] = useState<Msg[]>([]);
  const [nearuMsgs, setNearuMsgs] = useState<Msg[]>([]);
  const [vanillaTyping, setVanillaTyping] = useState(false);
  const [nearuTyping, setNearuTyping] = useState(false);

  const [eq, setEq] = useState<EqSnapshot>(DEFAULT_EQ);
  const [calloutsVisible, setCalloutsVisible] = useState(false);

  const scrollRefVanilla = useRef<HTMLDivElement | null>(null);
  const scrollRefNearu = useRef<HTMLDivElement | null>(null);

  const dominantEqColor = useMemo(() => {
    const bars = eq.bars ?? [];
    const colors = eq.colors ?? [];
    if (!bars.length || !colors.length) return "var(--accent)";
    let bestIdx = 0;
    for (let i = 1; i < bars.length; i++) {
      if ((bars[i] ?? 0) > (bars[bestIdx] ?? 0)) bestIdx = i;
    }
    return colors[bestIdx] ?? "var(--accent)";
  }, [eq.bars, eq.colors]);

  const detectedPillStyle = useMemo(() => {
    // Colors are hex strings from EMOTION_9_COLORS (reference palette)
    const c = dominantEqColor;
    if (!c.startsWith("#")) {
      return {
        background: "var(--accent-12)",
        borderColor: "var(--accent-25)",
        color: "var(--accent)",
      };
    }
    return {
      background: hexToRgba(c, 0.16),
      borderColor: hexToRgba(c, 0.38),
      color: c,
    };
  }, [dominantEqColor]);

  const totalPlayable = useMemo(() => playableSteps(scenario.steps), [scenario.steps]);
  const donePlayable = useMemo(
    () => playableSteps(scenario.steps.slice(0, stepIdx)),
    [scenario.steps, stepIdx],
  );

  const finished = stepIdx >= scenario.steps.length;

  const reset = useCallback(() => {
    setStepIdx(0);
    setIsPlaying(false);
    setVanillaMsgs([]);
    setNearuMsgs([]);
    setVanillaTyping(false);
    setNearuTyping(false);
    setEq(DEFAULT_EQ);
    setCalloutsVisible(false);
  }, []);

  const scrollToBottom = useCallback(() => {
    const v = scrollRefVanilla.current;
    const n = scrollRefNearu.current;
    if (v) v.scrollTop = v.scrollHeight;
    if (n) n.scrollTop = n.scrollHeight;
  }, []);

  const addMsg = useCallback(
    (which: "vanilla" | "nearu", msg: Omit<Msg, "id">) => {
      const withId: Msg = { ...msg, id: `${Date.now()}-${Math.random().toString(16).slice(2)}` };
      if (which === "vanilla") setVanillaMsgs((m) => [...m, withId]);
      else setNearuMsgs((m) => [...m, withId]);
      requestAnimationFrame(scrollToBottom);
    },
    [scrollToBottom],
  );

  const runEq = useCallback(async (snap: EqSnapshot) => {
    setEq(snap);
    // Stagger verdict + pill like the HTML (bar anim comes from motion widths)
    await sleep(600);
    setEq((prev) => ({ ...prev, verdictHtml: snap.verdictHtml }));
    await sleep(200);
    setEq((prev) => ({ ...prev, pill: snap.pill, pillStyle: snap.pillStyle }));
  }, []);

  const playFull = useCallback(async () => {
    if (isPlaying) return;
    if (finished) return;
    setIsPlaying(true);

    let idx = 0;
    const steps = scenario.steps;

    while (idx < steps.length) {
      const step = steps[idx]!;

      if (step.type === "user") {
        addMsg("vanilla", { role: "user", html: step.text });
        addMsg("nearu", { role: "user", html: step.text });
        setStepIdx(idx + 1);
        await sleep(400);
        await runEq(step.eq);

        const nextStep = steps[idx + 1];
        if (nextStep?.type === "eq-update") {
          await sleep(1000);
          await runEq(nextStep.eq);
          idx += 2;
          setStepIdx(idx);
        } else {
          idx += 1;
        }
      } else if (step.type === "eq-update") {
        await runEq(step.eq);
        idx += 1;
        setStepIdx(idx);
      } else if (step.type === "both-bot") {
        setVanillaTyping(true);
        setNearuTyping(true);
        await sleep(1200);
        setVanillaTyping(false);
        setNearuTyping(false);
        addMsg("vanilla", { role: "bot", html: step.vanillaText });
        addMsg("nearu", { role: "bot", html: step.nearuHtml, nearu: true });
        await sleep(400);
        setCalloutsVisible(true);
        idx += 1;
        setStepIdx(idx);
      }
    }

    setIsPlaying(false);
  }, [addMsg, finished, isPlaying, runEq, scenario.steps]);

  const btnLabel = useMemo(() => {
    if (finished) return "Done";
    return "Play";
  }, [finished]);

  const progressPct = totalPlayable === 0 ? 0 : Math.min(100, (donePlayable / totalPlayable) * 100);

  return (
    <section className="bg-[var(--bg)]" id="demo">
      <div className="container">
        <Reveal className="text-center">
          <div className="flex flex-col items-center">
            <div className="label">Live Demo</div>
            <div className="divider-line" />
          </div>
          <h2 className="text-[clamp(2rem,3.5vw,3.2rem)] font-extrabold tracking-[-0.03em]">The Difference Nearu Makes</h2>
          <p className="mx-auto mt-4 max-w-[640px] text-[1.05rem] leading-[1.7] text-[var(--text-2)]">
            Same user. Same words. Two completely different experiences. Press Play to see it unfold.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="flex flex-wrap gap-2">
            {[
                { name: "onboarding", Icon: Building2 },
                { name: "support", Icon: Headphones },
                { name: "healthcare", Icon: Activity },
                { name: "sales", Icon: TrendingUp },
              ].map(({ name, Icon }) => {
                const i = DEMO_SCENARIOS.findIndex((s) => s.name === name);
                const s = DEMO_SCENARIOS[i]!;
                const active = i === scenarioIdx;
                return (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => {
                      setScenarioIdx(i);
                      reset();
                    }}
                    className={[
                      "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-[0.8rem] font-semibold transition",
                      active
                        ? "border-[var(--accent-30)] bg-[var(--accent-12)] text-[var(--text)]"
                        : "border-white/10 bg-[var(--surface)] text-[var(--text-3)] hover:border-white/15 hover:text-[var(--text-2)]",
                    ].join(" ")}
                  >
                    <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    {s.tabLabel}
                  </button>
                );
              })}
          </div>

          <div className="mt-6 grid items-start gap-4 lg:grid-cols-[1fr_300px]">
            <div>
              <div className="overflow-hidden rounded-[20px] border border-white/15 bg-[var(--surface)]">
                <div className="grid grid-cols-1 border-b border-white/10 md:grid-cols-2">
                  <div className="flex items-center gap-2 border-white/10 bg-white/[0.02] px-4 py-2.5 md:border-r">
                    <span className="rounded bg-white/5 px-2 py-0.5 text-[0.6rem] font-extrabold uppercase tracking-[0.08em] text-[var(--text-3)]">
                      Without Nearu
                    </span>
                    <span className="text-[0.78rem] font-bold text-[var(--text-2)]">Standard AI Agent</span>
                  </div>
                  <div className="flex items-center gap-2 border-white/10 bg-white/[0.02] px-4 py-2.5 md:border-l">
                    <span className="rounded bg-[var(--accent-20)] px-2 py-0.5 text-[0.6rem] font-extrabold uppercase tracking-[0.08em] text-[var(--accent)]">
                      With Nearu
                    </span>
                    <span className="text-[0.78rem] font-bold text-[var(--text)]">{scenario.agentName}</span>
                  </div>
                </div>

                <div className="grid min-h-[280px] grid-cols-1 md:grid-cols-2">
                  <div className="flex flex-col gap-2 border-white/10 p-4 md:border-r">
                    <div className="mb-1 flex items-center gap-2 border-b border-white/10 pb-2.5">
                      <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full bg-[#2a2a3e]">
                        <Image src="/kaltura-avatar.png" alt="Standard Agent" fill className="object-cover" sizes="28px" />
                      </div>
                      <div>
                        <div className="text-[0.75rem] font-bold leading-[1.2]">Standard Agent</div>
                        <div className="text-[0.62rem] text-[var(--text-3)]">No emotion detection</div>
                      </div>
                    </div>

                    <div ref={scrollRefVanilla} className="flex flex-1 flex-col gap-2 overflow-auto pr-1">
                      <AnimatePresence initial={false}>
                        {vanillaMsgs.map((m) => (
                          <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className={[
                              "flex max-w-[92%] flex-col",
                              m.role === "user" ? "items-start" : "ml-auto items-end",
                            ].join(" ")}
                          >
                            <div
                              className={[
                                "rounded-[12px] border border-white/10 px-3 py-2.5 text-[0.8rem] leading-[1.6]",
                                m.role === "user"
                                  ? "bg-[#e5e7eb] text-[#1f2937]"
                                  : "bg-[#e5e7eb] text-[#1f2937] [&_.ehw]:font-bold [&_.ehw]:text-[var(--accent)]",
                              ].join(" ")}
                            >
                              {m.html}
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    {vanillaTyping && (
                      <div className="mt-1 w-fit rounded-[10px] border border-white/10 bg-white/[0.03] px-3 py-2">
                        <div className="flex items-center gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="inline-block h-[5px] w-[5px] rounded-full bg-[var(--text-3)]"
                              animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Nearu — same background as Standard Agent */}
                  <div className="flex flex-col gap-2 p-4">
                    <div className="mb-1 flex items-center gap-2 border-b border-white/10 pb-2.5">
                      <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10" style={{ background: scenario.agentColor }}>
                        <Image src="/nearu-avatar.png" alt={scenario.agentName} fill className="object-cover" sizes="28px" />
                        <span className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-[var(--green)] ring-2 ring-[var(--accent-08)]" />
                      </div>
                      <div>
                        <div className="text-[0.75rem] font-bold leading-[1.2]">{scenario.agentName}</div>
                        <div className="flex items-center gap-1 text-[0.62rem] text-[var(--green)]">
                          <span className="h-1 w-1 animate-pulse rounded-full bg-[var(--green)]" />
                          NearuVibe™ monitoring
                        </div>
                      </div>
                    </div>

                    <div ref={scrollRefNearu} className="flex flex-1 flex-col gap-2 overflow-auto pr-1">
                      <AnimatePresence initial={false}>
                        {nearuMsgs.map((m) => (
                          <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className={[
                              "flex max-w-[92%] flex-col",
                              m.role === "user" ? "items-start" : "ml-auto items-end",
                            ].join(" ")}
                          >
                            <div
                              className={[
                                "rounded-[12px] border border-white/10 px-3 py-2.5 text-[0.8rem] leading-[1.6]",
                                m.role === "user"
                                  ? "bg-[#e5e7eb] text-[#1f2937]"
                                  : "bg-[#e5e7eb] text-[#1f2937] [&_.ehw]:font-bold [&_.ehw]:text-[var(--accent)]",
                              ].join(" ")}
                              dangerouslySetInnerHTML={{ __html: m.html }}
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    {nearuTyping && (
                      <div className="mt-1 w-fit rounded-[10px] border border-[var(--accent-20)] bg-[var(--accent-08)] px-3 py-2">
                        <div className="flex items-center gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="inline-block h-[5px] w-[5px] rounded-full bg-[var(--accent)]"
                              animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3 border-t border-white/10 bg-[var(--bg-2)] px-4 py-3.5">
                  <button
                    type="button"
                    onClick={playFull}
                    disabled={isPlaying || finished}
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2 text-[0.8rem] font-extrabold text-white shadow-[0_0_16px_var(--accent-glow)] transition hover:translate-y-[-1px] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {finished ? <Check className="h-4 w-4" strokeWidth={2} /> : null}
                    {btnLabel}
                  </button>

                  <div className="h-[3px] flex-1 overflow-hidden rounded-sm bg-white/10">
                    <motion.div
                      className="h-full rounded-sm bg-[var(--accent)]"
                      animate={{ width: `${progressPct}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>

                  <div className="whitespace-nowrap text-[0.7rem] text-[var(--text-3)]">
                    Step {donePlayable} / {totalPlayable}
                  </div>

                  <button
                    type="button"
                    onClick={reset}
                    className={[
                      "inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-1.5 text-[0.75rem] font-semibold transition",
                      finished ? "border-white/10 text-[var(--text-3)] hover:border-white/15 hover:text-[var(--text)]" : "hidden",
                    ].join(" ")}
                  >
                    <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
                    Restart
                  </button>
                </div>
              </div>

              {/* Callouts */}
              <motion.div
                className="mt-3 grid gap-3 md:grid-cols-2"
                initial={false}
                animate={{ opacity: calloutsVisible ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                aria-hidden={!calloutsVisible}
              >
                <div className="flex items-start gap-2.5 rounded-[10px] border border-white/10 bg-white/[0.02] px-3.5 py-3">
                  <VolumeX className="h-[0.9rem] w-[0.9rem] shrink-0 text-[var(--text-3)]" strokeWidth={1.5} />
                  <div
                    className="text-[0.75rem] leading-[1.5] text-[var(--text-3)] [&_strong]:mb-0.5 [&_strong]:block [&_strong]:text-[0.78rem] [&_strong]:font-bold [&_strong]:text-[var(--text-2)]"
                    dangerouslySetInnerHTML={{ __html: scenario.calloutBadHtml }}
                  />
                </div>
                <div className="flex items-start gap-2.5 rounded-[10px] border border-[var(--accent-20)] bg-[var(--accent-08)] px-3.5 py-3">
                  <Sparkles className="h-[0.9rem] w-[0.9rem] shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                  <div
                    className="text-[0.75rem] leading-[1.5] text-[var(--text-3)] [&_strong]:mb-0.5 [&_strong]:block [&_strong]:text-[0.78rem] [&_strong]:font-bold [&_strong]:text-[var(--text)]"
                    dangerouslySetInnerHTML={{ __html: scenario.calloutGoodHtml }}
                  />
                </div>
              </motion.div>
            </div>

            {/* EQ panel */}
            <div className="sticky top-20 overflow-hidden rounded-[20px] border border-white/15 bg-[var(--surface)]">
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-3">
                <span className="h-[6px] w-[6px] animate-pulse rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent-40)]" />
                <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.06em] text-[var(--text-2)]">
                  NearuVibe™ Live
                </span>
              </div>

              <div className="flex flex-col gap-3 px-4 py-3.5">
                <div className="flex flex-col gap-2">
                  {eq.labels.map((lbl, i) => (
                    <div key={lbl} className="flex flex-col gap-1">
                      <div className="flex justify-between text-[0.68rem] text-[var(--text-3)]">
                        <span>{lbl}</span>
                        <span className="text-[var(--text-2)]">{eq.bars[i] > 0 ? `${eq.bars[i]}%` : "—"}</span>
                      </div>
                      <div className="h-1 overflow-hidden rounded-sm bg-white/10">
                        <motion.div
                          className="h-full rounded-sm"
                          style={{ background: eq.colors[i] }}
                          animate={{ width: `${eq.bars[i]}%` }}
                          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <motion.div
                  className="rounded-lg border border-[var(--accent-20)] bg-[var(--accent-08)] px-2.5 py-2 text-[0.68rem] leading-[1.5] text-[var(--accent)]"
                  animate={{ opacity: eq.verdictHtml === DEFAULT_EQ.verdictHtml ? 0.85 : 1 }}
                  transition={{ duration: 0.3 }}
                  dangerouslySetInnerHTML={{ __html: eq.verdictHtml }}
                />

                <div className="flex items-center justify-between">
                  <span className="text-[0.65rem] text-[var(--text-3)]">Detected emotion</span>
                  <motion.span
                    className="rounded-full border px-2.5 py-1 text-[0.65rem] font-extrabold"
                    animate={{
                      background: detectedPillStyle.background,
                      color: detectedPillStyle.color,
                      borderColor: detectedPillStyle.borderColor,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{
                      background: detectedPillStyle.background,
                      borderColor: detectedPillStyle.borderColor,
                      color: detectedPillStyle.color,
                    }}
                  >
                    {eq.pill}
                  </motion.span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

