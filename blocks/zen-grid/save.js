/**
 * Zen Grid Block - Save Component
 * 
 * Renders the frontend output for the zen-grid block
 *
 * @package Zenstarter
 * @subpackage Blocks
 * @version 1.0.0
 */

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

// Import shared utilities
import { 
    generateBlockClasses, 
    generateInlineStyles 
} from '../lib/utils.js';

/**
 * Zen Grid Save Component
 * 
 * @param {Object} props Component properties
 * @returns {JSX.Element} The frontend component
 */
export default function save({ attributes }) {
    const {
        columns,
        columnsTablet,
        columnsMobile,
        gap,
        customGap,
        verticalAlignment,
        horizontalAlignment,
        autoFit,
        minColumnWidth,
        equalHeight,
        reverseOnMobile,
        animationEnabled,
        animationType,
        animationDelay
    } = attributes;

    /**
     * Generate grid wrapper classes
     */
    const getGridClasses = () => {
        const classes = ['zen-grid'];
        
        // Add gap class
        if (gap !== 'medium') {
            classes.push(`zen-grid--gap-${gap}`);
        }
        
        // Add alignment classes
        if (verticalAlignment !== 'top') {
            classes.push(`zen-grid--valign-${verticalAlignment}`);
        }
        
        if (horizontalAlignment !== 'left') {
            classes.push(`zen-grid--halign-${horizontalAlignment}`);
        }
        
        // Add responsive classes
        if (columnsTablet !== columns) {
            classes.push(`zen-grid--tablet-${columnsTablet}`);
        }
        
        if (columnsMobile !== 1) {
            classes.push(`zen-grid--mobile-${columnsMobile}`);
        }
        
        // Add feature classes
        if (autoFit) {
            classes.push('zen-grid--auto-fit');
        }
        
        if (equalHeight) {
            classes.push('zen-grid--equal-height');
        }
        
        if (reverseOnMobile) {
            classes.push('zen-grid--reverse-mobile');
        }
        
        if (animationEnabled) {
            classes.push(`zen-grid--animated zen-grid--${animationType}`);
        }
        
        return generateBlockClasses('grid', attributes, classes);
    };

    /**
     * Generate grid wrapper styles
     */
    const getGridStyles = () => {
        const styles = generateInlineStyles(attributes);
        
        // Add CSS Grid properties
        styles['--zen-grid-columns'] = columns;
        styles['--zen-grid-columns-tablet'] = columnsTablet;
        styles['--zen-grid-columns-mobile'] = columnsMobile;
        
        // Add gap styles
        if (gap === 'custom' && customGap) {
            styles['--zen-grid-gap'] = customGap;
        }
        
        // Add auto-fit styles
        if (autoFit && minColumnWidth) {
            styles['--zen-grid-min-width'] = minColumnWidth;
        }
        
        // Add animation delay
        if (animationEnabled && animationDelay > 0) {
            styles['--zen-grid-animation-delay'] = `${animationDelay}ms`;
        }
        
        return styles;
    };

    /**
     * Generate data attributes for animations and JavaScript
     */
    const getDataAttributes = () => {
        const dataAttrs = {};
        
        if (animationEnabled) {
            dataAttrs['data-animation'] = animationType;
            dataAttrs['data-animated'] = 'true';
            if (animationDelay > 0) {
                dataAttrs['data-delay'] = animationDelay;
            }
        }
        
        // Add grid configuration for JavaScript
        dataAttrs['data-columns'] = columns;
        dataAttrs['data-columns-tablet'] = columnsTablet;
        dataAttrs['data-columns-mobile'] = columnsMobile;
        
        return dataAttrs;
    };

    const blockProps = useBlockProps.save({
        className: getGridClasses(),
        style: getGridStyles(),
        ...getDataAttributes()
    });

    return (
        <div {...blockProps}>
            <div className="zen-grid__inner">
                <InnerBlocks.Content />
            </div>
        </div>
    );
}