<?php
/**
 * Template part for displaying the features section on front page
 *
 * @package Zenstarter
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<section class="features-section">
    <div class="container">
        
        <header class="section-header">
            <h2 class="section-title">
                <?php 
                $features_title = get_theme_mod('zenstarter_features_title', __('Key Features', 'zenstarter'));
                echo esc_html($features_title); 
                ?>
            </h2>
            <p class="section-description">
                <?php 
                $features_description = get_theme_mod('zenstarter_features_description', __('Everything you need to build modern WordPress websites', 'zenstarter'));
                echo esc_html($features_description); 
                ?>
            </p>
        </header>
        
        <div class="features-grid grid grid--3-cols">
            
            <?php
            // Default features array
            $default_features = array(
                array(
                    'title' => __('Performance Optimized', 'zenstarter'),
                    'description' => __('Built with modern web standards and performance best practices in mind.', 'zenstarter'),
                    'icon' => 'performance'
                ),
                array(
                    'title' => __('Accessibility First', 'zenstarter'),
                    'description' => __('WCAG 2.1 compliant with semantic HTML and ARIA support.', 'zenstarter'),
                    'icon' => 'accessibility'
                ),
                array(
                    'title' => __('Gutenberg Ready', 'zenstarter'),
                    'description' => __('Full Site Editing support with custom blocks and patterns.', 'zenstarter'),
                    'icon' => 'gutenberg'
                ),
                array(
                    'title' => __('Developer Friendly', 'zenstarter'),
                    'description' => __('Modern build tools, PSR-4 autoloading, and clean architecture.', 'zenstarter'),
                    'icon' => 'developer'
                ),
                array(
                    'title' => __('Mobile First', 'zenstarter'),
                    'description' => __('Responsive design that works perfectly on all devices.', 'zenstarter'),
                    'icon' => 'mobile'
                ),
                array(
                    'title' => __('SEO Optimized', 'zenstarter'),
                    'description' => __('Structured data, meta tags, and search engine friendly markup.', 'zenstarter'),
                    'icon' => 'seo'
                )
            );
            
            // Get custom features from theme customizer or use defaults
            $features = get_theme_mod('zenstarter_features', $default_features);
            
            foreach ($features as $index => $feature) :
                if (empty($feature['title'])) continue;
            ?>
                
                <div class="feature-card">
                    
                    <?php if (!empty($feature['icon'])) : ?>
                        <div class="feature-icon">
                            <?php 
                            // Simple icon system - you can replace with your preferred icon library
                            switch ($feature['icon']) :
                                case 'performance':
                                    echo '<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>';
                                    break;
                                case 'accessibility':
                                    echo '<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/></svg>';
                                    break;
                                case 'gutenberg':
                                    echo '<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>';
                                    break;
                                case 'developer':
                                    echo '<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>';
                                    break;
                                case 'mobile':
                                    echo '<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 20c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5-4H7V4h10v14z"/></svg>';
                                    break;
                                case 'seo':
                                    echo '<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>';
                                    break;
                                default:
                                    echo '<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
                            endswitch;
                            ?>
                        </div>
                    <?php endif; ?>
                    
                    <div class="feature-content">
                        <h3 class="feature-title">
                            <?php echo esc_html($feature['title']); ?>
                        </h3>
                        
                        <?php if (!empty($feature['description'])) : ?>
                            <p class="feature-description">
                                <?php echo esc_html($feature['description']); ?>
                            </p>
                        <?php endif; ?>
                    </div>
                    
                </div><!-- .feature-card -->
                
            <?php endforeach; ?>
            
        </div><!-- .features-grid -->
        
    </div>
</section><!-- .features-section -->