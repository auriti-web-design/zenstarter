/**
 * Zen Hero Block - Frontend JavaScript
 * 
 * Handles animations, parallax effects, and interactive features
 * for the zen-hero block on the frontend
 *
 * @package Zenstarter
 * @subpackage Blocks
 * @version 1.0.0
 */

(function() {
    'use strict';
    
    /**
     * Initialize hero features when DOM is ready
     */
    function initializeZenHero() {
        const heroes = document.querySelectorAll('.zen-hero');
        
        if (heroes.length === 0) {
            return;
        }
        
        heroes.forEach(function(hero) {
            // Initialize animations
            if (hero.classList.contains('zen-hero--animated')) {
                initializeHeroAnimation(hero);
            }
            
            // Initialize parallax
            if (hero.classList.contains('zen-hero--parallax')) {
                initializeHeroParallax(hero);
            }
            
            // Initialize background image loading
            if (hero.classList.contains('zen-hero--has-background-image')) {
                initializeHeroBackground(hero);
            }
            
            // Initialize accessibility features
            initializeHeroAccessibility(hero);
        });
        
        console.log('✅ Zen Hero blocks initialized: ' + heroes.length);
    }
    
    /**
     * Initialize hero animation with Intersection Observer
     * 
     * @param {Element} hero Hero element
     */
    function initializeHeroAnimation(hero) {
        // Skip if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            hero.classList.add('zen-hero--in-view');
            return;
        }
        
        const animationType = hero.dataset.animation || 'fadeIn';
        const animationDuration = parseInt(hero.dataset.animationDuration) || 1000;
        
        // Set animation duration from data attribute
        hero.style.animationDuration = animationDuration + 'ms';
        
        // Create intersection observer
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('zen-hero--in-view');
                    
                    // Trigger custom event
                    const event = new CustomEvent('zenHeroAnimated', {
                        detail: {
                            hero: entry.target,
                            animationType: animationType,
                            duration: animationDuration
                        }
                    });
                    entry.target.dispatchEvent(event);
                    
                    // Unobserve after animation triggers
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        });
        
        observer.observe(hero);
    }
    
    /**
     * Initialize parallax effect with optimized performance
     * 
     * @param {Element} hero Hero element
     */
    function initializeHeroParallax(hero) {
        // Skip if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        const speed = parseFloat(hero.dataset.parallaxSpeed) || 0.5;
        let ticking = false;
        
        function updateParallax() {
            const rect = hero.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            const rate = scrolled * -speed;
            
            // Only apply parallax when hero is in viewport
            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                hero.style.transform = 'translateY(' + rate + 'px)';
            }
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        // Throttled scroll listener
        window.addEventListener('scroll', requestTick, { passive: true });
        window.addEventListener('resize', updateParallax);
        
        // Initial call
        updateParallax();
    }
    
    /**
     * Initialize background image loading with performance optimization
     * 
     * @param {Element} hero Hero element
     */
    function initializeHeroBackground(hero) {
        const backgroundImage = getComputedStyle(hero).backgroundImage;
        
        if (backgroundImage && backgroundImage !== 'none') {
            hero.classList.add('zen-hero--loading');
            
            const img = new Image();
            
            img.onload = function() {
                hero.classList.remove('zen-hero--loading');
                hero.classList.add('zen-hero--loaded');
                
                // Trigger custom event
                const event = new CustomEvent('zenHeroImageLoaded', {
                    detail: {
                        hero: hero,
                        imageUrl: img.src
                    }
                });
                hero.dispatchEvent(event);
            };
            
            img.onerror = function() {
                hero.classList.remove('zen-hero--loading');
                hero.classList.add('zen-hero--error');
                
                console.warn('Failed to load hero background image:', img.src);
            };
            
            // Extract URL from background-image CSS
            const imageUrl = backgroundImage.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
            
            // Add loading delay for better UX
            setTimeout(function() {
                img.src = imageUrl;
            }, 100);
        }
    }
    
    /**
     * Initialize accessibility features
     * 
     * @param {Element} hero Hero element
     */
    function initializeHeroAccessibility(hero) {
        // Add role and aria-label for screen readers
        if (!hero.getAttribute('role')) {
            hero.setAttribute('role', 'banner');
        }
        
        // Add landmark for better navigation
        if (!hero.getAttribute('aria-label')) {
            hero.setAttribute('aria-label', 'Hero section');
        }
        
        // Handle focus management for keyboard users
        const focusableElements = hero.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
            // Add skip link functionality
            const firstFocusable = focusableElements[0];
            
            hero.addEventListener('keydown', function(e) {
                // Allow users to skip hero content with Escape key
                if (e.key === 'Escape') {
                    const nextSection = hero.nextElementSibling;
                    if (nextSection) {
                        const nextFocusable = nextSection.querySelector(
                            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
                        );
                        if (nextFocusable) {
                            nextFocusable.focus();
                        }
                    }
                }
            });
        }
    }
    
    /**
     * Utility function to handle responsive breakpoints
     */
    function handleResponsiveFeatures() {
        const heroes = document.querySelectorAll('.zen-hero');
        
        heroes.forEach(function(hero) {
            // Disable parallax on mobile devices for better performance
            if (window.innerWidth < 768 && hero.classList.contains('zen-hero--parallax')) {
                hero.style.transform = 'none';
            }
            
            // Adjust animation timing for smaller screens
            if (window.innerWidth < 768 && hero.classList.contains('zen-hero--animated')) {
                const duration = parseInt(hero.dataset.animationDuration) || 1000;
                hero.style.animationDuration = Math.min(duration, 600) + 'ms';
            }
        });
    }
    
    /**
     * Performance monitoring
     */
    function monitorPerformance() {
        if ('performance' in window && 'observe' in window.PerformanceObserver.prototype) {
            const observer = new PerformanceObserver(function(list) {
                list.getEntries().forEach(function(entry) {
                    if (entry.name.includes('zen-hero') && entry.duration > 16.67) {
                        console.warn('Zen Hero performance warning:', entry.name, entry.duration + 'ms');
                    }
                });
            });
            
            observer.observe({ entryTypes: ['measure', 'navigation'] });
        }
    }
    
    /**
     * Cleanup function for when blocks are removed (SPA scenarios)
     */
    function cleanup() {
        // Remove event listeners to prevent memory leaks
        window.removeEventListener('scroll', requestTick);
        window.removeEventListener('resize', updateParallax);
        window.removeEventListener('resize', handleResponsiveFeatures);
    }
    
    /**
     * Public API
     */
    window.ZenHero = {
        init: initializeZenHero,
        cleanup: cleanup,
        version: '1.0.0'
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeZenHero);
    } else {
        initializeZenHero();
    }
    
    // Handle responsive features on resize
    window.addEventListener('resize', handleResponsiveFeatures);
    
    // Initialize performance monitoring in development
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('dev')) {
        monitorPerformance();
    }
    
    // Handle page visibility changes (pause animations when tab is hidden)
    document.addEventListener('visibilitychange', function() {
        const heroes = document.querySelectorAll('.zen-hero--animated');
        
        heroes.forEach(function(hero) {
            if (document.hidden) {
                hero.style.animationPlayState = 'paused';
            } else {
                hero.style.animationPlayState = 'running';
            }
        });
    });
    
})();