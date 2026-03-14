"use client";

import { NEWS_ITEMS } from "@/data/news";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";

export default function NewsPage() {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,60,140,0.08), transparent 60%), #0a0a0a",
      }}
    >
      <Navbar />

      {/* Page header */}
      <header className="px-4 pt-20 pb-14 text-center" style={{ paddingTop: 80, paddingBottom: 56 }}>
        <div
          className="text-[11px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: "#a0a0a0" }}
        >
          NEWS
        </div>
        <div className="divider-line" />
        <h1
          className="text-center font-bold text-white"
          style={{ fontSize: 44, lineHeight: 1.1 }}
        >
          News
        </h1>
        <p
          className="mx-auto max-w-[520px] text-center text-[16px]"
          style={{ color: "#a0a0a0", margin: "16px auto 0" }}
        >
          Updates, insights, posts from the founders — follow us on LinkedIn for the full thread.
        </p>
      </header>

      {/* Articles grid — 3 cards per row on large screens */}
      <div
        className="mx-auto grid max-w-[1100px] grid-cols-1 gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3"
        style={{ marginTop: 56, padding: "0 24px 96px" }}
      >
        {NEWS_ITEMS.map((item) => (
          <a
            key={item.linkedInUrl + item.title}
            href={item.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="news-card flex cursor-pointer flex-col overflow-hidden rounded-xl border border-[#1e1e1e] bg-[#111111] transition-[background,border-color] duration-150 hover:border-[#2a2a2a] hover:bg-[#181818]"
          >
            {/* Image area */}
            <div className="relative h-[180px] w-full shrink-0 overflow-hidden bg-[#181818]">
              {item.image && !failedImages.has(item.image) ? (
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="block object-cover object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized
                  onError={() => setFailedImages((prev) => new Set(prev).add(item.image!))}
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center"
                  style={{
                    background: "linear-gradient(160deg, #0d1520, #060e18)",
                  }}
                >
                  <span className="text-[13px] italic text-[#555]">Nearu News</span>
                </div>
              )}
            </div>

            {/* Content area */}
            <div
              className="flex flex-1 flex-col"
              style={{ padding: "16px 18px 18px" }}
            >
              <div
                className="mb-1.5 flex items-center gap-2 text-[11px]"
                style={{ color: "#555555", marginBottom: 8 }}
              >
                <span>{item.date}</span>
                {item.readTime && (
                  <>
                    <span
                      className="inline-block h-[3px] w-[3px] shrink-0 rounded-full"
                      style={{ background: "#555" }}
                    />
                    <span>{item.readTime}</span>
                  </>
                )}
              </div>
              <h2
                className="font-bold text-white"
                style={{ fontSize: 15, lineHeight: 1.35, marginBottom: 8 }}
              >
                {item.title}
              </h2>
              <p
                className="line-clamp-3 mb-3 flex-1 text-[13px] text-[#a0a0a0]"
                style={{ lineHeight: 1.6 }}
              >
                {item.description}
              </p>
              <span
                className="mt-auto inline-flex items-center gap-1 text-[13px] font-medium text-[#0099ff] no-underline transition-colors duration-150 hover:text-[#0077cc]"
                style={{ gap: 4 }}
              >
                Read on LinkedIn →
              </span>
            </div>
          </a>
        ))}
      </div>

      <Footer />
    </main>
  );
}
