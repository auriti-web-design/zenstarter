<?php
/**
 * Template part for displaying archive filters
 *
 * @package Zenstarter
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Only show filters on archive pages
if (!is_archive() && !is_home()) {
    return;
}

// Get current query object
$queried_object = get_queried_object();
$current_filter = '';
$filter_type = '';

if (is_category()) {
    $current_filter = $queried_object->slug;
    $filter_type = 'category';
} elseif (is_tag()) {
    $current_filter = $queried_object->slug;
    $filter_type = 'tag';
} elseif (is_author()) {
    $current_filter = $queried_object->user_nicename;
    $filter_type = 'author';
}
?>

<div class="archive-filters">
    
    <?php
    /**
     * Hook: zenstarter_before_archive_filters
     */
    do_action('zenstarter_before_archive_filters');
    ?>
    
    <div class="archive-filters-content">
        
        <?php if (is_category() || is_home()) : ?>
            
            <div class="filter-group filter-categories">
                <h4 class="filter-title"><?php esc_html_e('Categories', 'zenstarter'); ?></h4>
                
                <div class="filter-options">
                    <a href="<?php echo esc_url(get_permalink(get_option('page_for_posts'))); ?>" 
                       class="filter-option <?php echo (!is_category()) ? 'is-active' : ''; ?>">
                        <?php esc_html_e('All Posts', 'zenstarter'); ?>
                    </a>
                    
                    <?php
                    $categories = get_categories(array(
                        'orderby' => 'count',
                        'order' => 'DESC',
                        'number' => 10,
                        'hide_empty' => true,
                    ));
                    
                    if (!empty($categories)) :
                        foreach ($categories as $category) :
                            $is_active = (is_category() && $category->slug === $current_filter);
                    ?>
                        <a href="<?php echo esc_url(get_category_link($category->term_id)); ?>" 
                           class="filter-option <?php echo $is_active ? 'is-active' : ''; ?>">
                            <?php echo esc_html($category->name); ?>
                            <span class="filter-count">(<?php echo esc_html($category->count); ?>)</span>
                        </a>
                    <?php
                        endforeach;
                    endif;
                    ?>
                </div>
                
            </div>
            
        <?php endif; ?>
        
        <?php if (is_tag() || (!is_category() && !is_author())) : ?>
            
            <div class="filter-group filter-tags">
                <h4 class="filter-title"><?php esc_html_e('Popular Tags', 'zenstarter'); ?></h4>
                
                <div class="filter-options filter-tags-list">
                    <?php
                    $tags = get_tags(array(
                        'orderby' => 'count',
                        'order' => 'DESC',
                        'number' => 15,
                        'hide_empty' => true,
                    ));
                    
                    if (!empty($tags)) :
                        foreach ($tags as $tag) :
                            $is_active = (is_tag() && $tag->slug === $current_filter);
                    ?>
                        <a href="<?php echo esc_url(get_tag_link($tag->term_id)); ?>" 
                           class="filter-tag <?php echo $is_active ? 'is-active' : ''; ?>">
                            <?php echo esc_html($tag->name); ?>
                        </a>
                    <?php
                        endforeach;
                    endif;
                    ?>
                </div>
                
            </div>
            
        <?php endif; ?>
        
        <?php if (apply_filters('zenstarter_show_archive_search', true)) : ?>
            
            <div class="filter-group filter-search">
                <h4 class="filter-title"><?php esc_html_e('Search Posts', 'zenstarter'); ?></h4>
                
                <form role="search" method="get" class="archive-search-form" action="<?php echo esc_url(home_url('/')); ?>">
                    <label class="screen-reader-text" for="archive-search-field">
                        <?php esc_html_e('Search for:', 'zenstarter'); ?>
                    </label>
                    <input type="search" 
                           id="archive-search-field" 
                           class="search-field" 
                           placeholder="<?php esc_attr_e('Search posts...', 'zenstarter'); ?>" 
                           value="<?php echo get_search_query(); ?>" 
                           name="s" />
                    <button type="submit" class="search-submit">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        </svg>
                        <span class="screen-reader-text"><?php esc_html_e('Search', 'zenstarter'); ?></span>
                    </button>
                </form>
                
            </div>
            
        <?php endif; ?>
        
        <?php if (apply_filters('zenstarter_show_archive_sorting', true)) : ?>
            
            <div class="filter-group filter-sort">
                <h4 class="filter-title"><?php esc_html_e('Sort By', 'zenstarter'); ?></h4>
                
                <div class="filter-options">
                    <?php
                    $current_order = isset($_GET['orderby']) ? sanitize_text_field($_GET['orderby']) : 'date';
                    $sort_options = array(
                        'date' => __('Latest', 'zenstarter'),
                        'title' => __('Title A-Z', 'zenstarter'),
                        'comment_count' => __('Most Discussed', 'zenstarter'),
                        'menu_order' => __('Featured', 'zenstarter'),
                    );
                    
                    foreach ($sort_options as $value => $label) :
                        $sort_url = add_query_arg('orderby', $value, get_pagenum_link(1));
                        $is_active = ($current_order === $value);
                    ?>
                        <a href="<?php echo esc_url($sort_url); ?>" 
                           class="filter-option <?php echo $is_active ? 'is-active' : ''; ?>">
                            <?php echo esc_html($label); ?>
                        </a>
                    <?php endforeach; ?>
                </div>
                
            </div>
            
        <?php endif; ?>
        
    </div>
    
    <?php
    /**
     * Hook: zenstarter_after_archive_filters
     */
    do_action('zenstarter_after_archive_filters');
    ?>
    
</div><!-- .archive-filters -->