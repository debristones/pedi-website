/**
 * Modern Topbar JavaScript
 * Handles mobile navigation, search functionality, and accessibility
 

class ModernTopbar {
  constructor() {
    this.mobileMenuToggle = document.getElementById('mobileMenuToggle') || document.getElementById('menuBtn');
    this.mobileSidebar = document.getElementById('sidebar');
    this.mobileSidebarClose = document.getElementById('closeBtn');
    this.overlay = document.getElementById('overlay');
    this.searchInput = document.getElementById('searchInput');
    this.cartCount = document.getElementById('cartCount');
    
    this.isMenuOpen = false;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.updateCartCount();
    this.handleKeyboardNavigation();
    this.initializeDropdowns();
  }
  
  bindEvents() {
    // Mobile menu toggle
    if (this.mobileMenuToggle) {
      this.mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
    }
    
    // Mobile sidebar close
    if (this.mobileSidebarClose) {
      this.mobileSidebarClose.addEventListener('click', () => this.closeMobileMenu());
    }
    
    // Overlay click to close menu
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.closeMobileMenu());
    }
    
    // Search form submission
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => this.handleSearch(e));
    }
    
    // Escape key to close menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    });
    
    // Prevent scroll when menu is open
    document.addEventListener('touchmove', (e) => {
      if (this.isMenuOpen && !this.mobileSidebar.contains(e.target)) {
        e.preventDefault();
      }
    }, { passive: false });
    
    // Handle window resize
    window.addEventListener('resize', () => this.handleResize());
  }
  
  toggleMobileMenu() {
    if (this.isMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }
  
  openMobileMenu() {
    this.isMenuOpen = true;
    
    // Update UI
    this.mobileMenuToggle.setAttribute('aria-expanded', 'true');
    this.mobileSidebar.classList.add('open');
    this.overlay.classList.add('show');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus management
    this.mobileSidebarClose.focus();
    
    // Trap focus within sidebar
    this.trapFocus(this.mobileSidebar);
  }
  
  closeMobileMenu() {
    this.isMenuOpen = false;
    
    // Update UI
    this.mobileMenuToggle.setAttribute('aria-expanded', 'false');
    this.mobileSidebar.classList.remove('open');
    this.overlay.classList.remove('show');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Return focus to toggle button
    this.mobileMenuToggle.focus();
  }
  
  handleSearch(e) {
    e.preventDefault();
    const query = this.searchInput.value.trim();
    
    if (!query) {
      this.searchInput.focus();
      return;
    }
    
    // Here you would typically handle the search
    // For now, we'll just log it
    console.log('Searching for:', query);
    
    // You could redirect to a search results page:
    // window.location.href = `/search?q=${encodeURIComponent(query)}`;
    
    // Or handle it with AJAX/fetch
    this.performSearch(query);
  }
  
  async performSearch(query) {
    try {
      // Show loading state
      const searchButton = document.querySelector('.search-button');
      const originalContent = searchButton.innerHTML;
      searchButton.innerHTML = '<div class="loading-spinner"></div>';
      searchButton.disabled = true;
      
      // Simulate API call (replace with your actual search endpoint)
      // const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      // const results = await response.json();
      
      // For demo purposes, just log and restore button
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Restore button
      searchButton.innerHTML = originalContent;
      searchButton.disabled = false;
      
      console.log('Search completed for:', query);
    } catch (error) {
      console.error('Search failed:', error);
      
      // Restore button on error
      const searchButton = document.querySelector('.search-button');
      searchButton.disabled = false;
    }
  }
  
  updateCartCount() {
    // Get cart count from localStorage or API
    const cartItems = this.getCartItems();
    const count = cartItems.length;
    
    if (this.cartCount) {
      this.cartCount.textContent = count;
      this.cartCount.style.display = count > 0 ? 'flex' : 'none';
    }
  }
  
  getCartItems() {
    // Get from localStorage or your state management solution
    try {
      return JSON.parse(localStorage.getItem('cartItems') || '[]');
    } catch {
      return [];
    }
  }
  
  handleKeyboardNavigation() {
    // Handle tab navigation within the topbar
    const focusableElements = this.getFocusableElements();
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' && this.isMenuOpen) {
        this.handleTabNavigation(e, focusableElements);
      }
    });
  }
  
  getFocusableElements() {
    const selectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];
    
    return Array.from(this.mobileSidebar.querySelectorAll(selectors.join(', ')));
  }
  
  handleTabNavigation(e, focusableElements) {
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }
  
  trapFocus(element) {
    const focusableElements = this.getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }
  
  handleResize() {
    // Close mobile menu on desktop
    if (window.innerWidth >= 768 && this.isMenuOpen) {
      this.closeMobileMenu();
    }
  }
  
  // Public method to update cart count (can be called from other scripts)
  setCartCount(count) {
    if (this.cartCount) {
      this.cartCount.textContent = count;
      this.cartCount.style.display = count > 0 ? 'flex' : 'none';
    }
  }
  
  // Public method to trigger search programmatically
  search(query) {
    if (this.searchInput) {
      this.searchInput.value = query;
      this.handleSearch(new Event('submit'));
    }
  }
  
  // Initialize dropdown functionality
  initializeDropdowns() {
    const dropdownButtons = document.querySelectorAll('.dropdown-btn');
    dropdownButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const dropdown = this.nextElementSibling;
        if (dropdown && dropdown.classList.contains('dropdown-container')) {
          dropdown.classList.toggle('show');
          
          // Update aria-expanded for accessibility
          const isExpanded = dropdown.classList.contains('show');
          this.setAttribute('aria-expanded', isExpanded);
          
          // Close other dropdowns
          dropdownButtons.forEach(otherBtn => {
            if (otherBtn !== this) {
              const otherDropdown = otherBtn.nextElementSibling;
              if (otherDropdown && otherDropdown.classList.contains('dropdown-container')) {
                otherDropdown.classList.remove('show');
                otherBtn.setAttribute('aria-expanded', 'false');
              }
            }
          });
        }
      });
      
      // Initialize aria-expanded attribute
      btn.setAttribute('aria-expanded', 'false');
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.modernTopbar = new ModernTopbar();
});

// Add loading spinner CSS
const loadingSpinnerCSS = `
  <style>
    .loading-spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top: 2px solid white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
`;

// Add spinner styles to head
document.head.insertAdjacentHTML('beforeend', loadingSpinnerCSS);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ModernTopbar;
}
*/