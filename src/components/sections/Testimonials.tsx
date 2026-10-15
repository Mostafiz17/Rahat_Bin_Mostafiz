import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Marquee } from "../ui/Marquee";
import { testimonialsData, Testimonial } from "../../data/testimonials";
import { EASE } from "../../utils/motion";

/** Glass quote card: stars, quote, author. */
const QuoteCard: React.FC<{ t: Testimonial }> = ({ t }) => (
  <motion.figure
    whileHover={{ y: -8, rotate: -0.6 }}
    transition={{ type: "spring", stiffness: 300, damping: 22 }}
    className="surface flex w-[320px] shrink-0 flex-col justify-between rounded-3xl p-7 transition-colors duration-300 hover:border-accent/50 sm:w-[430px] md:p-8"
  >
    <div>
      <div className="mb-5 flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-white">
          <Quote className="h-5 w-5 fill-current" />
        </span>
        <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>
      <blockquote className="text-base text-fg md:text-lead">“{t.quote}”</blockquote>
    </div>

    <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-fg text-sm font-bold text-canvas">
        {t.avatarText}
      </span>
      <span>
        <span className="block text-sm font-bold text-fg">{t.name}</span>
        <span className="block text-xs text-muted">
          {t.role} · <span className="text-accent">{t.company}</span>
        </span>
      </span>
    </figcaption>
  </motion.figure>
);

export const Testimonials: React.FC = () => {
  // Second row runs in reverse order so the two rows don't mirror each other
  const reversed = [...testimonialsData].reverse();

  return (
    <section className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="05"
          eyebrow="Social proof"
          title="What collaborators"
          titleAccent="say."
          subtitle="Feedback from engineering leads, founders and creative directors I've shipped with."
        />
      </div>

      <div className="space-y-8">
        <Marquee duration={60}>
          {testimonialsData.map((t) => (
            <div key={t.id} className="px-4">
              <QuoteCard t={t} />
            </div>
          ))}
        </Marquee>
        <Marquee duration={70} reverse>
          {reversed.map((t) => (
            <div key={t.id} className="px-4">
              <QuoteCard t={t} />
            </div>
          ))}
        </Marquee>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mt-10 text-center text-xs font-medium text-muted"
      >
        Hover a row to pause · placeholder testimonials, replace with real ones
      </motion.p>
    </section>
  );
};
