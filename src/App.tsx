import { useEffect, useState, useCallback } from "react";
import Lenis from "lenis";
import { ThemeProvider } from "./context/ThemeContext";
import { setLenis } from "./utils/scroll";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { Experience } from "./components/sections/Experience";
import { Testimonials } from "./components/sections/Testimonials";
import { Contact } from "./components/sections/Contact";
import { WaveDivider } from "./components/ui/MotionGraphics";
import { CustomCursor } from "./components/ui/CustomCursor";
import { BackToTop } from "./components/ui/BackToTop";
import { MobileFloatingBar } from "./components/ui/MobileFloatingBar";
import { Preloader } from "./components/ui/Preloader";
import { EasterEggModal } from "./components/ui/EasterEggModal";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

/** Page shell: smooth scrolling, intro loader, easter eggs and all sections. */
function PortfolioPage() {
  const [easterEgg, setEasterEgg] = useState(false);
  const [started, setStarted] = useState(false);
  const closeEasterEgg = useCallback(() => setEasterEgg(false), []);
  const openEasterEgg = useCallback(() => setEasterEgg(true), []);
  // Hero entrance begins the moment the loader starts lifting
  const handleReveal = useCallback(() => setStarted(true), []);

  // Lenis: buttery smooth wheel/touch scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenis(lenis);

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // Konami code → easter egg
  useEffect(() => {
    let index = 0;
    const onKey = (e: KeyboardEvent) => {
      const expected = KONAMI[index];
      const matches = e.key.length === 1 ? e.key.toLowerCase() === expected : e.key === expected;
      if (matches) {
        index += 1;
        if (index === KONAMI.length) {
          index = 0;
          setEasterEgg(true);
        }
      } else {
        index = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative min-h-screen bg-canvas text-fg transition-colors duration-300">
      <div aria-hidden="true" className="bg-wash bg-wash-light">
        <span className="wash-blob wb-1" />
        <span className="wash-blob wb-2" />
        <span className="wash-blob wb-3" />
      </div>
      <div aria-hidden="true" className="bg-wash bg-wash-dark">
        <span className="wash-blob wb-1" />
        <span className="wash-blob wb-2" />
        <span className="wash-blob wb-3" />
      </div>
      <Preloader onReveal={handleReveal} />
      <CustomCursor />
      <Navbar onTriggerEasterEgg={openEasterEgg} />

      <main>
        <Hero started={started} />
        <About />
        <WaveDivider />
        <Skills />
        <Projects />
        <WaveDivider flip />
        <Experience />
        <Testimonials />
        <WaveDivider />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
      {/* Mobile-only thumb-accessible action bar (hidden on PC / md:hidden) */}
      <MobileFloatingBar />
      <EasterEggModal isOpen={easterEgg} onClose={closeEasterEgg} />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <PortfolioPage />
    </ThemeProvider>
  );
}

export default App;
