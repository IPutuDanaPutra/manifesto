import type { Entry } from "@/lib/content";
import { Icon } from "./icon";

export function EntryItem({ entry }: { entry: Entry }) {
  return (
    <div className="item">
      <div className="item-icon">
        <div className="item-icon-front">
          <Icon name={entry.icon} />
        </div>
      </div>
      <div className="item-body">
        <div className="item-row">
          <a
            className="title"
            href={entry.href}
            target="_blank"
            rel="noopener"
            data-cursor-icon={entry.cursor.icon}
            data-cursor-text={entry.cursor.text}
          >
            {entry.title}
          </a>
          <time className="date mono" dateTime={entry.dateTime}>
            {entry.date}
          </time>
        </div>
        <p className="desc">{entry.description}</p>
      </div>
    </div>
  );
}
