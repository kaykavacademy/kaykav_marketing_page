import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Course from "@/components/Course";
import Enrol from "@/components/Enrol";
import Testimonials from "@/components/Testimonials";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollReveal from "@/components/ScrollReveal";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <>
      <Cursor />
      <ScrollReveal />
      <Nav />
      <main>
        <Hero />
        <Course />
        <Enrol />
        <Testimonials />
      </main>
      <Cta />
      <FloatingCTA />
      <Footer />
    </>
  );
}
