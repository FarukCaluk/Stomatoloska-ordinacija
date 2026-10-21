// Okvirne cijene u KM. Tačna cijena se određuje nakon pregleda.
// TODO(ordinacija): zamijeniti stvarnim cijenama ordinacije.
export type PriceRow = { name: string; price: string; note?: string };
export type PriceGroup = { id: string; title: string; rows: PriceRow[] };

export const priceGroups: PriceGroup[] = [
  {
    id: 'pregledi',
    title: 'Pregledi i preventiva',
    rows: [
      { name: 'Prvi pregled i savjetovanje', price: 'Besplatno' },
      { name: 'Kontrolni pregled', price: '20 KM' },
      { name: 'Uklanjanje kamenca i poliranje', price: 'od 50 KM', note: 'obje vilice' },
      { name: 'Fluorizacija', price: 'od 30 KM' },
    ],
  },
  {
    id: 'lijecenje',
    title: 'Liječenje zuba',
    rows: [
      { name: 'Kompozitna (bijela) plomba', price: 'od 60 KM' },
      { name: 'Liječenje kanala korijena', price: 'od 100 KM', note: 'po kanalu' },
      { name: 'Vađenje zuba', price: 'od 40 KM' },
      { name: 'Hirurško vađenje zuba', price: 'od 100 KM' },
    ],
  },
  {
    id: 'protetika',
    title: 'Krunice i mostovi',
    rows: [
      { name: 'Metalokeramička krunica', price: 'od 250 KM', note: 'po zubu' },
      { name: 'Cirkonijska krunica', price: 'od 400 KM', note: 'po zubu' },
      { name: 'Most', price: 'od 250 KM', note: 'po članu' },
      { name: 'Privremena krunica', price: 'od 50 KM' },
    ],
  },
  {
    id: 'estetika',
    title: 'Estetika',
    rows: [
      { name: 'Kompozitna faseta', price: 'od 150 KM', note: 'po zubu' },
      { name: 'Keramička faseta', price: 'od 450 KM', note: 'po zubu' },
      { name: 'Izbjeljivanje zuba u ordinaciji', price: 'od 300 KM' },
    ],
  },
];
