<?php
/**
 * Template part for displaying author bio
 *
 * @package Zenstarter
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

$author_description = get_the_author_meta('description');
if (!$author_description) {
    return;
}
?>

<section class="author-bio">
    <div class="author-bio-content">
        
        <header class="author-bio-header">
            <div class="author-avatar">
                <a href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>">
                    <?php echo get_avatar(get_the_author_meta('ID'), 80); ?>
                </a>
            </div>
            
            <div class="author-info">
                <h3 class="author-name">
                    <a href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>">
                        <?php echo esc_html(get_the_author()); ?>
                    </a>
                </h3>
                
                <?php
                // Author website
                $author_website = get_the_author_meta('user_url');
                if ($author_website) :
                ?>
                    <div class="author-website">
                        <a href="<?php echo esc_url($author_website); ?>" target="_blank" rel="noopener noreferrer">
                            <?php echo esc_html(parse_url($author_website, PHP_URL_HOST)); ?>
                        </a>
                    </div>
                <?php endif; ?>
            </div>
        </header>
        
        <div class="author-description">
            <p><?php echo esc_html($author_description); ?></p>
        </div>
        
        <footer class="author-bio-footer">
            <a href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>" class="author-posts-link">
                <?php
                printf(
                    /* translators: %s: author name */
                    esc_html__('View all posts by %s', 'zenstarter'),
                    '<span>' . esc_html(get_the_author()) . '</span>'
                );
                ?>
            </a>
        </footer>
        
    </div>
</section><!-- .author-bio -->