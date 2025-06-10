<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Zenstarter
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="main-content" class="site-main" role="main">
    
    <?php
    /**
     * Hook: zenstarter_before_main_content
     * 
     * Add content before the main content area
     */
    do_action('zenstarter_before_main_content');
    ?>
    
    <div class="container">
        
        <?php if (have_posts()) : ?>
            
            <?php
            /**
             * Hook: zenstarter_before_posts_loop
             */
            do_action('zenstarter_before_posts_loop');
            ?>
            
            <div class="posts-container">
                
                <?php
                // Start the Loop
                while (have_posts()) :
                    the_post();
                    
                    /*
                     * Include the Post-Type-specific template for the content.
                     * If you want to override this in a child theme, then include a file
                     * called content-___.php (where ___ is the Post Type name) and that will be used instead.
                     */
                    get_template_part('template-parts/loop/post');
                    
                endwhile;
                ?>
                
            </div><!-- .posts-container -->
            
            <?php
            /**
             * Hook: zenstarter_after_posts_loop
             */
            do_action('zenstarter_after_posts_loop');
            ?>
            
            <?php
            // Posts pagination
            the_posts_pagination(array(
                'mid_size' => 2,
                'prev_text' => sprintf(
                    '%s <span class="nav-prev-text">%s</span>',
                    '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',
                    esc_html__('Previous', 'zenstarter')
                ),
                'next_text' => sprintf(
                    '<span class="nav-next-text">%s</span> %s',
                    esc_html__('Next', 'zenstarter'),
                    '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>'
                ),
                'screen_reader_text' => esc_html__('Posts navigation', 'zenstarter'),
            ));
            ?>
            
        <?php else : ?>
            
            <?php
            /**
             * No posts found
             */
            get_template_part('template-parts/content/content', 'none');
            ?>
            
        <?php endif; ?>
        
    </div><!-- .container -->
    
    <?php
    /**
     * Hook: zenstarter_after_main_content
     * 
     * Add content after the main content area
     */
    do_action('zenstarter_after_main_content');
    ?>
    
</main><!-- #main-content -->

<?php
get_sidebar();
get_footer();
?>