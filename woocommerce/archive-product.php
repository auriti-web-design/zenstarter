<?php
/**
 * Template for WooCommerce product archives (shop page).
 *
 * @package Zenstarter
 * @version 1.0.0
 */

defined('ABSPATH') || exit;

get_header();
?>

<main id="main-content" class="site-main" role="main" aria-label="<?php esc_attr_e('Products', 'zenstarter'); ?>">
    <div class="container">
        <?php do_action('zenstarter_before_archive_content'); ?>

        <?php if (woocommerce_product_loop()) : ?>

            <?php do_action('woocommerce_before_shop_loop'); ?>

            <div class="products-grid grid grid--3-cols">
                <?php while (have_posts()) : the_post(); ?>
                    <?php wc_get_template_part('content', 'product'); ?>
                <?php endwhile; ?>
            </div>

            <?php do_action('woocommerce_after_shop_loop'); ?>

        <?php else : ?>

            <?php wc_get_template('loop/no-products-found.php'); ?>

        <?php endif; ?>

        <?php do_action('zenstarter_after_archive_content'); ?>
    </div>
</main>

<?php
get_footer();
