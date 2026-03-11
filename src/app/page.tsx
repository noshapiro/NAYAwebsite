import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { SoulEngine } from "@/components/SoulEngine";
import { NearuVibe } from "@/components/NearuVibe";
import { EmotionChannels } from "@/components/EmotionChannels";
import { AIAgnostic } from "@/components/AIAgnostic";
import { DemoPlayer } from "@/components/DemoPlayer/DemoPlayer";
import { UseCases } from "@/components/UseCases";
import { WhyNow } from "@/components/WhyNow";
import { Competitive } from "@/components/Competitive";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <Problem />
      <SoulEngine />
      <NearuVibe />
      <EmotionChannels />
      <AIAgnostic />
      <DemoPlayer />
      <UseCases />
      <WhyNow />
      <Competitive />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
