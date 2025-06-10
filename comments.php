<?php
/**
 * The template for displaying comments
 *
 * This is the template that displays the area of the page that contains both the current comments
 * and the comment form.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Zenstarter
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/*
 * If the current post is protected by a password and
 * the visitor has not yet typed the password we will
 * return early without loading the comments.
 */
if (post_password_required()) {
    return;
}

/**
 * Custom comment callback function
 */
if (!function_exists('zenstarter_comment_callback')) :
    function zenstarter_comment_callback($comment, $args, $depth) {
        if ('div' === $args['style']) {
            $tag       = 'div';
            $add_below = 'comment';
        } else {
            $tag       = 'li';
            $add_below = 'div-comment';
        }
        ?>
        <<?php echo $tag; ?> <?php comment_class(empty($args['has_children']) ? '' : 'parent'); ?> id="comment-<?php comment_ID(); ?>">
        <?php if ('div' != $args['style']) : ?>
            <div id="div-comment-<?php comment_ID(); ?>" class="comment-body">
        <?php endif; ?>

        <div class="comment-author vcard">
            <?php if ($args['avatar_size'] != 0) echo get_avatar($comment, $args['avatar_size']); ?>
            <cite class="fn"><?php echo get_comment_author_link(); ?></cite>
        </div>

        <?php if ($comment->comment_approved == '0') : ?>
            <em class="comment-awaiting-moderation"><?php esc_html_e('Your comment is awaiting moderation.', 'zenstarter'); ?></em>
            <br />
        <?php endif; ?>

        <div class="comment-meta commentmetadata">
            <a href="<?php echo esc_url(get_comment_link($comment->comment_ID)); ?>">
                <time datetime="<?php comment_time('c'); ?>">
                    <?php
                    /* translators: 1: date, 2: time */
                    printf(esc_html__('%1$s at %2$s', 'zenstarter'), get_comment_date(), get_comment_time());
                    ?>
                </time>
            </a>
            <?php edit_comment_link(esc_html__('(Edit)', 'zenstarter'), '&nbsp;&nbsp;', ''); ?>
        </div>

        <div class="comment-content">
            <?php comment_text(); ?>
        </div>

        <div class="reply">
            <?php
            comment_reply_link(
                array_merge(
                    $args,
                    array(
                        'add_below' => $add_below,
                        'depth'     => $depth,
                        'max_depth' => $args['max_depth']
                    )
                )
            );
            ?>
        </div>

        <?php if ('div' != $args['style']) : ?>
            </div>
        <?php endif; ?>
        <?php
    }
endif;
?>

<div id="comments" class="comments-area">
    
    <?php
    /**
     * Hook: zenstarter_before_comments
     */
    do_action('zenstarter_before_comments');
    ?>
    
    <?php
    // You can start editing here -- including this comment!
    if (have_comments()) :
    ?>
        <h2 class="comments-title">
            <?php
            $zenstarter_comment_count = get_comments_number();
            if ('1' === $zenstarter_comment_count) {
                printf(
                    /* translators: 1: title. */
                    esc_html__('One thought on &ldquo;%1$s&rdquo;', 'zenstarter'),
                    '<span>' . wp_kses_post(get_the_title()) . '</span>'
                );
            } else {
                printf(
                    /* translators: 1: comment count number, 2: title. */
                    esc_html(_nx('%1$s thought on &ldquo;%2$s&rdquo;', '%1$s thoughts on &ldquo;%2$s&rdquo;', $zenstarter_comment_count, 'comments title', 'zenstarter')),
                    number_format_i18n($zenstarter_comment_count), // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                    '<span>' . wp_kses_post(get_the_title()) . '</span>'
                );
            }
            ?>
        </h2><!-- .comments-title -->
        
        <?php the_comments_navigation(); ?>
        
        <ol class="comment-list">
            <?php
            wp_list_comments(
                array(
                    'style'      => 'ol',
                    'short_ping' => true,
                    'callback'   => 'zenstarter_comment_callback',
                )
            );
            ?>
        </ol><!-- .comment-list -->
        
        <?php
        the_comments_navigation();
        
        // If comments are closed and there are comments, let's leave a little note, shall we?
        if (!comments_open()) :
        ?>
            <p class="no-comments"><?php esc_html_e('Comments are closed.', 'zenstarter'); ?></p>
        <?php
        endif;
        
    endif; // Check for have_comments().
    
    /**
     * Custom comment form
     */
    $zenstarter_comment_form_args = array(
        'title_reply_before' => '<h3 id="reply-title" class="comment-reply-title">',
        'title_reply_after'  => '</h3>',
        'class_form'         => 'comment-form',
        'class_submit'       => 'btn btn--primary',
        'submit_button'      => '<input name="%1$s" type="submit" id="%2$s" class="%3$s" value="%4$s" />',
        'comment_field'      => '<p class="comment-form-comment">
            <label for="comment" class="screen-reader-text">' . esc_html__('Comment', 'zenstarter') . '</label>
            <textarea id="comment" name="comment" cols="45" rows="8" maxlength="65525" required="required" placeholder="' . esc_attr__('Write your comment here...', 'zenstarter') . '"></textarea>
        </p>',
        'fields'             => array(
            'author' => '<p class="comment-form-author">
                <label for="author" class="screen-reader-text">' . esc_html__('Name', 'zenstarter') . '</label>
                <input id="author" name="author" type="text" value="" size="30" maxlength="245" autocomplete="name" required="required" placeholder="' . esc_attr__('Your name *', 'zenstarter') . '" />
            </p>',
            'email'  => '<p class="comment-form-email">
                <label for="email" class="screen-reader-text">' . esc_html__('Email', 'zenstarter') . '</label>
                <input id="email" name="email" type="email" value="" size="30" maxlength="100" aria-describedby="email-notes" autocomplete="email" required="required" placeholder="' . esc_attr__('Your email *', 'zenstarter') . '" />
            </p>',
            'url'    => '<p class="comment-form-url">
                <label for="url" class="screen-reader-text">' . esc_html__('Website', 'zenstarter') . '</label>
                <input id="url" name="url" type="url" value="" size="30" maxlength="200" autocomplete="url" placeholder="' . esc_attr__('Your website (optional)', 'zenstarter') . '" />
            </p>',
        ),
    );
    
    comment_form($zenstarter_comment_form_args);
    
    /**
     * Hook: zenstarter_after_comments
     */
do_action('zenstarter_after_comments');
?>

</div><!-- #comments -->
