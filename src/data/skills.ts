export interface SkillItem {
  name: string;
  level: number; // 0 - 100
  iconName?: string;
  badge?: string;
  category: "frontend" | "backend" | "database" | "devops" | "editing" | "motion" | "design" | "audio";
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export const softwareSkills: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    description: "Building responsive, accessible, high-performance interfaces",
    skills: [
      { name: "React.js", level: 95, category: "frontend", badge: "Primary" },
      { name: "Next.js", level: 90, category: "frontend", badge: "Core" },
      { name: "TypeScript", level: 88, category: "frontend", badge: "Core" },
      { name: "JavaScript (ES6+)", level: 95, category: "frontend" },
      { name: "Tailwind CSS", level: 98, category: "frontend", badge: "Expert" },
      { name: "Framer Motion", level: 92, category: "frontend" },
      { name: "Redux Toolkit / Zustand", level: 85, category: "frontend" },
      { name: "HTML5 / Semantic Web", level: 96, category: "frontend" }
    ]
  },
  {
    id: "backend",
    title: "Backend & Systems",
    description: "Architecting resilient APIs, services and business logic",
    skills: [
      { name: "Node.js", level: 90, category: "backend", badge: "Core" },
      { name: "Express.js", level: 92, category: "backend" },
      { name: "RESTful APIs", level: 95, category: "backend" },
      { name: "GraphQL", level: 80, category: "backend" },
      { name: "Python", level: 78, category: "backend" },
      { name: "Auth & Security (JWT, OAuth)", level: 86, category: "backend" }
    ]
  },
  {
    id: "database",
    title: "Databases & ORMs",
    description: "Structured data modeling, querying and optimization",
    skills: [
      { name: "MongoDB / Mongoose", level: 90, category: "database", badge: "Core" },
      { name: "PostgreSQL", level: 85, category: "database" },
      { name: "MySQL", level: 82, category: "database" },
      { name: "Prisma ORM", level: 86, category: "database" },
      { name: "Firebase / Supabase", level: 84, category: "database" }
    ]
  },
  {
    id: "devops",
    title: "DevOps & Tooling",
    description: "Deployment pipelines, containerization and version control",
    skills: [
      { name: "Git & GitHub", level: 95, category: "devops", badge: "Essential" },
      { name: "Docker", level: 78, category: "devops" },
      { name: "Vite / Webpack", level: 90, category: "devops" },
      { name: "AWS Cloud (S3, EC2)", level: 74, category: "devops" },
      { name: "Vercel / Netlify / Render", level: 92, category: "devops" },
      { name: "Postman & API Testing", level: 90, category: "devops" }
    ]
  }
];

export const creativeSkills: SkillCategory[] = [
  {
    id: "editing",
    title: "Video Editing Suites",
    description: "Non-linear editing, narrative pacing and storytelling",
    skills: [
      { name: "Adobe Premiere Pro", level: 96, category: "editing", badge: "Primary" },
      { name: "DaVinci Resolve", level: 90, category: "editing", badge: "Colorist" },
      { name: "Final Cut Pro", level: 82, category: "editing" },
      { name: "Multi-cam Editing", level: 92, category: "editing" },
      { name: "Pacing & Narrative Cuts", level: 96, category: "editing" }
    ]
  },
  {
    id: "motion",
    title: "Motion & VFX",
    description: "Dynamic kinetic graphics, titles and visual polish",
    skills: [
      { name: "Adobe After Effects", level: 90, category: "motion", badge: "Core" },
      { name: "Motion Graphics", level: 88, category: "motion" },
      { name: "Kinetic Typography", level: 94, category: "motion" },
      { name: "Visual Effects (VFX)", level: 80, category: "motion" },
      { name: "Compositing & Rotoscoping", level: 82, category: "motion" }
    ]
  },
  {
    id: "grading_audio",
    title: "Post-Production & Audio",
    description: "Color precision, acoustic balance and sound design",
    skills: [
      { name: "Color Grading & Scopes", level: 92, category: "editing", badge: "Key Skill" },
      { name: "LUTs & Look Development", level: 90, category: "editing" },
      { name: "Sound Design & Foley", level: 88, category: "audio" },
      { name: "Audio EQ, Comp & De-noise", level: 86, category: "audio" },
      { name: "Adobe Audition", level: 84, category: "audio" }
    ]
  },
  {
    id: "design",
    title: "Graphic Design & UI/UX",
    description: "Visual assets, social creative, thumbnails and interfaces",
    skills: [
      { name: "Adobe Photoshop", level: 92, category: "design", badge: "Visuals" },
      { name: "Adobe Illustrator", level: 85, category: "design" },
      { name: "Figma (UI/UX)", level: 90, category: "design", badge: "Prototyping" },
      { name: "YouTube Thumbnails & Banners", level: 95, category: "design" }
    ]
  }
];

export const marqueeTechnologies = [
  "React.js",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "Premiere Pro",
  "After Effects",
  "DaVinci Resolve",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "Framer Motion",
  "Figma",
  "Express.js",
  "Git & GitHub",
  "Python",
  "Prisma",
  "Photoshop"
];
