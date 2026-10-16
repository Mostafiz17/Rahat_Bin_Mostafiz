import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll, type Variants } from "framer-motion";
import { ArrowDown, ArrowRight, Download, Sparkles } from "lucide-react";
import { FaReact, FaNodeJs } from "react-icons/fa6";
import { Button } from "../ui/Button";
import { SplitText } from "../ui/AnimatedText";
import { ScrambleText } from "../ui/ScrambleText";
import { Equalizer } from "../ui/MotionGraphics";
import { SocialLinks } from "../ui/SocialLinks";
import { Marquee } from "../ui/Marquee";
import { personalInfo } from "../../data/personalInfo";
import { scrollToId } from "../../utils/scroll";
import { EASE, EASE_EXPO } from "../../utils/motion";

/*
  YOUR PHOTO · the hero uses the exact file, untouched (no filters, no recolor).
  To use your real photo, replace public/images/rahat.jpg with your photo
  (keep the same filename) and rebuild.
  // TODO: Replace with actual image · Rahat's real photo
*/
const profilePhoto = `${import.meta.env.BASE_URL}images/rahat.jpg`;

/** Entrance variant factory: hidden → shown with a per-element delay. */
const rise = (delay = 0, y = 24): Variants => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay } },
});

/** Types out each role, pauses, deletes, then moves to the next. Starts when `active`. */
const useTypewriter = (words: string[], active: boolean) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!active) return;
    const full = words[wordIndex];
    let timeout: number | undefined;

    if (!deleting && text === full) {
      timeout = window.setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      timeout = window.setTimeout(
        () => setText(full.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? 40 : 90
      );
    }
    return () => window.clearTimeout(timeout);
  }, [active, text, deleting, wordIndex, words]);

  return text;
};

/** Orbiting chip: the ring rotates; each chip counter-rotates so it stays upright. */
const OrbitChip: React.FC<{
  position: string;
  label: string;
  icon: React.ReactNode;
  delay: number;
  started: boolean;
}> = ({ position, label, icon, delay, started }) => (
  <div className={`absolute ${position}`}>
    <motion.div animate={{ rotate: -360 }} transition={{ duration: 28, ease: "linear", repeat: Infinity }}>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={started ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ delay, duration: 0.6, ease: EASE_EXPO }}
        className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-card px-3 py-2 text-xs font-semibold text-fg shadow-card"
      >
        {icon}
        {label}
      </motion.div>
    </motion.div>
  </div>
);

