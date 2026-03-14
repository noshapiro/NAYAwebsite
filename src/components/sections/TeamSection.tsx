"use client";

import Image from "next/image";
import { useState } from "react";

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
    name: "Kye Vatash",
    role: "VP Operations & Business Development",
    bio: "Business development and strategic partnerships specialist. Operations expert with a focus on growth and scaling. GMBA @ Reichman University.",
    image: "/team/kye.png",
    objectPosition: "center 15%",
    linkedin: "https://www.linkedin.com/in/kye-vatash/",
    twitter: null,
    isNearu: false,
  },
  {
    name: "Valeriia Shcherbina",
    role: "Marketing Lead",
    bio: "10+ years in international marketing and brand management across tech and fashion. Former Leading Brand Activations Specialist @ Reebok. Now building Nearu's market presence from the ground up.",
    image: "/team/valeriia.jpg",
    objectPosition: "center 10%",
    linkedin: "https://www.linkedin.com/in/valeriia-shcherbina/",
    twitter: null,
    isNearu: false,
  },
  {
    name: "Nearu",
    role: "Avatar",
    bio: "The heart of the company. A persistent, emotionally intelligent AI avatar designed to bridge the gap between human intent and machine execution. She's always listening.",
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

  return (
    <article
      className="group flex min-h-[200px] w-full cursor-pointer flex-row items-stretch overflow-hidden rounded-xl border border-[#1e1e1e] bg-[#111111] transition-[border-color] duration-150 hover:border-[rgba(0,153,255,0.3)]"
    >
      {/* Photo area (left) — fixed 160px */}
      <div
        className="relative w-[160px] shrink-0 overflow-hidden"
      >
        {!imgError ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            style={{ objectPosition }}
            sizes="160px"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="h-full w-full bg-[#181818]" />
        )}
        {isNearu && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 80% at 50% 30%, rgba(0,153,255,0.12), transparent 65%)",
            }}
            aria-hidden
          />
        )}
      </div>

      {/* Info area (right) — flex: 1, wide text area */}
      <div
        className="flex flex-1 flex-col justify-start overflow-hidden"
        style={{ padding: "16px 18px 16px" }}
      >
        <h3 className="font-bold text-white" style={{ fontSize: 15, marginBottom: 3 }}>
          {name}
        </h3>
        <p
          className="text-white/50"
          style={{ fontSize: 11, lineHeight: 1.3, marginBottom: 10 }}
        >
          {role}
        </p>
        <p
          className="block overflow-visible text-white/65"
          style={{ fontSize: 12, lineHeight: 1.6, marginBottom: 14 }}
        >
          {bio}
        </p>
        <div
          className="mt-auto flex items-center"
          style={{ gap: 6, paddingTop: 8 }}
        >
          <a
            href={linkedin}
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
      className="relative bg-[var(--bg)] py-16 md:py-20"
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
          <p
            className="mx-auto mt-4 max-w-[640px] text-center text-[16px] leading-relaxed"
            style={{ color: "#a0a0a0" }}
          >
            A small, senior team that has built, shipped, and scaled technology products before — and
            is doing it again.
          </p>
        </header>

        {/* Grid — 6 equal cards, 3 per row; stretch so row height matches */}
        <div
          className="mx-auto mt-12 grid items-stretch gap-3"
          style={{ maxWidth: 1100, gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}
        >
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
