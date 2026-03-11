"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const LOGO_PATH = "/logo.png";

const NAV_LINKS = [
  { label: "Product", href: "#solution" },
  { label: "Technology", href: "#nearuvibe" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Company", href: "#team" },
  { label: "News", href: "/news" },
] as const;

export function Navbar() {
  const [logoError, setLogoError] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className="sticky top-0 z-[100] border-b border-[var(--border)] bg-[var(--bg)]/95 py-3.5 backdrop-blur-[20px]"
    >
        <div className="container flex items-center justify-between">
          {/* Слева: лого + пункты меню с шевроном (структура как LiveKit) */}
          <div className="flex items-center gap-8">
            <a href="/" className="flex shrink-0 items-center">
              {!logoError ? (
                <Image
                  src={LOGO_PATH}
                  alt="Nearu"
                  width={60}
                  height={16}
                  className="h-4 w-auto object-contain object-left"
                  priority
                  unoptimized
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span className="flex items-center gap-1 font-[var(--font-head)] text-[0.7rem] font-extrabold tracking-[-0.04em] text-[var(--text)]">
                  <span className="h-1 w-1 rounded-full bg-[var(--accent)] shadow-[0_0_6px_var(--accent)]" />
                  NEARU
                </span>
              )}
            </a>

            <ul className="hidden list-none items-center gap-7 md:flex">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    className="inline-flex items-center gap-1 text-[0.875rem] font-medium text-[var(--text-2)] transition-colors hover:text-[var(--text)]"
                    href={item.href}
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-70" strokeWidth={2} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Справа: вторичная кнопка + основная кнопка (как Contact sales / Start building) */}
          <div className="flex items-center gap-3">
            <a
              href="/contact"
              className="hidden items-center gap-2 rounded-md border border-[var(--border-bright)] bg-transparent px-4 py-2 text-[0.875rem] font-medium text-[var(--text)] transition hover:border-white/20 hover:bg-white/5 sm:inline-flex"
            >
              Request Demo
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-5 py-2 text-[0.875rem] font-semibold text-white shadow-[0_0_20px_var(--accent-glow)] transition hover:opacity-90 hover:shadow-[0_0_24px_var(--accent-glow)]"
            >
              Start Building
            </a>
          </div>
        </div>
    </motion.nav>
  );
}
