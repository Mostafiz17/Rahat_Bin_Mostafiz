import React from "react";
import { motion } from "framer-motion";
import { EASE } from "../../utils/motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
}

/** Scroll-triggered fade + rise (or slide) reveal. Plays once. */
export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className = "",
  delay = 0,
  y = 40,
  x = 0,
  duration = 0.75,
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y, x }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);
