/**
 * Zen Hero Block - Editor Component
 * 
 * Provides the editor interface for the zen-hero block with
 * comprehensive customization options and InnerBlocks support
 *
 * @package Zenstarter
 * @subpackage Blocks
 * @version 1.0.0
 */

import { __ } from '@wordpress/i18n';
import {
    InspectorControls,
    InnerBlocks,
    useBlockProps,
    withColors,
    MediaUpload,
    MediaUploadCheck,
    PanelColorSettings,
    __experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    RangeControl,
    TextControl,
    ToggleControl,
    Button,
    ResponsiveWrapper,
    FocalPointPicker,
    __experimentalBoxControl as BoxControl,
} from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';

// Import shared utilities
import { 
    generateBlockClasses, 
    generateInlineStyles, 
    heroTemplate,
    animations 
} from '../lib/utils.js';

/**
 * Zen Hero Edit Component
 * 
 * @param {Object} props Component properties
 * @returns {JSX.Element} The editor component
 */
function ZenHeroEdit({
    attributes,
    setAttributes,
    backgroundColor,
    setBackgroundColor,
    textColor,
    setTextColor,
    clientId
}) {
    const {
        backgroundImage,
        backgroundImageId,
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
        parallaxSpeed,
        style
    } = attributes;

    // Check if block has inner blocks
    const hasInnerBlocks = useSelect(
        (select) => {
            const block = select('core/block-editor').getBlock(clientId);
            return !!(block && block.innerBlocks && block.innerBlocks.length > 0);
        },
        [clientId]
    );

    /**
     * Handle background image selection
     */
    const onSelectImage = (media) => {
        setAttributes({
            backgroundImage: media,
            backgroundImageId: media.id,
            backgroundImageUrl: media.url
        });
    };

    /**
     * Remove background image
     */
    const onRemoveImage = () => {
        setAttributes({
            backgroundImage: null,
            backgroundImageId: null,
            backgroundImageUrl: ''
        });
    };

    /**
     * Handle focal point change
     */
    const onChangeFocalPoint = (focalPoint) => {
        setAttributes({
            backgroundPosition: `${focalPoint.x * 100}% ${focalPoint.y * 100}%`
        });
    };

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

    // Parse focal point from background position
    const getFocalPointFromPosition = () => {
        if (!backgroundPosition) return { x: 0.5, y: 0.5 };
        
        const [x, y] = backgroundPosition.split(' ');
        return {
            x: parseInt(x) / 100,
            y: parseInt(y) / 100
        };
    };

    const blockProps = useBlockProps({
        className: getHeroClasses(),
        style: getHeroStyles()
    });

    return (
        <>
            <InspectorControls>
                {/* Background Settings */}
                <PanelBody
                    title={__('Background Settings', 'zenstarter')}
                    initialOpen={true}
                >
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={onSelectImage}
                            allowedTypes={['image']}
                            value={backgroundImageId}
                            render={({ open }) => (
                                <div className="zen-hero-background-control">
                                    {!backgroundImageUrl ? (
                                        <Button
                                            className="zen-hero-background-button"
                                            onClick={open}
                                            variant="secondary"
                                        >
                                            {__('Select Background Image', 'zenstarter')}
                                        </Button>
                                    ) : (
                                        <>
                                            <ResponsiveWrapper
                                                naturalWidth={backgroundImage?.width || 1920}
                                                naturalHeight={backgroundImage?.height || 1080}
                                            >
                                                <img
                                                    src={backgroundImageUrl}
                                                    alt={backgroundImage?.alt || ''}
                                                />
                                            </ResponsiveWrapper>
                                            <div className="zen-hero-background-actions">
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

                    {backgroundImageUrl && (
                        <>
                            <FocalPointPicker
                                label={__('Background Position', 'zenstarter')}
                                url={backgroundImageUrl}
                                value={getFocalPointFromPosition()}
                                onChange={onChangeFocalPoint}
                            />
                            
                            <SelectControl
                                label={__('Background Size', 'zenstarter')}
                                value={backgroundSize}
                                options={[
                                    { label: __('Cover', 'zenstarter'), value: 'cover' },
                                    { label: __('Contain', 'zenstarter'), value: 'contain' },
                                    { label: __('Auto', 'zenstarter'), value: 'auto' },
                                    { label: __('100% Width', 'zenstarter'), value: '100% auto' },
                                    { label: __('100% Height', 'zenstarter'), value: 'auto 100%' }
                                ]}
                                onChange={(value) => setAttributes({ backgroundSize: value })}
                            />
                            
                            <SelectControl
                                label={__('Background Repeat', 'zenstarter')}
                                value={backgroundRepeat}
                                options={[
                                    { label: __('No Repeat', 'zenstarter'), value: 'no-repeat' },
                                    { label: __('Repeat', 'zenstarter'), value: 'repeat' },
                                    { label: __('Repeat X', 'zenstarter'), value: 'repeat-x' },
                                    { label: __('Repeat Y', 'zenstarter'), value: 'repeat-y' }
                                ]}
                                onChange={(value) => setAttributes({ backgroundRepeat: value })}
                            />
                            
                            <SelectControl
                                label={__('Background Attachment', 'zenstarter')}
                                value={backgroundAttachment}
                                options={[
                                    { label: __('Scroll', 'zenstarter'), value: 'scroll' },
                                    { label: __('Fixed', 'zenstarter'), value: 'fixed' }
                                ]}
                                onChange={(value) => setAttributes({ backgroundAttachment: value })}
                            />
                        </>
                    )}
                </PanelBody>

                {/* Overlay Settings */}
                <PanelBody
                    title={__('Overlay Settings', 'zenstarter')}
                    initialOpen={false}
                >
                    <PanelColorGradientSettings
                        title={__('Overlay Color', 'zenstarter')}
                        settings={[
                            {
                                colorValue: overlayColor,
                                onColorChange: (value) => setAttributes({ overlayColor: value }),
                                gradientValue: overlayGradient,
                                onGradientChange: (value) => setAttributes({ overlayGradient: value }),
                                label: __('Overlay', 'zenstarter'),
                            }
                        ]}
                        __experimentalIsRenderedInSidebar
                    />
                    
                    {(overlayColor || overlayGradient) && (
                        <RangeControl
                            label={__('Overlay Opacity', 'zenstarter')}
                            value={overlayOpacity}
                            onChange={(value) => setAttributes({ overlayOpacity: value })}
                            min={0}
                            max={1}
                            step={0.1}
                        />
                    )}
                </PanelBody>

                {/* Layout Settings */}
                <PanelBody
                    title={__('Layout Settings', 'zenstarter')}
                    initialOpen={false}
                >
                    <TextControl
                        label={__('Minimum Height', 'zenstarter')}
                        value={minHeight}
                        placeholder="60vh"
                        help={__('Use CSS units like px, vh, rem, etc.', 'zenstarter')}
                        onChange={(value) => setAttributes({ minHeight: value })}
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
                        label={__('Vertical Alignment', 'zenstarter')}
                        value={verticalAlignment}
                        options={[
                            { label: __('Top', 'zenstarter'), value: 'top' },
                            { label: __('Center', 'zenstarter'), value: 'center' },
                            { label: __('Bottom', 'zenstarter'), value: 'bottom' }
                        ]}
                        onChange={(value) => setAttributes({ verticalAlignment: value })}
                    />
                    
                    <TextControl
                        label={__('Content Max Width', 'zenstarter')}
                        value={contentMaxWidth}
                        placeholder="800px"
                        help={__('Maximum width for content area', 'zenstarter')}
                        onChange={(value) => setAttributes({ contentMaxWidth: value })}
                    />
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
                        <>
                            <SelectControl
                                label={__('Animation Type', 'zenstarter')}
                                value={animationType}
                                options={[
                                    { label: __('Fade In', 'zenstarter'), value: 'fadeIn' },
                                    { label: __('Slide Up', 'zenstarter'), value: 'slideUp' },
                                    { label: __('Slide Down', 'zenstarter'), value: 'slideDown' },
                                    { label: __('Zoom In', 'zenstarter'), value: 'zoomIn' }
                                ]}
                                onChange={(value) => setAttributes({ animationType: value })}
                            />
                            
                            <RangeControl
                                label={__('Animation Duration (ms)', 'zenstarter')}
                                value={animationDuration}
                                onChange={(value) => setAttributes({ animationDuration: value })}
                                min={100}
                                max={3000}
                                step={100}
                            />
                        </>
                    )}
                    
                    {backgroundImageUrl && (
                        <ToggleControl
                            label={__('Enable Parallax Effect', 'zenstarter')}
                            checked={parallaxEnabled}
                            onChange={(value) => setAttributes({ parallaxEnabled: value })}
                            help={__('Creates a parallax scrolling effect with the background image', 'zenstarter')}
                        />
                    )}
                    
                    {parallaxEnabled && backgroundImageUrl && (
                        <RangeControl
                            label={__('Parallax Speed', 'zenstarter')}
                            value={parallaxSpeed}
                            onChange={(value) => setAttributes({ parallaxSpeed: value })}
                            min={0.1}
                            max={1}
                            step={0.1}
                            help={__('Lower values create stronger parallax effect', 'zenstarter')}
                        />
                    )}
                </PanelBody>

                {/* Color Settings */}
                <PanelColorSettings
                    title={__('Text Colors', 'zenstarter')}
                    colorSettings={[
                        {
                            value: backgroundColor.color,
                            onChange: setBackgroundColor,
                            label: __('Background Color', 'zenstarter')
                        },
                        {
                            value: textColor.color,
                            onChange: setTextColor,
                            label: __('Text Color', 'zenstarter')
                        }
                    ]}
                />
            </InspectorControls>

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
                    <InnerBlocks
                        template={heroTemplate}
                        renderAppender={hasInnerBlocks ? undefined : InnerBlocks.ButtonBlockAppender}
                        templateLock={false}
                    />
                </div>
            </div>
        </>
    );
}

export default compose([
    withColors('backgroundColor', { textColor: 'color' }),
])(ZenHeroEdit);