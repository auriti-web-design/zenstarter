<?php
/**
 * Template for displaying single product pages.
 *
 * @package Zenstarter
 * @version 1.0.0
 */

defined('ABSPATH') || exit;

get_header();
?>

<main id="main-content" class="site-main" role="main" aria-label="<?php esc_attr_e('Product', 'zenstarter'); ?>">
    <div class="container">
        <?php do_action('zenstarter_before_single_content'); ?>

        <?php
        while (have_posts()) :
            the_post();
            wc_get_template_part('content', 'single-product');
        endwhile;
        ?>

        <?php do_action('zenstarter_after_single_content'); ?>
    </div>
</main>

<?php
do_action('woocommerce_after_main_content');
get_footer();
