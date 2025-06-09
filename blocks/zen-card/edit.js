/**
 * Zen Card Block - Editor Component
 * 
 * Provides the editor interface for the zen-card block with
 * comprehensive card content and layout controls
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
    LinkControl,
} from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    TextControl,
    RangeControl,
    Button,
    ResponsiveWrapper,
    __experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { useState } from '@wordpress/element';

// Import shared utilities
import { 
    generateBlockClasses, 
    generateInlineStyles 
} from '../lib/utils.js';

/**
 * Zen Card Edit Component
 * 
 * @param {Object} props Component properties
 * @returns {JSX.Element} The editor component
 */
function ZenCardEdit({
    attributes,
    setAttributes,
    backgroundColor,
    setBackgroundColor,
    textColor,
    setTextColor
}) {
    const {
        cardImage,
        cardImageId,
        cardImageUrl,
        cardImageAlt,
        imagePosition,
        imageSize,
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
        clickableUrl,
        style
    } = attributes;

    const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false);
    const [isCardLinkPickerVisible, setIsCardLinkPickerVisible] = useState(false);

    /**
     * Handle image selection
     */
    const onSelectImage = (media) => {
        setAttributes({
            cardImage: media,
            cardImageId: media.id,
            cardImageUrl: media.url,
            cardImageAlt: media.alt || ''
        });
    };

    /**
     * Remove image
     */
    const onRemoveImage = () => {
        setAttributes({
            cardImage: null,
            cardImageId: null,
            cardImageUrl: '',
            cardImageAlt: ''
        });
    };

    /**
     * Handle button link change
     */
    const onLinkChange = (link) => {
        setAttributes({
            buttonUrl: link?.url || '',
            buttonTarget: link?.opensInNewTab ? '_blank' : '_self'
        });
    };

    /**
     * Handle card link change
     */
    const onCardLinkChange = (link) => {
        setAttributes({
            clickableUrl: link?.url || ''
        });
    };

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
     * Generate data attributes
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

    const blockProps = useBlockProps({
        className: getCardClasses(),
        style: getCardStyles(),
        ...getDataAttributes()
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
                        label={__('Card Title', 'zenstarter')}
                        value={cardTitle}
                        onChange={(value) => setAttributes({ cardTitle: value })}
                        placeholder={__('Enter card title...', 'zenstarter')}
                    />
                    
                    <SelectControl
                        label={__('Title Level', 'zenstarter')}
                        value={titleLevel}
                        options={[
                            { label: __('H1', 'zenstarter'), value: 1 },
                            { label: __('H2', 'zenstarter'), value: 2 },
                            { label: __('H3', 'zenstarter'), value: 3 },
                            { label: __('H4', 'zenstarter'), value: 4 },
                            { label: __('H5', 'zenstarter'), value: 5 },
                            { label: __('H6', 'zenstarter'), value: 6 }
                        ]}
                        onChange={(value) => setAttributes({ titleLevel: parseInt(value) })}
                    />
                    
                    <ToggleControl
                        label={__('Show Excerpt', 'zenstarter')}
                        checked={showExcerpt}
                        onChange={(value) => setAttributes({ showExcerpt: value })}
                        help={__('Limit content length with excerpt', 'zenstarter')}
                    />
                    
                    {showExcerpt && (
                        <RangeControl
                            label={__('Excerpt Length (words)', 'zenstarter')}
                            value={excerptLength}
                            onChange={(value) => setAttributes({ excerptLength: value })}
                            min={5}
                            max={50}
                            step={1}
                        />
                    )}
                    
                    <ToggleControl
                        label={__('Show Meta Information', 'zenstarter')}
                        checked={showMeta}
                        onChange={(value) => setAttributes({ showMeta: value })}
                    />
                    
                    {showMeta && (
                        <>
                            <TextControl
                                label={__('Meta Text', 'zenstarter')}
                                value={cardMeta}
                                onChange={(value) => setAttributes({ cardMeta: value })}
                                placeholder={__('Date, category, author...', 'zenstarter')}
                            />
                            
                            <SelectControl
                                label={__('Meta Position', 'zenstarter')}
                                value={metaPosition}
                                options={[
                                    { label: __('Top', 'zenstarter'), value: 'top' },
                                    { label: __('Bottom', 'zenstarter'), value: 'bottom' }
                                ]}
                                onChange={(value) => setAttributes({ metaPosition: value })}
                            />
                        </>
                    )}
                </PanelBody>

                {/* Image Settings */}
                <PanelBody
                    title={__('Image Settings', 'zenstarter')}
                    initialOpen={false}
                >
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onSelectImage}
                            allowedTypes={['image']}
                            value={cardImageId}
                            render={({ open }) => (
                                <div className="zen-card-image-control">
                                    {!cardImageUrl ? (
                                        <Button
                                            className="zen-card-image-button"
                                            onClick={open}
                                            variant="secondary"
                                        >
                                            {__('Select Card Image', 'zenstarter')}
                                        </Button>
                                    ) : (
                                        <>
                                            <ResponsiveWrapper
                                                naturalWidth={cardImage?.width || 300}
                                                naturalHeight={cardImage?.height || 200}
                                            >
                                                <img
                                                    src={cardImageUrl}
                                                    alt={cardImageAlt}
                                                />
                                            </ResponsiveWrapper>
                                            <div className="zen-card-image-actions">
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
                        label={__('Image Position', 'zenstarter')}
                        value={imagePosition}
                        options={[
                            { label: __('Top', 'zenstarter'), value: 'top' },
                            { label: __('Left', 'zenstarter'), value: 'left' },
                            { label: __('Right', 'zenstarter'), value: 'right' },
                            { label: __('Background', 'zenstarter'), value: 'background' },
                            { label: __('None', 'zenstarter'), value: 'none' }
                        ]}
                        onChange={(value) => setAttributes({ imagePosition: value })}
                    />
                    
                    <SelectControl
                        label={__('Image Aspect Ratio', 'zenstarter')}
                        value={imageAspectRatio}
                        options={[
                            { label: __('Auto', 'zenstarter'), value: 'auto' },
                            { label: __('Square (1:1)', 'zenstarter'), value: 'square' },
                            { label: __('Landscape (4:3)', 'zenstarter'), value: 'landscape' },
                            { label: __('Portrait (3:4)', 'zenstarter'), value: 'portrait' },
                            { label: __('Wide (16:9)', 'zenstarter'), value: 'wide' }
                        ]}
                        onChange={(value) => setAttributes({ imageAspectRatio: value })}
                    />
                </PanelBody>

                {/* Button Settings */}
                <PanelBody
                    title={__('Button Settings', 'zenstarter')}
                    initialOpen={false}
                >
                    <ToggleControl
                        label={__('Show Button', 'zenstarter')}
                        checked={showButton}
                        onChange={(value) => setAttributes({ showButton: value })}
                    />
                    
                    {showButton && (
                        <>
                            <TextControl
                                label={__('Button Text', 'zenstarter')}
                                value={buttonText}
                                onChange={(value) => setAttributes({ buttonText: value })}
                                placeholder={__('Read more', 'zenstarter')}
                            />
                            
                            <div className="zen-card-link-control">
                                <Button
                                    variant="secondary"
                                    onClick={() => setIsLinkPickerVisible(!isLinkPickerVisible)}
                                >
                                    {buttonUrl ? __('Edit Link', 'zenstarter') : __('Add Link', 'zenstarter')}
                                </Button>
                                
                                {isLinkPickerVisible && (
                                    <LinkControl
                                        value={{
                                            url: buttonUrl,
                                            opensInNewTab: buttonTarget === '_blank'
                                        }}
                                        onChange={onLinkChange}
                                        onRemove={() => {
                                            setAttributes({ buttonUrl: '', buttonTarget: '_self' });
                                            setIsLinkPickerVisible(false);
                                        }}
                                    />
                                )}
                            </div>
                            
                            <SelectControl
                                label={__('Button Style', 'zenstarter')}
                                value={buttonStyle}
                                options={[
                                    { label: __('Primary', 'zenstarter'), value: 'primary' },
                                    { label: __('Secondary', 'zenstarter'), value: 'secondary' },
                                    { label: __('Outline', 'zenstarter'), value: 'outline' },
                                    { label: __('Ghost', 'zenstarter'), value: 'ghost' },
                                    { label: __('Link', 'zenstarter'), value: 'link' }
                                ]}
                                onChange={(value) => setAttributes({ buttonStyle: value })}
                            />
                            
                            <SelectControl
                                label={__('Button Size', 'zenstarter')}
                                value={buttonSize}
                                options={[
                                    { label: __('Small', 'zenstarter'), value: 'small' },
                                    { label: __('Medium', 'zenstarter'), value: 'medium' },
                                    { label: __('Large', 'zenstarter'), value: 'large' }
                                ]}
                                onChange={(value) => setAttributes({ buttonSize: value })}
                            />
                        </>
                    )}
                </PanelBody>

                {/* Layout Settings */}
                <PanelBody
                    title={__('Layout Settings', 'zenstarter')}
                    initialOpen={false}
                >
                    <SelectControl
                        label={__('Card Layout', 'zenstarter')}
                        value={cardLayout}
                        options={[
                            { label: __('Vertical', 'zenstarter'), value: 'vertical' },
                            { label: __('Horizontal', 'zenstarter'), value: 'horizontal' },
                            { label: __('Overlay', 'zenstarter'), value: 'overlay' },
                            { label: __('Minimal', 'zenstarter'), value: 'minimal' }
                        ]}
                        onChange={(value) => setAttributes({ cardLayout: value })}
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
                    
                    <SelectControl
                        label={__('Shadow Level', 'zenstarter')}
                        value={shadowLevel}
                        options={[
                            { label: __('None', 'zenstarter'), value: 'none' },
                            { label: __('Small', 'zenstarter'), value: 'small' },
                            { label: __('Medium', 'zenstarter'), value: 'medium' },
                            { label: __('Large', 'zenstarter'), value: 'large' }
                        ]}
                        onChange={(value) => setAttributes({ shadowLevel: value })}
                    />
                    
                    <SelectControl
                        label={__('Hover Effect', 'zenstarter')}
                        value={hoverEffect}
                        options={[
                            { label: __('None', 'zenstarter'), value: 'none' },
                            { label: __('Lift', 'zenstarter'), value: 'lift' },
                            { label: __('Scale', 'zenstarter'), value: 'scale' },
                            { label: __('Glow', 'zenstarter'), value: 'glow' },
                            { label: __('Rotate', 'zenstarter'), value: 'rotate' },
                            { label: __('Slide', 'zenstarter'), value: 'slide' }
                        ]}
                        onChange={(value) => setAttributes({ hoverEffect: value })}
                    />
                </PanelBody>

                {/* Advanced Settings */}
                <PanelBody
                    title={__('Advanced Settings', 'zenstarter')}
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
                                { label: __('Zoom In', 'zenstarter'), value: 'zoomIn' },
                                { label: __('Flip In', 'zenstarter'), value: 'flipIn' }
                            ]}
                            onChange={(value) => setAttributes({ animationType: value })}
                        />
                    )}
                    
                    <ToggleControl
                        label={__('Make Card Clickable', 'zenstarter')}
                        checked={isClickable}
                        onChange={(value) => setAttributes({ isClickable: value })}
                        help={__('Makes entire card clickable', 'zenstarter')}
                    />
                    
                    {isClickable && (
                        <div className="zen-card-link-control">
                            <Button
                                variant="secondary"
                                onClick={() => setIsCardLinkPickerVisible(!isCardLinkPickerVisible)}
                            >
                                {clickableUrl ? __('Edit Card Link', 'zenstarter') : __('Add Card Link', 'zenstarter')}
                            </Button>
                            
                            {isCardLinkPickerVisible && (
                                <LinkControl
                                    value={{ url: clickableUrl }}
                                    onChange={onCardLinkChange}
                                    onRemove={() => {
                                        setAttributes({ clickableUrl: '' });
                                        setIsCardLinkPickerVisible(false);
                                    }}
                                />
                            )}
                        </div>
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {/* Card Image */}
                {cardImageUrl && imagePosition !== 'none' && imagePosition !== 'background' && (
                    <div className="zen-card__image">
                        <img
                            src={cardImageUrl}
                            alt={cardImageAlt}
                            className="zen-card__image-element"
                        />
                    </div>
                )}
                
                {/* Background Image Overlay */}
                {cardImageUrl && imagePosition === 'background' && (
                    <div 
                        className="zen-card__background"
                        style={{ backgroundImage: `url(${cardImageUrl})` }}
                    />
                )}
                
                {/* Card Content */}
                <div className="zen-card__content">
                    {/* Meta (Top) */}
                    {showMeta && metaPosition === 'top' && (
                        <div className="zen-card__meta zen-card__meta--top">
                            {cardMeta || __('Meta information', 'zenstarter')}
                        </div>
                    )}
                    
                    {/* Title */}
                    <RichText
                        tagName={getTitleTag()}
                        className="zen-card__title"
                        value={cardTitle}
                        onChange={(value) => setAttributes({ cardTitle: value })}
                        placeholder={__('Card title...', 'zenstarter')}
                    />
                    
                    {/* Content */}
                    <RichText
                        tagName="p"
                        className="zen-card__text"
                        value={showExcerpt ? getExcerptText(cardContent, excerptLength) : cardContent}
                        onChange={(value) => setAttributes({ cardContent: value })}
                        placeholder={__('Card content...', 'zenstarter')}
                    />
                    
                    {/* Meta (Bottom) */}
                    {showMeta && metaPosition === 'bottom' && (
                        <div className="zen-card__meta zen-card__meta--bottom">
                            {cardMeta || __('Meta information', 'zenstarter')}
                        </div>
                    )}
                    
                    {/* Button */}
                    {showButton && buttonText && (
                        <div className="zen-card__actions">
                            <a
                                href="#"
                                className={`zen-card__button zen-card__button--${buttonStyle} zen-card__button--${buttonSize}`}
                                onClick={(e) => e.preventDefault()}
                            >
                                {buttonText}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default compose([
    withColors('backgroundColor', { textColor: 'color' }),
])(ZenCardEdit);