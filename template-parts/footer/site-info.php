<?php
/**
 * Template part for displaying footer site info
 *
 * @package Zenstarter
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="footer-branding">
    
    <?php if (has_custom_logo()) : ?>
        <div class="footer-logo">
            <?php the_custom_logo(); ?>
        </div>
    <?php endif; ?>
    
    <div class="footer-identity">
        <h2 class="footer-site-title">
            <a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
                <?php bloginfo('name'); ?>
            </a>
        </h2>
        
        <?php
        $description = get_bloginfo('description', 'display');
        if ($description) :
        ?>
            <p class="footer-site-description"><?php echo esc_html($description); ?></p>
        <?php endif; ?>
    </div>
    
</div><!-- .footer-branding -->