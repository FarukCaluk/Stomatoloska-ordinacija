'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';

const trigger =
  'flex w-full items-center justify-between gap-3 rounded-xl border border-ink/20 bg-bg px-4 py-3.5 text-left text-base text-ink transition-colors hover:border-ink/40 focus-visible:border-transparent focus-visible:outline-2 focus-visible:outline-gold';
const panel =
  'absolute inset-x-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-xl border border-line bg-raise p-1.5 shadow-[0_24px_60px_rgb(0_0_0/0.55)]';

/** Closes on outside click and resets with its form. */
function usePopover(onReset: () => void) {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const reset = useRef(onReset);
  useEffect(() => {
    const el = root.current;
    const form = el?.closest('form');
    const onDown = (e: PointerEvent) => !el?.contains(e.target as Node) && setOpen(false);
    const onFormReset = () => reset.current();
    document.addEventListener('pointerdown', onDown);
    form?.addEventListener('reset', onFormReset);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      form?.removeEventListener('reset', onFormReset);
    };
  }, []);
  return { root, open, setOpen };
}

function Chevron({ open }: { open: boolean }) {
  return (
    <span aria-hidden className={`text-gold transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
      ▾
    </span>
  );
}

/** Styled select: button + listbox, keyboard friendly, posts through a hidden input. */
export function Select({ id, name, options }: { id: string; name: string; options: string[] }) {
  const [value, setValue] = useState(options[0]);
  const [active, setActive] = useState(0);
  const { root, open, setOpen } = usePopover(() => setValue(options[0]));
  const list = useId();

  const choose = (i: number) => {
    setValue(options[i]);
    setOpen(false);
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') return setOpen(false);
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) return setOpen(true);
      setActive((a) => (a + (e.key === 'ArrowDown' ? 1 : options.length - 1)) % options.length);
    }
    if ((e.key === 'Enter' || e.key === ' ') && open) {
      e.preventDefault();
      choose(active);
    }
  };

  return (
    <div ref={root} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={list}
        onClick={() => {
          setActive(Math.max(options.indexOf(value), 0));
          setOpen((o) => !o);
        }}
        onKeyDown={onKey}
        className={`${trigger} ${open ? 'border-gold' : ''}`}
      >
        <span className="truncate">{value}</span>
        <Chevron open={open} />
      </button>
      {open && (
        <ul id={list} role="listbox" className={panel}>
          {options.map((o, i) => (
            <li
              key={o}
              role="option"
              aria-selected={o === value}
              onPointerEnter={() => setActive(i)}
              onClick={() => choose(i)}
              className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 ${
                i === active ? 'bg-ink/10' : ''
              } ${o === value ? 'text-gold' : ''}`}
            >
              {o}
              {o === value && <span aria-hidden>✓</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const MONTHS = ['januar', 'februar', 'mart', 'april', 'maj', 'juni', 'juli', 'august', 'septembar', 'oktobar', 'novembar', 'decembar'];
const DAYS = ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'];
const WEEKDAYS = ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota'];
const MONTHS_GEN = ['januara', 'februara', 'marta', 'aprila', 'maja', 'juna', 'jula', 'augusta', 'septembra', 'oktobra', 'novembra', 'decembra'];
const iso = (d: Date) => d.toLocaleDateString('en-CA');
// Own formatting: not every browser ships Bosnian locale data.
const pretty = (d: Date) => `${WEEKDAYS[d.getDay()]}, ${d.getDate()}. ${MONTHS_GEN[d.getMonth()]}`;

/** Calendar for the preferred date: only working days from today on can be picked. */
export function DatePicker({ id, name, describedBy }: { id: string; name: string; describedBy?: string }) {
  const [value, setValue] = useState('');
  const [month, setMonth] = useState<Date | null>(null);
  const { root, open, setOpen } = usePopover(() => setValue(''));

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const shown = month ?? new Date(today.getFullYear(), today.getMonth(), 1);
  const lead = (new Date(shown.getFullYear(), shown.getMonth(), 1).getDay() + 6) % 7;
  const count = new Date(shown.getFullYear(), shown.getMonth() + 1, 0).getDate();
  const cells = [...Array(lead).fill(null), ...Array.from({ length: count }, (_, i) => new Date(shown.getFullYear(), shown.getMonth(), i + 1))];
  const canGoBack = shown > new Date(today.getFullYear(), today.getMonth(), 1);
  const label = value
    ? pretty(new Date(`${value}T12:00`))
    : 'Izaberite datum';

  return (
    <div ref={root} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-describedby={describedBy}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
        className={`${trigger} ${open ? 'border-gold' : ''}`}
      >
        <span className={`truncate ${value ? 'first-letter:uppercase' : 'text-muted'}`}>{label}</span>
        <Chevron open={open} />
      </button>
      {open && (
        <div role="dialog" aria-label="Izbor datuma" className={`${panel} min-w-[18rem] p-4`}>
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              disabled={!canGoBack}
              onClick={() => setMonth(new Date(shown.getFullYear(), shown.getMonth() - 1, 1))}
              aria-label="Prethodni mjesec"
              className="grid size-9 place-items-center rounded-full hover:bg-ink/10 disabled:opacity-25"
            >
              ‹
            </button>
            <span className="font-semibold capitalize">
              {MONTHS[shown.getMonth()]} {shown.getFullYear()}
            </span>
            <button
              type="button"
              onClick={() => setMonth(new Date(shown.getFullYear(), shown.getMonth() + 1, 1))}
              aria-label="Sljedeći mjesec"
              className="grid size-9 place-items-center rounded-full hover:bg-ink/10"
            >
              ›
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {DAYS.map((d) => (
              <span key={d} className="pb-1 text-muted">
                {d}
              </span>
            ))}
            {cells.map((d, i) => {
              if (!d) return <span key={`e${i}`} />;
              const off = d < today || d.getDay() === 0 || d.getDay() === 6;
              const selected = iso(d) === value;
              return (
                <button
                  key={iso(d)}
                  type="button"
                  disabled={off}
                  aria-pressed={selected}
                  aria-label={pretty(d)}
                  onClick={() => {
                    setValue(iso(d));
                    setOpen(false);
                  }}
                  className={`aspect-square rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-25 ${
                    selected ? 'bg-gold font-semibold text-bg' : 'hover:bg-ink/10'
                  }`}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
          {value && (
            <button type="button" onClick={() => setValue('')} className="mt-3 text-sm text-muted underline underline-offset-4">
              Bez određenog datuma
            </button>
          )}
        </div>
      )}
    </div>
  );
}
