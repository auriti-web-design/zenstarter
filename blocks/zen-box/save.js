/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Save component
 */
export default function save({ attributes }) {
    const {
        borderRadius,
        shadowLevel,
        minHeight,
        containerType,
        verticalAlignment,
        style,
    } = attributes;

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

    const blockProps = useBlockProps.save({
        className: getBoxClasses(),
        style: getBoxStyles(),
    });

    return (
        <div {...blockProps}>
            <div className="zen-box__content">
                <InnerBlocks.Content />
            </div>
        </div>
    );
}