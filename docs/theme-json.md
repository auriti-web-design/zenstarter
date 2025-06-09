# Theme.json

## Panoramica
Il file `theme.json` controlla le impostazioni globali del tema e definisce gli stili utilizzati sia nel front-end che all'interno del Site Editor. Grazie a questo file è possibile personalizzare colori, tipografia e layout in modo centralizzato.

## Sezioni principali
- **version**: indica la versione dello schema utilizzato.
- **settings**: raccoglie le opzioni che abilitano gli strumenti dell'editor (colori, font, spaziature, layout).
- **styles**: definisce gli stili di base per elementi e blocchi.

## Modifica palette e tipografia
La palette colori si trova in `settings.color.palette` e può essere ampliata aggiungendo nuovi oggetti con `slug`, `color` e `name`. Le dimensioni dei font sono in `settings.typography.fontSizes`; è sufficiente cambiare i valori `size` oppure aggiungerne di nuovi per adattare la scala tipografica.

## Estendere il file
`theme.json` può essere esteso con nuove impostazioni o stili blocco inserendo ulteriori chiavi all'interno delle sezioni `settings` o `styles`. È possibile anche aggiungere preset personalizzati tramite la chiave `custom` per creare variabili proprie da utilizzare nei fogli di stile.
