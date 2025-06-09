<?php
/**
 * Template part for displaying posts within loops
 *
 * @package Zenstarter
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('loop-post'); ?>>
    <?php if ( has_post_thumbnail() ) : ?>
        <div class="post-thumbnail">
            <a href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
                <?php the_post_thumbnail( 'zenstarter-featured', array( 'loading' => 'lazy', 'alt' => the_title_attribute( array( 'echo' => false ) ) ) ); ?>
            </a>
        </div>
    <?php endif; ?>

    <div class="post-content">
        <?php
        the_title(
            '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">',
            '</a></h2>'
        );
        ?>

        <div class="entry-meta">
            <?php get_template_part( 'template-parts/content/entry', 'meta' ); ?>
        </div>

        <div class="entry-excerpt">
            <?php the_excerpt(); ?>
        </div>
    </div>
</article>
