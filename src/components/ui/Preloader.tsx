import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_EXPO } from "../../utils/motion";

interface PreloaderProps {
  /** Fires the moment the loader starts exiting · use it to start page animations. */
  onReveal?: () => void;
  /** Fires after the exit animation has fully completed. */
  onComplete?: () => void;
}

/**
 * Minimal centered loader: monogram, name, one thin progress line, percentage.
 * Everything sits in the exact center of the screen · nothing else.
 */
export const Preloader: React.FC<PreloaderProps> = ({ onReveal, onComplete }) => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const revealed = useRef(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1100;
    let raf = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          if (!revealed.current) {
            revealed.current = true;
            onReveal?.();
          }
          setVisible(false);
        }, 150);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onReveal]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-canvas px-6 text-fg"
          exit={{ opacity: 0, y: -32, filter: "blur(6px)" }}
          transition={{ duration: 0.6, ease: EASE_EXPO }}
        >
          {/* Photo mark with spinning ring */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
            className="relative h-24 w-24"
            aria-hidden="true"
          >
            {/* TODO: Replace with actual image */}
            <img
              src={`${import.meta.env.BASE_URL}images/rahat.jpg`}
              alt=""
              className="h-full w-full rounded-full object-cover object-[center_15%] shadow-pop"
            />
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 6, ease: "linear", repeat: Infinity }}
              className="absolute -inset-2 rounded-full border-2 border-dashed border-accent/60"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted"
          >
            Rahat Bin Mostafiz
          </motion.p>

          {/* Single thin progress line */}
          <div className="mt-8 h-[2px] w-44 overflow-hidden rounded-full bg-line">
            <div
              className="h-full origin-left bg-accent"
              style={{ transform: `scaleX(${count / 100})` }}
            />
          </div>
          <p className="mt-3 text-xs tabular-nums text-muted">{count}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
