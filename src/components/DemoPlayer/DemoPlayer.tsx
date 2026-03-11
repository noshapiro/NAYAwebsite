"use client";

import { VolumeX, Sparkles, Building2, Headphones, Activity, TrendingUp, RotateCcw, Play } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import { Reveal } from "../Reveal";
import type { DemoStep, EqSnapshot } from "./DemoPlayer.types";
import { EMOTION_9_COLORS, EMOTION_9_LABELS, getEmotionBadgeStyle } from "./DemoPlayer.types";
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
                        ? "border-white/15 bg-[var(--surface)] text-[var(--text)]"
                        : "border-white/10 bg-[var(--surface)] text-[var(--text-3)] hover:border-white/15 hover:text-[var(--text-2)]",
                    ].join(" ")}
                  >
                    <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    {s.tabLabel}
                  </button>
                );
              })}
          </div>

          <div className="mt-6">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
                {/* Card 1 — Agent A */}
                <div className="demo-panel flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[rgba(255,255,255,0.03)]">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[0.78rem] font-bold text-white">Agent A</span>
                      <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.68rem] font-medium text-[var(--text-2)]">
                        Standard Avatar
                      </span>
                    </div>
                    <span className="text-[0.68rem] text-[var(--text-3)]">No emotion detection</span>
                  </div>
                  <div className="border-b border-white/10 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#2a2a3e]">
                          <Image src="/kaltura-avatar.png" alt="Standard Agent" fill className="object-cover" sizes="40px" />
                        </div>
                        <div>
                          <div className="text-[0.8rem] font-bold leading-tight text-white">Standard Agent</div>
                          <div className="mt-0.5 text-[0.68rem] text-[var(--text-3)]">● No emotion detection</div>
                          <div className="text-[0.68rem] text-[var(--text-3)]">⏱ Emotional state: unknown</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-2 p-4">
                      {vanillaTyping && (
                        <div className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-[0.8rem] text-[var(--text-3)]">
                          Processing request...
                        </div>
                      )}
                      <div ref={scrollRefVanilla} className="flex flex-1 flex-col gap-2 overflow-auto pr-1">
                        <AnimatePresence initial={false}>
                          {vanillaMsgs.map((m) => (
                            <motion.div
                              key={m.id}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                              className={m.role === "user" ? "bubble-user" : "bubble-agent"}
                              dangerouslySetInnerHTML={{ __html: m.html }}
                            />
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>

                  <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5 text-[13px] text-[#556677]">
                    <span>Detected emotion: —</span>
                    <span>No confidence data</span>
                  </div>
                </div>

                {/* Card 2 — Agent B */}
                <div className="demo-panel flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[rgba(255,255,255,0.03)]">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[0.78rem] font-bold text-white">Agent B</span>
                      <span
                        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[0.68rem] font-medium text-white"
                        style={{ background: "#38bdf8" }}
                      >
                        NEARU Soul Engine™
                      </span>
                    </div>
                    <span className="text-[0.68rem] text-[var(--text-3)]">NearuVibe™ monitoring</span>
                  </div>
                  <div className="border-b border-white/10 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10" style={{ background: scenario.agentColor }}>
                          <Image src="/nearu-avatar.png" alt="Standard Agent" fill className="object-cover" sizes="40px" />
                          <span className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-[var(--green)] ring-2 ring-[var(--accent-08)]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[0.8rem] font-bold leading-tight text-white">Standard Agent</span>
                            <span className="rounded px-1.5 py-0.5 text-[0.6rem] font-semibold text-[#38bdf8]" style={{ background: "rgba(56,189,248,0.15)", border: "1px solid rgba(56,189,248,0.3)" }}>
                              NEARU
                            </span>
                          </div>
                          <div className="mt-0.5 flex items-center gap-1.5 text-[0.68rem] text-[var(--text-2)]">
                            <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[var(--green)]" />
                            NearuVibe™ monitoring
                          </div>
                          <div className="text-[0.68rem] text-[var(--text-3)]">
                            ⏱ {eq.pill.includes(" • ") ? (eq.pill.split(" • ")[0] ?? "Neutral") : "Neutral (baseline)"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-2 p-4">
                      {vanillaMsgs.length === 0 ? (
                        <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-[0.8rem] text-[var(--text-3)]">
                          <span>NearuVibe™ monitoring all signals...</span>
                          <div className="flex items-center gap-0.5">
                            {[0, 1, 2, 3, 4].map((i) => (
                              <motion.span
                                key={i}
                                className="inline-block h-4 w-1 rounded-full bg-[#38bdf8]"
                                animate={{ height: [8, 16, 8], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="emotion-bars">
                            {eq.labels.map((lbl, i) => (
                              <div key={lbl} className="emotion-row">
                                <span className="emotion-label">{lbl}</span>
                                <div className="emotion-bar-track">
                                  <motion.div
                                    className="emotion-bar-fill"
                                    style={{ background: eq.colors[i] }}
                                    animate={{ width: `${eq.bars[i]}%` }}
                                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                  />
                                </div>
                                <span className="emotion-percent">{eq.bars[i] > 0 ? `${eq.bars[i]}%` : "—"}</span>
                              </div>
                            ))}
                          </div>
                          <motion.div
                            className="nearu-analysis-box flex items-center justify-between gap-2 border text-[0.68rem] text-[#38bdf8]"
                            style={{ borderColor: "rgba(56,189,248,0.2)", background: "rgba(56,189,248,0.06)" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="min-w-0 flex-1" dangerouslySetInnerHTML={{ __html: eq.verdictHtml }} />
                            <div className="flex shrink-0 items-center gap-0.5">
                              {[0, 1, 2, 3, 4].map((i) => (
                                <motion.span
                                  key={i}
                                  className="inline-block h-3 w-0.5 rounded-full bg-[#38bdf8]"
                                  animate={{ height: [6, 12, 6], opacity: [0.6, 1, 0.6] }}
                                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                                />
                              ))}
                            </div>
                          </motion.div>
                        </>
                      )}

                      <div ref={scrollRefNearu} className="flex flex-1 flex-col gap-2 overflow-auto pr-1">
                        <AnimatePresence initial={false}>
                          {nearuMsgs.map((m) => (
                            <motion.div
                              key={m.id}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                              className={m.role === "user" ? "bubble-user" : "bubble-agent"}
                              dangerouslySetInnerHTML={{ __html: m.html }}
                            />
                          ))}
                        </AnimatePresence>
                      </div>

                      {nearuTyping && (
                        <div className="w-fit rounded-[10px] border border-[var(--accent-20)] bg-[var(--accent-08)] px-3 py-2">
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

                  <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5 text-[13px] text-[#556677]">
                    <span>Detected emotion</span>
                    <div className="flex items-center gap-3">
                      {eq.pill.includes(" • ") ? (
                        <>
                          <motion.span
                            className="rounded-lg border px-2.5 py-[3px] text-[12px] font-semibold"
                            style={getEmotionBadgeStyle(eq.pill.split(" • ")[0] ?? "Neutral")}
                            initial={false}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {eq.pill.split(" • ")[0]}
                          </motion.span>
                          <span>{eq.pill.split(" • ")[1] ?? ""} confidence</span>
                        </>
                      ) : (
                        <>
                          <span>—</span>
                          <span>No confidence data</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="demo-controls flex flex-wrap items-center gap-3 py-4">
                  <button
                    type="button"
                    onClick={playFull}
                    disabled={isPlaying || finished}
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[0.8rem] font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ background: "#38bdf8" }}
                  >
                    <Play className="h-4 w-4 shrink-0" strokeWidth={2} fill="currentColor" />
                    {isPlaying ? "Playing..." : "Play"}
                  </button>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-[0.8rem] font-semibold text-[var(--text-2)] transition hover:border-white/15 hover:text-[var(--text)]"
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                  >
                    <RotateCcw className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                    Reset
                  </button>
                  <span className="text-[13px] text-[#556677]">
                    Select a scenario above, then play to see the difference between standard and NEARU-enhanced responses.
                  </span>
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}

