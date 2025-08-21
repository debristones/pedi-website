// Common JavaScript utilities for the e-commerce website

// DOM Elements
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');

// Cart Elements
const cartCount = document.querySelector('.cart-count');
export let cart = [];


// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  // Initialize cart from localStorage if available
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    updateCartCount();
  }
});

// Initialize sidebar functionality
function initSidebar() {
  if (menuBtn && sidebar && overlay && closeBtn) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      menuBtn.classList.toggle('move');
      overlay.classList.toggle('show');
    });

    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      menuBtn.classList.remove('move');
      overlay.classList.remove('show');
    });

    closeBtn.addEventListener('click', () => {
      sidebar.classList.remove('open');
      menuBtn.classList.remove('move');
      overlay.classList.remove('show');
    });
  }
}

// Initialize dropdown functionality
function initDropdowns() {
  document.querySelectorAll(".dropdown-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      let dropdown = this.nextElementSibling;
      dropdown.classList.toggle("show");
    });
  });
}

// Cart functions
function addToCart(product) {
  // Check if product already exists in cart
  const existingItem = cart.find(item => item.name === product.name);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(product);
  }
  
  updateCartCount();
  saveCart();
  
  // Show confirmation message
  showNotification(`${product.name} added to cart!`);
}

function removeFromCart(itemId) {
  cart = cart.filter(item => item.id != itemId);
  updateCartCount();
  saveCart();
  
  
  // Remove item from DOM
  const cartItem = document.querySelector(`.cart-item[data-id="${itemId}"]`);
  if (cartItem) {
    cartItem.remove();
  }
  
  showNotification('Item removed from cart');
}

function updateQuantity(itemId, newQuantity) {
  const item = cart.find(item => item.id == itemId);
  if (item) {
    item.quantity = newQuantity;
    saveCart();
    showNotification('Quantity updated');
  }
}

function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  if (cartCount) {
    cartCount.textContent = totalItems;
  }
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Utility functions
function showNotification(message) {
  // Remove any existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  // Style the notification
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.right = '20px';
  notification.style.backgroundColor = '#4CAF50';
  notification.style.color = 'white';
  notification.style.padding = '16px';
  notification.style.borderRadius = '4px';
  notification.style.zIndex = '1000';
  notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
  notification.style.transition = 'opacity 0.3s';
  
  // Add to document
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

function clearCart() {
  cart = [];
  localStorage.removeItem('cart');
  const cartItems = document.querySelectorAll('.cart-item');
  cartItems.forEach(item => item.remove());
  updateCartCount();
  saveCart();
  showNotification('Cart cleared');
  console.log(cart);
}

// Export functions for use in other modules
window.ecommerce = {
  initSidebar,
  initDropdowns,
  addToCart,
  removeFromCart,
  updateQuantity,
  updateCartCount,
  saveCart,
  showNotification,
  clearCart
};

