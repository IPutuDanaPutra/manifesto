"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./icon";

type Label = { icon: string; text: string };

/** Glass pill that follows the mouse over links carrying data-cursor-icon / data-cursor-text. */
export function CursorLabel() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<Label | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    };
    const target = (e: Event) =>
      e.target instanceof Element ? e.target.closest<HTMLElement>("[data-cursor-icon]") : null;
    const over = (e: MouseEvent) => {
      const el = target(e);
      if (el) setLabel({ icon: el.dataset.cursorIcon ?? "", text: el.dataset.cursorText ?? "" });
    };
    const out = (e: MouseEvent) => {
      const el = target(e);
      if (el && !el.contains(e.relatedTarget as Node | null)) setLabel(null);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, []);

  return (
    <div className={`cursor-label${label ? " active" : ""}`} ref={ref} aria-hidden="true">
      <Icon name={label?.icon ?? "medium"} />
      <span>{label?.text ?? ""}</span>
    </div>
  );
}
