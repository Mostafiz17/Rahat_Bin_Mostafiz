import React from "react";

interface EqualizerProps {
  bars?: number;
  className?: string;
  /** Color of the bars (any CSS color). */
  color?: string;
}

/**
 * Animated audio equalizer bars, the signature motion-graphic of the
 * video-editor side of the brand. Pure CSS animation, GPU-friendly.
 */
export const Equalizer: React.FC<EqualizerProps> = ({ bars = 5, className = "", color = "var(--accent)" }) => (
  <div className={`flex h-4 items-end gap-[3px] ${className}`} aria-hidden="true">
    {Array.from({ length: bars }).map((_, i) => (
      <span
        key={i}
        className="w-[3px] rounded-full"
        style={{
          backgroundColor: color,
          animation: `eq-bounce ${0.7 + (i % 3) * 0.25}s ease-in-out ${i * 0.13}s infinite`,
          height: "30%",
        }}
      />
    ))}
  </div>
);

/**
 * Animated layered sine-wave section divider. Two periodic SVG paths drift
 * horizontally at different speeds for a parallax "liquid" seam between sections.
 */
export const WaveDivider: React.FC<{ flip?: boolean; className?: string }> = ({ flip = false, className = "" }) => {
  // Period 360 units, repeated 8 times = 2880; translating -50% (1440 = 4 periods) loops seamlessly.
  const seg = "C90,96 270,32 360,64 ";
  const d = `M0,64 ${seg.repeat(8)}L2880,120 L0,120 Z`;

  return (
    <div
      aria-hidden="true"
      className={`relative h-14 overflow-hidden md:h-20 ${flip ? "rotate-180" : ""} ${className}`}
    >
      {/* Back layer: slow, accent-tinted */}
      <svg
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
        className="wave-track absolute inset-y-0 left-0 h-full w-[200%]"
        style={{ animationDuration: "26s", animationDirection: "reverse" }}
      >
        <path d={d} fill="var(--accent)" opacity="0.08" />
      </svg>
      {/* Front layer: faster, surface-tinted */}
      <svg
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
        className="wave-track absolute inset-y-0 left-0 h-full w-[200%]"
        style={{ animationDuration: "16s" }}
      >
        <path d={d} fill="var(--line)" opacity="0.5" />
      </svg>
    </div>
  );
};
