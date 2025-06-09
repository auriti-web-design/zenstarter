/**
 * Zen Testimonial Block Registration
 * 
 * Registers the zen-testimonial block with WordPress
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
 * Register the zen-testimonial block
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
            testimonialText: __('This product has completely transformed our business workflow. The team at Zenstarter really knows what they\'re doing!', 'zenstarter'),
            authorName: __('Sarah Johnson', 'zenstarter'),
            authorRole: __('CEO', 'zenstarter'),
            authorCompany: __('TechCorp Inc.', 'zenstarter'),
            showRating: true,
            rating: 5,
            layoutStyle: 'vertical',
            contentAlignment: 'center',
            avatarSize: 'medium',
            showQuoteIcon: true,
            quoteIconPosition: 'before'
        }
    }
});