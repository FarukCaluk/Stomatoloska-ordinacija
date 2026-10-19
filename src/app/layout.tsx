import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { SmoothScroll } from '@/components/SmoothScroll';
import { site } from '@/lib/site';
import { siteUrl } from '@/lib/url';
import './globals.css';

// Archivo (OFL), subset to the characters this site uses: 41 KB instead of ~175 KB from Google Fonts.
const archivo = localFont({
  src: '../assets/fonts/archivo-subset.woff2',
  variable: '--font-archivo',
  display: 'swap',
  weight: '400 800',
  declarations: [{ prop: 'font-stretch', value: '100% 125%' }],
});

const description =
  'Stomatološka ordinacija Dr. Karić u Kaknju. Pregledi, estetska stomatologija, krunice i liječenje zuba uz individualan pristup. Prvi pregled je besplatan.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Stomatološka ordinacija Dr. Karić | Kakanj', template: '%s | Dr. Karić, Kakanj' },
  description,
  openGraph: {
    type: 'website',
    locale: 'bs_BA',
    siteName: site.name,
    title: 'Stomatološka ordinacija Dr. Karić, Kakanj',
    description: 'Osmijeh koji traje. Individualan pristup, savremena oprema i besplatan prvi pregled.',
  },
};

export const viewport: Viewport = { themeColor: '#0b0b0a', colorScheme: 'dark' };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: site.name,
  url: siteUrl,
  image: `${siteUrl}/opengraph-image.jpg`,
  telephone: '+387 61 608 483',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    postalCode: site.address.zip,
    addressCountry: 'BA',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  ],
  sameAs: [site.instagram, site.facebook],
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="bs" className={archivo.variable}>
      <body className="bg-bg font-sans text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
