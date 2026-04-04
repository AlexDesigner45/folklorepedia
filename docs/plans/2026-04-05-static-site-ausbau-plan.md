# Folklorepedia Static Site Ausbau — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Folklorepedia von WordPress-Fragmenten zu einer vollständigen statischen Website mit Blog-System umbauen, ready für Cloudflare Pages Deployment.

**Architecture:** Reines HTML5 + CSS3 + minimales Vanilla JS. Keine Build-Tools, kein Framework. Eine CSS-Datei (`style.css`) als Design System, ein JS-File (`nav.js`) für Mobile-Navigation. Alle Seiten sind vollständige HTML-Dokumente mit Meta/OG-Tags.

**Tech Stack:** HTML5, CSS3 (Custom Properties), Vanilla JS, Google Fonts (Inter), Git, Cloudflare Pages

---

## Task 1: CSS bereinigen + Blog-Klassen hinzufügen

**Files:**
- Modify: `style.css:1-77` (GeneratePress-Overrides entfernen)
- Modify: `style.css` (Blog-CSS am Ende hinzufügen)

**Step 1: GeneratePress-Overrides entfernen**

Lösche Zeilen 9-77 in `style.css` — alles im Abschnitt `0. OVERRIDE GENERATEPRESS — NUCLEAR`. Dieser Code overridet WordPress-Theme-Elemente, die bei statischem Hosting nicht existieren. Behalte den `@import url(...)` für Google Fonts (Zeile 6) und alles ab Abschnitt `1. DESIGN TOKENS`.

**Step 2: Blog-CSS hinzufügen**

Am Ende von `style.css` (nach Abschnitt 20. RESPONSIVE) diese neuen Abschnitte einfügen:

