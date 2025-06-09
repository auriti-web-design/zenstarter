# ⚡ Performance - Zenstarter

## 📖 Panoramica

Zenstarter è ottimizzato per le **Core Web Vitals** e le performance moderne. Il tema implementa tecniche avanzate di ottimizzazione per garantire caricamenti rapidi, user experience fluida e punteggi elevati nei tool di misurazione delle performance.

---

## 🎯 Core Web Vitals Target

### **Largest Contentful Paint (LCP)**
- 🎯 **Target**: < 2.5s
- ✅ **Implementato**: Critical CSS inline, preload risorse chiave
- 📊 **Misurazione**: Real User Monitoring (RUM) attivo

### **First Input Delay (FID)**
- 🎯 **Target**: < 100ms
- ✅ **Implementato**: JavaScript non-bloccante, event delegation
- 📊 **Misurazione**: Interaction to Next Paint (INP) monitorato

### **Cumulative Layout Shift (CLS)**
- 🎯 **Target**: < 0.1
- ✅ **Implementato**: Aspect ratios stabili, placeholder per contenuti dinamici
- 📊 **Misurazione**: Layout stability tracking

---

## 🚀 Ottimizzazioni Implementate

### **1. Font Loading Strategy**
```css
@font-face {
    font-family: 'Inter';
    font-display: swap; /* FOIT/FOUT optimization */
    src: url('../fonts/inter-var.woff2') format('woff2');
}
```

```html
<!-- Preload critical fonts -->
<link rel="preload" href="/assets/fonts/inter-var.woff2" 
      as="font" type="font/woff2" crossorigin>
```

### **2. Image Optimization**
```html
<!-- Native lazy loading -->
<img src="image.jpg" loading="lazy" decoding="async" 
     width="800" height="600" alt="Descrizione">

<!-- Responsive images -->
<img srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
     sizes="(max-width: 768px) 100vw, 50vw"
     src="medium.jpg" alt="Descrizione">
```

### **3. Resource Hints**
```html
<!-- DNS prefetch per domini esterni -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//www.google-analytics.com">

<!-- Preconnect per risorse critiche -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Prefetch per navigazione anticipata -->
<link rel="prefetch" href="/about">
```

### **4. Critical CSS**
```php
// Inline critical CSS per above-the-fold
if (is_front_page()) {
    echo '<style id="critical-css">
        .site-header { /* Critical styles */ }
        .zen-hero { /* Hero styles */ }
    </style>';
}
```

---

## 📦 Asset Management

### **CSS Optimization**
```scss
// Performance-optimized SCSS structure
.zen-card {
    contain: layout style; // CSS Containment
    will-change: transform; // GPU optimization
    
    &:hover {
        transform: translateY(-4px);
        transform: translate3d(0, -4px, 0); // Force hardware acceleration
    }
}
```

### **JavaScript Optimization**
```javascript
// Intersection Observer per lazy loading
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            observer.unobserve(entry.target);
        }
    });
});

// Defer non-critical animations
document.addEventListener('DOMContentLoaded', () => {
    // Animation initialization
});
```

### **Image Lazy Loading**
```css
img[loading="lazy"] {
    opacity: 0;
    transition: opacity 0.3s ease;
    
    &.loaded {
        opacity: 1;
    }
}

/* Placeholder shimmer effect */
.responsive-image::before {
    content: "";
    background: linear-gradient(90deg, #f1f5f9 25%, transparent 37%, #f1f5f9 63%);
    background-size: 400% 100%;
    animation: loading-shimmer 1.5s ease-in-out infinite;
}
```

---

## 🔧 Vite Configuration

### **Build Optimization**
```javascript
// vite.config.js
export default {
    build: {
        cssCodeSplit: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    blocks: ['./src/blocks/index.js']
                }
            }
        }
    },
    plugins: [
        // CSS purging
        purgecss({
            content: ['./src/**/*.html', './src/**/*.js'],
            safelist: ['wp-*', 'zen-*']
        }),
        
        // Image optimization
        imageOptimize({
            gifsicle: { optimizationLevel: 7 },
            mozjpeg: { quality: 85 },
            pngquant: { quality: [0.8, 0.9] },
            svgo: { multipass: true }
        })
    ]
};
```

### **Development vs Production**
```javascript
// Conditional loading per environment
if (process.env.NODE_ENV === 'production') {
    // Production optimizations
    config.plugins.push(compressionGzip());
    config.build.minify = 'terser';
} else {
    // Development features
    config.server.hmr = true;
}
```

---

## 📊 Monitoring e Metriche

### **Real User Monitoring (RUM)**
```javascript
// Web Vitals measurement
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### **Performance Budget**
```json
{
    "budget": [
        {
            "type": "bundle",
            "maximumWarning": "500kb",
            "maximumError": "1mb"
        },
        {
            "type": "initial",
            "maximumWarning": "200kb",
            "maximumError": "300kb"
        }
    ]
}
```

### **Lighthouse CI**
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install && npm run build
      - run: lhci autorun
```

