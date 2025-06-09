<?php
/**
 * Register custom block styles/variations.
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register Rounded style for core/button block.
 */
function zenstarter_register_block_variations() {
    register_block_style(
        'core/button',
        [
            'name'  => 'rounded',
            'label' => __( 'Rounded', 'zenstarter' ),
            'inline_style' => '.wp-block-button.is-style-rounded .wp-block-button__link{border-radius:50px;}',
        ]
    );
}
add_action( 'init', 'zenstarter_register_block_variations' );
