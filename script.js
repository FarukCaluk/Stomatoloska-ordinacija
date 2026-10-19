document.documentElement.classList.add('js');

// Radno vrijeme: pon-pet 09-17 (day: 0 = nedjelja)
function workStatus(day, hour) {
  const weekday = day >= 1 && day <= 5;
  if (weekday && hour >= 9 && hour < 17) return { open: true, text: 'Sada otvoreno, do 17:00' };
  if (weekday && hour < 9) return { open: false, text: 'Zatvoreno, otvaramo danas u 09:00' };
  if (day >= 1 && day <= 4) return { open: false, text: 'Zatvoreno, otvaramo sutra u 09:00' };
  return { open: false, text: 'Zatvoreno, otvaramo u ponedjeljak u 09:00' };
}

document.addEventListener('DOMContentLoaded', () => {
  // Vrijeme u Sarajevu, bez obzira gdje je posjetilac
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Sarajevo', weekday: 'short', hour: 'numeric', hourCycle: 'h23', year: 'numeric'
  }).formatToParts(new Date()).map(p => [p.type, p.value]));
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday);
  const s = workStatus(day, Number(parts.hour));
  document.querySelectorAll('.status').forEach(el => {
    el.textContent = s.text;
    el.classList.toggle('is-open', s.open);
    el.hidden = false;
  });
  document.querySelectorAll('.godina').forEach(el => { el.textContent = parts.year; });

  // Mobilni meni
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
    toggle.textContent = open ? 'Zatvori' : 'Meni';
  });

  // Header dobija liniju kad naslov stranice izađe iz vida
  const header = document.getElementById('header');
  new IntersectionObserver(([e]) => header.classList.toggle('is-stuck', !e.isIntersecting))
    .observe(document.querySelector('h1'));

  // Postepeno pojavljivanje sekcija
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { threshold: 0.15 });
  document.querySelectorAll('[data-reveal]').forEach(n => io.observe(n));

  // Forma za zahtjev termina: šalje se preko FormSubmit-a na email iz action atributa
  const form = document.getElementById('termin-forma');
  if (form) {
    const date = form.elements['Željeni datum'];
    date.min = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD, lokalno
    date.addEventListener('input', () => {
      const d = new Date(date.value + 'T12:00').getDay();
      date.setCustomValidity(d === 0 || d === 6 ? 'Vikendom ne radimo. Izaberite dan od ponedjeljka do petka.' : '');
    });

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const status = form.querySelector('.form__status');
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Šaljem...';
      try {
        const res = await fetch(form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form))),
        });
        const data = await res.json();
        if (!res.ok || String(data.success) !== 'true') throw new Error(data.message);
        form.reset();
        status.dataset.state = 'ok';
        status.textContent = 'Hvala! Zahtjev je poslan. Javićemo vam se što prije da potvrdimo termin.';
      } catch {
        status.dataset.state = 'error';
        status.textContent = 'Slanje nije uspjelo. Pokušajte ponovo ili nas nazovite na 061 608 483.';
      } finally {
        btn.disabled = false;
        btn.textContent = 'Pošaljite zahtjev';
      }
    });
  }

  // Strelice za galeriju
  const track = document.getElementById('galerija');
  document.querySelectorAll('[data-scroll]').forEach(b => b.addEventListener('click', () => {
    const step = track.querySelector('li').offsetWidth + 20;
    track.scrollBy({ left: step * Number(b.dataset.scroll), behavior: 'smooth' });
  }));
});
