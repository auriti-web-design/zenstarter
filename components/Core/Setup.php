<?php
/**
 * Theme Setup Class
 *
 * Handles the main theme initialization and configuration.
 *
 * @package Zenstarter
 * @subpackage Core
 * @version 1.0.0
 */

namespace Theme\Core;

/**
 * Setup class for theme initialization
 */
class Setup {
    
    /**
     * Constructor - Initialize the theme
     */
    public function __construct() {
        $this->init_hooks();
        $this->load_components();
    }
    
    /**
     * Initialize WordPress hooks
     */
    private function init_hooks() {
        add_action('after_setup_theme', array($this, 'theme_setup'));
        add_action('init', array($this, 'register_block_patterns'));
        add_action('init', array($this, 'register_custom_blocks'));
        add_action('init', array($this, 'register_block_categories'));
        add_action('widgets_init', array($this, 'register_sidebars'));
        add_filter('body_class', array($this, 'body_classes'));
        add_action('wp_head', array($this, 'add_pingback_url'));
        
        // Accessibility and SEO improvements
        add_action('wp_head', array($this, 'add_accessibility_features'));
        add_action('wp_footer', array($this, 'add_accessibility_scripts'));
        add_filter('wp_nav_menu_args', array($this, 'enhance_nav_menu_accessibility'));
        add_filter('the_content', array($this, 'enhance_content_accessibility'));
        add_action('wp_head', array($this, 'add_performance_hints'));
    }
    
    /**
     * Load additional theme components
     */
    private function load_components() {
        // Initialize Assets management
        new \Theme\Core\Assets();
        
        // Load other components when available
        if (class_exists('Theme\Utils\Helpers')) {
            new \Theme\Utils\Helpers();
        }
    }
    
    /**
     * Theme setup configuration
     */
    public function theme_setup() {
        // Make theme available for translation
        load_theme_textdomain('zenstarter', ZENSTARTER_PATH . '/languages');
        
        // Add theme support features
        add_theme_support('post-thumbnails');
        add_theme_support('title-tag');
        add_theme_support('custom-logo');
        add_theme_support('customize-selective-refresh-widgets');
        add_theme_support('responsive-embeds');
        add_theme_support('wp-block-styles');
        add_theme_support('align-wide');
        add_theme_support('editor-styles');
        
        // HTML5 support
        add_theme_support('html5', array(
            'comment-list',
            'comment-form',
            'search-form',
            'gallery',
            'caption',
            'style',
            'script'
        ));
        
        // Custom image sizes
        add_image_size('zenstarter-featured', 800, 450, true);
        add_image_size('zenstarter-thumbnail', 300, 200, true);
        
        // Register navigation menus
        register_nav_menus(array(
            'primary' => __('Primary Menu', 'zenstarter'),
            'footer' => __('Footer Menu', 'zenstarter'),
            'mobile' => __('Mobile Menu', 'zenstarter')
        ));
        
        // Add editor style
        add_editor_style('assets/css/editor-style.css');
        
        // WooCommerce support
        if (class_exists('WooCommerce')) {
            add_theme_support('woocommerce');
            add_theme_support('wc-product-gallery-zoom');
            add_theme_support('wc-product-gallery-lightbox');
            add_theme_support('wc-product-gallery-slider');
        }
    }
    
    /**
     * Register custom block patterns
     */
    public function register_block_patterns() {
        // Register pattern category
        register_block_pattern_category(
            'zenstarter',
            array('label' => __('Zenstarter', 'zenstarter'))
        );
    }
    
    /**
     * Register custom block categories
     */
    public function register_block_categories() {
        // Register block category for custom blocks
        if (function_exists('register_block_type')) {
            add_filter('block_categories_all', array($this, 'add_custom_block_categories'), 10, 2);
        }
    }
    
    /**
     * Add custom block categories to the block editor
     */
    public function add_custom_block_categories($categories, $post) {
        return array_merge(
            array(
                array(
                    'slug' => 'zenstarter',
                    'title' => __('Zenstarter Blocks', 'zenstarter'),
                    'icon' => 'admin-generic',
                ),
            ),
            $categories
        );
    }
    
    /**
     * Register custom Gutenberg blocks
     */
    public function register_custom_blocks() {
        // Check if function exists (WordPress 5.0+)
        if (!function_exists('register_block_type')) {
            return;
        }
        
        // Register zen-box block
        $this->register_zen_box_block();
        
        // Register zen-hero block
        $this->register_zen_hero_block();
        
        // Register zen-cta block
        $this->register_zen_cta_block();
        
        // Register zen-testimonial block
        $this->register_zen_testimonial_block();
        
        // Register zen-grid block
        $this->register_zen_grid_block();
        
        // Register zen-card block
        $this->register_zen_card_block();
    }
    
