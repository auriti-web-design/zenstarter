<?php
/**
 * Blog Hook System
 *
 * Centralized system for managing blog-related hooks and actions.
 * Provides easy customization and control over blog functionality.
 *
 * @package Zenstarter
 * @subpackage Blog
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Blog Hook Manager Class
 */
class Zenstarter_Blog_Hooks {
    
    /**
     * Constructor - Initialize blog hooks
     */
    public function __construct() {
        $this->init_loop_hooks();
        $this->init_author_bio_hooks();
        $this->init_related_posts_hooks();
        $this->init_blog_customization_hooks();
    }
    
    /**
     * Initialize loop-related hooks
     */
    private function init_loop_hooks() {
        // Default meta display for loop posts
        add_action('zenstarter_loop_post_meta', array($this, 'display_loop_post_meta'));
        
        // Default read more action
        add_action('zenstarter_loop_post_actions', array($this, 'display_read_more_link'));
        
        // Post format indicators
        add_action('zenstarter_loop_post_after_thumbnail', array($this, 'display_post_format_icon'));
        
        // Category chips before title
        add_action('zenstarter_loop_post_before_title', array($this, 'display_post_categories'));
    }
    
    /**
     * Initialize author bio hooks
     */
    private function init_author_bio_hooks() {
        // Social media links integration
        add_action('zenstarter_author_bio_social_links', array($this, 'display_author_social_links'));
        
        // Follow button
        add_action('zenstarter_author_bio_actions', array($this, 'display_author_follow_button'));
        
        // Author stats
        add_action('zenstarter_author_bio_after_description', array($this, 'display_author_stats'));
    }
    
    /**
     * Initialize related posts hooks
     */
    private function init_related_posts_hooks() {
        // Reading time indicator
        add_action('zenstarter_related_post_meta', array($this, 'display_related_post_reading_time'));
        
        // Category badges
        add_action('zenstarter_related_post_after_title', array($this, 'display_related_post_categories'));
        
        // Share button
        add_action('zenstarter_related_post_after_content', array($this, 'display_related_post_share_button'));
    }
    
    /**
     * Initialize blog customization hooks
     */
    private function init_blog_customization_hooks() {
        // Filters for customization
        add_filter('zenstarter_loop_post_classes', array($this, 'customize_loop_post_classes'), 10, 1);
        add_filter('zenstarter_related_posts_title', array($this, 'customize_related_posts_title'), 10, 1);
        add_filter('zenstarter_read_more_text', array($this, 'customize_read_more_text'), 10, 1);
        
        // Theme options integration
        add_filter('zenstarter_show_author_bio', array($this, 'theme_option_show_author_bio'));
        add_filter('zenstarter_show_related_posts', array($this, 'theme_option_show_related_posts'));
        add_filter('zenstarter_related_posts_count', array($this, 'theme_option_related_posts_count'));
    }
    
    /**
     * Display default loop post meta
     */
    public function display_loop_post_meta() {
        if (!apply_filters('zenstarter_show_loop_meta', true)) {
            return;
        }
        ?>
        <div class="entry-meta-items">
            <time class="entry-date" datetime="<?php echo esc_attr(get_the_date('c')); ?>">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
                <?php echo esc_html(get_the_date()); ?>
            </time>
            
            <span class="entry-author">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <a href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>">
                    <?php echo esc_html(get_the_author()); ?>
                </a>
            </span>
            
            <?php if (apply_filters('zenstarter_show_reading_time', false)) : ?>
                <span class="reading-time">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z"/>
                    </svg>
                    <?php 
                    $reading_time = zenstarter_get_reading_time();
                    printf(
                        /* translators: %d: reading time in minutes */
                        _n('%d min read', '%d min read', $reading_time, 'zenstarter'),
                        $reading_time
                    );
                    ?>
                </span>
            <?php endif; ?>
            
            <?php if (has_category() && apply_filters('zenstarter_show_loop_categories', false)) : ?>
                <span class="entry-categories">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M17.63,5.84C17.27,5.33 16.67,5 16,5L5,5.01C3.9,5.01 3,5.9 3,7V17C3,18.1 3.9,19 5,19H19C20.1,19 21,18.1 21,17V10.33C21,9.24 20.4,8.26 19.5,7.67L17.63,5.84Z"/>
                    </svg>
                    <?php the_category(', '); ?>
                </span>
            <?php endif; ?>
        </div>
        <?php
    }
    
