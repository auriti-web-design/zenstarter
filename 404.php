<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package Zenstarter
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

get_header(); ?>

<main id="main-content" class="site-main" role="main">
    <div class="container">
        
        <?php 
        /**
         * Hook: zenstarter_before_404_content
         * 
         * @hooked - none by default
         */
        do_action('zenstarter_before_404_content'); 
        ?>
        
        <section class="error-404 not-found">
            
            <header class="page-header">
                <h1 class="page-title">
                    <?php esc_html_e('Oops! That page can&rsquo;t be found.', 'zenstarter'); ?>
                </h1>
                
                <div class="error-code">
                    <span class="error-number">404</span>
                    <span class="error-message"><?php esc_html_e('Page Not Found', 'zenstarter'); ?></span>
                </div>
            </header>
            
            <div class="page-content">
                
                <div class="error-description">
                    <p>
                        <?php esc_html_e('It looks like nothing was found at this location. The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.', 'zenstarter'); ?>
                    </p>
                </div>
                
                <div class="error-actions">
                    
                    <!-- Search Form -->
                    <div class="search-section">
                        <h2><?php esc_html_e('Try searching for what you need:', 'zenstarter'); ?></h2>
                        <div class="search-form-wrapper">
                            <?php get_search_form(); ?>
                        </div>
                    </div>
                    
                    <!-- Quick Navigation -->
                    <div class="quick-nav-section">
                        <h2><?php esc_html_e('Quick Navigation:', 'zenstarter'); ?></h2>
                        <div class="quick-nav-links">
                            
                            <a href="<?php echo esc_url(home_url('/')); ?>" class="btn btn--primary">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
                                </svg>
                                <?php esc_html_e('Go to Homepage', 'zenstarter'); ?>
                            </a>
                            
                            <?php if (get_option('page_for_posts')) : ?>
                                <a href="<?php echo esc_url(get_permalink(get_option('page_for_posts'))); ?>" class="btn btn--outline">
                                    <?php esc_html_e('View Blog', 'zenstarter'); ?>
                                </a>
                            <?php endif; ?>
                            
                            <button onclick="history.back()" class="btn btn--outline">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                                <?php esc_html_e('Go Back', 'zenstarter'); ?>
                            </button>
                            
                        </div>
                    </div>
                    
                </div>
                
                <!-- Helpful Content -->
                <div class="helpful-content">
                    
                    <?php
                    // Show recent posts
                    $recent_posts = new WP_Query(array(
                        'post_type' => 'post',
                        'posts_per_page' => 3,
                        'post_status' => 'publish',
                        'ignore_sticky_posts' => true
                    ));
                    
                    if ($recent_posts->have_posts()) :
                    ?>
                        <section class="recent-posts-404">
                            <h2><?php esc_html_e('Recent Posts:', 'zenstarter'); ?></h2>
                            
                            <div class="posts-grid grid grid--3-cols">
                                <?php while ($recent_posts->have_posts()) : $recent_posts->the_post(); ?>
                                    
                                    <article class="post-card-404">
                                        
                                        <?php if (has_post_thumbnail()) : ?>
                                            <div class="post-thumbnail">
                                                <a href="<?php the_permalink(); ?>">
                                                    <?php the_post_thumbnail('zenstarter-thumbnail', array('loading' => 'lazy')); ?>
                                                </a>
                                            </div>
                                        <?php endif; ?>
                                        
                                        <div class="post-content">
                                            <h3 class="post-title">
                                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                            </h3>
                                            
                                            <div class="post-meta">
                                                <time datetime="<?php echo esc_attr(get_the_date('c')); ?>">
                                                    <?php echo esc_html(get_the_date()); ?>
                                                </time>
                                            </div>
                                        </div>
                                        
                                    </article>
                                    
                                <?php endwhile; ?>
                            </div>
                            
                        </section>
                        
                        <?php wp_reset_postdata(); ?>
                    <?php endif; ?>
                    
                    <?php
                    // Show popular categories
                    $categories = get_categories(array(
                        'orderby' => 'count',
                        'order' => 'DESC',
                        'number' => 5,
                        'hide_empty' => true
                    ));
                    
                    if ($categories) :
                    ?>
                        <section class="popular-categories-404">
                            <h2><?php esc_html_e('Popular Categories:', 'zenstarter'); ?></h2>
                            
                            <div class="categories-list">
                                <?php foreach ($categories as $category) : ?>
                                    <a href="<?php echo esc_url(get_category_link($category->term_id)); ?>" class="category-link">
                                        <span class="category-name"><?php echo esc_html($category->name); ?></span>
                                        <span class="category-count"><?php echo esc_html($category->count); ?> <?php esc_html_e('posts', 'zenstarter'); ?></span>
                                    </a>
                                <?php endforeach; ?>
                            </div>
                            
                        </section>
                    <?php endif; ?>
                    
                </div>
                
            </div>
            
        </section>
        
        <?php 
        /**
         * Hook: zenstarter_after_404_content
         * 
         * @hooked - none by default
         */
        do_action('zenstarter_after_404_content'); 
        ?>
        
    </div>
</main>

<?php get_footer(); ?>