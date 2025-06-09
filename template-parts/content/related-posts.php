<?php
/**
 * Template part for displaying related posts
 *
 * @package Zenstarter
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Only show related posts on single post pages
if (!is_single()) {
    return;
}

// Get related posts based on categories
$current_post_id = get_the_ID();
$categories = get_the_category($current_post_id);

if (empty($categories)) {
    return;
}

$category_ids = array();
foreach ($categories as $category) {
    $category_ids[] = $category->term_id;
}

$related_posts = new WP_Query(array(
    'post_type' => 'post',
    'posts_per_page' => 3,
    'post_status' => 'publish',
    'post__not_in' => array($current_post_id),
    'category__in' => $category_ids,
    'orderby' => 'rand',
    'ignore_sticky_posts' => true
));

if (!$related_posts->have_posts()) {
    return;
}
?>

<section class="related-posts">
    <div class="related-posts-content">
        
        <header class="section-header">
            <h3 class="section-title">
                <?php esc_html_e('Related Posts', 'zenstarter'); ?>
            </h3>
        </header>
        
        <div class="related-posts-grid grid grid--3-cols">
            
            <?php while ($related_posts->have_posts()) : $related_posts->the_post(); ?>
                
                <article id="post-<?php the_ID(); ?>" <?php post_class('related-post-card'); ?>>
                    
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="related-post-thumbnail">
                            <a href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
                                <?php 
                                the_post_thumbnail('zenstarter-thumbnail', array(
                                    'loading' => 'lazy',
                                    'alt' => the_title_attribute(array('echo' => false))
                                )); 
                                ?>
                            </a>
                        </div>
                    <?php endif; ?>
                    
                    <div class="related-post-content">
                        
                        <header class="related-post-header">
                            <?php
                            the_title(
                                '<h4 class="related-post-title"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">',
                                '</a></h4>'
                            );
                            ?>
                            
                            <div class="related-post-meta">
                                <time class="related-post-date" datetime="<?php echo esc_attr(get_the_date('c')); ?>">
                                    <?php echo esc_html(get_the_date()); ?>
                                </time>
                            </div>
                        </header>
                        
                        <div class="related-post-excerpt">
                            <?php
                            if (has_excerpt()) {
                                echo wp_trim_words(get_the_excerpt(), 15, '...');
                            } else {
                                echo wp_trim_words(get_the_content(), 15, '...');
                            }
                            ?>
                        </div>
                        
                    </div>
                    
                </article>
                
            <?php endwhile; ?>
            
        </div>
        
    </div>
</section><!-- .related-posts -->

<?php
wp_reset_postdata();
?>