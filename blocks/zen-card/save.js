/**
 * Zen Card Block - Save Component
 * 
 * Renders the frontend output for the zen-card block
 *
 * @package Zenstarter
 * @subpackage Blocks
 * @version 1.0.0
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

// Import shared utilities
import { 
    generateBlockClasses, 
    generateInlineStyles 
} from '../lib/utils.js';

/**
 * Zen Card Save Component
 * 
 * @param {Object} props Component properties
 * @returns {JSX.Element} The frontend component
 */
export default function save({ attributes }) {
    const {
        cardImageUrl,
        cardImageAlt,
        imagePosition,
        imageAspectRatio,
        cardTitle,
        titleLevel,
        cardContent,
        showExcerpt,
        excerptLength,
        cardMeta,
        showMeta,
        metaPosition,
        buttonText,
        buttonUrl,
        buttonTarget,
        buttonStyle,
        buttonSize,
        showButton,
        cardLayout,
        contentAlignment,
        shadowLevel,
        hoverEffect,
        animationEnabled,
        animationType,
        isClickable,
        clickableUrl
    } = attributes;

    /**
     * Generate card wrapper classes
     */
    const getCardClasses = () => {
        const classes = ['zen-card'];
        
        if (cardLayout !== 'vertical') {
            classes.push(`zen-card--${cardLayout}`);
        }
        
        if (imagePosition !== 'top') {
            classes.push(`zen-card--image-${imagePosition}`);
        }
        
        if (contentAlignment !== 'left') {
            classes.push(`zen-card--align-${contentAlignment}`);
        }
        
        if (shadowLevel !== 'medium') {
            classes.push(`zen-card--shadow-${shadowLevel}`);
        }
        
        if (hoverEffect !== 'lift') {
            classes.push(`zen-card--hover-${hoverEffect}`);
        }
        
        if (imageAspectRatio !== 'auto') {
            classes.push(`zen-card--aspect-${imageAspectRatio}`);
        }
        
        if (cardImageUrl) {
            classes.push('zen-card--has-image');
        }
        
        if (showMeta) {
            classes.push('zen-card--has-meta');
            classes.push(`zen-card--meta-${metaPosition}`);
        }
        
        if (animationEnabled) {
            classes.push(`zen-card--animated zen-card--${animationType}`);
        }
        
        if (isClickable) {
            classes.push('zen-card--clickable');
        }
        
        return generateBlockClasses('card', attributes, classes);
    };

    /**
     * Generate card wrapper styles
     */
    const getCardStyles = () => {
        return generateInlineStyles(attributes);
    };

    /**
     * Generate data attributes for animations and JavaScript
     */
    const getDataAttributes = () => {
        const dataAttrs = {};
        
        if (animationEnabled) {
            dataAttrs['data-animation'] = animationType;
            dataAttrs['data-animated'] = 'true';
        }
        
        if (isClickable && clickableUrl) {
            dataAttrs['data-clickable'] = 'true';
            dataAttrs['data-url'] = clickableUrl;
        }
        
        return dataAttrs;
    };

    /**
     * Generate title tag based on level
     */
    const getTitleTag = () => `h${titleLevel}`;

    /**
     * Truncate content for excerpt
     */
    const getExcerptText = (text, length) => {
        if (!text || !showExcerpt) return text;
        const words = text.split(' ');
        if (words.length <= length) return text;
        return words.slice(0, length).join(' ') + '...';
    };

    // Don't render if no content
    if (!cardTitle && !cardContent && !cardImageUrl) {
        return null;
    }

    const blockProps = useBlockProps.save({
        className: getCardClasses(),
        style: getCardStyles(),
        ...getDataAttributes()
    });

    // Wrapper for clickable cards
    const CardWrapper = ({ children }) => {
        if (isClickable && clickableUrl) {
            return (
                <a
                    href={clickableUrl}
                    className="zen-card__link"
                    target={buttonTarget}
                    rel={buttonTarget === '_blank' ? 'noopener noreferrer' : undefined}
                    aria-label={cardTitle ? `Read more about ${cardTitle}` : 'Read more'}
                >
                    {children}
                </a>
            );
        }
        return <>{children}</>;
    };

    return (
        <div {...blockProps}>
            <CardWrapper>
                {/* Card Image */}
                {cardImageUrl && imagePosition !== 'none' && imagePosition !== 'background' && (
                    <div className="zen-card__image">
                        <img
                            src={cardImageUrl}
                            alt={cardImageAlt || cardTitle || ''}
                            className="zen-card__image-element"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                )}
                
                {/* Background Image Overlay */}
                {cardImageUrl && imagePosition === 'background' && (
                    <div 
                        className="zen-card__background"
                        style={{ backgroundImage: `url(${cardImageUrl})` }}
                        role="img"
                        aria-label={cardImageAlt || cardTitle || ''}
                    />
                )}
                
                {/* Card Content */}
                <div className="zen-card__content">
                    {/* Meta (Top) */}
                    {showMeta && metaPosition === 'top' && cardMeta && (
                        <div className="zen-card__meta zen-card__meta--top">
                            {cardMeta}
                        </div>
                    )}
                    
                    {/* Title */}
                    {cardTitle && (
                        <RichText.Content
                            tagName={getTitleTag()}
                            className="zen-card__title"
                            value={cardTitle}
                        />
                    )}
                    
                    {/* Content */}
                    {cardContent && (
                        <RichText.Content
                            tagName="p"
                            className="zen-card__text"
                            value={showExcerpt ? getExcerptText(cardContent, excerptLength) : cardContent}
                        />
                    )}
                    
                    {/* Meta (Bottom) */}
                    {showMeta && metaPosition === 'bottom' && cardMeta && (
                        <div className="zen-card__meta zen-card__meta--bottom">
                            {cardMeta}
                        </div>
                    )}
                    
                    {/* Button */}
                    {showButton && buttonText && buttonUrl && !isClickable && (
                        <div className="zen-card__actions">
                            <a
                                href={buttonUrl}
                                className={`zen-card__button zen-card__button--${buttonStyle} zen-card__button--${buttonSize}`}
                                target={buttonTarget}
                                rel={buttonTarget === '_blank' ? 'noopener noreferrer' : undefined}
                            >
                                {buttonText}
                            </a>
                        </div>
                    )}
                </div>
            </CardWrapper>
        </div>
    );
}