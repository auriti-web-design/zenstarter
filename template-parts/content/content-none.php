<?php
/**
 * Template part for displaying a message that posts cannot be found
 *
 * @package Zenstarter
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<section class="no-results not-found">
    
    <header class="page-header">
        <h1 class="page-title">
            <?php esc_html_e('Nothing Found', 'zenstarter'); ?>
        </h1>
    </header>
    
    <div class="page-content">
        
        <?php if (is_home() && current_user_can('publish_posts')) : ?>
            
            <p>
                <?php
                printf(
                    wp_kses(
                        /* translators: 1: link to WP admin new post page. */
                        __('Ready to publish your first post? <a href="%1$s">Get started here</a>.', 'zenstarter'),
                        array('a' => array('href' => array()))
                    ),
                    esc_url(admin_url('post-new.php'))
                );
                ?>
            </p>
            
        <?php elseif (is_search()) : ?>
            
            <p><?php esc_html_e('Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'zenstarter'); ?></p>
            
            <div class="search-form-container">
                <?php get_search_form(); ?>
            </div>
            
            <?php
            // Show popular tags or categories as suggestions
            $popular_tags = get_tags(array(
                'orderby' => 'count',
                'order' => 'DESC',
                'number' => 10,
                'hide_empty' => true
            ));
            
            if ($popular_tags) :
            ?>
                <div class="search-suggestions">
                    <h3><?php esc_html_e('Popular Tags:', 'zenstarter'); ?></h3>
                    <div class="tag-cloud">
                        <?php foreach ($popular_tags as $tag) : ?>
                            <a href="<?php echo esc_url(get_tag_link($tag->term_id)); ?>" class="tag-link">
                                <?php echo esc_html($tag->name); ?>
                            </a>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endif; ?>
            
        <?php elseif (is_category()) : ?>
            
            <p><?php esc_html_e('It seems we can&rsquo;t find any posts in this category. Perhaps try browsing other categories?', 'zenstarter'); ?></p>
            
            <?php
            // Show other categories
            $categories = get_categories(array(
                'orderby' => 'count',
                'order' => 'DESC',
                'number' => 5,
                'hide_empty' => true,
                'exclude' => get_queried_object_id()
            ));
            
            if ($categories) :
            ?>
                <div class="category-suggestions">
                    <h3><?php esc_html_e('Browse Other Categories:', 'zenstarter'); ?></h3>
                    <ul class="category-list">
                        <?php foreach ($categories as $category) : ?>
                            <li>
                                <a href="<?php echo esc_url(get_category_link($category->term_id)); ?>">
                                    <?php echo esc_html($category->name); ?>
                                    <span class="category-count">(<?php echo esc_html($category->count); ?>)</span>
                                </a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>
            
        <?php else : ?>
            
            <p><?php esc_html_e('It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'zenstarter'); ?></p>
            
            <div class="search-form-container">
                <?php get_search_form(); ?>
            </div>
            
        <?php endif; ?>
        
        <div class="helpful-links">
            <h3><?php esc_html_e('Helpful Links:', 'zenstarter'); ?></h3>
            <ul>
                <li><a href="<?php echo esc_url(home_url('/')); ?>"><?php esc_html_e('Home Page', 'zenstarter'); ?></a></li>
                <?php if (get_option('page_for_posts')) : ?>
                    <li><a href="<?php echo esc_url(get_permalink(get_option('page_for_posts'))); ?>"><?php esc_html_e('Blog', 'zenstarter'); ?></a></li>
                <?php endif; ?>
                <li><a href="<?php echo esc_url(wp_get_archives('type=monthly&format=link&limit=1&echo=0')); ?>"><?php esc_html_e('Recent Posts', 'zenstarter'); ?></a></li>
            </ul>
        </div>
        
    </div>
    
</section><!-- .no-results -->