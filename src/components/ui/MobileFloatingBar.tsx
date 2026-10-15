import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ArrowUpRight, FileDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { scrollToId } from "../../utils/scroll";
import { personalInfo } from "../../data/personalInfo";

/**
 * Mobile-only bottom floating action bar.
 * Appears after scrolling 160px; stays thumb-accessible at the bottom of the screen.
 * Hidden on desktop (md:hidden) so PC version stays 100% untouched.
 * Gives mobile visitors 1-tap access to:
 * - Direct Talk (scrolls to Contact)
 * - Resume request
 * - WhatsApp / Email quick actions
 */
export const MobileFloatingBar: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Appear after leaving the hero fold; hide when near the very bottom
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(y > 220 && y < max - 120);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          aria-label="Mobile quick actions"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 360, damping: 28 }}
          className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 md:hidden pointer-events-none"
        >
          <div className="pointer-events-auto flex w-full max-w-sm items-center justify-between gap-2 rounded-full border border-line/80 bg-card/90 p-2 shadow-pop backdrop-blur-2xl">
            {/* 1-tap Contact button with subtle animated pulse badge */}
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="relative flex flex-1 min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-4 text-xs font-bold uppercase tracking-wider text-white active:scale-95 transition-all shadow-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Let's Talk</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-90" />
            </button>

            {/* Quick Resume trigger */}
            <a
              href={`mailto:${personalInfo.emails.personal}?subject=Resume%20Request%20-%20Rahat%20Bin%20Mostafiz`}
              aria-label="Download Resume"
              title="Download Resume"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line bg-canvas/70 text-fg transition-colors active:scale-90"
            >
              <FileDown className="h-4 w-4 text-accent" />
            </a>

            {/* Quick LinkedIn */}
            <a
              href={personalInfo.socials.find((s) => s.name === "LinkedIn")?.url || "https://linkedin.com"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line bg-canvas/70 text-fg transition-colors active:scale-90"
            >
              <FaLinkedin className="h-4 w-4 text-[#0a66c2]" />
            </a>

            {/* Quick GitHub */}
            <a
              href="https://github.com/Mostafiz17"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              title="GitHub"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line bg-canvas/70 text-fg transition-colors active:scale-90"
            >
              <FaGithub className="h-4 w-4" />
            </a>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
