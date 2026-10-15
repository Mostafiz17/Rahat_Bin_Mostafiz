export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
  badge?: string;
}

export interface StatItem {
  value: string;
  numberValue: number;
  suffix: string;
  label: string;
  description: string;
  icon: string;
}

export const personalInfo = {
  name: "Rahat Bin Mostafiz",
  shortName: "Rahat",
  title: "Software Engineer & Video Editor",
  tagline: "Building at the Intersection of Code and Content",
  bio: "I'm Rahat Bin Mostafiz, a Software Engineer and Video Editor from Bangladesh. I build modern, high-performance web applications and software solutions, while also working on cinematic video editing and visual storytelling. My work combines technical problem-solving with creative thinking.",
  location: "Dhaka, Bangladesh",
  status: "Available for freelance & collaborations",
  availableForHire: true,
  emails: {
    personal: "rbmostafiz211@gmail.com",
    work: "mostafiz@factoryze.tech",
  },
  roles: [
    "Software Engineer",
    "Video Editor",
    "Full-Stack Architect",
    "Motion Designer",
    "Creative Technologist",
    "Problem Solver"
  ],
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/Mostafiz17",
      icon: "Github",
      color: "hover:text-[#ffffff] hover:border-gray-400 hover:bg-[#24292e]/20",
      handle: "@Mostafiz17"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/rahat-bin-mostafiz-8733b8402/",
      icon: "Linkedin",
      color: "hover:text-[#0077b5] hover:border-[#0077b5]/50 hover:bg-[#0077b5]/10",
      handle: "rahat-bin-mostafiz"
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@RBMostafiz",
      icon: "Youtube",
      color: "hover:text-[#ff0000] hover:border-[#ff0000]/50 hover:bg-[#ff0000]/10",
      handle: "@RBMostafiz"
    },
    {
      name: "Behance",
      url: "https://www.behance.net/rbmostafiz",
      icon: "Layers",
      color: "hover:text-[#1769ff] hover:border-[#1769ff]/50 hover:bg-[#1769ff]/10",
      handle: "rbmostafiz"
    },
    {
      name: "Dribbble",
      url: "https://dribbble.com/rahat-bin-mostafiz",
      icon: "Dribbble",
      color: "hover:text-[#ea4c89] hover:border-[#ea4c89]/50 hover:bg-[#ea4c89]/10",
      handle: "rahat-bin-mostafiz"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/rbmostafiz/",
      icon: "Instagram",
      color: "hover:text-[#e4405f] hover:border-[#e4405f]/50 hover:bg-[#e4405f]/10",
      handle: "@rbmostafiz"
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/rbmostafiz",
      icon: "Twitter",
      color: "hover:text-[#1da1f2] hover:border-[#1da1f2]/50 hover:bg-[#1da1f2]/10",
      handle: "@rbmostafiz"
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/rbmostafiz.17",
      icon: "Facebook",
      color: "hover:text-[#1877f2] hover:border-[#1877f2]/50 hover:bg-[#1877f2]/10",
      handle: "rbmostafiz.17"
    }
  ],
  stats: [
    {
      value: "500+",
      numberValue: 500,
      suffix: "+",
      label: "GitHub Commits",
      description: "Consistent shipping & open source contributions",
      icon: "GitCommit"
    },
    {
      value: "50+",
      numberValue: 50,
      suffix: "+",
      label: "Videos Edited",
      description: "Commercials, reels & cinematic visual stories",
      icon: "Film"
    },
    {
      value: "3+",
      numberValue: 3,
      suffix: "+",
      label: "Years Experience",
      description: "Bridging software engineering & digital media",
      icon: "Clock"
    },
    {
      value: "100%",
      numberValue: 100,
      suffix: "%",
      label: "Coffee Fuel",
      description: "Infinite dedication to craft and detail",
      icon: "Coffee"
    }
  ],
  services: [
    {
      id: "web-dev",
      title: "Full-Stack Web Engineering",
      description: "Architecting scalable, lightning-fast web applications with modern tech stacks like React, Next.js, Node.js, and clean API design.",
      icon: "Code2",
      tags: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
      accent: "from-indigo-500/20 to-blue-500/20",
      borderAccent: "group-hover:border-indigo-500/50"
    },
    {
      id: "video-edit",
      title: "Cinematic Video Editing",
      description: "Crafting captivating visual pacing, documentary and commercial narratives with precision pacing, dynamic sound design, and color grading.",
      icon: "Video",
      tags: ["Premiere Pro", "DaVinci Resolve", "Color Grading", "Sound Design", "VFX"],
      accent: "from-violet-500/20 to-purple-500/20",
      borderAccent: "group-hover:border-violet-500/50"
    },
    {
      id: "motion-design",
      title: "Motion Graphics & VFX",
      description: "Designing kinetic typography, logo animations, animated UI product reveals, and visual effects in Adobe After Effects.",
      icon: "Sparkles",
      tags: ["After Effects", "Kinetic Typography", "2D Animation", "UI Mockups"],
      accent: "from-cyan-500/20 to-teal-500/20",
      borderAccent: "group-hover:border-cyan-500/50"
    },
    {
      id: "ui-ux",
      title: "UI/UX & Creative Tech",
      description: "Bridging the gap between design and code with high-fidelity Figma prototypes, micro-interactions, responsive systems, and design tokens.",
      icon: "Palette",
      tags: ["Figma", "Design Systems", "Framer Motion", "Responsive UX"],
      accent: "from-rose-500/20 to-orange-500/20",
      borderAccent: "group-hover:border-rose-500/50"
    }
  ]
};
