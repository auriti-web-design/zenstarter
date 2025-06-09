# 📄 Templates e Sidebars

Questa sezione illustra i template di pagina disponibili in **Zenstarter** e come gestire nuove aree widget.

## Template Inclusi

- `template-fullwidth.php` – layout a tutta larghezza senza sidebar
- `template-sidebar-left.php` – sidebar posizionata a sinistra
- `template-sidebar-right.php` – sidebar posizionata a destra

Ogni file si trova nella cartella `/templates/` e segue la gerarchia di WordPress con le funzioni standard `get_header()` e `get_footer()`.

## Creare una nuova Sidebar

1. Apri `inc/widgets.php` e registra una nuova sidebar tramite `register_sidebar()`.
2. Assegna un `id` univoco e personalizza i parametri HTML (`before_widget`, `after_widget`, ecc.).
3. Richiama `dynamic_sidebar( 'tuo-id' )` all'interno di un file `sidebar-*.php` dedicato.

## Utilizzo delle Sidebars nei Template

Nei template personalizzati puoi includere la sidebar desiderata con:

```php
if ( is_active_sidebar( 'sidebar-right' ) ) {
    get_sidebar( 'right' );
}
```

Sostituisci `right` con il nome della sidebar registrata. In assenza di widget l'area non verrà mostrata.
