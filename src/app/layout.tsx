import type { Metadata } from "next";
import { Inter, Playfair_Display, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: "400", variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Nearu — The Emotional Intelligence Layer for AI Agents",
  description: "Nearu — The Emotional Intelligence Layer for AI Agents",
  icons: {
    icon: ["/favicon.png"],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
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
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className="antialiased font-[var(--font-inter)] bg-[#0e0e0e]" style={{ backgroundColor: "#0e0e0e" }}>
        {children}
      </body>
    </html>
  );
}