```css
/* ==========================================================================
   21. BLOG HERO
   ========================================================================== */
.fp-blog-hero {
  position: relative; width: 100%; min-height: 60vh;
  display: flex; align-items: flex-end;
  overflow: hidden;
}
.fp-blog-hero__image {
  position: absolute; inset: 0; width: 100%; height: 100%;
  object-fit: cover; z-index: 0;
}
.fp-blog-hero__placeholder {
  position: absolute; inset: 0; width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  font-size: 120px; opacity: 0.15; z-index: 0;
}
.fp-blog-hero__overlay {
  position: absolute; inset: 0; z-index: 1;
  background: linear-gradient(to top, var(--fp-bg) 0%, rgba(9,9,11,0.7) 40%, rgba(9,9,11,0.3) 100%);
}
.fp-blog-hero__content {
  position: relative; z-index: 2; max-width: var(--fp-container);
  margin: 0 auto; padding: 48px 24px; width: 100%;
}
.fp-blog-hero__meta {
  display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
  margin-bottom: 16px; font-size: 13px; color: var(--fp-text-secondary);
}
.fp-blog-hero__meta-sep { opacity: 0.3; }
.fp-blog-hero__title {
  font-size: clamp(32px, 5vw, 56px); font-weight: 800;
  line-height: 1.1; letter-spacing: -0.03em; max-width: 800px;
}
.fp-blog-hero__excerpt {
  font-size: 17px; color: var(--fp-text-secondary); line-height: 1.6;
  max-width: 600px; margin-top: 16px;
}

/* ==========================================================================
   22. BLOG BODY
   ========================================================================== */
.fp-blog-body {
  max-width: 780px; margin: 0 auto; padding: 48px 24px 96px;
}
.fp-blog-body h2 {
  font-size: 28px; font-weight: 700; margin: 48px 0 16px;
  letter-spacing: -0.02em;
}
.fp-blog-body h3 {
  font-size: 22px; font-weight: 600; margin: 36px 0 12px;
}
.fp-blog-body p {
  font-size: 17px; line-height: 1.85; color: var(--fp-text-secondary);
  margin-bottom: 1.5em;
}
.fp-blog-body ul, .fp-blog-body ol {
  padding-left: 24px; margin-bottom: 1.5em; color: var(--fp-text-secondary);
}
.fp-blog-body li { margin-bottom: 8px; line-height: 1.7; }
.fp-blog-body a { text-decoration: underline; text-underline-offset: 3px; }
.fp-blog-body strong { color: var(--fp-text); }
.fp-blog-body blockquote {
  font-size: 19px; font-style: italic; line-height: 1.7;
  color: var(--fp-text-secondary);
  border-left: 3px solid var(--fp-accent); padding: 16px 0 16px 24px;
  margin: 32px 0;
}
.fp-blog-body__lead {
  font-size: 19px; line-height: 1.7; color: var(--fp-text-secondary);
  margin-bottom: 2em; font-weight: 400;
}

/* Blog Inline Image */
.fp-blog-image {
  margin: 40px 0; border-radius: var(--fp-radius); overflow: hidden;
  border: 1px solid var(--fp-border);
}
.fp-blog-image img {
  width: 100%; display: block;
}
.fp-blog-image__placeholder {
  width: 100%; aspect-ratio: 16/9;
  background: linear-gradient(135deg, var(--fp-bg-surface) 0%, var(--fp-bg-hover) 100%);
  display: flex; align-items: center; justify-content: center;
  font-size: 64px; opacity: 0.2;
}
.fp-blog-image__caption {
  padding: 12px 16px; font-size: 13px; color: var(--fp-text-muted);
  background: var(--fp-bg-elevated); border-top: 1px solid var(--fp-border);
}

/* Blog Info Box */
.fp-blog-infobox {
  background: var(--fp-bg-surface); border: 1px solid var(--fp-border);
  border-radius: var(--fp-radius); padding: 24px; margin: 32px 0;
}
.fp-blog-infobox__title {
  font-size: 14px; font-weight: 600; color: var(--fp-accent);
  text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;
}

/* Blog Related */
.fp-blog-related {
  border-top: 1px solid var(--fp-border); padding-top: 48px; margin-top: 64px;
}
.fp-blog-related__title {
  font-size: 20px; font-weight: 700; margin-bottom: 24px;
}

/* ==========================================================================
   23. BLOG OVERVIEW (blog.html)
   ========================================================================== */
.fp-blog-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;
}
.fp-blog-card {
  background: var(--fp-bg-elevated); border: 1px solid var(--fp-border);
  border-radius: var(--fp-radius); overflow: hidden;
  transition: all var(--fp-duration) var(--fp-ease);
  text-decoration: none; display: flex; flex-direction: column;
}
.fp-blog-card:hover {
  border-color: var(--fp-border-hover); transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}
.fp-blog-card__image { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
.fp-blog-card__image-placeholder {
  width: 100%; aspect-ratio: 16/9;
  background: linear-gradient(135deg, var(--fp-bg-surface) 0%, var(--fp-bg-hover) 100%);
  display: flex; align-items: center; justify-content: center;
  font-size: 48px; opacity: 0.3;
}
.fp-blog-card__body { padding: 24px; flex: 1; display: flex; flex-direction: column; }
.fp-blog-card__meta {
  display: flex; align-items: center; gap: 8px; margin-bottom: 12px;
  font-size: 12px; color: var(--fp-text-muted);
}
.fp-blog-card__title {
  font-size: 20px; font-weight: 700; letter-spacing: -0.01em;
  margin-bottom: 8px; color: var(--fp-text);
}
.fp-blog-card__excerpt {
  font-size: 14px; line-height: 1.6; color: var(--fp-text-muted); flex: 1;
}
.fp-blog-card__link {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 13px; font-weight: 600; color: var(--fp-accent);
  margin-top: 16px;
}

/* Blog Featured (first article on overview page) */
.fp-blog-featured {
  display: grid; grid-template-columns: 1fr 1fr; gap: 0;
  background: var(--fp-bg-elevated); border: 1px solid var(--fp-border);
  border-radius: var(--fp-radius); overflow: hidden; margin-bottom: 48px;
  text-decoration: none; transition: all var(--fp-duration) var(--fp-ease);
}
.fp-blog-featured:hover {
  border-color: var(--fp-border-hover); box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}
.fp-blog-featured__image-placeholder {
  width: 100%; height: 100%; min-height: 300px;
  background: linear-gradient(135deg, var(--fp-bg-surface) 0%, var(--fp-bg-hover) 100%);
  display: flex; align-items: center; justify-content: center;
  font-size: 80px; opacity: 0.2;
}
.fp-blog-featured__body { padding: 48px; display: flex; flex-direction: column; justify-content: center; }

/* Responsive Blog */
@media (max-width: 768px) {
  .fp-blog-hero { min-height: 50vh; }
  .fp-blog-grid { grid-template-columns: 1fr; }
  .fp-blog-featured { grid-template-columns: 1fr; }
  .fp-blog-featured__image-placeholder { min-height: 200px; }
  .fp-blog-featured__body { padding: 24px; }
  .fp-blog-body { padding: 32px 16px 64px; }
}
```

