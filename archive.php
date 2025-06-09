<?php
/**
 * The template for displaying archive pages
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
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
    <div class="container">
        
        <?php 
        /**
         * Hook: zenstarter_before_archive_content
         * 
         * @hooked - none by default
         */
        do_action('zenstarter_before_archive_content'); 
        ?>
        
        <?php if (have_posts()) : ?>
            
            <header class="page-header">
                
                <?php
                // Archive title
                the_archive_title('<h1 class="page-title">', '</h1>');
                
                // Archive description
                $archive_description = get_the_archive_description();
                if ($archive_description) :
                ?>
                    <div class="page-description"><?php echo wp_kses_post($archive_description); ?></div>
                <?php endif; ?>
                
                <?php
                // Show post count for the current archive
                global $wp_query;
                $total_posts = $wp_query->found_posts;
                
                if ($total_posts > 0) :
                ?>
                    <div class="archive-meta">
                        <span class="posts-count">
                            <?php
                            printf(
                                /* translators: %s: number of posts */
                                esc_html(_n('%s post found', '%s posts found', $total_posts, 'zenstarter')),
                                '<strong>' . number_format_i18n($total_posts) . '</strong>'
                            );
                            ?>
                        </span>
                    </div>
                <?php endif; ?>
                
            </header>
            
            <div class="archive-content">
                
                <?php
                // Optional: Show filters or sorting options
                get_template_part('template-parts/archive/archive', 'filters');
                ?>
                
                <div class="posts-grid grid grid--2-cols">
                    
                    <?php while (have_posts()) : the_post(); ?>
                        
                        <?php
                        /*
                         * Include the Post-Type-specific template for the content.
                         * If you want to override this in a child theme, then include a file
                         * called content-___.php (where ___ is the Post Type name) and that will be used instead.
                         */
                        get_template_part('template-parts/loop/post');
                        ?>
                        
                    <?php endwhile; ?>
                    
                </div>
                
                <?php
                // Archive pagination
                the_posts_pagination(array(
                    'mid_size'  => 2,
                    'prev_text' => sprintf(
                        '%s <span class="nav-prev-text">%s</span>',
                        '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>',
                        esc_html__('Previous', 'zenstarter')
                    ),
                    'next_text' => sprintf(
                        '<span class="nav-next-text">%s</span> %s',
                        esc_html__('Next', 'zenstarter'),
                        '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>'
                    ),
                ));
                ?>
                
            </div>
            
        <?php else : ?>
            
            <?php get_template_part('template-parts/content/content', 'none'); ?>
            
        <?php endif; ?>
        
        <?php 
        /**
         * Hook: zenstarter_after_archive_content
         * 
         * @hooked - none by default
         */
        do_action('zenstarter_after_archive_content'); 
        ?>
        
    </div>
</main>

<?php
// Get sidebar if active
if (is_active_sidebar('sidebar-primary')) {
    get_sidebar();
}
?>

<?php get_footer(); ?>