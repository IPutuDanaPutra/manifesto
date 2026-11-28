"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/** Section label that scrambles and settles left-to-right on hover. */
export function SectionHeading({ children }: { children: string }) {
  const [text, setText] = useState(children);
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const scramble = () => {
    cancelAnimationFrame(raf.current);
    let frame = 0;
    const step = () => {
      frame++;
      setText(
        children
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (frame >= i * 2 + 8) return ch; // letters lock in left-to-right
            return CHARS[Math.floor(Math.random() * CHARS.length)] ?? ch;
          })
          .join(""),
      );
      if (frame < children.length * 2 + 8) raf.current = requestAnimationFrame(step);
      else setText(children);
    };
    step();
  };

  return <h2 onMouseEnter={scramble}>{text}</h2>;
}
