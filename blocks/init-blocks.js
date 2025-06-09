/**
 * Zenstarter Blocks Initialization
 * 
 * Automatic registration system for all Zenstarter custom blocks
 * Provides centralized block management and consistent registration
 *
 * @package Zenstarter
 * @subpackage Blocks
 * @version 1.0.0
 */

/**
 * Block Registry
 * 
 * Add new blocks to this registry for automatic registration
 * Each block should have its own directory with the required files
 */
const ZENSTARTER_BLOCKS = [
    {
        name: 'zen-box',
        title: 'Zen Box',
        description: 'Flexible container block with customization options',
        enabled: true,
        hasCompiledAssets: true, // Uses pre-compiled JS/CSS
        version: '1.0.0'
    },
    {
        name: 'zen-hero',
        title: 'Zen Hero',
        description: 'Hero section with background, title, and call-to-action',
        enabled: true,
        hasCompiledAssets: false, // Uses source files (will be compiled)
        version: '1.0.0'
    },
    // Future blocks can be added here
    // {
    //     name: 'zen-cta',
    //     title: 'Zen CTA',
    //     description: 'Call-to-action block with customizable styling',
    //     enabled: false, // Not yet implemented
    //     hasCompiledAssets: false,
    //     version: '1.0.0'
    // },
    // {
    //     name: 'zen-testimonial',
    //     title: 'Zen Testimonial',
    //     description: 'Testimonial block with avatar and rating',
    //     enabled: false, // Not yet implemented
    //     hasCompiledAssets: false,
    //     version: '1.0.0'
    // },
    // {
    //     name: 'zen-grid',
    //     title: 'Zen Grid',
    //     description: 'Responsive grid layout block',
    //     enabled: false, // Not yet implemented
    //     hasCompiledAssets: false,
    //     version: '1.0.0'
    // }
];

/**
 * Block Registration Helper
 * 
 * Registers a single block with proper asset handling
 * 
 * @param {Object} blockConfig Block configuration
 */
function registerZenstarterBlock(blockConfig) {
    const { name, enabled, hasCompiledAssets } = blockConfig;
    
    // Skip disabled blocks
    if (!enabled) {
        return;
    }
    
    try {
        if (hasCompiledAssets) {
            // Load pre-compiled block (like zen-box)
            registerCompiledBlock(name);
        } else {
            // Load source block files (like zen-hero)
            registerSourceBlock(name);
        }
        
        console.log(`✅ Zenstarter Block registered: ${name}`);
    } catch (error) {
        console.error(`❌ Failed to register Zenstarter block: ${name}`, error);
    }
}

/**
 * Register block with compiled assets
 * 
 * @param {string} blockName Block name (e.g., 'zen-box')
 */
function registerCompiledBlock(blockName) {
    // For compiled blocks, we rely on PHP registration
    // This function is mainly for logging and client-side awareness
    
    // You can add client-side initialization here if needed
    if (blockName === 'zen-box') {
        // zen-box specific client-side setup
        initializeZenBoxFeatures();
    }
}

/**
 * Register block with source files
 * 
 * @param {string} blockName Block name (e.g., 'zen-hero')
 */
function registerSourceBlock(blockName) {
    // For source blocks, import and register dynamically
    // This will be handled by the build system
    
    switch (blockName) {
        case 'zen-hero':
            import(`./zen-hero/index.js`);
            break;
        case 'zen-cta':
            import(`./zen-cta/index.js`);
            break;
        case 'zen-testimonial':
            import(`./zen-testimonial/index.js`);
            break;
        case 'zen-grid':
            import(`./zen-grid/index.js`);
            break;
        default:
            throw new Error(`Unknown block: ${blockName}`);
    }
}

/**
 * Initialize zen-box specific features
 */
function initializeZenBoxFeatures() {
    // Add any zen-box specific JavaScript functionality here
    document.addEventListener('DOMContentLoaded', function() {
        const zenBoxes = document.querySelectorAll('.zen-box');
        
        zenBoxes.forEach(box => {
            // Add hover effects or other interactions
            box.addEventListener('mouseenter', function() {
                this.classList.add('zen-box--hover');
            });
            
            box.addEventListener('mouseleave', function() {
                this.classList.remove('zen-box--hover');
            });
        });
    });
}

/**
 * Initialize Hero Block Features
 */
