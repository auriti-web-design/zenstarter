<?php
/**
 * Hero Banner Pattern
 */
return [
    'title'      => __( 'Hero Banner', 'zenstarter' ),
    'categories' => [ 'zenstarter' ],
    'content'    => '<!-- wp:cover {"align":"full","className":"hero-banner"} -->
<div class="wp-block-cover alignfull hero-banner"><span aria-hidden="true" class="wp-block-cover__background has-primary-background-color"></span><div class="wp-block-cover__inner-container"><!-- wp:heading {"textAlign":"center"} -->
<h2 class="has-text-align-center">'.esc_html__( 'Welcome to Zenstarter', 'zenstarter' ).'</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">'.esc_html__( 'Build modern WordPress sites with ease.', 'zenstarter' ).'</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link">'.esc_html__( 'Learn More', 'zenstarter' ).'</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div></div>
<!-- /wp:cover -->',
];
