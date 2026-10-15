import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

/** Called once from App after Lenis is created. */
export const setLenis = (instance: Lenis | null) => {
  lenisInstance = instance;
};

/** Pause/resume Lenis (used while overlays like the mobile menu are open). */
export const lockScroll = () => lenisInstance?.stop();
export const unlockScroll = () => lenisInstance?.start();

/**
 * Visual height of the fixed navbar, measured live at click time,
 * plus a comfortable gap. A section's top edge should rest exactly here.
 */
const landingOffset = () => {
  const header = document.querySelector("header");
  if (!header) return 96;
  return Math.ceil(header.getBoundingClientRect().bottom + 16);
};

/**
 * Smoothly scroll to a section id.
 * Uses Lenis when available, then VERIFIES the landing position and corrects
 * any miss (e.g. from layout shifting mid-flight) · so the target section
 * always ends up exactly below the navbar, never the previous one.
 */
export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  // No Lenis (SSR / reduced setups): precise native scroll.
  if (!lenisInstance) {
    const top = window.scrollY + el.getBoundingClientRect().top - landingOffset();
    window.scrollTo({ top, behavior: "smooth" });
    return;
  }

  let done = false;
  let interrupted = false;
  const markInterrupted = () => {
    interrupted = true;
  };
  window.addEventListener("wheel", markInterrupted, { passive: true });
  window.addEventListener("touchmove", markInterrupted, { passive: true });

  const cleanup = () => {
    window.removeEventListener("wheel", markInterrupted);
    window.removeEventListener("touchmove", markInterrupted);
  };

  /** Confirm we landed exactly on the target; snap-correct if we missed. */
  const verify = () => {
    if (done) return;
    done = true;
    cleanup();
    if (interrupted) return; // user took over mid-flight · respect that
    const want = landingOffset();
    const miss = el.getBoundingClientRect().top - want;
    if (Math.abs(miss) > 6) {
      lenisInstance?.scrollTo(el, {
        offset: -landingOffset(),
        immediate: true,
        force: true,
      });
    }
  };

  lenisInstance.scrollTo(el, {
    offset: -landingOffset(),
    duration: 1.3,
    onComplete: verify,
  });
  // Safety net in case onComplete never fires.
  window.setTimeout(verify, 2000);
};
