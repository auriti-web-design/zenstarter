# 🧩 Guida alla Creazione di Blocchi Personalizzati - Zenstarter

## 📋 Panoramica

Zenstarter include un sistema completo per la creazione di blocchi Gutenberg personalizzati con supporto per:
- **InnerBlocks** per contenuti annidabili
- **Personalizzazione completa** (colori, spaziature, bordi, ombre)
- **Integrazione Vite.js** per build ottimizzato
- **Compatibilità theme.json** per design tokens
- **Accessibilità** e responsive design

## 🎯 Blocco Zen-Box

### Caratteristiche Principali

Il blocco **Zen-Box** è un contenitore flessibile che supporta:

#### 🎨 Opzioni di Design
- **Colori**: Background, text, gradients
- **Spaziature**: Margin, padding, block gap
- **Bordi**: Radius, color, style, width
- **Ombre**: 5 livelli (none, small, medium, large, xl)
- **Tipografia**: Font size, line height, text align

#### 📐 Opzioni di Layout
- **Container Types**: Default, Narrow, Wide, Full Width
- **Vertical Alignment**: Top, Center, Bottom, Stretch
- **Min Height**: Supporta unità CSS (px, vh, rem, etc.)
- **Responsive**: Mobile-first approach

#### 🔧 Funzionalità Avanzate
- **InnerBlocks**: Supporto per contenuti annidabili
- **Block Context**: Fornisce context per blocchi figli
- **Custom Classes**: Classe CSS automatiche per styling
- **Editor Indicators**: Visual feedback nell'editor

## 📂 Struttura File Blocco

```
blocks/zen-box/
├── block.json          # Configurazione blocco
├── index.js           # Entry point
├── edit.js            # Componente editor
├── save.js            # Componente frontend
├── style.scss         # Stili frontend
└── editor.scss        # Stili editor
```

### 📄 block.json

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 2,
  "name": "zenstarter/zen-box",
  "title": "Zen Box",
  "category": "zenstarter",
  "supports": {
    "align": ["wide", "full"],
    "spacing": { "margin": true, "padding": true },
    "color": { "background": true, "text": true, "gradients": true },
    "__experimentalBorder": { "radius": true, "color": true }
  }
}
```

### ⚙️ Registrazione Blocco

Il blocco viene automaticamente registrato in `components/Core/Setup.php`:

```php
private function register_zen_box_block() {
    $block_path = ZENSTARTER_PATH . '/blocks/zen-box';
    
    register_block_type($block_path, array(
        'render_callback' => array($this, 'render_zen_box_block'),
    ));
}
```

## 🚀 Creazione Nuovo Blocco

### Step 1: Struttura Directory
```bash
# Crea directory per il nuovo blocco
mkdir blocks/zen-hero
cd blocks/zen-hero
```

### Step 2: Configurazione block.json
```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 2,
  "name": "zenstarter/zen-hero",
  "title": "Zen Hero",
  "category": "zenstarter",
  "icon": "cover-image",
  "description": "Hero section with background and call-to-action.",
  "supports": {
    "align": ["wide", "full"],
    "spacing": true,
    "color": true
  },
  "attributes": {
    "backgroundImage": {
      "type": "object"
    },
    "overlayOpacity": {
      "type": "number",
      "default": 0.5
    }
  }
}
```

### Step 3: JavaScript Files

**index.js**
```javascript
import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType(metadata.name, {
    edit: Edit,
    save,
});
```

**edit.js**
```javascript
import { __ } from '@wordpress/i18n';
import { InspectorControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { overlayOpacity } = attributes;
    
    const blockProps = useBlockProps({
        className: 'zen-hero',
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Hero Settings', 'zenstarter')}>
                    <RangeControl
                        label={__('Overlay Opacity', 'zenstarter')}
                        value={overlayOpacity}
                        onChange={(value) => setAttributes({ overlayOpacity: value })}
                        min={0}
                        max={1}
                        step={0.1}
                    />
                </PanelBody>
            </InspectorControls>
            
            <div {...blockProps}>
                <InnerBlocks
                    template={[
                        ['core/heading', { 
                            level: 1, 
                            placeholder: __('Hero Title...', 'zenstarter') 
                        }],
                        ['core/paragraph', { 
                            placeholder: __('Hero description...', 'zenstarter') 
                        }],
                        ['core/buttons']
                    ]}
                />
            </div>
        </>
    );
}
```

### Step 4: Stili SCSS

**style.scss**
```scss
.zen-hero {
    position: relative;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 4rem 2rem;
    
    &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, var(--overlay-opacity, 0.5));
        z-index: 1;
    }
    
    &__content {
        position: relative;
        z-index: 2;
        color: white;
        max-width: 800px;
        margin: 0 auto;
    }
}
```

### Step 5: Registrazione in Setup.php

```php
// Aggiungi in register_custom_blocks()
$this->register_zen_hero_block();

