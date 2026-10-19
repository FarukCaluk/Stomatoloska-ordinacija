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

  // Strelice za galeriju
  const track = document.getElementById('galerija');
  document.querySelectorAll('[data-scroll]').forEach(b => b.addEventListener('click', () => {
    const step = track.querySelector('li').offsetWidth + 20;
    track.scrollBy({ left: step * Number(b.dataset.scroll), behavior: 'smooth' });
  }));
});
