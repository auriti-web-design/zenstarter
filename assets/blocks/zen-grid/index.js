/**
 * Zen Grid Block - Compiled Version
 * Responsive grid layout container block
 */
(function() {
    'use strict';
    
    const { registerBlockType } = wp.blocks;
    const { InspectorControls, InnerBlocks, useBlockProps, withColors, __experimentalUseInnerBlocksProps: useInnerBlocksProps } = wp.blockEditor;
    const { PanelBody, SelectControl, RangeControl, ToggleControl, __experimentalUnitControl: UnitControl, __experimentalNumberControl: NumberControl } = wp.components;
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
    function ZenGridEdit(props) {
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
            columns = 2,
            columnsTablet = 2,
            columnsMobile = 1,
            gap = 'medium',
            customGap = '1rem',
            verticalAlignment = 'top',
            horizontalAlignment = 'left',
            autoFit = false,
            minColumnWidth = '200px',
            equalHeight = false,
            reverseOnMobile = false,
            animationEnabled = false,
            animationType = 'fadeIn',
            animationDelay = 0
        } = attributes;

        // Generate grid wrapper classes
        function getGridClasses() {
            const classes = ['zen-grid'];
            
            if (gap !== 'medium') {
                classes.push(`zen-grid--gap-${gap}`);
            }
            
            if (verticalAlignment !== 'top') {
                classes.push(`zen-grid--valign-${verticalAlignment}`);
            }
            
            if (horizontalAlignment !== 'left') {
                classes.push(`zen-grid--halign-${horizontalAlignment}`);
            }
            
            if (columnsTablet !== columns) {
                classes.push(`zen-grid--tablet-${columnsTablet}`);
            }
            
            if (columnsMobile !== 1) {
                classes.push(`zen-grid--mobile-${columnsMobile}`);
            }
            
            if (autoFit) {
                classes.push('zen-grid--auto-fit');
            }
            
            if (equalHeight) {
                classes.push('zen-grid--equal-height');
            }
            
            if (reverseOnMobile) {
                classes.push('zen-grid--reverse-mobile');
            }
            
            if (animationEnabled) {
                classes.push(`zen-grid--animated zen-grid--${animationType}`);
            }
            
            return generateBlockClasses('grid', attributes, classes);
        }

        // Generate grid wrapper styles
        function getGridStyles() {
            const styles = generateInlineStyles(attributes);
            
            styles['--zen-grid-columns'] = columns;
            styles['--zen-grid-columns-tablet'] = columnsTablet;
            styles['--zen-grid-columns-mobile'] = columnsMobile;
            
            if (gap === 'custom' && customGap) {
                styles['--zen-grid-gap'] = customGap;
            }
            
            if (autoFit && minColumnWidth) {
                styles['--zen-grid-min-width'] = minColumnWidth;
            }
            
            if (animationEnabled && animationDelay > 0) {
                styles['--zen-grid-animation-delay'] = `${animationDelay}ms`;
            }
            
            return styles;
        }

        const blockProps = useBlockProps({
            className: getGridClasses(),
            style: getGridStyles()
        });

        const innerBlocksProps = useInnerBlocksProps ? useInnerBlocksProps(
            { className: 'zen-grid__inner' },
            {
                templateLock: false,
                allowedBlocks: true,
                renderAppender: InnerBlocks.DefaultBlockAppender,
                orientation: 'horizontal'
            }
        ) : null;

        return el(Fragment, null,
            el(InspectorControls, null,
                // Grid Settings
                el(PanelBody, {
                    title: __('Grid Settings', 'zenstarter'),
                    initialOpen: true
                },
                    el(RangeControl, {
                        label: __('Desktop Columns', 'zenstarter'),
                        value: columns,
                        onChange: function(value) { setAttributes({ columns: value }); },
                        min: 1,
                        max: 6,
                        step: 1,
                        help: __('Number of columns on desktop devices', 'zenstarter')
                    }),
                    
                    el(RangeControl, {
                        label: __('Tablet Columns', 'zenstarter'),
                        value: columnsTablet,
                        onChange: function(value) { setAttributes({ columnsTablet: value }); },
                        min: 1,
                        max: 4,
                        step: 1,
                        help: __('Number of columns on tablet devices', 'zenstarter')
                    }),
                    
                    el(RangeControl, {
                        label: __('Mobile Columns', 'zenstarter'),
                        value: columnsMobile,
                        onChange: function(value) { setAttributes({ columnsMobile: value }); },
                        min: 1,
                        max: 2,
                        step: 1,
                        help: __('Number of columns on mobile devices', 'zenstarter')
                    }),
                    
                    el(SelectControl, {
                        label: __('Gap Size', 'zenstarter'),
                        value: gap,
                        options: [
                            { label: __('None', 'zenstarter'), value: 'none' },
                            { label: __('Small', 'zenstarter'), value: 'small' },
                            { label: __('Medium', 'zenstarter'), value: 'medium' },
                            { label: __('Large', 'zenstarter'), value: 'large' },
                            { label: __('Custom', 'zenstarter'), value: 'custom' }
                        ],
                        onChange: function(value) { setAttributes({ gap: value }); }
                    }),
                    
                    gap === 'custom' && UnitControl && el(UnitControl, {
                        label: __('Custom Gap', 'zenstarter'),
                        value: customGap,
                        onChange: function(value) { setAttributes({ customGap: value }); },
                        units: [
                            { value: 'px', label: 'px' },
                            { value: 'rem', label: 'rem' },
                            { value: 'em', label: 'em' },
                            { value: '%', label: '%' }
                        ]
                    })
                ),

                // Alignment Settings
                el(PanelBody, {
                    title: __('Alignment Settings', 'zenstarter'),
                    initialOpen: false
                },
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
                    
                    el(SelectControl, {
                        label: __('Horizontal Alignment', 'zenstarter'),
                        value: horizontalAlignment,
                        options: [
                            { label: __('Left', 'zenstarter'), value: 'left' },
                            { label: __('Center', 'zenstarter'), value: 'center' },
                            { label: __('Right', 'zenstarter'), value: 'right' },
                            { label: __('Justify', 'zenstarter'), value: 'justify' }
                        ],
                        onChange: function(value) { setAttributes({ horizontalAlignment: value }); }
                    })
                ),

                // Advanced Settings
                el(PanelBody, {
                    title: __('Advanced Settings', 'zenstarter'),
                    initialOpen: false
                },
                    el(ToggleControl, {
                        label: __('Auto-fit Columns', 'zenstarter'),
                        checked: autoFit,
                        onChange: function(value) { setAttributes({ autoFit: value }); },
                        help: __('Automatically fit columns based on minimum width', 'zenstarter')
                    }),
                    
                    autoFit && UnitControl && el(UnitControl, {
                        label: __('Minimum Column Width', 'zenstarter'),
                        value: minColumnWidth,
                        onChange: function(value) { setAttributes({ minColumnWidth: value }); },
                        units: [
                            { value: 'px', label: 'px' },
                            { value: 'rem', label: 'rem' },
                            { value: 'em', label: 'em' }
                        ]
                    }),
                    
                    el(ToggleControl, {
                        label: __('Equal Height Columns', 'zenstarter'),
                        checked: equalHeight,
                        onChange: function(value) { setAttributes({ equalHeight: value }); },
                        help: __('Make all columns the same height', 'zenstarter')
                    }),
                    
                    el(ToggleControl, {
                        label: __('Reverse on Mobile', 'zenstarter'),
                        checked: reverseOnMobile,
                        onChange: function(value) { setAttributes({ reverseOnMobile: value }); },
                        help: __('Reverse column order on mobile devices', 'zenstarter')
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
                    
                    animationEnabled && el(Fragment, null,
                        el(SelectControl, {
                            label: __('Animation Type', 'zenstarter'),
                            value: animationType,
                            options: [
                                { label: __('Fade In', 'zenstarter'), value: 'fadeIn' },
                                { label: __('Slide Up', 'zenstarter'), value: 'slideUp' },
                                { label: __('Slide Left', 'zenstarter'), value: 'slideLeft' },
                                { label: __('Slide Right', 'zenstarter'), value: 'slideRight' },
                                { label: __('Stagger', 'zenstarter'), value: 'stagger' }
                            ],
                            onChange: function(value) { setAttributes({ animationType: value }); }
                        }),
                        
                        NumberControl && el(NumberControl, {
                            label: __('Animation Delay (ms)', 'zenstarter'),
                            value: animationDelay,
                            onChange: function(value) { setAttributes({ animationDelay: value }); },
                            min: 0,
                            max: 2000,
                            step: 100,
                            help: __('Delay before animation starts', 'zenstarter')
                        })
                    )
                )
            ),

            el('div', blockProps,
                innerBlocksProps ? 
                    el('div', innerBlocksProps) :
                    el('div', { className: 'zen-grid__inner' },
                        el(InnerBlocks, {
                            renderAppender: InnerBlocks.DefaultBlockAppender,
                            templateLock: false
                        })
                    )
            )
        );
    }

    // Save component
    function ZenGridSave(props) {
        const { attributes } = props;
        const {
            columns = 2,
            columnsTablet = 2,
            columnsMobile = 1,
            gap = 'medium',
            customGap = '1rem',
            verticalAlignment = 'top',
            horizontalAlignment = 'left',
            autoFit = false,
            minColumnWidth = '200px',
            equalHeight = false,
            reverseOnMobile = false,
            animationEnabled = false,
            animationType = 'fadeIn',
            animationDelay = 0
        } = attributes;

        function getGridClasses() {
            const classes = ['zen-grid'];
            
            if (gap !== 'medium') {
                classes.push(`zen-grid--gap-${gap}`);
            }
            
            if (verticalAlignment !== 'top') {
                classes.push(`zen-grid--valign-${verticalAlignment}`);
            }
            
            if (horizontalAlignment !== 'left') {
                classes.push(`zen-grid--halign-${horizontalAlignment}`);
            }
            
            if (columnsTablet !== columns) {
                classes.push(`zen-grid--tablet-${columnsTablet}`);
            }
            
            if (columnsMobile !== 1) {
                classes.push(`zen-grid--mobile-${columnsMobile}`);
            }
            
            if (autoFit) {
                classes.push('zen-grid--auto-fit');
            }
            
            if (equalHeight) {
                classes.push('zen-grid--equal-height');
            }
            
            if (reverseOnMobile) {
                classes.push('zen-grid--reverse-mobile');
            }
            
            if (animationEnabled) {
                classes.push(`zen-grid--animated zen-grid--${animationType}`);
            }
            
            return generateBlockClasses('grid', attributes, classes);
        }

        function getGridStyles() {
            const styles = generateInlineStyles(attributes);
            
            styles['--zen-grid-columns'] = columns;
            styles['--zen-grid-columns-tablet'] = columnsTablet;
            styles['--zen-grid-columns-mobile'] = columnsMobile;
            
            if (gap === 'custom' && customGap) {
                styles['--zen-grid-gap'] = customGap;
            }
            
            if (autoFit && minColumnWidth) {
                styles['--zen-grid-min-width'] = minColumnWidth;
            }
            
            if (animationEnabled && animationDelay > 0) {
                styles['--zen-grid-animation-delay'] = `${animationDelay}ms`;
            }
            
            return styles;
        }

        // Generate data attributes
        const getDataAttributes = function() {
            const dataAttrs = {};
            
            if (animationEnabled) {
                dataAttrs['data-animation'] = animationType;
                dataAttrs['data-animated'] = 'true';
                if (animationDelay > 0) {
                    dataAttrs['data-delay'] = animationDelay;
                }
            }
            
            dataAttrs['data-columns'] = columns;
            dataAttrs['data-columns-tablet'] = columnsTablet;
            dataAttrs['data-columns-mobile'] = columnsMobile;
            
            return dataAttrs;
        };

        const blockProps = useBlockProps.save({
            className: getGridClasses(),
            style: getGridStyles(),
            ...getDataAttributes()
        });

        return el('div', blockProps,
            el('div', { className: 'zen-grid__inner' },
                el(InnerBlocks.Content)
            )
        );
    }

    // Register the block
    registerBlockType('zenstarter/zen-grid', {
        apiVersion: 2,
        title: __('Zen Grid', 'zenstarter'),
        icon: 'grid-view',
        category: 'zenstarter',
        description: __('A responsive grid container with flexible column layouts and gap controls.', 'zenstarter'),
        keywords: [
            __('grid', 'zenstarter'),
            __('layout', 'zenstarter'),
            __('columns', 'zenstarter')
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
                gradients: true
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
            columns: { type: 'number', default: 2 },
            columnsTablet: { type: 'number', default: 2 },
            columnsMobile: { type: 'number', default: 1 },
            gap: { type: 'string', default: 'medium' },
            customGap: { type: 'string', default: '1rem' },
            verticalAlignment: { type: 'string', default: 'top' },
            horizontalAlignment: { type: 'string', default: 'left' },
            autoFit: { type: 'boolean', default: false },
            minColumnWidth: { type: 'string', default: '200px' },
            equalHeight: { type: 'boolean', default: false },
            reverseOnMobile: { type: 'boolean', default: false },
            animationEnabled: { type: 'boolean', default: false },
            animationType: { type: 'string', default: 'fadeIn' },
            animationDelay: { type: 'number', default: 0 }
        },
        edit: compose([
            withColors('backgroundColor', { textColor: 'color' })
        ])(ZenGridEdit),
        save: ZenGridSave
    });

})();