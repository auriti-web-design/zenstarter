
# Zenstarter – Starter Kit moderno per temi WordPress

**Zenstarter** è uno starter kit avanzato per la creazione di temi WordPress personalizzati, pensato per sviluppatori, freelance e agenzie che desiderano una base solida, performante e accessibile su cui costruire temi moderni e scalabili.

---

## 🚀 Caratteristiche principali

- ✅ **PHP modularizzato** con autoload PSR-4 via Composer
- ✅ **Supporto Gutenberg** e Full Site Editing (`theme.json`)
- ✅ **SCSS o TailwindCSS** configurabile con sistema di build moderno (es. Vite o Laravel Mix)
- ✅ **Compatibile WooCommerce** (modulare e disattivabile)
- ✅ **SEO e Performance ready** (OpenGraph, JSON-LD, lazyload, ottimizzazione script)
- ✅ **Accessibilità** by design (ARIA, focus, contrasto)
- ✅ **Multilingua** (supporto WPML, Polylang, TranslatePress)
- ✅ **GitHub Actions** e tool professionali di sviluppo (lint, Prettier, Husky, ecc.)

---

## 📁 Struttura della cartella principale

```
zenstarter/
├── assets/
├── blocks/
├── components/
├── includes/
├── languages/
├── templates/
├── template-parts/
├── style.css
├── theme.json
├── composer.json
└── functions.php
```

---

## 📦 Installazione

```bash
git clone https://github.com/auriti-web-design/zenstarter.git
cd zenstarter
composer install
npm install
npm run dev
```

> ⚙️ Assicurati di avere Node.js, Composer e WP-CLI installati per un'esperienza completa.

---

## 📝 Documentazione

La documentazione completa è disponibile nella directory `/docs`.

- Come inizializzare il tema
- Comandi `npm`, `composer` e `wp-cli`
- Come creare un blocco Gutenberg personalizzato
- Come strutturare template modulari
- Deployment automatico con GitHub Actions

---

## 📄 Licenza

Questo progetto è rilasciato sotto licenza **MIT**.

---

## 🌍 Versione inglese

Una versione del README in inglese è disponibile nella branch `readme-en` o nel file `README.en.md`.

---

> Creato con passione da [Juan Camilo Auriti](https://auritidesign.com)
