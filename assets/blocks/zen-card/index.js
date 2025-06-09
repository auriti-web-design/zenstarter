/**
 * Zen Card Block - Compiled Version
 * Modular card component with image, content, and various layout options
 */
(function() {
    'use strict';
    
    const { registerBlockType } = wp.blocks;
    const { InspectorControls, InnerBlocks, useBlockProps, withColors, RichText, MediaUpload, MediaUploadCheck, LinkControl } = wp.blockEditor;
    const { PanelBody, SelectControl, ToggleControl, TextControl, Button, ResponsiveWrapper } = wp.components;
    const { __ } = wp.i18n;
    const { compose } = wp.compose;
    const { useSelect } = wp.data;
    const { createElement: el, Fragment, useState } = wp.element;

    // Default card template
    const cardTemplate = [
        ['core/heading', {
            level: 3,
            placeholder: __('Card Title...', 'zenstarter'),
            className: 'zen-card__title'
        }],
        ['core/paragraph', {
            placeholder: __('Card description...', 'zenstarter'),
            className: 'zen-card__text'
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
    function ZenCardEdit(props) {
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
            imageUrl = '',
            imageAlt = '',
            imageId = null,
            imagePosition = 'top',
            imageAspectRatio = 'landscape',
            showImage = true,
            contentAlignment = 'left',
            cardStyle = 'default',
            shadowLevel = 'medium',
            hoverEffect = 'lift',
            buttonText = '',
            buttonUrl = '',
            buttonTarget = '_self',
            buttonStyle = 'primary',
            buttonSize = 'medium',
            showButton = false,
            isClickable = false,
            metaText = '',
            metaPosition = 'bottom',
            showMeta = false,
            animationEnabled = false,
            animationType = 'fadeIn'
        } = attributes;

        const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false);

        // Check if block has inner blocks
        const hasInnerBlocks = useSelect(function(select) {
            const block = select('core/block-editor').getBlock(clientId);
            return !!(block && block.innerBlocks && block.innerBlocks.length > 0);
        }, [clientId]);

        // Handle image selection
        const onSelectImage = function(media) {
            setAttributes({
                imageUrl: media.url,
                imageAlt: media.alt || '',
                imageId: media.id
            });
        };

        const onRemoveImage = function() {
            setAttributes({
                imageUrl: '',
                imageAlt: '',
                imageId: null
            });
        };

        // Handle button link change
        const onLinkChange = function(link) {
            setAttributes({
                buttonUrl: link?.url || '',
                buttonTarget: link?.opensInNewTab ? '_blank' : '_self'
            });
        };

        // Generate card wrapper classes
        function getCardClasses() {
            const classes = ['zen-card'];
            
            if (!showImage) {
                classes.push('zen-card--image-none');
            } else if (imagePosition !== 'top') {
                classes.push(`zen-card--image-${imagePosition}`);
            }
            
            if (imageAspectRatio !== 'landscape') {
                classes.push(`zen-card--aspect-${imageAspectRatio}`);
            }
            
            if (contentAlignment !== 'left') {
                classes.push(`zen-card--align-${contentAlignment}`);
            }
            
            if (cardStyle !== 'default') {
                classes.push(`zen-card--${cardStyle}`);
            }
            
            if (shadowLevel !== 'medium') {
                classes.push(`zen-card--shadow-${shadowLevel}`);
            }
            
            if (hoverEffect !== 'lift') {
                classes.push(`zen-card--hover-${hoverEffect}`);
            }
            
            if (isClickable) {
                classes.push('zen-card--clickable');
            }
            
            if (showMeta) {
                classes.push('zen-card--has-meta');
            }
            
            if (animationEnabled) {
                classes.push(`zen-card--animated zen-card--${animationType}`);
            }
            
            return generateBlockClasses('card', attributes, classes);
        }

        // Generate card wrapper styles
        function getCardStyles() {
            return generateInlineStyles(attributes);
        }

        const blockProps = useBlockProps({
            className: getCardClasses(),
            style: getCardStyles()
        });

        return el(Fragment, null,
            el(InspectorControls, null,
                // Image Settings
                el(PanelBody, {
                    title: __('Image Settings', 'zenstarter'),
                    initialOpen: true
                },
                    el(ToggleControl, {
                        label: __('Show Image', 'zenstarter'),
                        checked: showImage,
                        onChange: function(value) { setAttributes({ showImage: value }); }
                    }),
                    
                    showImage && el(Fragment, null,
                        el(MediaUploadCheck, null,
                            el(MediaUpload, {
                                onSelect: onSelectImage,
                                allowedTypes: ['image'],
                                value: imageId,
                                render: function({ open }) {
                                    return el('div', { className: 'zen-card-image-control' },
                                        !imageUrl ? 
                                            el(Button, {
                                                className: 'zen-card-image-button',
                                                onClick: open,
                                                variant: 'secondary'
                                            }, __('Select Card Image', 'zenstarter'))
                                        :
                                            el(Fragment, null,
                                                el(ResponsiveWrapper, {
                                                    naturalWidth: 400,
                                                    naturalHeight: 300
                                                },
                                                    el('img', {
                                                        src: imageUrl,
                                                        alt: imageAlt
                                                    })
                                                ),
                                                el('div', { className: 'zen-card-image-actions' },
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
                        
                        el(SelectControl, {
                            label: __('Image Position', 'zenstarter'),
                            value: imagePosition,
                            options: [
                                { label: __('Top', 'zenstarter'), value: 'top' },
                                { label: __('Left', 'zenstarter'), value: 'left' },
                                { label: __('Right', 'zenstarter'), value: 'right' },
                                { label: __('Background', 'zenstarter'), value: 'background' }
                            ],
                            onChange: function(value) { setAttributes({ imagePosition: value }); }
                        }),
                        
                        el(SelectControl, {
                            label: __('Image Aspect Ratio', 'zenstarter'),
                            value: imageAspectRatio,
                            options: [
                                { label: __('Landscape (4:3)', 'zenstarter'), value: 'landscape' },
                                { label: __('Square (1:1)', 'zenstarter'), value: 'square' },
                                { label: __('Portrait (3:4)', 'zenstarter'), value: 'portrait' },
                                { label: __('Wide (16:9)', 'zenstarter'), value: 'wide' }
                            ],
                            onChange: function(value) { setAttributes({ imageAspectRatio: value }); }
                        }),
                        
                        el(TextControl, {
                            label: __('Image Alt Text', 'zenstarter'),
                            value: imageAlt,
                            onChange: function(value) { setAttributes({ imageAlt: value }); },
                            help: __('Describe the image for accessibility', 'zenstarter')
                        })
                    )
                ),

                // Content Settings
                el(PanelBody, {
                    title: __('Content Settings', 'zenstarter'),
                    initialOpen: false
                },
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
                    
                    el(ToggleControl, {
                        label: __('Show Meta Text', 'zenstarter'),
                        checked: showMeta,
                        onChange: function(value) { setAttributes({ showMeta: value }); }
                    }),
                    
                    showMeta && el(Fragment, null,
                        el(TextControl, {
                            label: __('Meta Text', 'zenstarter'),
                            value: metaText,
                            onChange: function(value) { setAttributes({ metaText: value }); },
                            placeholder: __('e.g., Category, Date, Author', 'zenstarter')
                        }),
                        
                        el(SelectControl, {
                            label: __('Meta Position', 'zenstarter'),
                            value: metaPosition,
                            options: [
                                { label: __('Top', 'zenstarter'), value: 'top' },
                                { label: __('Bottom', 'zenstarter'), value: 'bottom' }
                            ],
                            onChange: function(value) { setAttributes({ metaPosition: value }); }
                        })
                    )
                ),

                // Button Settings
                el(PanelBody, {
                    title: __('Button Settings', 'zenstarter'),
                    initialOpen: false
                },
                    el(ToggleControl, {
                        label: __('Show Button', 'zenstarter'),
                        checked: showButton,
                        onChange: function(value) { setAttributes({ showButton: value }); }
                    }),
                    
                    showButton && el(Fragment, null,
                        el(TextControl, {
                            label: __('Button Text', 'zenstarter'),
                            value: buttonText,
                            onChange: function(value) { setAttributes({ buttonText: value }); },
                            placeholder: __('Read more', 'zenstarter')
                        }),
                        
                        el('div', { className: 'zen-card-link-control' },
                            el(Button, {
                                variant: 'secondary',
                                onClick: function() { setIsLinkPickerVisible(!isLinkPickerVisible); }
                            }, buttonUrl ? __('Edit Link', 'zenstarter') : __('Add Link', 'zenstarter')),
                            
                            isLinkPickerVisible && el(LinkControl, {
                                value: {
                                    url: buttonUrl,
                                    opensInNewTab: buttonTarget === '_blank'
                                },
                                onChange: onLinkChange,
                                onRemove: function() {
                                    setAttributes({ buttonUrl: '', buttonTarget: '_self' });
                                    setIsLinkPickerVisible(false);
                                }
                            })
                        ),
                        
                        el(SelectControl, {
                            label: __('Button Style', 'zenstarter'),
                            value: buttonStyle,
                            options: [
                                { label: __('Primary', 'zenstarter'), value: 'primary' },
                                { label: __('Secondary', 'zenstarter'), value: 'secondary' },
                                { label: __('Outline', 'zenstarter'), value: 'outline' },
                                { label: __('Ghost', 'zenstarter'), value: 'ghost' },
                                { label: __('Link', 'zenstarter'), value: 'link' }
                            ],
                            onChange: function(value) { setAttributes({ buttonStyle: value }); }
                        }),
                        
                        el(SelectControl, {
                            label: __('Button Size', 'zenstarter'),
                            value: buttonSize,
                            options: [
                                { label: __('Small', 'zenstarter'), value: 'small' },
                                { label: __('Medium', 'zenstarter'), value: 'medium' },
                                { label: __('Large', 'zenstarter'), value: 'large' }
                            ],
                            onChange: function(value) { setAttributes({ buttonSize: value }); }
                        })
                    ),
                    
                    el(ToggleControl, {
                        label: __('Make Entire Card Clickable', 'zenstarter'),
                        checked: isClickable,
                        onChange: function(value) { setAttributes({ isClickable: value }); },
                        help: __('If enabled, clicking anywhere on the card will act as a link', 'zenstarter')
                    })
                ),

                // Style Settings
                el(PanelBody, {
                    title: __('Style Settings', 'zenstarter'),
                    initialOpen: false
                },
                    el(SelectControl, {
                        label: __('Card Style', 'zenstarter'),
                        value: cardStyle,
                        options: [
                            { label: __('Default', 'zenstarter'), value: 'default' },
                            { label: __('Horizontal', 'zenstarter'), value: 'horizontal' },
                            { label: __('Overlay', 'zenstarter'), value: 'overlay' },
                            { label: __('Minimal', 'zenstarter'), value: 'minimal' }
                        ],
                        onChange: function(value) { setAttributes({ cardStyle: value }); }
                    }),
                    
                    el(SelectControl, {
                        label: __('Shadow Level', 'zenstarter'),
                        value: shadowLevel,
                        options: [
                            { label: __('None', 'zenstarter'), value: 'none' },
                            { label: __('Small', 'zenstarter'), value: 'small' },
                            { label: __('Medium', 'zenstarter'), value: 'medium' },
                            { label: __('Large', 'zenstarter'), value: 'large' }
                        ],
                        onChange: function(value) { setAttributes({ shadowLevel: value }); }
                    }),
                    
                    el(SelectControl, {
                        label: __('Hover Effect', 'zenstarter'),
                        value: hoverEffect,
                        options: [
                            { label: __('None', 'zenstarter'), value: 'none' },
                            { label: __('Lift', 'zenstarter'), value: 'lift' },
                            { label: __('Scale', 'zenstarter'), value: 'scale' },
                            { label: __('Glow', 'zenstarter'), value: 'glow' },
                            { label: __('Rotate', 'zenstarter'), value: 'rotate' },
                            { label: __('Slide Image', 'zenstarter'), value: 'slide' }
                        ],
                        onChange: function(value) { setAttributes({ hoverEffect: value }); }
                    })
                ),

                // Animation Settings
                el(PanelBody, {
                    title: __('Animation Settings', 'zenstarter'),
                    initialOpen: false
                },
                    el(ToggleControl, {
                        label: __('Enable Animation', 'zenstarter'),
                        checked: animationEnabled,
                        onChange: function(value) { setAttributes({ animationEnabled: value }); }
                    }),
                    
                    animationEnabled && el(SelectControl, {
                        label: __('Animation Type', 'zenstarter'),
                        value: animationType,
                        options: [
                            { label: __('Fade In', 'zenstarter'), value: 'fadeIn' },
                            { label: __('Slide Up', 'zenstarter'), value: 'slideUp' },
                            { label: __('Slide Left', 'zenstarter'), value: 'slideLeft' },
                            { label: __('Slide Right', 'zenstarter'), value: 'slideRight' },
                            { label: __('Zoom In', 'zenstarter'), value: 'zoomIn' },
                            { label: __('Flip In', 'zenstarter'), value: 'flipIn' }
                        ],
                        onChange: function(value) { setAttributes({ animationType: value }); }
                    })
                )
            ),

            el('div', blockProps,
                // Card Image
                showImage && imageUrl && imagePosition === 'top' && el('div', {
                    className: 'zen-card__image'
                },
                    el('img', {
                        src: imageUrl,
                        alt: imageAlt,
                        className: 'zen-card__image-element'
                    })
                ),
                
                // Background Image (for background position)
                showImage && imageUrl && imagePosition === 'background' && el('div', {
                    className: 'zen-card__background',
                    style: {
                        backgroundImage: `url(${imageUrl})`
                    }
                }),
                
                // Side Images (for left/right positions)
                showImage && imageUrl && (imagePosition === 'left' || imagePosition === 'right') && el('div', {
                    className: 'zen-card__image'
                },
                    el('img', {
                        src: imageUrl,
                        alt: imageAlt,
                        className: 'zen-card__image-element'
                    })
                ),
                
                // Card Content
                el('div', { className: 'zen-card__content' },
                    // Meta Text (top)
                    showMeta && metaText && metaPosition === 'top' && el('div', {
                        className: 'zen-card__meta zen-card__meta--top'
                    }, metaText),
                    
                    // Inner Blocks Content
                    el(InnerBlocks, {
                        template: cardTemplate,
                        renderAppender: hasInnerBlocks ? undefined : InnerBlocks.ButtonBlockAppender,
                        templateLock: false
                    }),
                    
                    // Meta Text (bottom)
                    showMeta && metaText && metaPosition === 'bottom' && el('div', {
                        className: 'zen-card__meta zen-card__meta--bottom'
                    }, metaText),
                    
                    // Button
                    showButton && buttonText && !isClickable && el('div', { className: 'zen-card__actions' },
                        el('a', {
                            href: '#',
                            className: `zen-card__button zen-card__button--${buttonStyle} zen-card__button--${buttonSize}`,
                            onClick: function(e) { e.preventDefault(); }
                        }, buttonText)
                    )
                )
            )
        );
    }

    // Save component
    function ZenCardSave(props) {
        const { attributes } = props;
        const {
            imageUrl = '',
            imageAlt = '',
            imagePosition = 'top',
            imageAspectRatio = 'landscape',
            showImage = true,
            contentAlignment = 'left',
            cardStyle = 'default',
            shadowLevel = 'medium',
            hoverEffect = 'lift',
            buttonText = '',
            buttonUrl = '',
            buttonTarget = '_self',
            buttonStyle = 'primary',
            buttonSize = 'medium',
            showButton = false,
            isClickable = false,
            metaText = '',
            metaPosition = 'bottom',
            showMeta = false,
            animationEnabled = false,
            animationType = 'fadeIn'
        } = attributes;

        function getCardClasses() {
            const classes = ['zen-card'];
            
            if (!showImage) {
                classes.push('zen-card--image-none');
            } else if (imagePosition !== 'top') {
                classes.push(`zen-card--image-${imagePosition}`);
            }
            
            if (imageAspectRatio !== 'landscape') {
                classes.push(`zen-card--aspect-${imageAspectRatio}`);
            }
            
            if (contentAlignment !== 'left') {
                classes.push(`zen-card--align-${contentAlignment}`);
            }
            
            if (cardStyle !== 'default') {
                classes.push(`zen-card--${cardStyle}`);
            }
            
            if (shadowLevel !== 'medium') {
                classes.push(`zen-card--shadow-${shadowLevel}`);
            }
            
            if (hoverEffect !== 'lift') {
                classes.push(`zen-card--hover-${hoverEffect}`);
            }
            
            if (isClickable) {
                classes.push('zen-card--clickable');
            }
            
            if (showMeta) {
                classes.push('zen-card--has-meta');
            }
            
            if (animationEnabled) {
                classes.push(`zen-card--animated zen-card--${animationType}`);
            }
            
            return generateBlockClasses('card', attributes, classes);
        }

        function getCardStyles() {
            return generateInlineStyles(attributes);
        }

        // Generate data attributes
        const getDataAttributes = function() {
            const dataAttrs = {};
            
            if (animationEnabled) {
                dataAttrs['data-animation'] = animationType;
                dataAttrs['data-animated'] = 'true';
            }
            
            if (isClickable && buttonUrl) {
                dataAttrs['data-href'] = buttonUrl;
                dataAttrs['data-target'] = buttonTarget;
            }
            
            return dataAttrs;
        };

        const blockProps = useBlockProps.save({
            className: getCardClasses(),
            style: getCardStyles(),
            ...getDataAttributes()
        });

        // Card content wrapper
        const cardContent = el(Fragment, null,
            // Card Image
            showImage && imageUrl && imagePosition === 'top' && el('div', {
                className: 'zen-card__image'
            },
                el('img', {
                    src: imageUrl,
                    alt: imageAlt,
                    className: 'zen-card__image-element',
                    loading: 'lazy',
                    decoding: 'async'
                })
            ),
            
            // Background Image (for background position)
            showImage && imageUrl && imagePosition === 'background' && el('div', {
                className: 'zen-card__background',
                style: {
                    backgroundImage: `url(${imageUrl})`
                }
            }),
            
            // Side Images (for left/right positions)
            showImage && imageUrl && (imagePosition === 'left' || imagePosition === 'right') && el('div', {
                className: 'zen-card__image'
            },
                el('img', {
                    src: imageUrl,
                    alt: imageAlt,
                    className: 'zen-card__image-element',
                    loading: 'lazy',
                    decoding: 'async'
                })
            ),
            
            // Card Content
            el('div', { className: 'zen-card__content' },
                // Meta Text (top)
                showMeta && metaText && metaPosition === 'top' && el('div', {
                    className: 'zen-card__meta zen-card__meta--top'
                }, metaText),
                
                // Inner Blocks Content
                el(InnerBlocks.Content),
                
                // Meta Text (bottom)
                showMeta && metaText && metaPosition === 'bottom' && el('div', {
                    className: 'zen-card__meta zen-card__meta--bottom'
                }, metaText),
                
                // Button
                showButton && buttonText && buttonUrl && !isClickable && el('div', { className: 'zen-card__actions' },
                    el('a', {
                        href: buttonUrl,
                        className: `zen-card__button zen-card__button--${buttonStyle} zen-card__button--${buttonSize}`,
                        target: buttonTarget,
                        rel: buttonTarget === '_blank' ? 'noopener noreferrer' : undefined
                    }, buttonText)
                )
            )
        );

        // Return clickable card or regular card
        if (isClickable && buttonUrl) {
            return el('div', blockProps,
                el('a', {
                    href: buttonUrl,
                    className: 'zen-card__link',
                    target: buttonTarget,
                    rel: buttonTarget === '_blank' ? 'noopener noreferrer' : undefined
                }, cardContent)
            );
        }

        return el('div', blockProps, cardContent);
    }

    // Register the block
    registerBlockType('zenstarter/zen-card', {
        apiVersion: 2,
        title: __('Zen Card', 'zenstarter'),
        icon: 'id-alt',
        category: 'zenstarter',
        description: __('A versatile card component with image, content, and various layout options.', 'zenstarter'),
        keywords: [
            __('card', 'zenstarter'),
            __('post', 'zenstarter'),
            __('content', 'zenstarter')
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
            backgroundColor: { type: 'string' },
            textColor: { type: 'string' },
            imageUrl: { type: 'string', default: '' },
            imageAlt: { type: 'string', default: '' },
            imageId: { type: 'number', default: null },
            imagePosition: { type: 'string', default: 'top' },
            imageAspectRatio: { type: 'string', default: 'landscape' },
            showImage: { type: 'boolean', default: true },
            contentAlignment: { type: 'string', default: 'left' },
            cardStyle: { type: 'string', default: 'default' },
            shadowLevel: { type: 'string', default: 'medium' },
            hoverEffect: { type: 'string', default: 'lift' },
            buttonText: { type: 'string', default: '' },
            buttonUrl: { type: 'string', default: '' },
            buttonTarget: { type: 'string', default: '_self' },
            buttonStyle: { type: 'string', default: 'primary' },
            buttonSize: { type: 'string', default: 'medium' },
            showButton: { type: 'boolean', default: false },
            isClickable: { type: 'boolean', default: false },
            metaText: { type: 'string', default: '' },
            metaPosition: { type: 'string', default: 'bottom' },
            showMeta: { type: 'boolean', default: false },
            animationEnabled: { type: 'boolean', default: false },
            animationType: { type: 'string', default: 'fadeIn' }
        },
        edit: compose([
            withColors('backgroundColor', { textColor: 'color' })
        ])(ZenCardEdit),
        save: ZenCardSave
    });

})();