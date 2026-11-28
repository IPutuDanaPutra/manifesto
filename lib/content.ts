export type IconName = "figma" | "brain" | "file-braces" | "notebook-pen";
export type CursorIcon = "figma" | "github" | "medium" | "amazon";

export type Entry = {
  title: string;
  href: string;
  /** Display date and machine-readable month for <time datetime>. */
  date: string;
  dateTime: string;
  description: string;
  icon: IconName;
  cursor: { icon: CursorIcon; text: string };
};

export const projects: Entry[] = [
  {
    title: "DESIGN.md to Figma",
    href: "https://www.figma.com/community/plugin/1673736865256019639/design-md-to-figma",
    date: "Aug 2026",
    dateTime: "2026-08",
    description:
      "Figma plugin that turns a DESIGN.md file into real Variables, Color Styles, Text Styles, and a documentation frame.",
    icon: "figma",
    cursor: { icon: "figma", text: "View on Figma" },
  },
  {
    title: "illustration-craft",
    href: "https://github.com/IPutuDanaPutra/illustration-craft",
    date: "Aug 2026",
    dateTime: "2026-08",
    description: "A guided illustration-generation skill for ChatGPT.",
    icon: "brain",
    cursor: { icon: "github", text: "View on GitHub" },
  },
  {
    title: "graphic-designer-json",
    href: "https://github.com/IPutuDanaPutra/graphic-designer-json",
    date: "Aug 2026",
    dateTime: "2026-08",
    description: "A JSON template for on-brand AI marketing designs.",
    icon: "file-braces",
    cursor: { icon: "github", text: "View on GitHub" },
  },
];

export const writings: Entry[] = [
  {
    title: "How I turned a static design system into an AI teammate",
    href: "https://medium.com/design-bootcamp/how-i-turned-a-static-design-system-into-an-ai-teammate-a1e87feb43a9",
    date: "Jul 2026",
    dateTime: "2026-07",
    description: "A solo designer turns a design system into leverage.",
    icon: "notebook-pen",
    cursor: { icon: "medium", text: "Read on Medium" },
  },
  {
    title: "Optimize your design engine: getting started with DesignOps (even as a team of one)",
    href: "https://medium.com/optimize-your-design-engine-getting-started-with-designops-even-as-a-team-of-one-2df346595471",
    date: "Apr 2025",
    dateTime: "2025-04",
    description: "A practical guide to building scalable DesignOps as a team of one.",
    icon: "notebook-pen",
    cursor: { icon: "medium", text: "Read on Medium" },
  },
];

export const currentlyReading = {
  title: "Train Dreams",
  author: "Denis Johnson",
  href: "https://www.amazon.com/s?k=Train+Dreams+Denis+Johnson",
  cover: "/assets/book-train-dreams.jpg",
  cursor: { icon: "amazon", text: "Buy on Amazon" } as { icon: CursorIcon; text: string },
};
