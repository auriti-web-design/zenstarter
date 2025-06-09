/**
 * Zen Grid Block Registration
 * 
 * Registers the zen-grid block with WordPress
 *
 * @package Zenstarter
 * @subpackage Blocks
 * @version 1.0.0
 */

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

// Import block configuration
import metadata from './block.json';

// Import components
import Edit from './edit.js';
import save from './save.js';

// Import styles
import './style.scss';
import './editor.scss';

/**
 * Register the zen-grid block
 */
registerBlockType(metadata.name, {
    ...metadata,
    
    /**
     * Edit component - what users see in the editor
     */
    edit: Edit,
    
    /**
     * Save component - what gets saved to the database/rendered on frontend
     */
    save,
    
    /**
     * Block example for the inserter preview
     */
    example: {
        attributes: {
            columns: 3,
            columnsTablet: 2,
            columnsMobile: 1,
            gap: 'medium',
            verticalAlignment: 'top',
            horizontalAlignment: 'left',
            equalHeight: false
        },
        innerBlocks: [
            {
                name: 'core/paragraph',
                attributes: {
                    content: __('Grid item 1 - Add any content here', 'zenstarter')
                }
            },
            {
                name: 'core/paragraph',
                attributes: {
                    content: __('Grid item 2 - Add any content here', 'zenstarter')
                }
            },
            {
                name: 'core/paragraph',
                attributes: {
                    content: __('Grid item 3 - Add any content here', 'zenstarter')
                }
            }
        ]
    }
});