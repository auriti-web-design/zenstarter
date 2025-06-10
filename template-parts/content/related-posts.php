<?php
/**
 * Template part for displaying related posts
 *
 * Intelligent related posts with multiple algorithms:
 * 1. Same categories (primary)
 * 2. Same tags (secondary)
 * 3. Recent posts (fallback)
 *
 * @package Zenstarter
 * @subpackage Blog
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Check if related posts should be displayed
if (!apply_filters('zenstarter_show_related_posts', true)) {
    return;
}

// Only show related posts on single post pages (unless overridden)
if (!is_single() && !apply_filters('zenstarter_force_related_posts', false)) {
    return;
}

$current_post_id = get_the_ID();

// Configuration options (customizable via filters)
$posts_per_page = apply_filters('zenstarter_related_posts_count', 3);
$title_level = apply_filters('zenstarter_related_posts_title_level', 'h3');
$excerpt_length = apply_filters('zenstarter_related_posts_excerpt_length', 15);
$show_thumbnails = apply_filters('zenstarter_related_posts_show_thumbnails', true);
$show_dates = apply_filters('zenstarter_related_posts_show_dates', true);

// Try to get cached related posts first
$cache_key = 'zenstarter_related_posts_' . $current_post_id;
$related_posts = wp_cache_get($cache_key);

if (false === $related_posts) {
    $related_posts = zenstarter_get_related_posts($current_post_id, $posts_per_page);
    // Cache for 1 hour
    wp_cache_set($cache_key, $related_posts, '', HOUR_IN_SECONDS);
}

if (!$related_posts || !$related_posts->have_posts()) {
    return;
}

// Get relationship type for styling
$relationship_type = get_query_var('related_posts_type', 'category');

$section_classes = apply_filters('zenstarter_related_posts_classes', array(
    'related-posts',
    'related-posts-' . $relationship_type,
    'related-posts-count-' . $posts_per_page
));
?>

<section class="<?php echo esc_attr(implode(' ', $section_classes)); ?>">
    
    <?php 
    /**
     * Hook: zenstarter_related_posts_before
     * 
     * Add content before related posts section
     */
    do_action('zenstarter_related_posts_before', $current_post_id); 
    ?>
    
    <div class="related-posts-content">
        
        <header class="section-header">
            
            <?php 
            /**
             * Hook: zenstarter_related_posts_before_title
             */
            do_action('zenstarter_related_posts_before_title'); 
            ?>
            
            <?php printf(
                '<%s class="section-title">%s</%s>',
                $title_level,
                esc_html(apply_filters('zenstarter_related_posts_title', __('Related Posts', 'zenstarter'))),
                $title_level
            ); ?>
            
            <?php if (apply_filters('zenstarter_related_posts_show_subtitle', false)) : ?>
                <p class="section-subtitle">
                    <?php 
                    echo esc_html(apply_filters(
                        'zenstarter_related_posts_subtitle', 
                        __('You might also be interested in these articles', 'zenstarter')
                    )); 
                    ?>
                </p>
            <?php endif; ?>
            
            <?php 
            /**
             * Hook: zenstarter_related_posts_after_title
             */
            do_action('zenstarter_related_posts_after_title'); 
            ?>
            
        </header>
        
        <?php 
        /**
         * Hook: zenstarter_related_posts_before_grid
         */
        do_action('zenstarter_related_posts_before_grid'); 
        ?>
        
        <div class="related-posts-grid">
            
            <?php 
            $post_counter = 0;
            while ($related_posts->have_posts()) : 
                $related_posts->the_post(); 
                $post_counter++;
                
                // Get post relationship score for analytics
                $relationship_score = get_query_var('relationship_score', 0);
                
                $post_classes = apply_filters('zenstarter_related_post_classes', array(
                    'related-post-card',
                    'related-post-' . $post_counter,
                    has_post_thumbnail() ? 'has-thumbnail' : 'no-thumbnail',
                    'relationship-' . $relationship_type
                ));
            ?>
                
                <article id="related-post-<?php the_ID(); ?>" <?php post_class($post_classes); ?>>
                    
                    <?php 
                    /**
                     * Hook: zenstarter_related_post_before_content
                     */
                    do_action('zenstarter_related_post_before_content', get_the_ID()); 
                    ?>
                    
                    <?php if ($show_thumbnails && has_post_thumbnail()) : ?>
                        <div class="related-post-thumbnail">
                            
                            <?php 
                            /**
                             * Hook: zenstarter_related_post_before_thumbnail
                             */
                            do_action('zenstarter_related_post_before_thumbnail', get_the_ID()); 
                            ?>
                            
                            <a href="<?php the_permalink(); ?>" 
                               aria-label="<?php echo esc_attr(sprintf(__('Read: %s', 'zenstarter'), get_the_title())); ?>"
                               class="related-post-thumbnail-link">
                                <?php 
                                the_post_thumbnail('zenstarter-thumbnail', array(
                                    'loading' => 'lazy',
                                    'alt' => the_title_attribute(array('echo' => false)),
                                    'class' => 'related-post-image'
                                )); 
                                ?>
                                
                                <?php if (apply_filters('zenstarter_related_posts_show_overlay', true)) : ?>
                                    <div class="related-post-overlay">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                                        </svg>
                                    </div>
                                <?php endif; ?>
                            </a>
                            
                            <?php 
                            /**
                             * Hook: zenstarter_related_post_after_thumbnail
                             */
                            do_action('zenstarter_related_post_after_thumbnail', get_the_ID()); 
                            ?>
                            
                        </div>
                    <?php endif; ?>
                    
                    <div class="related-post-content">
                        
                        <?php 
                        /**
                         * Hook: zenstarter_related_post_before_title
                         */
                        do_action('zenstarter_related_post_before_title', get_the_ID()); 
                        ?>
                        
                        <header class="related-post-header">
                            <?php
                            the_title(
                                '<h4 class="related-post-title"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">',
                                '</a></h4>'
                            );
                            ?>
                            
                            <?php if ($show_dates || apply_filters('zenstarter_related_posts_show_meta', false)) : ?>
                                <div class="related-post-meta">
                                    
                                    <?php if ($show_dates) : ?>
                                        <time class="related-post-date" datetime="<?php echo esc_attr(get_the_date('c')); ?>">
                                            <?php echo esc_html(get_the_date()); ?>
                                        </time>
                                    <?php endif; ?>
                                    
                                    <?php if (apply_filters('zenstarter_related_posts_show_reading_time', false)) : ?>
                                        <span class="reading-time">
                                            <?php 
                                            $reading_time = zenstarter_get_reading_time(get_the_ID());
                                            printf(
                                                /* translators: %d: reading time in minutes */
                                                _n('%d min read', '%d min read', $reading_time, 'zenstarter'),
                                                $reading_time
                                            );
                                            ?>
                                        </span>
                                    <?php endif; ?>
                                    
                                    <?php 
                                    /**
                                     * Hook: zenstarter_related_post_meta
                                     */
                                    do_action('zenstarter_related_post_meta', get_the_ID()); 
                                    ?>
                                    
                                </div>
                            <?php endif; ?>
                        </header>
                        
                        <?php if (apply_filters('zenstarter_related_posts_show_excerpt', true)) : ?>
                            <div class="related-post-excerpt">
                                <?php
                                /**
                                 * Hook: zenstarter_related_post_before_excerpt
                                 */
                                do_action('zenstarter_related_post_before_excerpt', get_the_ID());
                                
                                $excerpt = '';
                                if (has_excerpt()) {
                                    $excerpt = wp_trim_words(get_the_excerpt(), $excerpt_length, '...');
                                } else {
                                    $excerpt = wp_trim_words(get_the_content(), $excerpt_length, '...');
                                }
                                
                                echo wp_kses_post(apply_filters('zenstarter_related_post_excerpt', $excerpt, get_the_ID()));
                                
                                /**
                                 * Hook: zenstarter_related_post_after_excerpt
                                 */
                                do_action('zenstarter_related_post_after_excerpt', get_the_ID());
                                ?>
                            </div>
                        <?php endif; ?>
                        
                        <?php if (apply_filters('zenstarter_related_posts_show_categories', false)) : ?>
                            <?php
                            $categories = get_the_category();
                            if (!empty($categories)) :
                            ?>
                                <div class="related-post-categories">
                                    <?php foreach ($categories as $category) : ?>
                                        <a href="<?php echo esc_url(get_category_link($category->term_id)); ?>" 
                                           class="related-post-category">
                                            <?php echo esc_html($category->name); ?>
                                        </a>
                                    <?php endforeach; ?>
                                </div>
                            <?php endif; ?>
                        <?php endif; ?>
                        
                    </div>
                    
                    <?php 
                    /**
                     * Hook: zenstarter_related_post_after_content
                     */
                    do_action('zenstarter_related_post_after_content', get_the_ID()); 
                    ?>
                    
                </article>
                
            <?php endwhile; ?>
            
        </div>
        
        <?php 
        /**
         * Hook: zenstarter_related_posts_after_grid
         */
        do_action('zenstarter_related_posts_after_grid'); 
        ?>
        
    </div>
    
    <?php 
    /**
     * Hook: zenstarter_related_posts_after
     */
    do_action('zenstarter_related_posts_after', $current_post_id); 
    ?>
    
