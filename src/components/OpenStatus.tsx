'use client';

import { useSyncExternalStore } from 'react';
import { sarajevoNow, workStatus } from '@/lib/hours';

const everyMinute = (cb: () => void) => {
  const id = setInterval(cb, 60_000);
  return () => clearInterval(id);
};
const statusText = () => {
  const { day, hour } = sarajevoNow();
  const s = workStatus(day, hour);
  return `${s.open ? 1 : 0}${s.text}`;
};
const yearText = () => String(sarajevoNow().year);

/** Live "open / closed" line. Renders nothing on the server, so the static HTML never lies. */
export function OpenStatus({ className = '' }: { className?: string }) {
  const value = useSyncExternalStore(everyMinute, statusText, () => null);
  if (!value) return null;
  const open = value[0] === '1';
  return (
    <span className={`inline-flex items-start gap-2 ${className}`}>
      <span className={`mt-[0.6em] size-2 shrink-0 rounded-full ${open ? 'bg-[#5fbf6a]' : 'bg-muted/60'}`} />
      {value.slice(1)}
    </span>
  );
}

export function CurrentYear() {
  return useSyncExternalStore(everyMinute, yearText, () => '2026');
}
