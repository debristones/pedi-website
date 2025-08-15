// JavaScript for the cart page

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize common functionality
  if (window.ecommerce) {
    window.ecommerce.initSidebar();
    window.ecommerce.initDropdowns();
  }
  
  // Initialize cart functionality
  initCart();
  
  // Button event handlers
  initButtons();
});

// Initialize cart functionality
function initCart() {
  // Remove item buttons
  const removeItemButtons = document.querySelectorAll('.remove-item');
  removeItemButtons.forEach(button => {
    button.addEventListener('click', function() {
      const cartItem = this.closest('.cart-item');
      if (cartItem) {
        const itemId = cartItem.dataset.id;
        if (window.ecommerce && window.ecommerce.removeFromCart) {
          window.ecommerce.removeFromCart(itemId);
        }
      } else {
        // For wishlist items
        const wishlistItem = this.closest('.wishlist-item');
        if (wishlistItem) {
          wishlistItem.remove();
        }
      }
    });
  });
  
  // Quantity change
  const quantitySelectors = document.querySelectorAll('.item-quantity select');
  quantitySelectors.forEach(select => {
    select.addEventListener('change', function() {
      const cartItem = this.closest('.cart-item');
      if (cartItem) {
        const itemId = cartItem.dataset.id;
        const newQuantity = parseInt(this.value);
        if (window.ecommerce && window.ecommerce.updateQuantity) {
          window.ecommerce.updateQuantity(itemId, newQuantity);
        }
      }
    });
  });
  
  // Move to cart buttons (wishlist)
  const moveToCartButtons = document.querySelectorAll('.wishlist-item .btn.primary');
  moveToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const wishlistItem = this.closest('.wishlist-item');
      const productName = wishlistItem.querySelector('h4').textContent;
      const productPrice = wishlistItem.querySelector('.item-price').textContent;
      
      // Add to cart
      if (window.ecommerce && window.ecommerce.addToCart) {
        window.ecommerce.addToCart({
          id: Date.now(),
          name: productName,
          price: productPrice,
          image: 'https://via.placeholder.com/150x150',
          quantity: 1
        });
      }
      
      // Remove from wishlist
      wishlistItem.remove();
      if (window.ecommerce && window.ecommerce.showNotification) {
        window.ecommerce.showNotification(`${productName} moved to cart!`);
      }
    });
  });
}

// Initialize button event handlers
function initButtons() {
  // Continue shopping button
  const continueShoppingBtn = document.getElementById('continue-shopping');
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', function() {
      window.location.href = 'index.html';
    });
  }
  
  // Checkout button
  const checkoutBtn = document.getElementById('checkout');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      window.location.href = 'checkout.html';
    });
  }
}