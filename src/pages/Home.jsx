import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Marquee } from "../components/Marquee";
import { About } from "../components/About";
import { Services } from "../components/Services";
import { Projects } from "../components/Projects";
import { Numbers } from "../components/Numbers";
import { Clients } from "../components/Clients";
import { Diferenciais } from "../components/Diferenciais";
import { Timeline } from "../components/Timeline";
import { CtaBanner } from "../components/CtaBanner";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { Floaters } from "../components/Floaters";
import { destroyLenis, initLenis } from "../lib/scroll";

const Home = () => {
  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);

  return (
    <div className="pb-[52px] md:pb-0">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Projects />
        <Numbers />
        <Clients />
        <Diferenciais />
        <Timeline />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
      <Floaters />
    </div>
  );
};

export default Home;
