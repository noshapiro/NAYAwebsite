import type { Metadata } from "next";
import { Inter, Playfair_Display, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: "400", variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Nearu — The Emotional Intelligence Layer for AI Agents",
  description: "Nearu — The Emotional Intelligence Layer for AI Agents",
  icons: {
    icon: [{ url: "/favicon.png?v=3", type: "image/png" }],
    shortcut: "/favicon.png?v=3",
    apple: "/favicon.png?v=3",
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
      <body className="antialiased font-[var(--font-inter)] bg-[#0e0e0e]" style={{ backgroundColor: "#0e0e0e" }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