---

## 🎨 CSS Performance

### **CSS Containment**
```css
.zen-card {
    contain: layout style paint;
    /* Isola il componente per il rendering */
}

.zen-grid {
    contain: layout;
    /* Ottimizza il layout di grid */
}
```

### **Will-Change Optimization**
```css
.zen-hero {
    will-change: transform;
    /* Solo per elementi che cambieranno */
    
    &:not(:hover):not(.is-animated) {
        will-change: auto;
        /* Reset dopo l'animazione */
    }
}
```

### **Critical Path CSS**
```css
/* Above-the-fold critical CSS */
.site-header {
    background: #fff;
    position: relative;
    z-index: 100;
}

.zen-hero {
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
```

---

## 🔄 Caching Strategy

### **Browser Caching**
```apache
# .htaccess
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
</IfModule>
```

### **Service Worker**
```javascript
// Service Worker per caching intelligente
self.addEventListener('fetch', event => {
    if (event.request.destination === 'image') {
        event.respondWith(
            caches.open('images').then(cache => {
                return cache.match(event.request).then(response => {
                    return response || fetch(event.request).then(fetchResponse => {
                        cache.put(event.request, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
            })
        );
    }
});
```

---

## 📱 Mobile Performance

### **Touch Performance**
```css
/* Ottimizzazione touch devices */
.zen-card {
    touch-action: manipulation;
    /* Elimina delay 300ms sui touch */
}

button {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
}
```

### **Viewport Units Optimization**
```css
/* Viewport units stabili */
.zen-hero {
    min-height: 60vh;
    min-height: 60svh; /* Safe area support */
    
    @supports (height: 100dvh) {
        min-height: 60dvh; /* Dynamic viewport */
    }
}
```

---

## 🛠 Tools e Testing

### **Performance Testing Tools**

1. **Core Web Vitals**
   - [PageSpeed Insights](https://pagespeed.web.dev/)
   - [Web Vitals Chrome Extension](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma)
   - [Lighthouse](https://developers.google.com/web/tools/lighthouse)

2. **Real User Monitoring**
   - [Chrome User Experience Report](https://developers.google.com/web/tools/chrome-user-experience-report)
   - [WebPageTest](https://www.webpagetest.org/)
   - [GTmetrix](https://gtmetrix.com/)

3. **Development Tools**
   ```bash
   # NPM packages utili
   npm install --save-dev web-vitals
   npm install --save-dev lighthouse
   npm install --save-dev @lhci/cli
   ```

### **Performance Checklist**

#### ✅ **Critical Path**
- [ ] Critical CSS inline < 14KB
- [ ] Font preload per font critici
- [ ] Above-the-fold content prioritario

#### ✅ **Images**
- [ ] Lazy loading implementato
- [ ] Formati moderni (WebP, AVIF)
- [ ] Aspect ratios stabili
- [ ] Responsive images

#### ✅ **JavaScript**
- [ ] Bundle splitting implementato
- [ ] Tree shaking attivo
- [ ] Compression (Gzip/Brotli)
- [ ] Event delegation

#### ✅ **CSS**
- [ ] CSS critici inline
- [ ] Non-critical CSS differito
- [ ] Purging CSS inutilizzati
- [ ] Minificazione attiva

---

## 📈 Performance Budget

### **Limiti Raccomandati**
```javascript
// Budget per tipo di risorsa
const performanceBudget = {
    'Total Size': '1.5MB',
    'CSS': '150KB',
    'JavaScript': '500KB',
    'Images': '800KB',
    'Fonts': '100KB',
    'First Contentful Paint': '1.5s',
    'Largest Contentful Paint': '2.5s',
    'Time to Interactive': '3.5s'
};
```

### **Monitoring Alerts**
```yaml
# Performance alerts
alerts:
  - metric: LCP
    threshold: 2500ms
    action: slack_notification
  
  - metric: FID
    threshold: 100ms
    action: email_team
  
  - metric: CLS
    threshold: 0.1
    action: create_issue
```

---

## 🔄 Continuous Optimization

### **Regular Audits**
1. **Weekly**: Lighthouse CI checks
2. **Monthly**: Full performance audit
3. **Quarterly**: Performance budget review

### **Optimization Workflow**
1. **Measure**: Baseline metrics
2. **Optimize**: Implement improvements
3. **Test**: Verify improvements
4. **Monitor**: Continuous tracking

---

## 📞 Performance Support

Per ottimizzazioni specifiche o problemi di performance:

- **GitHub Issues**: [Performance Issues](https://github.com/zenstarter/wordpress-theme/issues)
- **Documentation**: [Performance Guide aggiornato](./performance.md)
- **Community**: Slack #performance channel

---

> **💡 Nota**: Le performance web sono un processo continuo. Monitora regolarmente, testa con dati reali e ottimizza costantemente per mantenere un'esperienza utente eccellente.