import type { Metadata } from "next";
import { Inter, Playfair_Display, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const isProd = process.env.NODE_ENV === "production";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: "400", variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Emotional Intelligence Infrastructure for Embedded AI & Robotics",
  description: "Emotional Intelligence Infrastructure for Embedded AI & Robotics",
  metadataBase: new URL("https://nnearu.com"),
  openGraph: {
    title: "Emotional Intelligence Infrastructure for Embedded AI & Robotics",
    description: "Emotional Intelligence Infrastructure for Embedded AI & Robotics",
    url: "https://nnearu.com",
    siteName: "Nearu",
    images: [
      {
        url: "/hero-nearu.png?v=2",
        width: 1200,
        height: 630,
        alt: "Nearu — Emotional Intelligence Layer for AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emotional Intelligence Infrastructure for Embedded AI & Robotics",
    description: "Emotional Intelligence Infrastructure for Embedded AI & Robotics",
    images: ["/hero-nearu.png?v=2"],
  },
  icons: {
    icon: [{ url: "/favicon.ico?v=4", type: "image/x-icon" }],
    shortcut: "/favicon.ico?v=4",
    apple: "/favicon.ico?v=4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png?v=3" />
      </head>
      <body className="antialiased font-[var(--font-inter)] bg-[#0e0e0e] text-[#F5F5F5]" style={{ backgroundColor: "#0e0e0e", color: "#F5F5F5" }}>
        <noscript>
          <div style={{ padding: "2rem", textAlign: "center", color: "#F5F5F5" }}>
            This site needs JavaScript. Please enable it and reload.
          </div>
        </noscript>
        {children}
        {isProd && <Analytics />}
      </body>
    </html>
  );
}
