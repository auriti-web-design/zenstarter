<?php
/**
 * Template part for displaying posts within loops
 *
 * This template part is designed to be flexible and customizable for various loop contexts.
 * It supports different layout variations through CSS classes and action hooks.
 *
 * @package Zenstarter
 * @subpackage Blog
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

// Get post format for styling variations
$post_format = get_post_format() ?: 'standard';

// Allow customization of post classes
$post_classes = apply_filters('zenstarter_loop_post_classes', array(
    'loop-post',
    'post-format-' . $post_format,
    has_post_thumbnail() ? 'has-thumbnail' : 'no-thumbnail'
));
?>

<article id="post-<?php the_ID(); ?>" <?php post_class($post_classes); ?>>
    
    <?php 
    /**
     * Hook: zenstarter_loop_post_before_content
     * 
     * Allows plugins/child themes to add content before the post content
     */
    do_action('zenstarter_loop_post_before_content'); 
    ?>

    <?php if (has_post_thumbnail()) : ?>
        <div class="post-thumbnail">
            <?php 
            /**
             * Hook: zenstarter_loop_post_before_thumbnail
             */
            do_action('zenstarter_loop_post_before_thumbnail'); 
            ?>
            
            <a href="<?php the_permalink(); ?>" 
               aria-label="<?php echo esc_attr(sprintf(__('View post: %s', 'zenstarter'), get_the_title())); ?>"
               class="post-thumbnail-link">
                <?php 
                the_post_thumbnail('zenstarter-featured', array(
                    'loading' => 'lazy',
                    'alt' => the_title_attribute(array('echo' => false)),
                    'class' => 'post-thumbnail-image'
                )); 
                ?>
            </a>
            
            <?php 
            /**
             * Hook: zenstarter_loop_post_after_thumbnail
             * 
             * Perfect place to add post format icons, video play buttons, etc.
             */
            do_action('zenstarter_loop_post_after_thumbnail'); 
            ?>
        </div>
    <?php endif; ?>

    <div class="post-content">
        
        <?php 
        /**
         * Hook: zenstarter_loop_post_before_title
         * 
         * Add categories, tags, or other meta before title
         */
        do_action('zenstarter_loop_post_before_title'); 
        ?>

        <?php
        // Flexible title output with customizable heading level
        $title_level = apply_filters('zenstarter_loop_post_title_level', 'h2');
        the_title(
            sprintf('<%s class="entry-title"><a href="%s" rel="bookmark">', 
                $title_level, 
                esc_url(get_permalink())
            ),
            sprintf('</a></%s>', $title_level)
        );
        ?>

        <?php 
        /**
         * Hook: zenstarter_loop_post_after_title
         */
        do_action('zenstarter_loop_post_after_title'); 
        ?>

        <div class="entry-meta">
            <?php 
            /**
             * Hook: zenstarter_loop_post_meta
             * 
             * Default: displays entry meta
             * Can be customized to show different meta information
             */
            do_action('zenstarter_loop_post_meta');
            
            // Fallback to template part if no hooks are registered
            if (!has_action('zenstarter_loop_post_meta')) {
                get_template_part('template-parts/content/entry', 'meta');
            }
            ?>
        </div>

        <?php if (apply_filters('zenstarter_loop_show_excerpt', true)) : ?>
            <div class="entry-excerpt">
                <?php 
                /**
                 * Hook: zenstarter_loop_post_before_excerpt
                 */
                do_action('zenstarter_loop_post_before_excerpt'); 
                
                // Custom excerpt length for loop context
                $excerpt_length = apply_filters('zenstarter_loop_excerpt_length', 25);
                
                if (has_excerpt()) {
                    the_excerpt();
                } else {
                    // Generate excerpt with custom length
                    echo wp_trim_words(get_the_content(), $excerpt_length, '...');
                }
                
                /**
                 * Hook: zenstarter_loop_post_after_excerpt
                 */
                do_action('zenstarter_loop_post_after_excerpt'); 
                ?>
            </div>
        <?php endif; ?>

        <?php if (apply_filters('zenstarter_loop_show_read_more', true)) : ?>
            <div class="entry-actions">
                <?php 
                /**
                 * Hook: zenstarter_loop_post_actions
                 * 
                 * Default: displays read more link
                 * Can be customized to show share buttons, save buttons, etc.
                 */
                do_action('zenstarter_loop_post_actions');
                
                // Fallback read more link if no hooks are registered
                if (!has_action('zenstarter_loop_post_actions')) {
                    printf(
                        '<a href="%s" class="read-more-link" aria-label="%s">%s</a>',
                        esc_url(get_permalink()),
                        esc_attr(sprintf(__('Read more about: %s', 'zenstarter'), get_the_title())),
                        esc_html(apply_filters('zenstarter_read_more_text', __('Read More', 'zenstarter')))
                    );
                }
                ?>
            </div>
        <?php endif; ?>

    </div>

    <?php 
    /**
     * Hook: zenstarter_loop_post_after_content
     * 
     * Perfect place for social sharing, related tags, etc.
     */
    do_action('zenstarter_loop_post_after_content'); 
    ?>

</article>
