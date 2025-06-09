# 🛒 WooCommerce - Zenstarter

## 📖 Panoramica

Zenstarter integra WooCommerce tramite override sicuri dei template e stili SCSS dedicati. In questo modo l'eCommerce rispetta la stessa UX del tema ed è facilmente estendibile.

---

## ✅ Override dei Template

I file si trovano in `/woocommerce/`:

- `archive-product.php` – pagina shop e archivi prodotti
- `content-product.php` – layout dei prodotti nel loop
- `single-product.php` – pagina singolo prodotto

Puoi aggiungere ulteriori template (carrello, checkout, ecc.) replicando la struttura di WooCommerce e sfruttando le classi utility del tema.

---

## 🔧 Personalizzazione

1. Copia il file da modificare nella stessa cartella.
2. Aggiorna markup o hook secondo le tue necessità.
3. Ricompila gli stili SCSS se hai aggiunto classi personalizzate.

---

## 🎨 Build SCSS

Gli stili di WooCommerce sono in `assets/scss/pages/_woocommerce.scss`.
Per generare i CSS utilizza i comandi:

```bash
npm run dev   # sviluppo con watch
npm run build # produzione ottimizzata
```

---

Con questo approccio Zenstarter rimane compatibile con gli aggiornamenti futuri di WooCommerce e fornisce una base solida per espansioni e personalizzazioni.
