<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
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
         * Hook: zenstarter_before_page_content
         * 
         * @hooked - none by default
         */
        do_action('zenstarter_before_page_content'); 
        ?>
        
        <?php while (have_posts()) : the_post(); ?>
            
            <article id="post-<?php the_ID(); ?>" <?php post_class('page-single'); ?>>
                
                <?php
                // Display featured image if present
                if (has_post_thumbnail()) :
                ?>
                    <div class="page-featured-image">
                        <?php 
                        the_post_thumbnail('large', array(
                            'loading' => 'eager',
                            'alt' => the_title_attribute(array('echo' => false))
                        )); 
                        ?>
                    </div>
                <?php endif; ?>
                
                <header class="entry-header">
                    
                    <?php
                    // Page title
                    the_title('<h1 class="entry-title">', '</h1>');
                    ?>
                    
                    <?php
                    // Page meta information (last modified, author if needed)
                    if (get_edit_post_link()) :
                    ?>
                        <div class="entry-meta">
                            <time class="entry-date updated" datetime="<?php echo esc_attr(get_the_modified_date('c')); ?>">
                                <?php 
                                printf(
                                    /* translators: %s: post date */
                                    esc_html__('Last updated: %s', 'zenstarter'),
                                    '<span>' . esc_html(get_the_modified_date()) . '</span>'
                                );
                                ?>
                            </time>
                            
                            <?php
                            // Edit post link for logged in users
                            edit_post_link(
                                sprintf(
                                    wp_kses(
                                        /* translators: %s: Name of current post. Only visible to screen readers */
                                        __('Edit <span class="screen-reader-text">%s</span>', 'zenstarter'),
                                        array('span' => array('class' => array()))
                                    ),
                                    get_the_title()
                                ),
                                '<span class="edit-link">',
                                '</span>'
                            );
                            ?>
                        </div>
                    <?php endif; ?>
                    
                </header>
                
                <div class="entry-content">
                    <?php
                    // The main page content
                    the_content();
                    
                    // Multi-page navigation for long content
                    wp_link_pages(array(
                        'before' => '<div class="page-links">' . esc_html__('Pages:', 'zenstarter'),
                        'after'  => '</div>',
                    ));
                    ?>
                </div>
                
                <?php
                // Page footer with additional meta or content
                if (has_tag() || comments_open() || get_comments_number()) :
                ?>
                    <footer class="entry-footer">
                        
                        <?php
                        // Display tags if any
                        if (has_tag()) :
                            $tags_list = get_the_tag_list('', ', ');
                            if ($tags_list) :
                            ?>
                                <div class="tags-links">
                                    <span class="tags-label"><?php esc_html_e('Tagged:', 'zenstarter'); ?></span>
                                    <?php echo $tags_list; ?>
                                </div>
                            <?php 
                            endif;
                        endif;
                        ?>
                        
                    </footer>
                <?php endif; ?>
                
            </article>
            
            <?php
            // If comments are open or we have at least one comment, load up the comment template
            if (comments_open() || get_comments_number()) :
                comments_template();
            endif;
            ?>
            
        <?php endwhile; // End of the loop. ?>
        
        <?php 
        /**
         * Hook: zenstarter_after_page_content
         * 
         * @hooked - none by default
         */
        do_action('zenstarter_after_page_content'); 
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