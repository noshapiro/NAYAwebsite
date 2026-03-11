"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const people = [
  {
    avatarFile: "noa.png",
    initials: "NS",
    name: "Noa Shapiro",
    role: "Founder & CEO",
    bio: "12+ years in Business Development, Marketing & GTM. Hardware enthusiast passionate about human-centric AI. BA Marketing Management, GMBA candidate at Reichman University.",
    bg: "bg-[linear-gradient(135deg,#2a2a3e,#1a1a2a)]",
    linkedinUrl: "https://www.linkedin.com/in/noashapiro/",
  },
  {
    avatarFile: "vladimir.png",
    initials: "VK",
    name: "Vladimir Kolesnikov",
    role: "Co-Founder & CTO",
    bio: "R&D executive & AI strategist, 10+ years experience. Former Head of R&D at Elfi-Tech. Co-Founded AI Lab acquired by Zepp Health. Deep LLM & agentic systems expertise.",
    bg: "bg-[linear-gradient(135deg,var(--accent-2),var(--accent))]",
    linkedinUrl: "https://www.linkedin.com/in/vladimir-k-94980b65/",
  },
  {
    avatarFile: "kye.png",
    initials: "KV",
    name: "Kye Vatash",
    role: "CBDO",
    bio: "Business development & strategic partnerships. Drives growth, GTM strategy, and revenue. GMBA candidate at Reichman University.",
    bg: "bg-[linear-gradient(135deg,var(--green),var(--accent))]",
    linkedinUrl: "https://www.linkedin.com/in/kye-vatash/",
  },
  {
    avatarFile: "doron.png",
    initials: "DP",
    name: "Doron Pryluk",
    role: "Strategic Advisor & Product Evangelist",
    bio: "COO at Quack AI, former COO at Colleen AI. Strategic Advisor and Board Observer guiding fundraising strategy, corporate narrative & long-term direction.",
    bg: "bg-[linear-gradient(135deg,#F59E0B,#EF4444)]",
    linkedinUrl: "https://www.linkedin.com/in/doronpryluk/",
  },
] as const;

const nearuData = {
  avatarFile: "nearu.png",
  name: "Nearu",
  role: "The Avatar",
  bio: "The face of our Soul Engine™ — context-aware, emotionally present, and always learning AI companion.",
};

function PersonColumn({
  person,
  index,
  isNearu,
}: {
  person: (typeof people)[number] | typeof nearuData;
  index: number;
  isNearu: boolean;
}) {
  const [imgError, setImgError] = useState(false);
  const avatarSrc = `/team/${person.avatarFile}`;
  const isPerson = "linkedinUrl" in person;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.07 }}
      className="group relative flex w-[280px] min-w-[280px] flex-col items-center py-10 px-8 text-center transition-colors hover:bg-white/[0.02]"
    >
      {isPerson ? (
        <a
          href={(person as (typeof people)[number]).linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-col items-center outline-none focus:ring-2 focus:ring-[#00d4ff] focus:ring-offset-2 focus:ring-offset-[var(--bg)]"
          aria-label={`${person.name} on LinkedIn`}
        >
          <div
            className="relative mb-7 flex shrink-0 items-center justify-center grayscale-[20%] transition-[filter] duration-300 group-hover:grayscale-0"
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "radial-gradient(circle, #1a2035 0%, #0e0e14 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {!imgError ? (
              <div
                className="relative overflow-hidden rounded-full"
                style={{
                  width: 100,
                  height: 100,
                  border: "2px solid rgba(100,160,255,0.3)",
                  boxShadow: "0 0 20px rgba(59,130,246,0.2), 0 0 0 1px rgba(59,130,246,0.1)",
                }}
              >
                <Image
                  src={avatarSrc}
                  alt={person.name}
                  fill
                  className="object-cover object-top"
                  sizes="100px"
                  unoptimized
                  onError={() => setImgError(true)}
                />
              </div>
            ) : (
              <div
                className={`flex h-[100px] w-[100px] items-center justify-center rounded-full text-xl font-extrabold text-white ${(person as (typeof people)[number]).bg}`}
              >
                {(person as (typeof people)[number]).initials}
              </div>
            )}
          </div>
          <span className="text-[18px] font-semibold tracking-[-0.02em] text-white">
            {person.name}
          </span>
        </a>
      ) : (
        <>
          <div
            className="relative mb-7 flex shrink-0 items-center justify-center grayscale-[20%] transition-[filter] duration-300 group-hover:grayscale-0"
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "radial-gradient(circle, #1a2035 0%, #0e0e14 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {!imgError ? (
              <div
                className="relative overflow-hidden rounded-full"
                style={{
                  width: 100,
                  height: 100,
                  border: "2px solid rgba(100,160,255,0.3)",
                  boxShadow: "0 0 20px rgba(59,130,246,0.2), 0 0 0 1px rgba(59,130,246,0.1)",
                }}
              >
                <Image
                  src={avatarSrc}
                  alt={person.name}
                  fill
                  className="object-cover object-top"
                  sizes="100px"
                  unoptimized
                  onError={() => setImgError(true)}
                />
              </div>
            ) : (
              <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full text-xl font-extrabold text-white bg-[linear-gradient(135deg,var(--accent),var(--accent-2))]">
                N
              </div>
            )}
          </div>
          <span className="text-[18px] font-semibold tracking-[-0.02em] text-white">
            {person.name}
          </span>
        </>
      )}

      <span
        className="mt-0 mb-5 text-[11px] font-medium uppercase tracking-[0.1em]"
        style={{ color: isNearu ? "#7c3aed" : "#00d4ff" }}
      >
        {person.role}
      </span>

      <p className="mx-auto max-w-[200px] text-[13px] leading-[1.65]" style={{ color: "rgba(255,255,255,0.45)" }}>
        {person.bio}
      </p>
    </motion.div>
  );
}

export function Team() {
  return (
    <section className="relative overflow-hidden bg-[#0e0e0e] py-[120px]" id="team">
      {/* Subtle radial glow — matches CTA/hero atmospheric feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(15,30,60,0.4) 0%, transparent 65%)",
        }}
      />
      <div className="container relative z-10 flex flex-col items-center">
        {/* Header — centered, same label + divider as other sections */}
        <div className="flex flex-col items-center text-center">
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.28em]"
            style={{ color: "#00d4ff" }}
          >
            THE TEAM
          </div>
          <div
            className="mt-3 h-0.5 w-8 shrink-0 rounded-full"
            style={{ background: "linear-gradient(90deg, #00d4ff, transparent)" }}
          />
          <h2 className="mt-6 text-[clamp(2rem,3.5vw,3.2rem)] font-extrabold tracking-[-0.03em] text-white">
            Built by People Who&apos;ve Done This Before
          </h2>
        </div>

        {/* Person columns track — centered */}
        <div className="mt-16 flex justify-center overflow-x-auto md:mt-20">
          {people.map((p, i) => (
            <PersonColumn key={p.name} person={p} index={i} isNearu={false} />
          ))}
          <PersonColumn person={nearuData} index={4} isNearu={true} />
        </div>
      </div>
    </section>
  );
}
