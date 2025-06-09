<?php
/**
 * Template part for displaying post excerpts
 *
 * @package Zenstarter
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('post-card'); ?>>
    
    <?php if (has_post_thumbnail()) : ?>
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
    
    <div class="post-content">
        
        <header class="entry-header">
            
            <?php if ('post' === get_post_type()) : ?>
                <div class="entry-meta">
                    <time class="entry-date published" datetime="<?php echo esc_attr(get_the_date('c')); ?>">
                        <?php echo esc_html(get_the_date()); ?>
                    </time>
                    
                    <?php if (has_category()) : ?>
                        <span class="cat-links">
                            <?php
                            $categories = get_the_category();
                            if (!empty($categories)) {
                                echo '<a href="' . esc_url(get_category_link($categories[0]->term_id)) . '">' . 
                                     esc_html($categories[0]->name) . '</a>';
                            }
                            ?>
                        </span>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
            
            <?php
            the_title(
                '<h3 class="entry-title"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">',
                '</a></h3>'
            );
            ?>
            
        </header>
        
        <div class="entry-summary">
            <?php
            // Use custom excerpt or auto-generated one
            if (has_excerpt()) {
                the_excerpt();
            } else {
                echo wp_trim_words(get_the_content(), 20, '...');
            }
            ?>
        </div>
        
        <footer class="entry-footer">
            <a href="<?php the_permalink(); ?>" class="read-more">
                <?php esc_html_e('Read More', 'zenstarter'); ?>
                <span class="screen-reader-text"> "<?php the_title(); ?>"</span>
            </a>
            
            <?php if ('post' === get_post_type()) : ?>
                <div class="entry-author">
                    <span class="author-avatar">
                        <?php echo get_avatar(get_the_author_meta('ID'), 24); ?>
                    </span>
                    <span class="author-name">
                        <a href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>">
                            <?php echo esc_html(get_the_author()); ?>
                        </a>
                    </span>
                </div>
            <?php endif; ?>
        </footer>
        
    </div>
    
</article><!-- #post-<?php the_ID(); ?> -->