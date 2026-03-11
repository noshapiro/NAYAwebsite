"use client";

import { MapPin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const LOGO_PATH = "/logo.png";

const INQUIRY_OPTIONS = [
  "Select an inquiry type",
  "Technology Partnership",
  "R&D Collaboration",
  "Investment",
  "Press & Media",
  "Other",
] as const;

export default function ContactPage() {
  const [logoError, setLogoError] = useState(false);
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact: ${inquiryType || "General"} — ${company || "No company"}`);
    const body = encodeURIComponent(
      `Name: ${fullName}\nCompany: ${company}\nRole: ${role}\nInquiry: ${inquiryType}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:noa@nnearu.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(5,5,8,0.9)] py-4 backdrop-blur-[20px]">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center">
            {!logoError ? (
              <Image
                src={LOGO_PATH}
                alt="Nearu"
                width={60}
                height={16}
                className="h-4 w-auto object-contain object-left"
                unoptimized
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="flex items-center gap-1 font-[var(--font-head)] text-[0.7rem] font-extrabold tracking-[-0.04em] text-[var(--text)]">
                <span className="h-1 w-1 rounded-full bg-[var(--accent)] shadow-[0_0_6px_var(--accent)]" />
                NEARU
              </span>
            )}
          </Link>
          <Link
            href="/"
            className="text-[0.875rem] font-semibold text-[var(--text-2)] transition hover:text-[var(--text)]"
          >
            ← Back
          </Link>
        </div>
      </header>

      <div className="container pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left column — contact info */}
          <div>
            <div className="label mb-2 block">Contact</div>
            <h1 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em] text-white">
              Start a Conversation
            </h1>
            <p className="mt-4 text-[1rem] leading-[1.75] text-[var(--text-2)]">
              Whether you&apos;re exploring a technology partnership, R&D collaboration, or investment opportunity — we&apos;d like to hear from you.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[var(--surface-2)]">
                  <MapPin className="h-5 w-5 text-[var(--accent)]" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[var(--text-3)]">
                    Location
                  </div>
                  <div className="mt-1 text-[0.9rem] text-[var(--text-2)]">
                    169 Madison Ave STE 78337, New York, NY
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[var(--surface-2)]">
                  <Mail className="h-5 w-5 text-[var(--accent)]" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[var(--text-3)]">
                    Email
                  </div>
                  <a
                    href="mailto:noa@nnearu.com"
                    className="mt-1 block text-[0.9rem] text-[var(--accent)] transition hover:underline"
                  >
                    noa@nnearu.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — form card */}
          <div className="rounded-[20px] border border-white/10 bg-[var(--surface)] p-6 shadow-xl md:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="fullname" className="block text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[var(--text-3)]">
                    Full name
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1.5 w-full rounded-md border border-white/15 bg-[var(--bg-2)] px-4 py-3 text-[0.95rem] text-[var(--text)] placeholder:text-[var(--text-3)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[var(--text-3)]">
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Organization"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mt-1.5 w-full rounded-md border border-white/15 bg-[var(--bg-2)] px-4 py-3 text-[0.95rem] text-[var(--text)] placeholder:text-[var(--text-3)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[var(--text-3)]">
                  Role (optional)
                </label>
                <input
                  id="role"
                  type="text"
                  placeholder="Your role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-white/15 bg-[var(--bg-2)] px-4 py-3 text-[0.95rem] text-[var(--text)] placeholder:text-[var(--text-3)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>

              <div>
                <label htmlFor="inquiry" className="block text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[var(--text-3)]">
                  Inquiry type
                </label>
                <select
                  id="inquiry"
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="mt-1.5 w-full appearance-none rounded-md border border-white/15 bg-[var(--bg-2)] px-4 py-3 text-[0.95rem] text-[var(--text)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] [&>option]:bg-[var(--surface-2)]"
                >
                  {INQUIRY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt === "Select an inquiry type" ? "" : opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[var(--text-3)]">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your application or interest area."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1.5 w-full resize-y rounded-md border border-white/15 bg-[var(--bg-2)] px-4 py-3 text-[0.95rem] text-[var(--text)] placeholder:text-[var(--text-3)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--accent)] px-6 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_0_20px_var(--accent-glow)] transition hover:opacity-90 hover:translate-y-[-1px]"
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