**Step 3: Verify**

Öffne `style.css` im Browser-Preview — keine GeneratePress-Klassen mehr, Blog-Klassen vorhanden.

**Step 4: Commit**

```bash
git add style.css
git commit -m "refactor: remove GeneratePress overrides, add blog CSS components"
```

---

## Task 2: Navigation standardisieren + nav.js erstellen

**Files:**
- Create: `nav.js`

**Step 1: nav.js erstellen**

```javascript
document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.querySelector('.fp-nav__toggle');
  var menu = document.querySelector('.fp-nav__menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function() {
      menu.classList.toggle('fp-nav__menu--open');
      toggle.setAttribute('aria-expanded',
        menu.classList.contains('fp-nav__menu--open'));
    });
  }
  // Highlight current page
  var path = window.location.pathname;
  var links = document.querySelectorAll('.fp-nav__link');
  links.forEach(function(link) {
    if (path.indexOf(link.getAttribute('href')) === 0 && link.getAttribute('href') !== '/') {
      link.style.color = 'var(--fp-text)';
    }
  });
});
```

**Step 2: Kanonische Navigation (für alle Seiten)**

Folgendes HTML wird auf JEDER Seite identisch verwendet:

```html
<nav class="fp-nav">
  <div class="fp-nav__inner">
    <a href="/" class="fp-nav__logo">Folklore<span>pedia</span></a>
    <button class="fp-nav__toggle" aria-label="Menü" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <ul class="fp-nav__menu">
      <li><a href="/bestiary.html" class="fp-nav__link">Bestiary</a></li>
      <li><a href="/kulturen.html" class="fp-nav__link">Kulturen</a></li>
      <li><a href="/dark-folklore.html" class="fp-nav__link">Dark Folklore</a></li>
      <li><a href="/blog.html" class="fp-nav__link">Blog</a></li>
      <li><a href="/ueber-uns.html" class="fp-nav__link">Über uns</a></li>
    </ul>
  </div>
</nav>
```

**Hinweis:** Links verwenden `.html`-Extension statt trailing-slash, weil Cloudflare Pages statische Dateien direkt served. Optional kann man später in Cloudflare "Pretty URLs" aktivieren.

**Step 3: Kanonischer Footer (für alle Seiten)**

```html
<footer class="fp-footer">
  <div class="fp-footer__grid">
    <div>
      <p class="fp-footer__brand">Folklore<span>pedia</span></p>
      <p class="fp-footer__desc">Die Enzyklopädie für Folklore, Mythologie und dunkle Legenden aus aller Welt.</p>
    </div>
    <div>
      <p class="fp-footer__heading">Erkunden</p>
      <ul class="fp-footer__links">
        <li><a href="/bestiary.html">Bestiary</a></li>
        <li><a href="/kulturen.html">Kulturen</a></li>
        <li><a href="/dark-folklore.html">Dark Folklore</a></li>
        <li><a href="/blog.html">Blog</a></li>
      </ul>
    </div>
    <div>
      <p class="fp-footer__heading">Projekt</p>
      <ul class="fp-footer__links">
        <li><a href="/ueber-uns.html">Über uns</a></li>
        <li><a href="/kontakt.html">Kontakt</a></li>
      </ul>
    </div>
    <div>
      <p class="fp-footer__heading">Rechtliches</p>
      <ul class="fp-footer__links">
        <li><a href="/impressum.html">Impressum</a></li>
        <li><a href="/datenschutz.html">Datenschutz</a></li>
      </ul>
    </div>
  </div>
  <div class="fp-footer__bottom">
    <p>&copy; 2026 Folklorepedia</p>
    <p>Das dunkle Wissen der Menschheit.</p>
  </div>
</footer>
```

