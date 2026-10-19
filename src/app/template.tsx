'use client';

import { useEffect } from 'react';

// Flipped once the first page has hydrated: the curtain plays on page changes only,
// so a first visit paints instantly.
let navigated = false;

// Remounts on every navigation, so the CSS curtain plays again for each new page.
export default function Template({ children }: { children: React.ReactNode }) {
  const curtain = navigated;
  useEffect(() => {
    navigated = true;
  }, []);
  return (
    <>
      {curtain && <div aria-hidden className="curtain" />}
      {children}
    </>
  );
}
