# Deployment Guide

Dette prosjektet kan deployes på to måter: via **Lovable** (original hosting) eller via **GitHub Pages** (backup/alternativ).

## 🚀 Deployment via Lovable (Primær)

Prosjektet er opprinnelig opprettet i Lovable og deployes automatisk der.

### Live URL
**Lovable Deployment**: https://lovable.dev/projects/0535bc71-f2be-4267-b4ba-4dec0c86ac39

### Hvordan det fungerer
1. Alle endringer pushet til GitHub synkroniseres automatisk med Lovable
2. Lovable bygger og deployer automatisk
3. Endringer gjort i Lovable committes automatisk tilbake til GitHub

### Publisere på Lovable
1. Åpne [Lovable prosjektet](https://lovable.dev/projects/0535bc71-f2be-4267-b4ba-4dec0c86ac39)
2. Klikk på **Share → Publish**
3. Du kan også koble til et custom domain via **Project → Settings → Domains**

## 🌐 Deployment via GitHub Pages (Backup)

For å være uavhengig av Lovable, kan du også deploye via GitHub Pages.

### Live URL (etter setup)
**GitHub Pages URL**: https://tombonator3000.github.io/tom-erland-showcase/

### Initial Setup

#### 1. Aktiver GitHub Pages
1. Gå til repository settings: https://github.com/Tombonator3000/tom-erland-showcase/settings/pages
2. Under "Build and deployment":
   - Source: **GitHub Actions**
3. Klikk **Save**

#### 2. Trigger første deployment
Når du pusher til `main` eller `master` branch, vil GitHub Actions automatisk:
1. Bygge prosjektet med riktig base path
2. Deploye til GitHub Pages

Du kan også manuelt trigge deployment:
1. Gå til **Actions** tab i GitHub
2. Velg "Deploy to GitHub Pages" workflow
3. Klikk **Run workflow**

### Hvordan det fungerer

#### GitHub Actions Workflow
Workflowen i `.github/workflows/deploy.yml` gjør følgende:
1. Sjekker ut kode
2. Setter opp Node.js
3. Installerer dependencies (`npm ci`)
4. Bygger prosjektet med `GITHUB_PAGES=true` environment variabel
5. Deployer til GitHub Pages

#### Base Path Konfiguration
Vite er konfigurert til å bruke forskjellige base paths:
- **Lovable/Local**: `/` (rot)
- **GitHub Pages**: `/tom-erland-showcase/` (repo navn)

Dette håndteres automatisk via environment variabel i `vite.config.ts`:
```typescript
base: process.env.GITHUB_PAGES === 'true' ? '/tom-erland-showcase/' : '/',
```

### Lokal Testing av GitHub Pages Build

For å teste hvordan siden vil se ut på GitHub Pages lokalt:

```bash
# Bygg med GitHub Pages konfigurasjon
npm run build:github

# Preview byggingen
npm run preview:github
```

Siden vil nå kjøre på `http://localhost:4173/tom-erland-showcase/`

### Deployment Status

Du kan sjekke deployment status:
1. Gå til **Actions** tab: https://github.com/Tombonator3000/tom-erland-showcase/actions
2. Se på den siste "Deploy to GitHub Pages" workflowen
3. ✅ Grønn = Vellykket deployment
4. ❌ Rød = Feilet (sjekk logs)

## 🔄 Dual Hosting Strategy

Ved å bruke begge deploymentmetoder får du:

### Fordeler
- ✅ **Redundans**: Hvis Lovable har nedetid, fungerer GitHub Pages fortsatt
- ✅ **Fleksibilitet**: Kan dele forskjellige URLs avhengig av situasjon
- ✅ **Backup**: Alltid en fungerende versjon tilgjengelig
- ✅ **Kostnadsfritt**: Begge alternativene er gratis å bruke

### Ulemper
- ⚠️ **Dobbel vedlikehold**: To deployment pipelines å holde øye med
- ⚠️ **Sync issues**: Kan ha ulike versjoner hvis ikke synkronisert
- ⚠️ **Base path kompleksitet**: Må håndtere forskjellige base paths

## 📝 Viktige Notater

### For Lovable Deployment
- Endringer via Lovable pushes automatisk til GitHub
- Ingen manuell build/deploy nødvendig
- Custom domain støttes

### For GitHub Pages Deployment
- Kun endringer pushet til `main`/`master` branch deployes
- Build tar 2-5 minutter
- Gratis SSL via GitHub
- Begrensning på 100GB bandwidth per måned (mer enn nok for en portfolio)

## 🛠️ Troubleshooting

### GitHub Pages viser blank side
**Løsning**: Sjekk at base path er korrekt satt i `vite.config.ts`

### Assets laster ikke (404 errors)
**Løsning**: Sjekk at alle asset paths er relative og ikke absolutte

### Workflow feiler
**Løsning**:
1. Sjekk Actions logs for feilmelding
2. Verifiser at GitHub Pages er aktivert i settings
3. Sjekk at permissions er korrekt satt i workflow

### Custom Domain for GitHub Pages
Hvis du vil bruke et custom domain:
1. Legg til `CNAME` fil i `public/` mappen
2. Konfigurer DNS hos din domain provider
3. Aktiver HTTPS i GitHub Pages settings

## 🎯 Anbefalinger

**For utvikling og iterasjon**: Bruk Lovable for rask prototyping og endringer

**For produksjon og deling**: Bruk begge - Lovable som primær, GitHub Pages som backup

**For custom domain**: Lovable hvis du vil ha enkel setup, GitHub Pages hvis du vil ha full kontroll
