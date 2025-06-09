<?php
/**
 * Zen Hero Block - Server-Side Render
 * 
 * Provides server-side rendering for the zen-hero block
 * with enhanced performance and SEO benefits
 *
 * @package Zenstarter
 * @subpackage Blocks
 * @version 1.0.0
 * 
 * @param array    $attributes Block attributes
 * @param string   $content    Block content
 * @param WP_Block $block      Block instance
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Extract attributes with defaults
$background_image_url = $attributes['backgroundImageUrl'] ?? '';
$background_position = $attributes['backgroundPosition'] ?? 'center center';
$background_size = $attributes['backgroundSize'] ?? 'cover';
$background_repeat = $attributes['backgroundRepeat'] ?? 'no-repeat';
$background_attachment = $attributes['backgroundAttachment'] ?? 'scroll';
$overlay_color = $attributes['overlayColor'] ?? '';
$overlay_opacity = $attributes['overlayOpacity'] ?? 0.5;
$overlay_gradient = $attributes['overlayGradient'] ?? '';
$min_height = $attributes['minHeight'] ?? '60vh';
$content_alignment = $attributes['contentAlignment'] ?? 'center';
$vertical_alignment = $attributes['verticalAlignment'] ?? 'center';
$content_max_width = $attributes['contentMaxWidth'] ?? '800px';
$animation_enabled = $attributes['animationEnabled'] ?? false;
$animation_type = $attributes['animationType'] ?? 'fadeIn';
$animation_duration = $attributes['animationDuration'] ?? 1000;
$parallax_enabled = $attributes['parallaxEnabled'] ?? false;
$parallax_speed = $attributes['parallaxSpeed'] ?? 0.5;

/**
 * Generate CSS classes for the hero wrapper
 */
if (!function_exists('zen_hero_get_wrapper_classes')) {
function zen_hero_get_wrapper_classes($attributes) {
    $classes = ['zen-hero'];
    
    // Content alignment
    $content_alignment = $attributes['contentAlignment'] ?? 'center';
    if ($content_alignment !== 'center') {
        $classes[] = 'zen-hero--align-' . sanitize_html_class($content_alignment);
    }
    
    // Vertical alignment
    $vertical_alignment = $attributes['verticalAlignment'] ?? 'center';
    if ($vertical_alignment !== 'center') {
        $classes[] = 'zen-hero--valign-' . sanitize_html_class($vertical_alignment);
    }
    
    // Background image
    if (!empty($attributes['backgroundImageUrl'])) {
        $classes[] = 'zen-hero--has-background-image';
    }
    
    // Overlay
    if (!empty($attributes['overlayColor']) || !empty($attributes['overlayGradient'])) {
        $classes[] = 'zen-hero--has-overlay';
    }
    
    // Parallax
    if (!empty($attributes['parallaxEnabled']) && !empty($attributes['backgroundImageUrl'])) {
        $classes[] = 'zen-hero--parallax';
    }
    
    // Animation
    if (!empty($attributes['animationEnabled'])) {
        $animation_type = $attributes['animationType'] ?? 'fadeIn';
        $classes[] = 'zen-hero--animated';
        $classes[] = 'zen-hero--' . sanitize_html_class($animation_type);
    }
    
    // Add custom className if provided
    if (!empty($attributes['className'])) {
        $classes[] = sanitize_html_class($attributes['className']);
    }
    
    return implode(' ', array_unique($classes));
}
}

/**
 * Generate inline styles for the hero wrapper
 */
if (!function_exists('zen_hero_get_wrapper_styles')) {
function zen_hero_get_wrapper_styles($attributes) {
    $styles = [];
    
    // Min height
    $min_height = $attributes['minHeight'] ?? '';
    if (!empty($min_height)) {
        $styles[] = 'min-height: ' . esc_attr($min_height);
    }
    
    // Background image
    $background_image_url = $attributes['backgroundImageUrl'] ?? '';
    if (!empty($background_image_url)) {
        $styles[] = 'background-image: url(' . esc_url($background_image_url) . ')';
        
        $background_position = $attributes['backgroundPosition'] ?? 'center center';
        $styles[] = 'background-position: ' . esc_attr($background_position);
        
        $background_size = $attributes['backgroundSize'] ?? 'cover';
        $styles[] = 'background-size: ' . esc_attr($background_size);
        
        $background_repeat = $attributes['backgroundRepeat'] ?? 'no-repeat';
        $styles[] = 'background-repeat: ' . esc_attr($background_repeat);
        
        $background_attachment = $attributes['backgroundAttachment'] ?? 'scroll';
        $styles[] = 'background-attachment: ' . esc_attr($background_attachment);
    }
    
    // Animation duration
    $animation_enabled = $attributes['animationEnabled'] ?? false;
    $animation_duration = $attributes['animationDuration'] ?? 1000;
    if ($animation_enabled && !empty($animation_duration)) {
        $styles[] = 'animation-duration: ' . intval($animation_duration) . 'ms';
    }
    
    // Custom styles from attributes
    if (!empty($attributes['style'])) {
        // Handle spacing
        if (!empty($attributes['style']['spacing'])) {
            $spacing = $attributes['style']['spacing'];
            
            // Margin
            if (!empty($spacing['margin'])) {
                foreach ($spacing['margin'] as $side => $value) {
                    if (!empty($value)) {
                        $styles[] = 'margin-' . esc_attr($side) . ': ' . esc_attr($value);
                    }
                }
            }
            
            // Padding
            if (!empty($spacing['padding'])) {
                foreach ($spacing['padding'] as $side => $value) {
                    if (!empty($value)) {
                        $styles[] = 'padding-' . esc_attr($side) . ': ' . esc_attr($value);
                    }
                }
            }
        }
        
        // Handle border
        if (!empty($attributes['style']['border'])) {
            $border = $attributes['style']['border'];
            
            if (!empty($border['radius'])) {
                $styles[] = 'border-radius: ' . esc_attr($border['radius']);
            }
        }
    }
    
    return !empty($styles) ? implode('; ', $styles) : '';
}
}

