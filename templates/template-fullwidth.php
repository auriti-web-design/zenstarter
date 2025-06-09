<?php
/**
 * Template Name: Full Width
 *
 * Page template with no sidebar
 *
 * @package Zenstarter
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header(); ?>

<main id="main-content" class="site-main" role="main">
    <div class="container">
        <?php
        do_action('zenstarter_before_page_content');
        ?>

        <?php while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class('page-single'); ?>>
                <?php if (has_post_thumbnail()) : ?>
                    <div class="page-featured-image">
                        <?php the_post_thumbnail('large', array(
                            'loading' => 'eager',
                            'alt' => the_title_attribute(array('echo' => false))
                        )); ?>
                    </div>
                <?php endif; ?>

                <header class="entry-header">
                    <?php the_title('<h1 class="entry-title">', '</h1>'); ?>
                </header>

                <div class="entry-content">
                    <?php
                    the_content();
                    wp_link_pages(array(
                        'before' => '<div class="page-links">' . esc_html__('Pages:', 'zenstarter'),
                        'after'  => '</div>',
                    ));
                    ?>
                </div>
            </article>

            <?php
            if (comments_open() || get_comments_number()) :
                comments_template();
            endif;
            ?>
        <?php endwhile; ?>

        <?php do_action('zenstarter_after_page_content'); ?>
    </div>
</main>

<?php get_footer(); ?>
