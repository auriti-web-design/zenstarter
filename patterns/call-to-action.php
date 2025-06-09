<?php
/**
 * Call to Action Pattern
 */
return [
    'title'      => __( 'Call To Action', 'zenstarter' ),
    'categories' => [ 'zenstarter' ],
    'content'    => '<!-- wp:group {"align":"full","className":"cta-section","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull cta-section"><!-- wp:columns {"verticalAlignment":"center","isStackedOnMobile":true} -->
<div class="wp-block-columns are-vertically-aligned-center"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading -->
<h2>'.esc_html__( 'Ready to get started?', 'zenstarter' ).'</h2>
<!-- /wp:heading --></div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column"><!-- wp:buttons {"layout":{"type":"flex","justifyContent":"right"}} -->
<div class="wp-block-buttons"><!-- wp:button {"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link">'.esc_html__( 'Contact Us', 'zenstarter' ).'</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->',
];
