// Working hours: Monday to Friday, 09-17, Sarajevo time. day: 0 = Sunday
export function workStatus(day: number, hour: number) {
  const weekday = day >= 1 && day <= 5;
  if (weekday && hour >= 9 && hour < 17) return { open: true, text: 'Sada otvoreno, do 17:00' };
  if (weekday && hour < 9) return { open: false, text: 'Zatvoreno, otvaramo danas u 09:00' };
  if (day >= 1 && day <= 4) return { open: false, text: 'Zatvoreno, otvaramo sutra u 09:00' };
  return { open: false, text: 'Zatvoreno, otvaramo u ponedjeljak u 09:00' };
}

export function sarajevoNow(date = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Sarajevo',
      weekday: 'short',
      hour: 'numeric',
      hourCycle: 'h23',
      year: 'numeric',
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  );
  return {
    day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday),
    hour: Number(parts.hour),
    year: Number(parts.year),
  };
}
