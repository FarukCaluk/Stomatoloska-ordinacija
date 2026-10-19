import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** gsap.matchMedia query: animate only when the visitor has not asked for reduced motion. */
export const NO_REDUCE = '(prefers-reduced-motion: no-preference)';

export { gsap, ScrollTrigger, useGSAP };
