<?php
/**
 * Assets Management Class
 *
 * Handles loading and management of theme assets (CSS, JS)
 *
 * @package Zenstarter
 * @subpackage Core
 * @version 1.0.0
 */

namespace Theme\Core;

/**
 * Assets class for managing theme assets
 */
class Assets {
    
    /**
     * Constructor - Initialize assets management
     */
    public function __construct() {
        $this->init_hooks();
    }
    
    /**
     * Initialize WordPress hooks for assets
     */
    private function init_hooks() {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_assets'));
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_editor_assets'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_conditional_assets'));
    }
    
    /**
     * Enqueue main theme assets
     */
    public function enqueue_assets() {
        // Try to get manifest data for versioned assets
        $manifest = $this->get_manifest();
        
        // Main stylesheet - try manifest first, then fallback to direct files
        $main_css = $this->get_asset_url('style', $manifest, 'css');
        
        if ($main_css) {
            // Load from manifest
            wp_enqueue_style(
                'zenstarter-main',
                $main_css,
                array(),
                $this->get_asset_version()
            );
        } else {
            // Fallback: Try to load compiled CSS directly
            $compiled_css = $this->find_compiled_css();
            if ($compiled_css) {
                wp_enqueue_style(
                    'zenstarter-main',
                    $compiled_css,
                    array(),
                    $this->get_asset_version()
                );
            } else {
                // Final fallback: Load style.css + inline critical styles
                wp_enqueue_style(
                    'zenstarter-style',
                    get_stylesheet_uri(),
                    array(),
                    ZENSTARTER_VERSION
                );
                
                // Add critical CSS inline for immediate styling
                wp_add_inline_style('zenstarter-style', $this->get_critical_css());
            }
        }
        
        // Main JavaScript
        $main_js = $this->get_asset_url('main', $manifest, 'js');
        if ($main_js) {
            // Load from manifest
            wp_enqueue_script(
                'zenstarter-main',
                $main_js,
                array('jquery'),
                $this->get_asset_version(),
                true
            );
        } else {
            // Fallback: Try to load compiled JS directly
            $compiled_js = $this->find_compiled_js();
            if ($compiled_js) {
                wp_enqueue_script(
                    'zenstarter-main',
                    $compiled_js,
                    array('jquery'),
                    $this->get_asset_version(),
                    true
                );
            } else {
                // Final fallback: Load inline critical JS
                wp_add_inline_script('jquery', $this->get_critical_js());
            }
        }
        
        // Localize script for AJAX and theme data (works with any loaded script)
        $script_handle = wp_script_is('zenstarter-main', 'enqueued') ? 'zenstarter-main' : 'jquery';
        wp_localize_script($script_handle, 'zenstarter', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('zenstarter_nonce'),
            'site_url' => home_url(),
            'theme_url' => get_template_directory_uri(),
            'is_rtl' => is_rtl(),
            'strings' => array(
                'menu_toggle' => __('Toggle navigation menu', 'zenstarter'),
                'search_toggle' => __('Toggle search form', 'zenstarter'),
                'loading' => __('Loading...', 'zenstarter'),
            )
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
        $manifest = $this->get_manifest();
        
        // Editor stylesheet
        $editor_css = $this->get_asset_url('editor-style', $manifest, 'css');
        if ($editor_css) {
            wp_enqueue_style(
                'zenstarter-editor',
                $editor_css,
                array(),
                $this->get_asset_version()
            );
        }
        
        // Editor JavaScript
        $editor_js = $this->get_asset_url('editor', $manifest, 'js');
        if ($editor_js) {
            wp_enqueue_script(
                'zenstarter-editor',
                $editor_js,
                array('wp-blocks', 'wp-dom-ready', 'wp-edit-post'),
                $this->get_asset_version(),
                true
            );
        }
        
    }
    
    
    /**
     * Enqueue conditional assets based on page type
     */
    public function enqueue_conditional_assets() {
        // Load specific assets for different page types
        
        // Contact form styles (if contact page exists)
        if (is_page_template('page-contact.php') || is_page('contact')) {
            wp_enqueue_style(
                'zenstarter-contact',
                ZENSTARTER_ASSETS_URL . '/css/contact.css',
                array('zenstarter-main'),
                $this->get_asset_version()
            );
        }
        
        // WooCommerce styles
        if (class_exists('WooCommerce') && (is_woocommerce() || is_cart() || is_checkout() || is_account_page())) {
            wp_enqueue_style(
                'zenstarter-woocommerce',
                ZENSTARTER_ASSETS_URL . '/css/woocommerce.css',
                array('zenstarter-main'),
                $this->get_asset_version()
            );
        }
    }
    
    /**
     * Get manifest data from Vite build
     *
     * @return array|false
     */
    private function get_manifest() {
        static $manifest = null;
        
        if ($manifest === null) {
            $manifest_path = ZENSTARTER_PATH . '/assets/dist/manifest.json';
            
            if (file_exists($manifest_path)) {
                $manifest_content = file_get_contents($manifest_path);
                $manifest = json_decode($manifest_content, true);
            } else {
                $manifest = false;
            }
        }
        
        return $manifest;
    }
    
    /**
     * Get asset URL from manifest
     *
     * @param string $entry
     * @param array|false $manifest
     * @param string $type
     * @return string|false
     */
    private function get_asset_url($entry, $manifest, $type = 'js') {
        if (!$manifest) {
            return false;
        }
        
        // Map entry names to manifest keys
        $entry_map = array(
            'main' => 'assets/js/main.js',
            'editor' => 'assets/js/editor.js',
            'style' => 'assets/scss/main.scss',
            'editor-style' => 'assets/scss/editor.scss'
        );
        
        $manifest_key = isset($entry_map[$entry]) ? $entry_map[$entry] : $entry;
        
        if (isset($manifest[$manifest_key])) {
            $asset_data = $manifest[$manifest_key];
            
            if ($type === 'css' && isset($asset_data['css']) && !empty($asset_data['css'])) {
                return ZENSTARTER_ASSETS_URL . '/dist/' . $asset_data['css'][0];
            } elseif ($type === 'js' && isset($asset_data['file'])) {
                return ZENSTARTER_ASSETS_URL . '/dist/' . $asset_data['file'];
            }
        }
        
        return false;
    }
    
    /**
     * Get asset version for cache busting
     *
     * @return string
     */
    private function get_asset_version() {
        // In development, use timestamp for cache busting
        if (defined('WP_DEBUG') && WP_DEBUG) {
            return time();
        }
        
        return ZENSTARTER_VERSION;
    }
    
    /**
     * Preload critical assets
     */
    public function preload_assets() {
        $manifest = $this->get_manifest();
        
        // Preload main CSS
        $main_css = $this->get_asset_url('style', $manifest, 'css');
        if ($main_css) {
            echo '<link rel="preload" href="' . esc_url($main_css) . '" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">';
        }
        
        // Preload main JS
        $main_js = $this->get_asset_url('main', $manifest, 'js');
        if ($main_js) {
            echo '<link rel="preload" href="' . esc_url($main_js) . '" as="script">';
        }
    }
    
    /**
     * Add resource hints for performance
     */
    public function add_resource_hints() {
        // DNS prefetch for external resources
        echo '<link rel="dns-prefetch" href="//fonts.googleapis.com">';
        echo '<link rel="dns-prefetch" href="//fonts.gstatic.com">';
        
        // Preconnect for critical external resources
        echo '<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>';
        echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
    }
    
    /**
     * Find compiled CSS files directly in dist folder
     *
     * @return string|false
     */
    private function find_compiled_css() {
        $dist_css_dir = ZENSTARTER_PATH . '/assets/dist/css/';
        
        if (is_dir($dist_css_dir)) {
            $css_files = glob($dist_css_dir . 'main-*.css');
            if (!empty($css_files)) {
                $latest_file = end($css_files);
                $filename = basename($latest_file);
                return ZENSTARTER_ASSETS_URL . '/dist/css/' . $filename;
            }
        }
        
        return false;
    }
    
    /**
     * Get critical CSS for immediate styling
     *
     * @return string
     */
    private function get_critical_css() {
        return '
        /* Critical CSS for immediate styling */
        .container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 1rem;
        }
        
        .hero-section {
            background: #f8fafc;
            padding: 4rem 0;
            text-align: center;
        }
        
        .hero-title {
            font-size: clamp(2rem, 5vw, 3.5rem);
            font-weight: 700;
            margin-bottom: 1rem;
            color: #0f172a;
        }
        
        .hero-subtitle {
            font-size: 1.125rem;
            color: #64748b;
            margin-bottom: 2rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .hero-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .btn {
            display: inline-flex;
            align-items: center;
            padding: 0.75rem 1.5rem;
            font-weight: 600;
            text-decoration: none;
            border-radius: 0.375rem;
            transition: all 0.2s ease;
            cursor: pointer;
            border: none;
        }
        
        .btn--primary {
            background: #2563eb;
            color: white;
        }
        
        .btn--primary:hover {
            background: #1d4ed8;
            color: white;
        }
        
        .btn--outline {
            background: transparent;
            color: #2563eb;
            border: 2px solid #2563eb;
        }
        
        .btn--outline:hover {
            background: #2563eb;
            color: white;
        }
        
        .btn--large {
            padding: 1rem 2rem;
            font-size: 1.125rem;
        }
        
        .features-section {
            padding: 4rem 0;
        }
        
        .section-header {
            text-align: center;
            margin-bottom: 3rem;
        }
        
        .section-title {
            font-size: 2.25rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: #0f172a;
        }
        
        .section-description {
            font-size: 1.125rem;
            color: #64748b;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin: 2rem 0;
        }
        
        .feature-card {
            padding: 2rem;
            background: white;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            text-align: center;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .feature-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        
        .feature-icon {
            color: #2563eb;
            margin-bottom: 1rem;
        }
        
        .feature-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            color: #0f172a;
        }
        
        .feature-description {
            color: #64748b;
            line-height: 1.6;
        }
        
        .front-page-posts {
            padding: 4rem 0;
            background: #f8fafc;
        }
        
        .posts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .post-card {
            background: white;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: transform 0.2s ease;
        }
        
        .post-card:hover {
            transform: translateY(-2px);
        }
        
        .post-content {
            padding: 1.5rem;
        }
        
        .entry-title {
            margin-bottom: 0.75rem;
        }
        
        .entry-title a {
            color: #0f172a;
            text-decoration: none;
            font-weight: 600;
        }
        
        .entry-title a:hover {
            color: #2563eb;
        }
        
        .entry-meta {
            font-size: 0.875rem;
            color: #64748b;
            margin-bottom: 0.75rem;
        }
        
        .read-more {
            color: #2563eb;
            text-decoration: none;
            font-weight: 500;
        }
        
        .read-more:hover {
            color: #1d4ed8;
        }
        
        .site-header {
            background: white;
            border-bottom: 1px solid #e2e8f0;
            padding: 1rem 0;
        }
        
        .site-header .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .site-branding {
            display: flex;
            align-items: center;
        }
        
        .site-title {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 700;
        }
        
        .site-title a {
            color: #0f172a;
            text-decoration: none;
        }
        
        .menu-toggle {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            color: #0f172a;
        }
        
        .menu-toggle-icon {
            display: flex;
            flex-direction: column;
            width: 20px;
            height: 15px;
            justify-content: space-between;
        }
        
        .menu-toggle-icon span {
            display: block;
            height: 2px;
            background: currentColor;
            transition: all 0.3s ease;
        }
        
        .main-navigation ul {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 2rem;
        }
        
        .main-navigation a {
            color: #334155;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
        }
        
        .main-navigation a:hover {
            color: #2563eb;
        }
        
        .header-search {
            position: relative;
        }
        
        .search-toggle {
            background: none;
            border: none;
            cursor: pointer;
            color: #64748b;
            padding: 0.5rem;
        }
        
        .search-form-wrapper {
            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 0.375rem;
            padding: 1rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            min-width: 300px;
            z-index: 1000;
        }
        
        .search-form {
            display: flex;
            gap: 0.5rem;
        }
        
        .search-field {
            flex: 1;
            padding: 0.5rem;
            border: 1px solid #e2e8f0;
            border-radius: 0.25rem;
        }
        
        .search-submit {
            background: #2563eb;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            cursor: pointer;
        }
        
        .site-footer {
            background: #0f172a;
            color: #94a3b8;
            padding: 3rem 0 1.5rem;
            margin-top: 3rem;
        }
        
        .site-footer a {
            color: #94a3b8;
        }
        
        .site-footer a:hover {
            color: white;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .hero-actions {
                flex-direction: column;
                align-items: center;
            }
            
            .features-grid {
                grid-template-columns: 1fr;
            }
            
            .container {
                padding: 0 1rem;
            }
            
            .menu-toggle {
                display: block;
            }
            
            .main-navigation {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border-top: 1px solid #e2e8f0;
                z-index: 1000;
            }
            
            .main-navigation.is-open {
                display: block;
            }
            
            .main-navigation ul {
                flex-direction: column;
                padding: 1rem;
                gap: 0;
            }
            
            .main-navigation li {
                border-bottom: 1px solid #f1f5f9;
            }
            
            .main-navigation a {
                display: block;
                padding: 1rem 0;
            }
            
            .search-form-wrapper {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 90%;
                max-width: 400px;
            }
        }
        ';
    }
    
    /**
     * Find compiled JS files directly in dist folder
     *
     * @return string|false
     */
    private function find_compiled_js() {
        $dist_js_dir = ZENSTARTER_PATH . '/assets/dist/js/';
        
        if (is_dir($dist_js_dir)) {
            $js_files = glob($dist_js_dir . 'main-*.js');
            if (!empty($js_files)) {
                $latest_file = end($js_files);
                $filename = basename($latest_file);
                return ZENSTARTER_ASSETS_URL . '/dist/js/' . $filename;
            }
        }
        
        return false;
    }
    
    /**
     * Get critical JavaScript for immediate functionality
     *
     * @return string
     */
    private function get_critical_js() {
        return '
        // Critical JavaScript for immediate functionality
        document.addEventListener("DOMContentLoaded", function() {
            console.log("Zenstarter theme loaded successfully!");
            
            // Mobile menu functionality
            const menuToggle = document.querySelector(".menu-toggle");
            const navigation = document.querySelector(".main-navigation");
            
            if (menuToggle && navigation) {
                menuToggle.addEventListener("click", function() {
                    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
                    menuToggle.setAttribute("aria-expanded", !isExpanded);
                    navigation.classList.toggle("is-open");
                    
                    if (!isExpanded) {
                        const firstLink = navigation.querySelector("a");
                        if (firstLink) firstLink.focus();
                    }
                });
                
                // Close menu with Escape key
                document.addEventListener("keydown", function(e) {
                    if (e.key === "Escape" && navigation.classList.contains("is-open")) {
                        menuToggle.setAttribute("aria-expanded", "false");
                        navigation.classList.remove("is-open");
                        menuToggle.focus();
                    }
                });
            }
            
            // Search toggle functionality
            const searchToggle = document.querySelector(".search-toggle");
            const searchForm = document.querySelector("#search-form");
            
            if (searchToggle && searchForm) {
                searchToggle.addEventListener("click", function() {
                    const isExpanded = searchToggle.getAttribute("aria-expanded") === "true";
                    searchToggle.setAttribute("aria-expanded", !isExpanded);
                    
                    if (!isExpanded) {
                        searchForm.removeAttribute("hidden");
                        const searchField = searchForm.querySelector(".search-field");
                        if (searchField) searchField.focus();
                    } else {
                        searchForm.setAttribute("hidden", "");
                    }
                });
            }
            
            // Skip links functionality
            const skipLinks = document.querySelectorAll(".skip-link");
            skipLinks.forEach(function(link) {
                link.addEventListener("click", function(e) {
                    const target = document.querySelector(this.getAttribute("href"));
                    if (target) {
                        e.preventDefault();
                        target.focus();
                        target.scrollIntoView({ behavior: "smooth" });
                    }
                });
            });
            
            // Keyboard navigation enhancement
            document.addEventListener("keydown", function(e) {
                if (e.key === "Tab") {
                    document.body.classList.add("using-keyboard");
                }
            });
            
            document.addEventListener("mousedown", function() {
                document.body.classList.remove("using-keyboard");
            });
        });
        ';
    }
}