import Header from "@/components/Header";
import Hero2 from "@/components/Hero2";
import Learn from "@/components/Learn";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

// A/B test: variant B — identical page with the alternate hero layout.
export default function HomeB() {
  return (
    <>
      <Header />
      <main>
        <Hero2 />
        <Learn />
        <Projects />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
