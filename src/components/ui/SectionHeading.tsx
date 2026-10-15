import React from "react";
import { motion } from "framer-motion";
import { SplitText } from "./AnimatedText";
import { EASE } from "../../utils/motion";

interface SectionHeadingProps {
  /** Two-digit section index, e.g. "01". */
  index?: string;
  eyebrow: string;
  title: string;
  /** Second part of the title, rendered in the animated accent color. */
  titleAccent?: string;
  subtitle?: string;
  align?: "center" | "left";
}

/** Numbered eyebrow + mask-revealed title + subtitle. Solid colors only. */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  index,
  eyebrow,
  title,
  titleAccent,
  subtitle,
  align = "left",
}) => {
  const centered = align === "center";

  return (
    <header className={`mb-14 md:mb-20 ${centered ? "mx-auto text-center" : "text-left"} max-w-3xl`}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`mb-5 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.22em] text-muted ${
          centered ? "justify-center" : ""
        }`}
      >
        {index && <span className="tabular-nums text-accent">({index})</span>}
        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="h-px w-12 origin-left bg-current"
        />
        <span>{eyebrow}</span>
      </motion.div>

      <h2 className="text-section font-bold text-fg">
        <SplitText text={title} />
        {titleAccent && (
          <>
            {" "}
            <span className="animate-accent-shift">
              <SplitText text={titleAccent} />
            </span>
          </>
        )}
      </h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          className={`mt-6 max-w-xl text-base text-muted md:text-lead ${centered ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
    </header>
  );
};
