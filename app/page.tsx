import { Avatar } from "@/components/avatar";
import { Book } from "@/components/book";
import { CursorLabel } from "@/components/cursor-label";
import { EdgeFade } from "@/components/edge-fade";
import { EntryItem } from "@/components/entry-item";
import { SectionHeading } from "@/components/section-heading";
import { projects, writings } from "@/lib/content";

export default function Home() {
  return (
    <>
      <EdgeFade edge="top" />
      <EdgeFade edge="bottom" />
      <main>
        <header className="intro">
          <Avatar />
          <div>
            <h1>Dana</h1>
            <p>Design Systems Architect · Design Engineer · Experience Designer · DesignOps</p>
          </div>
        </header>

        <p className="lede">
          This is a running record of what I build and think about. I care about{" "}
          <em>craft and quality</em> — small, well-made things over big, sloppy ones. Mostly
          engineering, AI, and design experiments, written down as I go.
        </p>

        <p className="status">
          Currently at
          {/* eslint-disable-next-line @next/next/no-img-element -- svg brand marks */}
          <img className="brand-logo farmacare" src="/assets/logos/farmacare.svg" alt="Farmacare" />
          · Trusted by
          {/* eslint-disable-next-line @next/next/no-img-element -- svg brand marks */}
          <img className="brand-logo samsung" src="/assets/logos/samsung.svg" alt="Samsung" />,
          {/* eslint-disable-next-line @next/next/no-img-element -- svg brand marks */}
          <img className="brand-logo uxcel" src="/assets/logos/uxcel.svg" alt="Uxcel" />
          &amp;{" "}
          <a href="https://www.linkedin.com/in/iputudanaputra/" target="_blank" rel="noopener">
            beyond
          </a>
          .
        </p>

        <section>
          <SectionHeading>Projects</SectionHeading>
          {projects.map((p) => (
            <EntryItem key={p.href} entry={p} />
          ))}
        </section>

        <section>
          <SectionHeading>Writings</SectionHeading>
          {writings.map((w) => (
            <EntryItem key={w.href} entry={w} />
          ))}
        </section>

        <section>
          <SectionHeading>Currently Reading</SectionHeading>
          <Book />
        </section>

        <footer>
          <span>© {new Date().getFullYear()} I Putu Dana Putra</span>
          <a href="mailto:danaputu09@gmail.com">danaputu09@gmail.com</a>
        </footer>

        <CursorLabel />
      </main>
    </>
  );
}
