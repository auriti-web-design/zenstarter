<?php
/**
 * Register custom widget areas
 *
 * @package Zenstarter
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register left and right sidebars
 */
function zenstarter_register_custom_sidebars() {
    register_sidebar([
        'name'          => __('Right Sidebar', 'zenstarter'),
        'id'            => 'sidebar-right',
        'description'   => __('Sidebar displayed on the right.', 'zenstarter'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ]);

    register_sidebar([
        'name'          => __('Left Sidebar', 'zenstarter'),
        'id'            => 'sidebar-left',
        'description'   => __('Sidebar displayed on the left.', 'zenstarter'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ]);
}
add_action('widgets_init', 'zenstarter_register_custom_sidebars');

