import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Video } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { SpotlightCard } from "../ui/SpotlightCard";
import { Marquee } from "../ui/Marquee";
import { softwareSkills, creativeSkills, marqueeTechnologies, SkillCategory } from "../../data/skills";
import { EASE, EASE_EXPO } from "../../utils/motion";

type Tab = "software" | "creative";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "software", label: "Software Engineering", icon: <Code2 className="h-4 w-4" /> },
  { id: "creative", label: "Video & Creative", icon: <Video className="h-4 w-4" /> },
];

/** Animated proficiency bar: fills when scrolled into view, with a soft trailing pulse. */
const SkillBar: React.FC<{ level: number; delay?: number }> = ({ level, delay = 0 }) => (
  <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-line">
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: level / 100 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: EASE_EXPO, delay }}
      className="h-full origin-left rounded-full bg-accent"
    />
    <motion.span
      aria-hidden="true"
      initial={{ left: "0%", opacity: 0 }}
      whileInView={{ left: `${level}%`, opacity: [0, 1, 0] }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: EASE_EXPO, delay }}
      className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-3"
    />
  </div>
);

const CategoryCard: React.FC<{ category: SkillCategory; index: number }> = ({ category, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 60, rotateX: -12 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.8, ease: EASE, delay: index * 0.1 }}
    style={{ transformPerspective: 1200 }}
  >
    <SpotlightCard tilt={false} className="h-full p-7 md:p-8">
      <div className="mb-2 flex items-start justify-between gap-4">
        <h3 className="text-2xl font-bold text-fg">{category.title}</h3>
        <span className="rounded-full border border-line px-3 py-1 text-xs font-semibold tabular-nums text-accent">
          0{index + 1}
        </span>
      </div>
      <p className="mb-7 text-sm text-muted">{category.description}</p>

      <ul className="space-y-5">
        {category.skills.map((skill, sIdx) => (
          <li key={skill.name}>
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <span className="flex min-w-0 items-center gap-2">
                <span className="truncate font-medium text-fg">{skill.name}</span>
                {skill.badge && (
                  <span className="shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
                    {skill.badge}
                  </span>
                )}
              </span>
              <span className="shrink-0 tabular-nums text-xs text-muted">{skill.level}%</span>
            </div>
            <SkillBar level={skill.level} delay={sIdx * 0.07} />
          </li>
        ))}
      </ul>
    </SpotlightCard>
  </motion.div>
);

export const Skills: React.FC = () => {
  const [tab, setTab] = useState<Tab>("software");
  const categories = tab === "software" ? softwareSkills : creativeSkills;

  return (
    <section id="skills" className="relative scroll-mt-24 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-6 sm:gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            index="02"
            eyebrow="Skills & tools"
            title="Tech arsenal"
            titleAccent="& creative toolkit."
          />

          {/* Segmented tab switcher with sliding solid indicator */}
          <div role="tablist" aria-label="Skill categories" className="mb-8 sm:mb-14 flex w-full rounded-full border border-line bg-card/80 p-1 sm:p-1.5 backdrop-blur-md shadow-card md:mb-20 lg:w-auto">
            {tabs.map((t) => {
              const selected = tab === t.id;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setTab(t.id)}
                  className={`relative flex min-h-11 sm:min-h-12 flex-1 items-center justify-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-5 text-xs sm:text-sm font-semibold transition-colors duration-300 lg:flex-none ${
                    selected ? "text-white" : "text-muted hover:text-fg"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="skills-tab"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-accent"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {t.icon}
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: EASE }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {categories.map((category, i) => (
              <CategoryCard key={category.id} category={category} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Two counter-moving marquees of tools */}
      <div className="mt-24 space-y-5 overflow-hidden">
        <Marquee duration={36}>
          {marqueeTechnologies.map((tech) => (
            <span key={tech} className="flex items-center gap-6 px-3 text-marquee font-bold uppercase tracking-tight text-fg">
              {tech}
              <span className="text-accent">●</span>
            </span>
          ))}
        </Marquee>
        <Marquee duration={40} reverse>
          {[...marqueeTechnologies].reverse().map((tech) => (
            <span key={tech} className="flex items-center gap-6 px-3 text-marquee font-bold uppercase tracking-tight text-outline">
              {tech}
              <span className="text-accent-3">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
