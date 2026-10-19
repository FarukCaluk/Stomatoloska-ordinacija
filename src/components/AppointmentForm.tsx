'use client';

import { useState, type FormEvent } from 'react';
import { DatePicker, Select } from './FormPickers';
import { services, site } from '@/lib/site';

type State = 'idle' | 'sending' | 'ok' | 'error';

const field =
  'w-full rounded-xl border border-ink/20 bg-bg px-4 py-3.5 text-base text-ink transition-colors hover:border-ink/40 focus-visible:border-transparent focus-visible:outline-2 focus-visible:outline-gold user-invalid:border-[#e5534b]';
const label = 'mb-2 block text-[0.95rem] font-medium';

/** Appointment request. Sent through FormSubmit (AJAX), plain POST when JS is off. */
export function AppointmentForm() {
  const [state, setState] = useState<State>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState('sending');
    try {
      const res = await fetch(site.formAction.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json();
      if (!res.ok || String(data.success) !== 'true') throw new Error(data.message);
      form.reset();
      setState('ok');
    } catch {
      setState('error');
    }
  }

  return (
    <form action={site.formAction} method="POST" onSubmit={onSubmit} className="rounded-[1.75rem] border border-line bg-panel p-6 sm:p-10">
      <p className="max-w-[52ch] text-muted">
        Polja označena zvjezdicom su obavezna. Ako vam je hitno, najbrže je da nas pozovete.
      </p>

      <input type="hidden" name="_subject" value="Novi zahtjev za termin, Dr. Karić" />
      <input type="hidden" name="_template" value="table" />
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px]" />

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ime" className={label}>Ime i prezime *</label>
          <input id="ime" name="Ime i prezime" type="text" autoComplete="name" required className={field} />
        </div>
        <div>
          <label htmlFor="telefon" className={label}>Telefon *</label>
          <input
            id="telefon"
            name="Telefon"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            pattern="[0-9 +\/\(\)\-]{6,}"
            required
            className={field}
          />
        </div>
        <div>
          <label htmlFor="email" className={label}>Email (opcionalno)</label>
          <input id="email" name="Email" type="email" autoComplete="email" className={field} />
        </div>
        <div>
          <label htmlFor="nacin" className={label}>Kako da vas kontaktiramo?</label>
          <Select id="nacin" name="Način kontakta" options={['Pozivom', 'Porukom', 'Emailom']} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="usluga" className={label}>Usluga</label>
          <Select id="usluga" name="Usluga" options={['Pregled / nisam siguran', ...services.map((s) => s.title)]} />
        </div>
        <div>
          <label htmlFor="datum" className={label}>Željeni datum (opcionalno)</label>
          <DatePicker id="datum" name="Željeni datum" describedBy="datum-pomoc" />
          <p id="datum-pomoc" className="mt-2 text-sm text-muted">Radimo od ponedjeljka do petka.</p>
        </div>
        <div>
          <label htmlFor="dio-dana" className={label}>Dio dana</label>
          <Select id="dio-dana" name="Dio dana" options={['Bilo kada', 'Prijepodne (09 - 13 h)', 'Poslijepodne (13 - 17 h)']} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="poruka" className={label}>Poruka (opcionalno)</label>
          <textarea id="poruka" name="Poruka" rows={4} data-lenis-prevent className={`${field} resize-y`} />
        </div>
      </div>

      <label className="mt-7 flex cursor-pointer items-start gap-3 text-[0.95rem] text-muted">
        <input type="checkbox" name="Saglasnost" value="Da" required className="mt-1 size-[1.1rem] shrink-0 accent-gold" />
        <span>
          Saglasan/na sam da ordinacija Dr. Karić koristi moje podatke isključivo da me kontaktira u vezi s ovim
          zahtjevom.
        </span>
      </label>

      <button type="submit" disabled={state === 'sending'} className="btn btn-gold mt-8 w-full disabled:cursor-progress disabled:opacity-60 sm:w-auto">
        {state === 'sending' ? 'Šaljem...' : 'Pošaljite zahtjev'}
      </button>

      <p role="status" aria-live="polite" className="empty:hidden mt-5 rounded-xl data-[s=error]:bg-[#e5534b]/15 data-[s=ok]:bg-[#5fbf6a]/15 px-4 py-3" data-s={state}>
        {state === 'ok' && 'Hvala! Zahtjev je poslan. Javićemo vam se što prije da potvrdimo termin.'}
        {state === 'error' && `Slanje nije uspjelo. Pokušajte ponovo ili nas nazovite na ${site.phone.display}.`}
      </p>
      <p className="mt-5 text-sm text-muted">
        Ovo je zahtjev za termin. Termin je potvrđen tek kada vas kontaktiramo s potvrdom.
      </p>
    </form>
  );
}
