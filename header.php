<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @package Zenstarter
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    
    <!-- Performance: DNS prefetch for external resources -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    
    <!-- SEO: Base meta description (can be overridden by SEO plugins) -->
    <?php if (is_front_page() && !get_post_meta(get_option('page_on_front'), '_yoast_wpseo_metadesc', true)) : ?>
        <meta name="description" content="<?php echo esc_attr(wp_trim_words(get_bloginfo('description'), 30)); ?>">
    <?php endif; ?>
    
    <!-- SEO: Open Graph basic tags -->
    <meta property="og:type" content="<?php echo is_single() ? 'article' : 'website'; ?>">
    <meta property="og:title" content="<?php echo esc_attr(wp_get_document_title()); ?>">
    <meta property="og:url" content="<?php echo esc_url(get_permalink()); ?>">
    <meta property="og:site_name" content="<?php echo esc_attr(get_bloginfo('name')); ?>">
    <?php if (has_post_thumbnail() && is_single()) : ?>
        <meta property="og:image" content="<?php echo esc_url(get_the_post_thumbnail_url(get_the_ID(), 'large')); ?>">
    <?php endif; ?>
    
    <!-- Performance: Preload critical fonts -->
    <link rel="preload" href="<?php echo esc_url(ZENSTARTER_ASSETS_URL); ?>/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
    
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Skip links for accessibility -->
<a class="skip-link screen-reader-text" href="#main-content">
    <?php _e('Skip to main content', 'zenstarter'); ?>
</a>

<div id="page" class="site">
    
    <?php 
    /**
     * Hook: zenstarter_before_header
     * 
     * @hooked - none by default
     */
    do_action('zenstarter_before_header'); 
    ?>
    
    <header id="masthead" class="site-header" role="banner">
        <div class="container">
            
            <?php get_template_part('template-parts/header/site', 'branding'); ?>
            
            <nav id="site-navigation" class="main-navigation" role="navigation" aria-label="<?php esc_attr_e('Primary Menu', 'zenstarter'); ?>">
                
                <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false" aria-label="<?php esc_attr_e('Toggle navigation menu', 'zenstarter'); ?>">
                    <span class="menu-toggle-text"><?php _e('Menu', 'zenstarter'); ?></span>
                    <span class="menu-toggle-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>
                
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'primary',
                    'menu_id'        => 'primary-menu',
                    'menu_class'     => 'nav-menu',
                    'container'      => false,
                    'fallback_cb'    => '__return_false',
                ));
                ?>
                
            </nav>
            
            <?php if (function_exists('get_search_form')) : ?>
                <div class="header-search">
                    <button class="search-toggle" aria-controls="search-form" aria-expanded="false" aria-label="<?php esc_attr_e('Toggle search form', 'zenstarter'); ?>">
                        <span class="screen-reader-text"><?php _e('Search', 'zenstarter'); ?></span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                        </svg>
                    </button>
                    
                    <div id="search-form" class="search-form-wrapper" hidden>
                        <?php get_search_form(); ?>
                    </div>
                </div>
            <?php endif; ?>
            
        </div>
    </header>
    
    <?php 
    /**
     * Hook: zenstarter_after_header
     * 
     * @hooked - none by default
     */
    do_action('zenstarter_after_header'); 
    ?>
    
    <div id="content" class="site-content"><?php
        /**
         * Hook: zenstarter_before_content
         * 
         * @hooked - none by default
         */
        do_action('zenstarter_before_content');
    ?>