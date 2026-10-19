import type { CSSProperties, ReactNode } from 'react';

/** Splits a headline into masked lines that slide up (see .line in globals.css). */
export function Lines({ lines }: { lines: ReactNode[] }) {
  return lines.map((line, i) => (
    <span key={i} className="line" style={{ '--i': i } as CSSProperties}>
      <span>{line}</span>
    </span>
  ));
}
