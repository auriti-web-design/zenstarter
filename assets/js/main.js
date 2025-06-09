/**
 * Main JavaScript Entry Point
 * Zenstarter Theme
 */

// Import styles (Vite will process these)
import '../scss/main.scss'

// Theme initialization
document.addEventListener('DOMContentLoaded', function() {
  console.log('Zenstarter theme loaded successfully!')
  
  // Initialize theme components
  initMobileMenu()
  initSkipLinks()
  initLazyLoading()
  initAccessibility()
})

/**
 * Mobile menu functionality
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle')
  const navigation = document.querySelector('.main-navigation')
  
  if (menuToggle && navigation) {
    menuToggle.addEventListener('click', function() {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true'
      
      menuToggle.setAttribute('aria-expanded', !isExpanded)
      navigation.classList.toggle('is-open')
      
      // Trap focus in mobile menu
      if (!isExpanded) {
        navigation.querySelector('a')?.focus()
      }
    })
    
    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navigation.classList.contains('is-open')) {
        menuToggle.setAttribute('aria-expanded', 'false')
        navigation.classList.remove('is-open')
        menuToggle.focus()
      }
    })
  }
}

/**
 * Skip links functionality
 */
function initSkipLinks() {
  const skipLinks = document.querySelectorAll('.skip-link')
  
  skipLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'))
      
      if (target) {
        e.preventDefault()
        target.focus()
        target.scrollIntoView({ behavior: 'smooth' })
      }
    })
  })
}

/**
 * Lazy loading for images
 */
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove('lazy')
          imageObserver.unobserve(img)
        }
      })
    })
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img)
    })
  }
}

/**
 * Accessibility enhancements
 */
function initAccessibility() {
  // Add focus outline for keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('using-keyboard')
    }
  })
  
  document.addEventListener('mousedown', function() {
    document.body.classList.remove('using-keyboard')
  })
  
  // Announce dynamic content changes to screen readers
  const announceToScreenReader = (message) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.classList.add('screen-reader-text')
    announcement.textContent = message
    
    document.body.appendChild(announcement)
    
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }
  
  // Example usage for AJAX content updates
  window.announceToScreenReader = announceToScreenReader
}