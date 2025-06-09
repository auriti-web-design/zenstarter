<?php
/**
 * Zenstarter Theme Functions
 *
 * Modern WordPress starter theme with Gutenberg, FSE, and advanced development tools.
 *
 * @package Zenstarter
 * @version 1.0.0
 * @author Zenstarter Team
 * @license GPL-2.0-or-later
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define theme constants
define('ZENSTARTER_VERSION', '1.0.0');
define('ZENSTARTER_PATH', get_template_directory());
define('ZENSTARTER_URL', get_template_directory_uri());
define('ZENSTARTER_ASSETS_URL', ZENSTARTER_URL . '/assets');

// Composer autoload
if (file_exists(ZENSTARTER_PATH . '/vendor/autoload.php')) {
    require_once ZENSTARTER_PATH . '/vendor/autoload.php';
}

// Bootstrap the theme
if (class_exists('Theme\Core\Setup')) {
    new Theme\Core\Setup();
}

// Fallback functions for development
if (!class_exists('Theme\Core\Setup')) {
    /**
     * Basic theme setup fallback
     */
    function zenstarter_fallback_setup() {
        // Add theme support
        add_theme_support('post-thumbnails');
        add_theme_support('title-tag');
        add_theme_support('custom-logo');
        add_theme_support('html5', array(
            'comment-list',
            'comment-form', 
            'search-form',
            'gallery',
            'caption'
        ));
        
        // Register menus
        register_nav_menus(array(
            'primary' => __('Primary Menu', 'zenstarter'),
            'footer' => __('Footer Menu', 'zenstarter')
        ));
    }
    add_action('after_setup_theme', 'zenstarter_fallback_setup');
    
    /**
     * Enqueue basic styles and scripts fallback
     */
    function zenstarter_fallback_scripts() {
        wp_enqueue_style(
            'zenstarter-style',
            get_stylesheet_uri(),
            array(),
            ZENSTARTER_VERSION
        );
    }
    add_action('wp_enqueue_scripts', 'zenstarter_fallback_scripts');
}