**Step 4: Commit**

```bash
git add nav.js
git commit -m "feat: add nav.js for mobile menu and active page highlighting"
```

---

## Task 3: Homepage → vollständiges HTML-Dokument

**Files:**
- Modify: `index.html` (Fragment → vollständiges Dokument)

**Step 1:** Wrape den bestehenden Content der `index.html` in ein vollständiges HTML-Dokument:
- `<!DOCTYPE html>`, `<html lang="de">`, `<head>` mit Meta/OG-Tags
- Title: "Folklorepedia — Die Enzyklopädie für Folklore, Mythologie & dunkle Legenden"
- Meta-Description: "Von Baba Yaga bis zum Wendigo — Folklorepedia vereint Mythen, Märchen, Sagen und dunkle Überlieferungen aus über 30 Kulturen weltweit."
- Ersetze die alte Nav durch die kanonische Nav aus Task 2
- Ersetze den Footer-V2 durch den kanonischen Footer aus Task 2
- Entferne den inline `onclick` vom Nav-Toggle (nav.js übernimmt)
- Füge `<script src="./nav.js"></script>` vor `</body>` ein
- Aktualisiere Links: `/bestiary/` → `/bestiary.html`, etc.

**Step 2: Commit**

```bash
git add index.html
git commit -m "refactor: make index.html a standalone HTML document"
```

---

## Task 4: Bestehende Seiten → vollständige HTML-Dokumente

**Files:**
- Modify: `bestiary.html`
- Modify: `kulturen.html`
- Modify: `dark-folklore.html`
- Move: `baba-yaga.html` → `bestiary/baba-yaga.html`
- Create: `bestiary/` directory

**Step 1:** Für jede Seite dasselbe wie Task 3:
- Vollständiges HTML-Dokument mit passendem `<title>` und `<meta name="description">`
- Kanonische Nav + Footer
- `nav.js` einbinden
- Links aktualisieren

Seiten-spezifische Meta:
- **bestiary.html:** Title "Bestiary — Wesen & Kreaturen | Folklorepedia", Desc: "Götter, Geister, Monster, Dämonen — das vollständige Bestiary der Folklore aus aller Welt. 150+ Einträge aus 30 Kulturen."
- **kulturen.html:** Title "Kulturen & Traditionen | Folklorepedia", Desc: "Entdecke die Folklore von über 30 Kulturen weltweit — von der griechischen Mythologie bis zu westafrikanischen Anansi-Geschichten."
- **dark-folklore.html:** Title "Dark Folklore — Die dunkelste Seite der Menschheit | Folklorepedia", Desc: "Die dunkelsten Überlieferungen aus aller Welt. Von Stufe 1 (unheimlich) bis Stufe 5 (bodenlos) — kulturhistorisch dokumentiert."
- **bestiary/baba-yaga.html:** Title "Baba Yaga — Die Hexe des slawischen Waldes | Folklorepedia", Desc: "Alles über Baba Yaga: Herkunft, Hütte auf Hühnerbeinen, Geschichten und kultureller Kontext der slawischen Hexenfigur."

**Step 2:** `baba-yaga.html` nach `bestiary/baba-yaga.html` verschieben, CSS-Pfad auf `../style.css` und JS-Pfad auf `../nav.js` anpassen.

**Step 3: Commit**

```bash
git add bestiary.html kulturen.html dark-folklore.html bestiary/
git rm baba-yaga.html
git commit -m "refactor: convert all pages to standalone HTML, move baba-yaga to bestiary/"
```

---

## Task 5: Fehlende Seiten erstellen

**Files:**
- Create: `ueber-uns.html`
- Create: `kontakt.html`
- Create: `impressum.html`
- Create: `datenschutz.html`

**Step 1:** Jede Seite als vollständiges HTML-Dokument mit kanonischer Nav + Footer + Page-Hero.

