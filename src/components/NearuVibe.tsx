"use client";

import { Mic, MessageSquare, Eye } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const API_RESPONSE_RAW = `{
  "transcript": "I think we should move forward",

  "acoustic_emotion": {
    "label": "anxious",
    "confidence": 0.84
  },

  "semantic_emotion": {
    "label": "neutral",
    "confidence": 0.63
  },

  "face_emotion": {
    "label": "anxious",
    "confidence": 0.87
  },

  "interpreted_emotion": {
    "label": "anxious",
    "confidence": 0.86,
    "state": "elevated",
    "evidence_summary": "Voice tremor and facial tension suggest underlying anxiety despite neutral wording."
  }
}`;

const STROKE = { strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const channels = [
  {
    Icon: Mic,
    iconStyle: "bg-[rgba(251,191,36,0.12)] text-[#FBBF24]",
    title: "Multi-Channel Emotion Recognition",
    body: "Voice prosody — tone, pitch, volume, pace, tremor. It doesn't just hear \"I'm fine\" — it hears the tremble that means \"I'm not.\"",
  },
  {
    Icon: MessageSquare,
    iconStyle: "bg-[var(--accent-12)] text-[var(--accent)]",
    title: "Semantic Analysis",
    body: "Emotional meaning behind the words. Sarcasm, masking, and contradiction between what's said and how it's said.",
  },
  {
    Icon: Eye,
    iconStyle: "bg-[rgba(34,211,165,0.12)] text-[#22D3A5]",
    title: "Facial Expression Recognition",
    body: "Micro-expressions via lightweight VER model trained on AffectNet (~450K faces). Confidence-weighted fusion with voice channels.",
  },
] as const;

export function NearuVibe() {
  const codeBlockRef = useRef<HTMLDivElement>(null);
  const [typedLength, setTypedLength] = useState(0);
  const [showFullCode, setShowFullCode] = useState(false);
  const startedRef = useRef(false);

  const typeCode = useCallback(() => {
    let i = 0;
    function tick() {
      if (i < API_RESPONSE_RAW.length) {
        setTypedLength(i + 1);
        i++;
        const delay = API_RESPONSE_RAW[i] === "\n" ? 30 : 18;
        timeoutRef.current = window.setTimeout(tick, delay);
      } else {
        setShowFullCode(true);
      }
    }
    tick();
  }, []);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = codeBlockRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (prefersReducedMotion || isMobile) {
      setShowFullCode(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            typeCode();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [typeCode]);

  return (
    <section
      className="relative overflow-hidden py-16 md:py-20"
      id="nearuvibe"
      style={{ background: "linear-gradient(to bottom, #111111 0%, #0e0e0e 100%)" }}
    >
      <div className="container relative z-10">
        <Reveal className="mb-12 text-left">
          <div className="label">Technology</div>
          <div className="divider-line" />
          <h2 className="text-[clamp(2rem,3.5vw,3.2rem)] font-extrabold tracking-[-0.03em]">
            NearuVibe™
            <br />
            Emotion Engine
          </h2>
        </Reveal>

        <Reveal className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-8 text-[1rem] leading-[1.75] text-[var(--text-2)]">
              The &quot;limbic system&quot; of the machine. NearuVibe™ intercepts audio and video signals <em>before</em> the LLM — reading human emotion in real time and converting it into an EQ signal that shapes how the agent responds.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {channels.map((c) => (
                <div
                  key={c.title}
                  className="rounded-[var(--radius)] border p-5 backdrop-blur-[8px] transition hover:bg-[rgba(255,255,255,0.07)]"
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    borderColor: "rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div className="mb-1 flex items-center gap-2 text-[0.78rem] font-extrabold text-[var(--text)]">
                    <span className={`inline-flex h-5 w-5 items-center justify-center rounded ${c.iconStyle}`}>
                      <c.Icon className="h-[0.7rem] w-[0.7rem]" fill="none" {...STROKE} />
                    </span>
                    {c.title}
                  </div>
                  <div className="text-[0.78rem] text-[var(--text-3)]">{c.body}</div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {[
                { val: "~1.6s", lbl: "End-to-end latency" },
                { val: "3", lbl: "Independent channels" },
                { val: "REST", lbl: "+ WebSocket API" },
              ].map((b) => (
                <div
                  key={b.lbl}
                  className="min-w-[110px] rounded-[var(--radius)] border px-5 py-3.5 text-center"
                  style={{
                    background: "rgba(45, 156, 219, 0.06)",
                    borderColor: "rgba(45, 156, 219, 0.15)",
                  }}
                >
                  <div className="font-[var(--font-head)] text-[1.3rem] font-extrabold text-[var(--accent)]">{b.val}</div>
                  <div className="mt-1 text-[0.7rem] text-[var(--text-3)]">{b.lbl}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="overflow-hidden rounded-[var(--radius-lg)]"
            style={{
              background: "rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.07)",
            }}
          >
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-1 font-mono text-[0.72rem] text-[var(--text-3)]">POST /api/v1/analyze-emotion → response</span>
            </div>
            <div
              ref={codeBlockRef}
              className="api-code-block overflow-x-auto p-5 font-mono text-[0.75rem] leading-[1.8]"
            >
              {!showFullCode ? (
                <pre className="whitespace-pre typing-cursor">
                  {API_RESPONSE_RAW.slice(0, typedLength)}
                </pre>
              ) : (
                <>
              <span className="json-bracket">{"{"}</span>
              <br />
              {"  "}
              <span className="json-key">&quot;transcript&quot;</span>
              <span className="json-bracket">:</span> <span className="json-str">&quot;I think we should move forward&quot;</span>
              <span className="json-bracket">,</span>
              <br />
              <br />
              {"  "}
              <span className="json-key">&quot;acoustic_emotion&quot;</span>
              <span className="json-bracket">:</span> <span className="json-bracket">{"{"}</span>
              <br />
              {"    "}
              <span className="json-key">&quot;label&quot;</span>
              <span className="json-bracket">:</span> <span className="json-str">&quot;anxious&quot;</span>
              <span className="json-bracket">,</span>
              <br />
              {"    "}
              <span className="json-key">&quot;confidence&quot;</span>
              <span className="json-bracket">:</span> <span className="json-num">0.84</span>
              <br />
              {"  "}
              <span className="json-bracket">{"}"}</span>
              <span className="json-bracket">,</span>
              <br />
              <br />
              {"  "}
              <span className="json-key">&quot;semantic_emotion&quot;</span>
              <span className="json-bracket">:</span> <span className="json-bracket">{"{"}</span>
              <br />
              {"    "}
              <span className="json-key">&quot;label&quot;</span>
              <span className="json-bracket">:</span> <span className="json-str">&quot;neutral&quot;</span>
              <span className="json-bracket">,</span>
              <br />
              {"    "}
              <span className="json-key">&quot;confidence&quot;</span>
              <span className="json-bracket">:</span> <span className="json-num">0.63</span>
              <br />
              {"  "}
              <span className="json-bracket">{"}"}</span>
              <span className="json-bracket">,</span>
              <br />
              <br />
              {"  "}
              <span className="json-key">&quot;face_emotion&quot;</span>
              <span className="json-bracket">:</span> <span className="json-bracket">{"{"}</span>
              <br />
              {"    "}
              <span className="json-key">&quot;label&quot;</span>
              <span className="json-bracket">:</span> <span className="json-str">&quot;anxious&quot;</span>
              <span className="json-bracket">,</span>
              <br />
              {"    "}
              <span className="json-key">&quot;confidence&quot;</span>
              <span className="json-bracket">:</span> <span className="json-num">0.87</span>
              <br />
              {"  "}
              <span className="json-bracket">{"}"}</span>
              <span className="json-bracket">,</span>
              <br />
              <br />
              {"  "}
              <span className="json-key">&quot;interpreted_emotion&quot;</span>
              <span className="json-bracket">:</span> <span className="json-bracket">{"{"}</span>
              <br />
              {"    "}
              <span className="json-key">&quot;label&quot;</span>
              <span className="json-bracket">:</span> <span className="json-str">&quot;anxious&quot;</span>
              <span className="json-bracket">,</span>
              <br />
              {"    "}
              <span className="json-key">&quot;confidence&quot;</span>
              <span className="json-bracket">:</span> <span className="json-num">0.86</span>
              <span className="json-bracket">,</span>
              <br />
              {"    "}
              <span className="json-key">&quot;state&quot;</span>
              <span className="json-bracket">:</span> <span className="json-str">&quot;elevated&quot;</span>
              <span className="json-bracket">,</span>
              <br />
              {"    "}
              <span className="json-key">&quot;evidence_summary&quot;</span>
              <span className="json-bracket">:</span>{" "}
              <span className="json-str">
                &quot;Voice tremor and facial tension suggest underlying anxiety despite neutral wording.&quot;
              </span>
              <br />
              {"  "}
              <span className="json-bracket">{"}"}</span>
              <br />
              <span className="json-bracket">{"}"}</span>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

