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

// Only show filters on category or tag archives
if (!is_category() && !is_tag()) {
    return;
}
?>

<div class="archive-filters">
    
    <div class="filter-group">
        
        <label for="archive-sort" class="filter-label">
            <?php esc_html_e('Sort by:', 'zenstarter'); ?>
        </label>
        
        <select id="archive-sort" class="filter-select" onchange="location = this.value;">
            
            <option value="<?php echo esc_url(remove_query_arg('orderby')); ?>" <?php selected(!isset($_GET['orderby'])); ?>>
                <?php esc_html_e('Latest', 'zenstarter'); ?>
            </option>
            
            <option value="<?php echo esc_url(add_query_arg('orderby', 'title')); ?>" <?php selected(isset($_GET['orderby']) && $_GET['orderby'] === 'title'); ?>>
                <?php esc_html_e('Title A-Z', 'zenstarter'); ?>
            </option>
            
            <option value="<?php echo esc_url(add_query_arg('orderby', 'comment_count')); ?>" <?php selected(isset($_GET['orderby']) && $_GET['orderby'] === 'comment_count'); ?>>
                <?php esc_html_e('Most Commented', 'zenstarter'); ?>
            </option>
            
        </select>
        
    </div>
    
    <?php if (is_category()) : ?>
        <div class="filter-group">
            
            <span class="filter-label">
                <?php esc_html_e('Related categories:', 'zenstarter'); ?>
            </span>
            
            <?php
            // Get child categories of current category
            $current_cat = get_queried_object();
            $child_categories = get_categories(array(
                'parent' => $current_cat->term_id,
                'hide_empty' => true,
                'number' => 5
            ));
            
            if ($child_categories) :
            ?>
                <div class="category-filters">
                    <?php foreach ($child_categories as $child_cat) : ?>
                        <a href="<?php echo esc_url(get_category_link($child_cat->term_id)); ?>" class="category-filter">
                            <?php echo esc_html($child_cat->name); ?>
                            <span class="category-count">(<?php echo esc_html($child_cat->count); ?>)</span>
                        </a>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
            
        </div>
    <?php endif; ?>
    
</div><!-- .archive-filters -->