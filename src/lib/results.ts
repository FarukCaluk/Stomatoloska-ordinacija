import type { StaticImageData } from 'next/image';
import estetika from '@/assets/img/rezultat-estetika.jpg';
import krunice from '@/assets/img/rezultat-krunice.jpg';
import protetika from '@/assets/img/rezultat-protetika.jpg';

/**
 * A before/after photo exactly as the clinic made it: PRIJE on top, POSLIJE below a white line.
 * The file is never cut; the slider just shows one half or the other.
 */
export type BeforeAfter = {
  image: StaticImageData;
  /** First pixel row of the POSLIJE half, just under the white line. */
  afterTop: number;
  /** Pixel rows shown for each half (the shorter of the two). */
  frame: number;
  alt: string;
  title: string;
  text: string;
};

export const results: BeforeAfter[] = [
  {
    image: krunice,
    afterTop: 816,
    frame: 802,
    alt: 'oštećeni i obojeni zubi, pa novi, ujednačeni i svijetli zubi',
    title: 'Potpuno novi osmijeh',
    text: 'Oštećeni i obojeni zubi zamijenjeni su novim, ujednačenim nizom prirodne boje.',
  },
  {
    image: estetika,
    afterTop: 812,
    frame: 805,
    alt: 'požutjeli i neujednačeni prednji zubi, pa svijetao i pravilan niz',
    title: 'Estetika prednjih zuba',
    text: 'Požutjeli i neujednačeni prednji zubi dobili su pravilan oblik i svijetlu, prirodnu boju.',
  },
  {
    image: protetika,
    afterTop: 805,
    frame: 793,
    alt: 'istrošeni zubi i stare krunice, pa novi niz krunica',
    title: 'Krunice i mostovi',
    text: 'Istrošeni zubi i stare krunice zamijenjeni su novim krunicama rađenim po mjeri.',
  },
];
