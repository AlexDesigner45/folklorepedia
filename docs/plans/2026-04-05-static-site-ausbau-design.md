# Folklorepedia — Static Site Ausbau Design

## Entscheidungen

- **Hosting:** Cloudflare Pages + Git-Repo (automatisches Deployment)
- **Blog-Stil:** Hero-Bild + Inline-Bilder pro Artikel; reguläre Seiten behalten aktuellen Stil
- **Blog-Themen (Startset):**
  1. "Vampire weltweit — Von Strigoi bis Jiangshi"
  2. "Die 10 dunkelsten Grimm-Märchen"
  3. "Baba Yaga in Videospielen und Film"

## Dateistruktur

```
folklorepedia/website/
├── index.html                         # Homepage
├── style.css                          # Design System
├── nav.js                             # Navigation JS (~30 Zeilen)
├── bestiary.html                      # Bestiary Übersicht
├── bestiary/
│   └── baba-yaga.html                # Bestiary-Eintrag
├── kulturen.html                      # Kulturen
├── dark-folklore.html                 # Dark Folklore
├── blog.html                          # Blog Übersicht (NEU)
├── blog/
│   ├── vampire-weltweit.html          # Artikel 1
│   ├── dunkelste-grimm-maerchen.html  # Artikel 2
│   └── baba-yaga-popkultur.html       # Artikel 3
├── ueber-uns.html                     # Über uns (NEU)
├── kontakt.html                       # Kontakt (NEU)
├── impressum.html                     # Impressum (NEU)
├── datenschutz.html                   # Datenschutz (NEU)
└── assets/images/blog/                # Blog-Bilder
```

## HTML-Template

Alle Seiten werden vollständige HTML-Dokumente mit:
- `<!DOCTYPE html>`, `<head>` mit Meta/OG-Tags
- Google Fonts Preconnect + Inter
- Relative Pfade (`./style.css`) für lokale + deployed Kompatibilität
- Einheitliche Nav mit: Bestiary | Kulturen | Dark Folklore | Blog | Über uns
- Einheitlicher Footer

## Blog-Artikel-Layout

- Hero-Bild: volle Breite, dunkler Gradient-Overlay, Titel + Meta darüber
- Body: max-width 780px, linearer Lesefluss (keine Sidebar)
- Inline-Bilder: 2-3 pro Artikel, border-radius 12px, mit Caption
- Meta: Lesezeit, Datum, Kategorie-Tags
- Verwandte Artikel am Ende (3 Cards)

## CSS-Änderungen

- GeneratePress-Overrides entfernen (Zeilen 9-27)
- Blog-Hero-CSS hinzufügen (`.fp-blog-hero`, `.fp-blog-hero__image`, etc.)
- Blog-Body-CSS (`.fp-blog-body`, `.fp-blog-body__image`, etc.)
- Blog-Card-CSS für Übersichtsseite

## Navigation (aktualisiert)

Alt: Bestiary | Erzählungen | Kulturen | Dark Folklore | Über uns
Neu: Bestiary | Kulturen | Dark Folklore | Blog | Über uns

## Umsetzungsreihenfolge

1. CSS bereinigen + Blog-CSS hinzufügen
2. Nav standardisieren + nav.js extrahieren
3. Homepage → vollständiges HTML-Dokument
4. Bestehende Seiten → vollständige HTML-Dokumente
5. Fehlende Seiten erstellen (ueber-uns, kontakt, impressum, datenschutz)
6. Blog-Übersicht erstellen
7. Blog-Artikel schreiben (3 Stück)
8. Bilder: Platzhalter-Divs (später durch generierte Bilder ersetzbar)
9. Git-Repo initialisieren