// Aggiungi metodo privato
private function register_zen_hero_block() {
    $block_path = ZENSTARTER_PATH . '/blocks/zen-hero';
    
    if (file_exists($block_path . '/block.json')) {
        register_block_type($block_path);
    }
}
```

### Step 6: Build Configuration

Aggiungi in `vite.config.js`:
```javascript
input: {
  // ... existing entries
  'zen-hero': path.resolve(__dirname, 'blocks/zen-hero/index.js'),
  'zen-hero-style': path.resolve(__dirname, 'blocks/zen-hero/style.scss'),
  'zen-hero-editor': path.resolve(__dirname, 'blocks/zen-hero/editor.scss')
}
```

## 🎨 Best Practices

### 1. **Naming Convention**
- Blocchi: `zen-[nome]` (es. zen-box, zen-hero, zen-cta)
- CSS Classes: `.zen-[nome]` con BEM methodology
- JavaScript: PascalCase per componenti React

### 2. **Accessibilità**
```javascript
// Sempre includere ARIA labels
<button
    aria-label={__('Toggle settings', 'zenstarter')}
    aria-expanded={isOpen}
>
```

### 3. **Responsive Design**
```scss
.zen-hero {
    @media (max-width: 768px) {
        min-height: 300px;
        padding: 2rem 1rem;
    }
}
```

### 4. **Performance**
- Usa `useCallback` per funzioni in edit.js
- Implementa `useMemo` per calcoli complessi
- Lazy load assets quando possibile

### 5. **i18n (Internazionalizzazione)**
```javascript
// Sempre usare __ per testi
const placeholder = __('Enter your text...', 'zenstarter');
```

## 🔧 Utility e Helper

### Block Wrapper
```javascript
import { useBlockProps } from '@wordpress/block-editor';

