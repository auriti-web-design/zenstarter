<?php
/**
 * Right Sidebar template
 *
 * @package Zenstarter
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!is_active_sidebar('sidebar-right')) {
    return;
}
?>

<aside id="secondary" class="widget-area sidebar-right" role="complementary" aria-label="<?php esc_attr_e('Right Sidebar', 'zenstarter'); ?>">
    <?php do_action('zenstarter_before_sidebar'); ?>

    <div class="sidebar-content">
        <?php dynamic_sidebar('sidebar-right'); ?>
    </div>

    <?php do_action('zenstarter_after_sidebar'); ?>
</aside>
