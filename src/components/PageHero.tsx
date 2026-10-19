import type { ReactNode } from 'react';
import { Lines } from './Lines';

/** Opening block of every inner page: giant title and a short lead. */
export function PageHero({ title, lead }: { title: ReactNode[]; lead: ReactNode }) {
  return (
    <header className="shell pb-[clamp(3rem,7vw,6rem)] pt-[clamp(8rem,16vw,13rem)]">
      <h1 className="type-display lines-hero text-[clamp(2.4rem,11.5vw,13rem)]">
        <Lines lines={title} />
      </h1>
      <div className="mt-10 grid border-t border-line pt-8 lg:grid-cols-12">
        <p className="hero-fade text-lg text-muted lg:col-span-6 lg:col-start-7 lg:text-xl">{lead}</p>
      </div>
    </header>
  );
}
