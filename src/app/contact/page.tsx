"use client";

import { MapPin, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";

const INQUIRY_OPTIONS = [
  "Select an inquiry type",
  "Technology Partnership",
  "R&D Collaboration",
  "Investment",
  "Press & Media",
  "Other",
] as const;

const inputBase =
  "w-full rounded-lg border border-[#2a2a2a] bg-[#181818] px-3.5 py-2.5 text-[14px] text-white outline-none transition-[border-color] duration-150 placeholder:text-[#555] focus:border-[#0099ff] focus:bg-[#1a1a1a] font-[inherit]";
const labelBase =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#555555]";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact: ${inquiryType || "General"} — ${company || "No company"}`);
    const body = encodeURIComponent(
      `Name: ${fullName}\nCompany: ${company}\nEmail: ${email}\nRole: ${role}\nInquiry: ${inquiryType}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:noa@nnearu.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6">
        <div
          className="mx-auto grid w-full max-w-[1000px] grid-cols-1 items-center lg:grid-cols-[1fr_1.2fr]"
          style={{ padding: "96px 24px", gap: 64 }}
        >
          {/* Left side — text, vertically centered with form */}
          <div className="contact-page-header">
            <div
              className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#a0a0a0]"
              style={{ marginBottom: 8 }}
            >
              CONTACT
            </div>
            <div className="divider-line" />
            <h1
              className="font-bold text-white"
              style={{ fontSize: 40, lineHeight: 1.1, marginBottom: 16 }}
            >
              Start a Conversation
            </h1>
            <p
              className="text-[#a0a0a0]"
              style={{ fontSize: 15, lineHeight: 1.65, marginBottom: 36 }}
            >
              Whether you&apos;re exploring a technology partnership, R&D collaboration, or investment opportunity — we&apos;d like to hear from you.
            </p>

            <div className="flex flex-col gap-4" style={{ gap: 16 }}>
              <div className="flex items-start gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#1e1e1e] bg-[#111111]"
                  style={{ width: 36, height: 36 }}
                >
                  <MapPin className="h-4 w-4 shrink-0 text-[#0099ff]" strokeWidth={1.5} size={16} />
                </div>
                <div>
                  <div
                    className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#555555]"
                    style={{ marginBottom: 2 }}
                  >
                    Location
                  </div>
                  <div className="text-[14px] text-[#a0a0a0]">
                    169 Madison Ave STE 78337, New York, NY
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#1e1e1e] bg-[#111111]"
                  style={{ width: 36, height: 36 }}
                >
                  <Mail className="h-4 w-4 shrink-0 text-[#0099ff]" strokeWidth={1.5} size={16} />
                </div>
                <div>
                  <div
                    className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#555555]"
                    style={{ marginBottom: 2 }}
                  >
                    Email
                  </div>
                  <Link
                    href="mailto:noa@nnearu.com"
                    className="text-[14px] text-[#a0a0a0] transition hover:text-white hover:underline"
                  >
                    noa@nnearu.com
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right side — form */}
          <div
            className="rounded-2xl border border-[#1e1e1e] bg-[#111111] p-7"
            style={{ padding: "28px 28px 24px", borderRadius: 16 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="grid grid-cols-2 gap-3" style={{ marginBottom: 16 }}>
                <div>
                  <label htmlFor="fullname" className={labelBase}>
                    Full name
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={inputBase}
                  />
                </div>
                <div>
                  <label htmlFor="company" className={labelBase}>
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Organization"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={inputBase}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label htmlFor="email" className={labelBase}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputBase}
                  required
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label htmlFor="role" className={labelBase}>
                  Role (optional)
                </label>
                <input
                  id="role"
                  type="text"
                  placeholder="Your role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={inputBase}
                  />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label htmlFor="inquiry" className={labelBase}>
                  Inquiry type
                </label>
                <div>
                  <select
                    id="inquiry"
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className={`${inputBase} appearance-none pr-10`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                    }}
                  >
                    {INQUIRY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt === "Select an inquiry type" ? "" : opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label htmlFor="message" className={labelBase}>
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Tell us about your application or interest area."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputBase} min-h-[120px] resize-y`}
                  style={{
                    lineHeight: 1.6,
                    minHeight: 120,
                  }}
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-lg border-0 bg-[#0099ff] py-3 px-6 text-[14px] font-medium text-white transition-colors duration-150 hover:bg-[#0077cc]"
                style={{ marginTop: 8 }}
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
