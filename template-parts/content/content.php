<?php
/**
 * Template part for displaying posts
 *
 * @package Zenstarter
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    
    <?php if (has_post_thumbnail() && !is_single()) : ?>
        <div class="post-thumbnail">
            <a href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
                <?php 
                the_post_thumbnail('zenstarter-featured', array(
                    'loading' => 'lazy',
                    'alt' => the_title_attribute(array('echo' => false))
                )); 
                ?>
            </a>
        </div>
    <?php endif; ?>
    
    <div class="entry-content-wrapper">
        
        <header class="entry-header">
            <?php
            if (is_singular()) :
                the_title('<h1 class="entry-title">', '</h1>');
            else :
                the_title('<h2 class="entry-title"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">', '</a></h2>');
            endif;
            ?>
            
            <?php if ('post' === get_post_type()) : ?>
                <div class="entry-meta">
                    <?php get_template_part('template-parts/content/entry', 'meta'); ?>
                </div>
            <?php endif; ?>
        </header>
        
        <div class="entry-content">
            <?php
            if (is_singular()) {
                the_content(sprintf(
                    wp_kses(
                        /* translators: %s: Name of current post. Only visible to screen readers */
                        __('Continue reading<span class="screen-reader-text"> "%s"</span>', 'zenstarter'),
                        array('span' => array('class' => array()))
                    ),
                    get_the_title()
                ));
                
                wp_link_pages(array(
                    'before' => '<div class="page-links">' . esc_html__('Pages:', 'zenstarter'),
                    'after'  => '</div>',
                ));
            } else {
                the_excerpt();
            }
            ?>
        </div>
        
        <?php if (!is_singular()) : ?>
            <div class="entry-footer">
                <a href="<?php the_permalink(); ?>" class="read-more">
                    <?php _e('Continue Reading', 'zenstarter'); ?>
                    <span class="screen-reader-text"> "<?php the_title(); ?>"</span>
                </a>
            </div>
        <?php endif; ?>
        
    </div>
    
</article><!-- #post-<?php the_ID(); ?> -->