</section><!-- .related-posts -->

<?php
wp_reset_postdata();

/**
 * Get related posts with intelligent algorithms
 *
 * @param int $post_id Current post ID
 * @param int $posts_per_page Number of posts to retrieve
 * @return WP_Query|false Related posts query or false if none found
 */
function zenstarter_get_related_posts($post_id, $posts_per_page = 3) {
    
    // Try cache first
    $cache_key = "related_posts_{$post_id}_{$posts_per_page}";
    $cached_query = wp_cache_get($cache_key, 'zenstarter_related');
    
    if (false !== $cached_query) {
        return $cached_query;
    }
    
    $related_posts = false;
    
    // Method 1: Same categories
    $categories = get_the_category($post_id);
    if (!empty($categories)) {
        $category_ids = wp_list_pluck($categories, 'term_id');
        
        $related_posts = new WP_Query(array(
            'post_type' => 'post',
            'posts_per_page' => $posts_per_page,
            'post_status' => 'publish',
            'post__not_in' => array($post_id),
            'category__in' => $category_ids,
            'orderby' => 'rand',
            'ignore_sticky_posts' => true,
            'meta_query' => array(
                'relation' => 'OR',
                array(
                    'key' => '_thumbnail_id',
                    'compare' => 'EXISTS'
                ),
                array(
                    'key' => '_thumbnail_id',
                    'compare' => 'NOT EXISTS'
                )
            )
        ));
        
        if ($related_posts->have_posts()) {
            set_query_var('related_posts_type', 'category');
            wp_cache_set($cache_key, $related_posts, 'zenstarter_related', HOUR_IN_SECONDS);
            return $related_posts;
        }
    }
    
    // Method 2: Same tags
    $tags = get_the_tags($post_id);
    if (!empty($tags)) {
        $tag_ids = wp_list_pluck($tags, 'term_id');
        
        $related_posts = new WP_Query(array(
            'post_type' => 'post',
            'posts_per_page' => $posts_per_page,
            'post_status' => 'publish',
            'post__not_in' => array($post_id),
            'tag__in' => $tag_ids,
            'orderby' => 'rand',
            'ignore_sticky_posts' => true
        ));
        
        if ($related_posts->have_posts()) {
            set_query_var('related_posts_type', 'tag');
            wp_cache_set($cache_key, $related_posts, 'zenstarter_related', HOUR_IN_SECONDS);
            return $related_posts;
        }
    }
    
    // Method 3: Recent posts (fallback)
    $related_posts = new WP_Query(array(
        'post_type' => 'post',
        'posts_per_page' => $posts_per_page,
        'post_status' => 'publish',
        'post__not_in' => array($post_id),
        'orderby' => 'date',
        'order' => 'DESC',
        'ignore_sticky_posts' => true
    ));
    
    if ($related_posts->have_posts()) {
        set_query_var('related_posts_type', 'recent');
        wp_cache_set($cache_key, $related_posts, 'zenstarter_related', HOUR_IN_SECONDS);
        return $related_posts;
    }
    
    return false;
}

/**
 * Get estimated reading time for a post
 *
 * @param int $post_id Post ID
 * @return int Reading time in minutes
 */
function zenstarter_get_reading_time($post_id = null) {
    if (!$post_id) {
        $post_id = get_the_ID();
    }
    
    $content = get_post_field('post_content', $post_id);
    $word_count = str_word_count(wp_strip_all_tags($content));
    
    // Average reading speed: 200 words per minute
    $reading_time = ceil($word_count / 200);
    
    return max(1, $reading_time); // Minimum 1 minute
}
?>