import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Learn from "@/components/Learn";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Learn />
        <Projects />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
