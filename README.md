# sofials.github.io

Portfolio di Sofia Lo Sardo. Sito statico (HTML/CSS/JS), senza build, pubblicato gratis su GitHub Pages.

## Pubblicare (una volta sola)

1. Su GitHub crea un repo **pubblico** chiamato esattamente `sofials.github.io`.
2. Carica tutti i file di questa cartella nella root del repo (anche `.nojekyll`).
   - Da browser: *Add file → Upload files*, trascina tutto, *Commit*.
   - Da terminale:
     ```
     git init && git add . && git commit -m "portfolio"
     git branch -M main
     git remote add origin https://github.com/sofials/sofials.github.io.git
     git push -u origin main
     ```
3. Repo → *Settings → Pages* → Source: *Deploy from a branch*, branch `main`, cartella `/ (root)`.
4. Dopo 1-2 minuti il sito è su **https://sofials.github.io**.
   La demo esistente resta su https://sofials.github.io/gestural-canvas/ (è un altro repo, non si tocca).

## Provarlo in locale

```
python3 -m http.server 8000
```
poi apri http://localhost:8000

## Modificare i contenuti

Tutto sta in **`js/projects.js`**:
- l'ordine dell'array è l'ordine della griglia
- `featured: true` = card grande (la prima featured occupa 2×2)
- `lab: true` = va nella sezione Lab
- `tags` usa le chiavi di `TAGS` in cima al file (i filtri si generano da soli)
- ogni progetto ha i testi `it` e `en`
- `hood` = blocco tecnico "Under the hood" (metti `null` per non mostrarlo)

Testi di about, hero, ecc.: `js/common.js` → `STRINGS`.

## Immagini e video

- Cover: `assets/projects/<id>/cover.jpg` (consigliato 1600×1000, < 400 KB, anche .webp).
  Se il file manca la card mostra un gradiente: il sito non si rompe.
- Galleria: aggiungi i percorsi nell'array `gallery`, es. `["assets/projects/pulse/01.jpg"]`.
- Video: `video` accetta un embed YouTube (`https://www.youtube.com/embed/ID`) o un .mp4 in `assets/`.
  I video pesanti meglio su YouTube/Vimeo (GitHub ha limite 100 MB per file).
- Foto about: `assets/sofia.jpg` (formato verticale 4:5).

Cartelle id: harmony-vr, gestural-canvas, resonance, three-timelines, it-reminded-me-of-you,
pulse, claudio, shorekeepers, bed-time, ar-markerless.

## Da fare

- [ ] Email nella sezione contatti (`index.html`, cerca TODO)
- [ ] Cover e immagini da Notion
- [ ] Stack di It Reminded Me of You (su Notion è un'immagine, non l'ho potuto leggere)
- [ ] Ricontrollare "Cosa ho fatto" nei progetti di team (Harmony in particolare)
- [ ] Nuovi lavori di animazione (tag `animation`)
