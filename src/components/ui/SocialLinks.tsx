import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaBehance,
  FaDribbble,
  FaInstagram,
  FaXTwitter,
  FaFacebook,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import { personalInfo } from "../../data/personalInfo";
import { EASE_EXPO } from "../../utils/motion";

/** Brand colors used for the solid hover fill on each social button. */
const brands: Record<string, { Icon: IconType; color: string }> = {
  Github: { Icon: FaGithub, color: "#111111" },
  Linkedin: { Icon: FaLinkedin, color: "#0a66c2" },
  Youtube: { Icon: FaYoutube, color: "#ff0000" },
  Layers: { Icon: FaBehance, color: "#1769ff" },
  Dribbble: { Icon: FaDribbble, color: "#ea4c89" },
  Instagram: { Icon: FaInstagram, color: "#e4405f" },
  Twitter: { Icon: FaXTwitter, color: "#000000" },
  Facebook: { Icon: FaFacebook, color: "#1877f2" },
};

interface SocialLinksProps {
  className?: string;
  size?: "md" | "lg";
  /** "mount" animates on load (hero), "view" animates when scrolled into view. */
  trigger?: "mount" | "view";
  baseDelay?: number;
  /** External control for the pop-in (e.g. after the preloader lifts). */
  active?: boolean;
}

/** Social icon row: pop-in stagger, scale + rotate on hover, solid brand-color fill. */
export const SocialLinks: React.FC<SocialLinksProps> = ({
  className = "",
  size = "md",
  trigger = "view",
  baseDelay = 0,
  active,
}) => (
  <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
    {personalInfo.socials.map((social, i) => {
      const brand = brands[social.icon] ?? brands.Github;
      const { Icon, color } = brand;
      const size_ = size === "lg" ? "h-14 w-14" : "h-12 w-12";
      const motionProps =
        trigger === "mount"
          ? { animate: active === false ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 } }
          : { whileInView: { opacity: 1, scale: 1 }, viewport: { once: true } };

      return (
        <li key={social.name}>
          <motion.a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            title={social.name}
            initial={{ opacity: 0, scale: 0 }}
            transition={{ delay: baseDelay + i * 0.06, duration: 0.6, ease: EASE_EXPO, type: "spring", stiffness: 260, damping: 18 }}
            {...motionProps}
            whileHover={{ scale: 1.2, rotate: 6 }}
            whileTap={{ scale: 0.9 }}
            style={{ ["--brand" as string]: color }}
            className={`grid ${size_} place-items-center rounded-full border border-line bg-card/70 text-fg transition-colors duration-300 hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-white`}
          >
            <Icon className="h-5 w-5" />
          </motion.a>
        </li>
      );
    })}
  </ul>
);
