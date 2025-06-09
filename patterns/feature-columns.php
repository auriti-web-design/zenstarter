<?php
/**
 * Feature Columns Pattern
 */
return [
    'title'      => __( 'Feature Columns', 'zenstarter' ),
    'categories' => [ 'zenstarter' ],
    'content'    => '<!-- wp:group {"align":"wide","className":"feature-columns"} -->
<div class="wp-block-group alignwide feature-columns"><!-- wp:columns {"isStackedOnMobile":true} -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":3} -->
<h3>'.esc_html__( 'Fast Performance', 'zenstarter' ).'</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>'.esc_html__( 'Optimized assets for blazing fast load times.', 'zenstarter' ).'</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":3} -->
<h3>'.esc_html__( 'Flexible Layouts', 'zenstarter' ).'</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>'.esc_html__( 'Create any layout with the block editor.', 'zenstarter' ).'</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":3} -->
<h3>'.esc_html__( 'Accessible', 'zenstarter' ).'</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>'.esc_html__( 'Built with best accessibility practices.', 'zenstarter' ).'</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->',
];
