<?php
/**
 * The template for displaying all single posts
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
         * Hook: zenstarter_before_single_content
         * 
         * @hooked - none by default
         */
        do_action('zenstarter_before_single_content'); 
        ?>
        
        <?php while (have_posts()) : the_post(); ?>
            
            <article id="post-<?php the_ID(); ?>" <?php post_class('post-single'); ?>>
                
                <header class="entry-header">
                    
                    <?php
                    // Post title
                    the_title('<h1 class="entry-title">', '</h1>');
                    ?>
                    
                    <?php if ('post' === get_post_type()) : ?>
                        <div class="entry-meta">
                            <?php get_template_part('template-parts/content/entry', 'meta'); ?>
                        </div>
                    <?php endif; ?>
                    
                </header>
                
                <?php
                // Display featured image if present
                if (has_post_thumbnail()) :
                ?>
                    <div class="post-featured-image">
                        <?php 
                        the_post_thumbnail('large', array(
                            'loading' => 'eager',
                            'alt' => the_title_attribute(array('echo' => false))
                        )); 
                        ?>
                        
                        <?php
                        // Featured image caption
                        $caption = get_the_post_thumbnail_caption();
                        if ($caption) :
                        ?>
                            <figcaption class="wp-caption-text"><?php echo esc_html($caption); ?></figcaption>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>
                
                <div class="entry-content">
                    <?php
                    // The main post content
                    the_content(sprintf(
                        wp_kses(
                            /* translators: %s: Name of current post. Only visible to screen readers */
                            __('Continue reading<span class="screen-reader-text"> "%s"</span>', 'zenstarter'),
                            array('span' => array('class' => array()))
                        ),
                        get_the_title()
                    ));
                    
                    // Multi-page navigation for long posts
                    wp_link_pages(array(
                        'before' => '<div class="page-links">' . esc_html__('Pages:', 'zenstarter'),
                        'after'  => '</div>',
                    ));
                    ?>
                </div>
                
                <footer class="entry-footer">
                    
                    <?php
                    // Categories and tags
                    $categories_list = get_the_category_list(', ');
                    $tags_list = get_the_tag_list('', ', ');
                    
                    if ($categories_list || $tags_list) :
                    ?>
                        <div class="post-taxonomies">
                            
                            <?php if ($categories_list) : ?>
                                <div class="categories-links">
                                    <span class="meta-label"><?php esc_html_e('Categories:', 'zenstarter'); ?></span>
                                    <?php echo $categories_list; ?>
                                </div>
                            <?php endif; ?>
                            
                            <?php if ($tags_list) : ?>
                                <div class="tags-links">
                                    <span class="meta-label"><?php esc_html_e('Tags:', 'zenstarter'); ?></span>
                                    <?php echo $tags_list; ?>
                                </div>
                            <?php endif; ?>
                            
                        </div>
                    <?php endif; ?>
                    
                    <?php
                    // Edit post link for logged in users with permission
                    edit_post_link(
                        sprintf(
                            wp_kses(
                                /* translators: %s: Name of current post. Only visible to screen readers */
                                __('Edit <span class="screen-reader-text">%s</span>', 'zenstarter'),
                                array('span' => array('class' => array()))
                            ),
                            get_the_title()
                        ),
                        '<div class="edit-link">',
                        '</div>'
                    );
                    ?>
                    
                </footer>
                
            </article>
            
            <?php
            // Author bio section
            if (get_the_author_meta('description')) :
                get_template_part('template-parts/content/author', 'bio');
            endif;
            ?>
            
            <?php
            // Post navigation (previous/next post)
            $prev_post = get_previous_post();
            $next_post = get_next_post();
            
            if ($prev_post || $next_post) :
            ?>
                <nav class="post-navigation" role="navigation" aria-label="<?php esc_attr_e('Post Navigation', 'zenstarter'); ?>">
                    <h2 class="screen-reader-text"><?php esc_html_e('Post navigation', 'zenstarter'); ?></h2>
                    
                    <div class="nav-links">
                        
                        <?php if ($prev_post) : ?>
                            <div class="nav-previous">
                                <a href="<?php echo esc_url(get_permalink($prev_post)); ?>" rel="prev">
                                    <span class="nav-subtitle"><?php esc_html_e('Previous Post', 'zenstarter'); ?></span>
                                    <span class="nav-title"><?php echo esc_html(get_the_title($prev_post)); ?></span>
                                </a>
                            </div>
                        <?php endif; ?>
                        
                        <?php if ($next_post) : ?>
                            <div class="nav-next">
                                <a href="<?php echo esc_url(get_permalink($next_post)); ?>" rel="next">
                                    <span class="nav-subtitle"><?php esc_html_e('Next Post', 'zenstarter'); ?></span>
                                    <span class="nav-title"><?php echo esc_html(get_the_title($next_post)); ?></span>
                                </a>
                            </div>
                        <?php endif; ?>
                        
                    </div>
                </nav>
            <?php endif; ?>
            
            <?php
            // Related posts section
            get_template_part('template-parts/content/related', 'posts');
            ?>
            
            <?php
            // If comments are open or we have at least one comment, load up the comment template
            if (comments_open() || get_comments_number()) :
                comments_template();
            endif;
            ?>
            
        <?php endwhile; // End of the loop. ?>
        
        <?php 
        /**
         * Hook: zenstarter_after_single_content
         * 
         * @hooked - none by default
         */
        do_action('zenstarter_after_single_content'); 
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