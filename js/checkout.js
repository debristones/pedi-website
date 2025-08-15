// JavaScript for the checkout page

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize common functionality
  if (window.ecommerce) {
    window.ecommerce.initSidebar();
    window.ecommerce.initDropdowns();
  }
  
  // Initialize button event handlers
  initButtons();
});

// Initialize button event handlers
function initButtons() {
  // Back to cart button
  const backToCartBtn = document.getElementById('back-to-cart');
  if (backToCartBtn) {
    backToCartBtn.addEventListener('click', function() {
      window.location.href = 'cart.html';
    });
  }
  
  // Place order button
  const placeOrderBtn = document.getElementById('place-order');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', function() {
      // In a real application, this would process the order
      if (window.ecommerce && window.ecommerce.showNotification) {
        window.ecommerce.showNotification('Order placed successfully!');
      }
      
      // Clear cart
      if (window.ecommerce) {
        window.ecommerce.cart = [];
        window.ecommerce.updateCartCount();
        window.ecommerce.saveCart();
      }
      
      // Redirect to order confirmation
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    });
  }
}