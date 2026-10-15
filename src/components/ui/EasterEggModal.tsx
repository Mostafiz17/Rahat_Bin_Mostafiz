import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Terminal } from "lucide-react";
import confetti from "canvas-confetti";
import { lockScroll, unlockScroll } from "../../utils/scroll";
import { EASE_EXPO } from "../../utils/motion";

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Secret achievement (logo ×5 or Konami code). Fires confetti on open. */
export const EasterEggModal: React.FC<EasterEggModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    lockScroll();
    document.body.style.overflow = "hidden";
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ["#6366f1", "#8b5cf6", "#06b6d4", "#f9fafb"] });
    const t = window.setTimeout(() => {
      confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1 } });
    }, 250);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      unlockScroll();
      document.body.style.overflow = "";
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="easter-egg"
          role="dialog"
          aria-modal="true"
          aria-label="Secret achievement"
          className="fixed inset-0 z-[130] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-canvas/80 backdrop-blur-md" />
          <motion.div
            initial={{ scale: 0.7, opacity: 0, rotate: -4 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_EXPO }}
            className="surface relative z-10 w-full max-w-md overflow-hidden rounded-3xl p-7 text-center shadow-pop"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close achievement"
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-line hover:text-fg"
            >
              <X className="h-4 w-4" />
            </button>

            <motion.div
              animate={{ rotate: [0, 12, -12, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1 }}
              className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-accent text-white"
            >
              <Sparkles className="h-8 w-8" />
            </motion.div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Achievement unlocked</p>
            <h3 className="mb-3 text-2xl font-bold text-fg">You found the secret sandbox 🚀</h3>
            <p className="mb-6 text-sm leading-relaxed text-muted">
              Software engineering solves computational bottlenecks. Cinematic storytelling captures human attention.
              Combine them and something special happens.
            </p>

            <div className="mb-6 rounded-2xl border border-line bg-canvas/60 p-4 text-left text-xs leading-6 text-fg">
              <p className="flex items-center gap-2 text-muted">
                <Terminal className="h-3.5 w-3.5" /> whoami
              </p>
              <p className="text-accent">Rahat Bin Mostafiz · Dhaka, BD</p>
              <p className="mt-1 text-muted">status</p>
              <p>Ready to build your next breakthrough.</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="min-h-12 w-full rounded-full bg-fg text-sm font-semibold text-canvas transition-transform hover:scale-[1.02]"
            >
              Awesome, let's explore
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
