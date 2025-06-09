/**
 * Zen CTA Block Registration
 * 
 * Entry point for the zen-cta block registration
 *
 * @package Zenstarter
 * @subpackage Blocks
 * @version 1.0.0
 */

import { registerBlockType } from '@wordpress/blocks';

// Internal dependencies
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Register the zen-cta block
 */
registerBlockType(metadata.name, {
    edit: Edit,
    save,
});