/**
 * Generate data attributes for JavaScript functionality
 */
if (!function_exists('zen_hero_get_data_attributes')) {
function zen_hero_get_data_attributes($attributes) {
    $data_attrs = [];
    
    // Parallax
    $parallax_enabled = $attributes['parallaxEnabled'] ?? false;
    $background_image_url = $attributes['backgroundImageUrl'] ?? '';
    if ($parallax_enabled && !empty($background_image_url)) {
        $data_attrs['data-parallax'] = 'true';
        $parallax_speed = $attributes['parallaxSpeed'] ?? 0.5;
        $data_attrs['data-parallax-speed'] = esc_attr($parallax_speed);
    }
    
    // Animation
    $animation_enabled = $attributes['animationEnabled'] ?? false;
    if ($animation_enabled) {
        $animation_type = $attributes['animationType'] ?? 'fadeIn';
        $animation_duration = $attributes['animationDuration'] ?? 1000;
        $data_attrs['data-animation'] = esc_attr($animation_type);
        $data_attrs['data-animation-duration'] = esc_attr($animation_duration);
    }
    
    return $data_attrs;
}
}

/**
 * Generate content wrapper styles
 */
if (!function_exists('zen_hero_get_content_styles')) {
function zen_hero_get_content_styles($attributes) {
    $styles = [];
    
    $content_max_width = $attributes['contentMaxWidth'] ?? '';
    if (!empty($content_max_width)) {
        $styles[] = 'max-width: ' . esc_attr($content_max_width);
    }
    
    return !empty($styles) ? implode('; ', $styles) : '';
}
}

/**
 * Generate overlay styles
 */
if (!function_exists('zen_hero_get_overlay_styles')) {
function zen_hero_get_overlay_styles($attributes) {
    $styles = [];
    
    $overlay_color = $attributes['overlayColor'] ?? '';
    $overlay_gradient = $attributes['overlayGradient'] ?? '';
    $overlay_opacity = $attributes['overlayOpacity'] ?? 0.5;
    
    if (!empty($overlay_color)) {
        $styles[] = 'background-color: ' . esc_attr($overlay_color);
        $styles[] = 'opacity: ' . esc_attr($overlay_opacity);
    }
    
    if (!empty($overlay_gradient)) {
        $styles[] = 'background: ' . esc_attr($overlay_gradient);
        $styles[] = 'opacity: ' . esc_attr($overlay_opacity);
    }
    
    return !empty($styles) ? implode('; ', $styles) : '';
}
}

// Generate all the required data
$wrapper_classes = zen_hero_get_wrapper_classes($attributes);
$wrapper_styles = zen_hero_get_wrapper_styles($attributes);
$data_attributes = zen_hero_get_data_attributes($attributes);
$content_styles = zen_hero_get_content_styles($attributes);
$overlay_styles = zen_hero_get_overlay_styles($attributes);

// Build data attributes string
$data_attrs_string = '';
foreach ($data_attributes as $key => $value) {
    $data_attrs_string .= ' ' . esc_attr($key) . '="' . esc_attr($value) . '"';
}

// Check if overlay should be displayed
$has_overlay = !empty($overlay_color) || !empty($overlay_gradient);
?>

<div class="<?php echo esc_attr($wrapper_classes); ?>" 
     <?php if (!empty($wrapper_styles)) : ?>style="<?php echo esc_attr($wrapper_styles); ?>"<?php endif; ?>
     <?php echo $data_attrs_string; ?>>
     
    <?php if ($has_overlay) : ?>
        <div class="zen-hero__overlay" 
             <?php if (!empty($overlay_styles)) : ?>style="<?php echo esc_attr($overlay_styles); ?>"<?php endif; ?>></div>
    <?php endif; ?>
    
    <div class="zen-hero__content" 
         <?php if (!empty($content_styles)) : ?>style="<?php echo esc_attr($content_styles); ?>"<?php endif; ?>>
        <?php echo $content; ?>
    </div>
</div>