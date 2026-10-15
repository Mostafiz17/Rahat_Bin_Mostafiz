import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Coffee } from "lucide-react";
import { SocialLinks } from "../ui/SocialLinks";
import { SplitText } from "../ui/AnimatedText";
import { FadeIn } from "../animations/FadeIn";
import { personalInfo } from "../../data/personalInfo";
import { scrollToId } from "../../utils/scroll";

const links = [
  { name: "Home", id: "hero" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Experience", id: "experience" },
  { name: "Contact", id: "contact" },
];

/** Footer: oversized outlined name, quick nav, direct contact, socials and an easter-egg credit. */
export const Footer: React.FC = () => {
  const [coffee, setCoffee] = useState(false);

  return (
    <footer className="relative overflow-hidden border-t border-line pt-20 md:pt-28">
      {/* Oversized outlined name, revealed letter by letter */}
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-muted"
        >
          Thanks for scrolling all the way down
        </motion.p>
        <div className="select-none text-giant font-bold tracking-[-0.05em]">
          <span className="text-outline block">
            <SplitText text="Rahat Bin" by="letter" stagger={0.03} />
          </span>
          <span className="block text-fg">
            <SplitText text="Mostafiz." by="letter" stagger={0.03} />
          </span>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-12 px-5 md:grid-cols-12 md:px-8">
        <FadeIn className="space-y-5 md:col-span-4">
          <p className="max-w-sm text-base leading-relaxed text-muted">
            Software Engineer & Video Editor crafting fast web products and cinematic stories from Dhaka, Bangladesh.
          </p>
          <p className="flex items-center gap-2 text-sm font-medium text-fg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            Available for freelance & collaborations
          </p>
        </FadeIn>

        <FadeIn className="md:col-span-3" delay={0.1}>
        <nav aria-label="Footer">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Navigate</p>
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(l.id);
                  }}
                  className="group inline-flex min-h-10 items-center gap-2 text-base font-medium text-fg transition-colors hover:text-accent"
                >
                  <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-4" />
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        </FadeIn>

        <FadeIn className="space-y-5 md:col-span-5" delay={0.2}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Say hello</p>
          <ul className="space-y-3 text-base">
            <li>
              <a href={`mailto:${personalInfo.emails.personal}`} className="inline-flex min-h-10 items-center gap-3 font-medium text-fg hover:text-accent">
                <Mail className="h-4 w-4 text-accent" /> {personalInfo.emails.personal}
              </a>
            </li>
            <li>
              <a href={`mailto:${personalInfo.emails.work}`} className="inline-flex min-h-10 items-center gap-3 font-medium text-fg hover:text-accent">
                <Mail className="h-4 w-4 text-accent" /> {personalInfo.emails.work}
              </a>
            </li>
            <li className="inline-flex items-center gap-3 text-muted">
              <MapPin className="h-4 w-4 text-accent" /> {personalInfo.location}
            </li>
          </ul>
          <SocialLinks className="pt-2" />
        </FadeIn>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-line px-5 py-8 text-sm text-muted md:flex-row md:px-8">
        <p>© {new Date().getFullYear()} Rahat Bin Mostafiz. All rights reserved.</p>
        <button
          type="button"
          onClick={() => setCoffee((v) => !v)}
          className="inline-flex min-h-10 items-center gap-2 rounded-full px-3 transition-colors hover:text-fg"
          aria-live="polite"
        >
          {coffee ? (
            <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-accent">
              Yes, that's the good stuff. ☕
            </motion.span>
          ) : (
            <>
              Built with React <Coffee className="h-4 w-4" /> in Dhaka
            </>
          )}
        </button>
      </div>
    </footer>
  );
};
