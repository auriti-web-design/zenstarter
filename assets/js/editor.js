/**
 * Gutenberg Editor JavaScript
 * Zenstarter Theme
 */

// Import editor styles
import '../scss/editor.scss'

// WordPress dependencies
const { registerBlockStyle, unregisterBlockStyle } = wp.blocks
const { domReady } = wp.domReady

domReady(() => {
  console.log('Zenstarter editor scripts loaded!')
  
  // Add custom block styles
  registerCustomBlockStyles()
  
  // Remove unwanted default block styles
  removeUnwantedBlockStyles()
})

/**
 * Register custom block styles
 */
function registerCustomBlockStyles() {
  // Custom button styles
  registerBlockStyle('core/button', {
    name: 'outline',
    label: 'Outline'
  })
  
  registerBlockStyle('core/button', {
    name: 'ghost',
    label: 'Ghost'
  })
  
  // Custom quote styles
  registerBlockStyle('core/quote', {
    name: 'modern',
    label: 'Modern'
  })
  
  // Custom cover styles
  registerBlockStyle('core/cover', {
    name: 'rounded',
    label: 'Rounded'
  })
  
  // Custom group styles
  registerBlockStyle('core/group', {
    name: 'card',
    label: 'Card'
  })
  
  registerBlockStyle('core/group', {
    name: 'section',
    label: 'Section'
  })
}

/**
 * Remove unwanted default block styles
 */
function removeUnwantedBlockStyles() {
  // Example: Remove outline style from buttons if not needed
  // unregisterBlockStyle('core/button', 'outline')
  
  // Remove large quote style if not using it
  // unregisterBlockStyle('core/quote', 'large')
}

/**
 * Add editor-specific functionality
 */

// Custom format for inline code
if (window.wp && window.wp.richText) {
  const { registerFormatType } = wp.richText
  const { RichTextToolbarButton } = wp.blockEditor
  const { createElement } = wp.element
  
  registerFormatType('zenstarter/inline-code', {
    title: 'Inline Code',
    tagName: 'code',
    className: 'inline-code',
    edit: ({ isActive, value, onChange }) => {
      return createElement(RichTextToolbarButton, {
        icon: 'editor-code',
        title: 'Inline Code',
        onClick: () => {
          onChange(wp.richText.toggleFormat(value, {
            type: 'zenstarter/inline-code'
          }))
        },
        isActive
      })
    }
  })
}