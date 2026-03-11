import type { Metadata } from "next";
import { Inter, Playfair_Display, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: "400", variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Nearu — The Emotional Intelligence Layer for AI Agents",
  description: "Nearu — The Emotional Intelligence Layer for AI Agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${playfair.variable}`}>
      <body className="antialiased font-[var(--font-inter)] bg-[#0e0e0e]" style={{ backgroundColor: "#0e0e0e" }}>
        {children}
      </body>
    </html>
  );
}
