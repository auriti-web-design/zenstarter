/**
 * Zen Testimonial Block - Editor Component
 * 
 * Provides the editor interface for the zen-testimonial block with
 * comprehensive customization options for testimonial content
 *
 * @package Zenstarter
 * @subpackage Blocks
 * @version 1.0.0
 */

import { __ } from '@wordpress/i18n';
import {
    InspectorControls,
    useBlockProps,
    withColors,
    RichText,
    MediaUpload,
    MediaUploadCheck,
} from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    TextControl,
    RangeControl,
    Button,
    ResponsiveWrapper,
    Icon,
} from '@wordpress/components';
import { compose } from '@wordpress/compose';

// Import shared utilities
import { 
    generateBlockClasses, 
    generateInlineStyles 
} from '../lib/utils.js';

/**
 * Zen Testimonial Edit Component
 * 
 * @param {Object} props Component properties
 * @returns {JSX.Element} The editor component
 */
function ZenTestimonialEdit({
    attributes,
    setAttributes,
    backgroundColor,
    setBackgroundColor,
    textColor,
    setTextColor
}) {
    const {
        testimonialText,
        authorName,
        authorRole,
        authorCompany,
        authorImage,
        authorImageId,
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
        animationType,
        style
    } = attributes;

    /**
     * Handle avatar image selection
     */
    const onSelectImage = (media) => {
        setAttributes({
            authorImage: media,
            authorImageId: media.id,
            authorImageUrl: media.url,
            authorImageAlt: media.alt || ''
        });
    };

    /**
     * Remove avatar image
     */
    const onRemoveImage = () => {
        setAttributes({
            authorImage: null,
            authorImageId: null,
            authorImageUrl: '',
            authorImageAlt: ''
        });
    };

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

    const blockProps = useBlockProps({
        className: getTestimonialClasses(),
        style: getTestimonialStyles()
    });

    return (
        <>
            <InspectorControls>
                {/* Content Settings */}
                <PanelBody
                    title={__('Content Settings', 'zenstarter')}
                    initialOpen={true}
                >
                    <TextControl
                        label={__('Author Name', 'zenstarter')}
                        value={authorName}
                        onChange={(value) => setAttributes({ authorName: value })}
                        placeholder={__('John Doe', 'zenstarter')}
                    />
                    
                    <TextControl
                        label={__('Author Role', 'zenstarter')}
                        value={authorRole}
                        onChange={(value) => setAttributes({ authorRole: value })}
                        placeholder={__('CEO', 'zenstarter')}
                    />
                    
                    <TextControl
                        label={__('Author Company', 'zenstarter')}
                        value={authorCompany}
                        onChange={(value) => setAttributes({ authorCompany: value })}
                        placeholder={__('Company Name', 'zenstarter')}
                    />
                </PanelBody>

                {/* Avatar Settings */}
                <PanelBody
                    title={__('Avatar Settings', 'zenstarter')}
                    initialOpen={false}
                >
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onSelectImage}
                            allowedTypes={['image']}
                            value={authorImageId}
                            render={({ open }) => (
                                <div className="zen-testimonial-avatar-control">
                                    {!authorImageUrl ? (
                                        <Button
                                            className="zen-testimonial-avatar-button"
                                            onClick={open}
                                            variant="secondary"
                                        >
                                            {__('Select Avatar Image', 'zenstarter')}
                                        </Button>
                                    ) : (
                                        <>
                                            <ResponsiveWrapper
                                                naturalWidth={authorImage?.width || 150}
                                                naturalHeight={authorImage?.height || 150}
                                            >
                                                <img
                                                    src={authorImageUrl}
                                                    alt={authorImageAlt || authorName}
                                                    style={{ borderRadius: '50%' }}
                                                />
                                            </ResponsiveWrapper>
                                            <div className="zen-testimonial-avatar-actions">
                                                <Button onClick={open} variant="secondary">
                                                    {__('Replace Image', 'zenstarter')}
                                                </Button>
                                                <Button 
                                                    onClick={onRemoveImage} 
                                                    variant="link" 
                                                    isDestructive
                                                >
                                                    {__('Remove Image', 'zenstarter')}
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        />
                    </MediaUploadCheck>
                    
                    <SelectControl
                        label={__('Avatar Size', 'zenstarter')}
                        value={avatarSize}
                        options={[
                            { label: __('Small', 'zenstarter'), value: 'small' },
                            { label: __('Medium', 'zenstarter'), value: 'medium' },
                            { label: __('Large', 'zenstarter'), value: 'large' }
                        ]}
                        onChange={(value) => setAttributes({ avatarSize: value })}
                    />
                </PanelBody>

                {/* Rating Settings */}
                <PanelBody
                    title={__('Rating Settings', 'zenstarter')}
                    initialOpen={false}
                >
                    <ToggleControl
                        label={__('Show Rating', 'zenstarter')}
                        checked={showRating}
                        onChange={(value) => setAttributes({ showRating: value })}
                    />
                    
                    {showRating && (
                        <RangeControl
                            label={__('Rating', 'zenstarter')}
                            value={rating}
                            onChange={(value) => setAttributes({ rating: value })}
                            min={1}
                            max={5}
                            step={1}
                            help={__('Select rating from 1 to 5 stars', 'zenstarter')}
                        />
                    )}
                </PanelBody>

                {/* Layout Settings */}
                <PanelBody
                    title={__('Layout Settings', 'zenstarter')}
                    initialOpen={false}
                >
                    <SelectControl
                        label={__('Layout Style', 'zenstarter')}
                        value={layoutStyle}
                        options={[
                            { label: __('Vertical', 'zenstarter'), value: 'vertical' },
                            { label: __('Horizontal', 'zenstarter'), value: 'horizontal' },
                            { label: __('Centered', 'zenstarter'), value: 'centered' },
                            { label: __('Card', 'zenstarter'), value: 'card' }
                        ]}
                        onChange={(value) => setAttributes({ layoutStyle: value })}
                    />
                    
                    <SelectControl
                        label={__('Content Alignment', 'zenstarter')}
                        value={contentAlignment}
                        options={[
                            { label: __('Left', 'zenstarter'), value: 'left' },
                            { label: __('Center', 'zenstarter'), value: 'center' },
                            { label: __('Right', 'zenstarter'), value: 'right' }
                        ]}
                        onChange={(value) => setAttributes({ contentAlignment: value })}
                    />
                </PanelBody>

                {/* Quote Icon Settings */}
                <PanelBody
                    title={__('Quote Icon Settings', 'zenstarter')}
                    initialOpen={false}
                >
                    <ToggleControl
                        label={__('Show Quote Icon', 'zenstarter')}
                        checked={showQuoteIcon}
                        onChange={(value) => setAttributes({ showQuoteIcon: value })}
                    />
                    
                    {showQuoteIcon && (
                        <SelectControl
                            label={__('Quote Icon Position', 'zenstarter')}
                            value={quoteIconPosition}
                            options={[
                                { label: __('Before Text', 'zenstarter'), value: 'before' },
                                { label: __('After Text', 'zenstarter'), value: 'after' },
                                { label: __('Background', 'zenstarter'), value: 'background' }
                            ]}
                            onChange={(value) => setAttributes({ quoteIconPosition: value })}
                        />
                    )}
                </PanelBody>

                {/* Animation Settings */}
                <PanelBody
                    title={__('Animation Settings', 'zenstarter')}
                    initialOpen={false}
                >
                    <ToggleControl
                        label={__('Enable Animation', 'zenstarter')}
                        checked={animationEnabled}
                        onChange={(value) => setAttributes({ animationEnabled: value })}
                    />
                    
                    {animationEnabled && (
                        <SelectControl
                            label={__('Animation Type', 'zenstarter')}
                            value={animationType}
                            options={[
                                { label: __('Fade In', 'zenstarter'), value: 'fadeIn' },
                                { label: __('Slide Up', 'zenstarter'), value: 'slideUp' },
                                { label: __('Slide Left', 'zenstarter'), value: 'slideLeft' },
                                { label: __('Slide Right', 'zenstarter'), value: 'slideRight' },
                                { label: __('Zoom In', 'zenstarter'), value: 'zoomIn' }
                            ]}
                            onChange={(value) => setAttributes({ animationType: value })}
                        />
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {/* Quote Icon (background) */}
                {showQuoteIcon && quoteIconPosition === 'background' && (
                    <div className="zen-testimonial__quote-bg">
                        <Icon icon="format-quote" />
                    </div>
                )}
                
                {/* Quote Icon (before) */}
                {showQuoteIcon && quoteIconPosition === 'before' && (
                    <div className="zen-testimonial__quote zen-testimonial__quote--before">
                        <Icon icon="format-quote" />
                    </div>
                )}
                
                {/* Testimonial Content */}
                <div className="zen-testimonial__content">
                    <RichText
                        tagName="blockquote"
                        className="zen-testimonial__text"
                        value={testimonialText}
                        onChange={(value) => setAttributes({ testimonialText: value })}
                        placeholder={__('Enter testimonial text...', 'zenstarter')}
                    />
                    
                    {/* Rating */}
                    {showRating && (
                        <div className="zen-testimonial__rating">
                            {renderRatingStars()}
                        </div>
                    )}
                </div>
                
                {/* Quote Icon (after) */}
                {showQuoteIcon && quoteIconPosition === 'after' && (
                    <div className="zen-testimonial__quote zen-testimonial__quote--after">
                        <Icon icon="format-quote" />
                    </div>
                )}
                
                {/* Author Info */}
                <div className="zen-testimonial__author">
                    {/* Avatar */}
                    {authorImageUrl && (
                        <div className="zen-testimonial__avatar">
                            <img
                                src={authorImageUrl}
                                alt={authorImageAlt || authorName}
                                className="zen-testimonial__avatar-image"
                            />
                        </div>
                    )}
                    
                    {/* Author Details */}
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
                                    <span className="zen-testimonial__separator"> at </span>
                                )}
                                {authorCompany && (
                                    <span className="zen-testimonial__author-company">
                                        {authorCompany}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default compose([
    withColors('backgroundColor', { textColor: 'color' }),
])(ZenTestimonialEdit);