# Stomatološka ordinacija Dr. Karić

Web stranica ordinacije u Kaknju. Next.js (App Router), React, TypeScript, Tailwind CSS,
Three.js (3D zub na početnoj), GSAP i Lenis za animacije na skrol.

## Pokretanje

```bash
npm install
npm run dev
```

Stranica je na http://localhost:3000. Produkcijski build: `npm run build`, pa `npm start`.

## Gdje se šta mijenja

- Telefon, adresa, linkovi, usluge i recenzije: `src/lib/site.ts`
- Email na koji stižu zahtjevi za termin: `formAction` u `src/lib/site.ts`
  (FormSubmit traži jednu aktivaciju preko maila nakon prvog poslanog zahtjeva)
- Radno vrijeme za status "otvoreno/zatvoreno": `src/lib/hours.ts`
- Fotografije: `src/assets/img`
- 3D model zuba: `src/components/three/tooth-geometry.ts`
