<?php
/**
 * Register custom block patterns for Zenstarter
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Registers all patterns located in /patterns
 */
function zenstarter_register_block_patterns() {
    $pattern_files = glob( get_template_directory() . '/patterns/*.json' );

    foreach ( $pattern_files as $file ) {
        $pattern = json_decode( file_get_contents( $file ), true );
        if ( is_array( $pattern ) && isset( $pattern['title'], $pattern['content'] ) ) {
            register_block_pattern( 'zenstarter/' . basename( $file, '.json' ), $pattern );
        }
    }
}
add_action( 'init', 'zenstarter_register_block_patterns' );
