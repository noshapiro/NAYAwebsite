"use client";

import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Database,
  History,
  Lightbulb,
  Mic,
  SlidersHorizontal,
  Smile,
  Zap,
} from "lucide-react";
import { Reveal } from "./Reveal";

const STROKE = { strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function Tm({ children }: { children: string }) {
  return (
    <>
      {children}
      <sup className="ml-[0.05em] align-super text-[0.65em] font-normal leading-none opacity-75">™</sup>
    </>
  );
}

type FeatureLead = {
  Icon: typeof Zap;
  lead: string;
  rest: string;
};

type FeatureTitled = {
  Icon: typeof Mic;
  title: string;
  description: string;
};

const block1Features: FeatureLead[] = [
  {
    Icon: Zap,
    lead: "Real-time emotion read",
    rest: " across voice, face, and words — before the LLM responds.",
  },
  {
    Icon: SlidersHorizontal,
    lead: "Adaptive tone, pacing, and validation",
    rest: " that meet the user where they are — not where the script assumed.",
  },
  {
    Icon: Database,
    lead: "Persistent memory",
    rest: " — the relationship deepens instead of resetting every session.",
  },
];

const metricsPills = ["Sales & CX", "Healthcare", "Eldercare", "Onboarding", "EdTech"];

const block2Features: FeatureTitled[] = [
  {
    Icon: Mic,
    title: "Voice + face cloning",
    description:
      'High-fidelity likeness in audio and avatar. The surface layer most "twins" stop at.',
  },
  {
    Icon: Smile,
    title: "NearuVibe™ behavioral layer",
    description:
      "Not just emotion detection. The twin reads the other person's state in real time — and behaves the way the real human would in that exact moment. Empathy where they'd be empathetic, directness where they'd be direct.",
  },
  {
    Icon: BadgeCheck,
    title: "Personality Matrix",
    description:
      "Captures methodology, decision patterns, tone, beliefs, conversational style. The twin is constrained to the real person's way of thinking — not the LLM's generic baseline.",
  },
  {
    Icon: Lightbulb,
    title: "Tacit knowledge capture",
    description:
      "Structured interviews, shadow-mode learning, and adversarial probing extract the intuitive expertise the person has never written down.",
  },
  {
    Icon: History,
    title: "Persistent memory across sessions",
    description:
      "Every conversation builds relationship history. The twin remembers context, emotional state, and what mattered last time.",
  },
];

function FeatureRowLead({ Icon, lead, rest }: FeatureLead) {
  return (
    <li className="flex gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" {...STROKE} />
      <p className="text-[0.88rem] leading-[1.65] text-[var(--text-2)]">
        <span className="font-medium text-[var(--text)]">{lead}</span>
        {rest}
      </p>
    </li>
  );
}

function FeatureRowTitled({ Icon, title, description }: FeatureTitled) {
  return (
    <li className="flex gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" {...STROKE} />
      <div className="min-w-0">
        <p className="text-[0.88rem] font-medium leading-[1.4] text-[var(--text)]">
          {title.includes("NearuVibe") ? (
            <>
              <Tm>NearuVibe</Tm> behavioral layer
            </>
          ) : (
            title
          )}
        </p>
        <p className="mt-1 text-[0.82rem] leading-[1.6] text-[var(--text-3)]">{description}</p>
      </div>
    </li>
  );
}

function ProductCard({
  index,
  children,
  delay = 0,
}: {
  index: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full min-w-0 flex-1">
      <article className="flex h-full min-w-0 flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[#13131a] p-6 transition-colors duration-200 hover:border-[rgba(0,153,255,0.2)] md:p-8">
        <span className="text-[0.72rem] font-medium tracking-[0.08em] text-[rgba(245,245,245,0.3)]">{index}</span>
        {children}
      </article>
    </Reveal>
  );
}

function SectionLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[0.9rem] font-medium text-[var(--accent)] transition-opacity hover:opacity-80"
    >
      {children}
      <ArrowRight className="h-4 w-4 shrink-0" {...STROKE} />
    </a>
  );
}

export function WhatWeBuild() {
  return (
    <section
      id="what-we-build"
      className="!py-20"
      style={{ background: "#0a0a0f" }}
    >
      <div className="container">
        <Reveal>
          <p className="text-left text-[0.75rem] font-medium uppercase tracking-[0.12em] text-[rgba(245,245,245,0.45)]">
            What We Build
          </p>
        </Reveal>

        <div className="mt-8 flex flex-row max-sm:flex-col items-stretch gap-5 sm:gap-6">
          <ProductCard index="01">
            <h3 className="mt-3 text-[1.25rem] font-medium leading-[1.25] tracking-[-0.02em] text-[var(--text)]">
              Human-behaving AI for high-stakes environments
            </h3>
            <p className="mt-2 text-[0.9rem] font-medium text-[var(--accent)]">
              AI that performs where cold answers cost trust, retention, or safety.
            </p>
            <p className="mt-4 text-[0.88rem] font-normal leading-[1.7] text-[var(--text-2)]">
              When the cost of a robotic reply is real — a patient losing trust, a new hire dropping off, an elderly
              user feeling alone, a driver missing a warning — Nearu makes the AI behave like someone who actually gets
              it.
            </p>

            <ul className="mt-6 flex flex-col gap-4">
              {block1Features.map((f) => (
                <FeatureRowLead key={f.lead} {...f} />
              ))}
            </ul>

            <p className="mt-8 text-[0.68rem] font-medium uppercase tracking-[0.1em] text-[rgba(245,245,245,0.35)]">
              Where it moves the metrics
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {metricsPills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1 text-[0.75rem] font-medium text-[var(--text-2)]"
                >
                  {pill}
                </span>
              ))}
            </div>

            <SectionLink href="#use-cases">See use cases</SectionLink>
          </ProductCard>

          <ProductCard index="02" delay={0.08}>
            <h3 className="mt-3 text-[1.25rem] font-medium leading-[1.25] tracking-[-0.02em] text-[var(--text)]">
              Digital twins that behave like the real person
            </h3>
            <p className="mt-2 text-[0.9rem] font-medium text-[var(--accent)]">Not the voice. The whole person.</p>
            <p className="mt-4 text-[0.88rem] font-normal leading-[1.7] text-[var(--text-2)]">
              Anyone can clone a voice or upload some notes. We replicate everything that makes a person{" "}
              <em className="italic text-[var(--text)]">them</em> — their habits, the way they make
              decisions, their judgment, their tone, the way they show up. A real personality you can deploy at scale.
            </p>

            <p className="mt-8 text-[0.68rem] font-medium uppercase tracking-[0.1em] text-[rgba(245,245,245,0.35)]">
              How it works
            </p>
            <ul className="mt-4 flex flex-col gap-5">
              {block2Features.map((f) => (
                <FeatureRowTitled key={f.title} {...f} />
              ))}
            </ul>

            <p className="mt-8 rounded-[10px] border border-[var(--border)] bg-[rgba(0,153,255,0.04)] px-4 py-3.5 text-[0.82rem] leading-[1.65] text-[var(--text-2)]">
              <span className="font-medium text-[var(--text)]">The result:</span> a twin that maintains the real
              human&apos;s relationships, methodology, and presence at 10× their natural capacity. Usable for sleep
              consultants, lactation experts, coaches, therapists&apos; adjuncts, educators, executives.
            </p>

            <SectionLink href="/contact">Build a twin</SectionLink>
          </ProductCard>
        </div>
      </div>
    </section>
  );
}
