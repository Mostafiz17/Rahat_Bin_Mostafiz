import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ExternalLink } from "lucide-react";
import { Project } from "../../data/projects";
import { lockScroll, unlockScroll } from "../../utils/scroll";
import { EASE_EXPO } from "../../utils/motion";

interface VideoModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

/** Lightbox with an embedded YouTube player (or a poster when no video is set). */
export const VideoModal: React.FC<VideoModalProps> = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    lockScroll();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      unlockScroll();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          key="video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close video"
            onClick={onClose}
            className="absolute inset-0 bg-canvas/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.94 }}
            transition={{ duration: 0.6, ease: EASE_EXPO }}
            className="surface relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl shadow-pop"
          >
            <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
              <div className="min-w-0">
                <p className="truncate text-base font-bold text-fg md:text-lg">{project.title}</p>
                <p className="truncate text-xs text-muted">
                  {project.subCategory} · {project.clientOrContext}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full overflow-hidden bg-black">
              {project.embedId ? (
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${project.embedId}?autoplay=1`}
                  title={project.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="relative h-full w-full">
                  {/* TODO: Replace with actual image */}
                  <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 grid place-items-center bg-black/40">
                    <span className="grid h-20 w-20 place-items-center rounded-full bg-accent text-white">
                      <Play className="ml-1 h-8 w-8 fill-current" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4 overflow-y-auto p-6">
              <p className="text-sm leading-relaxed text-muted">{project.description}</p>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-line px-3 py-1 text-xs font-medium text-fg">
                      {tag}
                    </span>
                  ))}
                </div>
                {project.videoUrl && (
                  <a
                    href={project.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-white transition-transform hover:scale-105"
                  >
                    Watch on YouTube <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
