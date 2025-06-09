<?php
/**
 * Left Sidebar template
 *
 * @package Zenstarter
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!is_active_sidebar('sidebar-left')) {
    return;
}
?>

<aside id="secondary" class="widget-area sidebar-left" role="complementary" aria-label="<?php esc_attr_e('Left Sidebar', 'zenstarter'); ?>">
    <?php do_action('zenstarter_before_sidebar'); ?>

    <div class="sidebar-content">
        <?php dynamic_sidebar('sidebar-left'); ?>
    </div>

    <?php do_action('zenstarter_after_sidebar'); ?>
</aside>
