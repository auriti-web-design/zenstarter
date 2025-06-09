
# Zenstarter – Modern WordPress Theme Starter Kit

[![License](https://img.shields.io/badge/license-GPL--2.0--or--later-blue.svg)](LICENSE)
[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg)](https://wordpress.org)
[![PHP](https://img.shields.io/badge/PHP-7.4%2B-purple.svg)](https://php.net)

**Zenstarter** è uno starter kit avanzato per la creazione di temi WordPress moderni, progettato per sviluppatori che vogliono una base solida, performante e scalabile.

## ✨ Caratteristiche Principali

- 🏗️ **Architettura Modulare** con PSR-4 autoload
- 🎨 **Full Site Editing** e Gutenberg ready
- 🧩 **Block Patterns** personalizzati e varianti blocchi
- ⚡ **Build System Moderno** con Vite.js
- 🛒 **WooCommerce Compatible** 
- 🚀 **Performance Optimized** (Core Web Vitals)
- ♿ **Accessibility First** (WCAG 2.1)
- 🌐 **i18n Ready** con traduzioni complete
- 📱 **Mobile-First Design**

## 📁 Struttura del Progetto

```
zenstarter/
├── assets/              # JS, SCSS, immagini, font
│   ├── js/
│   ├── scss/
│   ├── images/
│   └── fonts/
├── blocks/              # Blocchi Gutenberg personalizzati
├── patterns/            # Block patterns riutilizzabili
├── components/          # Classi PHP (PSR-4)
│   ├── Core/
│   ├── Utils/
│   └── Frontend/
├── includes/            # Configurazioni e hooks
├── template-parts/      # Partial templates
├── templates/           # Page templates custom
├── languages/           # File di traduzione
├── docs/               # Documentazione
├── woocommerce/        # Template WooCommerce
├── .github/            # GitHub Actions workflow
├── theme.json          # Configurazione FSE
├── style.css           # Intestazione tema WordPress
├── functions.php       # Bootstrap del tema
└── composer.json       # Dipendenze PHP
```

## 🚀 Installazione Rapida

### Prerequisiti
- PHP 7.4+
- Node.js 16+
- Composer
- WordPress 6.0+

### Setup

```bash
# Clona il repository
git clone https://github.com/zenstarter/wordpress-theme.git zenstarter
cd zenstarter

# Installa dipendenze PHP
composer install

# Installa dipendenze Node.js
npm install

# Avvia il build in modalità sviluppo
npm run dev
```

## 🛠️ Comandi Disponibili

```bash
# Sviluppo
npm run dev          # Build e watch per sviluppo
npm run build        # Build ottimizzato per produzione
npm run lint         # Lint SCSS/JS
npm run lint:fix     # Fix automatico errori lint

# PHP
composer lint        # PHP_CodeSniffer
composer lint:fix    # PHP Code Beautifier
composer test        # PHPUnit tests (se configurato)

# WordPress
wp theme activate zenstarter
wp theme list
```

## 🎨 Personalizzazione

### Theme.json
Il file `theme.json` controlla:
- Palette colori
- Tipografia
- Spaziature
- Layout globali
- Impostazioni blocchi

### SCSS Structure
```
assets/scss/
├── abstracts/       # Variabili, mixins, funzioni
├── base/           # Reset, tipografia, elementi base
├── components/     # Componenti riutilizzabili
├── layout/         # Header, footer, grid
├── pages/          # Stili specifici per pagina
└── main.scss       # File principale
```

### Theme Settings
Le impostazioni principali di colori, tipografia e spaziature sono definite nel file `theme.json`. Modificando i valori in `settings` è possibile personalizzare la palette, la scala tipografica e le unità di misura senza toccare il codice PHP.

## 🔧 Configurazione Avanzata

### PSR-4 Autoload
```php
// components/Core/MyClass.php
namespace Theme\Core;

class MyClass {
    // La classe viene caricata automaticamente
}
```

### Hook System
```php
// In functions.php o nelle classi
add_action('zenstarter/before_header', 'my_custom_function');
add_filter('zenstarter/assets_version', 'my_version_filter');
```

## 📦 Estensioni

### WooCommerce
```php
// Attivazione automatica se WooCommerce è presente
if (class_exists('WooCommerce')) {
    // Template e hooks personalizzati
}
```

#### ✅ WooCommerce Compatibility
Consulta [docs/woocommerce.md](docs/woocommerce.md) per dettagli su template e
stili dedicati.

### Multilingua
Supporto nativo per:
- WPML
- Polylang  
- TranslatePress

## 🚀 Performance

- **Lazy Loading** immagini
- **Critical CSS** inline
- **Tree Shaking** JS/CSS
- **WebP** support automatico
- **Preload** risorse critiche

## ♿ Accessibilità

- **ARIA** labels e roles
- **Keyboard navigation**
- **Screen reader** friendly
- **Contrast ratio** WCAG 2.1 AA
- **Skip links**

## 🧪 Testing

```bash
# Lighthouse CI (se configurato)
npm run lighthouse

# Accessibility testing
npm run a11y

# Browser testing
npm run test:browser
```

## 📚 Documentazione

Documentazione completa in `/docs/`:

- [Installazione](docs/installazione.md)
- [Sviluppo](docs/sviluppo.md)
- [Creazione Blocchi](docs/creazione-blocchi.md)
- [Personalizzazione](docs/personalizzazione.md)
- [Deployment](docs/deployment.md)

## 🤝 Contribuire

1. Fork del progetto
2. Crea un feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Distribuito sotto licenza GPL-2.0-or-later. Vedi `LICENSE` per maggiori informazioni.

## 🌟 Supporto

- 📧 Email: support@zenstarter.com
- 🐛 Issues: [GitHub Issues](https://github.com/zenstarter/wordpress-theme/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/zenstarter/wordpress-theme/discussions)

---

> Creato con ❤️ da [Zenstarter Team](https://zenstarter.com)
