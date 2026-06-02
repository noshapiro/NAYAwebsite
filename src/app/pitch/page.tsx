import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PitchDeck } from "@/components/PitchDeck";

export const metadata = {
  title: "Investor Deck — Nearu",
  description: "Nearu — Emotional Intelligence Infrastructure for AI. Investor Pitch Deck 2026.",
};

export default function PitchPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <PitchDeck />
      <Footer />
    </div>
  );
}
