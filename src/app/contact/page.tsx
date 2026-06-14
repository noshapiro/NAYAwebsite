"use client";

import { MapPin, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";

const CONTACT_EMAIL = "noa@nnearu.com";

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

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setStatusMessage("");

    const name = fullName.trim();
    const emailValue = email.trim();
    const organization = company.trim() || "—";
    const reason = inquiryType || "General inquiry";
    const messageText = message.trim();
    const subject = `Contact: ${reason} — ${organization !== "—" ? organization : name}`;

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email: emailValue,
          company: organization,
          role: role.trim() || "—",
          inquiry_type: reason,
          message: messageText,
          _subject: subject,
          _replyto: emailValue,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = (await res.json()) as { success?: string | boolean; message?: string };
      const ok = data.success === true || data.success === "true";

      if (!ok) {
        setStatus("error");
        setStatusMessage(
          data.message?.includes("Activation")
            ? "Form activation required — check noa@nnearu.com for the activation link."
            : data.message || "Failed to send message. Please try again."
        );
        return;
      }

      setStatus("success");
      setStatusMessage("Message sent. We'll be in touch soon.");
      setFullName("");
      setCompany("");
      setEmail("");
      setRole("");
      setInquiryType("");
      setMessage("");
    } catch {
      setStatus("error");
      setStatusMessage("Network error. Please try again or email noa@nnearu.com directly.");
    }
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
                    required
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
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-2 w-full rounded-lg border-0 bg-[#0099ff] py-3 px-6 text-[14px] font-medium text-white transition-colors duration-150 hover:bg-[#0077cc] disabled:cursor-not-allowed disabled:opacity-60"
                style={{ marginTop: 8 }}
              >
                {status === "sending" ? "Sending…" : "Send Message →"}
              </button>

              {statusMessage ? (
                <p
                  className={`mt-4 text-[13px] leading-[1.5] ${
                    status === "success" ? "text-[#22D3A5]" : "text-[#F87171]"
                  }`}
                  role="status"
                >
                  {statusMessage}
                  {status === "error" ? (
                    <>
                      {" "}
                      <Link href="mailto:noa@nnearu.com" className="underline hover:text-white">
                        Email us directly
                      </Link>
                    </>
                  ) : null}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
