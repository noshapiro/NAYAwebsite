"use client";

import Link from "next/link";

const PILL_ACCENT = "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border-[rgba(0,153,255,0.2)] bg-[rgba(0,153,255,0.12)] text-[#0099ff]";
const PILL_GREEN = "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border-[rgba(34,197,94,0.2)] bg-[rgba(34,197,94,0.12)] text-[#22c55e]";
const PILL_CALM = "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border-[rgba(56,189,248,0.2)] bg-[rgba(56,189,248,0.12)] text-[#38bdf8]";
const PILL_HAPPY = "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border-[rgba(245,158,11,0.2)] bg-[rgba(245,158,11,0.12)] text-[#f59e0b]";
const PILL_PURPLE = "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border-[rgba(167,139,250,0.2)] bg-[rgba(167,139,250,0.12)] text-[#a78bfa]";
const PILL_RED = "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.12)] text-[#ef4444]";
const PILL_NEUTRAL = "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border-[rgba(107,114,128,0.2)] bg-[rgba(107,114,128,0.12)] text-[#6b7280]";

function DeckSectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a0a0a0]">
      {children}
    </div>
  );
}

function DeckDivider() {
  return <div className="mb-5 h-0.5 w-9 bg-[#0099ff]" />;
}

export function PitchDeck() {
  return (
    <main className="pb-24 pt-12">
      {/* ═══ SLIDE 1 — COVER ═══ */}
      <section className="container relative overflow-hidden px-6 py-16 md:py-24">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,80,180,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-24 -right-20 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,80,180,0.1)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <DeckSectionLabel>Emotional Intelligence Infrastructure</DeckSectionLabel>
            <DeckDivider />
            <h1 className="text-[clamp(2.5rem,5vw,4.25rem)] font-extrabold leading-[1.05] tracking-tight text-white">
              We Build
              <br />
              Souls for
              <br />
              <span className="text-[#0099ff]">Machines.</span>
            </h1>
            <p className="mt-6 max-w-[480px] text-base leading-relaxed text-[#a0a0a0]">
              The emotional intelligence layer for AI agents, embedded AI &amp; robotics — giving machines the ability to perceive emotion, respond with empathy, and build genuine human connections.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex rounded-lg bg-[#0099ff] px-6 py-3 text-sm font-semibold text-white no-underline transition hover:opacity-90">
                Request a Demo
              </Link>
              <Link href="/contact" className="inline-flex rounded-lg border border-[#2a2f3a] bg-transparent px-6 py-3 text-sm font-semibold text-white no-underline transition hover:border-white/20 hover:bg-white/5">
                Become a Design Partner
              </Link>
            </div>
            <div className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#555]">
              nnearu.com &nbsp;·&nbsp; noa@nnearu.com &nbsp;·&nbsp; +972-54-5884883
            </div>
          </div>
          <div className="w-full shrink-0 lg:max-w-[420px]">
            <div className="rounded-xl border border-[#21252e] bg-[#0d0d0d] p-5 font-mono text-xs leading-relaxed">
              <div className="mb-3 flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
              </div>
              <div className="font-semibold text-[#0099ff]">POST /api/v1/analyze-emotion</div>
              <div className="text-[#555]">{`{`}</div>
              <div className="text-[#a78bfa]">&nbsp;&nbsp;&quot;audio&quot;: &quot;session.wav&quot;,</div>
              <div className="text-[#a78bfa]">&nbsp;&nbsp;&quot;images&quot;: [&quot;frame.jpg&quot;],</div>
              <div className="text-[#a78bfa]">&nbsp;&nbsp;&quot;session_id&quot;: &quot;user_42&quot;</div>
              <div className="text-[#555]">{`}`}</div>
              <div className="mt-2 text-[#555] italic">// Response ~1.6s</div>
              <div className="text-[#a0a0a0]">&quot;interpreted_emotion&quot;: {'{'}</div>
              <div className="text-[#f59e0b]">&nbsp;&nbsp;&quot;label&quot;: &quot;fearful&quot;,</div>
              <div className="text-[#38bdf8]">&nbsp;&nbsp;&quot;confidence&quot;: 0.76,</div>
              <div className="text-[#ef4444]">&nbsp;&nbsp;&quot;trend&quot;: &quot;worsening&quot;,</div>
              <div className="text-[#a0a0a0]">&nbsp;&nbsp;&quot;evidence_summary&quot;:</div>
              <div className="text-[#555]">&nbsp;&nbsp;&nbsp;&nbsp;&quot;Voice tremor + facial</div>
              <div className="text-[#555]">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tension despite neutral words&quot;</div>
              <div className="text-[#a0a0a0]">{'}'}</div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-[#21252e] bg-[#1a1d24] px-4 py-3 text-center">
                <div className="text-xl font-extrabold tracking-tight text-[#0099ff]">~1.6s</div>
                <div className="mt-0.5 text-[11px] text-[#a0a0a0]">API response</div>
              </div>
              <div className="rounded-lg border border-[#21252e] bg-[#1a1d24] px-4 py-3 text-center">
                <div className="text-xl font-extrabold tracking-tight text-[#38bdf8]">3</div>
                <div className="mt-0.5 text-[11px] text-[#a0a0a0]">Signal channels</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SLIDE 2 — THE PROBLEM ═══ */}
      <section className="container px-6 py-16">
        <DeckSectionLabel>The Problem</DeckSectionLabel>
        <DeckDivider />
        <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight text-white md:text-[40px]">
          AI Is Getting Smarter.
          <br />
          Humans Aren&apos;t Getting More Comfortable.
        </h2>
        <p className="mt-2 max-w-[560px] text-[15px] leading-relaxed text-[#a0a0a0]">
          AI capability scales rapidly. Human trust and adoption do not. The result is a persistent gap.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { icon: "👤", title: "Low Retention", pill: "Adoption Problem", pillClass: PILL_ACCENT, body: "Users experiment with AI tools but abandon them — lacking emotional anchoring, persistent identity, and meaningful relationship-building. Without a human-like presence, AI remains a novelty." },
            { icon: "⚡", title: "Cognitive Overload", pill: "UX Problem", pillClass: PILL_HAPPY, body: "Screen-based workflows generate notification floods and context switching fatigue. AI interaction needs to shift from click-based to presence-based — reducing cognitive load, not adding to it." },
            { icon: "🛡", title: "Trust Gap", pill: "Delegation Problem", pillClass: PILL_PURPLE, body: "Users are reluctant to delegate meaningful tasks to invisible systems. Without non-verbal feedback and persistent identity, AI agents feel opaque and untrustworthy — limiting real-world adoption." },
          ].map((card) => (
            <div key={card.title} className="flex flex-col gap-4 rounded-xl border border-[#21252e] bg-[#13161c] p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#21252e] bg-[#1a1d24] text-lg">{(card as { icon: string }).icon}</div>
              <div>
                <h3 className="text-[17px] font-semibold text-white">{card.title}</h3>
                <span className={`mt-2 inline-block ${card.pillClass}`}>{card.pill}</span>
                <p className="mt-3 text-[13px] leading-relaxed text-[#a0a0a0]">{card.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-8 rounded-xl border border-[#21252e] bg-[#1a1d24] px-6 py-4">
          <p className="flex-1 text-sm italic text-[#555]">
            &quot;People bond with entities. Not tools. Nearu enables AI systems to move from software utilities to trusted companions and collaborators.&quot;
          </p>
          <div className="flex gap-8">
            <div className="text-center"><div className="text-xl font-extrabold text-[#0099ff]">73%</div><div className="text-[10px] text-[#a0a0a0]">Gen Z feel lonely</div></div>
            <div className="text-center"><div className="text-xl font-extrabold text-[#0099ff]">40M+</div><div className="text-[10px] text-[#a0a0a0]">Digital nomads</div></div>
            <div className="text-center"><div className="text-xl font-extrabold text-[#0099ff]">24.5%</div><div className="text-[10px] text-[#a0a0a0]">Emotion AI CAGR</div></div>
          </div>
        </div>
      </section>

      {/* ═══ SLIDE 3 — OUR SOLUTION ═══ */}
      <section className="container px-6 py-16">
        <DeckSectionLabel>Our Solution</DeckSectionLabel>
        <DeckDivider />
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-[clamp(1.75rem,3vw,2.35rem)] font-bold leading-tight text-white">
              The Emotional
              <br />
              Layer AI Has
              <br />
              Been Missing.
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-[#a0a0a0]">
              Nearu is not an AI model. It&apos;s the emotional intelligence layer that gives AI agents the ability to recognize human emotion, respond with empathy, develop unique personality over time, and build persistent, evolving relationships.
            </p>
            <div className="my-4 h-px w-full bg-[#21252e]" />
            <p className="mb-4 text-[13px] leading-relaxed text-[#a0a0a0]">
              AI models provide intelligence.<br />
              <span className="font-semibold text-white">Nearu provides presence, empathy, and social legibility.</span>
            </p>
            <ul className="space-y-2 text-[13px] text-[#a0a0a0]">
              {["Increases AI adoption & retention", "Increases user trust and tolerance", "Increases perceived intelligence of AI agents", "Increases frequency of use & engagement"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#22c55e]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-[#555]">Five-Layer Soul Engine™</div>
            {[
              { num: "01", pill: "INPUT", pillClass: PILL_CALM, color: "#38bdf8", title: "Sensing", desc: "Computer vision · 360° mic array · Touch sensor · ToF proximity" },
              { num: "02", pill: "CORE IP", pillClass: PILL_PURPLE, color: "#a78bfa", title: "NearuVibe™", desc: "Prosodic emotion engine — translates raw signals into emotional context" },
              { num: "03", pill: "MEMORY", pillClass: PILL_HAPPY, color: "#f59e0b", title: "Agentic Core", desc: "Vector DB · Personality Matrix · Context Window — persistent identity" },
              { num: "04", pill: "SWAPPABLE", pillClass: PILL_ACCENT, color: "#0099ff", title: "LLM Layer", desc: "AI-agnostic — GPT, Claude, Gemini, or on-premise. No rewiring required" },
              { num: "05", pill: "OUTPUT", pillClass: PILL_GREEN, color: "#22c55e", title: "Embodiment", desc: "Expressive avatar — micro-expressions, body language, LED mood cues" },
            ].map((layer) => (
              <div key={layer.num} className="relative mb-2.5 flex items-center gap-3 overflow-hidden rounded-lg border border-[#21252e] bg-[#13161c] py-3.5 pl-4 pr-4">
                <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: layer.color }} />
                <span className="w-5 shrink-0 text-[11px] font-bold text-[#555]">{layer.num}</span>
                <span className={`shrink-0 ${layer.pillClass}`} style={{ fontSize: 9 }}>{layer.pill}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-semibold text-white">{layer.title}</div>
                  <div className="text-[11px] leading-snug text-[#a0a0a0]">{layer.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SLIDE 4 — NEARUVIBE ═══ */}
      <section className="container px-6 py-16">
        <DeckSectionLabel>Technology</DeckSectionLabel>
        <DeckDivider />
        <h2 className="text-[clamp(1.5rem,2.5vw,2.125rem)] font-bold text-white">
          <span className="text-[#0099ff]">NearuVibe™</span> — The Emotion Engine
        </h2>
        <p className="mt-1 max-w-[640px] text-[14px] leading-relaxed text-[#a0a0a0]">
          Three independent signal channels fused into one structured emotional state. Returned as reliable JSON — no hallucinated labels, no free-text parsing.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { pill: "Acoustic", pillClass: PILL_CALM, title: "Voice Prosody", sub: "Tone, pitch, volume, pace & tremor analysis from raw audio.", items: ["Tone, pitch & pace detection", "Micro-intonation & tremor", "Input: WAV, WebM, MP3, OGG", "~1.2–1.5s per 30s of audio"], quote: "\"I'm fine\" in a trembling voice → system reports anxiety, not neutrality" },
            { pill: "Semantic", pillClass: PILL_HAPPY, title: "Word Meaning", sub: "Emotional meaning behind spoken words — linguistic context, subtext, and intent.", items: ["Linguistic & emotional context", "Sarcasm & masking detection", "Derived from same audio transcript", "Per-sentence analysis"], quote: "Acoustic outweighs semantic — how you say it matters more than what you say" },
            { pill: "Facial", pillClass: PILL_PURPLE, title: "Micro-Expressions", sub: "Computer vision reads facial expressions and engagement cues in real time.", items: ["AffectNet-trained VER model", "~450K face training dataset", "50–100ms per frame", "Frames discarded post-analysis"], quote: "On-premise VER option for healthcare & regulated industries" },
          ].map((ch) => (
            <div key={ch.title} className="flex flex-col overflow-hidden rounded-xl border border-[#21252e] bg-[#13161c]">
              <div className="border-b border-[#21252e] px-5 pt-5 pb-4">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#21252e] bg-[#1a1d24]" />
                  <span className={ch.pillClass}>{ch.pill}</span>
                </div>
                <h3 className="text-[16px] font-semibold text-white">{ch.title}</h3>
                <p className="mt-1 text-[12px] leading-snug text-[#a0a0a0]">{ch.sub}</p>
              </div>
              <div className="flex-1 space-y-3 px-5 py-4">
                {(ch.items as string[]).map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />
                    <span className="text-[12.5px] leading-snug text-[#a0a0a0]">{item}</span>
                  </div>
                ))}
                <div className="border-t border-[#21252e] pt-3 text-[11px] italic text-[#555]">
                  {ch.quote}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-[#21252e] bg-[#1a1d24] px-5 py-3 text-[11.5px] text-[#555]">
          <strong className="text-[#a0a0a0]">Fusion Rules:</strong>
          <span><span className="font-semibold text-[#0099ff]">acoustic &gt; semantic</span></span>
          <span className="text-[#21252e]">·</span>
          <span>neutral requires consensus across all channels</span>
          <span className="text-[#21252e]">·</span>
          <span>missing channels dropped — never defaulted</span>
          <span className="text-[#21252e]">·</span>
          <span>highest confidence wins conflicts</span>
        </div>
      </section>

      {/* ═══ SLIDE 5 — USE CASES ═══ */}
      <section className="container px-6 py-16">
        <DeckSectionLabel>Use Cases</DeckSectionLabel>
        <DeckDivider />
        <h2 className="mb-6 text-[clamp(1.5rem,2.5vw,2.125rem)] font-bold text-white">
          Where Emotional Intelligence Changes Everything
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { pill: "AI Assistants", pillClass: PILL_ACCENT, title: "AI Agents & Avatars", body: "Detect user frustration or confidence in real time. Adapt tone, pacing, and response strategy before the LLM responds." },
            { pill: "Healthcare", pillClass: PILL_RED, title: "Mental Health & Remote Care", body: "Detect emotional distress, respond with empathy, and escalate to human care when clinical signals appear." },
            { pill: "Enterprise", pillClass: PILL_HAPPY, title: "HR & Employee Experience", body: "Emotionally-aware onboarding guides. Contextual support arrives before the question is asked." },
            { pill: "Customer Experience", pillClass: PILL_CALM, title: "Customer Support & CX", body: "Maintain emotional presence during processing pauses. Fewer escalations, higher CSAT." },
            { pill: "Robotics", pillClass: PILL_PURPLE, title: "Companion Robotics", body: "Persistent memory + evolving emotional model. Relationships that compound over time." },
            { pill: "Learning", pillClass: PILL_GREEN, title: "Learning & Training", body: "Reads frustration, confusion, and confidence signals — not just clicks. Adapts in the moment." },
          ].map((uc) => (
            <div key={uc.title} className="flex flex-col gap-2.5 rounded-xl border border-[#21252e] bg-[#13161c] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#21252e] bg-[#1a1d24]" />
                <span className={uc.pillClass}>{uc.pill}</span>
              </div>
              <h3 className="text-[15px] font-semibold text-white">{uc.title}</h3>
              <p className="text-[12px] leading-relaxed text-[#a0a0a0]">{uc.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SLIDE 6 — MARKET ═══ */}
      <section className="container px-6 py-16">
        <DeckSectionLabel>Market Opportunity</DeckSectionLabel>
        <DeckDivider />
        <h2 className="text-[clamp(1.5rem,2.5vw,2.125rem)] font-bold text-white">
          A Dual-Market Opportunity at Inflection Point
        </h2>
        <p className="mt-2 max-w-[720px] text-[13px] leading-relaxed text-[#a0a0a0]">
          Three forces converging now: edge AI feasibility · robotics explosion · hardware costs collapsed 80% in 5 years · <em className="text-[#555]">Affective Computing TAM: $100B+ by 2030 (CAGR 34%)</em>
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-[rgba(0,153,255,0.3)] bg-[#13161c] p-5">
            <div className="mb-4 h-0.5 w-full rounded bg-[#0099ff]" />
            <span className={PILL_ACCENT}>Primary</span>
            <h3 className="mt-2 text-[18px] font-semibold text-white">B2B — Robotics & AI Platforms</h3>
            <p className="mt-3 text-[13px] leading-relaxed text-[#a0a0a0]">
              SDK / API licensing of the Soul Engine™ to robotics manufacturers, AI assistant platforms, smart appliance makers, and enterprise AI deployments.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                ["$7.9B→$32B", "Social Robots Market 2025 → 2030"],
                ["32%", "Social Robotics CAGR 2025–2030"],
                ["$13.8B", "Emotion AI Market by 2030"],
                ["24.5%", "Emotion AI CAGR to 2030"],
              ].map(([val, label]) => (
                <div key={label} className="rounded-lg border border-[#21252e] bg-[#1a1d24] p-3">
                  <div className="text-lg font-extrabold text-[#0099ff]">{val}</div>
                  <div className="text-[11px] text-[#a0a0a0]">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-[#21252e] bg-[#13161c] p-5">
            <div className="mb-4 h-0.5 w-full rounded bg-[#6b7280]" />
            <span className={PILL_NEUTRAL}>Secondary</span>
            <h3 className="mt-2 text-[18px] font-semibold text-white">B2C — Consumer Validation</h3>
            <p className="mt-3 text-[13px] leading-relaxed text-[#a0a0a0]">
              The NEARU holographic companion device serves as our technology showcase and direct-to-consumer GTM — validating the Soul Engine™ with real users.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                ["$10.8B→$94B", "AI Companion Market 2024 → 2034"],
                ["24%", "AI Companion CAGR 2024–2034"],
                ["40M+", "Digital Nomads globally"],
                ["73%", "Gen Z report feeling lonely"],
              ].map(([val, label]) => (
                <div key={label} className="rounded-lg border border-[#21252e] bg-[#1a1d24] p-3">
                  <div className="text-lg font-extrabold text-[#a0a0a0]">{val}</div>
                  <div className="text-[11px] text-[#a0a0a0]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SLIDE 7 — COMPETITIVE ADVANTAGE ═══ */}
      <section className="container px-6 py-16">
        <DeckSectionLabel>Competitive Advantage</DeckSectionLabel>
        <DeckDivider />
        <h2 className="text-[clamp(1.5rem,2.5vw,2.125rem)] font-bold text-white">
          What Nobody Else Has
        </h2>
        <p className="mt-2 max-w-[640px] text-[14px] leading-relaxed text-[#a0a0a0]">
          12–18 months ahead in a domain nobody else is focused on, with production-grade APIs developers can integrate today.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Three-Channel Decomposition", body: "Separating acoustic from semantic emotion is non-obvious — most systems treat voice as one signal. Independent analysis produces dramatically better results." },
            { title: "Fusion Calibration", body: "Acoustic outweighs semantic. Neutral requires consensus. Missing channels dropped — never defaulted. These rules come from extensive real-world testing." },
            { title: "Structured Machine-Readable Output", body: "Guaranteed consistent JSON schema on every call. No parsing LLM free-text. No hallucinated labels. Reliable structured data for production systems." },
            { title: "Vertical Optimization", body: "Built exclusively for emotion-aware AI interaction. Horizontal platforms won't prioritize the dedicated prompt engineering and latency tuning required." },
            { title: "Privacy-First Architecture", body: "Camera frames processed and immediately discarded — never stored. On-premise VER option for regulated industries. GDPR, CCPA, BIPA compatible." },
            { title: "Speed of Iteration", body: "Fusion rule improvements shipped weekly. A feature team at Google or OpenAI would take quarters to push similar changes. We ship in days." },
          ].map((m) => (
            <div key={m.title} className="flex flex-col gap-3 rounded-xl border border-[#21252e] border-l-[2px] border-l-[rgba(0,153,255,0.4)] bg-[#13161c] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#21252e] bg-[#1a1d24]" />
                <h3 className="text-[14px] font-semibold tracking-tight text-white">{m.title}</h3>
              </div>
              <p className="text-[12px] leading-relaxed text-[#a0a0a0]">{m.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SLIDE 8 — BUSINESS MODEL ═══ */}
      <section className="container px-6 py-16">
        <DeckSectionLabel>Business Model</DeckSectionLabel>
        <DeckDivider />
        <h2 className="text-[clamp(1.5rem,2.5vw,2.125rem)] font-bold text-white">
          Hardware-Enabled SaaS
        </h2>
        <p className="mt-1 text-[14px] text-[#a0a0a0]">
          Monetizes like SaaS · Retains like hardware · Scales like a platform
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            { pill: "01 · Primary Revenue", pillClass: PILL_ACCENT, bar: "#0099ff", title: "B2B SDK / API Licensing", metric: "Target:\n$1–3M ARR", metricColor: "#0099ff", body: "Per-seat or usage-based licensing of the Soul Engine™ to robotics OEMs, AI platform providers, and enterprise deployments." },
            { pill: "02 · CAC Offset", pillClass: PILL_CALM, bar: "#38bdf8", title: "Device Hardware Sales", metric: "$299–$399\ndevice price", metricColor: "#38bdf8", body: "NEARU device hardware sold at margin. Offsets customer acquisition cost. Creates physical lock-in." },
            { pill: "03 · Recurring", pillClass: PILL_PURPLE, bar: "#a78bfa", title: "Subscription (Soul Cloud™)", metric: "$19–$29 /mo\nper user", metricColor: "#a78bfa", body: "Monthly subscription unlocks full AI capability — cloud processing, model upgrades, expanded memory." },
            { pill: "04 · High Margin", pillClass: PILL_HAPPY, bar: "#f59e0b", title: "Digital Goods Store", metric: "70%+\ngross margin", metricColor: "#f59e0b", body: "Avatar skins, personalities, voice packs — high-margin digital goods that drive ARPU expansion." },
          ].map((bm) => (
            <div key={bm.title} className="relative overflow-hidden rounded-xl border border-[#21252e] bg-[#13161c] p-5">
              <div className="absolute left-0 right-0 top-0 h-0.5" style={{ background: bm.bar }} />
              <div className="mt-2 flex justify-between gap-4">
                <div>
                  <span className={`${bm.pillClass}`}>{bm.pill}</span>
                  <h3 className="mt-2 text-[18px] font-semibold text-white">{bm.title}</h3>
                </div>
                <div className="text-right text-[13px] font-bold leading-snug" style={{ color: bm.metricColor }}>{bm.metric}</div>
              </div>
              <p className="mt-3 text-[12.5px] leading-relaxed text-[#a0a0a0]">{bm.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SLIDE 9 — TRACTION & ROADMAP ═══ */}
      <section className="container px-6 py-16">
        <DeckSectionLabel>Traction & Roadmap</DeckSectionLabel>
        <DeckDivider />
        <h2 className="mb-6 text-[clamp(1.5rem,2.5vw,2.125rem)] font-bold text-white">
          From Software to Scale
        </h2>
        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          <div className="flex flex-col rounded-xl border border-[#21252e] bg-[#13161c] p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#22c55e]">We Can Demonstrate</span>
            </div>
            <h3 className="mb-4 text-[16px] font-semibold text-white">What&apos;s Live Today</h3>
            {[
              { pill: "Live Now", pillClass: PILL_GREEN, border: "green", body: "Software Prototype — Soul Engine™ · NearuVibe™ · Mobile + Desktop Demo" },
              { pill: "Apr 2026", pillClass: PILL_ACCENT, border: "accent", body: "Hardware Prototype — NEARU device + full sensor loop integration" },
              { pill: "Q3 2026", pillClass: PILL_CALM, border: "calm", body: "Design Partners — 3–5 robotics/OEM pilots with SDK integration" },
              { pill: "Active Now", pillClass: PILL_HAPPY, border: "happy", body: "B2B Pipeline — Partner conversations open" },
            ].map((t) => (
              <div key={t.body} className="mb-2.5 rounded-lg border border-[#21252e] border-l-2 border-l-[#0099ff] bg-[#1a1d24] py-3 pl-4 pr-3">
                <span className={`${t.pillClass}`} style={{ fontSize: 8 }}>{t.pill}</span>
                <div className="mt-1.5 text-[12px] font-medium text-white">{t.body}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 lg:flex-row">
            {[
              { time: "Q1 2026", pill: "Now", pillClass: PILL_GREEN, bar: "#22c55e", title: "Software Prototype", items: ["Soul Engine™ core complete", "NearuVibe™ emotion model", "Mobile + desktop app demo", "Ready for investor demos"] },
              { time: "Q2 2026", pill: "Next", pillClass: PILL_ACCENT, bar: "#0099ff", title: "B2C Early Access", items: ["Waitlist + pre-orders", "User data collection begins", "Community building"] },
              { time: "Q2–Q3 2026", pill: "Soon", pillClass: PILL_CALM, bar: "#38bdf8", title: "Hardware Prototype", items: ["NEARU device delivered", "Full sensor integration", "End-to-end emotion loop", "Design partner demos"] },
              { time: "Q3–Q4 2026", pill: "Target", pillClass: PILL_HAPPY, bar: "#f59e0b", title: "B2B GTM Launch", items: ["SDK released to partners", "First robotics integrations", "API licensing revenue"] },
            ].map((phase) => (
              <div key={phase.title} className="flex-1 rounded-xl border border-[#21252e] bg-[#13161c] p-4">
                <div className="h-0.5 w-full rounded" style={{ background: phase.bar }} />
                <div className="mt-2 flex justify-between">
                  <span className={phase.pillClass} style={{ fontSize: 8 }}>{phase.pill}</span>
                  <span className="text-[11px] text-[#555]">{phase.time}</span>
                </div>
                <div className="mt-2 text-[14px] font-bold text-white">{phase.title}</div>
                <ul className="mt-2 space-y-1 pl-3 text-[11px] text-[#a0a0a0]">
                  {(phase.items as string[]).map((item) => (
                    <li key={item} className="relative before:absolute before:-left-3 before:content-['→'] before:text-[#555]">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SLIDE 10 — TEAM ═══ */}
      <section className="container px-6 py-16">
        <DeckSectionLabel>The Team</DeckSectionLabel>
        <DeckDivider />
        <h2 className="mb-8 text-[clamp(1.5rem,2.5vw,2.125rem)] font-bold text-white">
          Built by People Who&apos;ve Done This Before
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { initial: "N", name: "Noa Shapiro", role: "Founder & CEO", bio: "12+ years in Business Development, Marketing & GTM. Hardware enthusiast passionate about human-centric AI. GMBA @ Reichman University." },
            { initial: "V", name: "Vladimir Kolesnikov", role: "Co-Founder & CTO", bio: "R&D executive & AI strategist, 10+ years. Former Head of R&D @ Elfi-Tech. Co-Founded AI Lab acquired by Zepp Health." },
            { initial: "K", name: "Kye Vatash", role: "VP Operations & Business Development", bio: "Business development & strategic partnerships. Operations specialist. GMBA @ Reichman University." },
            { initial: "D", name: "Doron Pryluk", role: "Strategic Advisor & Product Evangelist", bio: "COO @ Quack AI, former COO @ Colleen AI. Board Observer guiding fundraising strategy & long-term direction." },
            { initial: "✦", name: "Nearu Avatar", role: "Brand Ambassador", bio: "The heart of the company. A persistent, emotionally intelligent holographic avatar.", special: true },
          ].map((member) => (
            <div key={member.name} className="flex flex-col items-center rounded-xl border border-[#21252e] bg-[#13161c] p-5 text-center">
              <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 text-2xl font-bold ${member.special ? "border-[#0099ff] bg-gradient-to-br from-[#0a1628] to-[#001f4d] text-[#0099ff]" : "border-[rgba(0,153,255,0.4)] bg-[#1a1d24] text-[#0099ff]"}`}>
                {member.initial}
              </div>
              <div className="mt-3 text-[13px] font-bold text-white">{member.name}</div>
              <div className="mt-1 text-[11px] text-[#0099ff]">{member.role}</div>
              <div className="mx-auto my-3 h-px w-10 bg-[#21252e]" />
              <div className="text-[10.5px] leading-snug text-[#a0a0a0]">{member.bio}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SLIDE 11 — CTA ═══ */}
      <section className="container relative flex flex-col items-center px-6 py-24 text-center">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,80,180,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a0a0a0]">
            Get Involved
          </div>
          <div className="mb-8 h-0.5 w-9 bg-[#0099ff]" />
          <h2 className="max-w-[720px] text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-tight tracking-tight text-white">
            AI shouldn&apos;t feel like a tool.
            <br />
            It should feel like <span className="text-[#0099ff]">someone.</span>
          </h2>
          <p className="mt-5 max-w-[560px] text-[15px] leading-relaxed text-[#a0a0a0]">
            We&apos;re looking for design partners, robotics OEMs, and investors who believe the next frontier of AI is relational.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="inline-flex rounded-lg bg-[#0099ff] px-8 py-3.5 text-[15px] font-semibold text-white no-underline transition hover:opacity-90">
              Request a Demo
            </Link>
            <Link href="/contact" className="inline-flex rounded-lg border border-[#2a2f3a] bg-transparent px-8 py-3.5 text-[15px] font-semibold text-white no-underline transition hover:border-white/20 hover:bg-white/5">
              Become a Design Partner
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-5 rounded-lg border border-[#21252e] bg-[#13161c] px-8 py-4 text-[13px] text-[#a0a0a0]">
            <a href="mailto:noa@nnearu.com" className="text-[#0099ff] no-underline hover:underline">noa@nnearu.com</a>
            <span className="text-[#21252e]">·</span>
            <span>+972-54-5884883</span>
            <span className="text-[#21252e]">·</span>
            <Link href="https://www.nnearu.com" className="text-[#0099ff] no-underline hover:underline">www.nnearu.com</Link>
            <span className="text-[#21252e]">·</span>
            <span className="text-[#555]">169 Madison Ave STE 78337, New York, NY 10016</span>
          </div>
          <div className="mt-4 text-[11px] font-semibold uppercase tracking-widest text-[#555]">
            Soul Engine™ · NearuVibe™ · © 2026 Nearu
          </div>
        </div>
      </section>
    </main>
  );
}
