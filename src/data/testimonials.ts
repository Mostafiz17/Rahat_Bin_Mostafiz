export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarText: string;
  rating: number;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "1",
    name: "Tanvir Ahmed",
    role: "Engineering Lead",
    company: "Factoryze Technologies",
    quote: "Rahat brings an exceptional blend of rock-solid coding principles and visual intuition. He writes clean, modular TypeScript that just works, and his attention to micro-interactions makes every user flow feel premium.",
    avatarText: "TA",
    rating: 5
  },
  {
    id: "2",
    name: "Farhan Shakil",
    role: "Creative Director",
    company: "Instaquirk Media",
    quote: "Working with Rahat on video projects was effortless. He has a rare cinematic sense for pacing, sound design, and color that turns raw footage into an emotional narrative. A true craftsman behind the timeline.",
    avatarText: "FS",
    rating: 5
  },
  {
    id: "3",
    name: "Sadia Chowdhury",
    role: "Product Designer",
    company: "Binary Physics",
    quote: "Having Rahat on our team was a huge win. Because he understands both software architecture and visual design, translating complex wireframes into responsive, fluid animations was seamless and quick.",
    avatarText: "SC",
    rating: 5
  },
  {
    id: "4",
    name: "Mahmud Hasan",
    role: "Startup Founder",
    company: "NexGen Labs",
    quote: "Rahat developed our core web application MVP and cut our product video teaser. The result blew our investors away. Fast communication, disciplined deadlines, and world-class execution.",
    avatarText: "MH",
    rating: 5
  }
];
