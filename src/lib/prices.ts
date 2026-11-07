// Cjenovnik ordinacije u KM, prepisan sa table u ordinaciji (grupe i redoslijed kao na tabli).
export type PriceRow = { name: string; price: string; note?: string };
export type PriceGroup = { id: string; title: string; rows: PriceRow[] };

export const FREE = 'Besplatno';

export const priceGroups: PriceGroup[] = [
  {
    id: 'restaurativna',
    title: 'Restaurativna stomatologija',
    rows: [
      { name: 'RTG snimak', price: '10 KM' },
      { name: 'Prva pomoć', price: '20 KM' },
      { name: 'Lokalna anestezija', price: '5 KM' },
      { name: 'Mandibularni blok', price: '10 KM' },
      { name: 'Kompozitni ispun', note: 'jednopovršinski', price: '30 KM' },
      { name: 'Kompozitni ispun', note: 'dvopovršinski', price: '40 KM' },
      { name: 'Kompozitni ispun', note: 'višepovršinski', price: '50 KM' },
      { name: 'Kompozitna nadogradnja', note: 'sa parapulpalnim kočićem', price: '60 KM' },
      { name: 'Kompozitna nadogradnja', note: 'sa fiberglas kočićem', price: '80 KM' },
      { name: 'Amalgamski ispun', price: '30 KM' },
      { name: 'Glasjonomer ispun', price: '20 KM' },
      { name: 'Indirektno prekrivanje pulpe', price: '5 KM' },
    ],
  },
  {
    id: 'preventivna',
    title: 'Preventivna stomatologija',
    rows: [
      { name: 'Prvi pregled i savjetovanje', price: FREE },
      { name: 'Zalivanje fisura', price: '20 KM' },
      { name: 'Fluorizacija', price: '40 KM' },
    ],
  },
  {
    id: 'endodoncija',
    title: 'Endodoncija, liječenje zuba',
    rows: [
      { name: 'Mašinska endodoncija', note: 'jednoseansno', price: '150 KM' },
      { name: 'Revizija liječenja', price: '50 KM' },
      { name: 'Vitalna ekstirpacija', note: 'jednokanalno', price: '30 KM' },
      { name: 'Vitalna ekstirpacija', note: 'višekanalno', price: '40 KM' },
      { name: 'Mortalna aplikacija', note: 'jednokanalno', price: '40 KM' },
      { name: 'Mortalna aplikacija', note: 'višekanalno', price: '50 KM' },
      { name: 'Toxavit aplikacija', price: '30 KM' },
      { name: 'Definitivno punjenje kanala', note: 'jednokanalno', price: '30 KM' },
      { name: 'Definitivno punjenje kanala', note: 'višekanalno', price: '40 KM' },
    ],
  },
  {
    id: 'parodontologija',
    title: 'Parodontologija',
    rows: [
      { name: 'Uklanjanje kamenca i poliranje', note: 'jedan zubni luk', price: '30 KM' },
      { name: 'Uklanjanje kamenca i poliranje', note: 'oba zubna luka', price: '50 KM' },
      { name: 'Kiretaža parodontalnog džepa', price: '10 KM' },
    ],
  },
  {
    id: 'hirurgija',
    title: 'Oralna hirurgija',
    rows: [
      { name: 'Ekstrakcija zuba', price: '30 KM' },
      { name: 'Komplikovana ekstrakcija zuba', price: '50 KM' },
      { name: 'Ekstrakcija mliječnog zuba', price: '20 KM' },
      { name: 'Zaustavljanje krvarenja', price: '10 KM' },
    ],
  },
  {
    id: 'protetika',
    title: 'Protetika',
    rows: [
      { name: 'Totalna / parcijalna akrilatna proteza', price: '300 KM' },
      { name: 'Totalna / parcijalna proteza sa Fiziodens zubima', price: '600 KM' },
      { name: 'Totalna / parcijalna proteza sa providnim akrilatom', price: '450 KM' },
      { name: 'Skeletirana / Wizil proteza', price: '600 KM' },
      { name: 'Termoplastična proteza', price: '600 KM' },
      { name: 'Podlaganje proteze', price: '100 KM' },
      { name: 'Reparatura proteze', price: '20 KM' },
      { name: 'Dodatak zuba / kukice na protezu', price: '20 KM' },
      { name: 'Metalokeramička navlaka', price: '200 KM' },
      { name: 'Bezmetalna / cirkonij navlaka', price: '350 KM' },
      { name: 'Atečmeni', price: '150 KM' },
      { name: 'Privremena navlaka', price: '20 KM' },
      { name: 'Ponovno cementiranje navlake', price: '20 KM' },
      { name: 'Skidanje starog mosta', price: '20 KM' },
      { name: 'Metalna nadogradnja / kočić', price: '60 KM' },
    ],
  },
  {
    id: 'estetika',
    title: 'Estetski tretmani',
    rows: [
      { name: 'Izbjeljivanje zuba', note: 'po zubnom luku', price: '150 KM' },
      { name: 'Izbjeljivanje avitalnog zuba', price: '100 KM' },
      { name: 'Postavljanje cirkona', price: '20 KM' },
      { name: 'Udlaga za bruksizam', price: '100 KM' },
      { name: 'Aligneri za ispravljanje zuba', price: '200 KM' },
    ],
  },
];

/** A row's name with its variant, e.g. "Kompozitni ispun, jednopovršinski". */
export const rowLabel = (row: PriceRow) => (row.note ? `${row.name}, ${row.note}` : row.name);
