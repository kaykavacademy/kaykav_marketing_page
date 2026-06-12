import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ImpactMetrics from "@/components/ImpactMetrics";
import Learn from "@/components/Learn";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import MarqueeBand from "@/components/MarqueeBand";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

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
        <MarqueeBand />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
