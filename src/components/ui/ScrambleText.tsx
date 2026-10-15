import React, { useEffect, useRef, useState } from "react";

interface ScrambleTextProps {
  text: string;
  /** Start the decode when this flips to true (e.g. after the loader lifts). */
  active?: boolean;
  className?: string;
  /** Milliseconds between frames. */
  speed?: number;
}

const GLYPHS = "!<>-_\\/[]{}=+*^?#________";

/**
 * Decode/scramble effect: characters flicker through random glyphs and lock
 * in from left to right. A third distinct motion language on top of the
 * mask reveals and typewriter.
 */
export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  active = true,
  className = "",
  speed = 28,
}) => {
  const [output, setOutput] = useState("");
  const frame = useRef(0);
  const raf = useRef(0);

  useEffect(() => {
    if (!active) {
      setOutput("");
      return;
    }

    const totalFrames = text.length * 3 + 8;
    let last = 0;

    const tick = (now: number) => {
      if (now - last >= speed) {
        last = now;
        frame.current += 1;
        const f = frame.current;
        const revealed = Math.floor((f / totalFrames) * text.length * 1.4);

        setOutput(
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < revealed) return char;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join("")
        );

        if (revealed >= text.length) {
          setOutput(text);
          return;
        }
      }
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [text, active, speed]);

  return (
    <span className={className} aria-label={text}>
      {output || "\u00A0"}
    </span>
  );
};
