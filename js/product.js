// JavaScript for the product detail page

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize common functionality
  if (window.ecommerce) {
    window.ecommerce.initSidebar();
    window.ecommerce.initDropdowns();
  }
  
  // Tab functionality
  initTabs();
  
  // Product options
  initProductOptions();
  
  // Add to cart button
  const addToCartBtn = document.getElementById('add-to-cart');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get product information
      const productName = document.querySelector('h1').textContent;
      const productPrice = document.querySelector('.current-price').textContent;
      const productImage = document.querySelector('.main-image img').src;
      
      // Add to cart
      if (window.ecommerce && window.ecommerce.addToCart) {
        window.ecommerce.addToCart({
          id: Date.now(), // Simple ID generation
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1
        });
      }
    });
  }
});

// Tab functionality for product detail page
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and panes
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Show corresponding pane
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

// Color and storage selection for product detail page
function initProductOptions() {
  const colorOptions = document.querySelectorAll('.color-option');
  colorOptions.forEach(option => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
    });
  });
  
  const storageOptions = document.querySelectorAll('.storage-option');
  storageOptions.forEach(option => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.storage-option').forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
    });
  });
}