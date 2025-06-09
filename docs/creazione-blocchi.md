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

## 📦 Blocchi Pianificati

### Roadmap Blocchi Zenstarter

1. **✅ Zen Box** - Container flessibile (Completato)
2. **🔄 Zen Hero** - Sezione hero con background
3. **📅 Zen CTA** - Call-to-action con bottoni
4. **💬 Zen Testimonial** - Testimonianze con avatar
5. **📊 Zen Stats** - Statistiche e numeri
6. **🎨 Zen Gallery** - Galleria immagini avanzata
7. **📝 Zen Content** - Content block con media
8. **📞 Zen Contact** - Form di contatto

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