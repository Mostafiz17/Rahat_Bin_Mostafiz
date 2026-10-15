import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Play, Layers, Code2, Film, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { SectionHeading } from "../ui/SectionHeading";
import { SpotlightCard } from "../ui/SpotlightCard";
import { VideoModal } from "../ui/VideoModal";
import { Button } from "../ui/Button";
import { projectsData, Project } from "../../data/projects";
import { EASE, EASE_EXPO } from "../../utils/motion";

type FilterType = "all" | "software" | "video";

const filters: { id: FilterType; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All work", icon: <Layers className="h-4 w-4" /> },
  { id: "software", label: "Software", icon: <Code2 className="h-4 w-4" /> },
  { id: "video", label: "Video & creative", icon: <Film className="h-4 w-4" /> },
];

/** Image that reveals with a clip-path wipe when it scrolls into view. */
const RevealImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <motion.div
    initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
    whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
    viewport={{ once: true }}
    transition={{ duration: 1.1, ease: EASE_EXPO }}
    className="absolute inset-0"
  >
    {/* TODO: Replace with actual image */}
    <motion.img
      src={src}
      alt={alt}
      loading="lazy"
      whileInView={{ scale: 1 }}
      initial={{ scale: 1.2 }}
      viewport={{ once: true }}
      transition={{ duration: 1.6, ease: EASE_EXPO }}
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
    />
  </motion.div>
);

const ProjectCard: React.FC<{ project: Project; index: number; onPlay: (p: Project) => void }> = ({
  project,
  index,
  onPlay,
}) => {
  const isVideo = project.category === "video";

  return (
    <SpotlightCard className="flex h-full flex-col">
      {/* Thumbnail */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-line">
        <RevealImage src={project.image} alt={project.title} />
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-canvas/90 px-3 py-1 text-[11px] font-semibold text-fg backdrop-blur">
            {project.subCategory}
          </span>
        </div>
        <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-bold tabular-nums text-white">
          0{index + 1}
        </span>

        {isVideo && (
          <button
            type="button"
            onClick={() => onPlay(project)}
            data-cursor="Play"
            aria-label={`Play ${project.title}`}
            className="absolute inset-0 grid place-items-center"
          >
            <span className="grid h-20 w-20 place-items-center rounded-full bg-white text-black shadow-pop transition-transform duration-500 group-hover:scale-110">
              <Play className="ml-1 h-7 w-7 fill-current" />
            </span>
          </button>
        )}

        {project.clientOrContext && (
          <p className="absolute bottom-4 left-4 right-4 truncate text-xs font-medium text-white">
            Client · {project.clientOrContext}
          </p>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-bold leading-tight text-fg">{project.title}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 5).map((tag) => (
            <span key={tag} className="rounded-full border border-line px-2.5 py-1 text-[11px] font-medium text-fg">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-7">
          {isVideo ? (
            <Button variant="outline" onClick={() => onPlay(project)} magnetic={false} className="px-5 py-3">
              <Play className="h-4 w-4 fill-current" /> Watch showcase
            </Button>
          ) : (
            <>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="View"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-white transition-transform hover:scale-105"
                >
                  Live demo <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-line px-5 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  <FaGithub className="h-4 w-4" /> Source
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
};

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [activeVideo, setActiveVideo] = useState<Project | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const visible = projectsData.filter((p) => filter === "all" || p.category === filter);
  const counts: Record<FilterType, number> = {
    all: projectsData.length,
    software: projectsData.filter((p) => p.category === "software").length,
    video: projectsData.filter((p) => p.category === "video").length,
  };

  const openVideo = useCallback((project: Project) => {
    setActiveVideo(project);
    setVideoOpen(true);
  }, []);
  const closeVideo = useCallback(() => setVideoOpen(false), []);

  return (
    <section id="projects" className="relative scroll-mt-24 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            index="03"
            eyebrow="Selected work"
            title="Featured"
            titleAccent="projects."
          />

          <div role="tablist" aria-label="Filter projects" className="mb-8 sm:mb-14 flex flex-wrap gap-1.5 sm:gap-2 md:mb-20">
            {filters.map((f) => {
              const selected = filter === f.id;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setFilter(f.id)}
                  className={`relative inline-flex min-h-11 sm:min-h-12 items-center gap-1.5 sm:gap-2 rounded-full border px-3.5 sm:px-5 text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                    selected ? "border-transparent text-white" : "border-line text-fg hover:border-accent hover:text-accent"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="project-filter"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-accent"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {f.icon}
                    {f.label}
                    <span className={`tabular-nums text-xs ${selected ? "text-white/80" : "text-muted"}`}>
                      ({counts[f.id]})
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Layout-animated grid: cards glide into their new positions when filtered */}
        <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 60, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                className="group h-full"
              >
                <ProjectCard project={project} index={i} onPlay={openVideo} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-16 flex flex-col items-center justify-between gap-6 rounded-3xl border border-line bg-card/60 p-8 md:flex-row"
        >
          <p className="max-w-md text-lg font-semibold text-fg">
            Want to see more repositories, experiments and edits?
          </p>
          <Button href="https://github.com/Mostafiz17" target="_blank" rel="noopener noreferrer" variant="solid">
            <FaGithub className="h-4 w-4" /> View GitHub <ArrowUpRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      <VideoModal project={activeVideo} isOpen={videoOpen} onClose={closeVideo} />
    </section>
  );
};
