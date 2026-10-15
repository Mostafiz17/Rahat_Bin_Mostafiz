import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Variant = "solid" | "outline" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  variant?: Variant;
  /** Enables the magnetic cursor pull effect. */
  magnetic?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

/* Solid colors only · no gradients. Each variant has a fill layer that wipes in on hover. */
const variantStyles: Record<Variant, { base: string; fill: string; hoverText: string }> = {
  solid: {
    base: "bg-accent text-white shadow-card hover:shadow-pop",
    fill: "bg-fg",
    hoverText: "group-hover:text-canvas",
  },
  outline: {
    base: "border-2 border-fg/15 text-fg hover:border-accent",
    fill: "bg-accent",
    hoverText: "group-hover:text-white",
  },
  ghost: {
    base: "text-fg px-2 rounded-full",
    fill: "bg-line/70",
    hoverText: "",
  },
};

/**
 * Animated CTA: magnetic pull toward the cursor, hover scale, wipe-fill and a
 * click ripple. Meets the 48px minimum touch target.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  variant = "solid",
  magnetic = true,
  className = "",
  type = "button",
  disabled = false,
  target,
  rel,
  ariaLabel,
}) => {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 16, mass: 0.4 });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!magnetic || !wrapperRef.current || disabled) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.25);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    window.setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
    onClick?.(e);
  };

  const styles = variantStyles[variant];
  const classes = `group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 ${styles.base} ${
    disabled ? "pointer-events-none opacity-60" : ""
  } ${className}`;

  const content = (
    <>
      <span
        aria-hidden="true"
        className={`absolute inset-0 origin-left scale-x-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 ${styles.fill}`}
      />
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          aria-hidden="true"
          initial={{ scale: 0, opacity: 0.35 }}
          animate={{ scale: 28, opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="pointer-events-none absolute -ml-3 -mt-3 h-6 w-6 rounded-full bg-white/60"
          style={{ left: r.x, top: r.y }}
        />
      ))}
      <span className={`relative z-10 inline-flex items-center gap-2 transition-colors duration-300 ${styles.hoverText}`}>
        {children}
      </span>
    </>
  );

  return (
    <motion.span
      ref={wrapperRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="inline-flex"
    >
      {href ? (
        <a href={href} target={target} rel={rel} aria-label={ariaLabel} className={classes} onClick={handleClick}>
          {content}
        </a>
      ) : (
        <button type={type} disabled={disabled} aria-label={ariaLabel} className={classes} onClick={handleClick}>
          {content}
        </button>
      )}
    </motion.span>
  );
};
