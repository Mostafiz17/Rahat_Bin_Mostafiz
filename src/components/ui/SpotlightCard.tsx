import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  /** Enable 3D tilt that follows the cursor. */
  tilt?: boolean;
  /** Solid accent color for the cursor glow (CSS color). */
  glowColor?: string;
}

/**
 * Card with: 3D tilt (react-parallax-tilt style, built with framer-motion),
 * a solid soft glow that follows the cursor (no gradients), and a lift on hover.
 */
export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  tilt = true,
  glowColor = "var(--accent)",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5); // 0..1 across the card
  const py = useMotionValue(0.5);
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glowOpacity = useMotionValue(0);

  const rotX = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 180, damping: 18 });
  const rotY = useSpring(useTransform(px, [0, 1], [-7, 7]), { stiffness: 180, damping: 18 });
  const gx = useSpring(glowX, { stiffness: 260, damping: 26 });
  const gy = useSpring(glowY, { stiffness: 260, damping: 26 });
  const go = useSpring(glowOpacity, { stiffness: 200, damping: 30 });
  const goSoft = useTransform(go, [0, 1], [0, 0.22]); // keep the glow subtle

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    px.set(localX / rect.width);
    py.set(localY / rect.height);
    glowX.set(localX);
    glowY.set(localY);
    glowOpacity.set(1);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
    glowOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      style={tilt ? { rotateX: rotX, rotateY: rotY, transformPerspective: 1000 } : undefined}
      className={`group relative overflow-hidden rounded-3xl surface transition-[border-color,box-shadow] duration-500 hover:border-accent/50 hover:shadow-card ${className}`}
    >
      {/* Solid cursor glow (soft blurred disc, no gradient) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ x: gx, y: gy, opacity: goSoft, backgroundColor: glowColor }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};
