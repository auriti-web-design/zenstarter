# 📝 Blog Avanzato

## 📖 Panoramica
Il tema include componenti dedicati per gestire un blog completo e personalizzabile. Di seguito trovi i file principali e come modificarli.

---

## 🔄 Personalizzare il loop
- Il markup del singolo post nel loop si trova in `template-parts/loop/post.php`.
- Viene richiamato da `archive.php`, `home.php` e `search.php` con `get_template_part('template-parts/loop/post')`.
- Modifica questo file per cambiare struttura o classi dei post elencati.

## 👤 Box autore
- Il box autore è definito in `template-parts/content/author-bio.php`.
- Mostra avatar, biografia e link a tutti gli articoli dell'autore.
- Puoi includerlo in altri template tramite `get_template_part('template-parts/content/author', 'bio')`.

## 🔗 Articoli correlati
- `template-parts/content/related-posts.php` recupera fino a tre post della stessa categoria con `WP_Query`.
- Viene caricato alla fine dei singoli articoli in `single.php`.
- Personalizza la query o il markup modificando questo file.

## 🎨 Pattern modificabili
- I pattern in `/patterns/` sono ora file `.json` con proprietà `inserter` e `blockTypes`.
- Sono registrati in `inc/block-patterns.php` e possono essere inseriti e modificati dal Site Editor.

