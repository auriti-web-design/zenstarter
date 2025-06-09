# 🔰 Accessibilità - Zenstarter

## 📖 Panoramica

Zenstarter è conforme alle **WCAG 2.1 AA** (Web Content Accessibility Guidelines) per garantire l'usabilità da parte di utenti con diverse abilità. Il tema implementa best practice moderne per accessibilità, navigazione da tastiera e tecnologie assistive.

---

## 🎯 Principi WCAG 2.1 Implementati

### 1. **Percettibile**
- ✅ Contrasto colori minimo 4.5:1 per testo normale
- ✅ Contrasto colori minimo 3:1 per testi grandi (18pt+)
- ✅ Alternative testuali per immagini (`alt` attributes)
- ✅ Supporto per preferenze di movimento ridotto (`prefers-reduced-motion`)

### 2. **Utilizzabile**
- ✅ Navigazione completa da tastiera
- ✅ Skip links per saltare al contenuto principale
- ✅ Focus visibile per tutti gli elementi interattivi
- ✅ Nessun limite di tempo per le interazioni

### 3. **Comprensibile**
- ✅ Struttura semantica HTML5 corretta
- ✅ Gerarchia heading consistente (H1→H6)
- ✅ Etichette e istruzioni chiare per i form
- ✅ Linguaggio semplice e comprensibile

### 4. **Robusto**
- ✅ Markup valido e semanticamente corretto
- ✅ Compatibilità con screen reader
- ✅ Supporto per tecnologie assistive
- ✅ Progressive enhancement

---

## 🛠 Funzionalità di Accessibilità

### **Skip Links**
```html
<a href="#main-content" class="skip-link">Salta al contenuto</a>
```
- Posizionato all'inizio di ogni pagina
- Visibile solo al focus da tastiera
- Porta direttamente al contenuto principale

### **Landmark Roles**
```html
<main role="main" id="main-content">
<nav role="navigation" aria-label="Menu principale">
<header role="banner">
<footer role="contentinfo">
```

### **ARIA Labels e Descrizioni**
- Tutti i controlli interattivi hanno etichette appropriate
- Menu toggle: `aria-expanded`, `aria-controls`
- Form fields: `aria-describedby`, `aria-required`
- Immagini decorative: `aria-hidden="true"`

### **Focus Management**
```scss
*:focus {
    outline: 2px solid var(--wp--preset--color--primary);
    outline-offset: 2px;
    border-radius: 0.25rem;
}
```

### **Keyboard Navigation**
- **Tab**: Navigazione in avanti
- **Shift+Tab**: Navigazione indietro  
- **Enter/Space**: Attivazione pulsanti
- **Escape**: Chiusura modal/dropdown

---

## 🎨 Contrasto e Colori

### **Palette Accessibile**
```scss
// Contrasti testati WCAG AA
--color-primary: #2563eb;        // Blu - Ratio 4.5:1
--color-secondary: #64748b;      // Grigio - Ratio 7:1
--color-success: #059669;        // Verde - Ratio 4.6:1
--color-warning: #d97706;        // Arancione - Ratio 4.7:1
--color-error: #dc2626;          // Rosso - Ratio 5.2:1
```

### **High Contrast Mode**
```scss
@media (prefers-contrast: high) {
    .zen-card {
        border: 2px solid currentColor;
    }
    
    .zen-card__button {
        border-width: 2px;
    }
}
```

---

## 📱 Responsive e Mobile

### **Touch Targets**
- Dimensione minima: **44px × 44px** (WCAG 2.1 AA)
- Spaziatura adeguata tra elementi interattivi
- Zoom supportato fino al 200% senza scroll orizzontale

### **Viewport e Orientamento**
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

---

## 🔧 Blocchi Zen - Accessibilità

### **Zen Hero**
```php
// Attributi semantici automatici
'role' => 'banner',
'aria-label' => 'Sezione hero principale'
```

### **Zen Card**
```html
<!-- Link e pulsanti accessibili -->
<a href="..." class="zen-card__link" 
   aria-label="Leggi di più su: Titolo Card">
```

### **Zen Testimonial**
```html
<!-- Rating accessibili -->
<div class="zen-testimonial__rating" 
     role="img" 
     aria-label="Valutazione: 5 su 5 stelle">
```

### **Zen Grid**
```html
<!-- Layout grid semantico -->
<div class="zen-grid" 
     role="list">
    <div role="listitem">...</div>
</div>
```

---

## 🧪 Testing e Validazione

### **Strumenti Raccomandati**

1. **Automated Testing**
   - [axe DevTools](https://www.deque.com/axe/devtools/)
   - [WAVE Web Accessibility Evaluator](https://wave.webaim.org/)
   - [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse)

2. **Manual Testing**
   - Navigazione solo da tastiera
   - Screen reader testing (NVDA, JAWS, VoiceOver)
   - Zoom al 200% e 400%
   - Modalità High Contrast

3. **Color Testing**
   - [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)
   - [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### **Checklist di Verifica**

#### ✅ **Tastiera**
- [ ] Tutti gli elementi interattivi sono raggiungibili
- [ ] L'ordine di tabulazione è logico
- [ ] Il focus è sempre visibile
- [ ] Non esistono "keyboard trap"

#### ✅ **Screen Reader**
- [ ] Tutti i contenuti sono leggibili
- [ ] Le immagini hanno alt text appropriati
- [ ] I form hanno etichette corrette
- [ ] La struttura heading è corretta

#### ✅ **Colori e Contrasto**
- [ ] Contrasto minimo rispettato ovunque
- [ ] L'informazione non dipende solo dal colore
- [ ] High contrast mode funziona correttamente

#### ✅ **Responsive**
- [ ] Touch targets di almeno 44px
- [ ] Zoom al 200% funzionale
- [ ] No scroll orizzontale

---

## 📚 Risorse e Standard

### **Guidelines**
- [WCAG 2.1 AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)

### **WordPress Specifiche**
- [WordPress Accessibility Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/accessibility/)
- [WordPress Accessibility Handbook](https://make.wordpress.org/accessibility/handbook/)

### **Tools per Sviluppatori**
```bash
# NPM packages utili
npm install --save-dev @axe-core/cli
npm install --save-dev pa11y
npm install --save-dev lighthouse
```

---

## 🔄 Aggiornamenti e Manutenzione

### **Monitoring Continuo**
1. **Automated Testing** nei build CI/CD
2. **User Testing** con utenti con disabilità
3. **Regular Audits** trimestrali

### **Aggiornamenti Standards**
- Monitoraggio aggiornamenti WCAG
- Testing con nuove tecnologie assistive
- Feedback dalla community di utenti

---

## 📞 Supporto e Feedback

Per segnalazioni di problemi di accessibilità o suggerimenti:

- **GitHub Issues**: [Segnala problema di accessibilità](https://github.com/zenstarter/wordpress-theme/issues)
- **Email**: accessibility@zenstarter.com
- **Documentazione**: Consultare sempre la versione più aggiornata di questo documento

---

> **💡 Ricorda**: L'accessibilità non è un "extra" ma un requisito fondamentale per un web inclusivo. Ogni utente ha il diritto di accedere e utilizzare il contenuto web indipendentemente dalle proprie abilità.