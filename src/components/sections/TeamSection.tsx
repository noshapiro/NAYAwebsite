"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const TEAM = [
  {
    name: "Noa Shapiro",
    role: "Founder & CEO",
    bio: "12+ years in Business Development, Marketing & GTM. Hardware enthusiast passionate about human-centric AI. GMBA @ Reichman University.",
    image: "/team/noa.png",
    objectPosition: "center 10%",
    linkedin: "https://www.linkedin.com/in/noashapiro/",
    twitter: "https://x.com/shapirosaidwhat",
    isNearu: false,
  },
  {
    name: "Vladimir Kolesnikov",
    role: "Co-Founder & CTO",
    bio: "R&D executive and AI strategist with 10+ years of experience. Former Head of R&D at Elfi-Tech. Co-founded an AI Lab acquired by Zepp Health. Built core AI solutions for Samsung and Xiaomi. GMBA @ Reichman University.",
    image: "/team/vladimir.png",
    objectPosition: "center 15%",
    linkedin: "https://www.linkedin.com/in/vladimir-k-94980b65/",
    twitter: null,
    isNearu: false,
  },
  {
    name: "Doron Pryluk",
    role: "Strategic Advisor & Product Evangelist",
    bio: "COO at Quack AI, former COO at Colleen AI. Strategic Advisor and Board Observer guiding fundraising strategy, corporate narrative & long-term direction.",
    image: "/team/doron.png",
    objectPosition: "center 10%",
    linkedin: "https://www.linkedin.com/in/doronpryluk/",
    twitter: null,
    isNearu: false,
  },
  {
    name: "Michelle (Nearu)",
    role: "Avatar",
    bio: "The heart of the company and our living proof of concept. The first empathetic AI companion, showcasing our infrastructure.",
    image: "/team/nearu.png",
    objectPosition: "center 20%",
    linkedin: "https://www.linkedin.com/in/michelle-ai-companion/",
    twitter: "https://x.com/michelleNearu",
    isNearu: true,
  },
] as const;

function LinkedInIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" width="12" height="12" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.857L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialButtonClass =
  "flex h-7 w-7 shrink-0 items-center justify-center rounded-md border no-underline transition-all duration-150";
const socialButtonStyle = {
  background: "rgba(255,255,255,0.08)",
  borderColor: "rgba(255,255,255,0.12)",
  color: "rgba(255,255,255,0.6)",
};
const socialButtonHoverClass =
  "hover:bg-[rgba(0,153,255,0.15)] hover:border-[rgba(0,153,255,0.35)] hover:text-[#0099ff]";

function TeamCard({
  name,
  role,
  bio,
  image,
  objectPosition,
  linkedin,
  twitter,
  isNearu,
}: {
  name: string;
  role: string;
  bio: string;
  image: string;
  objectPosition: string;
  linkedin: string;
  twitter?: string | null;
  isNearu?: boolean;
}) {
  const [imgError, setImgError] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showMoreHint, setShowMoreHint] = useState(false);
  const bioRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (expanded) {
      setShowMoreHint(true);
      return;
    }
    const id = requestAnimationFrame(() => {
      if (bioRef.current)
        setShowMoreHint(bioRef.current.scrollHeight > bioRef.current.clientHeight);
    });
    return () => cancelAnimationFrame(id);
  }, [expanded, bio]);

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => setExpanded(!expanded)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setExpanded((x) => !x)}
      className={`group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border bg-[#111111] transition-[border-color,box-shadow] duration-150 hover:border-[rgba(0,153,255,0.35)] ${
        isNearu
          ? "border-[rgba(0,153,255,0.25)] shadow-[0_0_32px_rgba(0,153,255,0.08)]"
          : "border-[#1e1e1e]"
      }`}
    >
      <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-[#181818]">
        {!imgError ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            style={{ objectPosition }}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="h-full w-full bg-[#181818]" />
        )}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
          style={{
            background: "linear-gradient(to top, rgba(17,17,17,0.85), transparent)",
          }}
          aria-hidden
        />
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <h3 className="font-bold text-white" style={{ fontSize: 15, marginBottom: 3 }}>
          {name}
        </h3>
        <p
          className="text-white/50"
          style={{ fontSize: 11, lineHeight: 1.35, marginBottom: 10 }}
        >
          {role}
        </p>
        <p
          ref={bioRef}
          className={expanded ? "block text-white/65" : "bio-clamp-4 text-white/65"}
          style={{
            fontSize: 12,
            lineHeight: 1.55,
            marginBottom: 8,
            ...(expanded && { display: "block", overflow: "visible" }),
          }}
        >
          {bio}
        </p>
        {(showMoreHint || expanded) && (
          <span
            style={{
              fontSize: "11px",
              color: "#0099ff",
              cursor: "pointer",
              marginTop: "2px",
              display: "block",
              marginBottom: 8,
            }}
          >
            {expanded ? "↑ less" : "↓ more"}
          </span>
        )}
        <div className="mt-auto flex items-center pt-2" style={{ gap: 6 }}>
          <a
            href={linkedin}
            onClick={(e) => e.stopPropagation()}
            target={linkedin === "#" ? undefined : "_blank"}
            rel={linkedin === "#" ? undefined : "noopener noreferrer"}
            className={`${socialButtonClass} ${socialButtonHoverClass}`}
            style={socialButtonStyle}
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
          {twitter && (
            <a
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`${socialButtonClass} ${socialButtonHoverClass}`}
              style={socialButtonStyle}
              aria-label="X (Twitter)"
            >
              <TwitterIcon />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function TeamSection() {
  return (
    <section
      className="relative bg-[var(--bg)] py-12 md:py-20"
      id="team"
    >
      <div className="container relative z-10">
        {/* Header */}
        <header className="mx-auto max-w-[800px] text-center">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: "#a0a0a0" }}
          >
            THE TEAM
          </p>
          <div className="divider-line" />
          <h2
            className="text-center font-bold text-white"
            style={{ fontSize: 44, lineHeight: 1.1 }}
          >
            Built by People Who&apos;ve Done This Before
          </h2>
        </header>

        <div className="mx-auto mt-12 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {TEAM.map((member) => (
            <TeamCard
              key={member.name}
              name={member.name}
              role={member.role}
              bio={member.bio}
              image={member.image}
              objectPosition={member.objectPosition}
              linkedin={member.linkedin}
              twitter={"twitter" in member && member.twitter ? member.twitter : undefined}
              isNearu={member.isNearu ?? false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