const blockProps = useBlockProps({
    className: `zen-box zen-box--${containerType}`,
    style: { minHeight }
});
```

### Custom Hooks per Blocchi
```javascript
// hooks/useBlockSettings.js
export function useBlockSettings(attributes, setAttributes) {
    const updateAttribute = useCallback((key, value) => {
        setAttributes({ [key]: value });
    }, [setAttributes]);
    
    return { updateAttribute };
}
```

## 🧪 Testing Blocchi

### 1. **Editor Testing**
- Inserimento blocco
- Modifica attributi
- InnerBlocks functionality
- Undo/Redo

### 2. **Frontend Testing**
- Rendering corretto
- Stili applicati
- Responsive behavior
- Accessibility

### 3. **Performance Testing**
```bash
# Lighthouse CI per testing performance
npm run build
npm run lighthouse
```

## 📚 **Libreria Blocchi Zenstarter**

### 🏗 **Architettura Modulare**

La libreria blocchi Zenstarter utilizza un approccio modulare con:
- **Utility condivise** (`blocks/lib/utils.js`)
- **Sistema di inizializzazione** (`blocks/init-blocks.js`) 
- **Asset management** automatico
- **Registrazione PHP** centralizzata

### 📋 **Blocchi Disponibili**

#### 1. **✅ Zen Box** - Container Flessibile
**File**: `blocks/zen-box/`
- InnerBlocks support completo
- Container types: Default, Narrow, Wide, Full
- Vertical alignment: Top, Center, Bottom, Stretch
- Shadow levels (5 opzioni)
- Personalizzazione completa colori/bordi

#### 2. **✅ Zen Hero** - Sezione Hero Avanzata
**File**: `blocks/zen-hero/`
- Background image con focal point picker
- Overlay con colori/gradienti e opacità
- Layout: alignment orizzontale/verticale
- Animazioni: fadeIn, slideUp, slideDown, zoomIn
- Parallax effect con controllo velocità
- InnerBlocks template: titolo + descrizione + bottoni
- Server-side rendering (PHP)
- JavaScript frontend per animazioni

#### 3. **✅ Zen CTA** - Call-to-Action Avanzato
**File**: `blocks/zen-cta/`
- Contenuto personalizzabile con InnerBlocks
- Stili pulsante: Primary, Secondary, Outline, Ghost
- Dimensioni: Small, Medium, Large
- Layout: Vertical, Horizontal, Centered
- Icone personalizzabili (prima/dopo)
- Animazioni: fadeIn, slideUp, slideLeft, slideRight, bounce
- Link control per URL esterni/interni
- Supporto per target="_blank"

#### 4. **✅ Zen Testimonial** - Testimonianze Professionali
**File**: `blocks/zen-testimonial/`
- Avatar caricabile con sizing (Small, Medium, Large)
- Sistema rating a stelle (1-5)
- Layout: Vertical, Horizontal, Centered, Card
- Quote icon posizionabile (Before, After, Background)
- Meta information (nome, ruolo, azienda)
- Animazioni: fadeIn, slideUp, slideLeft, slideRight, zoomIn
- Alignment content: Left, Center, Right
- Aspect ratio image personalizzabile

#### 5. **✅ Zen Grid** - Layout Grid Responsivo
**File**: `blocks/zen-grid/`
- Grid CSS nativo con colonne responsive
- Configurazione: Desktop (1-6), Tablet (1-4), Mobile (1-2)
- Gap customizzabile: None, Small, Medium, Large, Custom
- Auto-fit con larghezza minima colonne
- Equal height per colonne uniform
- Vertical alignment: Top, Center, Bottom, Stretch
- Horizontal alignment: Left, Center, Right, Justify
- Reverse on mobile per ordine elementi
- Animazioni staggered per grid items

#### 6. **✅ Zen Card** - Componente Card Modulare
**File**: `blocks/zen-card/`
- Image support con posizioni: Top, Left, Right, Background, None
- Aspect ratio: Auto, Square, Landscape, Portrait, Wide
- Layout: Vertical, Horizontal, Overlay, Minimal
- Meta information posizionabile (Top/Bottom)
- Button integrato con stili multipli
- Shadow levels personalizzabili
- Hover effects: None, Lift, Scale, Glow, Rotate, Slide
- Clickable card con URL personalizzabile
- Excerpt automatico con controllo lunghezza
- Content alignment completo

**Caratteristiche Avanzate**:
```javascript
// Animazioni con Intersection Observer
// Parallax ottimizzato con requestAnimationFrame
// Background loading con stati loading/error
// Accessibility automatica (ARIA, focus management)
// Performance monitoring in development
```

### 🚀 **Sistema di Registrazione**

#### **Automatic Block Registry**
```javascript
// blocks/init-blocks.js
const ZENSTARTER_BLOCKS = [
    {
        name: 'zen-box',
        title: 'Zen Box',
        enabled: true,
        hasCompiledAssets: true
    },
    {
        name: 'zen-hero', 
        title: 'Zen Hero',
        enabled: true,
        hasCompiledAssets: false
    },
    {
        name: 'zen-cta',
        title: 'Zen CTA',
        enabled: true,
        hasCompiledAssets: false
    },
    {
        name: 'zen-testimonial',
        title: 'Zen Testimonial',
        enabled: true,
        hasCompiledAssets: false
    },
    {
        name: 'zen-grid',
        title: 'Zen Grid',
        enabled: true,
        hasCompiledAssets: false
    },
    {
        name: 'zen-card',
        title: 'Zen Card',
        enabled: true,
        hasCompiledAssets: false
    }
];
```

#### **PHP Registration (Setup.php)**
```php
// Registrazione automatica in components/Core/Setup.php
private function register_custom_blocks() {
    $this->register_zen_box_block();
    $this->register_zen_hero_block();
    $this->register_zen_cta_block();
    $this->register_zen_testimonial_block();
    $this->register_zen_grid_block();
    $this->register_zen_card_block();
}
```

#### **Asset Management**
- **Compiled Assets**: `/assets/blocks/{block-name}/`
- **Source Files**: `/blocks/{block-name}/`
- **Auto-enqueue**: Solo quando il blocco è utilizzato
- **Performance**: Caricamento condizionale

### 🔧 **Utility Condivise**

#### **generateBlockClasses()**
```javascript
import { generateBlockClasses } from '../lib/utils.js';

