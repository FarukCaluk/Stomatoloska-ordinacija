import type { StaticImageData } from 'next/image';
import pregled from '@/assets/img/dr-karic-pregled.jpg';
import ordinacija1i2 from '@/assets/img/ordinacija-1-i-2.jpg';
import ordinacija2 from '@/assets/img/ordinacija-2.jpg';
import rezultatEstetika from '@/assets/img/rezultat-estetika.jpg';
import rezultatProtetika from '@/assets/img/rezultat-protetika.jpg';

export const site = {
  name: 'Stomatološka ordinacija Dr. Karić',
  phone: { display: '061 608 483', href: 'tel:+38761608483' },
  address: { street: 'Branilaca 3', city: 'Kakanj', zip: '72240' },
  directions: 'https://www.google.com/maps/dir/?api=1&destination=Branilaca+3,+72240+Kakanj',
  reviewsUrl: 'https://www.google.com/maps/search/?api=1&query=Stomatoloska+ordinacija+Dr.Karic+Branilaca+3+Kakanj',
  mapEmbed: 'https://maps.google.com/maps?q=Branilaca%203%2C%2072240%20Kakanj&z=16&output=embed',
  instagram: 'https://www.instagram.com/dr.karic_dent/',
  facebook: 'https://www.facebook.com/p/Stomatolo%C5%A1ka-Ordinacija-DrKari%C4%87-61570159838460/',
  // FormSubmit forwards appointment requests to this inbox
  formAction: 'https://formsubmit.co/farukcaluk12@gmail.com',
};

export const nav = [
  { href: '/usluge', label: 'Usluge' },
  { href: '/cijene', label: 'Cijene' },
  { href: '/rezultati', label: 'Rezultati' },
  { href: '/o-nama', label: 'O nama' },
  { href: '/novosti', label: 'Novosti' },
  { href: '/kontakt', label: 'Kontakt' },
] as const;

export type Service = {
  id: string;
  title: string;
  short: string;
  text: string;
  tags: string[];
  image: StaticImageData;
  alt: string;
};

export const services: Service[] = [
  {
    id: 'preventiva',
    title: 'Pregledi i preventiva',
    short: 'Redovni pregledi, uklanjanje kamenca i poliranje.',
    text: 'Redovni pregledi su najjednostavniji način da sačuvate zube. Problem uočen na vrijeme je manji, liječenje kraće, a trošak niži.',
    tags: ['Stomatološki pregled', 'Uklanjanje kamenca', 'Poliranje', 'Savjeti za njegu'],
    image: pregled,
    alt: 'Dr. Edina Karić pregleda pacijenticu u ordinaciji',
  },
  {
    id: 'estetika',
    title: 'Estetska stomatologija',
    short: 'Fasete, estetske ispune i oblikovanje osmijeha.',
    text: 'Oblik, boja i linija zuba koji prate vaše lice i način na koji se smijete. Cilj je prirodan izgled, a ne osmijeh koji djeluje vještački.',
    tags: ['Fasete', 'Estetske ispune', 'Oblikovanje osmijeha'],
    image: rezultatEstetika,
    alt: 'Prednji zubi prije i poslije estetskog rada',
  },
  {
    id: 'protetika',
    title: 'Krunice i mostovi',
    short: 'Protetski radovi po mjeri, za funkciju i izgled.',
    text: 'Protetski radovi po mjeri koji vraćaju i funkciju i izgled zuba, da opet jedete, govorite i smijete se bez razmišljanja.',
    tags: ['Krunice', 'Mostovi', 'Protetska rehabilitacija'],
    image: rezultatProtetika,
    alt: 'Zubi prije i poslije izrade novih krunica',
  },
  {
    id: 'lijecenje',
    title: 'Liječenje zuba i kanala',
    short: 'Karijes i kanali korijena, uz anesteziju.',
    text: 'Liječenje karijesa i kanala korijena uz anesteziju. Prije svakog zahvata objasnimo šta radimo i zašto, korak po korak.',
    tags: ['Liječenje karijesa', 'Liječenje kanala', 'Zamjena starih ispuna'],
    image: ordinacija1i2,
    alt: 'Ordinacija 1 i ordinacija 2, odvojene staklenom pregradom',
  },
  {
    id: 'izbjeljivanje',
    title: 'Izbjeljivanje zuba',
    short: 'Profesionalno izbjeljivanje pod nadzorom.',
    text: 'Profesionalno izbjeljivanje pod nadzorom stomatologa, uz prethodni pregled kako bi postupak bio siguran za caklinu i desni.',
    tags: ['Izbjeljivanje u ordinaciji'],
    image: ordinacija2,
    alt: 'Ordinacija 2 sa stomatološkom stolicom ispred mramornog zida',
  },
];

export const reviews = [
  {
    quote:
      'Pored toga što je vrhunski stručnjak u svojoj oblasti, ono što je čini posebnom je njena ljubaznost, smirenost i neizmjerno strpljenje.',
    name: 'Lejla H.',
  },
  { quote: 'Brza intervencija, profesionalan rad. Ljubaznost na nivou. Ocjena 10 za rad.', name: 'Hamza A.' },
  { quote: 'Sve preporuke i pohvale.', name: 'Jasmin H.' },
];
