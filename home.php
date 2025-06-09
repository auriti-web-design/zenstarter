<?php
/**
 * Home page displaying latest posts
 *
 * @package Zenstarter
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

get_header(); ?>

<main id="main-content" class="site-main" role="main">
    <div class="container">
        <?php if ( have_posts() ) : ?>
            <header class="page-header">
                <h1 class="page-title"><?php esc_html_e( 'Latest Posts', 'zenstarter' ); ?></h1>
            </header>

            <div class="posts-grid grid grid--2-cols">
                <?php while ( have_posts() ) : the_post(); ?>
                    <?php get_template_part( 'template-parts/loop/post' ); ?>
                <?php endwhile; ?>
            </div>

            <?php the_posts_pagination( array( 'mid_size' => 2 ) ); ?>
        <?php else : ?>
            <?php get_template_part( 'template-parts/content/content', 'none' ); ?>
        <?php endif; ?>
    </div>
</main>

<?php
if ( is_active_sidebar( 'sidebar-primary' ) ) {
    get_sidebar();
}
get_footer();
