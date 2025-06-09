<?php
/**
 * Template for displaying product content within loops.
 *
 * @package Zenstarter
 * @version 1.0.0
 */

defined('ABSPATH') || exit;

global $product;

?>
<article <?php wc_product_class('product-card', $product); ?>>
    <a href="<?php the_permalink(); ?>" class="product-link">
        <?php if ($product && $product->is_on_sale()) : ?>
            <span class="badge badge--sale"><?php esc_html_e('Sale', 'zenstarter'); ?></span>
        <?php endif; ?>

        <?php if (has_post_thumbnail()) : ?>
            <?php the_post_thumbnail('woocommerce_thumbnail', array(
                'loading' => 'lazy',
                'class'   => 'product-image',
                'alt'     => the_title_attribute(array('echo' => false)),
            )); ?>
        <?php endif; ?>

        <h2 class="product-title"><?php the_title(); ?></h2>
        <?php woocommerce_template_loop_price(); ?>
    </a>

    <div class="product-actions">
        <?php woocommerce_template_loop_add_to_cart(); ?>
    </div>
</article>
