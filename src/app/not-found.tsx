import Link from 'next/link';
import { PageHero } from '@/components/PageHero';

export default function NotFound() {
  return (
    <main id="sadrzaj" className="pb-[clamp(5rem,12vw,10rem)]">
      <PageHero title={['404']} lead="Ova stranica ne postoji ili je premještena." />
      <div className="shell">
        <Link href="/" className="btn btn-gold">
          Nazad na početnu
        </Link>
      </div>
    </main>
  );
}
