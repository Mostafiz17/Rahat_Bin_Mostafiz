import React from "react";
import { motion, useScroll, useVelocity, useSpring, useTransform } from "framer-motion";

interface MarqueeProps {
  children: React.ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  /** Scroll direction. */
  reverse?: boolean;
  /** Pause when hovered. */
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * Infinite horizontal marquee. Children are duplicated so the loop is seamless
 * (the track moves -50% of its width, which equals exactly one set).
 * Uses a CSS keyframe (see index.css `.marquee-track`) for buttery 60fps motion,
 * and leans (skews) with scroll velocity for extra life.
 */
export const Marquee: React.FC<MarqueeProps> = ({
  children,
  duration = 30,
  reverse = false,
  pauseOnHover = true,
  className = "",
}) => {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  const skewX = useTransform(smoothVelocity, [-1200, 1200], [-5, 5]);

  return (
    <div
      className={`group relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)] ${className}`}
    >
      <motion.div style={{ skewX }} className="flex w-max">
        <div
          className={`marquee-track flex w-max shrink-0 items-center ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
          style={{
            animationDuration: `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          <div className="flex shrink-0 items-center">{children}</div>
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
