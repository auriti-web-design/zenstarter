<?php
/**
 * Template part for displaying the hero section on front page
 *
 * @package Zenstarter
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<section class="hero-section">
    <div class="container">
        
        <div class="hero-content">
            
            <header class="hero-header">
                <h1 class="hero-title">
                    <?php
                    // Get custom title from theme customizer or use default
                    $hero_title = get_theme_mod('zenstarter_hero_title', __('Welcome to Zenstarter', 'zenstarter'));
                    echo esc_html($hero_title);
                    ?>
                </h1>
                
                <p class="hero-subtitle">
                    <?php
                    // Get custom subtitle from theme customizer or use default
                    $hero_subtitle = get_theme_mod('zenstarter_hero_subtitle', __('A modern WordPress starter theme built for performance, accessibility, and developer experience.', 'zenstarter'));
                    echo esc_html($hero_subtitle);
                    ?>
                </p>
            </header>
            
            <div class="hero-actions">
                <?php
                // Primary CTA button
                $hero_cta_text = get_theme_mod('zenstarter_hero_cta_text', __('Get Started', 'zenstarter'));
                $hero_cta_url = get_theme_mod('zenstarter_hero_cta_url', '#');
                
                if ($hero_cta_text && $hero_cta_url) :
                ?>
                    <a href="<?php echo esc_url($hero_cta_url); ?>" class="btn btn--primary btn--large">
                        <?php echo esc_html($hero_cta_text); ?>
                    </a>
                <?php endif; ?>
                
                <?php
                // Secondary CTA button
                $hero_secondary_text = get_theme_mod('zenstarter_hero_secondary_text', __('Learn More', 'zenstarter'));
                $hero_secondary_url = get_theme_mod('zenstarter_hero_secondary_url', '#');
                
                if ($hero_secondary_text && $hero_secondary_url) :
                ?>
                    <a href="<?php echo esc_url($hero_secondary_url); ?>" class="btn btn--outline btn--large">
                        <?php echo esc_html($hero_secondary_text); ?>
                    </a>
                <?php endif; ?>
            </div>
            
        </div>
        
        <?php
        // Hero image or video
        $hero_media_type = get_theme_mod('zenstarter_hero_media_type', 'image');
        $hero_image = get_theme_mod('zenstarter_hero_image');
        
        if ($hero_image || $hero_media_type === 'video') :
        ?>
            <div class="hero-media">
                <?php if ($hero_media_type === 'image' && $hero_image) : ?>
                    <img 
                        src="<?php echo esc_url($hero_image); ?>" 
                        alt="<?php echo esc_attr($hero_title); ?>"
                        class="hero-image"
                        loading="eager"
                    />
                <?php elseif ($hero_media_type === 'video') : ?>
                    <?php
                    $hero_video_url = get_theme_mod('zenstarter_hero_video_url');
                    if ($hero_video_url) :
                    ?>
                        <div class="hero-video">
                            <?php echo wp_oembed_get($hero_video_url); ?>
                        </div>
                    <?php endif; ?>
                <?php endif; ?>
            </div>
        <?php endif; ?>
        
    </div>
</section><!-- .hero-section -->