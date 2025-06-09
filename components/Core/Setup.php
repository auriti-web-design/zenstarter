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
        add_action('wp_enqueue_scripts', array($this, 'enqueue_assets'));
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_editor_assets'));
        add_action('init', array($this, 'register_block_patterns'));
        add_action('widgets_init', array($this, 'register_sidebars'));
    }
    
    /**
     * Load additional theme components
     */
    private function load_components() {
        // Load other components when available
        if (class_exists('Theme\Core\Assets')) {
            new \Theme\Core\Assets();
        }
        
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
     * Enqueue theme assets
     */
    public function enqueue_assets() {
        // Main stylesheet
        wp_enqueue_style(
            'zenstarter-style',
            ZENSTARTER_ASSETS_URL . '/css/main.css',
            array(),
            ZENSTARTER_VERSION
        );
        
        // Main JavaScript
        wp_enqueue_script(
            'zenstarter-script',
            ZENSTARTER_ASSETS_URL . '/js/main.js',
            array('jquery'),
            ZENSTARTER_VERSION,
            true
        );
        
        // Localize script for AJAX
        wp_localize_script('zenstarter-script', 'zenstarter_ajax', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('zenstarter_nonce'),
            'site_url' => home_url()
        ));
        
        // Comment reply script
        if (is_singular() && comments_open() && get_option('thread_comments')) {
            wp_enqueue_script('comment-reply');
        }
    }
    
    /**
     * Enqueue editor assets
     */
    public function enqueue_editor_assets() {
        wp_enqueue_style(
            'zenstarter-editor',
            ZENSTARTER_ASSETS_URL . '/css/editor.css',
            array(),
            ZENSTARTER_VERSION
        );
        
        wp_enqueue_script(
            'zenstarter-editor',
            ZENSTARTER_ASSETS_URL . '/js/editor.js',
            array('wp-blocks', 'wp-dom-ready', 'wp-edit-post'),
            ZENSTARTER_VERSION,
            true
        );
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
}