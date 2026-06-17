import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ImpactMetrics from "@/components/ImpactMetrics";
import Learn from "@/components/Learn";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import NextStep from "@/components/NextStep";
import FAQ from "@/components/FAQ";
import MarqueeBand from "@/components/MarqueeBand";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import MobileApplyBar from "@/components/MobileApplyBar";
import PromoBarBottom from "@/components/PromoBarBottom";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ImpactMetrics />
        <Learn />
        <Projects />
        <Testimonials />
        <NextStep />
        <FAQ />
        <MarqueeBand />
        <FinalCta />
      </main>
      <Footer />
      <MobileApplyBar />
      <PromoBarBottom />
    </>
  );
}
