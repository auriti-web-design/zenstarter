<?php
/**
 * Template part for displaying author bio
 *
 * Enhanced author bio with social links, post count, and customizable display options.
 * Can be controlled via theme customizer and action hooks.
 *
 * @package Zenstarter
 * @subpackage Blog
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Check if author bio should be displayed
if (!apply_filters('zenstarter_show_author_bio', true)) {
    return;
}

$author_id = get_the_author_meta('ID');
$author_description = get_the_author_meta('description');

// Don't display if no description (unless forced by filter)
if (!$author_description && !apply_filters('zenstarter_force_author_bio', false)) {
    return;
}

// Get additional author meta
$author_name = get_the_author();
$author_posts_url = get_author_posts_url($author_id);
$author_website = get_the_author_meta('user_url');
$author_posts_count = count_user_posts($author_id);

// Avatar size (customizable via filter)
$avatar_size = apply_filters('zenstarter_author_bio_avatar_size', 80);

// Custom bio classes
$bio_classes = apply_filters('zenstarter_author_bio_classes', array(
    'author-bio',
    'author-bio-' . $author_id,
    is_single() ? 'author-bio-single' : 'author-bio-archive'
));
?>

<section class="<?php echo esc_attr(implode(' ', $bio_classes)); ?>" itemscope itemtype="https://schema.org/Person">
    
    <?php 
    /**
     * Hook: zenstarter_author_bio_before
     * 
     * Add content before the author bio
     */
    do_action('zenstarter_author_bio_before', $author_id); 
    ?>
    
    <div class="author-bio-content">
        
        <header class="author-bio-header">
            
            <?php if (apply_filters('zenstarter_author_bio_show_avatar', true)) : ?>
                <div class="author-avatar">
                    <a href="<?php echo esc_url($author_posts_url); ?>" 
                       aria-label="<?php echo esc_attr(sprintf(__('View all posts by %s', 'zenstarter'), $author_name)); ?>">
                        <?php 
                        echo get_avatar($author_id, $avatar_size, '', '', array(
                            'class' => 'author-bio-avatar',
                            'loading' => 'lazy'
                        )); 
                        ?>
                    </a>
                </div>
            <?php endif; ?>
            
            <div class="author-info">
                
                <?php if (apply_filters('zenstarter_author_bio_show_name', true)) : ?>
                    <h3 class="author-name" itemprop="name">
                        <a href="<?php echo esc_url($author_posts_url); ?>" itemprop="url">
                            <?php echo esc_html($author_name); ?>
                        </a>
                    </h3>
                <?php endif; ?>
                
                <?php if (apply_filters('zenstarter_author_bio_show_role', true)) : ?>
                    <?php 
                    $author_role = '';
                    $user = get_userdata($author_id);
                    if ($user && !empty($user->roles)) {
                        $author_role = ucfirst($user->roles[0]);
                    }
                    
                    if ($author_role) : 
                    ?>
                        <div class="author-role" itemprop="jobTitle">
                            <?php echo esc_html($author_role); ?>
                        </div>
                    <?php endif; ?>
                <?php endif; ?>
                
                <?php if ($author_website && apply_filters('zenstarter_author_bio_show_website', true)) : ?>
                    <div class="author-website">
                        <a href="<?php echo esc_url($author_website); ?>" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           itemprop="url"
                           class="author-website-link">
                            <span class="screen-reader-text"><?php esc_html_e('Website:', 'zenstarter'); ?></span>
                            <?php echo esc_html(parse_url($author_website, PHP_URL_HOST)); ?>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                            </svg>
                        </a>
                    </div>
                <?php endif; ?>
                
                <?php if (apply_filters('zenstarter_author_bio_show_post_count', true)) : ?>
                    <div class="author-post-count">
                        <?php
                        printf(
                            /* translators: %d: number of posts */
                            _n('%d post', '%d posts', $author_posts_count, 'zenstarter'),
                            $author_posts_count
                        );
                        ?>
                    </div>
                <?php endif; ?>
                
            </div>
            
        </header>
        
        <?php if ($author_description && apply_filters('zenstarter_author_bio_show_description', true)) : ?>
            <div class="author-description" itemprop="description">
                <?php 
                /**
                 * Hook: zenstarter_author_bio_before_description
                 */
                do_action('zenstarter_author_bio_before_description', $author_id); 
                ?>
                
                <p><?php echo wp_kses_post($author_description); ?></p>
                
                <?php 
                /**
                 * Hook: zenstarter_author_bio_after_description
                 */
                do_action('zenstarter_author_bio_after_description', $author_id); 
                ?>
            </div>
        <?php endif; ?>
        
        <?php if (apply_filters('zenstarter_author_bio_show_social', true)) : ?>
            <?php 
            /**
             * Hook: zenstarter_author_bio_social_links
             * 
             * Display author social media links
             * Can be implemented by plugins or child themes
             */
            do_action('zenstarter_author_bio_social_links', $author_id); 
            ?>
        <?php endif; ?>
        
        <footer class="author-bio-footer">
            
            <?php 
            /**
             * Hook: zenstarter_author_bio_actions
             * 
             * Add action buttons like follow, contact, etc.
             */
            do_action('zenstarter_author_bio_actions', $author_id); 
            ?>
            
            <?php if (apply_filters('zenstarter_author_bio_show_posts_link', true)) : ?>
                <a href="<?php echo esc_url($author_posts_url); ?>" 
                   class="author-posts-link btn btn--outline btn--small">
                    <?php
                    printf(
                        /* translators: %s: author name */
                        esc_html__('View all posts by %s', 'zenstarter'),
                        '<span class="author-name-highlight">' . esc_html($author_name) . '</span>'
                    );
                    ?>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                    </svg>
                </a>
            <?php endif; ?>
            
        </footer>
        
    </div>
    
    <?php 
    /**
     * Hook: zenstarter_author_bio_after
     * 
     * Add content after the author bio
     */
    do_action('zenstarter_author_bio_after', $author_id); 
    ?>
    
</section><!-- .author-bio -->