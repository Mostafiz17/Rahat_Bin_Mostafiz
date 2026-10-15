import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, animate, type MotionValue } from "framer-motion";
import { Code2, Video, Sparkles, Palette, GitCommit, Film, Clock, Coffee, ArrowRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { SpotlightCard } from "../ui/SpotlightCard";
import { FadeIn } from "../animations/FadeIn";
import { personalInfo } from "../../data/personalInfo";
import { scrollToId } from "../../utils/scroll";
import { EASE } from "../../utils/motion";

const serviceIcons: Record<string, React.ReactNode> = {
  Code2: <Code2 className="h-5 w-5" />,
  Video: <Video className="h-5 w-5" />,
  Sparkles: <Sparkles className="h-5 w-5" />,
  Palette: <Palette className="h-5 w-5" />,
};

const statIcons: Record<string, React.ReactNode> = {
  GitCommit: <GitCommit className="h-4 w-4" />,
  Film: <Film className="h-4 w-4" />,
  Clock: <Clock className="h-4 w-4" />,
  Coffee: <Coffee className="h-4 w-4" />,
};

/** Story paragraph. `hl` tokens get a solid accent highlight. */
const storyTokens: { w: string; hl?: boolean }[] = [
  { w: "I" }, { w: "didn't" }, { w: "pick" }, { w: "between" }, { w: "code" }, { w: "and" }, { w: "cinema." },
  { w: "As" }, { w: "a" }, { w: "Software", hl: true }, { w: "Engineer", hl: true }, { w: "I" }, { w: "build" },
  { w: "fast," }, { w: "modern" }, { w: "web" }, { w: "platforms," }, { w: "and" }, { w: "as" }, { w: "a" },
  { w: "Video", hl: true }, { w: "Editor" }, { w: "I" }, { w: "shape" }, { w: "stories" }, { w: "with" },
  { w: "rhythm," }, { w: "color" }, { w: "and" }, { w: "sound." }, { w: "Both" }, { w: "demand" },
  { w: "the" }, { w: "same" }, { w: "thing:" }, { w: "precision" }, { w: "and" }, { w: "empathy" },
  { w: "for" }, { w: "the" }, { w: "person" }, { w: "on" }, { w: "the" }, { w: "other" }, { w: "side" },
  { w: "of" }, { w: "the" }, { w: "screen." },
];

/** One word whose opacity is driven by scroll progress. */
const ScrollWord: React.FC<{ word: string; progress: MotionValue<number>; range: [number, number]; hl?: boolean }> = ({
  word,
  progress,
  range,
  hl,
}) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className={`mr-[0.28em] inline-block ${hl ? "rounded-md bg-accent/15 px-1.5 font-semibold text-accent" : ""}`}>
      {word}
    </motion.span>
  );
};

/** Count-up number that starts when it scrolls into view. */
const CountUp: React.FC<{ to: number; suffix: string }> = ({ to, suffix }) => {
  const [value, setValue] = useState(0);
  return (
    <motion.span
      className="tabular-nums"
      onViewportEnter={() => {
        animate(0, to, { duration: 2, ease: EASE, onUpdate: (v) => setValue(Math.round(v)) });
      }}
      viewport={{ once: true }}
    >
      {value}
      {suffix}
    </motion.span>
  );
};

