/**
 * Zen Hero Block - Compiled Version
 * Custom Gutenberg block for hero sections with backgrounds and content
 */
(function() {
    'use strict';
    
    const { registerBlockType } = wp.blocks;
    const { InspectorControls, InnerBlocks, useBlockProps, withColors, MediaUpload, MediaUploadCheck, PanelColorSettings } = wp.blockEditor;
    const { PanelBody, SelectControl, RangeControl, TextControl, ToggleControl, Button, ResponsiveWrapper, FocalPointPicker } = wp.components;
    const { __ } = wp.i18n;
    const { compose } = wp.compose;
    const { useSelect } = wp.data;
    const { createElement: el, Fragment } = wp.element;

    // Default hero template
    const heroTemplate = [
        ['core/heading', {
            level: 1,
            placeholder: __('Hero Title...', 'zenstarter'),
            className: 'zen-hero__title'
        }],
        ['core/paragraph', {
            placeholder: __('Hero description goes here...', 'zenstarter'),
            className: 'zen-hero__description'
        }],
        ['core/buttons', {
            className: 'zen-hero__actions'
        }]
    ];

    // Generate block classes utility
    function generateBlockClasses(blockName, attributes, additionalClasses = []) {
        const classes = [`zen-${blockName}`];
        
        if (attributes.className) {
            classes.push(attributes.className);
        }
        
        if (attributes.align) {
            classes.push(`align${attributes.align}`);
        }
        
        if (additionalClasses.length > 0) {
            classes.push(...additionalClasses);
        }
        
        return classes.join(' ');
    }

    // Generate inline styles utility
    function generateInlineStyles(attributes = {}) {
        const styles = {};
        
        if (attributes.style?.spacing) {
            const { margin, padding } = attributes.style.spacing;
            
            if (margin) {
                Object.keys(margin).forEach(side => {
                    if (margin[side]) {
                        styles[`margin${side.charAt(0).toUpperCase() + side.slice(1)}`] = margin[side];
                    }
                });
            }
            
            if (padding) {
                Object.keys(padding).forEach(side => {
                    if (padding[side]) {
                        styles[`padding${side.charAt(0).toUpperCase() + side.slice(1)}`] = padding[side];
                    }
                });
            }
        }
        
        if (attributes.style?.border) {
            const { radius, width, color, style: borderStyle } = attributes.style.border;
            
            if (radius) styles.borderRadius = radius;
            if (width) styles.borderWidth = width;
            if (color) styles.borderColor = color;
            if (borderStyle) styles.borderStyle = borderStyle;
        }
        
        return styles;
    }

    // Edit component
    function ZenHeroEdit(props) {
        const {
            attributes,
            setAttributes,
            backgroundColor,
            setBackgroundColor,
            textColor,
            setTextColor,
            clientId
        } = props;

        const {
            backgroundImage,
            backgroundImageId,
            backgroundImageUrl = '',
            backgroundPosition = 'center center',
            backgroundSize = 'cover',
            backgroundRepeat = 'no-repeat',
            backgroundAttachment = 'scroll',
            overlayColor = '',
            overlayOpacity = 0.5,
            overlayGradient = '',
            minHeight = '60vh',
            contentAlignment = 'center',
            verticalAlignment = 'center',
            contentMaxWidth = '800px',
            animationEnabled = false,
            animationType = 'fadeIn',
            animationDuration = 1000,
            parallaxEnabled = false,
            parallaxSpeed = 0.5
        } = attributes;

        // Check if block has inner blocks
        const hasInnerBlocks = useSelect(function(select) {
            const block = select('core/block-editor').getBlock(clientId);
            return !!(block && block.innerBlocks && block.innerBlocks.length > 0);
        }, [clientId]);

        // Handle background image selection
        const onSelectImage = function(media) {
            setAttributes({
                backgroundImage: media,
                backgroundImageId: media.id,
                backgroundImageUrl: media.url
            });
        };

        const onRemoveImage = function() {
            setAttributes({
                backgroundImage: null,
                backgroundImageId: null,
                backgroundImageUrl: ''
            });
        };

        const onChangeFocalPoint = function(focalPoint) {
            setAttributes({
                backgroundPosition: `${focalPoint.x * 100}% ${focalPoint.y * 100}%`
            });
        };

        // Generate hero wrapper classes
        function getHeroClasses() {
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
        }

        // Generate hero wrapper styles
        function getHeroStyles() {
            const styles = generateInlineStyles(attributes);
            
            if (minHeight) {
                styles.minHeight = minHeight;
            }
            
            if (backgroundImageUrl) {
                styles.backgroundImage = `url(${backgroundImageUrl})`;
                styles.backgroundPosition = backgroundPosition;
                styles.backgroundSize = backgroundSize;
                styles.backgroundRepeat = backgroundRepeat;
                styles.backgroundAttachment = backgroundAttachment;
            }
            
            if (animationEnabled && animationDuration) {
                styles.animationDuration = `${animationDuration}ms`;
            }
            
            return styles;
        }

        function getContentStyles() {
            const styles = {};
            
            if (contentMaxWidth) {
                styles.maxWidth = contentMaxWidth;
            }
            
            return styles;
        }

        function getOverlayStyles() {
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
        }

        // Parse focal point from background position
        const getFocalPointFromPosition = function() {
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

        return el(Fragment, null,
            el(InspectorControls, null,
                // Background Settings
                el(PanelBody, {
                    title: __('Background Settings', 'zenstarter'),
                    initialOpen: true
                },
                    el(MediaUploadCheck, null,
                        el(MediaUpload, {
                            onSelect: onSelectImage,
                            allowedTypes: ['image'],
                            value: backgroundImageId,
                            render: function({ open }) {
                                return el('div', { className: 'zen-hero-background-control' },
                                    !backgroundImageUrl ? 
                                        el(Button, {
                                            className: 'zen-hero-background-button',
                                            onClick: open,
                                            variant: 'secondary'
                                        }, __('Select Background Image', 'zenstarter'))
                                    :
                                        el(Fragment, null,
                                            el(ResponsiveWrapper, {
                                                naturalWidth: backgroundImage?.width || 1920,
                                                naturalHeight: backgroundImage?.height || 1080
                                            },
                                                el('img', {
                                                    src: backgroundImageUrl,
                                                    alt: backgroundImage?.alt || ''
                                                })
                                            ),
                                            el('div', { className: 'zen-hero-background-actions' },
                                                el(Button, {
                                                    onClick: open,
                                                    variant: 'secondary'
                                                }, __('Replace Image', 'zenstarter')),
                                                el(Button, {
                                                    onClick: onRemoveImage,
                                                    variant: 'link',
                                                    isDestructive: true
                                                }, __('Remove Image', 'zenstarter'))
                                            )
                                        )
                                );
                            }
                        })
                    ),

                    backgroundImageUrl && el(Fragment, null,
                        el(FocalPointPicker, {
                            label: __('Background Position', 'zenstarter'),
                            url: backgroundImageUrl,
                            value: getFocalPointFromPosition(),
                            onChange: onChangeFocalPoint
                        }),
                        
                        el(SelectControl, {
                            label: __('Background Size', 'zenstarter'),
                            value: backgroundSize,
                            options: [
                                { label: __('Cover', 'zenstarter'), value: 'cover' },
                                { label: __('Contain', 'zenstarter'), value: 'contain' },
                                { label: __('Auto', 'zenstarter'), value: 'auto' },
                                { label: __('100% Width', 'zenstarter'), value: '100% auto' },
                                { label: __('100% Height', 'zenstarter'), value: 'auto 100%' }
                            ],
                            onChange: function(value) { setAttributes({ backgroundSize: value }); }
                        }),
                        
                        el(SelectControl, {
                            label: __('Background Repeat', 'zenstarter'),
                            value: backgroundRepeat,
                            options: [
                                { label: __('No Repeat', 'zenstarter'), value: 'no-repeat' },
                                { label: __('Repeat', 'zenstarter'), value: 'repeat' },
                                { label: __('Repeat X', 'zenstarter'), value: 'repeat-x' },
                                { label: __('Repeat Y', 'zenstarter'), value: 'repeat-y' }
                            ],
                            onChange: function(value) { setAttributes({ backgroundRepeat: value }); }
                        })
                    )
                ),

                // Layout Settings
                el(PanelBody, {
                    title: __('Layout Settings', 'zenstarter'),
                    initialOpen: false
                },
                    el(TextControl, {
                        label: __('Minimum Height', 'zenstarter'),
                        value: minHeight,
                        placeholder: '60vh',
                        help: __('Use CSS units like px, vh, rem, etc.', 'zenstarter'),
                        onChange: function(value) { setAttributes({ minHeight: value }); }
                    }),
                    
                    el(SelectControl, {
                        label: __('Content Alignment', 'zenstarter'),
                        value: contentAlignment,
                        options: [
                            { label: __('Left', 'zenstarter'), value: 'left' },
                            { label: __('Center', 'zenstarter'), value: 'center' },
                            { label: __('Right', 'zenstarter'), value: 'right' }
                        ],
                        onChange: function(value) { setAttributes({ contentAlignment: value }); }
                    }),
                    
                    el(SelectControl, {
                        label: __('Vertical Alignment', 'zenstarter'),
                        value: verticalAlignment,
                        options: [
                            { label: __('Top', 'zenstarter'), value: 'top' },
                            { label: __('Center', 'zenstarter'), value: 'center' },
                            { label: __('Bottom', 'zenstarter'), value: 'bottom' }
                        ],
                        onChange: function(value) { setAttributes({ verticalAlignment: value }); }
                    }),
                    
                    el(TextControl, {
                        label: __('Content Max Width', 'zenstarter'),
                        value: contentMaxWidth,
                        placeholder: '800px',
                        help: __('Maximum width for content area', 'zenstarter'),
                        onChange: function(value) { setAttributes({ contentMaxWidth: value }); }
                    })
                ),

                // Overlay Settings
                (overlayColor || overlayGradient) && el(PanelBody, {
                    title: __('Overlay Settings', 'zenstarter'),
                    initialOpen: false
                },
                    el(RangeControl, {
                        label: __('Overlay Opacity', 'zenstarter'),
                        value: overlayOpacity,
                        onChange: function(value) { setAttributes({ overlayOpacity: value }); },
                        min: 0,
                        max: 1,
                        step: 0.1
                    })
                ),

                // Color Settings
                el(PanelColorSettings, {
                    title: __('Colors', 'zenstarter'),
                    colorSettings: [
                        {
                            value: backgroundColor.color,
                            onChange: setBackgroundColor,
                            label: __('Background Color', 'zenstarter')
                        },
                        {
                            value: textColor.color,
                            onChange: setTextColor,
                            label: __('Text Color', 'zenstarter')
                        },
                        {
                            value: overlayColor,
                            onChange: function(value) { setAttributes({ overlayColor: value }); },
                            label: __('Overlay Color', 'zenstarter')
                        }
                    ]
                })
            ),

            el('div', blockProps,
                // Background Overlay
                (overlayColor || overlayGradient) && el('div', {
                    className: 'zen-hero__overlay',
                    style: getOverlayStyles()
                }),
                
                // Content Container
                el('div', {
                    className: 'zen-hero__content',
                    style: getContentStyles()
                },
                    el(InnerBlocks, {
                        template: heroTemplate,
                        renderAppender: hasInnerBlocks ? undefined : InnerBlocks.ButtonBlockAppender,
                        templateLock: false
                    })
                )
            )
        );
    }

    // Save component
    function ZenHeroSave(props) {
        const { attributes } = props;
        const {
            backgroundImageUrl = '',
            backgroundPosition = 'center center',
            backgroundSize = 'cover',
            backgroundRepeat = 'no-repeat',
            backgroundAttachment = 'scroll',
            overlayColor = '',
            overlayOpacity = 0.5,
            overlayGradient = '',
            minHeight = '60vh',
            contentAlignment = 'center',
            verticalAlignment = 'center',
            contentMaxWidth = '800px',
            animationEnabled = false,
            animationType = 'fadeIn',
            animationDuration = 1000,
            parallaxEnabled = false,
            parallaxSpeed = 0.5
        } = attributes;

        function getHeroClasses() {
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
        }

        function getHeroStyles() {
            const styles = generateInlineStyles(attributes);
            
            if (minHeight) {
                styles.minHeight = minHeight;
            }
            
            if (backgroundImageUrl) {
                styles.backgroundImage = `url(${backgroundImageUrl})`;
                styles.backgroundPosition = backgroundPosition;
                styles.backgroundSize = backgroundSize;
                styles.backgroundRepeat = backgroundRepeat;
                styles.backgroundAttachment = backgroundAttachment;
            }
            
            if (animationEnabled && animationDuration) {
                styles.animationDuration = `${animationDuration}ms`;
            }
            
            if (parallaxEnabled && backgroundImageUrl) {
                styles['--parallax-speed'] = parallaxSpeed;
            }
            
            return styles;
        }

        function getContentStyles() {
            const styles = {};
            
            if (contentMaxWidth) {
                styles.maxWidth = contentMaxWidth;
            }
            
            return styles;
        }

        function getOverlayStyles() {
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
        }

        // Generate data attributes
        const getDataAttributes = function() {
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

        return el('div', blockProps,
            // Background Overlay
            (overlayColor || overlayGradient) && el('div', {
                className: 'zen-hero__overlay',
                style: getOverlayStyles()
            }),
            
            // Content Container
            el('div', {
                className: 'zen-hero__content',
                style: getContentStyles()
            },
                el(InnerBlocks.Content)
            )
        );
    }

    // Register the block
    registerBlockType('zenstarter/zen-hero', {
        apiVersion: 2,
        title: __('Zen Hero', 'zenstarter'),
        icon: 'cover-image',
        category: 'zenstarter',
        description: __('A powerful hero section with background, title, description and call-to-action buttons.', 'zenstarter'),
        keywords: [
            __('hero', 'zenstarter'),
            __('banner', 'zenstarter'),
            __('header', 'zenstarter')
        ],
        supports: {
            align: true,
            anchor: true,
            className: true,
            spacing: {
                margin: true,
                padding: true,
                blockGap: true
            },
            color: {
                background: true,
                text: true,
                gradients: true,
                link: true
            },
            typography: {
                fontSize: true,
                lineHeight: true,
                textAlign: true,
                fontWeight: true,
                fontFamily: true
            }
        },
        attributes: {
            backgroundColor: {
                type: 'string'
            },
            textColor: {
                type: 'string'
            },
            backgroundImageUrl: {
                type: 'string'
            },
            backgroundPosition: {
                type: 'string',
                default: 'center center'
            },
            backgroundSize: {
                type: 'string',
                default: 'cover'
            },
            overlayColor: {
                type: 'string'
            },
            overlayOpacity: {
                type: 'number',
                default: 0.5
            },
            minHeight: {
                type: 'string',
                default: '60vh'
            },
            contentAlignment: {
                type: 'string',
                default: 'center'
            },
            verticalAlignment: {
                type: 'string',
                default: 'center'
            },
            contentMaxWidth: {
                type: 'string',
                default: '800px'
            },
            animationEnabled: {
                type: 'boolean',
                default: false
            },
            animationType: {
                type: 'string',
                default: 'fadeIn'
            }
        },
        edit: compose([
            withColors('backgroundColor', { textColor: 'color' })
        ])(ZenHeroEdit),
        save: ZenHeroSave
    });

})();