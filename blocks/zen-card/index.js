/**
 * Zen Card Block Registration
 * 
 * Registers the zen-card block with WordPress
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
 * Register the zen-card block
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
            cardTitle: __('Sample Card Title', 'zenstarter'),
            cardContent: __('This is sample card content that demonstrates how the zen-card block displays information in a clean, organized format.', 'zenstarter'),
            cardMeta: __('March 15, 2024', 'zenstarter'),
            showMeta: true,
            metaPosition: 'top',
            buttonText: __('Read More', 'zenstarter'),
            buttonUrl: '#',
            showButton: true,
            buttonStyle: 'primary',
            buttonSize: 'medium',
            cardLayout: 'vertical',
            contentAlignment: 'left',
            shadowLevel: 'medium',
            hoverEffect: 'lift',
            imagePosition: 'top',
            imageAspectRatio: 'landscape'
        }
    }
});