import type { Variants } from "framer-motion";

/** Signature easing curve used across the site (smooth ease-out). */
export const EASE: [number, number, number, number] = [0.25, 0.4, 0.25, 1];
/** Expressive "expo out" curve for big reveals. */
export const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Fade + rise, used for most scroll-in reveals. */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE, delay },
  }),
};
