/**
 * Zen CTA Block - Save Component
 * 
 * Generates the frontend markup for the zen-cta block
 *
 * @package Zenstarter
 * @subpackage Blocks
 * @version 1.0.0
 */

import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor';

// Import shared utilities
import { generateBlockClasses, generateInlineStyles } from '../lib/utils.js';

/**
 * Zen CTA Save Component
 * 
 * @param {Object} props Component properties
 * @returns {JSX.Element} The saved block markup
 */
export default function save({ attributes }) {
    const {
        ctaTitle,
        ctaDescription,
        buttonText,
        buttonUrl,
        buttonTarget,
        buttonRel,
        buttonStyle,
        buttonSize,
        layoutStyle,
        contentAlignment,
        enableCustomContent,
        showIcon,
        iconName,
        iconPosition,
        animationEnabled,
        animationType
    } = attributes;

    /**
     * Generate CTA wrapper classes
     */
    const getCTAClasses = () => {
        const classes = ['zen-cta'];
        
        if (layoutStyle !== 'stacked') {
            classes.push(`zen-cta--${layoutStyle}`);
        }
        
        if (contentAlignment !== 'center') {
            classes.push(`zen-cta--align-${contentAlignment}`);
        }
        
        if (showIcon) {
            classes.push('zen-cta--has-icon');
            classes.push(`zen-cta--icon-${iconPosition}`);
        }
        
        if (animationEnabled) {
            classes.push(`zen-cta--animated zen-cta--${animationType}`);
        }
        
        return generateBlockClasses('cta', attributes, classes);
    };

    /**
     * Generate CTA wrapper styles
     */
    const getCTAStyles = () => {
        return generateInlineStyles(attributes);
    };

    /**
     * Generate button classes
     */
    const getButtonClasses = () => {
        const classes = ['zen-cta__button', 'wp-block-button__link'];
        
        classes.push(`zen-cta__button--${buttonStyle}`);
        classes.push(`zen-cta__button--${buttonSize}`);
        
        return classes.join(' ');
    };

    /**
     * Generate data attributes for JavaScript functionality
     */
    const getDataAttributes = () => {
        const dataAttrs = {};
        
        if (animationEnabled) {
            dataAttrs['data-animation'] = animationType;
        }
        
        return dataAttrs;
    };

    const blockProps = useBlockProps.save({
        className: getCTAClasses(),
        style: getCTAStyles(),
        ...getDataAttributes()
    });

    return (
        <div {...blockProps}>
            {/* Icon (if enabled and positioned before) */}
            {showIcon && iconPosition === 'before' && (
                <div className="zen-cta__icon zen-cta__icon--before">
                    <span className={`dashicons dashicons-${iconName}`} aria-hidden="true"></span>
                </div>
            )}
            
            <div className="zen-cta__content">
                {enableCustomContent ? (
                    <InnerBlocks.Content />
                ) : (
                    <>
                        {ctaTitle && (
                            <RichText.Content
                                tagName="h2"
                                className="zen-cta__title"
                                value={ctaTitle}
                            />
                        )}
                        
                        {ctaDescription && (
                            <RichText.Content
                                tagName="p"
                                className="zen-cta__description"
                                value={ctaDescription}
                            />
                        )}
                    </>
                )}
            </div>
            
            {/* Button */}
            {buttonText && (
                <div className="zen-cta__action">
                    <a
                        className={getButtonClasses()}
                        href={buttonUrl || '#'}
                        target={buttonTarget}
                        rel={buttonRel}
                    >
                        {buttonText}
                    </a>
                </div>
            )}
            
            {/* Icon (if enabled and positioned after) */}
            {showIcon && iconPosition === 'after' && (
                <div className="zen-cta__icon zen-cta__icon--after">
                    <span className={`dashicons dashicons-${iconName}`} aria-hidden="true"></span>
                </div>
            )}
        </div>
    );
}