import { currentlyReading as b } from "@/lib/content";

export function Book() {
  return (
    <div className="book-wrap">
      <a
        className="book"
        href={b.href}
        target="_blank"
        rel="noopener"
        data-cursor-icon={b.cursor.icon}
        data-cursor-text={b.cursor.text}
      >
        <div className="book-inner">
          <div className="book-pages" />
          <div className="book-back" />
          <div className="book-cover">
            {/* eslint-disable-next-line @next/next/no-img-element -- static cover, 3D-transformed */}
            <img className="book-cover-art" src={b.cover} alt={`${b.title} by ${b.author}`} />
            <div className="book-spine-shade" />
          </div>
        </div>
      </a>
    </div>
  );
}
