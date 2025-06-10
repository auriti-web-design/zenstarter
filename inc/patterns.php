<?php
/**
 * Dynamic Pattern Registration for FSE
 *
 * Handles dynamic registration of block patterns to make them
 * fully editable in the Site Editor
 *
 * @package Zenstarter
 * @subpackage Patterns
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Pattern Manager Class
 */
class Zenstarter_Pattern_Manager {
    
    /**
     * Constructor - Initialize pattern management
     */
    public function __construct() {
        add_action('init', array($this, 'register_pattern_categories'));
        add_action('init', array($this, 'register_dynamic_patterns'));
        add_filter('wp_theme_json_data_theme', array($this, 'enhance_theme_json_patterns'));
    }
    
    /**
     * Register custom pattern categories
     */
    public function register_pattern_categories() {
        // Register main theme category
        register_block_pattern_category(
            'zenstarter',
            array(
                'label' => __('Zenstarter', 'zenstarter'),
                'description' => __('Professional patterns for modern websites', 'zenstarter')
            )
        );
        
        // Register blog-specific category
        register_block_pattern_category(
            'zenstarter-blog',
            array(
                'label' => __('Zenstarter Blog', 'zenstarter'),
                'description' => __('Blog layouts and content patterns', 'zenstarter')
            )
        );
        
        // Register layout category
        register_block_pattern_category(
            'zenstarter-layout',
            array(
                'label' => __('Zenstarter Layouts', 'zenstarter'),
                'description' => __('Complete page layouts and sections', 'zenstarter')
            )
        );
        
        // Register header/footer category
        register_block_pattern_category(
            'zenstarter-template-parts',
            array(
                'label' => __('Zenstarter Template Parts', 'zenstarter'),
                'description' => __('Headers, footers and reusable components', 'zenstarter')
            )
        );
    }
    
    /**
     * Register dynamic patterns from JSON files
     */
    public function register_dynamic_patterns() {
        $patterns_dir = get_template_directory() . '/patterns/';
        
        if (!is_dir($patterns_dir)) {
            return;
        }
        
        $pattern_files = glob($patterns_dir . '*.json');
        
        foreach ($pattern_files as $pattern_file) {
            $this->register_pattern_from_file($pattern_file);
        }
        
        // Register additional blog patterns
        $this->register_blog_patterns();
    }
    
    /**
     * Register pattern from JSON file
     *
     * @param string $pattern_file Path to pattern JSON file
     */
    private function register_pattern_from_file($pattern_file) {
        $pattern_data = file_get_contents($pattern_file);
        $pattern = json_decode($pattern_data, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            return;
        }
        
        $pattern_name = basename($pattern_file, '.json');
        $pattern_slug = 'zenstarter/' . $pattern_name;
        
        // Enhance pattern data for FSE compatibility
        $pattern_args = array(
            'title' => isset($pattern['title']) ? $pattern['title'] : ucwords(str_replace('-', ' ', $pattern_name)),
            'content' => isset($pattern['content']) ? $pattern['content'] : '',
            'categories' => isset($pattern['categories']) ? $pattern['categories'] : array('zenstarter'),
            'keywords' => isset($pattern['keywords']) ? $pattern['keywords'] : array($pattern_name),
            'description' => isset($pattern['description']) ? $pattern['description'] : '',
            'inserter' => isset($pattern['inserter']) ? $pattern['inserter'] : true,
            'blockTypes' => isset($pattern['blockTypes']) ? $pattern['blockTypes'] : array(),
            'viewportWidth' => isset($pattern['viewportWidth']) ? $pattern['viewportWidth'] : 1280,
            'postTypes' => isset($pattern['postTypes']) ? $pattern['postTypes'] : array('page', 'post'),
        );
        
        // Make pattern Site Editor compatible
        if (!isset($pattern['blockTypes']) || empty($pattern['blockTypes'])) {
            $pattern_args['blockTypes'] = array('core/post-content', 'core/group', 'core/columns');
        }
        
        register_block_pattern($pattern_slug, $pattern_args);
    }
    
