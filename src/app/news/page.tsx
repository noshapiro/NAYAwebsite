"use client";

import { NEWS_ITEMS } from "@/data/news";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='240' viewBox='0 0 400 240'%3E%3Crect fill='%23161b22' width='400' height='240'/%3E%3Ctext fill='%23666' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14'%3ENearu News%3C/text%3E%3C/svg%3E";

/** Extract LinkedIn activity ID from post URL for embed. Supports:
 *  - .../posts/user_slug-7437090426395877376-...
 *  - .../feed/update/urn:li:activity:7437090426395877376
 */
function getLinkedInEmbedId(linkedInUrl: string): string | null {
  try {
    const urnMatch = linkedInUrl.match(/urn:li:activity:(\d+)/);
    if (urnMatch) return urnMatch[1];
    const slugMatch = linkedInUrl.match(/-(\d{15,})(?:-|$|\?)/);
    return slugMatch ? slugMatch[1] : null;
  } catch {
    return null;
  }
}

const LINKEDIN_EMBED_BASE = "https://www.linkedin.com/embed/feed/update/urn:li:share:";
const LINKEDIN_EMBED_PARAMS = "?collapsed=1";

export default function NewsPage() {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <header className="border-b border-white/10 bg-[rgba(5,5,8,0.85)] py-4 backdrop-blur-[20px]">
        <div className="container flex items-center justify-between">
          <Link href="/" className="font-[var(--font-head)] text-[1.2rem] font-extrabold tracking-[-0.04em] text-[var(--text)]">
            NEARU
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/" className="text-[0.875rem] font-medium text-[var(--text-2)] transition hover:text-[var(--text)]">
              Home
            </Link>
            <Link href="/contact" className="text-[0.875rem] font-medium text-[var(--text-2)] transition hover:text-[var(--text)]">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <div className="container py-12 md:py-16">
        <Link
          href="/"
          className="inline-block text-[0.85rem] font-medium text-[var(--text-2)] transition hover:text-[var(--accent)]"
        >
          ← Back to Home
        </Link>

        <div className="mx-auto mt-8 max-w-[720px] text-center">
          <h1 className="text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold tracking-[-0.03em] text-white">
            News
          </h1>
          <p className="mt-3 text-[1.05rem] leading-[1.7] text-[var(--text-2)]">
            Updates, insights, posts from the founders — follow us on LinkedIn for the full thread.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-[1000px] grid-cols-1 gap-8 sm:grid-cols-2">
          {NEWS_ITEMS.map((item) => {
            const embedId = getLinkedInEmbedId(item.linkedInUrl);
            return (
              <a
                key={item.linkedInUrl + item.title}
                href={item.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[var(--surface)] transition hover:border-white/20"
              >
                <div className="relative w-full shrink-0 overflow-hidden bg-[var(--bg-2)]">
                  {item.image && !failedImages.has(item.image) ? (
                    <div className="relative aspect-[5/3] w-full">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-cover transition group-hover:scale-[1.02]"
                        sizes="(max-width: 640px) 100vw, 50vw"
                        unoptimized
                        onError={() => setFailedImages((prev) => new Set(prev).add(item.image!))}
                      />
                    </div>
                  ) : !item.image && embedId ? (
                    <div className="relative w-full" style={{ aspectRatio: "504/551" }}>
                      <iframe
                        src={`${LINKEDIN_EMBED_BASE}${embedId}${LINKEDIN_EMBED_PARAMS}`}
                        title="Embedded post"
                        width={504}
                        height={551}
                        className="absolute inset-0 h-full w-full border-0"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div
                      className="aspect-[5/3] w-full bg-[var(--surface-2)]"
                      style={{
                        backgroundImage: `url("${PLACEHOLDER_IMAGE}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                <div className="text-[0.75rem] text-[var(--text-3)]">
                  {item.date}
                  {item.readTime && (
                    <>
                      <span className="mx-1.5">·</span>
                      <span>{item.readTime}</span>
                    </>
                  )}
                </div>
                <h2 className="mt-2 text-[1.15rem] font-bold leading-snug text-white transition group-hover:text-[var(--accent)]">
                  {item.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-[0.9rem] leading-[1.6] text-[var(--text-2)]">
                  {item.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-[0.8rem] font-semibold text-[var(--accent)]">
                  Read on LinkedIn
                  <span className="transition group-hover:translate-x-0.5">→</span>
                </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </main>
  );
}
