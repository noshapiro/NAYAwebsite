"use client";

import Image from "next/image";
import { useState } from "react";

const LOGO_PATH = "/logo.png";

export function Footer() {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] py-14">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
          <div className="md:col-span-1">
            {!logoError ? (
              <Image
                src={LOGO_PATH}
                alt="Nearu"
                width={70}
                height={18}
                className="h-[1rem] w-auto object-contain object-left"
                unoptimized
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="flex items-center gap-1.5 font-[var(--font-head)] text-[0.7rem] font-extrabold tracking-[-0.04em] text-[var(--text)]">
                <span className="h-1 w-1 rounded-full bg-[var(--accent)] shadow-[0_0_6px_var(--accent)]" />
                NEARU
              </div>
            )}
            <p className="mt-4 text-[0.8rem] leading-[1.6] text-[var(--text-2)]">
              The emotional intelligence infrastructure layer for AI agents and robotics.
            </p>
            <div className="mt-4 text-[0.78rem] leading-[1.65] text-[var(--text-3)]">
              noa@nnearu.com
              <br />
              +972-54-5884883
              <br />
              169 Madison Ave STE 78337, New York, NY
            </div>
          </div>

          <div>
            <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[var(--text)]">
              Product
            </h4>
            <ul className="mt-3.5 space-y-2 text-[0.78rem] text-[var(--text-2)]">
              <li>
                <a className="transition hover:text-[var(--text)]" href="#solution">
                  Soul Engine™
                </a>
              </li>
              <li>
                <a className="transition hover:text-[var(--text)]" href="#nearuvibe">
                  NearuVibe™
                </a>
              </li>
              <li>
                <a className="transition hover:text-[var(--text)]" href="#demo">
                  Live Demo
                </a>
              </li>
              <li>
                <a className="transition hover:text-[var(--text)]" href="#models">
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[var(--text)]">
              Company
            </h4>
            <ul className="mt-3.5 space-y-2 text-[0.78rem] text-[var(--text-2)]">
              <li>
                <a className="transition hover:text-[var(--text)]" href="#team">
                  Team
                </a>
              </li>
              <li>
                <a className="transition hover:text-[var(--text)]" href="#">
                  Roadmap
                </a>
              </li>
              <li>
                <a className="transition hover:text-[var(--text)]" href="/contact">
                  Contact
                </a>
              </li>
              <li>
                <a className="transition hover:text-[var(--text)]" href="https://nnearu.com" target="_blank" rel="noopener noreferrer">
                  nnearu.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[var(--text)]">
              Developers
            </h4>
            <ul className="mt-3.5 space-y-2 text-[0.78rem] text-[var(--text-2)]">
              <li>
                <a className="transition hover:text-[var(--text)]" href="#">
                  API Docs
                </a>
              </li>
              <li>
                <a className="transition hover:text-[var(--text)]" href="#">
                  REST Reference
                </a>
              </li>
              <li>
                <a className="transition hover:text-[var(--text)]" href="#">
                  WebSocket API
                </a>
              </li>
              <li>
                <a className="transition hover:text-[var(--text)]" href="/privacy">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-[var(--border)] pt-6 md:flex-row md:items-center">
          <p className="text-[0.78rem] text-[var(--text-3)]">
            © 2026 Nearu. We build souls for machines.
          </p>
          <p className="text-[0.78rem] text-[var(--text-3)] md:ml-auto">
            Soul Engine™ · NearuVibe™
          </p>
        </div>
      </div>
    </footer>
  );
}
