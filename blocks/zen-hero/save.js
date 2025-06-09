/**
 * Zen Hero Block - Save Component
 * 
 * Generates the frontend markup for the zen-hero block
 *
 * @package Zenstarter
 * @subpackage Blocks
 * @version 1.0.0
 */

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

// Import shared utilities
import { generateBlockClasses, generateInlineStyles } from '../lib/utils.js';

/**
 * Zen Hero Save Component
 * 
 * @param {Object} props Component properties
 * @returns {JSX.Element} The saved block markup
 */
export default function save({ attributes }) {
    const {
        backgroundImageUrl,
        backgroundPosition,
        backgroundSize,
        backgroundRepeat,
        backgroundAttachment,
        overlayColor,
        overlayOpacity,
        overlayGradient,
        minHeight,
        contentAlignment,
        verticalAlignment,
        contentMaxWidth,
        animationEnabled,
        animationType,
        animationDuration,
        parallaxEnabled,
        parallaxSpeed
    } = attributes;

    /**
     * Generate hero wrapper classes
     */
    const getHeroClasses = () => {
        const classes = ['zen-hero'];
        
        if (contentAlignment !== 'center') {
            classes.push(`zen-hero--align-${contentAlignment}`);
        }
        
        if (verticalAlignment !== 'center') {
            classes.push(`zen-hero--valign-${verticalAlignment}`);
        }
        
        if (backgroundImageUrl) {
            classes.push('zen-hero--has-background-image');
        }
        
        if (overlayColor || overlayGradient) {
            classes.push('zen-hero--has-overlay');
        }
        
        if (parallaxEnabled && backgroundImageUrl) {
            classes.push('zen-hero--parallax');
        }
        
        if (animationEnabled) {
            classes.push(`zen-hero--animated zen-hero--${animationType}`);
        }
        
        return generateBlockClasses('hero', attributes, classes);
    };

    /**
     * Generate hero wrapper styles
     */
    const getHeroStyles = () => {
        const styles = generateInlineStyles(attributes);
        
        // Min height
        if (minHeight) {
            styles.minHeight = minHeight;
        }
        
        // Background image
        if (backgroundImageUrl) {
            styles.backgroundImage = `url(${backgroundImageUrl})`;
            styles.backgroundPosition = backgroundPosition;
            styles.backgroundSize = backgroundSize;
            styles.backgroundRepeat = backgroundRepeat;
            styles.backgroundAttachment = backgroundAttachment;
        }
        
        // Animation duration
        if (animationEnabled && animationDuration) {
            styles.animationDuration = `${animationDuration}ms`;
        }
        
        // Parallax data attributes for JavaScript
        if (parallaxEnabled && backgroundImageUrl) {
            styles['--parallax-speed'] = parallaxSpeed;
        }
        
        return styles;
    };

    /**
     * Generate content wrapper styles
     */
    const getContentStyles = () => {
        const styles = {};
        
        if (contentMaxWidth) {
            styles.maxWidth = contentMaxWidth;
        }
        
        return styles;
    };

    /**
     * Generate overlay styles
     */
    const getOverlayStyles = () => {
        const styles = {};
        
        if (overlayColor) {
            styles.backgroundColor = overlayColor;
            styles.opacity = overlayOpacity;
        }
        
        if (overlayGradient) {
            styles.background = overlayGradient;
            styles.opacity = overlayOpacity;
        }
        
        return styles;
    };

    // Generate data attributes for JavaScript functionality
    const getDataAttributes = () => {
        const dataAttrs = {};
        
        if (parallaxEnabled && backgroundImageUrl) {
            dataAttrs['data-parallax'] = 'true';
            dataAttrs['data-parallax-speed'] = parallaxSpeed;
        }
        
        if (animationEnabled) {
            dataAttrs['data-animation'] = animationType;
            dataAttrs['data-animation-duration'] = animationDuration;
        }
        
        return dataAttrs;
    };

    const blockProps = useBlockProps.save({
        className: getHeroClasses(),
        style: getHeroStyles(),
        ...getDataAttributes()
    });

    return (
        <div {...blockProps}>
            {/* Background Overlay */}
            {(overlayColor || overlayGradient) && (
                <div 
                    className="zen-hero__overlay"
                    style={getOverlayStyles()}
                />
            )}
            
            {/* Content Container */}
            <div 
                className="zen-hero__content"
                style={getContentStyles()}
            >
                <InnerBlocks.Content />
            </div>
        </div>
    );
}