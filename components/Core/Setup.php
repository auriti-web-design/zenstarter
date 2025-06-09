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