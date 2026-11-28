"use client";

import { useEffect, useRef, useState } from "react";

const FRAMES = [
  "Center",
  "Top",
  "Top-Right",
  "Right",
  "Below-Right",
  "Below",
  "Below-Left",
  "Left",
  "Top-Left",
] as const;
type Frame = (typeof FRAMES)[number];

const DEAD_ZONE = 24; // px from center before it looks away from Center

function frameFor(dx: number, dy: number): Frame {
  if (Math.hypot(dx, dy) <= DEAD_ZONE) return "Center";
  const angle = Math.atan2(dy, dx) * (180 / Math.PI); // -180..180, 0 = right
  if (angle >= -22.5 && angle < 22.5) return "Right";
  if (angle >= 22.5 && angle < 67.5) return "Below-Right";
  if (angle >= 67.5 && angle < 112.5) return "Below";
  if (angle >= 112.5 && angle < 157.5) return "Below-Left";
  if (angle >= 157.5 || angle < -157.5) return "Left";
  if (angle >= -157.5 && angle < -112.5) return "Top-Left";
  if (angle >= -112.5 && angle < -67.5) return "Top";
  return "Top-Right";
}

/** Portrait that looks toward the cursor, swapping between 9 pre-shot frames. */
export function Avatar() {
  const [frame, setFrame] = useState<Frame>("Center");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    // preload so swapping frames is instant, not a fresh fetch each time
    FRAMES.forEach((f) => {
      new Image().src = `/assets/avatar/${f}.png`;
    });

    let rect = img.getBoundingClientRect();
    const onResize = () => {
      rect = img.getBoundingClientRect();
    };
    let queued = false;
    let last: MouseEvent | null = null;
    const update = () => {
      queued = false;
      if (!last) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setFrame(frameFor(last.clientX - cx, last.clientY - cy));
    };
    const onMove = (e: MouseEvent) => {
      last = e;
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="avatar">
      <div className="avatar-inner">
        {/* eslint-disable-next-line @next/next/no-img-element -- frames swap per cursor move */}
        <img ref={imgRef} src={`/assets/avatar/${frame}.png`} alt="Dana" />
      </div>
    </div>
  );
}