const classes = generateBlockClasses('hero', attributes, [
    'zen-hero--has-background',
    'zen-hero--animated'
]);
```

#### **generateInlineStyles()**
```javascript
import { generateInlineStyles } from '../lib/utils.js';

const styles = generateInlineStyles(attributes);
// Auto-gestisce: spacing, border, typography
```

#### **commonSupports**
```javascript
import { commonSupports, containerSupports } from '../lib/utils.js';

// Per blocchi container
supports: containerSupports

// Per blocchi semplici  
supports: commonSupports
```

### 🔄 **Creare un Nuovo Blocco**

#### **Step 1: Struttura Directory**
```bash
mkdir blocks/zen-cta
mkdir assets/blocks/zen-cta
```

#### **Step 2: File Richiesti**
```
blocks/zen-cta/
├── block.json          # Configurazione blocco
├── edit.js            # Componente editor (JSX)
├── save.js            # Componente save (JSX)
├── index.js           # Entry point (JSX)
├── render.php         # Server-side render (opzionale)
├── style.scss         # Stili frontend
└── editor.scss        # Stili editor
```

#### **Step 3: Template block.json**
```json
{
  "apiVersion": 2,
  "name": "zenstarter/zen-cta",
  "title": "Zen CTA",
  "category": "zenstarter",
  "icon": "megaphone",
  "description": "Call-to-action block description",
  "supports": {
    "align": ["wide", "full"],
    "spacing": true,
    "color": true,
    "typography": true
  },
  "attributes": {
    "customAttribute": {
      "type": "string",
      "default": "value"
    }
  }
}
```

#### **Step 4: Template edit.js**
```javascript
import { __ } from '@wordpress/i18n';
import { InspectorControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { generateBlockClasses, commonSupports } from '../lib/utils.js';

export default function Edit({ attributes, setAttributes }) {
    const { customAttribute } = attributes;
    
    const blockProps = useBlockProps({
        className: generateBlockClasses('cta', attributes)
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('CTA Settings', 'zenstarter')}>
                    <TextControl
                        label={__('Custom Setting', 'zenstarter')}
                        value={customAttribute}
                        onChange={(value) => setAttributes({ customAttribute: value })}
                    />
                </PanelBody>
            </InspectorControls>
            
            <div {...blockProps}>
                <InnerBlocks />
            </div>
        </>
    );
}
```

#### **Step 5: Registrazione**

**1. Aggiungi in `blocks/init-blocks.js`:**
```javascript
{
    name: 'zen-cta',
    title: 'Zen CTA',
    enabled: true,
    hasCompiledAssets: true
}
```

**2. Compila gli asset:**
```bash
# Compila SCSS
npx sass blocks/zen-cta/style.scss assets/blocks/zen-cta/style.css
npx sass blocks/zen-cta/editor.scss assets/blocks/zen-cta/editor.css

# Crea versione JavaScript compilata
# (Usa il template di zen-hero come riferimento)
```

**3. Aggiungi in `Setup.php`:**
```php
private function register_custom_blocks() {
    $this->register_zen_box_block();
    $this->register_zen_hero_block();
    $this->register_zen_cta_block(); // <-- Nuovo
}

private function register_zen_cta_block() {
    register_block_type('zenstarter/zen-cta', array(
        'editor_script' => 'zenstarter-zen-cta-editor',
        'editor_style' => 'zenstarter-zen-cta-editor-style',
        'style' => 'zenstarter-zen-cta-style',
    ));
    
    add_action('enqueue_block_editor_assets', array($this, 'enqueue_zen_cta_editor_assets'));
    add_action('wp_enqueue_scripts', array($this, 'enqueue_zen_cta_frontend_assets'));
}
```

### 📦 **Roadmap Blocchi Futuri**

**✅ Completati (Fase 6)**:
- ✅ **Zen CTA** - Call-to-action avanzato
- ✅ **Zen Testimonial** - Testimonianze con rating  
- ✅ **Zen Grid** - Layout grid responsivo
- ✅ **Zen Card** - Componente card modulare

**🚧 Prossime Fasi**:
7. **📊 Zen Stats** - Contatori animati
8. **🎨 Zen Gallery** - Galleria con lightbox
9. **📝 Zen Content** - Content split con media
10. **📞 Zen Contact** - Form di contatto
11. **🎠 Zen Carousel** - Slider/carousel componente
12. **📱 Zen Accordion** - Accordion/collapsible content

### 🎨 **Combinazioni di Blocchi Raccomandate**

#### **Landing Page Completa**
```
🏗️ Zen Hero (background + titolo + CTA)
   └── InnerBlocks: Heading + Paragraph + Zen CTA

📊 Zen Grid (3 colonne)
   ├── Zen Card (Servizio 1)
   ├── Zen Card (Servizio 2)  
   └── Zen Card (Servizio 3)

💬 Zen Grid (2 colonne)
   ├── Zen Testimonial (Cliente 1)
   └── Zen Testimonial (Cliente 2)

🎯 Zen CTA (finale conversion)
```

#### **Sezione Testimonials**
```
📱 Zen Grid (auto-fit, min-width: 300px)
   ├── Zen Card (layout: overlay + testimonianza)
   ├── Zen Card (layout: vertical + avatar)
   └── Zen Card (layout: horizontal + rating)
```

#### **Gallery Team/Staff**
```
🏗️ Zen Grid (4 colonne desktop, 2 tablet, 1 mobile)
   ├── Zen Card (team member 1 - image + nome + ruolo)
   ├── Zen Card (team member 2 - clickable per bio)
   ├── Zen Card (team member 3 - minimal layout)
   └── Zen Card (team member 4 - social links)
```

### 🎯 **Best Practices per Nuovi Blocchi**

1. **Usa le utility condivise** da `lib/utils.js`
2. **Segui le convenzioni naming**: `zen-{nome}`
3. **Implementa accessibility** (ARIA, focus management)
4. **Testa su mobile** e desktop
5. **Documenta gli attributi** e le funzionalità
6. **Usa theme.json** per design tokens
7. **Ottimizza performance** (lazy loading, conditional assets)

## 🚨 Troubleshooting

### Blocco Non Apparisce in Editor
1. Verifica `block.json` sia valido
2. Controlla registrazione in `Setup.php`
3. Verifica build sia completato
4. Check browser console per errori

### Stili Non Caricati
1. Verifica Vite config include il blocco
2. Check manifest.json generato
3. Verifica asset enqueue in Assets.php

### JavaScript Errors
1. Check dependencies in `block.json`
2. Verifica import statements
3. Use browser dev tools per debug

---

## 📖 Risorse Aggiuntive

- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Gutenberg Components](https://wordpress.github.io/gutenberg/)
- [Block Supports Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/)

🎯 **Obiettivo**: Creare blocchi riutilizzabili, accessibili e performanti per una esperienza di authoring superiore!