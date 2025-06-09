/**
 * Zen Box Block - Compiled Version
 * Custom Gutenberg block for flexible container layouts
 */
(function() {
    'use strict';
    
    const { registerBlockType } = wp.blocks;
    const { InspectorControls, InnerBlocks, useBlockProps, withColors, PanelColorSettings } = wp.blockEditor;
    const { PanelBody, SelectControl, RangeControl, TextControl } = wp.components;
    const { __ } = wp.i18n;
    const { compose } = wp.compose;
    const { useSelect } = wp.data;
    const { createElement: el, Fragment } = wp.element;

    // Edit component
    function ZenBoxEdit(props) {
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
            borderRadius = 0,
            shadowLevel = 'none',
            minHeight,
            containerType = 'default',
            verticalAlignment = 'top'
        } = attributes;

        // Check if block has inner blocks
        const hasInnerBlocks = useSelect(function(select) {
            const block = select('core/block-editor').getBlock(clientId);
            return !!(block && block.innerBlocks && block.innerBlocks.length > 0);
        }, [clientId]);

        // Generate CSS classes
        function getBoxClasses() {
            const classes = ['zen-box'];
            
            if (containerType !== 'default') {
                classes.push('zen-box--' + containerType);
            }
            
            if (verticalAlignment !== 'top') {
                classes.push('zen-box--align-' + verticalAlignment);
            }
            
            if (shadowLevel !== 'none') {
                classes.push('zen-box--shadow-' + shadowLevel);
            }
            
            return classes.join(' ');
        }

        // Generate inline styles
        function getBoxStyles() {
            const styles = {};
            
            if (borderRadius) {
                styles.borderRadius = borderRadius + 'px';
            }
            
            if (minHeight) {
                styles.minHeight = minHeight;
            }
            
            // Add minimum height for empty container in editor
            if (!styles.minHeight) {
                styles.minHeight = '100px';
            }
            
            return styles;
        }

        const blockProps = useBlockProps({
            className: getBoxClasses(),
            style: getBoxStyles()
        });

        return el(Fragment, null,
            el(InspectorControls, null,
                el(PanelBody, {
                    title: __('Container Settings', 'zenstarter'),
                    initialOpen: true
                },
                    el(SelectControl, {
                        label: __('Container Type', 'zenstarter'),
                        value: containerType,
                        options: [
                            { label: __('Default', 'zenstarter'), value: 'default' },
                            { label: __('Narrow', 'zenstarter'), value: 'narrow' },
                            { label: __('Wide', 'zenstarter'), value: 'wide' },
                            { label: __('Full Width', 'zenstarter'), value: 'full' }
                        ],
                        onChange: function(value) { setAttributes({ containerType: value }); }
                    }),
                    
                    el(SelectControl, {
                        label: __('Vertical Alignment', 'zenstarter'),
                        value: verticalAlignment,
                        options: [
                            { label: __('Top', 'zenstarter'), value: 'top' },
                            { label: __('Center', 'zenstarter'), value: 'center' },
                            { label: __('Bottom', 'zenstarter'), value: 'bottom' },
                            { label: __('Stretch', 'zenstarter'), value: 'stretch' }
                        ],
                        onChange: function(value) { setAttributes({ verticalAlignment: value }); }
                    }),
                    
                    el(TextControl, {
                        label: __('Minimum Height', 'zenstarter'),
                        value: minHeight || '',
                        placeholder: 'auto',
                        help: __('Use CSS units like px, vh, rem, etc.', 'zenstarter'),
                        onChange: function(value) { setAttributes({ minHeight: value }); }
                    })
                ),

                el(PanelBody, {
                    title: __('Design Settings', 'zenstarter'),
                    initialOpen: false
                },
                    el(RangeControl, {
                        label: __('Border Radius', 'zenstarter'),
                        value: borderRadius,
                        onChange: function(value) { setAttributes({ borderRadius: value }); },
                        min: 0,
                        max: 50,
                        step: 1
                    }),
                    
                    el(SelectControl, {
                        label: __('Shadow Level', 'zenstarter'),
                        value: shadowLevel,
                        options: [
                            { label: __('None', 'zenstarter'), value: 'none' },
                            { label: __('Small', 'zenstarter'), value: 'small' },
                            { label: __('Medium', 'zenstarter'), value: 'medium' },
                            { label: __('Large', 'zenstarter'), value: 'large' },
                            { label: __('Extra Large', 'zenstarter'), value: 'xl' }
                        ],
                        onChange: function(value) { setAttributes({ shadowLevel: value }); }
                    })
                ),

                el(PanelColorSettings, {
                    title: __('Color Settings', 'zenstarter'),
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
                        }
                    ]
                })
            ),

            el('div', blockProps,
                el('div', { className: 'zen-box__content' },
                    el(InnerBlocks, {
                        renderAppender: hasInnerBlocks ? undefined : InnerBlocks.ButtonBlockAppender
                    })
                )
            )
        );
    }

    // Save component
    function ZenBoxSave(props) {
        const { attributes } = props;
        const {
            borderRadius = 0,
            shadowLevel = 'none',
            minHeight,
            containerType = 'default',
            verticalAlignment = 'top'
        } = attributes;

        // Generate CSS classes
        function getBoxClasses() {
            const classes = ['zen-box'];
            
            if (containerType !== 'default') {
                classes.push('zen-box--' + containerType);
            }
            
            if (verticalAlignment !== 'top') {
                classes.push('zen-box--align-' + verticalAlignment);
            }
            
            if (shadowLevel !== 'none') {
                classes.push('zen-box--shadow-' + shadowLevel);
            }
            
            return classes.join(' ');
        }

        // Generate inline styles
        function getBoxStyles() {
            const styles = {};
            
            if (borderRadius) {
                styles.borderRadius = borderRadius + 'px';
            }
            
            if (minHeight) {
                styles.minHeight = minHeight;
            }
            
            return styles;
        }

        const blockProps = useBlockProps.save({
            className: getBoxClasses(),
            style: getBoxStyles()
        });

        return el('div', blockProps,
            el('div', { className: 'zen-box__content' },
                el(InnerBlocks.Content)
            )
        );
    }

    // Register the block
    registerBlockType('zenstarter/zen-box', {
        apiVersion: 2,
        title: __('Zen Box', 'zenstarter'),
        icon: 'admin-generic',
        category: 'zenstarter',
        description: __('A flexible container block with customization options and support for nested content.', 'zenstarter'),
        keywords: [
            __('container', 'zenstarter'),
            __('box', 'zenstarter'),
            __('wrapper', 'zenstarter')
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
                textAlign: true
            }
        },
        attributes: {
            borderRadius: {
                type: 'number',
                default: 0
            },
            shadowLevel: {
                type: 'string',
                default: 'none'
            },
            minHeight: {
                type: 'string'
            },
            containerType: {
                type: 'string',
                default: 'default'
            },
            verticalAlignment: {
                type: 'string',
                default: 'top'
            }
        },
        edit: compose([
            withColors('backgroundColor', { textColor: 'color' })
        ])(ZenBoxEdit),
        save: ZenBoxSave
    });

})();