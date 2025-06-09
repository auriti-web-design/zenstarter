<?php
/**
 * Template part for displaying entry meta information
 *
 * @package Zenstarter
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="entry-meta-items">
    
    <span class="posted-on">
        <time class="entry-date published updated" datetime="<?php echo esc_attr(get_the_date('c')); ?>">
            <span class="screen-reader-text"><?php _e('Posted on', 'zenstarter'); ?></span>
            <?php echo esc_html(get_the_date()); ?>
        </time>
    </span>
    
    <span class="byline">
        <span class="author vcard">
            <span class="screen-reader-text"><?php _e('Author', 'zenstarter'); ?></span>
            <?php _e('by', 'zenstarter'); ?>
            <a class="url fn n" href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>">
                <?php echo esc_html(get_the_author()); ?>
            </a>
        </span>
    </span>
    
    <?php if (has_category()) : ?>
        <span class="cat-links">
            <span class="screen-reader-text"><?php _e('Categories', 'zenstarter'); ?></span>
            <?php
            /* translators: used between list items, there is a space after the comma */
            $categories_list = get_the_category_list(esc_html__(', ', 'zenstarter'));
            if ($categories_list) {
                printf('<span class="categories-list">%1$s</span>', $categories_list);
            }
            ?>
        </span>
    <?php endif; ?>
    
    <?php if (comments_open() || get_comments_number()) : ?>
        <span class="comments-link">
            <?php
            comments_popup_link(
                sprintf(
                    wp_kses(
                        /* translators: %s: post title */
                        __('Leave a Comment<span class="screen-reader-text"> on %s</span>', 'zenstarter'),
                        array('span' => array('class' => array()))
                    ),
                    get_the_title()
                )
            );
            ?>
        </span>
    <?php endif; ?>
    
    <?php
    // Edit post link
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
    
</div><!-- .entry-meta-items -->