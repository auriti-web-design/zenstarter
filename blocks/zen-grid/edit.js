/**
 * Zen Grid Block - Editor Component
 * 
 * Provides the editor interface for the zen-grid block with
 * comprehensive grid layout and responsive controls
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
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    RangeControl,
    ToggleControl,
    TextControl,
    __experimentalUnitControl as UnitControl,
    __experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { compose } from '@wordpress/compose';

// Import shared utilities
import { 
    generateBlockClasses, 
    generateInlineStyles,
    defaultInnerBlocksConfig 
} from '../lib/utils.js';

/**
 * Zen Grid Edit Component
 * 
 * @param {Object} props Component properties
 * @returns {JSX.Element} The editor component
 */
function ZenGridEdit({
    attributes,
    setAttributes,
    backgroundColor,
    setBackgroundColor,
    textColor,
    setTextColor,
    clientId
}) {
    const {
        columns,
        columnsTablet,
        columnsMobile,
        gap,
        customGap,
        verticalAlignment,
        horizontalAlignment,
        autoFit,
        minColumnWidth,
        equalHeight,
        reverseOnMobile,
        animationEnabled,
        animationType,
        animationDelay,
        style
    } = attributes;

    /**
     * Generate grid wrapper classes
     */
    const getGridClasses = () => {
        const classes = ['zen-grid'];
        
        // Add gap class
        if (gap !== 'medium') {
            classes.push(`zen-grid--gap-${gap}`);
        }
        
        // Add alignment classes
        if (verticalAlignment !== 'top') {
            classes.push(`zen-grid--valign-${verticalAlignment}`);
        }
        
        if (horizontalAlignment !== 'left') {
            classes.push(`zen-grid--halign-${horizontalAlignment}`);
        }
        
        // Add responsive classes
        if (columnsTablet !== columns) {
            classes.push(`zen-grid--tablet-${columnsTablet}`);
        }
        
        if (columnsMobile !== 1) {
            classes.push(`zen-grid--mobile-${columnsMobile}`);
        }
        
        // Add feature classes
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
    };

    /**
     * Generate grid wrapper styles
     */
    const getGridStyles = () => {
        const styles = generateInlineStyles(attributes);
        
        // Add CSS Grid properties
        styles['--zen-grid-columns'] = columns;
        styles['--zen-grid-columns-tablet'] = columnsTablet;
        styles['--zen-grid-columns-mobile'] = columnsMobile;
        
        // Add gap styles
        if (gap === 'custom' && customGap) {
            styles['--zen-grid-gap'] = customGap;
        }
        
        // Add auto-fit styles
        if (autoFit && minColumnWidth) {
            styles['--zen-grid-min-width'] = minColumnWidth;
        }
        
        // Add animation delay
        if (animationEnabled && animationDelay > 0) {
            styles['--zen-grid-animation-delay'] = `${animationDelay}ms`;
        }
        
        return styles;
    };

    /**
     * Generate data attributes for animations
     */
    const getDataAttributes = () => {
        const dataAttrs = {};
        
        if (animationEnabled) {
            dataAttrs['data-animation'] = animationType;
            dataAttrs['data-animated'] = 'true';
            if (animationDelay > 0) {
                dataAttrs['data-delay'] = animationDelay;
            }
        }
        
        return dataAttrs;
    };

    const blockProps = useBlockProps({
        className: getGridClasses(),
        style: getGridStyles(),
        ...getDataAttributes()
    });

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: 'zen-grid__inner'
        },
        {
            ...defaultInnerBlocksConfig,
            renderAppender: InnerBlocks.DefaultBlockAppender,
            orientation: 'horizontal'
        }
    );

    return (
        <>
            <InspectorControls>
                {/* Grid Settings */}
                <PanelBody
                    title={__('Grid Settings', 'zenstarter')}
                    initialOpen={true}
                >
                    <RangeControl
                        label={__('Desktop Columns', 'zenstarter')}
                        value={columns}
                        onChange={(value) => setAttributes({ columns: value })}
                        min={1}
                        max={6}
                        step={1}
                        help={__('Number of columns on desktop devices', 'zenstarter')}
                    />
                    
                    <RangeControl
                        label={__('Tablet Columns', 'zenstarter')}
                        value={columnsTablet}
                        onChange={(value) => setAttributes({ columnsTablet: value })}
                        min={1}
                        max={4}
                        step={1}
                        help={__('Number of columns on tablet devices', 'zenstarter')}
                    />
                    
                    <RangeControl
                        label={__('Mobile Columns', 'zenstarter')}
                        value={columnsMobile}
                        onChange={(value) => setAttributes({ columnsMobile: value })}
                        min={1}
                        max={2}
                        step={1}
                        help={__('Number of columns on mobile devices', 'zenstarter')}
                    />
                    
                    <SelectControl
                        label={__('Gap Size', 'zenstarter')}
                        value={gap}
                        options={[
                            { label: __('None', 'zenstarter'), value: 'none' },
                            { label: __('Small', 'zenstarter'), value: 'small' },
                            { label: __('Medium', 'zenstarter'), value: 'medium' },
                            { label: __('Large', 'zenstarter'), value: 'large' },
                            { label: __('Custom', 'zenstarter'), value: 'custom' }
                        ]}
                        onChange={(value) => setAttributes({ gap: value })}
                    />
                    
                    {gap === 'custom' && (
                        <UnitControl
                            label={__('Custom Gap', 'zenstarter')}
                            value={customGap}
                            onChange={(value) => setAttributes({ customGap: value })}
                            units={[
                                { value: 'px', label: 'px' },
                                { value: 'rem', label: 'rem' },
                                { value: 'em', label: 'em' },
                                { value: '%', label: '%' }
                            ]}
                        />
                    )}
                </PanelBody>

                {/* Alignment Settings */}
                <PanelBody
                    title={__('Alignment Settings', 'zenstarter')}
                    initialOpen={false}
                >
                    <SelectControl
                        label={__('Vertical Alignment', 'zenstarter')}
                        value={verticalAlignment}
                        options={[
                            { label: __('Top', 'zenstarter'), value: 'top' },
                            { label: __('Center', 'zenstarter'), value: 'center' },
                            { label: __('Bottom', 'zenstarter'), value: 'bottom' },
                            { label: __('Stretch', 'zenstarter'), value: 'stretch' }
                        ]}
                        onChange={(value) => setAttributes({ verticalAlignment: value })}
                    />
                    
                    <SelectControl
                        label={__('Horizontal Alignment', 'zenstarter')}
                        value={horizontalAlignment}
                        options={[
                            { label: __('Left', 'zenstarter'), value: 'left' },
                            { label: __('Center', 'zenstarter'), value: 'center' },
                            { label: __('Right', 'zenstarter'), value: 'right' },
                            { label: __('Justify', 'zenstarter'), value: 'justify' }
                        ]}
                        onChange={(value) => setAttributes({ horizontalAlignment: value })}
                    />
                </PanelBody>

                {/* Advanced Settings */}
                <PanelBody
                    title={__('Advanced Settings', 'zenstarter')}
                    initialOpen={false}
                >
                    <ToggleControl
                        label={__('Auto-fit Columns', 'zenstarter')}
                        checked={autoFit}
                        onChange={(value) => setAttributes({ autoFit: value })}
                        help={__('Automatically fit columns based on minimum width', 'zenstarter')}
                    />
                    
                    {autoFit && (
                        <UnitControl
                            label={__('Minimum Column Width', 'zenstarter')}
                            value={minColumnWidth}
                            onChange={(value) => setAttributes({ minColumnWidth: value })}
                            units={[
                                { value: 'px', label: 'px' },
                                { value: 'rem', label: 'rem' },
                                { value: 'em', label: 'em' }
                            ]}
                        />
                    )}
                    
                    <ToggleControl
                        label={__('Equal Height Columns', 'zenstarter')}
                        checked={equalHeight}
                        onChange={(value) => setAttributes({ equalHeight: value })}
                        help={__('Make all columns the same height', 'zenstarter')}
                    />
                    
                    <ToggleControl
                        label={__('Reverse on Mobile', 'zenstarter')}
                        checked={reverseOnMobile}
                        onChange={(value) => setAttributes({ reverseOnMobile: value })}
                        help={__('Reverse column order on mobile devices', 'zenstarter')}
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
                                    { label: __('Slide Left', 'zenstarter'), value: 'slideLeft' },
                                    { label: __('Slide Right', 'zenstarter'), value: 'slideRight' },
                                    { label: __('Stagger', 'zenstarter'), value: 'stagger' }
                                ]}
                                onChange={(value) => setAttributes({ animationType: value })}
                            />
                            
                            <NumberControl
                                label={__('Animation Delay (ms)', 'zenstarter')}
                                value={animationDelay}
                                onChange={(value) => setAttributes({ animationDelay: value })}
                                min={0}
                                max={2000}
                                step={100}
                                help={__('Delay before animation starts', 'zenstarter')}
                            />
                        </>
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div {...innerBlocksProps} />
            </div>
        </>
    );
}

export default compose([
    withColors('backgroundColor', { textColor: 'color' }),
])(ZenGridEdit);