- **ueber-uns.html:** Projektvorstellung, Vision, Team-Beschreibung, Kernwerte
- **kontakt.html:** E-Mail-Kontakt, Social-Media-Links, Mitmachen-CTA
- **impressum.html:** Platzhalter für Betreiberangaben (muss der User selbst ausfüllen)
- **datenschutz.html:** Standard-Datenschutzerklärung-Platzhalter

Alle verwenden `fp-page-hero` + `fp-container` + `fp-body-text` Klassen.

**Step 2: Commit**

```bash
git add ueber-uns.html kontakt.html impressum.html datenschutz.html
git commit -m "feat: add ueber-uns, kontakt, impressum, datenschutz pages"
```

---

## Task 6: Blog-Übersicht erstellen

**Files:**
- Create: `blog.html`

**Step 1:** Blog-Übersichtsseite mit:
- Page-Hero: "Blog" Überschrift + Subtitle
- Featured-Artikel (Vampire weltweit) als großes 2-Spalten-Card
- 2 weitere Artikel als Blog-Cards im Grid
- Verwendet `.fp-blog-featured` + `.fp-blog-grid` + `.fp-blog-card` Klassen aus Task 1

**Step 2: Commit**

```bash
git add blog.html
git commit -m "feat: add blog overview page with 3 article cards"
```

---

## Task 7: Blog-Artikel 1 — "Vampire weltweit"

**Files:**
- Create: `blog/vampire-weltweit.html`

**Step 1:** Vollständiger Blog-Artikel mit:
- Blog-Hero mit Platzhalter-Gradient + Titel-Overlay
- Meta: "12 Min. Lesezeit · 5. April 2026 · Vergleichende Mythologie"
- Lead-Paragraph
- 5-6 Abschnitte (Strigoi, Jiangshi, Penanggalan, Asanbosam, Dhampir, Nosferatu-Mythos)
- 2 Inline-Bilder (Platzhalter) mit Captions
- Infobox ("Wusstest du?")
- Verwandte Artikel am Ende
- CSS: `../style.css`, JS: `../nav.js`

**Step 2: Commit**

```bash
git add blog/vampire-weltweit.html
git commit -m "feat: add blog article — Vampire weltweit"
```

---

## Task 8: Blog-Artikel 2 — "Die 10 dunkelsten Grimm-Märchen"

**Files:**
- Create: `blog/dunkelste-grimm-maerchen.html`

**Step 1:** Listicle-Artikel mit:
- Blog-Hero
- Meta: "15 Min. Lesezeit · 28. März 2026 · Dark Folklore"
- 10 nummerierte Einträge mit Kurzbeschreibung
- 2-3 Inline-Bilder
- Verbindung zu Dark Folklore Hub

**Step 2: Commit**

```bash
git add blog/dunkelste-grimm-maerchen.html
git commit -m "feat: add blog article — Die 10 dunkelsten Grimm-Märchen"
```

---

## Task 9: Blog-Artikel 3 — "Baba Yaga in Popkultur"

**Files:**
- Create: `blog/baba-yaga-popkultur.html`

**Step 1:** Popkultur-Analyse mit:
- Blog-Hero
- Meta: "10 Min. Lesezeit · 20. März 2026 · Popkultur"
- Abschnitte: John Wick, The Witcher 3, Hellboy, D&D, Studio Ghibli, Smite
- 2 Inline-Bilder
- Verlinkung zum Bestiary-Eintrag Baba Yaga

**Step 2: Commit**

```bash
git add blog/baba-yaga-popkultur.html
git commit -m "feat: add blog article — Baba Yaga in der Popkultur"
```

---

## Task 10: Git-Repo initialisieren + .gitignore

**Files:**
- Create: `.gitignore`
- Init: Git repository

**Step 1:**

```bash
cd folklorepedia/website/
git init
```

**Step 2:** `.gitignore` erstellen:

```
.DS_Store
.env
node_modules/
generated_images/
*.log
```

**Step 3:** Initial commit:

```bash
git add -A
git commit -m "feat: Folklorepedia static site — initial commit"
```

**Step 4:** Für Cloudflare Pages: Repo zu GitHub pushen, dann in Cloudflare Pages Dashboard verbinden. Build-Command: (leer). Output-Directory: `/` (Root).
