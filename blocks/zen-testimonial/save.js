/**
 * Zen Testimonial Block - Save Component
 * 
 * Renders the frontend output for the zen-testimonial block
 *
 * @package Zenstarter
 * @subpackage Blocks
 * @version 1.0.0
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';

// Import shared utilities
import { 
    generateBlockClasses, 
    generateInlineStyles 
} from '../lib/utils.js';

/**
 * Zen Testimonial Save Component
 * 
 * @param {Object} props Component properties
 * @returns {JSX.Element} The frontend component
 */
export default function save({ attributes }) {
    const {
        testimonialText,
        authorName,
        authorRole,
        authorCompany,
        authorImageUrl,
        authorImageAlt,
        showRating,
        rating,
        layoutStyle,
        contentAlignment,
        avatarSize,
        showQuoteIcon,
        quoteIconPosition,
        animationEnabled,
        animationType
    } = attributes;

    /**
     * Generate testimonial wrapper classes
     */
    const getTestimonialClasses = () => {
        const classes = ['zen-testimonial'];
        
        if (layoutStyle !== 'vertical') {
            classes.push(`zen-testimonial--${layoutStyle}`);
        }
        
        if (contentAlignment !== 'center') {
            classes.push(`zen-testimonial--align-${contentAlignment}`);
        }
        
        if (avatarSize !== 'medium') {
            classes.push(`zen-testimonial--avatar-${avatarSize}`);
        }
        
        if (showQuoteIcon) {
            classes.push('zen-testimonial--has-quote');
            classes.push(`zen-testimonial--quote-${quoteIconPosition}`);
        }
        
        if (showRating) {
            classes.push('zen-testimonial--has-rating');
        }
        
        if (animationEnabled) {
            classes.push(`zen-testimonial--animated zen-testimonial--${animationType}`);
        }
        
        return generateBlockClasses('testimonial', attributes, classes);
    };

    /**
     * Generate testimonial wrapper styles
     */
    const getTestimonialStyles = () => {
        return generateInlineStyles(attributes);
    };

    /**
     * Generate data attributes for animations
     */
    const getDataAttributes = () => {
        const dataAttrs = {};
        
        if (animationEnabled) {
            dataAttrs['data-animation'] = animationType;
            dataAttrs['data-animated'] = 'true';
        }
        
        return dataAttrs;
    };

    /**
     * Render rating stars
     */
    const renderRatingStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Icon
                    key={i}
                    icon={i <= rating ? 'star-filled' : 'star-empty'}
                    className={`zen-testimonial__rating-star ${i <= rating ? 'filled' : 'empty'}`}
                />
            );
        }
        return stars;
    };

    // Don't render if no testimonial text
    if (!testimonialText) {
        return null;
    }

    const blockProps = useBlockProps.save({
        className: getTestimonialClasses(),
        style: getTestimonialStyles(),
        ...getDataAttributes()
    });

    return (
        <div {...blockProps}>
            {/* Quote Icon (background) */}
            {showQuoteIcon && quoteIconPosition === 'background' && (
                <div className="zen-testimonial__quote-bg" aria-hidden="true">
                    <Icon icon="format-quote" />
                </div>
            )}
            
            {/* Quote Icon (before) */}
            {showQuoteIcon && quoteIconPosition === 'before' && (
                <div className="zen-testimonial__quote zen-testimonial__quote--before" aria-hidden="true">
                    <Icon icon="format-quote" />
                </div>
            )}
            
            {/* Testimonial Content */}
            <div className="zen-testimonial__content">
                <RichText.Content
                    tagName="blockquote"
                    className="zen-testimonial__text"
                    value={testimonialText}
                />
                
                {/* Rating */}
                {showRating && rating > 0 && (
                    <div 
                        className="zen-testimonial__rating"
                        role="img"
                        aria-label={`Rating: ${rating} out of 5 stars`}
                    >
                        {renderRatingStars()}
                    </div>
                )}
            </div>
            
            {/* Quote Icon (after) */}
            {showQuoteIcon && quoteIconPosition === 'after' && (
                <div className="zen-testimonial__quote zen-testimonial__quote--after" aria-hidden="true">
                    <Icon icon="format-quote" />
                </div>
            )}
            
            {/* Author Info */}
            {(authorName || authorRole || authorCompany || authorImageUrl) && (
                <div className="zen-testimonial__author">
                    {/* Avatar */}
                    {authorImageUrl && (
                        <div className="zen-testimonial__avatar">
                            <img
                                src={authorImageUrl}
                                alt={authorImageAlt || authorName || 'Testimonial author'}
                                className="zen-testimonial__avatar-image"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    )}
                    
                    {/* Author Details */}
                    {(authorName || authorRole || authorCompany) && (
                        <div className="zen-testimonial__author-info">
                            {authorName && (
                                <cite className="zen-testimonial__author-name">
                                    {authorName}
                                </cite>
                            )}
                            
                            {(authorRole || authorCompany) && (
                                <div className="zen-testimonial__author-meta">
                                    {authorRole && (
                                        <span className="zen-testimonial__author-role">
                                            {authorRole}
                                        </span>
                                    )}
                                    {authorRole && authorCompany && (
                                        <span 
                                            className="zen-testimonial__separator" 
                                            aria-hidden="true"
                                        >
                                            {' at '}
                                        </span>
                                    )}
                                    {authorCompany && (
                                        <span className="zen-testimonial__author-company">
                                            {authorCompany}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}