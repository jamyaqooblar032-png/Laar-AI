import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { TechMarquee } from "@/components/TechMarquee";
import { HeroToolsGrid } from "@/components/HeroToolsGrid";
import { CategoryGrid } from "@/components/CategoryGrid";
import { Why } from "@/components/Why";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TechMarquee />
        <HeroToolsGrid />
        <CategoryGrid />
        <Why />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
