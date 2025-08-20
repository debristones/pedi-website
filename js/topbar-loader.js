/**
 * Topbar Loader Utility
 * Dynamically loads the modern topbar into any page
 */

class TopbarLoader {
  constructor(options = {}) {
    this.options = {
      insertAfter: 'body',
      topbarUrl: 'topbar.html',
      ...options
    };
    
    this.init();
  }
  
  async init() {
    try {
      await this.loadTopbar();
      await this.loadCSS();
      this.initializeTopbar();
    } catch (error) {
      console.error('Failed to load topbar:', error);
    }
  }
  
  async loadTopbar() {
    try {
      const response = await fetch(this.options.topbarUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const html = await response.text();
      
      // Insert topbar at the beginning of body
      const insertPoint = document.querySelector(this.options.insertAfter);
      if (insertPoint) {
        insertPoint.insertAdjacentHTML('afterbegin', html);
      } else {
        document.body.insertAdjacentHTML('afterbegin', html);
      }
      
    } catch (error) {
      console.error('Error loading topbar HTML:', error);
      this.createFallbackTopbar();
    }
  }
  
  async loadCSS() {
    // Check if topbar CSS is already loaded
    const existingLink = document.querySelector('link[href*="topbar.css"]');
    if (existingLink) {
      return; // CSS already loaded
    }
    
    // Create and append CSS link
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/topbar.css';
    link.onload = () => {
      console.log('Topbar CSS loaded successfully');
    };
    link.onerror = () => {
      console.warn('Failed to load topbar CSS');
    };
    
    document.head.appendChild(link);
  }
  
  createFallbackTopbar() {
    // Simple fallback topbar if the main one fails to load
    const fallbackHTML = `
      <div class="overlay" id="overlay"></div>
      <header class="topbar-fallback" style="background: #2563eb; color: white; padding: 1rem;">
        <nav style="display: flex; align-items: center; justify-content: space-between; max-width: 1200px; margin: 0 auto;">
          <div class="brand">
            <a href="index.html" style="color: white; text-decoration: none; font-weight: bold; font-size: 1.5rem;">
              KILO PEDI
            </a>
          </div>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <a href="account.html" style="color: white; text-decoration: none;">Account</a>
            <a href="cart.html" style="color: white; text-decoration: none;">Cart</a>
          </div>
        </nav>
      </header>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', fallbackHTML);
  }
  
  initializeTopbar() {
    // Wait for DOM to be ready, then initialize the topbar functionality
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.ensureTopbarJS();
      });
    } else {
      this.ensureTopbarJS();
    }
  }
  
  ensureTopbarJS() {
    // Check if ModernTopbar class is available
    if (typeof ModernTopbar === 'undefined') {
      // Load topbar.js if not already loaded
      const script = document.createElement('script');
      script.src = 'js/topbar.js';
      script.onload = () => {
        console.log('Topbar JS loaded successfully');
      };
      script.onerror = () => {
        console.warn('Failed to load topbar JS');
      };
      document.head.appendChild(script);
    }
  }
  
  // Public method to update cart count across all pages
  static updateCartCount(count) {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
      cartCountElement.textContent = count;
      cartCountElement.style.display = count > 0 ? 'flex' : 'none';
    }
  }
  
  // Public method to set user info
  static setUserInfo(user) {
    const profileGreeting = document.querySelector('.profile-greeting');
    const navLabels = document.querySelectorAll('.nav-label');
    
    if (user && user.name) {
      if (profileGreeting) {
        profileGreeting.textContent = `Hello, ${user.name}`;
      }
      navLabels.forEach(label => {
        if (label.textContent.includes('Hello')) {
          label.textContent = `Hello, ${user.name}`;
        }
      });
    }
  }
  
  // Public method to set location
  static setLocation(location) {
    const locationValue = document.querySelector('.location-value');
    if (locationValue && location) {
      locationValue.textContent = location;
    }
  }
}

// Initialize topbar loader when script loads
if (typeof window !== 'undefined') {
  window.topbarLoader = new TopbarLoader();
  
  // Expose utility methods globally
  window.updateCartCount = TopbarLoader.updateCartCount;
  window.setUserInfo = TopbarLoader.setUserInfo;
  window.setLocation = TopbarLoader.setLocation;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TopbarLoader;
}
