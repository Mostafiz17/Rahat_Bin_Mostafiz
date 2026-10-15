import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/**
 * Desktop-only cursor: a precise dot plus a springy ring.
 * Ring expands over links/buttons; elements with `data-cursor="Label"` show a label.
 */
export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 320, damping: 28, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor], input, textarea, select, label");
      setHovering(Boolean(interactive));
      setLabel(interactive?.getAttribute("data-cursor") ?? null);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[150] hidden md:block" aria-hidden="true">
      {/* Trailing ring */}
      <motion.div
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border border-accent/60"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: label ? 88 : hovering ? 56 : 36,
          height: label ? 88 : hovering ? 56 : 36,
          scale: pressed ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      >
        {/* Solid fill that fades in over interactive elements */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-accent"
          animate={{ opacity: hovering ? 0.18 : 0 }}
          transition={{ duration: 0.25 }}
        />
        <AnimatePresence mode="wait">
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="relative text-[11px] font-bold uppercase tracking-widest text-accent"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Precise dot */}
      <motion.div
        className="fixed left-0 top-0 h-2 w-2 rounded-full bg-accent"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: pressed ? 0.5 : hovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
};
