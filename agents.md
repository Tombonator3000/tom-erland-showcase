# Agent Utviklingslogg

## Prosjektoversikt
**Prosjektnavn**: Tom Erland Showcase Portfolio
**Type**: React/Vite showcase nettside
**Opprettet i**: Lovable.dev
**GitHub**: tom-erland-showcase
**Status**: Aktiv utvikling

## Teknologi Stack
- **Frontend**: React 18.3.1 + TypeScript
- **Build Tool**: Vite 5.4.19
- **UI Framework**: Tailwind CSS 3.4.17 + egne CSS-filer i `src/styles/`
- **UI Components**: shadcn/ui (Radix UI), brukes nesten ikke lenger
- **Routing**: React Router DOM 6.30.1
- **Fonter**: Noto Sans og Noto Sans Mono (variable), selvhostet via Fontsource
- **Grafikk**: All illustrasjon er inline SVG skrevet for hånd i React. Ingen bilder, ingen animasjonsbibliotek.

## Design (fra oktober 2026)
Hele siden er en parodi på en IKEA-monteringsanvisning. Produktet heter HUSBY, og Tom er produktet.
Svart strek på hvitt papir, IKEA-gul som eneste aksentfarge. Hver seksjon er en "side" i anvisningen med sidetall.

## Hovedfunksjoner
1. **Side 1, Forside**: stort produktnavn, målsetting ("15+ år"), åpnet eske med deler, figur som vinker og klør seg i hodet, vindu som går fra dag til natt, transportbånd med teknologier
2. **Side 2, Før du starter**: klassiske piktogrammer med kryss og hake (verktøy, løft sammen, hold orden, ring kundeservice)
3. **Side 3, Innhold i pakken**: deleliste (1x førstekonsulent, 15x år med erfaring osv.) og "Skrueoversikt 1:1" der ferdigheter vises som skruer mot en linjal
4. **Side 4, Sprengskisse**: figuren monteres når man scroller (sticky scene, deler flyr på plass, KLIKK, monteringsgrad i prosent)
5. **Side 5, Monteringsanvisning**: utdanning og jobber som nummererte trinn med egne animerte tegninger
6. **Side 6, Tilleggsprodukter**: hobbyspillene som produktkort med gul prislapp
7. **Side 7, Kundeservice**: kontaktinfo på en "handleliste" (LinkedIn, GitHub, lokasjon)
8. **Bakside**: ansvarsfraskrivelse (ikke et IKEA-produkt) og kreditering av Esquire-tegneserien

Ekstra:
- Lasteskjerm der esken pakkes ut (én gang per økt, kan hoppes over, aldri med redusert bevegelse)
- Liten mann som bærer en planke langs bunnen av skjermen som fremdriftsindikator
- Skruejakt: fem løse skruer gjemt på siden, teller i menyen, feiring når alle er funnet
- Insexnøkkel som musepeker og en liten "skru"-pil ved klikk
- 404-side: "Del 404 mangler"
- `prefers-reduced-motion` respekteres overalt

## Struktur
- `src/data/cv.ts`: alt innhold (jobber, utdanning, ferdigheter, spill, kontakt). Endre tekst her.
- `src/components/ikea/`: IKEA-figuren (rigg, poser, geometri), SVG-deler, rekvisitter, skruejakt, lasteskjerm
- `src/components/sections/`: én komponent per side i anvisningen
- `src/styles/`: `manual.css` (strektegning og animasjoner), `rig.css` (figuren), `layout.css` (meny, forside, skruejakt), `sections.css` (seksjonene)
- Les også `memory.md`, `todo.md` og `log.md` før du endrer noe.

## Mål og Visjon
Skape en imponerende showcase-nettside som:
- Demonstrerer game development ferdigheter
- Viser teknisk kompetanse
- Gir en engasjerende brukeropplevelse
- Er tilgjengelig både via Lovable og GitHub Pages

## Nåværende Utfordringer
1. Kontaktadresse: siden har ingen e-post eller skjema. Kontakt går via LinkedIn og GitHub til Tom bestemmer en adresse.
2. Delingsbildet (`public/og-image.png`) er lenket med full GitHub Pages-adresse. Det virker først når main er deployet.
3. Testet i Chromium (desktop, nettbrett, mobil). Ikke testet i Safari eller Firefox.

## Fremtidige Planer
- [x] Sette opp GitHub Pages deployment
- [ ] Legge til flere spillbare demos
- [ ] Forbedre performance og lading
- [ ] SEO optimalisering
- [ ] Analytics integrering
