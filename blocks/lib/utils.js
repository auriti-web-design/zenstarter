/**
 * Zenstarter Blocks Shared Utilities
 * 
 * Provides common functions and default configurations
 * for all Zenstarter custom blocks
 *
 * @package Zenstarter
 * @subpackage Blocks
 * @version 1.0.0
 */

/**
 * Common block supports configuration
 * Ensures consistency across all Zenstarter blocks
 */
export const commonSupports = {
    align: ['wide', 'full'],
    anchor: true,
    className: true,
    customClassName: true,
    html: false,
    spacing: {
        margin: true,
        padding: true,
        blockGap: true
    },
    color: {
        background: true,
        text: true,
        gradients: true,
        link: true
    },
    typography: {
        fontSize: true,
        lineHeight: true,
        textAlign: true,
        fontWeight: true,
        fontFamily: true
    },
    __experimentalBorder: {
        color: true,
        radius: true,
        style: true,
        width: true
    },
    __experimentalLayout: {
        allowSwitching: false,
        allowInheriting: false,
        default: {
            type: 'default'
        }
    }
};

/**
 * Extended supports for container blocks
 * Adds additional layout controls for blocks that contain other blocks
 */
export const containerSupports = {
    ...commonSupports,
    __experimentalLayout: {
        allowSwitching: true,
        allowInheriting: true,
        allowEditing: true,
        default: {
            type: 'default'
        }
    }
};

/**
 * Common block attributes for consistent behavior
 */
export const commonAttributes = {
    backgroundColor: {
        type: 'string'
    },
    textColor: {
        type: 'string'
    },
    gradient: {
        type: 'string'
    },
    style: {
        type: 'object'
    },
    className: {
        type: 'string'
    }
};

/**
 * Generate block wrapper classes
 * Provides consistent CSS class generation across blocks
 * 
 * @param {string} blockName - The block name (e.g., 'zen-hero')
 * @param {Object} attributes - Block attributes
 * @param {Array} additionalClasses - Additional CSS classes
 * @returns {string} Complete CSS class string
 */
export function generateBlockClasses(blockName, attributes = {}, additionalClasses = []) {
    const classes = [`zen-${blockName}`];
    
    // Add custom className if provided
    if (attributes.className) {
        classes.push(attributes.className);
    }
    
    // Add alignment classes
    if (attributes.align) {
        classes.push(`align${attributes.align}`);
    }
    
    // Add additional classes
    if (additionalClasses.length > 0) {
        classes.push(...additionalClasses);
    }
    
    return classes.join(' ');
}

/**
 * Generate inline styles from block attributes
 * Handles common styling attributes consistently
 * 
 * @param {Object} attributes - Block attributes
 * @returns {Object} Inline styles object
 */
export function generateInlineStyles(attributes = {}) {
    const styles = {};
    
    // Handle spacing
    if (attributes.style?.spacing) {
        const { margin, padding } = attributes.style.spacing;
        
        if (margin) {
            Object.keys(margin).forEach(side => {
                if (margin[side]) {
                    styles[`margin${side.charAt(0).toUpperCase() + side.slice(1)}`] = margin[side];
                }
            });
        }
        
        if (padding) {
            Object.keys(padding).forEach(side => {
                if (padding[side]) {
                    styles[`padding${side.charAt(0).toUpperCase() + side.slice(1)}`] = padding[side];
                }
            });
        }
    }
    
    // Handle border
    if (attributes.style?.border) {
        const { radius, width, color, style: borderStyle } = attributes.style.border;
        
        if (radius) {
            styles.borderRadius = radius;
        }
        if (width) {
            styles.borderWidth = width;
        }
        if (color) {
            styles.borderColor = color;
        }
        if (borderStyle) {
            styles.borderStyle = borderStyle;
        }
    }
    
    // Handle typography
    if (attributes.style?.typography) {
        const { fontSize, lineHeight, fontWeight, fontFamily } = attributes.style.typography;
        
        if (fontSize) {
            styles.fontSize = fontSize;
        }
        if (lineHeight) {
            styles.lineHeight = lineHeight;
        }
        if (fontWeight) {
            styles.fontWeight = fontWeight;
        }
        if (fontFamily) {
            styles.fontFamily = fontFamily;
        }
    }
    
    return styles;
}

/**
 * Common InnerBlocks configuration
 * Provides consistent InnerBlocks setup across container blocks
 */
export const defaultInnerBlocksConfig = {
    templateLock: false,
    allowedBlocks: true, // Allow all blocks
    __experimentalCaptureToolbars: true
};

/**
 * Hero block specific InnerBlocks template
 * Default template for hero-style blocks
 */
export const heroTemplate = [
    ['core/heading', {
        level: 1,
        placeholder: 'Hero Title...',
        className: 'zen-hero__title'
    }],
    ['core/paragraph', {
        placeholder: 'Hero description goes here...',
        className: 'zen-hero__description'
    }],
    ['core/buttons', {
        className: 'zen-hero__actions'
    }]
];

/**
 * CTA block specific InnerBlocks template
 */
export const ctaTemplate = [
    ['core/heading', {
        level: 2,
        placeholder: 'Call to Action Title...',
        className: 'zen-cta__title'
    }],
    ['core/paragraph', {
        placeholder: 'Compelling description...',
        className: 'zen-cta__description'
    }],
    ['core/buttons', {
        className: 'zen-cta__actions'
    }]
];

/**
 * Common block dependencies
 * WordPress script dependencies for blocks
 */
export const blockDependencies = [
    'wp-blocks',
    'wp-element', 
    'wp-editor',
    'wp-block-editor',
    'wp-components',
    'wp-i18n',
    'wp-compose',
    'wp-data'
];

/**
 * Block registration helper
 * Simplifies block registration with common configurations
 * 
 * @param {string} name - Block name (e.g., 'zenstarter/zen-hero')
 * @param {Object} settings - Block settings
 * @returns {Object} Complete block configuration
 */
export function createBlockConfig(name, settings = {}) {
    return {
        apiVersion: 2,
        name,
        category: 'zenstarter',
        textdomain: 'zenstarter',
        supports: settings.isContainer ? containerSupports : commonSupports,
        attributes: {
            ...commonAttributes,
            ...settings.attributes
        },
        ...settings
    };
}

/**
 * Validation helpers
 */
export const validators = {
    /**
     * Validate URL format
     */
    isValidURL: (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },
    
    /**
     * Validate hex color format
     */
    isValidHexColor: (color) => {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
    },
    
    /**
     * Validate CSS unit value
     */
    isValidCSSUnit: (value) => {
        return /^(\d+(\.\d+)?)(px|em|rem|vh|vw|%|pt|pc|in|cm|mm|ex|ch|vmin|vmax)$/.test(value);
    }
};

/**
 * Device breakpoints for responsive controls
 */
export const breakpoints = {
    mobile: '(max-width: 767px)',
    tablet: '(min-width: 768px) and (max-width: 1023px)',
    desktop: '(min-width: 1024px)'
};

/**
 * Animation utilities
 */
export const animations = {
    fadeIn: 'zen-fade-in',
    slideUp: 'zen-slide-up',
    slideDown: 'zen-slide-down',
    zoomIn: 'zen-zoom-in'
};

/**
 * Common error messages
 */
export const errorMessages = {
    INVALID_URL: 'Please enter a valid URL',
    INVALID_COLOR: 'Please enter a valid hex color',
    INVALID_CSS_UNIT: 'Please enter a valid CSS unit (px, em, rem, etc.)',
    REQUIRED_FIELD: 'This field is required'
};