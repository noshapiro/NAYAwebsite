"use client";

import { Server } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Reveal } from "./Reveal";

// Logos: place PNG (or SVG) files in public/llm-logos/ (openai.png, claude.png, etc.) to show them instead of abbreviations
const MODELS = [
  { abbr: "GP", name: "GPT", org: "OpenAI", color: "#10B981", logoSlug: "openai" },
  { abbr: "AN", name: "Claude", org: "Anthropic", color: "#FF9050", logoSlug: "claude" },
  { abbr: "GG", name: "Gemini", org: "Google", color: "#4285F4", logoSlug: "gemini" },
  { abbr: "MT", name: "Llama", org: "Meta", color: "#22D3A5", logoSlug: "llama" },
  { abbr: "DS", name: "DeepSeek", org: "DeepSeek", color: "#FBBF24", logoSlug: "deepseek" },
  { abbr: "LCL", name: "Local / On-Prem", org: "Air-gapped support", color: "#22D3A5", logoSlug: "local" },
] as const;

const STROKE = { strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function ModelLogo({ m }: { m: (typeof MODELS)[number] }) {
  const [trySvg, setTrySvg] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Local / On-Prem: use Server icon instead of image/abbr
  if (m.logoSlug === "local") {
    return (
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[var(--surface-2)]"
        style={{ color: m.color }}
      >
        <Server className="h-5 w-5" fill="none" {...STROKE} />
      </div>
    );
  }

  const logoSrc = `/llm-logos/${m.logoSlug}.${trySvg ? "svg" : "png"}`;
  const handleError = () => {
    if (!trySvg) setTrySvg(true);
    else setImgError(true);
  };

  if (!imgError) {
    return (
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[var(--surface-2)]">
        <Image
          src={logoSrc}
          alt=""
          width={40}
          height={40}
          className="object-contain p-1"
          unoptimized
          onError={handleError}
        />
      </div>
    );
  }

  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[var(--surface-2)]"
      style={{ color: m.color }}
    >
      <span className="font-mono text-[11px] font-bold tracking-tight">{m.abbr}</span>
    </div>
  );
}

export function AIAgnostic() {
  return (
    <section
      className="py-16 md:py-20"
      id="models"
      style={{ background: "linear-gradient(to bottom, #0e0e0e 0%, #0a0a0a 100%)" }}
    >
      <div className="container">
        <Reveal className="text-center">
          <div className="flex flex-col items-center">
            <div className="label">AI-Agnostic</div>
            <div className="divider-line" />
          </div>
          <h2 className="text-[clamp(2rem,3.5vw,3.2rem)] font-extrabold tracking-[-0.03em]">Works with Any LLM</h2>
          <p className="mx-auto mt-4 max-w-[640px] text-[1.05rem] leading-[1.7] text-[var(--text-2)]">
            Nearu treats the LLM as a swappable brain. Persona, memory, and emotional layer survive model swaps — no rewiring required.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MODELS.map((m) => (
              <div
                key={m.name}
                className="flex items-center gap-3 rounded-[14px] border p-4 backdrop-blur-[8px] transition hover:bg-[rgba(255,255,255,0.07)]"
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  borderColor: "rgba(255, 255, 255, 0.08)",
                }}
              >
                <ModelLogo m={m} />
                <div>
                  <div className="text-[0.85rem] font-extrabold text-[var(--text)]">{m.name}</div>
                  <div className="text-[0.75rem] text-[var(--text-3)]">{m.org}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
