/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    InspectorControls,
    InnerBlocks,
    useBlockProps,
    useInnerBlocksProps,
    withColors,
    PanelColorSettings,
    __experimentalUseGradient,
    __experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    RangeControl,
    TextControl,
    ToggleControl,
    __experimentalBoxControl as BoxControl,
} from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * Edit component
 */
function ZenBoxEdit({
    attributes,
    setAttributes,
    backgroundColor,
    setBackgroundColor,
    textColor,
    setTextColor,
    clientId
}) {
    const {
        borderRadius,
        shadowLevel,
        minHeight,
        containerType,
        verticalAlignment,
        style,
    } = attributes;

    const { gradient, setGradient } = __experimentalUseGradient();

    // Get inner blocks count for better UX
    const { hasInnerBlocks } = useSelect(
        (select) => {
            const { getBlock } = select('core/block-editor');
            const block = getBlock(clientId);
            return {
                hasInnerBlocks: !!(block && block.innerBlocks.length),
            };
        },
        [clientId]
    );

    // Generate CSS classes
    const getBoxClasses = () => {
        const classes = ['zen-box'];
        
        if (containerType !== 'default') {
            classes.push(`zen-box--${containerType}`);
        }
        
        if (verticalAlignment !== 'top') {
            classes.push(`zen-box--align-${verticalAlignment}`);
        }
        
        if (shadowLevel !== 'none') {
            classes.push(`zen-box--shadow-${shadowLevel}`);
        }
        
        return classes.join(' ');
    };

    // Generate inline styles
    const getBoxStyles = () => {
        const styles = {};
        
        if (borderRadius) {
            styles.borderRadius = `${borderRadius}px`;
        }
        
        if (minHeight) {
            styles.minHeight = minHeight;
        }
        
        // Merge with style attribute for spacing, etc.
        return { ...styles, ...style };
    };

    const blockProps = useBlockProps({
        className: getBoxClasses(),
        style: getBoxStyles(),
    });

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: 'zen-box__content',
        },
        {
            renderAppender: hasInnerBlocks
                ? undefined
                : InnerBlocks.ButtonBlockAppender,
            template: [
                ['core/paragraph', {
                    placeholder: __('Add content to your Zen Box...', 'zenstarter'),
                }]
            ],
        }
    );

    return (
        <>
            <InspectorControls>
                <PanelBody
                    title={__('Container Settings', 'zenstarter')}
                    initialOpen={true}
                >
                    <SelectControl
                        label={__('Container Type', 'zenstarter')}
                        value={containerType}
                        options={[
                            { label: __('Default', 'zenstarter'), value: 'default' },
                            { label: __('Narrow', 'zenstarter'), value: 'narrow' },
                            { label: __('Wide', 'zenstarter'), value: 'wide' },
                            { label: __('Full Width', 'zenstarter'), value: 'full' },
                        ]}
                        onChange={(value) => setAttributes({ containerType: value })}
                    />
                    
                    <SelectControl
                        label={__('Vertical Alignment', 'zenstarter')}
                        value={verticalAlignment}
                        options={[
                            { label: __('Top', 'zenstarter'), value: 'top' },
                            { label: __('Center', 'zenstarter'), value: 'center' },
                            { label: __('Bottom', 'zenstarter'), value: 'bottom' },
                            { label: __('Stretch', 'zenstarter'), value: 'stretch' },
                        ]}
                        onChange={(value) => setAttributes({ verticalAlignment: value })}
                    />
                    
                    <TextControl
                        label={__('Minimum Height', 'zenstarter')}
                        value={minHeight || ''}
                        placeholder="auto"
                        help={__('Use CSS units like px, vh, rem, etc.', 'zenstarter')}
                        onChange={(value) => setAttributes({ minHeight: value })}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Design Settings', 'zenstarter')}
                    initialOpen={false}
                >
                    <RangeControl
                        label={__('Border Radius', 'zenstarter')}
                        value={borderRadius}
                        onChange={(value) => setAttributes({ borderRadius: value })}
                        min={0}
                        max={50}
                        step={1}
                    />
                    
                    <SelectControl
                        label={__('Shadow Level', 'zenstarter')}
                        value={shadowLevel}
                        options={[
                            { label: __('None', 'zenstarter'), value: 'none' },
                            { label: __('Small', 'zenstarter'), value: 'small' },
                            { label: __('Medium', 'zenstarter'), value: 'medium' },
                            { label: __('Large', 'zenstarter'), value: 'large' },
                            { label: __('Extra Large', 'zenstarter'), value: 'xl' },
                        ]}
                        onChange={(value) => setAttributes({ shadowLevel: value })}
                    />
                </PanelBody>

                <PanelColorGradientSettings
                    title={__('Color Settings', 'zenstarter')}
                    settings={[
                        {
                            colorValue: backgroundColor.color,
                            onColorChange: setBackgroundColor,
                            gradientValue: gradient,
                            onGradientChange: setGradient,
                            label: __('Background', 'zenstarter'),
                        },
                        {
                            colorValue: textColor.color,
                            onColorChange: setTextColor,
                            label: __('Text Color', 'zenstarter'),
                        },
                    ]}
                    __experimentalIsRenderedInSidebar
                />
            </InspectorControls>

            <div {...blockProps}>
                <div {...innerBlocksProps} />
            </div>
        </>
    );
}

export default compose([
    withColors('backgroundColor', { textColor: 'color' }),
])(ZenBoxEdit);