    /**
     * Display default read more link
     */
    public function display_read_more_link() {
        ?>
        <a href="<?php the_permalink(); ?>" 
           class="read-more-link" 
           aria-label="<?php echo esc_attr(sprintf(__('Continue reading: %s', 'zenstarter'), get_the_title())); ?>">
            <?php echo esc_html(apply_filters('zenstarter_read_more_text', __('Continue Reading', 'zenstarter'))); ?>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
        </a>
        <?php
    }
    
    /**
     * Display post format icon
     */
    public function display_post_format_icon() {
        $post_format = get_post_format();
        
        if (!$post_format || !apply_filters('zenstarter_show_post_format_icons', true)) {
            return;
        }
        
        $icons = array(
            'video' => '<path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z"/>',
            'audio' => '<path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/>',
            'gallery' => '<path d="M22,16V4A2,2 0 0,0 20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16M11,12L13.03,14.71L16,11L20,16H8M2,6V20A2,2 0 0,0 4,22H18V20H4V6"/>',
            'quote' => '<path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z"/>',
            'link' => '<path d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z"/>',
            'status' => '<path d="M17,12V3A1,1 0 0,0 16,2H3A1,1 0 0,0 2,3V17L6,13H16A1,1 0 0,0 17,12M21,6H19V15H6V17A1,1 0 0,0 7,18H18L22,22V7A1,1 0 0,0 21,6Z"/>'
        );
        
        if (isset($icons[$post_format])) {
            printf(
                '<div class="post-format-icon post-format-icon-%s" title="%s">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        %s
                    </svg>
                </div>',
                esc_attr($post_format),
                esc_attr(sprintf(__('%s post', 'zenstarter'), ucfirst($post_format))),
                $icons[$post_format]
            );
        }
    }
    
    /**
     * Display post categories as chips
     */
    public function display_post_categories() {
        if (!has_category() || !apply_filters('zenstarter_show_category_chips', false)) {
            return;
        }
        
        $categories = get_the_category();
        if (empty($categories)) {
            return;
        }
        
        // Only show primary category for clean design
        $primary_category = $categories[0];
        ?>
        <div class="post-category-chip">
            <a href="<?php echo esc_url(get_category_link($primary_category->term_id)); ?>" 
               class="category-chip">
                <?php echo esc_html($primary_category->name); ?>
            </a>
        </div>
        <?php
    }
    
    /**
     * Display author social links
     */
    public function display_author_social_links($author_id) {
        if (!apply_filters('zenstarter_show_author_social', true)) {
            return;
        }
        
        // This can be extended to integrate with social media plugins
        // For now, we'll provide a hook for custom implementation
        ?>
        <div class="author-social-links">
            <?php 
            /**
             * Hook: zenstarter_author_social_links_custom
             * 
             * Allows custom implementation of social links
             * Can be implemented by plugins or child themes
             */
            do_action('zenstarter_author_social_links_custom', $author_id); 
            ?>
        </div>
        <?php
    }
    
    /**
     * Display author follow button
     */
    public function display_author_follow_button($author_id) {
        if (!apply_filters('zenstarter_show_author_follow', false)) {
            return;
        }
        
        // Placeholder for follow functionality
        // Can be implemented with membership plugins
        ?>
        <button class="author-follow-btn btn btn--primary btn--small" 
                data-author-id="<?php echo esc_attr($author_id); ?>">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            <?php esc_html_e('Follow', 'zenstarter'); ?>
        </button>
        <?php
    }
    
    /**
     * Display author statistics
     */
    public function display_author_stats($author_id) {
        if (!apply_filters('zenstarter_show_author_stats', false)) {
            return;
        }
        
        $post_count = count_user_posts($author_id);
        $member_since = get_userdata($author_id)->user_registered;
        ?>
        <div class="author-stats">
            <div class="author-stat">
                <strong><?php echo esc_html(number_format_i18n($post_count)); ?></strong>
                <span><?php echo esc_html(_n('Post', 'Posts', $post_count, 'zenstarter')); ?></span>
            </div>
            <div class="author-stat">
                <strong><?php echo esc_html(date('Y', strtotime($member_since))); ?></strong>
                <span><?php esc_html_e('Member Since', 'zenstarter'); ?></span>
            </div>
        </div>
        <?php
    }
    
