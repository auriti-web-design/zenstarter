<?php
/**
 * The sidebar containing the main widget area
 *
 * @package Zenstarter
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

if (!is_active_sidebar('sidebar-primary')) {
    return;
}
?>

<aside id="secondary" class="widget-area sidebar-primary" role="complementary" aria-label="<?php esc_attr_e('Primary Sidebar', 'zenstarter'); ?>">
    
    <?php 
    /**
     * Hook: zenstarter_before_sidebar
     * 
     * @hooked - none by default
     */
    do_action('zenstarter_before_sidebar'); 
    ?>
    
    <div class="sidebar-content">
        <?php dynamic_sidebar('sidebar-primary'); ?>
    </div>
    
    <?php 
    /**
     * Hook: zenstarter_after_sidebar
     * 
     * @hooked - none by default
     */
    do_action('zenstarter_after_sidebar'); 
    ?>
    
</aside><!-- #secondary -->