import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Calendar, MapPin, ExternalLink, CheckCircle2, Code2, Video, Sparkles, Briefcase } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { SpotlightCard } from "../ui/SpotlightCard";
import { experiencesData, ExperienceItem } from "../../data/experiences";
import { EASE, EASE_EXPO } from "../../utils/motion";

const expIcons: Record<string, React.ReactNode> = {
  Code: <Code2 className="h-5 w-5" />,
  Video: <Video className="h-5 w-5" />,
  Sparkles: <Sparkles className="h-5 w-5" />,
};

const TimelineItem: React.FC<{ exp: ExperienceItem; index: number }> = ({ exp, index }) => {
  const fromLeft = index % 2 === 0; // even → card on the left (desktop)

  return (
    <li className="relative grid grid-cols-1 md:grid-cols-2 md:gap-16">
      {/* Node dot · pops in when reached */}
      <motion.span
        aria-hidden="true"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-40% 0px -40% 0px" }}
        transition={{ type: "spring", stiffness: 420, damping: 18 }}
        className="absolute left-5 top-8 z-10 grid h-6 w-6 -translate-x-1/2 place-items-center rounded-full border-4 border-canvas bg-accent md:left-1/2"
      >
        {exp.current && <span className="absolute inset-0 animate-ping rounded-full bg-accent/60" />}
      </motion.span>

      {/* Big ghost period label on the opposite side (desktop) */}
      <div className={`hidden md:flex md:items-start ${fromLeft ? "md:order-2 md:pl-4" : "md:order-1 md:justify-end md:pr-4"}`}>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="text-outline text-display font-bold tracking-tighter opacity-70"
        >
          {exp.period.slice(0, 4)}
        </motion.p>
      </div>

      {/* Card · slides in from its own side */}
      <motion.div
        initial={{ opacity: 0, x: fromLeft ? -80 : 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE_EXPO }}
        className={`pl-14 md:pl-0 ${fromLeft ? "md:order-1" : "md:order-2"}`}
      >
        <SpotlightCard className="p-6 md:p-8">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  {exp.type}
                </span>
                {exp.current && (
                  <span className="rounded-full border border-emerald-500/40 px-3 py-1 text-[11px] font-semibold text-emerald-500">
                    Current
                  </span>
                )}
              </div>
              <h3 className="text-title font-bold text-fg md:text-h3">{exp.role}</h3>
              {exp.companyUrl ? (
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 text-base font-semibold text-accent transition-colors hover:text-accent-2"
                >
                  {exp.company} <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : (
                <p className="mt-1 text-base font-semibold text-accent">{exp.company}</p>
              )}
            </div>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-line text-accent">
              {expIcons[exp.icon] ?? <Briefcase className="h-5 w-5" />}
            </span>
          </div>

          <div className="mb-5 flex flex-wrap gap-x-5 gap-y-2 border-b border-line pb-5 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {exp.period}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> {exp.location}
            </span>
          </div>

          <ul className="mb-6 space-y-3">
            {exp.description.map((bullet, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: EASE }}
                className="flex items-start gap-3 text-sm leading-relaxed text-muted md:text-base"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{bullet}</span>
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {exp.skills.map((skill) => (
              <span key={skill} className="rounded-full bg-line/60 px-2.5 py-1 text-[11px] font-semibold text-fg">
                {skill}
              </span>
            ))}
          </div>
        </SpotlightCard>
      </motion.div>
    </li>
  );
};

export const Experience: React.FC = () => {
  const listRef = useRef<HTMLOListElement>(null);
  // The timeline line draws itself as you scroll through the list
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.6", "end 0.7"] });

  return (
    <section id="experience" className="relative scroll-mt-24 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="04"
          eyebrow="Experience"
          title="Professional"
          titleAccent="journey."
          subtitle="Where I've built software, cut stories and learned to do both at the same time."
        />

        <ol ref={listRef} className="relative space-y-16 md:space-y-24">
          {/* Track + animated fill */}
          <span aria-hidden="true" className="absolute bottom-0 left-5 top-0 w-px -translate-x-1/2 bg-line md:left-1/2" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: scrollYProgress }}
            className="absolute bottom-0 left-5 top-0 w-[2px] origin-top -translate-x-1/2 bg-accent md:left-1/2"
          />

          {experiencesData.map((exp, i) => (
            <TimelineItem key={exp.id} exp={exp} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
};
