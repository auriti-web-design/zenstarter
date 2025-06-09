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
}