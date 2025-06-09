# 🧪 Guida Testing - Zenstarter Theme

## ⚡ Test Rapidi

### 1. Build System
```bash
# Build development
npm run dev

# Build production
npm run build

# Verifica file generati
ls -la assets/dist/
```

### 2. Attivazione Tema
```bash
# Via WP-CLI
wp theme activate zenstarter

# Via Dashboard
WordPress Admin > Appearance > Themes > Activate Zenstarter
```

### 3. Test Template

| Template | URL Test | Verifica |
|----------|----------|----------|
| `front-page.php` | `/` | Hero section, features, post grid |
| `page.php` | `/sample-page/` | Page content, sidebar |
| `single.php` | `/hello-world/` | Post content, meta, navigation |
| `archive.php` | `/category/uncategorized/` | Archive header, post list |
| `404.php` | `/pagina-inesistente/` | Error message, search, suggestions |

### 4. Test Gutenberg/FSE

```bash
# Test editor
/wp-admin/site-editor.php

# Test customizer
/wp-admin/customize.php
```

**Verifiche:**
- ✅ Palette colori (20+ colori)
- ✅ Font families (3 families)
- ✅ Font sizes (9 sizes)  
- ✅ Spacing (12 sizes)
- ✅ Block styles (button outline, quote styles)

### 5. Test Responsivo

| Breakpoint | Width | Test |
|------------|-------|------|
| Mobile | 375px | Navigation toggle, grid stack |
| Tablet | 768px | 2-col grid, sidebar stack |
| Desktop | 1024px+ | 3-col grid, sidebar visible |

### 6. Test Accessibility

```bash
# Test keyboard navigation
Tab, Shift+Tab, Enter, Space, Esc

# Test screen reader
NVDA, JAWS, VoiceOver
```

**Verifiche:**
- ✅ Skip links funzionanti
- ✅ ARIA labels presenti
- ✅ Focus outline visibile
- ✅ Contrast ratio > 4.5:1

### 7. Test Performance

```bash
# Lighthouse CI
npm run lighthouse

# GTmetrix/PageSpeed
https://gtmetrix.com/
https://pagespeed.web.dev/
```

**Target:**
- ✅ Performance Score > 90
- ✅ Accessibility Score > 95
- ✅ Best Practices > 90
- ✅ SEO Score > 90

## 🔧 Debug Mode

### Attiva Debug
```php
// wp-config.php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

### Check Log
```bash
tail -f /wp-content/debug.log
```

## 🚨 Problemi Comuni

### Build Fails
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf assets/dist
npm run build
```

### CSS Not Loading
1. Check `assets/dist/manifest.json` exists
2. Verify file permissions
3. Check `ZENSTARTER_ASSETS_URL` constant

### JS Errors
1. Check browser console
2. Verify jQuery is loaded
3. Test with default theme

### Template Issues
1. Check template hierarchy
2. Verify hook calls
3. Test with WordPress default content

## ✅ Checklist Completo

### Frontend
- [ ] Homepage loads correctly
- [ ] Navigation menu works
- [ ] Search functionality
- [ ] Post/Page content displays
- [ ] Comments system
- [ ] Widget areas
- [ ] 404 page

### Admin
- [ ] Theme activates without errors
- [ ] Customizer options work
- [ ] Editor loads custom styles
- [ ] Block editor functions
- [ ] Media uploads work

### Performance
- [ ] CSS/JS assets load
- [ ] Images are optimized
- [ ] Lazy loading works
- [ ] No console errors
- [ ] Page load < 3s

### Compatibility
- [ ] WordPress 6.0+
- [ ] PHP 7.4+
- [ ] Popular plugins
- [ ] Multiple browsers
- [ ] Mobile devices

---

🎯 **Obiettivo**: Tutti i test devono passare prima di considerare il tema production-ready!