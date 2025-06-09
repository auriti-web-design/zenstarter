/**
 * Zen CTA Block - Compiled Version
 * Call-to-action block with customizable content and styling
 */
(function() {
    'use strict';
    
    const { registerBlockType } = wp.blocks;
    const { InspectorControls, InnerBlocks, useBlockProps, withColors, LinkControl, MediaUpload, MediaUploadCheck } = wp.blockEditor;
    const { PanelBody, SelectControl, ToggleControl, TextControl, Button, ResponsiveWrapper } = wp.components;
    const { __ } = wp.i18n;
    const { compose } = wp.compose;
    const { useSelect } = wp.data;
    const { createElement: el, Fragment, useState } = wp.element;

    // Default CTA template
    const ctaTemplate = [
        ['core/heading', {
            level: 2,
            placeholder: __('Call to Action Title...', 'zenstarter'),
            className: 'zen-cta__title'
        }],
        ['core/paragraph', {
            placeholder: __('Compelling description...', 'zenstarter'),
            className: 'zen-cta__description'
        }],
        ['core/buttons', {
            className: 'zen-cta__actions'
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
    function ZenCtaEdit(props) {
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
            buttonText = '',
            buttonUrl = '',
            buttonTarget = '_self',
            buttonStyle = 'primary',
            buttonSize = 'medium',
            showButton = false,
            layoutStyle = 'vertical',
            contentAlignment = 'center',
            iconUrl = '',
            iconPosition = 'none',
            animationEnabled = false,
            animationType = 'fadeIn'
        } = attributes;

        const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false);

        // Check if block has inner blocks
        const hasInnerBlocks = useSelect(function(select) {
            const block = select('core/block-editor').getBlock(clientId);
            return !!(block && block.innerBlocks && block.innerBlocks.length > 0);
        }, [clientId]);

        // Handle button link change
        const onLinkChange = function(link) {
            setAttributes({
                buttonUrl: link?.url || '',
                buttonTarget: link?.opensInNewTab ? '_blank' : '_self'
            });
        };

        // Handle icon selection
        const onSelectIcon = function(media) {
            setAttributes({
                iconUrl: media.url
            });
        };

        const onRemoveIcon = function() {
            setAttributes({
                iconUrl: ''
            });
        };

        // Generate CTA wrapper classes
        function getCtaClasses() {
            const classes = ['zen-cta'];
            
            if (layoutStyle !== 'vertical') {
                classes.push(`zen-cta--${layoutStyle}`);
            }
            
            if (contentAlignment !== 'center') {
                classes.push(`zen-cta--align-${contentAlignment}`);
            }
            
            if (iconUrl && iconPosition !== 'none') {
                classes.push('zen-cta--has-icon');
                classes.push(`zen-cta--icon-${iconPosition}`);
            }
            
            if (animationEnabled) {
                classes.push(`zen-cta--animated zen-cta--${animationType}`);
            }
            
            return generateBlockClasses('cta', attributes, classes);
        }

        // Generate CTA wrapper styles
        function getCtaStyles() {
            return generateInlineStyles(attributes);
        }

        const blockProps = useBlockProps({
            className: getCtaClasses(),
            style: getCtaStyles()
        });

        return el(Fragment, null,
            el(InspectorControls, null,
                // Button Settings
                el(PanelBody, {
                    title: __('Button Settings', 'zenstarter'),
                    initialOpen: true
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
                        
                        el('div', { className: 'zen-cta-link-control' },
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
                                { label: __('Ghost', 'zenstarter'), value: 'ghost' }
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
                    )
                ),

                // Layout Settings
                el(PanelBody, {
                    title: __('Layout Settings', 'zenstarter'),
                    initialOpen: false
                },
                    el(SelectControl, {
                        label: __('Layout Style', 'zenstarter'),
                        value: layoutStyle,
                        options: [
                            { label: __('Vertical', 'zenstarter'), value: 'vertical' },
                            { label: __('Horizontal', 'zenstarter'), value: 'horizontal' },
                            { label: __('Centered', 'zenstarter'), value: 'centered' }
                        ],
                        onChange: function(value) { setAttributes({ layoutStyle: value }); }
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
                            { label: __('Bounce', 'zenstarter'), value: 'bounce' }
                        ],
                        onChange: function(value) { setAttributes({ animationType: value }); }
                    })
                )
            ),

            el('div', blockProps,
                // Icon (before)
                iconUrl && iconPosition === 'before' && el('div', {
                    className: 'zen-cta__icon zen-cta__icon--before'
                },
                    el('img', {
                        src: iconUrl,
                        alt: '',
                        className: 'zen-cta__icon-image'
                    })
                ),
                
                // Content Area
                el('div', { className: 'zen-cta__content' },
                    el(InnerBlocks, {
                        template: ctaTemplate,
                        renderAppender: hasInnerBlocks ? undefined : InnerBlocks.ButtonBlockAppender,
                        templateLock: false
                    })
                ),
                
                // Icon (after)
                iconUrl && iconPosition === 'after' && el('div', {
                    className: 'zen-cta__icon zen-cta__icon--after'
                },
                    el('img', {
                        src: iconUrl,
                        alt: '',
                        className: 'zen-cta__icon-image'
                    })
                ),
                
                // Button
                showButton && buttonText && el('div', { className: 'zen-cta__actions' },
                    el('a', {
                        href: '#',
                        className: `zen-cta__button zen-cta__button--${buttonStyle} zen-cta__button--${buttonSize}`,
                        onClick: function(e) { e.preventDefault(); }
                    }, buttonText)
                )
            )
        );
    }

    // Save component
    function ZenCtaSave(props) {
        const { attributes } = props;
        const {
            buttonText = '',
            buttonUrl = '',
            buttonTarget = '_self',
            buttonStyle = 'primary',
            buttonSize = 'medium',
            showButton = false,
            layoutStyle = 'vertical',
            contentAlignment = 'center',
            iconUrl = '',
            iconPosition = 'none',
            animationEnabled = false,
            animationType = 'fadeIn'
        } = attributes;

        function getCtaClasses() {
            const classes = ['zen-cta'];
            
            if (layoutStyle !== 'vertical') {
                classes.push(`zen-cta--${layoutStyle}`);
            }
            
            if (contentAlignment !== 'center') {
                classes.push(`zen-cta--align-${contentAlignment}`);
            }
            
            if (iconUrl && iconPosition !== 'none') {
                classes.push('zen-cta--has-icon');
                classes.push(`zen-cta--icon-${iconPosition}`);
            }
            
            if (animationEnabled) {
                classes.push(`zen-cta--animated zen-cta--${animationType}`);
            }
            
            return generateBlockClasses('cta', attributes, classes);
        }

        function getCtaStyles() {
            return generateInlineStyles(attributes);
        }

        // Generate data attributes
        const getDataAttributes = function() {
            const dataAttrs = {};
            
            if (animationEnabled) {
                dataAttrs['data-animation'] = animationType;
                dataAttrs['data-animated'] = 'true';
            }
            
            return dataAttrs;
        };

        const blockProps = useBlockProps.save({
            className: getCtaClasses(),
            style: getCtaStyles(),
            ...getDataAttributes()
        });

        return el('div', blockProps,
            // Icon (before)
            iconUrl && iconPosition === 'before' && el('div', {
                className: 'zen-cta__icon zen-cta__icon--before'
            },
                el('img', {
                    src: iconUrl,
                    alt: '',
                    className: 'zen-cta__icon-image',
                    loading: 'lazy'
                })
            ),
            
            // Content Area
            el('div', { className: 'zen-cta__content' },
                el(InnerBlocks.Content)
            ),
            
            // Icon (after)
            iconUrl && iconPosition === 'after' && el('div', {
                className: 'zen-cta__icon zen-cta__icon--after'
            },
                el('img', {
                    src: iconUrl,
                    alt: '',
                    className: 'zen-cta__icon-image',
                    loading: 'lazy'
                })
            ),
            
            // Button
            showButton && buttonText && buttonUrl && el('div', { className: 'zen-cta__actions' },
                el('a', {
                    href: buttonUrl,
                    className: `zen-cta__button zen-cta__button--${buttonStyle} zen-cta__button--${buttonSize}`,
                    target: buttonTarget,
                    rel: buttonTarget === '_blank' ? 'noopener noreferrer' : undefined
                }, buttonText)
            )
        );
    }

    // Register the block
    registerBlockType('zenstarter/zen-cta', {
        apiVersion: 2,
        title: __('Zen CTA', 'zenstarter'),
        icon: 'megaphone',
        category: 'zenstarter',
        description: __('A call-to-action block with customizable styling and animations.', 'zenstarter'),
        keywords: [
            __('cta', 'zenstarter'),
            __('call to action', 'zenstarter'),
            __('button', 'zenstarter')
        ],
        supports: {
            align: ['wide', 'full'],
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
            buttonText: { type: 'string', default: '' },
            buttonUrl: { type: 'string', default: '' },
            buttonTarget: { type: 'string', default: '_self' },
            buttonStyle: { type: 'string', default: 'primary' },
            buttonSize: { type: 'string', default: 'medium' },
            showButton: { type: 'boolean', default: false },
            layoutStyle: { type: 'string', default: 'vertical' },
            contentAlignment: { type: 'string', default: 'center' },
            iconUrl: { type: 'string', default: '' },
            iconPosition: { type: 'string', default: 'none' },
            animationEnabled: { type: 'boolean', default: false },
            animationType: { type: 'string', default: 'fadeIn' }
        },
        edit: compose([
            withColors('backgroundColor', { textColor: 'color' })
        ])(ZenCtaEdit),
        save: ZenCtaSave
    });

})();