    /**
     * Display reading time for related posts
     */
    public function display_related_post_reading_time($post_id) {
        if (!apply_filters('zenstarter_show_related_reading_time', false)) {
            return;
        }
        
        $reading_time = zenstarter_get_reading_time($post_id);
        ?>
        <span class="reading-time">
            <?php 
            printf(
                /* translators: %d: reading time in minutes */
                _n('%d min', '%d min', $reading_time, 'zenstarter'),
                $reading_time
            );
            ?>
        </span>
        <?php
    }
    
    /**
     * Display categories for related posts
     */
    public function display_related_post_categories($post_id) {
        if (!apply_filters('zenstarter_show_related_categories', false)) {
            return;
        }
        
        $categories = get_the_category($post_id);
        if (empty($categories)) {
            return;
        }
        
        $primary_category = $categories[0];
        ?>
        <div class="related-post-category">
            <a href="<?php echo esc_url(get_category_link($primary_category->term_id)); ?>" 
               class="category-link">
                <?php echo esc_html($primary_category->name); ?>
            </a>
        </div>
        <?php
    }
    
    /**
     * Display share button for related posts
     */
    public function display_related_post_share_button($post_id) {
        if (!apply_filters('zenstarter_show_related_share', false)) {
            return;
        }
        
        ?>
        <div class="related-post-share">
            <button class="share-btn" data-post-id="<?php echo esc_attr($post_id); ?>">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z"/>
                </svg>
                <span class="screen-reader-text"><?php esc_html_e('Share this post', 'zenstarter'); ?></span>
            </button>
        </div>
        <?php
    }
    
    /**
     * Customize loop post classes
     */
    public function customize_loop_post_classes($classes) {
        // Add reading time class if enabled
        if (apply_filters('zenstarter_show_reading_time', false)) {
            $reading_time = zenstarter_get_reading_time();
            $classes[] = 'reading-time-' . $reading_time;
        }
        
        // Add featured class for sticky posts
        if (is_sticky()) {
            $classes[] = 'is-featured';
        }
        
        return $classes;
    }
    
    /**
     * Customize related posts title
     */
    public function customize_related_posts_title($title) {
        // Allow customization via theme options
        $custom_title = get_theme_mod('related_posts_title', '');
        
        if (!empty($custom_title)) {
            return $custom_title;
        }
        
        return $title;
    }
    
    /**
     * Customize read more text
     */
    public function customize_read_more_text($text) {
        // Allow customization via theme options
        $custom_text = get_theme_mod('read_more_text', '');
        
        if (!empty($custom_text)) {
            return $custom_text;
        }
        
        return $text;
    }
    
    /**
     * Theme option: Show author bio
     */
    public function theme_option_show_author_bio($show) {
        return get_theme_mod('show_author_bio', $show);
    }
    
    /**
     * Theme option: Show related posts
     */
    public function theme_option_show_related_posts($show) {
        return get_theme_mod('show_related_posts', $show);
    }
    
    /**
     * Theme option: Related posts count
     */
    public function theme_option_related_posts_count($count) {
        return get_theme_mod('related_posts_count', $count);
    }
}

// Initialize Blog Hooks
new Zenstarter_Blog_Hooks();

/**
 * Helper functions for theme customization
 */

/**
 * Disable author bio globally
 */
function zenstarter_disable_author_bio() {
    add_filter('zenstarter_show_author_bio', '__return_false');
}

/**
 * Disable related posts globally
 */
function zenstarter_disable_related_posts() {
    add_filter('zenstarter_show_related_posts', '__return_false');
}

/**
 * Enable reading time display
 */
function zenstarter_enable_reading_time() {
    add_filter('zenstarter_show_reading_time', '__return_true');
    add_filter('zenstarter_show_related_reading_time', '__return_true');
}

/**
 * Enable category chips
 */
function zenstarter_enable_category_chips() {
    add_filter('zenstarter_show_category_chips', '__return_true');
}

/**
 * Enable post format icons
 */
function zenstarter_enable_post_format_icons() {
    add_filter('zenstarter_show_post_format_icons', '__return_true');
}