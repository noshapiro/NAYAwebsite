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

const INPUT_FOCUS =
  "focus:border-[#3B82F6] focus:outline-none focus:ring-0 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)]";

export default function ContactPage() {
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
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side */}
          <div>
            <div
              className="text-[11px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: "#3B82F6" }}
            >
              CONTACT
            </div>
            <div
              className="mt-3 h-0.5 w-8 rounded-full"
              style={{ background: "linear-gradient(90deg, #3B82F6, transparent)" }}
            />
            <h1 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-black tracking-[-0.03em] text-white">
              Start a Conversation
            </h1>
            <p className="mt-4 text-[1rem] leading-[1.7] text-[var(--text-2)]">
              Whether you&apos;re exploring a technology partnership, R&D collaboration, or investment opportunity — we&apos;d like to hear from you.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex gap-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border"
                  style={{
                    background: "rgba(59,130,246,0.1)",
                    borderColor: "rgba(59,130,246,0.2)",
                  }}
                >
                  <MapPin className="h-5 w-5" style={{ color: "#3B82F6" }} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[rgba(255,255,255,0.35)]">
                    Location
                  </div>
                  <div className="mt-1.5 text-[0.9rem] text-white">
                    169 Madison Ave STE 78337, New York, NY
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border"
                  style={{
                    background: "rgba(59,130,246,0.1)",
                    borderColor: "rgba(59,130,246,0.2)",
                  }}
                >
                  <Mail className="h-5 w-5" style={{ color: "#3B82F6" }} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[rgba(255,255,255,0.35)]">
                    Email
                  </div>
                  <Link
                    href="mailto:noa@nnearu.com"
                    className="mt-1.5 block text-[0.9rem] text-white transition hover:underline"
                  >
                    noa@nnearu.com
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right side — form card */}
          <div
            className="rounded-[20px] border p-9"
            style={{
              background: "#1a1a1a",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullname"
                    className="block text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[rgba(255,255,255,0.35)]"
                    style={{ marginBottom: 6 }}
                  >
                    Full name
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full rounded-[10px] border px-3.5 py-3 text-[0.88rem] text-[#f0f0ff] placeholder:text-[rgba(255,255,255,0.4)] ${INPUT_FOCUS}`}
                    style={{
                      background: "#0e0e0e",
                      borderColor: "rgba(255,255,255,0.1)",
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="block text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[rgba(255,255,255,0.35)]"
                    style={{ marginBottom: 6 }}
                  >
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Organization"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={`w-full rounded-[10px] border px-3.5 py-3 text-[0.88rem] text-[#f0f0ff] placeholder:text-[rgba(255,255,255,0.4)] ${INPUT_FOCUS}`}
                    style={{
                      background: "#0e0e0e",
                      borderColor: "rgba(255,255,255,0.1)",
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[rgba(255,255,255,0.35)]"
                  style={{ marginBottom: 6 }}
                >
                  Role (optional)
                </label>
                <input
                  id="role"
                  type="text"
                  placeholder="Your role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={`w-full rounded-[10px] border px-3.5 py-3 text-[0.88rem] text-[#f0f0ff] placeholder:text-[rgba(255,255,255,0.4)] ${INPUT_FOCUS}`}
                  style={{
                    background: "#0e0e0e",
                    borderColor: "rgba(255,255,255,0.1)",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="inquiry"
                  className="block text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[rgba(255,255,255,0.35)]"
                  style={{ marginBottom: 6 }}
                >
                  Inquiry type
                </label>
                <select
                  id="inquiry"
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className={`w-full appearance-none rounded-[10px] border px-3.5 py-3 text-[0.88rem] text-[#f0f0ff] ${INPUT_FOCUS}`}
                  style={{
                    background: "#0e0e0e",
                    borderColor: "rgba(255,255,255,0.1)",
                  }}
                >
                  {INQUIRY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt === "Select an inquiry type" ? "" : opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[rgba(255,255,255,0.35)]"
                  style={{ marginBottom: 6 }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Tell us about your application or interest area."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`min-h-[120px] w-full resize-y rounded-[10px] border px-3.5 py-3 text-[0.88rem] text-[#f0f0ff] placeholder:text-[rgba(255,255,255,0.4)] ${INPUT_FOCUS}`}
                  style={{
                    background: "#0e0e0e",
                    borderColor: "rgba(255,255,255,0.1)",
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-[10px] bg-[#3B82F6] py-3.5 text-[0.95rem] font-extrabold text-white transition hover:opacity-90"
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
