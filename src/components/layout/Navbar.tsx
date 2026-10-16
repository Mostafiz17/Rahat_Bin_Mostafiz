import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Button } from "../ui/Button";
import { scrollToId, lockScroll, unlockScroll } from "../../utils/scroll";
import { EASE_EXPO } from "../../utils/motion";
import { personalInfo } from "../../data/personalInfo";

interface NavbarProps {
  onTriggerEasterEgg?: () => void;
}

const navLinks = [
  { name: "Home", id: "hero" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Experience", id: "experience" },
  { name: "Contact", id: "contact" },
];

/** Floating glass navbar: shrinks on scroll, active-section pill, mobile full-screen menu. */
export const Navbar: React.FC<NavbarProps> = ({ onTriggerEasterEgg }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [logoClicks, setLogoClicks] = useState(0);
  const logoTimer = useRef<number | undefined>(undefined);

  // Shrink + strengthen blur after scrolling past the hero top
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section spy: the section crossing the viewport's middle band wins.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Freeze page scroll (Lenis + native) while the mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      lockScroll();
      document.body.style.overflow = "hidden";
    } else {
      unlockScroll();
      document.body.style.overflow = "";
    }
    return () => {
      unlockScroll();
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /** Navigate to a section. From the mobile menu, scroll only after it closes. */
  const go = (id: string) => {
    if (menuOpen) {
      setMenuOpen(false);
      window.setTimeout(() => scrollToId(id), 350);
    } else {
      scrollToId(id);
    }
  };

  const handleLogoClick = () => {
    scrollToId("hero");
    // 5 rapid clicks unlock the easter egg (counter resets after a pause)
    const next = logoClicks + 1;
    window.clearTimeout(logoTimer.current);
    if (next >= 5) {
      setLogoClicks(0);
      onTriggerEasterEgg?.();
    } else {
      setLogoClicks(next);
      logoTimer.current = window.setTimeout(() => setLogoClicks(0), 1200);
    }
  };

  return (
    <>
      {/* Thin solid scroll progress bar */}
      <ScrollProgress />

      <header
        className={`fixed inset-x-0 top-0 z-50 flex justify-center px-3 transition-all duration-500 md:px-6 ${
          scrolled ? "pt-2" : "pt-4 md:pt-6"
        }`}
      >
        <nav
          aria-label="Primary"
          className={`flex w-full max-w-6xl items-center justify-between gap-3 rounded-full border transition-all duration-500 ${
            scrolled
              ? "border-line bg-canvas/80 py-2 pl-3 pr-2 shadow-card backdrop-blur-2xl"
              : "border-transparent bg-transparent py-2 pl-2 pr-2 backdrop-blur-0"
          }`}
        >
          {/* Logo: full name + live status (click 5× rapidly for a surprise) */}
          <button
            type="button"
            onClick={handleLogoClick}
            aria-label="Rahat Bin Mostafiz · back to top"
            title="Back to top (click 5 times for a surprise)"
            className="group flex min-h-12 min-w-0 flex-1 items-center gap-2.5 sm:gap-3 rounded-full pl-1 pr-2 sm:flex-none"
          >
            {/* Logo is Rahat's own photo */}
            <motion.span
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="relative block h-9 w-9 sm:h-10 sm:w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/70 ring-offset-2 ring-offset-canvas"
            >
              {/* TODO: Replace with actual image */}
              <img
                src={`${import.meta.env.BASE_URL}images/rahat.jpg`}
                alt=""
                className="h-full w-full object-cover object-[center_15%]"
                loading="eager"
              />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-canvas bg-emerald-500" />
            </motion.span>
            <span className="min-w-0 text-left leading-tight">
              <span className="block truncate text-[13px] sm:text-sm font-bold text-fg">
                Rahat Bin Mostafiz
              </span>
              <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-muted">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Dhaka, BD
              </span>
            </span>
          </button>

          {/* Desktop links with sliding pill indicator */}
          <ul className="hidden items-center gap-1 rounded-full border border-line/60 bg-card/50 p-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(link.id);
                    }}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-px hover:text-accent ${
                      isActive ? "text-fg" : "text-muted"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-canvas shadow-sm ring-1 ring-line"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Hire Me: solid accent pill with a pulsing ring */}
            <div className="relative hidden sm:block">
              <span
                aria-hidden="true"
                className="absolute inset-0 animate-ping rounded-full bg-accent/30"
              />
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  go("contact");
                }}
                className="relative flex min-h-12 items-center gap-1.5 rounded-full bg-accent px-5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105"
              >
                Hire Me <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="grid h-12 w-12 place-items-center rounded-full border border-line text-fg md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen mobile overlay with staggered link reveal + profile card */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: "circle(0% at 92% 6%)", opacity: 0 }}
            animate={{ clipPath: "circle(150% at 92% 6%)", opacity: 1 }}
            exit={{ clipPath: "circle(0% at 92% 6%)", opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_EXPO }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-canvas/98 backdrop-blur-2xl px-6 pb-8 pt-24 md:hidden overflow-y-auto"
          >
            {/* Header profile chip inside drawer */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="mb-4 flex items-center justify-between border-b border-line/60 pb-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={`${import.meta.env.BASE_URL}images/rahat.jpg`}
                  alt="Rahat Bin Mostafiz"
                  className="h-11 w-11 rounded-full object-cover object-[center_15%] ring-2 ring-accent"
                />
                <div>
                  <p className="text-sm font-bold text-fg">Rahat Bin Mostafiz</p>
                  <p className="text-xs text-muted">Software Engineer · Video Editor</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 text-[10px] font-semibold text-emerald-500">
                Online
              </span>
            </motion.div>

            <ul className="space-y-0.5">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.18 + i * 0.05, duration: 0.45, ease: EASE_EXPO }}
                  className="overflow-hidden border-b border-line/50"
                >
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(link.id);
                    }}
                    className="flex min-h-12 items-center justify-between py-2 text-2xl font-bold tracking-tight text-fg active:text-accent transition-colors"
                  >
                    <span>{link.name}</span>
                    <span className="text-xs font-semibold tabular-nums text-muted">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="space-y-3 pt-4"
            >
              <Button href="#contact" onClick={(e) => { e.preventDefault(); go("contact"); }} className="w-full shadow-card">
                Let's build together <ArrowUpRight className="h-4 w-4" />
              </Button>
              <p className="flex items-center justify-center gap-2 text-xs text-muted text-center">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                {personalInfo.status}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/** Thin top progress line that fills as the page scrolls. */
const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
      <div className="h-full origin-left bg-accent" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
};
