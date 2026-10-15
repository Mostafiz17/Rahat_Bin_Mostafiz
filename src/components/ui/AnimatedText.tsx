import React from "react";
import { motion, type Variants } from "framer-motion";
import { EASE_EXPO } from "../../utils/motion";

interface SplitTextProps {
  text: string;
  className?: string;
  /** Split into words (default) or individual letters. */
  by?: "word" | "letter";
  /** Start immediately on mount, or when scrolled into view. Ignored if `active` is given. */
  trigger?: "mount" | "view";
  delay?: number;
  stagger?: number;
  /**
   * External control: when provided, the reveal plays only when this becomes true
   * (e.g. after the preloader lifts). Overrides `trigger`.
   */
  active?: boolean;
}

/**
 * Mask-reveal text. Each word/letter rises out of its own overflow-hidden mask.
 * Renders spans only, so it can live inside any heading tag.
 * Letters also bounce slightly on hover.
 */
export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  by = "word",
  trigger = "view",
  delay = 0,
  stagger,
  active,
}) => {
  const units = by === "letter" ? text.split("") : text.split(" ");
  const step = stagger ?? (by === "letter" ? 0.03 : 0.08);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: step, delayChildren: delay } },
  };

  const unit: Variants = {
    hidden: { y: "110%", rotate: 4 },
    show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: EASE_EXPO } },
  };

  const motionProps =
    active !== undefined
      ? { animate: active ? "show" : "hidden" }
      : trigger === "mount"
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, margin: "-60px" } };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      aria-label={text}
      {...motionProps}
    >
      {units.map((unitText, i) => (
        <React.Fragment key={`${unitText}-${i}`}>
          <span className="inline-block overflow-hidden align-top pb-[0.12em] -mb-[0.12em]" aria-hidden="true">
            <motion.span
              className="inline-block origin-bottom-left"
              variants={unit}
              whileHover={by === "letter" ? { y: -6 } : undefined}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
            >
              {unitText === " " ? "\u00A0" : unitText}
            </motion.span>
          </span>
          {by === "word" && i < units.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </motion.span>
  );
};
