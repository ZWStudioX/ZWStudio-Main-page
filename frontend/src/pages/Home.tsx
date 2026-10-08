import { useEffect } from "react";
import { Navbar } from "@/components/zw/Navbar";
import { Hero } from "@/components/zw/Hero";
import { Marquee } from "@/components/zw/Marquee";
import { Manifesto } from "@/components/zw/Manifesto";
import { Disciplines } from "@/components/zw/Disciplines";
import { FeaturedWork } from "@/components/zw/FeaturedWork";
import { Studio } from "@/components/zw/Studio";
import { Process } from "@/components/zw/Process";
import { ContentLab } from "@/components/zw/ContentLab";
import { CTA } from "@/components/zw/CTA";
import { Footer } from "@/components/zw/Footer";
import { initLenis } from "@/lib/scroll";

export default function Home() {
  useEffect(() => initLenis(), []);

  return (
    <div className="min-h-screen bg-obsidian text-bone">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Disciplines />
        <FeaturedWork />
        <Studio />
        <Process />
        <ContentLab />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
