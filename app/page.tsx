import Contact from "@/components/Contact";
import Footer from "@/components/footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/navbar";
import Projects from "@/components/Projects";
import Resume from "@/components/resume";
import Services from "@/components/services";

export default function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <Services/>
      <Resume/>
      <Projects/>
      <Contact/>
      <Footer/>
    </>
  );
}
