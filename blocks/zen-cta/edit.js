/**
 * Zen CTA Block - Editor Component
 * 
 * Provides the editor interface for the zen-cta block with
 * comprehensive customization options for call-to-action sections
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
    RichText,
    URLInput,
    __experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    ToggleControl,
    TextControl,
    ButtonGroup,
    Button,
    Icon,
} from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';

// Import shared utilities
import { 
    generateBlockClasses, 
    generateInlineStyles,
    ctaTemplate 
} from '../lib/utils.js';

/**
 * Zen CTA Edit Component
 * 
 * @param {Object} props Component properties
 * @returns {JSX.Element} The editor component
 */
function ZenCTAEdit({
    attributes,
    setAttributes,
    backgroundColor,
    setBackgroundColor,
    textColor,
    setTextColor,
    clientId
}) {
    const {
        ctaTitle,
        ctaDescription,
        buttonText,
        buttonUrl,
        buttonTarget,
        buttonRel,
        buttonStyle,
        buttonSize,
        layoutStyle,
        contentAlignment,
        enableCustomContent,
        showIcon,
        iconName,
        iconPosition,
        animationEnabled,
        animationType,
        style
    } = attributes;

    // State for link control
    const [isLinkOpen, setIsLinkOpen] = useState(false);

    // Check if block has inner blocks (when custom content is enabled)
    const hasInnerBlocks = useSelect(
        (select) => {
            const block = select('core/block-editor').getBlock(clientId);
            return !!(block && block.innerBlocks && block.innerBlocks.length > 0);
        },
        [clientId]
    );

    /**
     * Handle link change from LinkControl
     */
    const onLinkChange = (linkValue) => {
        setAttributes({
            buttonUrl: linkValue.url || '',
            buttonTarget: linkValue.opensInNewTab ? '_blank' : '_self',
            buttonRel: linkValue.opensInNewTab ? 'noopener noreferrer' : ''
        });
    };

    /**
     * Generate CTA wrapper classes
     */
    const getCTAClasses = () => {
        const classes = ['zen-cta'];
        
        if (layoutStyle !== 'stacked') {
            classes.push(`zen-cta--${layoutStyle}`);
        }
        
        if (contentAlignment !== 'center') {
            classes.push(`zen-cta--align-${contentAlignment}`);
        }
        
        if (showIcon) {
            classes.push('zen-cta--has-icon');
            classes.push(`zen-cta--icon-${iconPosition}`);
        }
        
        if (animationEnabled) {
            classes.push(`zen-cta--animated zen-cta--${animationType}`);
        }
        
        return generateBlockClasses('cta', attributes, classes);
    };

    /**
     * Generate CTA wrapper styles
     */
    const getCTAStyles = () => {
        return generateInlineStyles(attributes);
    };

    /**
     * Generate button classes
     */
    const getButtonClasses = () => {
        const classes = ['zen-cta__button', 'wp-block-button__link'];
        
        classes.push(`zen-cta__button--${buttonStyle}`);
        classes.push(`zen-cta__button--${buttonSize}`);
        
        return classes.join(' ');
    };

    const blockProps = useBlockProps({
        className: getCTAClasses(),
        style: getCTAStyles()
    });

    return (
        <>
            <InspectorControls>
                {/* Content Settings */}
                <PanelBody
                    title={__('Content Settings', 'zenstarter')}
                    initialOpen={true}
                >
                    <ToggleControl
                        label={__('Enable Custom Content', 'zenstarter')}
                        checked={enableCustomContent}
                        onChange={(value) => setAttributes({ enableCustomContent: value })}
                        help={enableCustomContent ? 
                            __('Use InnerBlocks for advanced content layout', 'zenstarter') :
                            __('Use simple title and description fields', 'zenstarter')
                        }
                    />
                    
                    {!enableCustomContent && (
                        <>
                            <TextControl
                                label={__('CTA Title', 'zenstarter')}
                                value={ctaTitle}
                                onChange={(value) => setAttributes({ ctaTitle: value })}
                                placeholder={__('Enter CTA title...', 'zenstarter')}
                            />
                            
                            <TextControl
                                label={__('CTA Description', 'zenstarter')}
                                value={ctaDescription}
                                onChange={(value) => setAttributes({ ctaDescription: value })}
                                placeholder={__('Enter CTA description...', 'zenstarter')}
                                help={__('Optional description text', 'zenstarter')}
                            />
                        </>
                    )}
                </PanelBody>

                {/* Button Settings */}
                <PanelBody
                    title={__('Button Settings', 'zenstarter')}
                    initialOpen={false}
                >
                    <TextControl
                        label={__('Button Text', 'zenstarter')}
                        value={buttonText}
                        onChange={(value) => setAttributes({ buttonText: value })}
                        placeholder={__('Learn More', 'zenstarter')}
                    />
                    
                    <div className="zen-cta-link-control">
                        <label className="components-base-control__label">
                            {__('Button Link', 'zenstarter')}
                        </label>
                        
                        <LinkControl
                            value={{
                                url: buttonUrl,
                                opensInNewTab: buttonTarget === '_blank'
                            }}
                            onChange={onLinkChange}
                            settings={[
                                {
                                    id: 'opensInNewTab',
                                    title: __('Open in new tab', 'zenstarter'),
                                }
                            ]}
                        />
                    </div>
                    
                    <SelectControl
                        label={__('Button Style', 'zenstarter')}
                        value={buttonStyle}
                        options={[
                            { label: __('Primary', 'zenstarter'), value: 'primary' },
                            { label: __('Secondary', 'zenstarter'), value: 'secondary' },
                            { label: __('Outline', 'zenstarter'), value: 'outline' },
                            { label: __('Ghost', 'zenstarter'), value: 'ghost' }
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
                </PanelBody>

                {/* Layout Settings */}
                <PanelBody
                    title={__('Layout Settings', 'zenstarter')}
                    initialOpen={false}
                >
                    <SelectControl
                        label={__('Layout Style', 'zenstarter')}
                        value={layoutStyle}
                        options={[
                            { label: __('Stacked', 'zenstarter'), value: 'stacked' },
                            { label: __('Horizontal', 'zenstarter'), value: 'horizontal' },
                            { label: __('Centered', 'zenstarter'), value: 'centered' }
                        ]}
                        onChange={(value) => setAttributes({ layoutStyle: value })}
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
                </PanelBody>

                {/* Icon Settings */}
                <PanelBody
                    title={__('Icon Settings', 'zenstarter')}
                    initialOpen={false}
                >
                    <ToggleControl
                        label={__('Show Icon', 'zenstarter')}
                        checked={showIcon}
                        onChange={(value) => setAttributes({ showIcon: value })}
                    />
                    
                    {showIcon && (
                        <>
                            <TextControl
                                label={__('Icon Name', 'zenstarter')}
                                value={iconName}
                                onChange={(value) => setAttributes({ iconName: value })}
                                help={__('Dashicon name (e.g., star-filled, heart, check)', 'zenstarter')}
                            />
                            
                            <SelectControl
                                label={__('Icon Position', 'zenstarter')}
                                value={iconPosition}
                                options={[
                                    { label: __('Before Text', 'zenstarter'), value: 'before' },
                                    { label: __('After Text', 'zenstarter'), value: 'after' }
                                ]}
                                onChange={(value) => setAttributes({ iconPosition: value })}
                            />
                        </>
                    )}
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
                        <SelectControl
                            label={__('Animation Type', 'zenstarter')}
                            value={animationType}
                            options={[
                                { label: __('Fade In', 'zenstarter'), value: 'fadeIn' },
                                { label: __('Slide Up', 'zenstarter'), value: 'slideUp' },
                                { label: __('Slide Left', 'zenstarter'), value: 'slideLeft' },
                                { label: __('Slide Right', 'zenstarter'), value: 'slideRight' },
                                { label: __('Bounce', 'zenstarter'), value: 'bounce' }
                            ]}
                            onChange={(value) => setAttributes({ animationType: value })}
                        />
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {/* Icon (if enabled and positioned before) */}
                {showIcon && iconPosition === 'before' && (
                    <div className="zen-cta__icon zen-cta__icon--before">
                        <Icon icon={iconName} />
                    </div>
                )}
                
                <div className="zen-cta__content">
                    {enableCustomContent ? (
                        <InnerBlocks
                            template={ctaTemplate}
                            renderAppender={hasInnerBlocks ? undefined : InnerBlocks.ButtonBlockAppender}
                            templateLock={false}
                        />
                    ) : (
                        <>
                            {ctaTitle && (
                                <RichText
                                    tagName="h2"
                                    className="zen-cta__title"
                                    value={ctaTitle}
                                    onChange={(value) => setAttributes({ ctaTitle: value })}
                                    placeholder={__('Enter CTA title...', 'zenstarter')}
                                />
                            )}
                            
                            {ctaDescription && (
                                <RichText
                                    tagName="p"
                                    className="zen-cta__description"
                                    value={ctaDescription}
                                    onChange={(value) => setAttributes({ ctaDescription: value })}
                                    placeholder={__('Enter CTA description...', 'zenstarter')}
                                />
                            )}
                        </>
                    )}
                </div>
                
                {/* Button */}
                <div className="zen-cta__action">
                    <a
                        className={getButtonClasses()}
                        href={buttonUrl || '#'}
                        target={buttonTarget}
                        rel={buttonRel}
                        onClick={(e) => e.preventDefault()}
                    >
                        {buttonText || __('Learn More', 'zenstarter')}
                    </a>
                </div>
                
                {/* Icon (if enabled and positioned after) */}
                {showIcon && iconPosition === 'after' && (
                    <div className="zen-cta__icon zen-cta__icon--after">
                        <Icon icon={iconName} />
                    </div>
                )}
            </div>
        </>
    );
}

export default compose([
    withColors('backgroundColor', { textColor: 'color' }),
])(ZenCTAEdit);