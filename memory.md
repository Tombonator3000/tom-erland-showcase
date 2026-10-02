# Memory

Ting som er greit å huske mellom økter. Kort og konkret.

## Prosjektet

- Personlig CV- og porteføljeside for Tom Erland Husby (Førstekonsulent, Hamar bispedømme).
- React 18 + Vite 5 + TypeScript + Tailwind. Opprinnelig laget i Lovable, synkes mot Lovable.
- Deploy: GitHub Pages via `.github/workflows/deploy.yml` ved push til main. `build:github` setter base til `/tom-erland-showcase/`.
- `App.tsx` bruker `import.meta.env.BASE_URL` som basename for React Router. Ikke bryt dette.
- Lint hadde 3 feil og 7 advarsler fra før (shadcn-filer og tailwind.config.ts) før redesignet i oktober 2026.

## Brukerens preferanser

- Sjekk alltid agents.md først. Logg alt i log.md med tidsstempel. Hold todo.md og memory.md oppdatert.
- Ingen emoji og ingen tankestrek (em dash) i tekst. Skriv menneskelig, ikke "AI-floskler".
- Skriver norsk.

## Designbeslutninger (oktober 2026)

- Hele siden er en parodi på en IKEA-monteringsanvisning. Produktet heter HUSBY (Tom er produktet).
- Inspirasjon: Esquire juni 2006, "IKEA Instructions" av Mike Sacks / Julian Sancton (tegneserie med nummererte trinn, vindu med sol og måne, tankebobler med spørsmålstegn).
- Svart strek på hvitt papir, IKEA-gul (#FFD600) som eneste aksentfarge. Ingen ekte IKEA-logo. Footer sier tydelig at HUSBY ikke er et IKEA-produkt.
- IKEA-figuren er en rigget SVG: ledd styres med CSS-variabler (--sf, --ef osv.), poser skifter med CSS-transition. Lemmer tegnes to ganger (svart tykk strek + hvit tynnere strek) så de ser sømløse ut.
- Kontaktskjemaet ble fjernet fordi det aldri sendte noe og e-posten var en plassholder. Kontakt skjer via LinkedIn og GitHub til Tom bestemmer seg for en adresse.
- Respekterer prefers-reduced-motion: ingen lasteskjerm, ingen scroll-scrubbing, ferdig tegnede streker.
- Fonter er selvhostet via Fontsource (`@fontsource-variable/noto-sans`, `noto-sans-mono`). Font-family heter "Noto Sans Variable" og "Noto Sans Mono Variable".

## Tekniske knep som er lette å glemme

- SVG-ledd: ytre `<g>` har `transform`-attributt (posisjon), indre `<g>` har CSS-transform (rotasjon). CSS-transform overstyrer attributtet, så de må aldri ligge på samme element. Samme regel for `.pop`/`.fade` (bruk `Reveal`, ikke `At`).
- Selvtegnende streker krever `pathLength={1}`. Bruk alltid `<P>` fra `svg.tsx`, og path-hjelperne i `geom.ts` (rect, circle osv. lager `<path>`, ikke `<rect>`, fordi pathLength ikke virker likt på alle former i Safari).
- Sticky sprengskisse: `.sheet` har `overflow-x: clip` (ikke hidden), ellers slutter `position: sticky` å virke.
- Tegninger venter på intro: `useInView` starter ikke før `markReady()` i `src/lib/ready.ts`. sessionStorage-nøkkel: `husby-unboxed`.
- Skruejakten lagres i localStorage-nøkkelen `husby-screws`. Slett den for å teste på nytt.
- Hjelpefunksjoner og komponenter ligger i hver sin fil (`geom.ts`/`svg.tsx`, `hunt-context.ts`/`ScrewHunt.tsx`) så react-refresh-lint holder seg ren.

## Testing lokalt

- Playwright finnes globalt (`/opt/node-tools/node_modules/playwright`) med Chromium i `/opt/pw-browsers`. Ingen WebKit eller Firefox.
- Sett `sessionStorage.husby-unboxed = "1"` i testene for å hoppe over intro.