    /**
     * Register additional blog-specific patterns
     */
    private function register_blog_patterns() {
        // Blog Post Grid Pattern
        register_block_pattern(
            'zenstarter/blog-post-grid',
            array(
                'title' => __('Blog Post Grid', 'zenstarter'),
                'description' => __('A responsive grid layout for blog posts with featured images and excerpts', 'zenstarter'),
                'categories' => array('zenstarter-blog'),
                'keywords' => array('blog', 'posts', 'grid', 'archive'),
                'blockTypes' => array('core/query', 'core/post-template'),
                'inserter' => true,
                'viewportWidth' => 1280,
                'content' => '<!-- wp:query {"queryId":1,"query":{"perPage":6,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false}} -->
                <div class="wp-block-query">
                    <!-- wp:post-template {"layout":{"type":"grid","columnCount":3}} -->
                        <!-- wp:group {"style":{"spacing":{"padding":{"top":"0","right":"0","bottom":"0","left":"0"}}},"className":"post-card","layout":{"type":"constrained"}} -->
                        <div class="wp-block-group post-card">
                            <!-- wp:post-featured-image {"isLink":true,"aspectRatio":"4/3","style":{"border":{"radius":"8px"}}} /-->
                            
                            <!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|40","right":"0","bottom":"0","left":"0"}}},"layout":{"type":"constrained"}} -->
                            <div class="wp-block-group">
                                <!-- wp:post-title {"isLink":true,"fontSize":"large"} /-->
                                
                                <!-- wp:post-date {"fontSize":"small","style":{"color":{"text":"var:preset|color|secondary"}}} /-->
                                
                                <!-- wp:post-excerpt {"moreText":"Read more","excerptLength":20} /-->
                            </div>
                            <!-- /wp:group -->
                        </div>
                        <!-- /wp:group -->
                    <!-- /wp:post-template -->
                    
                    <!-- wp:query-pagination {"layout":{"type":"flex","justifyContent":"center"}} -->
                        <!-- wp:query-pagination-previous /-->
                        <!-- wp:query-pagination-numbers /-->
                        <!-- wp:query-pagination-next /-->
                    <!-- /wp:query-pagination -->
                </div>
                <!-- /wp:query -->'
            )
        );
        
        // Featured Post Pattern
        register_block_pattern(
            'zenstarter/featured-post',
            array(
                'title' => __('Featured Post Layout', 'zenstarter'),
                'description' => __('Large featured post with image and detailed excerpt', 'zenstarter'),
                'categories' => array('zenstarter-blog'),
                'keywords' => array('featured', 'post', 'hero', 'highlight'),
                'blockTypes' => array('core/query', 'core/post-template'),
                'inserter' => true,
                'content' => '<!-- wp:query {"queryId":2,"query":{"perPage":1,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"only","inherit":false}} -->
                <div class="wp-block-query">
                    <!-- wp:post-template -->
                        <!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}},"backgroundColor":"gray-50","className":"featured-post","layout":{"type":"constrained"}} -->
                        <div class="wp-block-group alignfull featured-post has-gray-50-background-color has-background">
                            <!-- wp:columns {"verticalAlignment":"center","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|50","left":"var:preset|spacing|50"}}}} -->
                            <div class="wp-block-columns are-vertically-aligned-center">
                                <!-- wp:column -->
                                <div class="wp-block-column">
                                    <!-- wp:post-featured-image {"aspectRatio":"16/9","style":{"border":{"radius":"12px"}}} /-->
                                </div>
                                <!-- /wp:column -->
                                
                                <!-- wp:column -->
                                <div class="wp-block-column">
                                    <!-- wp:post-terms {"term":"category","style":{"typography":{"textTransform":"uppercase","letterSpacing":"1px"}},"fontSize":"small"} /-->
                                    
                                    <!-- wp:post-title {"isLink":true,"fontSize":"xxx-large"} /-->
                                    
                                    <!-- wp:post-excerpt {"moreText":"Continue reading","excerptLength":30} /-->
                                    
                                    <!-- wp:group {"style":{"spacing":{"margin":{"top":"var:preset|spacing|40"}}},"layout":{"type":"flex","flexWrap":"nowrap"}} -->
                                    <div class="wp-block-group">
                                        <!-- wp:post-author {"showAvatar":true,"avatarSize":24,"fontSize":"small"} /-->
                                        <!-- wp:post-date {"fontSize":"small","style":{"color":{"text":"var:preset|color|secondary"}}} /-->
                                    </div>
                                    <!-- /wp:group -->
                                </div>
                                <!-- /wp:column -->
                            </div>
                            <!-- /wp:columns -->
                        </div>
                        <!-- /wp:group -->
                    <!-- /wp:post-template -->
                </div>
                <!-- /wp:query -->'
            )
        );
        
        // Author Bio Pattern
        register_block_pattern(
            'zenstarter/author-bio-section',
            array(
                'title' => __('Author Bio Section', 'zenstarter'),
                'description' => __('Author biography with avatar and social links', 'zenstarter'),
                'categories' => array('zenstarter-blog'),
                'keywords' => array('author', 'bio', 'about', 'profile'),
                'blockTypes' => array('core/post-content', 'core/group'),
                'inserter' => true,
                'content' => '<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|50","right":"var:preset|spacing|50","bottom":"var:preset|spacing|50","left":"var:preset|spacing|50"}},"border":{"width":"1px","color":"var:preset|color|gray-200","radius":"12px"}},"backgroundColor":"gray-50","className":"author-bio-section","layout":{"type":"constrained"}} -->
                <div class="wp-block-group author-bio-section has-border-color has-gray-200-border-color has-gray-50-background-color has-background">
                    <!-- wp:columns {"verticalAlignment":"center","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|40","left":"var:preset|spacing|40"}}}} -->
                    <div class="wp-block-columns are-vertically-aligned-center">
                        <!-- wp:column {"width":"80px"} -->
                        <div class="wp-block-column" style="flex-basis:80px">
                            <!-- wp:post-author-biography {"avatarSize":80} /-->
                        </div>
                        <!-- /wp:column -->
                        
                        <!-- wp:column -->
                        <div class="wp-block-column">
                            <!-- wp:heading {"level":4,"fontSize":"large"} -->
                            <h4 class="wp-block-heading has-large-font-size">About the Author</h4>
                            <!-- /wp:heading -->
                            
                            <!-- wp:post-author-name {"isLink":true,"fontSize":"medium"} /-->
                            
                            <!-- wp:post-author-biography /-->
                            
                            <!-- wp:paragraph {"fontSize":"small"} -->
                            <p class="has-small-font-size"><a href="#">View all posts by this author →</a></p>
                            <!-- /wp:paragraph -->
                        </div>
                        <!-- /wp:column -->
                    </div>
                    <!-- /wp:columns -->
                </div>
                <!-- /wp:group -->'
            )
        );
    }
    
    /**
     * Enhance theme.json with pattern-specific configurations
     *
     * @param WP_Theme_JSON_Data $theme_json Theme JSON data object
     * @return WP_Theme_JSON_Data Modified theme JSON data
     */
    public function enhance_theme_json_patterns($theme_json) {
        $data = $theme_json->get_data();
        
        // Add pattern-specific styles
        if (!isset($data['styles']['blocks'])) {
            $data['styles']['blocks'] = array();
        }
        
        // Enhance query block for better blog layouts
        $data['styles']['blocks']['core/query'] = array(
            'spacing' => array(
                'margin' => array(
                    'top' => 'var:preset|spacing|50',
                    'bottom' => 'var:preset|spacing|50'
                )
            )
        );
        
        // Enhance post template for better grid layouts
        $data['styles']['blocks']['core/post-template'] = array(
            'spacing' => array(
                'blockGap' => 'var:preset|spacing|50'
            )
        );
        
        return $theme_json->update_with($data);
    }
}

// Initialize Pattern Manager
new Zenstarter_Pattern_Manager();

/**
 * Helper function to get pattern content
 *
 * @param string $pattern_name Pattern name
 * @return string Pattern content
 */
function zenstarter_get_pattern_content($pattern_name) {
    $pattern_file = get_template_directory() . '/patterns/' . $pattern_name . '.json';
    
    if (!file_exists($pattern_file)) {
        return '';
    }
    
    $pattern_data = file_get_contents($pattern_file);
    $pattern = json_decode($pattern_data, true);
    
    return isset($pattern['content']) ? $pattern['content'] : '';
}

/**
 * Render pattern by name
 *
 * @param string $pattern_name Pattern name
 * @param array $args Optional arguments
 */
function zenstarter_render_pattern($pattern_name, $args = array()) {
    $content = zenstarter_get_pattern_content($pattern_name);
    
    if (empty($content)) {
        return;
    }
    
    // Apply filters for customization
    $content = apply_filters('zenstarter_pattern_content', $content, $pattern_name, $args);
    $content = apply_filters('zenstarter_pattern_content_' . $pattern_name, $content, $args);
    
    echo $content;
}