function initializeZenHeroFeatures() {
    document.addEventListener('DOMContentLoaded', function() {
        const heroes = document.querySelectorAll('.zen-hero');
        
        heroes.forEach(hero => {
            // Initialize animations
            if (hero.classList.contains('zen-hero--animated')) {
                initializeHeroAnimation(hero);
            }
            
            // Initialize parallax
            if (hero.classList.contains('zen-hero--parallax')) {
                initializeHeroParallax(hero);
            }
            
            // Initialize background image loading
            if (hero.classList.contains('zen-hero--has-background-image')) {
                initializeHeroBackground(hero);
            }
        });
    });
}

/**
 * Initialize hero animation
 */
function initializeHeroAnimation(hero) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('zen-hero--in-view');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    });
    
    observer.observe(hero);
}

/**
 * Initialize hero parallax effect
 */
function initializeHeroParallax(hero) {
    const speed = parseFloat(hero.dataset.parallaxSpeed) || 0.5;
    
    function updateParallax() {
        const rect = hero.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;
        
        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    }
    
    // Use requestAnimationFrame for smooth parallax
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
            setTimeout(() => { ticking = false; }, 16); // ~60fps
        }
    }
    
    window.addEventListener('scroll', requestTick);
    window.addEventListener('resize', updateParallax);
}

/**
 * Initialize hero background image loading
 */
function initializeHeroBackground(hero) {
    const backgroundImage = getComputedStyle(hero).backgroundImage;
    
    if (backgroundImage && backgroundImage !== 'none') {
        hero.classList.add('zen-hero--loading');
        
        const img = new Image();
        img.onload = function() {
            hero.classList.remove('zen-hero--loading');
        };
        
        img.onerror = function() {
            hero.classList.remove('zen-hero--loading');
            hero.classList.add('zen-hero--error');
        };
        
        // Extract URL from background-image CSS
        const imageUrl = backgroundImage.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
        img.src = imageUrl;
    }
}

/**
 * Block Category Registration
 * 
 * Registers the Zenstarter block category if it doesn't exist
 */
function registerZenstarterCategory() {
    const { __ } = wp.i18n;
    
    // Check if wp.blocks is available
    if (typeof wp !== 'undefined' && wp.blocks && wp.blocks.getCategories) {
        const existingCategories = wp.blocks.getCategories();
        const hasZenstarterCategory = existingCategories.some(cat => cat.slug === 'zenstarter');
        
        if (!hasZenstarterCategory) {
            wp.blocks.setCategories([
                {
                    slug: 'zenstarter',
                    title: __('Zenstarter Blocks', 'zenstarter'),
                    icon: 'admin-generic'
                },
                ...existingCategories
            ]);
        }
    }
}

/**
 * Initialize all Zenstarter blocks
 */
function initializeZenstarterBlocks() {
    console.log('🚀 Initializing Zenstarter Blocks...');
    
    // Register block category
    registerZenstarterCategory();
    
    // Register all enabled blocks
    ZENSTARTER_BLOCKS.forEach(registerZenstarterBlock);
    
    // Initialize frontend features
    initializeZenHeroFeatures();
    
    console.log(`✅ Zenstarter Blocks initialized: ${ZENSTARTER_BLOCKS.filter(b => b.enabled).length} blocks`);
}

/**
 * Utility Functions
 */
const ZenstarterBlocks = {
    /**
     * Get all registered blocks
     */
    getBlocks: () => ZENSTARTER_BLOCKS,
    
    /**
     * Get enabled blocks only
     */
    getEnabledBlocks: () => ZENSTARTER_BLOCKS.filter(block => block.enabled),
    
    /**
     * Check if a block is enabled
     */
    isBlockEnabled: (blockName) => {
        const block = ZENSTARTER_BLOCKS.find(b => b.name === blockName);
        return block ? block.enabled : false;
    },
    
    /**
     * Get block configuration
     */
    getBlockConfig: (blockName) => {
        return ZENSTARTER_BLOCKS.find(b => b.name === blockName);
    },
    
    /**
     * Enable a block
     */
    enableBlock: (blockName) => {
        const block = ZENSTARTER_BLOCKS.find(b => b.name === blockName);
        if (block) {
            block.enabled = true;
            registerZenstarterBlock(block);
        }
    },
    
    /**
     * Disable a block
     */
    disableBlock: (blockName) => {
        const block = ZENSTARTER_BLOCKS.find(b => b.name === blockName);
        if (block) {
            block.enabled = false;
        }
    }
};

// Make utility available globally for debugging
if (typeof window !== 'undefined') {
    window.ZenstarterBlocks = ZenstarterBlocks;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeZenstarterBlocks);
} else {
    initializeZenstarterBlocks();
}

// Export for module systems
export default ZenstarterBlocks;
export { initializeZenstarterBlocks, ZENSTARTER_BLOCKS };