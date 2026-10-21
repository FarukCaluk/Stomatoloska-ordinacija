import type { StaticImageData } from 'next/image';
import dentbih from '@/assets/img/dr-karic-dentbih.webp';

// Novosti i najčešća pitanja. Tijelo članka: "## " je podnaslov, "- " je stavka liste, ostalo je pasus.
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  body: string[];
  image?: StaticImageData;
  imageAlt?: string;
};

export const posts: Post[] = [
  {
    slug: 'stomatolog-i-onkoloski-pacijenti',
    title: 'Stomatolog u liječenju onkoloških pacijenata',
    excerpt:
      'Dr. Edina Karić je za stručni časopis dentBiH pisala o tome zašto pacijentima na terapiji raka treba stomatolog prije, tokom i nakon liječenja.',
    date: '2026-10-20',
    image: dentbih,
    imageAlt: 'Dr. Edina Karić drži časopis dentBiH otvoren na svom stručnom tekstu',
    body: [
      'U stručnom časopisu dentBiH objavljen je tekst Dr. Edine Karić "Onkološki pacijenti u ordinaciji dentalne medicine". Ovdje ukratko prenosimo ono što je najvažnije za pacijente i njihove porodice.',
      '## Zašto je stomatolog dio tima',
      'Liječenje raka traži saradnju više ljekara, a stomatolog je jedan od njih. Zračenje i hemoterapija često izazivaju komplikacije u ustima: bolnu upalu sluznice, suhoću usta, promjenu okusa i ubrzan nastanak karijesa. Te tegobe mogu otežati ishranu, pa čak i usporiti samu terapiju.',
      '## Prije početka terapije',
      'Najvažnije je usta pripremiti prije zračenja, idealno dvije do tri sedmice ranije, da tkivo stigne zarasti:',
      '- uklanjanje kamenca i sanacija karijesa',
      '- liječenje ili vađenje zuba sa lošom prognozom',
      '- zamjena dotrajalih ispuna i neodgovarajućih proteza',
      '- upute za njegu usta tokom terapije',
      '## Tokom i nakon terapije',
      'Redovne kontrole pomažu da se komplikacije prepoznaju na vrijeme i ublaže. Nakon zračenja rizik od nekih komplikacija ostaje trajan, zato prije svakog zahvata obavezno recite stomatologu da ste bili na terapiji.',
      'Ako vi ili neko vaš počinjete onkološku terapiju, javite nam se. Pregled i plan pripreme dogovaramo u saradnji s vašim ljekarom.',
    ],
  },
  {
    slug: 'koliko-cesto-na-pregled',
    title: 'Koliko često trebate ići na stomatološki pregled?',
    excerpt: 'Zašto je redovna kontrola jeftinija i lakša od liječenja, i koliko često je zaista potrebna.',
    date: '2026-10-14',
    body: [
      'Većina odraslih treba stomatološki pregled jednom u šest mjeseci. Neki pacijenti mogu dolaziti rjeđe, a neki trebaju češće kontrole, ovisno o stanju zuba i desni.',
      '## Zašto baš šest mjeseci',
      'Karijes u početku ne boli. Dok ga osjetite, često je već duboko i traži veći zahvat. Na redovnom pregledu otkrijemo ga dok je mali, pa je i liječenje kraće, ugodnije i jeftinije.',
      '## Šta se radi na kontrolnom pregledu',
      '- pregled svih zuba, desni i starih ispuna',
      '- provjera ima li kamenca i upale desni',
      '- savjet kako poboljšati njegu kod kuće',
      '- po potrebi uklanjanje kamenca i poliranje',
      '## Kome trebaju češće kontrole',
      'Češće dolaze pacijenti sa upalom desni, oni koji puše, trudnice, osobe sa dijabetesom i svi koji su nedavno imali veći zahvat. Koliko često trebate dolaziti vi, reći ćemo vam nakon prvog pregleda.',
    ],
  },
  {
    slug: 'da-li-boli-lijecenje-kanala',
    title: 'Da li je liječenje kanala bolno?',
    excerpt: 'Najveći strah pacijenata, i zašto je danas liječenje kanala mnogo ugodnije nego što mislite.',
    date: '2026-10-07',
    body: [
      'Liječenje kanala korijena ima lošu reputaciju, ali danas se radi uz lokalnu anesteziju i većina pacijenata tokom zahvata osjeti tek pritisak. Bol koju ljudi pamte obično dolazi od upaljenog zuba prije liječenja, a ne od samog zahvata.',
      '## Kada je potrebno liječenje kanala',
      'Kada karijes ili pukotina dođu do živca zuba, živac se upali ili odumre. Znaci su jaka ili pulsirajuća bol, osjetljivost na toplo koja dugo traje, otok ili tamnjenje zuba.',
      '## Kako izgleda zahvat',
      '- zub se anestezira',
      '- uklanja se upaljeno tkivo iz kanala',
      '- kanali se čiste, oblikuju i dezinfikuju',
      '- kanali se hermetički zatvaraju, a zub se nadograđuje',
      '## Poslije zahvata',
      'Nekoliko dana zub može biti blago osjetljiv na zagriz, što prolazi samo od sebe. Liječen zub često je oslabljen, pa mu kasnije može trebati krunica da traje godinama.',
    ],
  },
  {
    slug: 'fasete-ili-krunice',
    title: 'Fasete ili krunice: koja je razlika?',
    excerpt: 'Obje vraćaju lijep osmijeh, ali se razlikuju po tome koliko zuba se brusi i kada se koriste.',
    date: '2026-09-29',
    body: [
      'Fasete i krunice često se spominju zajedno, ali rješavaju različite probleme. Koja je bolja za vas, zavisi od stanja vaših zuba.',
      '## Fasete',
      'Faseta je tanka ljuska koja se lijepi na prednju stranu zuba. Koristi se kada je zub zdrav, a želite promijeniti boju, oblik ili zatvoriti male razmake. Zub se brusi minimalno, a ponekad nimalo.',
      '## Krunice',
      'Krunica prekriva cijeli zub sa svih strana. Koristi se kada je zub jako oštećen, ima velike stare ispune, liječen je kroz kanal ili je slomljen. Krunica zub štiti i vraća mu snagu.',
      '## Ukratko',
      '- zdrav zub, želite ljepši izgled: obično faseta',
      '- oštećen ili oslabljen zub: obično krunica',
      '- oba rješenja izgledaju prirodno kada su dobro urađena',
      'Na prvom pregledu pogledamo zube i zajedno odaberemo rješenje koje ima smisla za vas.',
    ],
  },
  {
    slug: 'izbjeljivanje-i-caklina',
    title: 'Da li izbjeljivanje oštećuje zube?',
    excerpt: 'Šta je sigurno, šta nije i zašto je profesionalno izbjeljivanje bolje od trikova sa interneta.',
    date: '2026-09-22',
    body: [
      'Profesionalno izbjeljivanje pod nadzorom stomatologa smatra se sigurnim za caklinu. Problemi nastaju kada se izbjeljuje bez pregleda ili sredstvima nepoznatog sastava.',
      '## Zašto je pregled prije izbjeljivanja važan',
      'Izbjeljivanje na zubu sa karijesom ili otvorenim vratom zuba može izazvati jaku osjetljivost. Zato prvo provjerimo stanje zuba i po potrebi ih saniramo.',
      '## Šta je normalno nakon izbjeljivanja',
      '- prolazna osjetljivost na hladno, jedan do dva dana',
      '- zubi su nekoliko dana podložniji prebojavanju',
      '- bolje je izbjegavati kafu, čaj, crno vino i cigarete prvih 48 sati',
      '## Važno je znati',
      'Izbjeljivanje mijenja boju samo prirodnih zuba. Plombe, krunice i fasete ne mijenjaju boju, pa ih ponekad treba zamijeniti da bi osmijeh bio ujednačen.',
    ],
  },
  {
    slug: 'krvarenje-desni',
    title: 'Krvarenje desni pri pranju: kada se zabrinuti?',
    excerpt: 'Desni koje krvare nisu normalne. Šta to znači i šta možete uraditi već danas.',
    date: '2026-09-15',
    body: [
      'Ako vam desni krvare dok perete zube, to je najčešće znak upale desni (gingivitisa). Dobra vijest je da se u ranoj fazi ovo potpuno povlači uz pravilnu njegu.',
      '## Najčešći uzroci',
      '- kamenac i plak uz rub desni',
      '- neredovno ili prejako pranje zuba',
      '- nekorištenje konca ili interdentalne četkice',
      '- hormonske promjene, na primjer u trudnoći',
      '## Šta možete uraditi',
      'Perite zube dva puta dnevno mekom četkicom, nježnim pokretima, i svaki dan očistite prostor između zuba. Ne prestajte prati mjesto koje krvari, jer tamo je njega najpotrebnija.',
      '## Kada doći na pregled',
      'Ako krvarenje traje duže od dvije sedmice, ako desni otiču, povlače se ili osjećate neugodan zadah, dođite na pregled. Uklanjanje kamenca je često prvi i najvažniji korak.',
    ],
  },
  {
    slug: 'prvi-pregled-sta-ocekivati',
    title: 'Prvi pregled kod nas: šta da očekujete',
    excerpt: 'Prvi pregled je besplatan. Evo kako izgleda, koliko traje i kako se pripremiti.',
    date: '2026-09-08',
    body: [
      'Mnogi odgađaju odlazak stomatologu jer ne znaju šta ih čeka. Zato ukratko opisujemo kako izgleda prvi dolazak u našu ordinaciju.',
      '## Kako izgleda prvi pregled',
      '- razgovaramo o tome šta vas muči ili šta biste željeli promijeniti',
      '- pregledamo zube, desni i stare radove',
      '- pokažemo vam šta smo uočili i objasnimo mogućnosti',
      '- dobijete prijedlog plana liječenja i okvirnu cijenu',
      '## Koliko traje i koliko košta',
      'Prvi pregled obično traje oko pola sata i besplatan je. Ne obavezuje vas ni na kakav dalji tretman.',
      '## Kako se pripremiti',
      'Ponesite spisak lijekova koje pijete i stare snimke zuba ako ih imate. Ako se plašite stomatologa, recite nam odmah na početku, pa ćemo ići polako i sve objasniti prije svakog koraka.',
    ],
  },
  {
    slug: 'osjetljivi-zubi',
    title: 'Zašto su vam zubi osjetljivi na hladno?',
    excerpt: 'Kratka oštra bol na hladno ili slatko ima jasan uzrok. Evo šta je najčešće iza nje.',
    date: '2026-09-01',
    body: [
      'Osjetljivost zuba je kratka, oštra bol kada pijete nešto hladno, jedete slatko ili udahnete hladan zrak. Javlja se kada je zaštitni sloj zuba oštećen, pa podražaji lakše dođu do živca.',
      '## Najčešći uzroci',
      '- povučene desni koje otkrivaju vrat zuba',
      '- istrošena caklina od prejakog pranja ili kiselih napitaka',
      '- karijes ili napuknut zub',
      '- stara plomba koja više ne zatvara dobro',
      '## Šta pomaže kod kuće',
      'Koristite mekanu četkicu i pastu za osjetljive zube, i perite nježno, bez jakog pritiska. Pastu za osjetljive zube koristite redovno, jer djeluje tek nakon nekoliko sedmica.',
      '## Kada doći na pregled',
      'Ako osjetljivost traje duže od nekoliko sedmica, ako je vezana za jedan zub ili bol traje i nakon što hladno prođe, dođite na pregled. To može biti znak karijesa ili upale živca, a to se rješava lakše što se ranije otkrije.',
    ],
  },
  {
    slug: 'kako-pravilno-prati-zube',
    title: 'Kako pravilno prati zube: 5 grešaka koje svi pravimo',
    excerpt: 'Perete zube svaki dan, ali da li pravilno? Male promjene koje čine veliku razliku.',
    date: '2026-08-25',
    body: [
      'Većina ljudi pere zube redovno, ali ne i pravilno. Ovo su greške koje najčešće vidimo u ordinaciji.',
      '## 1. Prekratko pranje',
      'Pranje bi trebalo trajati oko dvije minute. Većina ljudi pere manje od jedne minute, pa zadnji zubi ostanu neočišćeni.',
      '## 2. Prejak pritisak i tvrda četkica',
      'Jako ribanje ne čisti bolje, nego troši caklinu i povlači desni. Mekana četkica i nježni kružni pokreti su dovoljni.',
      '## 3. Preskakanje prostora između zuba',
      'Četkica ne dolazi između zuba, a tu najčešće počinju karijes i upala desni. Konac ili interdentalnu četkicu koristite jednom dnevno.',
      '## 4. Ispiranje odmah nakon pranja',
      'Nakon pranja ispljunite pastu, ali nemojte odmah ispirati usta vodom, kako bi fluor iz paste duže djelovao.',
      '## 5. Stara četkica',
      'Četkicu mijenjajte svaka tri mjeseca, ili ranije ako su joj vlakna raširena.',
      'Na pregledu vam rado pokažemo tehniku pranja prilagođenu vašim zubima.',
    ],
  },
];

const MONTHS = ['januara', 'februara', 'marta', 'aprila', 'maja', 'juna', 'jula', 'augusta', 'septembra', 'oktobra', 'novembra', 'decembra'];

export function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d}. ${MONTHS[m - 1]} ${y}.`;
}

export function readingTime(post: Post) {
  const words = post.body.join(' ').split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