export const About: React.FC = () => {
  const storyRef = useRef<HTMLParagraphElement>(null);
  // Words light up one by one as the paragraph passes through the viewport
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ["start 0.9", "end 0.55"] });
  const total = storyTokens.length;

  return (
    <section id="about" className="relative scroll-mt-24 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="01"
          eyebrow="About me"
          title="Bridging logic and"
          titleAccent="visual storytelling."
        />

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* LEFT: workspace visual + code card + stat counters */}
          <div className="space-y-8 lg:col-span-5">
            <FadeIn y={60}>
              <div className="group relative overflow-hidden rounded-3xl border border-line shadow-pop">
                {/* TODO: Replace with actual image */}
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <div className="h-full w-full animate-kenburns">
                    <img
                      src="/images/about-workspace.jpg"
                      alt="Rahat's editing and development workspace"
                      loading="lazy"
                      className="h-full w-full object-cover grayscale-[35%] transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>
                </div>
                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-line bg-canvas/85 p-4 font-medium text-sm backdrop-blur-xl">
                  <div className="mb-3 flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    <span className="ml-3 text-xs text-muted">rahat.profile.ts</span>
                  </div>
                  {[
                    ["role", "\"Software Engineer & Video Editor\""],
                    ["stack", "[\"React\", \"Node.js\", \"Premiere Pro\"]"],
                    ["location", "\"Dhaka, Bangladesh\""],
                    ["status", "\"open to great work\""],
                  ].map(([key, val], i) => (
                    <motion.p
                      key={key}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease: EASE }}
                      className="text-xs leading-6 text-fg"
                    >
                      <span className="text-accent">{key}</span>: <span className="text-muted">{val}</span>
                    </motion.p>
                  ))}
                </div>
              </div>
            </FadeIn>

            <div className="grid grid-cols-2 gap-4">
              {personalInfo.stats.map((stat, idx) => (
                <FadeIn key={stat.label} delay={idx * 0.1} y={30}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="surface h-full rounded-2xl p-5 transition-colors duration-300 hover:border-accent/50"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-h3 font-bold text-fg">
                        <CountUp to={stat.numberValue} suffix={stat.suffix} />
                      </span>
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/10 text-accent">
                        {statIcons[stat.icon]}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-fg">{stat.label}</p>
                    <p className="mt-1 text-xs leading-snug text-muted">{stat.description}</p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* RIGHT: scroll-driven story + services */}
          <div className="space-y-12 lg:col-span-7">
            <p ref={storyRef} className="text-story font-medium tracking-[-0.02em] text-fg">
              {storyTokens.map((t, i) => (
                <ScrollWord
                  key={`${t.w}-${i}`}
                  word={t.w}
                  hl={t.hl}
                  progress={scrollYProgress}
                  range={[i / total, (i + 1) / total]}
                />
              ))}
            </p>

            <FadeIn delay={0.1}>
              <p className="max-w-prose text-base leading-relaxed text-muted md:text-lg">
                As a <span className="font-semibold text-fg">Software Engineer at Factoryze Technologies Limited</span>, I
                architect scalable full-stack platforms and dashboards. As a <span className="font-semibold text-fg">Video Editor</span>{" "}
                with Instaquirk, I cut brand films, commercials and reels. The best work happens where the two meet.
              </p>
            </FadeIn>

            <div>
              <FadeIn>
                <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-muted">What I do</h3>
              </FadeIn>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {personalInfo.services.map((service, index) => (
                  <FadeIn key={service.id} delay={index * 0.1} y={50}>
                    <SpotlightCard className="flex h-full flex-col justify-between p-6">
                      <div>
                        <div className="mb-5 flex items-center justify-between">
                          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-white transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                            {serviceIcons[service.icon]}
                          </span>
                          <span className="text-sm font-semibold tabular-nums text-muted">0{index + 1}</span>
                        </div>
                        <h4 className="mb-2 text-title font-bold text-fg">{service.title}</h4>
                        <p className="text-sm leading-relaxed text-muted">{service.description}</p>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-4">
                        {service.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-line px-2.5 py-1 text-[11px] font-medium text-fg">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </SpotlightCard>
                  </FadeIn>
                ))}
              </div>
            </div>

            <FadeIn>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("contact");
                }}
                className="group inline-flex min-h-12 items-center gap-3 text-base font-semibold text-fg"
              >
                <span className="relative">
                  Have a web app or a video in mind? Let's talk
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-100 bg-accent transition-transform duration-500 group-hover:scale-x-0" />
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-right scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
                </span>
                <ArrowRight className="h-5 w-5 text-accent transition-transform duration-300 group-hover:translate-x-2" />
              </a>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};
