"use client";

import { motion } from "framer-motion";

export function AnnouncementBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-[var(--border)] bg-[linear-gradient(90deg,var(--accent-15),var(--accent-12))] py-2 text-center text-[0.82rem] text-[var(--text-2)]"
    >
      <span className="mr-[10px] inline-block h-[6px] w-[6px] animate-pulse rounded-full bg-[var(--green)] align-middle shadow-[0_0_8px_var(--green)]" />
      We&apos;re raising our Seed Round.
      <a
        className="ml-2 font-semibold text-[var(--accent)] transition-opacity hover:opacity-80"
        href="mailto:noa@nnearu.com"
      >
        Talk to us
      </a>
    </motion.div>
  );
}

