/**
 * Zen Testimonial Block - Compiled Version
 * Testimonial block with avatar, rating, and layout options
 */
(function() {
    'use strict';
    
    const { registerBlockType } = wp.blocks;
    const { InspectorControls, useBlockProps, withColors, RichText, MediaUpload, MediaUploadCheck } = wp.blockEditor;
    const { PanelBody, SelectControl, ToggleControl, TextControl, RangeControl, Button, ResponsiveWrapper, Icon } = wp.components;
    const { __ } = wp.i18n;
    const { compose } = wp.compose;
    const { createElement: el, Fragment } = wp.element;

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
    function ZenTestimonialEdit(props) {
        const {
            attributes,
            setAttributes,
            backgroundColor,
            setBackgroundColor,
            textColor,
            setTextColor
        } = props;

        const {
            testimonialText = '',
            authorName = '',
            authorRole = '',
            authorCompany = '',
            authorImageUrl = '',
            authorImageAlt = '',
            showRating = false,
            rating = 5,
            layoutStyle = 'vertical',
            contentAlignment = 'center',
            avatarSize = 'medium',
            showQuoteIcon = true,
            quoteIconPosition = 'before',
            animationEnabled = false,
            animationType = 'fadeIn'
        } = attributes;

        // Handle avatar image selection
        const onSelectImage = function(media) {
            setAttributes({
                authorImageUrl: media.url,
                authorImageAlt: media.alt || ''
            });
        };

        const onRemoveImage = function() {
            setAttributes({
                authorImageUrl: '',
                authorImageAlt: ''
            });
        };

        // Generate testimonial wrapper classes
        function getTestimonialClasses() {
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
        }

        // Generate testimonial wrapper styles
        function getTestimonialStyles() {
            return generateInlineStyles(attributes);
        }

        // Render rating stars
        const renderRatingStars = function() {
            const stars = [];
            for (let i = 1; i <= 5; i++) {
                stars.push(
                    el(Icon, {
                        key: i,
                        icon: i <= rating ? 'star-filled' : 'star-empty',
                        className: `zen-testimonial__rating-star ${i <= rating ? 'filled' : 'empty'}`
                    })
                );
            }
            return stars;
        };

        const blockProps = useBlockProps({
            className: getTestimonialClasses(),
            style: getTestimonialStyles()
        });

        return el(Fragment, null,
            el(InspectorControls, null,
                // Content Settings
                el(PanelBody, {
                    title: __('Content Settings', 'zenstarter'),
                    initialOpen: true
                },
                    el(TextControl, {
                        label: __('Author Name', 'zenstarter'),
                        value: authorName,
                        onChange: function(value) { setAttributes({ authorName: value }); },
                        placeholder: __('John Doe', 'zenstarter')
                    }),
                    
                    el(TextControl, {
                        label: __('Author Role', 'zenstarter'),
                        value: authorRole,
                        onChange: function(value) { setAttributes({ authorRole: value }); },
                        placeholder: __('CEO', 'zenstarter')
                    }),
                    
                    el(TextControl, {
                        label: __('Author Company', 'zenstarter'),
                        value: authorCompany,
                        onChange: function(value) { setAttributes({ authorCompany: value }); },
                        placeholder: __('Company Name', 'zenstarter')
                    })
                ),

                // Avatar Settings
                el(PanelBody, {
                    title: __('Avatar Settings', 'zenstarter'),
                    initialOpen: false
                },
                    el(MediaUploadCheck, null,
                        el(MediaUpload, {
                            onSelect: onSelectImage,
                            allowedTypes: ['image'],
                            render: function({ open }) {
                                return el('div', { className: 'zen-testimonial-avatar-control' },
                                    !authorImageUrl ? 
                                        el(Button, {
                                            className: 'zen-testimonial-avatar-button',
                                            onClick: open,
                                            variant: 'secondary'
                                        }, __('Select Avatar Image', 'zenstarter'))
                                    :
                                        el(Fragment, null,
                                            el(ResponsiveWrapper, {
                                                naturalWidth: 150,
                                                naturalHeight: 150
                                            },
                                                el('img', {
                                                    src: authorImageUrl,
                                                    alt: authorImageAlt || authorName,
                                                    style: { borderRadius: '50%' }
                                                })
                                            ),
                                            el('div', { className: 'zen-testimonial-avatar-actions' },
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
                        label: __('Avatar Size', 'zenstarter'),
                        value: avatarSize,
                        options: [
                            { label: __('Small', 'zenstarter'), value: 'small' },
                            { label: __('Medium', 'zenstarter'), value: 'medium' },
                            { label: __('Large', 'zenstarter'), value: 'large' }
                        ],
                        onChange: function(value) { setAttributes({ avatarSize: value }); }
                    })
                ),

                // Rating Settings
                el(PanelBody, {
                    title: __('Rating Settings', 'zenstarter'),
                    initialOpen: false
                },
                    el(ToggleControl, {
                        label: __('Show Rating', 'zenstarter'),
                        checked: showRating,
                        onChange: function(value) { setAttributes({ showRating: value }); }
                    }),
                    
                    showRating && el(RangeControl, {
                        label: __('Rating', 'zenstarter'),
                        value: rating,
                        onChange: function(value) { setAttributes({ rating: value }); },
                        min: 1,
                        max: 5,
                        step: 1,
                        help: __('Select rating from 1 to 5 stars', 'zenstarter')
                    })
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
                            { label: __('Centered', 'zenstarter'), value: 'centered' },
                            { label: __('Card', 'zenstarter'), value: 'card' }
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

                // Quote Icon Settings
                el(PanelBody, {
                    title: __('Quote Icon Settings', 'zenstarter'),
                    initialOpen: false
                },
                    el(ToggleControl, {
                        label: __('Show Quote Icon', 'zenstarter'),
                        checked: showQuoteIcon,
                        onChange: function(value) { setAttributes({ showQuoteIcon: value }); }
                    }),
                    
                    showQuoteIcon && el(SelectControl, {
                        label: __('Quote Icon Position', 'zenstarter'),
                        value: quoteIconPosition,
                        options: [
                            { label: __('Before Text', 'zenstarter'), value: 'before' },
                            { label: __('After Text', 'zenstarter'), value: 'after' },
                            { label: __('Background', 'zenstarter'), value: 'background' }
                        ],
                        onChange: function(value) { setAttributes({ quoteIconPosition: value }); }
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
                            { label: __('Zoom In', 'zenstarter'), value: 'zoomIn' }
                        ],
                        onChange: function(value) { setAttributes({ animationType: value }); }
                    })
                )
            ),

            el('div', blockProps,
                // Quote Icon (background)
                showQuoteIcon && quoteIconPosition === 'background' && el('div', {
                    className: 'zen-testimonial__quote-bg'
                },
                    el(Icon, { icon: 'format-quote' })
                ),
                
                // Quote Icon (before)
                showQuoteIcon && quoteIconPosition === 'before' && el('div', {
                    className: 'zen-testimonial__quote zen-testimonial__quote--before'
                },
                    el(Icon, { icon: 'format-quote' })
                ),
                
                // Testimonial Content
                el('div', { className: 'zen-testimonial__content' },
                    el(RichText, {
                        tagName: 'blockquote',
                        className: 'zen-testimonial__text',
                        value: testimonialText,
                        onChange: function(value) { setAttributes({ testimonialText: value }); },
                        placeholder: __('Enter testimonial text...', 'zenstarter')
                    }),
                    
                    // Rating
                    showRating && el('div', { className: 'zen-testimonial__rating' },
                        renderRatingStars()
                    )
                ),
                
                // Quote Icon (after)
                showQuoteIcon && quoteIconPosition === 'after' && el('div', {
                    className: 'zen-testimonial__quote zen-testimonial__quote--after'
                },
                    el(Icon, { icon: 'format-quote' })
                ),
                
                // Author Info
                el('div', { className: 'zen-testimonial__author' },
                    // Avatar
                    authorImageUrl && el('div', { className: 'zen-testimonial__avatar' },
                        el('img', {
                            src: authorImageUrl,
                            alt: authorImageAlt || authorName,
                            className: 'zen-testimonial__avatar-image'
                        })
                    ),
                    
                    // Author Details
                    el('div', { className: 'zen-testimonial__author-info' },
                        authorName && el('cite', {
                            className: 'zen-testimonial__author-name'
                        }, authorName),
                        
                        (authorRole || authorCompany) && el('div', {
                            className: 'zen-testimonial__author-meta'
                        },
                            authorRole && el('span', {
                                className: 'zen-testimonial__author-role'
                            }, authorRole),
                            authorRole && authorCompany && el('span', {
                                className: 'zen-testimonial__separator'
                            }, ' at '),
                            authorCompany && el('span', {
                                className: 'zen-testimonial__author-company'
                            }, authorCompany)
                        )
                    )
                )
            )
        );
    }

    // Save component
    function ZenTestimonialSave(props) {
        const { attributes } = props;
        const {
            testimonialText = '',
            authorName = '',
            authorRole = '',
            authorCompany = '',
            authorImageUrl = '',
            authorImageAlt = '',
            showRating = false,
            rating = 5,
            layoutStyle = 'vertical',
            contentAlignment = 'center',
            avatarSize = 'medium',
            showQuoteIcon = true,
            quoteIconPosition = 'before',
            animationEnabled = false,
            animationType = 'fadeIn'
        } = attributes;

        function getTestimonialClasses() {
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
        }

        function getTestimonialStyles() {
            return generateInlineStyles(attributes);
        }

        // Render rating stars
        const renderRatingStars = function() {
            const stars = [];
            for (let i = 1; i <= 5; i++) {
                stars.push(
                    el(Icon, {
                        key: i,
                        icon: i <= rating ? 'star-filled' : 'star-empty',
                        className: `zen-testimonial__rating-star ${i <= rating ? 'filled' : 'empty'}`
                    })
                );
            }
            return stars;
        };

        // Generate data attributes
        const getDataAttributes = function() {
            const dataAttrs = {};
            
            if (animationEnabled) {
                dataAttrs['data-animation'] = animationType;
                dataAttrs['data-animated'] = 'true';
            }
            
            return dataAttrs;
        };

        if (!testimonialText) {
            return null;
        }

        const blockProps = useBlockProps.save({
            className: getTestimonialClasses(),
            style: getTestimonialStyles(),
            ...getDataAttributes()
        });

        return el('div', blockProps,
            // Quote Icon (background)
            showQuoteIcon && quoteIconPosition === 'background' && el('div', {
                className: 'zen-testimonial__quote-bg',
                'aria-hidden': 'true'
            },
                el(Icon, { icon: 'format-quote' })
            ),
            
            // Quote Icon (before)
            showQuoteIcon && quoteIconPosition === 'before' && el('div', {
                className: 'zen-testimonial__quote zen-testimonial__quote--before',
                'aria-hidden': 'true'
            },
                el(Icon, { icon: 'format-quote' })
            ),
            
            // Testimonial Content
            el('div', { className: 'zen-testimonial__content' },
                el(RichText.Content, {
                    tagName: 'blockquote',
                    className: 'zen-testimonial__text',
                    value: testimonialText
                }),
                
                // Rating
                showRating && rating > 0 && el('div', {
                    className: 'zen-testimonial__rating',
                    role: 'img',
                    'aria-label': `Rating: ${rating} out of 5 stars`
                },
                    renderRatingStars()
                )
            ),
            
            // Quote Icon (after)
            showQuoteIcon && quoteIconPosition === 'after' && el('div', {
                className: 'zen-testimonial__quote zen-testimonial__quote--after',
                'aria-hidden': 'true'
            },
                el(Icon, { icon: 'format-quote' })
            ),
            
            // Author Info
            (authorName || authorRole || authorCompany || authorImageUrl) && el('div', {
                className: 'zen-testimonial__author'
            },
                // Avatar
                authorImageUrl && el('div', { className: 'zen-testimonial__avatar' },
                    el('img', {
                        src: authorImageUrl,
                        alt: authorImageAlt || authorName || 'Testimonial author',
                        className: 'zen-testimonial__avatar-image',
                        loading: 'lazy',
                        decoding: 'async'
                    })
                ),
                
                // Author Details
                (authorName || authorRole || authorCompany) && el('div', {
                    className: 'zen-testimonial__author-info'
                },
                    authorName && el('cite', {
                        className: 'zen-testimonial__author-name'
                    }, authorName),
                    
                    (authorRole || authorCompany) && el('div', {
                        className: 'zen-testimonial__author-meta'
                    },
                        authorRole && el('span', {
                            className: 'zen-testimonial__author-role'
                        }, authorRole),
                        authorRole && authorCompany && el('span', {
                            className: 'zen-testimonial__separator',
                            'aria-hidden': 'true'
                        }, ' at '),
                        authorCompany && el('span', {
                            className: 'zen-testimonial__author-company'
                        }, authorCompany)
                    )
                )
            )
        );
    }

    // Register the block
    registerBlockType('zenstarter/zen-testimonial', {
        apiVersion: 2,
        title: __('Zen Testimonial', 'zenstarter'),
        icon: 'format-quote',
        category: 'zenstarter',
        description: __('A testimonial block with avatar, name, role, company, and rating.', 'zenstarter'),
        keywords: [
            __('testimonial', 'zenstarter'),
            __('review', 'zenstarter'),
            __('quote', 'zenstarter')
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
            testimonialText: { type: 'string', default: '' },
            authorName: { type: 'string', default: '' },
            authorRole: { type: 'string', default: '' },
            authorCompany: { type: 'string', default: '' },
            authorImageUrl: { type: 'string', default: '' },
            authorImageAlt: { type: 'string', default: '' },
            showRating: { type: 'boolean', default: false },
            rating: { type: 'number', default: 5 },
            layoutStyle: { type: 'string', default: 'vertical' },
            contentAlignment: { type: 'string', default: 'center' },
            avatarSize: { type: 'string', default: 'medium' },
            showQuoteIcon: { type: 'boolean', default: true },
            quoteIconPosition: { type: 'string', default: 'before' },
            animationEnabled: { type: 'boolean', default: false },
            animationType: { type: 'string', default: 'fadeIn' }
        },
        edit: compose([
            withColors('backgroundColor', { textColor: 'color' })
        ])(ZenTestimonialEdit),
        save: ZenTestimonialSave
    });

})();