    /**
     * Register the zen-box block
     */
    private function register_zen_box_block() {
        // Register the block with compiled assets
        register_block_type('zenstarter/zen-box', array(
            'editor_script' => 'zenstarter-zen-box-editor',
            'editor_style' => 'zenstarter-zen-box-editor-style',
            'style' => 'zenstarter-zen-box-style',
        ));
        
        // Enqueue compiled assets
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_zen_box_editor_assets'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_zen_box_frontend_assets'));
    }
    
    /**
     * Enqueue zen-box editor assets
     */
    public function enqueue_zen_box_editor_assets() {
        wp_enqueue_script(
            'zenstarter-zen-box-editor',
            ZENSTARTER_ASSETS_URL . '/blocks/zen-box/index.js',
            array('wp-blocks', 'wp-element', 'wp-editor', 'wp-block-editor', 'wp-components', 'wp-i18n', 'wp-compose', 'wp-data'),
            ZENSTARTER_VERSION,
            true
        );
        
        wp_enqueue_style(
            'zenstarter-zen-box-editor-style',
            ZENSTARTER_ASSETS_URL . '/blocks/zen-box/editor.css',
            array('wp-edit-blocks'),
            ZENSTARTER_VERSION
        );
    }
    
    /**
     * Enqueue zen-box frontend assets
     */
    public function enqueue_zen_box_frontend_assets() {
        // Only enqueue if the block is used on the page
        if (has_block('zenstarter/zen-box')) {
            wp_enqueue_style(
                'zenstarter-zen-box-style',
                ZENSTARTER_ASSETS_URL . '/blocks/zen-box/style.css',
                array(),
                ZENSTARTER_VERSION
            );
        }
    }
    
    /**
     * Register the zen-hero block
     */
    private function register_zen_hero_block() {
        // Register the block with compiled assets
        register_block_type('zenstarter/zen-hero', array(
            'editor_script' => 'zenstarter-zen-hero-editor',
            'editor_style' => 'zenstarter-zen-hero-editor-style',
            'style' => 'zenstarter-zen-hero-style',
            'render_callback' => array($this, 'render_zen_hero_block'),
        ));
        
        // Enqueue compiled assets
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_zen_hero_editor_assets'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_zen_hero_frontend_assets'));
    }
    
    /**
     * Enqueue zen-hero editor assets
     */
    public function enqueue_zen_hero_editor_assets() {
        wp_enqueue_script(
            'zenstarter-zen-hero-editor',
            ZENSTARTER_ASSETS_URL . '/blocks/zen-hero/index.js',
            array('wp-blocks', 'wp-element', 'wp-editor', 'wp-block-editor', 'wp-components', 'wp-i18n', 'wp-compose', 'wp-data'),
            ZENSTARTER_VERSION,
            true
        );
        
        wp_enqueue_style(
            'zenstarter-zen-hero-editor-style',
            ZENSTARTER_ASSETS_URL . '/blocks/zen-hero/editor.css',
            array('wp-edit-blocks'),
            ZENSTARTER_VERSION
        );
    }
    
    /**
     * Enqueue zen-hero frontend assets
     */
    public function enqueue_zen_hero_frontend_assets() {
        // Only enqueue if the block is used on the page
        if (has_block('zenstarter/zen-hero')) {
            wp_enqueue_style(
                'zenstarter-zen-hero-style',
                ZENSTARTER_ASSETS_URL . '/blocks/zen-hero/style.css',
                array(),
                ZENSTARTER_VERSION
            );
            
            // Enqueue hero JavaScript for animations and parallax
            wp_enqueue_script(
                'zenstarter-zen-hero-frontend',
                ZENSTARTER_ASSETS_URL . '/blocks/zen-hero/frontend.js',
                array(),
                ZENSTARTER_VERSION,
                true
            );
        }
    }
    
    /**
     * Render zen-hero block on frontend
     */
    public function render_zen_hero_block($attributes, $content) {
        // Include the PHP render file
        $render_file = ZENSTARTER_PATH . '/blocks/zen-hero/render.php';
        
        if (file_exists($render_file)) {
            ob_start();
            include $render_file;
            return ob_get_clean();
        }
        
        return $content;
    }
    
    /**
     * Register the zen-cta block
     */
    private function register_zen_cta_block() {
        register_block_type(ZENSTARTER_PATH . '/blocks/zen-cta/block.json');
        
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_zen_cta_editor_assets'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_zen_cta_frontend_assets'));
    }
    
    /**
     * Enqueue zen-cta editor assets
     */
    public function enqueue_zen_cta_editor_assets() {
        wp_enqueue_script(
            'zenstarter-zen-cta-editor',
            ZENSTARTER_ASSETS_URL . '/blocks/zen-cta/index.js',
            array('wp-blocks', 'wp-element', 'wp-editor', 'wp-block-editor', 'wp-components', 'wp-i18n', 'wp-compose', 'wp-data'),
            ZENSTARTER_VERSION,
            true
        );
        
        wp_enqueue_style(
            'zenstarter-zen-cta-editor-style',
            ZENSTARTER_ASSETS_URL . '/blocks/zen-cta/editor.css',
            array('wp-edit-blocks'),
            ZENSTARTER_VERSION
        );
    }
    
    /**
     * Enqueue zen-cta frontend assets
     */
    public function enqueue_zen_cta_frontend_assets() {
        if (has_block('zenstarter/zen-cta')) {
            wp_enqueue_style(
                'zenstarter-zen-cta-style',
                ZENSTARTER_ASSETS_URL . '/blocks/zen-cta/style.css',
                array(),
                ZENSTARTER_VERSION
            );
        }
    }
    
    /**
     * Register the zen-testimonial block
     */
    private function register_zen_testimonial_block() {
        register_block_type(ZENSTARTER_PATH . '/blocks/zen-testimonial/block.json');
        
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_zen_testimonial_editor_assets'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_zen_testimonial_frontend_assets'));
    }
    
    /**
     * Enqueue zen-testimonial editor assets
     */
    public function enqueue_zen_testimonial_editor_assets() {
        wp_enqueue_script(
            'zenstarter-zen-testimonial-editor',
            ZENSTARTER_ASSETS_URL . '/blocks/zen-testimonial/index.js',
            array('wp-blocks', 'wp-element', 'wp-editor', 'wp-block-editor', 'wp-components', 'wp-i18n', 'wp-compose', 'wp-data'),
            ZENSTARTER_VERSION,
            true
        );
        
        wp_enqueue_style(
            'zenstarter-zen-testimonial-editor-style',
            ZENSTARTER_ASSETS_URL . '/blocks/zen-testimonial/editor.css',
            array('wp-edit-blocks'),
            ZENSTARTER_VERSION
        );
    }
    
    /**
     * Enqueue zen-testimonial frontend assets
     */
    public function enqueue_zen_testimonial_frontend_assets() {
        if (has_block('zenstarter/zen-testimonial')) {
            wp_enqueue_style(
                'zenstarter-zen-testimonial-style',
                ZENSTARTER_ASSETS_URL . '/blocks/zen-testimonial/style.css',
                array(),
                ZENSTARTER_VERSION
            );
        }
    }
    
    /**
     * Register the zen-grid block
     */
    private function register_zen_grid_block() {
        register_block_type(ZENSTARTER_PATH . '/blocks/zen-grid/block.json');
        
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_zen_grid_editor_assets'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_zen_grid_frontend_assets'));
    }
    
    /**
     * Enqueue zen-grid editor assets
     */
    public function enqueue_zen_grid_editor_assets() {
        wp_enqueue_script(
            'zenstarter-zen-grid-editor',
            ZENSTARTER_ASSETS_URL . '/blocks/zen-grid/index.js',
            array('wp-blocks', 'wp-element', 'wp-editor', 'wp-block-editor', 'wp-components', 'wp-i18n', 'wp-compose', 'wp-data'),
            ZENSTARTER_VERSION,
            true
        );
        
        wp_enqueue_style(
            'zenstarter-zen-grid-editor-style',
            ZENSTARTER_ASSETS_URL . '/blocks/zen-grid/editor.css',
            array('wp-edit-blocks'),
            ZENSTARTER_VERSION
        );
    }
    
    /**
     * Enqueue zen-grid frontend assets
     */
    public function enqueue_zen_grid_frontend_assets() {
        if (has_block('zenstarter/zen-grid')) {
            wp_enqueue_style(
                'zenstarter-zen-grid-style',
                ZENSTARTER_ASSETS_URL . '/blocks/zen-grid/style.css',
                array(),
                ZENSTARTER_VERSION
            );
        }
    }
    
    /**
     * Register the zen-card block
     */
    private function register_zen_card_block() {
        register_block_type(ZENSTARTER_PATH . '/blocks/zen-card/block.json');
        
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_zen_card_editor_assets'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_zen_card_frontend_assets'));
    }
    
    /**
     * Enqueue zen-card editor assets
     */
    public function enqueue_zen_card_editor_assets() {
        wp_enqueue_script(
            'zenstarter-zen-card-editor',
            ZENSTARTER_ASSETS_URL . '/blocks/zen-card/index.js',
            array('wp-blocks', 'wp-element', 'wp-editor', 'wp-block-editor', 'wp-components', 'wp-i18n', 'wp-compose', 'wp-data'),
            ZENSTARTER_VERSION,
            true
        );
        
        wp_enqueue_style(
            'zenstarter-zen-card-editor-style',
            ZENSTARTER_ASSETS_URL . '/blocks/zen-card/editor.css',
            array('wp-edit-blocks'),
            ZENSTARTER_VERSION
        );
    }
    
    /**
     * Enqueue zen-card frontend assets
     */
    public function enqueue_zen_card_frontend_assets() {
        if (has_block('zenstarter/zen-card')) {
            wp_enqueue_style(
                'zenstarter-zen-card-style',
                ZENSTARTER_ASSETS_URL . '/blocks/zen-card/style.css',
                array(),
                ZENSTARTER_VERSION
            );
        }
    }
    
    /**
     * Register theme sidebars
     */
    public function register_sidebars() {
        register_sidebar(array(
            'name' => __('Primary Sidebar', 'zenstarter'),
            'id' => 'sidebar-primary',
            'description' => __('Main sidebar area', 'zenstarter'),
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget' => '</div>',
            'before_title' => '<h3 class="widget-title">',
            'after_title' => '</h3>'
        ));
        
        register_sidebar(array(
            'name' => __('Footer Widgets', 'zenstarter'),
            'id' => 'footer-widgets',
            'description' => __('Footer widget area', 'zenstarter'),
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget' => '</div>',
            'before_title' => '<h4 class="widget-title">',
            'after_title' => '</h4>'
        ));
    }
    
    /**
     * Add custom body classes
     */
    public function body_classes($classes) {
        // Add class of hfeed to non-singular pages
        if (!is_singular()) {
            $classes[] = 'hfeed';
        }
        
        // Add class for keyboard navigation
        $classes[] = 'keyboard-navigation';
        
        // Add class if we have a sidebar
        if (is_active_sidebar('sidebar-primary')) {
            $classes[] = 'has-sidebar';
        }
        
        return $classes;
    }
    
    /**
     * Add pingback URL for single posts
     */
    public function add_pingback_url() {
        if (is_singular() && pings_open()) {
            printf('<link rel="pingback" href="%s">', esc_url(get_bloginfo('pingback_url')));
        }
    }
    
    /**
     * Add accessibility features to wp_head
     * WCAG 2.1 AA compliance improvements
     */
    public function add_accessibility_features() {
        // Add viewport meta for better mobile accessibility
        echo '<meta name="theme-color" content="#2563eb">' . "\n";
        
        // Add language direction for RTL support
        if (is_rtl()) {
            echo '<meta name="direction" content="rtl">' . "\n";
        }
        
        // Add accessibility toolbar detection
        echo '<script>
            document.documentElement.classList.add("js");
            if (window.navigator.userAgent.includes("JAWS") || window.navigator.userAgent.includes("NVDA")) {
                document.documentElement.classList.add("screen-reader");
            }
        </script>' . "\n";
        
        // Add focus-visible polyfill CDN
        echo '<script src="https://cdn.jsdelivr.net/npm/focus-visible@5.2.0/dist/focus-visible.min.js" defer></script>' . "\n";
    }
    
    /**
     * Add accessibility scripts to footer
     */
    public function add_accessibility_scripts() {
        ?>
        <script>
        // Enhanced keyboard navigation
        document.addEventListener('DOMContentLoaded', function() {
            // Skip link functionality
            const skipLink = document.querySelector('.skip-link');
            if (skipLink) {
                skipLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.focus();
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }
            
            // Enhanced button accessibility
            const buttons = document.querySelectorAll('button[aria-expanded]');
            buttons.forEach(function(button) {
                button.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape' && this.getAttribute('aria-expanded') === 'true') {
                        this.setAttribute('aria-expanded', 'false');
                        this.focus();
                    }
                });
            });
            
            // Improve link accessibility
            const links = document.querySelectorAll('a[href="#"]');
            links.forEach(function(link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                });
            });
        });
        </script>
        <?php
    }
    
    /**
     * Enhance navigation menu accessibility
     */
    public function enhance_nav_menu_accessibility($args) {
        // Add ARIA labels to navigation menus
        if (!isset($args['menu_id'])) {
            return $args;
        }
        
        switch ($args['menu_id']) {
            case 'primary-menu':
                $args['container_aria_label'] = __('Main Navigation', 'zenstarter');
                break;
            case 'footer-menu':
                $args['container_aria_label'] = __('Footer Navigation', 'zenstarter');
                break;
            case 'mobile-menu':
                $args['container_aria_label'] = __('Mobile Navigation', 'zenstarter');
                break;
        }
        
        return $args;
    }
    
    /**
     * Enhance content accessibility
     */
    public function enhance_content_accessibility($content) {
        // Add proper heading structure
        $content = preg_replace_callback(
            '/<h([1-6])([^>]*)>(.*?)<\/h[1-6]>/i',
            function($matches) {
                $level = $matches[1];
                $attributes = $matches[2];
                $text = $matches[3];
                
                // Add id for anchor linking if not present
                if (!preg_match('/id=/', $attributes)) {
                    $id = sanitize_title($text);
                    $attributes .= ' id="' . esc_attr($id) . '"';
                }
                
                return '<h' . $level . $attributes . '>' . $text . '</h' . $level . '>';
            },
            $content
        );
        
        // Enhance image accessibility
        $content = preg_replace_callback(
            '/<img([^>]+)>/i',
            function($matches) {
                $img_tag = $matches[0];
                
                // Add loading="lazy" if not present
                if (!preg_match('/loading=/', $img_tag)) {
                    $img_tag = str_replace('<img', '<img loading="lazy"', $img_tag);
                }
                
                // Add decoding="async" if not present
                if (!preg_match('/decoding=/', $img_tag)) {
                    $img_tag = str_replace('<img', '<img decoding="async"', $img_tag);
                }
                
                return $img_tag;
            },
            $content
        );
        
        return $content;
    }
    
    /**
     * Add performance hints to wp_head
     */
    public function add_performance_hints() {
        // Resource hints for better performance
        echo '<link rel="dns-prefetch" href="//fonts.googleapis.com">' . "\n";
        echo '<link rel="dns-prefetch" href="//fonts.gstatic.com">' . "\n";
        echo '<link rel="dns-prefetch" href="//www.google-analytics.com">' . "\n";
        
        // Preconnect to critical third-party origins
        echo '<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>' . "\n";
        echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
        
        // Add critical CSS for above-the-fold content
        if (is_front_page()) {
            echo '<style id="critical-css">
                .site-header { position: relative; z-index: 100; }
                .zen-hero { min-height: 60vh; display: flex; align-items: center; }
                .skip-link:focus { position: absolute; left: 1rem; top: 1rem; z-index: 999999; }
            </style>' . "\n";
        }
        
        // Add structured data for better SEO
        $this->add_structured_data();
    }
    
    /**
     * Add structured data (Schema.org) for SEO
     */
    private function add_structured_data() {
        $schema = array();
        
        // Website schema
        $schema[] = array(
            '@context' => 'https://schema.org',
            '@type' => 'WebSite',
            'name' => get_bloginfo('name'),
            'description' => get_bloginfo('description'),
            'url' => home_url(),
            'potentialAction' => array(
                '@type' => 'SearchAction',
                'target' => home_url('/?s={search_term_string}'),
                'query-input' => 'required name=search_term_string'
            )
        );
        
        // Organization schema
        $schema[] = array(
            '@context' => 'https://schema.org',
            '@type' => 'Organization',
            'name' => get_bloginfo('name'),
            'url' => home_url(),
            'logo' => array(
                '@type' => 'ImageObject',
                'url' => get_theme_mod('custom_logo') ? wp_get_attachment_image_url(get_theme_mod('custom_logo'), 'full') : ''
            )
        );
        
        // Article schema for single posts
        if (is_single() && 'post' === get_post_type()) {
            global $post;
            
            $schema[] = array(
                '@context' => 'https://schema.org',
                '@type' => 'Article',
                'headline' => get_the_title(),
                'description' => get_the_excerpt(),
                'image' => get_the_post_thumbnail_url($post, 'large'),
                'author' => array(
                    '@type' => 'Person',
                    'name' => get_the_author()
                ),
                'publisher' => array(
                    '@type' => 'Organization',
                    'name' => get_bloginfo('name'),
                    'logo' => array(
                        '@type' => 'ImageObject',
                        'url' => get_theme_mod('custom_logo') ? wp_get_attachment_image_url(get_theme_mod('custom_logo'), 'full') : ''
                    )
                ),
                'datePublished' => get_the_date('c'),
                'dateModified' => get_the_modified_date('c'),
                'mainEntityOfPage' => array(
                    '@type' => 'WebPage',
                    '@id' => get_permalink()
                )
            );
        }
        
        // Output schema
        if (!empty($schema)) {
            echo '<script type="application/ld+json">';
            echo wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
            echo '</script>' . "\n";
        }
    }
}