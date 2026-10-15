// Project thumbnails live in public/images/ so they ship with the build.
// TODO: Replace with actual images · swap these files with real project screenshots.

export interface Project {
  id: string;
  title: string;
  category: "software" | "video";
  subCategory: string; // e.g. "Full-Stack Web App", "Cinematic Commercial", "SaaS Platform"
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  clientOrContext?: string;
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  embedId?: string; // YouTube or Vimeo ID
  featured: boolean;
  metrics?: string;
}


export const projectsData: Project[] = [
  {
    id: "dev-craft-saas",
    title: "NovaFlow · Developer Workflow SaaS",
    category: "software",
    subCategory: "Full-Stack SaaS Platform",
    description: "An intuitive collaborative workspace for agile dev teams featuring real-time kanban boards, live chat, sprint analytics, and GitHub integration.",
    image: "/images/project-saas.jpg",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Prisma"],
    clientOrContext: "Factoryze Tech Labs",
    liveUrl: "https://github.com/Mostafiz17",
    githubUrl: "https://github.com/Mostafiz17",
    featured: true,
    metrics: "Sub-100ms API latency, real-time sync"
  },
  {
    id: "cinematic-brand-film",
    title: "Echoes of Dhaka · Cinematic Brand Documentary",
    category: "video",
    subCategory: "Cinematic Visual Story",
    description: "A fast-paced, high-energy documentary commercial highlighting urban life and contemporary tech creators in Bangladesh with seamless sound design and color grading.",
    image: "/images/project-video.jpg",
    tags: ["Premiere Pro", "DaVinci Resolve", "Color Grading", "Sound Design", "After Effects"],
    clientOrContext: "Instaquirk Studio",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    embedId: "dQw4w9WgXcQ",
    featured: true,
    metrics: "250K+ organic views across socials"
  },
  {
    id: "stream-hub-platform",
    title: "VividStream · High-Performance Media Platform",
    category: "software",
    subCategory: "Media Streaming & Transcoding App",
    description: "A cloud-connected video streaming web application with adaptive bitrate streaming, custom video player controls, interactive timecode comments, and thumbnail generation.",
    image: "/images/about-workspace.jpg",
    tags: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS", "AWS S3"],
    clientOrContext: "Open Source / Independent",
    liveUrl: "https://github.com/Mostafiz17",
    githubUrl: "https://github.com/Mostafiz17",
    featured: true,
    metrics: "Adaptive 4K / 1080p video player"
  },
  {
    id: "apex-commerce",
    title: "Apex Luxe · Modern Headless E-Commerce",
    category: "software",
    subCategory: "Next.js E-Commerce Engine",
    description: "Ultra-fast headless e-commerce storefront with instantaneous page transitions, cart persistence, dynamic filtering, and integrated Stripe payments.",
    image: "/images/project-saas.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Stripe API"],
    clientOrContext: "Client Solution",
    liveUrl: "https://github.com/Mostafiz17",
    githubUrl: "https://github.com/Mostafiz17",
    featured: false,
    metrics: "99+ Lighthouse performance score"
  },
  {
    id: "kinetic-reels-showcase",
    title: "Kinetic Velocity · Tech Brand Launch Teaser",
    category: "video",
    subCategory: "Motion Graphics & Commercial",
    description: "Dynamic product launch teaser featuring 3D text typography, match-cuts, customized SFX, and high-contrast neo-noir color grading.",
    image: "/images/project-video.jpg",
    tags: ["After Effects", "Premiere Pro", "Kinetic Type", "SFX Master", "Sound Mixing"],
    clientOrContext: "Brand Campaign",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    embedId: "dQw4w9WgXcQ",
    featured: true,
    metrics: "4K 60FPS master delivery"
  },
  {
    id: "ai-prompt-studio",
    title: "NeuroCanvas · Creative AI Assistant Tool",
    category: "software",
    subCategory: "Full-Stack Web App",
    description: "AI-assisted prompt generation and media management interface helping digital artists and editors organize project b-roll, audio stems, and scripts.",
    image: "/images/about-workspace.jpg",
    tags: ["React", "Express.js", "Tailwind CSS", "REST API", "Vite"],
    clientOrContext: "Creative Tech Specialist Project",
    liveUrl: "https://github.com/Mostafiz17",
    githubUrl: "https://github.com/Mostafiz17",
    featured: false,
    metrics: "Active daily users & editor presets"
  }
];
