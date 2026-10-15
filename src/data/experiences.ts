export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  type: "Full-Time" | "Contract" | "Internship";
  location: string;
  current: boolean;
  description: string[];
  skills: string[];
  icon: string;
}

export const experiencesData: ExperienceItem[] = [
  {
    id: "factoryze",
    role: "Software Engineer",
    company: "Factoryze Technologies Limited",
    companyUrl: "https://factoryze.tech",
    period: "2023 · Present",
    type: "Full-Time",
    location: "Dhaka, Bangladesh",
    current: true,
    description: [
      "Building scalable web architectures, modern full-stack web applications, and robust client software.",
      "Developing high-performance software solutions with clean code, type safety, and optimized database queries.",
      "Collaborating closely with cross-functional teams including designers, product managers, and QA engineers to deliver mission-critical features."
    ],
    skills: ["React.js", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "REST APIs", "Tailwind CSS"],
    icon: "Code"
  },
  {
    id: "instaquirk",
    role: "Video Editor",
    company: "Instaquirk",
    period: "2022 · 2023",
    type: "Contract",
    location: "Dhaka, Bangladesh",
    current: false,
    description: [
      "Crafted engaging visual content, commercials, and digital campaigns for diverse brands and creators.",
      "Executed cinematic editing, precise pacing, and compelling short/long-form storytelling.",
      "Performed advanced color grading in DaVinci Resolve, dynamic audio mastering, and motion graphic title sequences."
    ],
    skills: ["Adobe Premiere Pro", "DaVinci Resolve", "After Effects", "Color Grading", "Sound Design"],
    icon: "Video"
  },
  {
    id: "binary-physics",
    role: "Creative Tech Specialist",
    company: "Binary Physics",
    period: "2021 · 2022",
    type: "Internship",
    location: "Dhaka, Bangladesh",
    current: false,
    description: [
      "Worked at the intersection of technology and media, merging technical code logic with visual design aesthetics.",
      "Built interactive media components, web graphics, and animated prototypes for digital campaigns.",
      "Gained hands-on experience in creative tech solutions and rapid prototyping."
    ],
    skills: ["JavaScript", "CSS Animation", "Motion Design", "UI Prototyping", "Adobe Creative Suite"],
    icon: "Sparkles"
  }
];