export const Hero: React.FC<{ started?: boolean }> = ({ started = true }) => {
  const typed = useTypewriter(personalInfo.roles, started);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll parallax: content drifts up and fades as the hero leaves the viewport
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.1]);
  const photoScrollY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  // Decorative halo spins as the page scrolls
  const haloRotate = useTransform(scrollYProgress, [0, 1], [0, 240]);

  // Mouse parallax: normalized cursor position (-0.5 … 0.5), spring-smoothed
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const photoX = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const photoY = useTransform(sy, [-0.5, 0.5], [-14, 14]);
  const photoRotY = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const photoRotX = useTransform(sy, [-0.5, 0.5], [5, -5]);
  const blockX = useTransform(sx, [-0.5, 0.5], [30, -30]);
  const blockY = useTransform(sy, [-0.5, 0.5], [24, -24]);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  const anim = started ? "show" : "hidden";

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMove}
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-28 md:pt-32"
    >
      {/* Background: dotted pattern + drifting solid accent blobs (no gradients) */}
      <div
        aria-hidden="true"
        className="animate-grid-pan pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(var(--line)_1.2px,transparent_1.2px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-24 top-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-[110px]"
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -70, 30, 0], y: [0, 50, -30, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-24 top-1/3 -z-10 h-[32rem] w-[32rem] rounded-full bg-accent-2/15 blur-[130px]"
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 40, -20, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-10 left-1/3 -z-10 h-72 w-72 rounded-full bg-accent-3/10 blur-[90px]"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-12 px-5 pb-10 md:px-8 lg:grid-cols-12 lg:gap-8"
      >
        {/* LEFT · 7 cols on desktop; on mobile renders after visual or stacks cleanly */}
        <div className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left order-2 lg:order-1">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <motion.span
              variants={rise(0.05, 16)}
              initial="hidden"
              animate={anim}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-4 py-2 text-sm font-medium text-fg backdrop-blur"
            >
              <Sparkles className="h-4 w-4 text-accent" />
              <span aria-hidden="true">👋</span>
              <ScrambleText text="Welcome to my portfolio" active={started} />
            </motion.span>

            <motion.span
              variants={rise(0.18, 16)}
              initial="hidden"
              animate={anim}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-4 py-2 text-sm font-medium text-fg backdrop-blur"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Available for freelance
            </motion.span>
          </div>

          {/* Typewriter role line */}
          <motion.p
            variants={rise(0.3, 16)}
            initial="hidden"
            animate={anim}
            className="mb-3 flex h-9 items-center gap-3 text-lead font-medium text-muted md:text-title"
            aria-live="polite"
          >
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            <span className="text-fg">{typed}</span>
            <motion.span
              aria-hidden="true"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block h-6 w-[3px] bg-accent"
            />
          </motion.p>

          {/* Name · letter-by-letter mask reveal; surname cycles the three solid accents */}
          <h1 className="text-display font-bold tracking-[-0.04em] text-fg">
            <span className="block">
              <SplitText text="Rahat Bin" by="letter" active={started} stagger={0.045} delay={0.35} />
            </span>
            <span className="block animate-accent-shift">
              <SplitText text="Mostafiz" by="letter" active={started} stagger={0.045} delay={0.7} />
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lead font-medium italic text-fg md:text-title">
            <SplitText text={`"${personalInfo.tagline}"`} active={started} delay={1.05} stagger={0.04} />
          </p>

          <p className="mt-5 max-w-prose text-base text-muted md:text-lead">
            <SplitText text={personalInfo.bio} active={started} delay={1.3} stagger={0.014} />
          </p>

          <motion.div
            variants={rise(1.75)}
            initial="hidden"
            animate={anim}
            className="mt-9 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 lg:justify-start w-full sm:w-auto"
          >
            <Button
              onClick={(e) => {
                e.preventDefault();
                scrollToId("projects");
              }}
              href="#projects"
              className="w-full sm:w-auto"
            >
              View My Projects <ArrowDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" href={`mailto:${personalInfo.emails.personal}?subject=Resume%20Request`} className="w-full sm:w-auto">
              <Download className="h-4 w-4" /> Download Resume
            </Button>
            <Button
              variant="ghost"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact");
              }}
              href="#contact"
              className="w-full sm:w-auto"
            >
              Let's Talk <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>

          <div className="mt-8 flex flex-col items-center gap-3 lg:flex-row lg:items-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Find me on</span>
            <SocialLinks trigger="mount" active={started} baseDelay={1.9} />
          </div>
        </div>

        {/* RIGHT · 5 cols: arch photo with orbiting chips on desktop; on mobile renders top with tailored sizing */}
        <motion.div style={{ y: photoScrollY }} className="relative mx-auto w-full max-w-[19rem] sm:max-w-[22rem] lg:max-w-[26rem] lg:col-span-5 order-1 lg:order-2 my-2 lg:my-0">
          {/* Scroll-reactive dashed halo */}
          <motion.div
            aria-hidden="true"
            style={{ rotate: haloRotate }}
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[138%] lg:w-[152%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-line/70"
          >
            <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-3" />
            <span className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-accent-2" />
          </motion.div>

          {/* Solid offset block behind the photo */}
          <motion.div
            aria-hidden="true"
            style={{ x: blockX, y: blockY }}
            initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
            animate={started ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0.4, opacity: 0, rotate: -12 }}
            transition={{ duration: 1, ease: EASE_EXPO, delay: 0.35 }}
            className="absolute inset-0 translate-x-4 translate-y-4 lg:translate-x-6 lg:translate-y-6 rounded-t-[10rem] lg:rounded-t-[12rem] rounded-b-[2.2rem] lg:rounded-b-[2.5rem] bg-accent"
          />

          <div className="relative aspect-[4/5] w-full" style={{ perspective: 1200 }} data-cursor="Hello">
            {/* Photo: clip-path reveal from bottom, mouse parallax + 3D tilt. No filters · the photo is used as-is. */}
            <motion.div
              style={{ x: photoX, y: photoY, rotateX: photoRotX, rotateY: photoRotY }}
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: started ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
              transition={{ duration: 1.3, ease: EASE_EXPO, delay: 0.15 }}
              className="absolute inset-0 overflow-hidden rounded-t-[10rem] lg:rounded-t-[12rem] rounded-b-[2.2rem] lg:rounded-b-[2.5rem] border border-line bg-card shadow-pop"
            >
              {/* Local fallback · only visible until the real photo file exists */}
              <div aria-hidden="true" className="absolute inset-0 grid place-items-center bg-card">
                <span className="text-display font-bold text-line">R</span>
              </div>
              {profilePhoto && (
                <motion.img
                  src={profilePhoto}
                  alt="Portrait of Rahat Bin Mostafiz, Software Engineer and Video Editor"
                  initial={{ scale: 1.18 }}
                  animate={{ scale: started ? 1 : 1.18 }}
                  transition={{ duration: 2, ease: EASE_EXPO, delay: 0.15 }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
                  loading="eager"
                  fetchPriority="high"
                />
              )}
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-line bg-canvas/85 px-4 py-3 text-xs backdrop-blur-xl">
                <div className="flex min-w-0 items-center gap-3">
                  {/* Live "recording" equalizer motion graphic */}
                  <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-rose-500/40 bg-rose-500/10 px-2 py-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500" />
                    <Equalizer bars={4} color="var(--accent-2)" className="h-3" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-bold text-fg">Rahat Bin Mostafiz</span>
                    <span className="block truncate text-muted">Dhaka, Bangladesh</span>
                  </span>
                </div>
                <span className="shrink-0 rounded-full bg-accent px-2.5 py-1 font-semibold text-white">SWE · Editor</span>
              </div>
            </motion.div>

            {/* Orbit ring with counter-rotating chips */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[118%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: started ? 1 : 0 }}
                transition={{ delay: 0.9 }}
                className="absolute inset-0 rounded-full border border-dashed border-muted/40"
              />
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 28, ease: "linear", repeat: Infinity }}
              >
                <OrbitChip
                  position="left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                  label="React"
                  delay={1}
                  started={started}
                  icon={<FaReact className="h-3.5 w-3.5 text-cyan-500" />}
                />
                <OrbitChip
                  position="right-0 top-1/2 translate-x-1/2 -translate-y-1/2"
                  label="Node.js"
                  delay={1.1}
                  started={started}
                  icon={<FaNodeJs className="h-3.5 w-3.5 text-emerald-500" />}
                />
                <OrbitChip
                  position="left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2"
                  label="Premiere Pro"
                  delay={1.2}
                  started={started}
                  icon={<span className="grid h-4 w-4 place-items-center rounded-[4px] bg-violet-600 text-[9px] font-bold text-white">Pr</span>}
                />
                <OrbitChip
                  position="left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  label="After Effects"
                  delay={1.3}
                  started={started}
                  icon={<span className="grid h-4 w-4 place-items-center rounded-[4px] bg-indigo-700 text-[9px] font-bold text-white">Ae</span>}
                />
              </motion.div>
            </div>

            {/* Rotating circular text badge - visible on desktop, stylish compact version on mobile */}
            <motion.div
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={started ? { opacity: 1, rotate: 0, scale: 1 } : { opacity: 0, rotate: -90, scale: 0.6 }}
              transition={{ duration: 1, ease: EASE_EXPO, delay: 0.8 }}
              className="absolute -left-4 -top-4 sm:-left-8 sm:-top-8 block h-24 w-24 sm:h-32 sm:w-32 z-20 pointer-events-none"
            >
              <motion.svg
                viewBox="0 0 120 120"
                className="h-full w-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, ease: "linear", repeat: Infinity }}
                aria-hidden="true"
              >
                <defs>
                  <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                </defs>
                <text className="fill-fg text-[10.5px] font-semibold uppercase tracking-[0.22em]">
                  <textPath href="#badge-circle">Software Engineer • Video Editor • Creative Tech •</textPath>
                </text>
              </motion.svg>
              <span className="absolute inset-0 m-auto grid h-9 w-9 sm:h-12 sm:w-12 place-items-center rounded-full bg-fg text-canvas">
                <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5 -rotate-45" />
              </span>
            </motion.div>

            {/* Floating stat stickers - repositioned safely on mobile so they don't get cut off */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={started ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 1.15, duration: 0.6, ease: EASE_EXPO }}
              className="absolute -right-2 sm:-right-4 top-[10%] sm:top-[14%] z-20"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-xl sm:rounded-2xl border border-line bg-card/95 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 shadow-card"
              >
                <p className="text-lead sm:text-title font-bold tabular-nums text-accent">3+</p>
                <p className="text-[10px] sm:text-[11px] font-medium text-muted">Years building</p>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={started ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 1.3, duration: 0.6, ease: EASE_EXPO }}
              className="absolute -left-2 sm:-left-4 bottom-[14%] sm:bottom-[12%] z-20"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="rounded-xl sm:rounded-2xl border border-line bg-card/95 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 shadow-card"
              >
                <p className="text-lead sm:text-title font-bold tabular-nums text-accent-3">50+</p>
                <p className="text-[10px] sm:text-[11px] font-medium text-muted">Videos edited</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-[4.5rem] left-8 hidden flex-col items-center gap-2 lg:flex" aria-hidden="true">
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted [writing-mode:vertical-rl]">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-accent"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>

      {/* Bottom marquee band */}
      <div className="relative border-y border-line py-5 md:py-7">
        <Marquee duration={32} className="select-none">
          {["Software Engineer", "Video Editor", "Motion Design", "Creative Technologist", "Problem Solver"].map((item) => (
            <span key={item} className="flex items-center gap-10 px-5 text-marquee font-bold uppercase tracking-tight">
              <span className="text-outline">{item}</span>
              <span className="text-accent">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
