"use client";

import {
  Building2,
  BookOpen,
  Headphones,
  Activity,
  TrendingUp,
  Bot,
  Car,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Reveal } from "./Reveal";

const ICON_CLASS = "h-8 w-8 shrink-0 stroke-[var(--accent)]";
const STROKE = { strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const CARD_WIDTH = 340;
const CARD_GAP = 20;
const SET_WIDTH = (CARD_WIDTH + CARD_GAP) * 7; // one full set
/** Увеличьте на 1 после замены картинок в public/use-cases/, чтобы сбросить кэш */
const USE_CASES_IMAGES_VERSION = 2;

const cases = [
  {
    Icon: Building2,
    image: "/use-cases/enterprise.png",
    label: "Enterprise",
    title: "Employee Experience",
    body: "Avatar guides new hires from day one — contextually aware, emotionally present. Help arrives before the question is asked.",
    outcome: "↑ Retention · ↓ Training overhead",
  },
  {
    Icon: BookOpen,
    image: "/use-cases/edtech.png",
    label: "EdTech",
    title: "Learning & Training",
    body: "Reads frustration and confidence signals — not just clicks — to adapt instruction in the moment. A trainer that feels when you're lost.",
    outcome: "↑ Retention · Adaptive pacing",
  },
  {
    Icon: Headphones,
    image: "/use-cases/cx-support.png",
    label: "CX / Support",
    title: "Customer Experience",
    body: "Maintains active social presence during processing. Fills the silence. Higher CSAT, fewer escalations, deeper trust.",
    outcome: "↑ CSAT · ↓ Escalations",
  },
  {
    Icon: Activity,
    image: "/use-cases/healthcare.png",
    label: "Healthcare",
    title: "Mental Health & Care",
    body: "EQ layer for remote diagnostic agents — detecting emotional distress and escalating to human care when needed. Empathy at machine scale.",
    outcome: "Safer remote care · ↑ Patient trust",
  },
  {
    Icon: TrendingUp,
    image: "/use-cases/sales-marketing.png",
    label: "Sales & Marketing",
    title: "Conversion & GTM",
    body: "Reads buying intent and mirrors the emotional register of a skilled sales rep. Visitors engage longer because they feel genuinely met.",
    outcome: "↑ Engagement · ↑ Conversion",
  },
  {
    Icon: Bot,
    image: "/use-cases/robotics.png",
    label: "Robotics",
    title: "Companion Robotics",
    body: "Persistent memory and evolving emotional model. The relationship compounds — building familiarity and trust that drives category loyalty.",
    outcome: "Deeper attachment · ↑ Retention",
  },
  {
    Icon: Car,
    image: "/use-cases/automotive.png",
    label: "Automotive",
    title: "In-Car Voice Assistants",
    body: "Emotion-aware voice AI for the cabin — detects driver stress, fatigue, or frustration and adapts tone and suggestions. Keeps interactions calm and focused for safer, more natural driving.",
    outcome: "↑ Driver focus · Safer interactions",
  },
] as const;

function CarouselCard({
  Icon,
  image,
  label,
  title,
  body,
  outcome,
}: {
  Icon: typeof Building2;
  image: string;
  label: string;
  title: string;
  body: string;
  outcome: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = !imgFailed;

  return (
    <div className="flex h-full w-[340px] shrink-0 flex-col overflow-hidden rounded-[12px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition hover:border-[var(--accent-25)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      {/* Картинка из public/use-cases/ или плейсхолдер с иконкой */}
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-gradient-to-br from-[var(--surface-2)] via-[var(--accent-08)] to-[var(--surface-2)]">
        {showImage && (
          <Image
            src={`${image}?v=${USE_CASES_IMAGES_VERSION}`}
            alt=""
            fill
            className="object-cover"
            sizes="340px"
            unoptimized
            onError={() => setImgFailed(true)}
          />
        )}
        {!showImage && (
          <div className="flex h-full w-full items-center justify-center">
            <Icon className={`${ICON_CLASS} opacity-80`} fill="none" {...STROKE} />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.12em] text-[var(--accent)]">
          {label}
        </div>
        <h3 className="mt-2 text-[1.1rem] font-semibold tracking-[-0.02em] text-[var(--text)]">
          {title}
        </h3>
        <p className="mt-2.5 text-[0.88rem] leading-[1.65] text-[var(--text-2)]">
          {body}
        </p>
        <div className="mt-4 text-[0.75rem] font-semibold text-[var(--green)]">
          {outcome}
        </div>
      </div>
    </div>
  );
}

export function UseCases() {
  const [carouselPaused, setCarouselPaused] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[var(--bg)] py-16 md:py-20" id="use-cases">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(15,30,65,0.35) 0%, transparent 65%)",
        }}
      />
      <div className="container relative z-10">
        <Reveal className="text-center">
          <div className="flex flex-col items-center">
            <div className="label">Use Cases</div>
            <div className="divider-line" />
          </div>
          <h2 className="text-[clamp(2rem,3.5vw,3.2rem)] font-extrabold tracking-[-0.03em]">
            Built for Every AI
            <br />
            That Touches Humans
          </h2>
        </Reveal>
      </div>

      {/* Full-bleed carousel to screen edges */}
      <div
        className="relative mt-12 w-full overflow-hidden"
        onMouseEnter={() => setCarouselPaused(true)}
        onMouseLeave={() => setCarouselPaused(false)}
      >
        <div className="overflow-x-hidden pb-4 pt-2">
          <div
            className={`use-cases-track flex gap-5 ${carouselPaused ? "is-paused" : ""}`}
            style={{
              width: "max-content",
              ["--use-cases-set-width" as string]: `-${SET_WIDTH}px`,
            }}
          >
            {[...cases, ...cases].map((c, i) => (
              <div key={`${c.title}-${i}`} className="shrink-0">
<CarouselCard
                    Icon={c.Icon}
                    image={c.image}
                    label={c.label}
                    title={c.title}
                    body={c.body}
                    outcome={c.outcome}
                  />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
