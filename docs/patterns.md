# Block Patterns e Variations

Questa directory raccoglie i pattern personalizzati inclusi in **Zenstarter** e spiega come estendere il tema con nuovi blocchi riutilizzabili.

## Registrare un nuovo pattern

1. Creare un file PHP in `patterns/` che ritorni un array con `title`, `categories` e `content`.
2. I pattern vengono caricati automaticamente da `inc/block-patterns.php`.
3. Utilizzare solo blocchi core e classi del tema per garantire la massima compatibilità.

Esempio di file:

```php
<?php
return [
    'title'      => __( 'Example Pattern', 'zenstarter' ),
    'categories' => [ 'zenstarter' ],
    'content'    => '<!-- wp:paragraph --><p>Contenuto</p><!-- /wp:paragraph -->',
];
```

## Strutturare un blocco riutilizzabile

- Utilizzare layout responsive (`alignwide`, colonne con `isStackedOnMobile`).
- Applicare classi utili del tema (es. `hero-banner`, `cta-section`).
- Evitare dipendenze da plugin esterni.

## Creare e registrare una variation

Le variazioni di blocco sono definite in `inc/block-variations.php`.
Esempio per il blocco pulsante:

```php
register_block_style(
    'core/button',
    [
        'name'  => 'rounded',
        'label' => __( 'Rounded', 'zenstarter' ),
    ]
);
```

WordPress mostrerà la nuova variante tra gli stili disponibili del blocco.
