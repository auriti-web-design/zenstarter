# 📚 Guida Completa alle Funzionalità Blog - Tema Zenstarter

## 📖 Indice

1. [Panoramica Generale](#panoramica-generale)
2. [Pattern Modificabili dal Site Editor](#pattern-modificabili-dal-site-editor)
3. [Loop Personalizzato](#loop-personalizzato)
4. [Box Autore Avanzato](#box-autore-avanzato)
5. [Articoli Correlati Intelligenti](#articoli-correlati-intelligenti)
6. [Sistema Hook Personalizzati](#sistema-hook-personalizzati)
7. [Personalizzazione e Configurazione](#personalizzazione-e-configurazione)
8. [Esempi di Codice](#esempi-di-codice)
9. [Best Practices](#best-practices)

---

## 🎯 Panoramica Generale

Il tema Zenstarter offre un sistema blog completo e professionale con funzionalità avanzate completamente modificabili dal Site Editor di WordPress. Tutte le funzionalità sono progettate per essere:

- **FSE-ready**: Completamente compatibili con Full Site Editing
- **Modulari**: Facilmente attivabili/disattivabili
- **Personalizzabili**: Configurabili tramite hook e filtri
- **Performanti**: Ottimizzate con caching e query intelligenti
- **Accessibili**: Conformi agli standard WCAG 2.1 AA

### ✨ Funzionalità Principali

- ✅ Pattern blog modificabili dal Site Editor
- ✅ Loop post personalizzato con hook modulari
- ✅ Box autore avanzato con social links e statistiche
- ✅ Articoli correlati intelligenti (3 algoritmi)
- ✅ Sistema hook completo per customizzazione
- ✅ Supporto reading time e post format
- ✅ Caching automatico per performance

---

## 🎨 Pattern Modificabili dal Site Editor

### Come Accedere ai Pattern

1. **Via Site Editor**:
   - Apri `Aspetto > Editor del sito`
   - Vai su `Modelli > Aggiungi nuovo modello`
   - Clicca su `Inserisci pattern` (+)
   - Cerca categoria `Zenstarter Blog`

2. **Via Editor dei Post**:
   - Crea/modifica un post o pagina
   - Clicca sul (+) per aggiungere blocco
   - Vai su tab `Pattern`
   - Filtra per `Zenstarter Blog`

### Pattern Disponibili

#### 1. Blog Post Grid
```
Categoria: Zenstarter Blog
Descrizione: Griglia responsive per post del blog con immagini in evidenza
Utilizzo: Ideale per pagine archivio e homepage
```

#### 2. Featured Post Layout
```
Categoria: Zenstarter Blog  
Descrizione: Layout grande per post in evidenza con dettagli completi
Utilizzo: Hero section e post importanti
```

#### 3. Author Bio Section
```
Categoria: Zenstarter Blog
Descrizione: Sezione biografia autore con avatar e link social
Utilizzo: Pagine autore e post singoli
```

### Personalizzare i Pattern

#### Modifica Diretta nel Site Editor
```php
// I pattern sono completamente editabili tramite l'interfaccia
// Tutte le modifiche vengono salvate automaticamente
```

#### Customizzazione Programmatica
```php
// functions.php del child theme

// Personalizzare il contenuto dei pattern
add_filter('zenstarter_pattern_content_blog-post-grid', function($content, $args) {
    return str_replace('Blog Posts', 'I Nostri Articoli', $content);
}, 10, 2);

// Aggiungere nuovi pattern
function my_custom_blog_patterns() {
    register_block_pattern('mytheme/custom-blog-hero', array(
        'title' => 'Hero Blog Personalizzato',
        'categories' => array('zenstarter-blog'),
        'content' => '<!-- wp:group -->...'
    ));
}
add_action('init', 'my_custom_blog_patterns');
```

---

## 🔄 Loop Personalizzato

### Utilizzo Base

Il template `template-parts/loop/post.php` viene utilizzato automaticamente in:
- `home.php` (pagina blog)
- `archive.php` (archivi categorie/tag)
- `search.php` (risultati ricerca)

### Struttura del Loop

```php
// Esempio di utilizzo in un template
<?php while (have_posts()) : the_post(); ?>
    <?php get_template_part('template-parts/loop/post'); ?>
<?php endwhile; ?>
```

### Hook Disponibili nel Loop

#### Prima del Contenuto
```php
// Aggiungi contenuto prima del post
add_action('zenstarter_loop_post_before_content', function() {
    echo '<div class="post-announcement">Nuovo!</div>';
});
```

#### Meta Personalizzati
```php
// Sostituisci completamente i meta del post
remove_action('zenstarter_loop_post_meta', array($blog_hooks, 'display_loop_post_meta'));
add_action('zenstarter_loop_post_meta', function() {
    echo '<div class="custom-meta">Meta personalizzati</div>';
});
```

#### Azioni Personalizzate
```php
// Aggiungi pulsanti personalizzati
add_action('zenstarter_loop_post_actions', function() {
    echo '<button class="save-post">Salva</button>';
});
```

### Personalizzazione CSS Classes

```php
// Aggiungi classi CSS personalizzate
add_filter('zenstarter_loop_post_classes', function($classes) {
    if (is_sticky()) {
        $classes[] = 'post-featured';
    }
    return $classes;
});
```

---

## 👤 Box Autore Avanzato

### Utilizzo Base

```php
// In single.php o page.php
<?php get_template_part('template-parts/content/author-bio'); ?>
```

### Configurazioni

#### Controllo Visibilità
```php
// Nascondi author bio su pagine specifiche
add_filter('zenstarter_show_author_bio', function($show) {
    if (is_page('about')) {
        return false;
    }
    return $show;
});
```

#### Personalizzazione Avatar
```php
// Cambia dimensione avatar
add_filter('zenstarter_author_bio_avatar_size', function() {
    return 120; // 120px invece di 80px
});
```

---

## 🔗 Articoli Correlati Intelligenti

### Algoritmi di Correlazione

Il sistema utilizza 3 algoritmi in ordine di priorità:

1. **Stesse Categorie** (priorità alta)
2. **Stessi Tag** (priorità media)  
3. **Post Recenti** (fallback)

### Utilizzo Base

```php
// In single.php
<?php get_template_part('template-parts/content/related-posts'); ?>
```

### Configurazioni

#### Numero di Post
```php
// Mostra 6 articoli invece di 3
add_filter('zenstarter_related_posts_count', function() {
    return 6;
});
```

---

## ⚡ Sistema Hook Personalizzati

### Funzioni Helper Rapide

```php
// Nel functions.php del child theme

// Disabilita author bio globalmente
zenstarter_disable_author_bio();

// Disabilita related posts globalmente  
zenstarter_disable_related_posts();

// Abilita tempo di lettura
zenstarter_enable_reading_time();

// Abilita categoria chips
zenstarter_enable_category_chips();

// Abilita icone post format
zenstarter_enable_post_format_icons();
```

---

## ⚙️ Personalizzazione e Configurazione

### Stili CSS Personalizzati

```scss
// Nel child theme style.scss

// Loop posts
.loop-post {
    &.has-thumbnail {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 2rem;
    }
    
    &.is-featured {
        border-left: 4px solid var(--wp--preset--color--primary);
        padding-left: 1rem;
    }
}

// Author bio
.author-bio {
    background: var(--wp--preset--color--gray-50);
    border-radius: 12px;
    padding: 2rem;
    margin: 3rem 0;
}

// Related posts
.related-posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}
```

---

## 💻 Esempi di Codice

### Esempio: Single Post Completo

```php
<?php
// template: single.php

get_header(); ?>

<main id="main-content" class="site-main">
    
    <?php while (have_posts()) : the_post(); ?>
        
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            
            <!-- Header Post -->
            <header class="entry-header">
                <?php the_title('<h1 class="entry-title">', '</h1>'); ?>
                
                <div class="entry-meta">
                    <?php get_template_part('template-parts/content/entry', 'meta'); ?>
                </div>
                
                <?php if (has_post_thumbnail()) : ?>
                    <div class="entry-thumbnail">
                        <?php the_post_thumbnail('large'); ?>
                    </div>
                <?php endif; ?>
            </header>
            
            <!-- Contenuto Post -->
            <div class="entry-content">
                <?php the_content(); ?>
            </div>
            
        </article>
        
        <!-- Author Bio -->
        <?php get_template_part('template-parts/content/author-bio'); ?>
        
        <!-- Related Posts -->
        <?php get_template_part('template-parts/content/related-posts'); ?>
        
        <!-- Comments -->
        <?php
        if (comments_open() || get_comments_number()) :
            comments_template();
        endif;
        ?>
        
    <?php endwhile; ?>
    
</main>

<?php get_footer(); ?>
```

---

## 🌟 Best Practices

### Performance

1. **Usa il Caching**: I related posts sono già cached automaticamente
2. **Ottimizza le Query**: Usa `posts_per_page` appropriato
3. **Lazy Loading**: Immagini già ottimizzate

### SEO e Accessibilità

1. **Structured Data**: Schema.org già implementato
2. **Heading Structure**: Mantieni gerarchia corretta
3. **Alt Text e ARIA**: Già implementato nei template

### Manutenzione

1. **Child Theme**: Usa sempre un child theme per customizzazioni
2. **Hook vs Template Override**: Preferisci hook quando possibile
3. **Documentazione**: Commenta il codice complesso

---

## 🔧 Troubleshooting

### Problemi Comuni

#### Pattern non Visibili nel Site Editor
- Verifica `"patterns": true` in theme.json
- Controlla registrazione pattern in `inc/patterns.php`

#### Hook non Funzionano
- Verifica che `inc/blog-hooks.php` sia incluso
- Controlla priorità e parametri degli hook

#### Related Posts Vuoti
- Debug con `zenstarter_get_related_posts(get_the_ID(), 3)`
- Verifica che esistano post con categorie/tag condivisi

---

*Questa documentazione è stata generata per il tema Zenstarter v1.0.0 con funzionalità blog avanzate.*

