<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @package Zenstarter
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

    <?php 
    /**
     * Hook: zenstarter_after_content
     * 
     * @hooked - none by default
     */
    do_action('zenstarter_after_content'); 
    ?>
    
    </div><!-- #content -->
    
    <?php 
    /**
     * Hook: zenstarter_before_footer
     * 
     * @hooked - none by default
     */
    do_action('zenstarter_before_footer'); 
    ?>
    
    <footer id="colophon" class="site-footer" role="contentinfo">
        <div class="container">
            
            <?php get_template_part('template-parts/footer/site', 'info'); ?>
            
            <?php if (has_nav_menu('footer')) : ?>
                <nav class="footer-navigation" role="navigation" aria-label="<?php esc_attr_e('Footer Menu', 'zenstarter'); ?>">
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'footer',
                        'menu_id'        => 'footer-menu',
                        'menu_class'     => 'footer-nav-menu',
                        'container'      => false,
                        'depth'          => 1,
                        'fallback_cb'    => '__return_false',
                    ));
                    ?>
                </nav>
            <?php endif; ?>
            
            <?php if (is_active_sidebar('footer-widgets')) : ?>
                <div class="footer-widgets">
                    <?php dynamic_sidebar('footer-widgets'); ?>
                </div>
            <?php endif; ?>
            
            <div class="site-info">
                <p class="copyright">
                    &copy; <?php echo esc_html(date('Y')); ?> 
                    <a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
                        <?php bloginfo('name'); ?>
                    </a>
                    <?php if (get_bloginfo('description')) : ?>
                        <span class="sep"> | </span>
                        <?php bloginfo('description'); ?>
                    <?php endif; ?>
                </p>
                
                <p class="powered-by">
                    <?php
                    printf(
                        /* translators: %s: WordPress link */
                        esc_html__('Powered by %s', 'zenstarter'),
                        '<a href="' . esc_url(__('https://wordpress.org/', 'zenstarter')) . '" target="_blank" rel="noopener">WordPress</a>'
                    );
                    ?>
                    <span class="sep"> | </span>
                    <?php
                    printf(
                        /* translators: %s: Theme name and author link */
                        esc_html__('Theme: %1$s by %2$s', 'zenstarter'),
                        '<a href="https://github.com/zenstarter/wordpress-theme" target="_blank" rel="noopener">Zenstarter</a>',
                        '<a href="https://auritidesign.com" target="_blank" rel="noopener">Juan Camilo Auriti</a>'
                    );
                    ?>
                </p>
            </div>
            
        </div>
    </footer>
    
    <?php 
    /**
     * Hook: zenstarter_after_footer
     * 
     * @hooked - none by default
     */
    do_action('zenstarter_after_footer'); 
    ?>
    
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>