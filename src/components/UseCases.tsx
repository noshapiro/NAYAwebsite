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
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const CARD_WIDTH = 340;
const CARD_GAP = 12;
const SCROLL_STEP = 352; /* one card + gap */

const ICON_MAP = {
  Building2,
  BookOpen,
  Headphones,
  Activity,
  TrendingUp,
  Bot,
  Car,
} as const;

const USE_CASES_IMAGES_VERSION = 2;

const cases = [
  {
    Icon: "Building2" as keyof typeof ICON_MAP,
    image: "/use-cases/enterprise.png",
    label: "Enterprise",
    title: "Employee Experience",
    body: "Avatar guides new hires from day one — contextually aware, emotionally present. Help arrives before the question is asked.",
    outcome: "↑ Retention · ↓ Training overhead",
  },
  {
    Icon: "BookOpen" as keyof typeof ICON_MAP,
    image: "/use-cases/edtech.png",
    label: "EdTech",
    title: "Learning & Training",
    body: "Reads frustration and confidence signals — not just clicks — to adapt instruction in the moment. A trainer that feels when you're lost.",
    outcome: "↑ Retention · Adaptive pacing",
  },
  {
    Icon: "Headphones" as keyof typeof ICON_MAP,
    image: "/use-cases/cx-support.png",
    label: "CX / Support",
    title: "Customer Experience",
    body: "Maintains active social presence during processing. Fills the silence. Higher CSAT, fewer escalations, deeper trust.",
    outcome: "↑ CSAT · ↓ Escalations",
  },
  {
    Icon: "Activity" as keyof typeof ICON_MAP,
    image: "/use-cases/healthcare.png",
    label: "Healthcare",
    title: "Mental Health & Care",
    body: "EQ layer for remote diagnostic agents — detecting emotional distress and escalating to human care when needed.",
    outcome: "Safer remote care · ↑ Patient trust",
  },
  {
    Icon: "TrendingUp" as keyof typeof ICON_MAP,
    image: "/use-cases/sales-marketing.png",
    label: "Sales & Marketing",
    title: "Conversion & GTM",
    body: "Reads buying intent and mirrors the emotional register of a skilled sales rep. Visitors engage longer because they feel genuinely met.",
    outcome: "↑ Engagement · ↑ Conversion",
  },
  {
    Icon: "Bot" as keyof typeof ICON_MAP,
    image: "/use-cases/robotics.png",
    label: "Robotics",
    title: "Companion Robotics",
    body: "Persistent memory and evolving emotional model. The relationship compounds — building familiarity and trust that drives category loyalty.",
    outcome: "Deeper attachment · ↑ Retention",
  },
  {
    Icon: "Car" as keyof typeof ICON_MAP,
    image: "/use-cases/automotive.png",
    label: "Automotive",
    title: "In-Car Voice Assistants",
    body: "Emotion-aware voice AI for the cabin — detects driver stress, fatigue, or frustration and adapts suggestions. Keeps interactions calm and focused for safer driving.",
    outcome: "↑ Driver focus · Safer interactions",
  },
] as const;

function MetricsRow({ outcome }: { outcome: string }) {
  const parts = outcome.split(" · ");
  return (
    <div className="use-case-card__metrics">
      {parts.map((part, i) => {
        const trimmed = part.trim();
        const arrow = trimmed.startsWith("↑") || trimmed.startsWith("↓") ? trimmed.slice(0, 1) : null;
        const rest = arrow ? trimmed.slice(1).trim() : trimmed;
        return (
          <span key={i}>
            {i > 0 && <span className="dot"> · </span>}
            {arrow && <span className="arrow">{arrow}</span>}
            {arrow && rest ? " " : null}
            {rest}
          </span>
        );
      })}
    </div>
  );
}

function UseCaseCard({
  IconKey,
  image,
  label,
  title,
  body,
  outcome,
}: {
  IconKey: keyof typeof ICON_MAP;
  image: string;
  label: string;
  title: string;
  body: string;
  outcome: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = !imgFailed;
  const Icon = ICON_MAP[IconKey];

  return (
    <article className="use-case-card">
      <div className="use-case-card__image-wrap">
        {showImage ? (
          <Image
            src={`${image}?v=${USE_CASES_IMAGES_VERSION}`}
            alt=""
            width={340}
            height={204}
            className="object-cover object-center block w-full h-full"
            sizes="340px"
            unoptimized
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="use-case-card__image-placeholder">
            <Icon size={40} strokeWidth={1.5} />
          </div>
        )}
      </div>
      <div className="use-case-card__content">
        <div className="use-case-card__category">{label}</div>
        <h3 className="use-case-card__title">{title}</h3>
        <p className="use-case-card__body">{body}</p>
        <MetricsRow outcome={outcome} />
      </div>
    </article>
  );
}

function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function UseCases() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const left = el.scrollLeft;
    const maxLeft = el.scrollWidth - el.clientWidth;
    setAtStart(left <= 0);
    setAtEnd(maxLeft <= 0 || left >= maxLeft - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = (delta: number) => {
    scrollRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

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

      {/* Carousel — full viewport width, arrows on sides (LinkedIn-style) */}
      <div className="relative z-10 mt-12 use-cases-carousel-wrapper">
        <button
          type="button"
          onClick={() => scroll(-SCROLL_STEP)}
          disabled={atStart}
          className="use-cases-carousel-arrow use-cases-carousel-arrow--left"
          aria-label="Previous"
        >
          <ArrowLeft />
        </button>
        <button
          type="button"
          onClick={() => scroll(SCROLL_STEP)}
          disabled={atEnd}
          className="use-cases-carousel-arrow use-cases-carousel-arrow--right"
          aria-label="Next"
        >
          <ArrowRight />
        </button>
        <div
          ref={scrollRef}
          className="use-cases-carousel-track"
        >
          <div className="use-cases-track-inner">
            {cases.map((c, i) => (
              <UseCaseCard
                key={`${c.title}-${i}`}
                IconKey={c.Icon}
                image={c.image}
                label={c.label}
                title={c.title}
                body={c.body}
                outcome={c.outcome}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
