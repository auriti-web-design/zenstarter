<?php
/**
 * The front page template file
 *
 * This template is used to display the front page (homepage) of the site.
 * It takes priority over index.php when set as the front page in Reading Settings.
 *
 * @package Zenstarter
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

get_header(); ?>

<main id="main-content" class="site-main" role="main">
    
    <?php 
    /**
     * Hook: zenstarter_before_front_page_content
     * 
     * @hooked - none by default
     */
    do_action('zenstarter_before_front_page_content'); 
    ?>
    
    <!-- Hero Section -->
    <?php get_template_part('template-parts/front-page/hero', 'section'); ?>
    
    <!-- Features Section -->
    <?php get_template_part('template-parts/front-page/features', 'section'); ?>
    
    <?php if (have_posts()) : ?>
        
        <!-- Recent Posts Section -->
        <section class="front-page-posts">
            <div class="container">
                
                <header class="section-header">
                    <h2 class="section-title">
                        <?php esc_html_e('Latest Posts', 'zenstarter'); ?>
                    </h2>
                    <p class="section-description">
                        <?php esc_html_e('Discover our latest articles and insights', 'zenstarter'); ?>
                    </p>
                </header>
                
                <div class="posts-grid grid grid--3-cols">
                    <?php
                    // Get latest posts for front page display
                    $front_page_posts = new WP_Query(array(
                        'post_type' => 'post',
                        'posts_per_page' => 6,
                        'post_status' => 'publish',
                        'ignore_sticky_posts' => true
                    ));
                    
                    if ($front_page_posts->have_posts()) :
                        while ($front_page_posts->have_posts()) :
                            $front_page_posts->the_post();
                            
                            // Load the content template part for each post
                            get_template_part('template-parts/content/content', 'excerpt');
                            
                        endwhile;
                        wp_reset_postdata();
                    endif;
                    ?>
                </div>
                
                <div class="section-footer">
                    <a href="<?php echo esc_url(get_permalink(get_option('page_for_posts'))); ?>" class="btn btn--primary">
                        <?php esc_html_e('View All Posts', 'zenstarter'); ?>
                    </a>
                </div>
                
            </div>
        </section>
        
    <?php endif; ?>
    
    <?php
    // If front page is set to display a static page, show its content
    if (is_page()) :
        while (have_posts()) :
            the_post();
            ?>
            
            <section class="front-page-content">
                <div class="container">
                    
                    <article id="post-<?php the_ID(); ?>" <?php post_class('page-content'); ?>>
                        
                        <?php if (get_the_title()) : ?>
                            <header class="entry-header">
                                <h1 class="entry-title"><?php the_title(); ?></h1>
                            </header>
                        <?php endif; ?>
                        
                        <div class="entry-content">
                            <?php
                            the_content();
                            
                            // Page links for multi-page content
                            wp_link_pages(array(
                                'before' => '<div class="page-links">' . esc_html__('Pages:', 'zenstarter'),
                                'after'  => '</div>',
                            ));
                            ?>
                        </div>
                        
                    </article>
                    
                </div>
            </section>
            
            <?php
        endwhile;
    endif;
    ?>
    
    <?php 
    /**
     * Hook: zenstarter_after_front_page_content
     * 
     * @hooked - none by default
     */
    do_action('zenstarter_after_front_page_content'); 
    ?>
    
</main>

<?php get_footer(); ?>