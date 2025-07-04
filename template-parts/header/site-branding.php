<?php
/**
 * Template part for displaying site branding
 *
 * @package Zenstarter
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="site-branding">
    
    <?php if (has_custom_logo()) : ?>
        <div class="site-logo">
            <?php the_custom_logo(); ?>
        </div>
    <?php endif; ?>
    
    <div class="site-identity">
        <?php if (is_front_page() && is_home()) : ?>
            <h1 class="site-title">
                <a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
                    <?php bloginfo('name'); ?>
                </a>
            </h1>
        <?php else : ?>
            <p class="site-title">
                <a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
                    <?php bloginfo('name'); ?>
                </a>
            </p>
        <?php endif; ?>
        
        <?php
        $description = get_bloginfo('description', 'display');
        if ($description || is_customize_preview()) :
        ?>
            <p class="site-description"><?php echo $description; ?></p>
        <?php endif; ?>
    </div>
    
</div><!-- .site-branding -->