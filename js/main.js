// Main JavaScript file for the e-commerce website

// DOM Elements
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');

// Cart Elements
const cartCount = document.querySelector('.cart-count');
let cart = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  // Initialize cart from localStorage if available
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    updateCartCount();
  }
  
  // Initialize all functionality
  initSidebar();
  initDropdowns();
  initCart();
  initProductFiltering();
  initTabs();
  initProductOptions();
  initAccountNavigation();
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

// Initialize cart functionality
function initCart() {
  // Add to cart buttons
  const addToCartButtons = document.querySelectorAll('#add-to-cart, .btn.primary:not(.secondary)');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get product information
      const productElement = this.closest('.card, .product-detail, .cart-item, .wishlist-item');
      let productName, productPrice, productImage;
      
      if (productElement) {
        if (productElement.classList.contains('card')) {
          productName = productElement.querySelector('h3').textContent;
          productPrice = productElement.querySelector('.price').textContent;
          productImage = productElement.querySelector('.media').textContent;
        } else if (productElement.classList.contains('product-detail')) {
          productName = productElement.querySelector('h1').textContent;
          productPrice = productElement.querySelector('.current-price').textContent;
          productImage = productElement.querySelector('.main-image img').src;
        } else if (productElement.classList.contains('wishlist-item')) {
          productName = productElement.querySelector('h4').textContent;
          productPrice = productElement.querySelector('.item-price').textContent;
          productImage = productElement.querySelector('.item-image img').src;
        }
      }
      
      // Add to cart
      addToCart({
        id: Date.now(), // Simple ID generation
        name: productName || 'Product',
        price: productPrice || '$0.00',
        image: productImage || 'https://via.placeholder.com/150x150',
        quantity: 1
      });
    });
  });
  
  // Remove item buttons
  const removeItemButtons = document.querySelectorAll('.remove-item');
  removeItemButtons.forEach(button => {
    button.addEventListener('click', function() {
      const cartItem = this.closest('.cart-item');
      if (cartItem) {
        const itemId = cartItem.dataset.id;
        removeFromCart(itemId);
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
        updateQuantity(itemId, newQuantity);
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
      addToCart({
        id: Date.now(),
        name: productName,
        price: productPrice,
        image: 'https://via.placeholder.com/150x150',
        quantity: 1
      });
      
      // Remove from wishlist
      wishlistItem.remove();
      showNotification(`${productName} moved to cart!`);
    });
  });
}

// Initialize product filtering
function initProductFiltering() {
  // Price slider
  const priceSlider = document.getElementById('price-slider');
  const priceValue = document.getElementById('price-value');
  
  if (priceSlider && priceValue) {
    priceSlider.addEventListener('input', function() {
      priceValue.textContent = '$' + this.value;
      filterProducts();
    });
  }
  
  // Category checkboxes
  const categoryCheckboxes = document.querySelectorAll('input[type="checkbox"][id*="smartphones"], input[type="checkbox"][id*="laptops"], input[type="checkbox"][id*="tablets"], input[type="checkbox"][id*="accessories"]');
  categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterProducts);
  });
  
  // Brand checkboxes
  const brandCheckboxes = document.querySelectorAll('input[type="checkbox"][id*="apple"], input[type="checkbox"][id*="samsung"], input[type="checkbox"][id*="sony"], input[type="checkbox"][id*="lg"]');
  brandCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterProducts);
  });
  
  // Rating checkboxes
  const ratingCheckboxes = document.querySelectorAll('input[type="checkbox"][id*="four-plus"], input[type="checkbox"][id*="three-plus"], input[type="checkbox"][id*="two-plus"]');
  ratingCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterProducts);
  });
  
  // Clear filters button
  const clearFiltersBtn = document.getElementById('clear-filters');
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', function() {
      // Reset all filters
      document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
      });
      
      if (priceSlider) {
        priceSlider.value = 500;
        if (priceValue) priceValue.textContent = '$500';
      }
      
      filterProducts();
    });
  }
  
  // Sort select
  const sortSelect = document.getElementById('sort');
  if (sortSelect) {
    sortSelect.addEventListener('change', filterProducts);
  }
}

// Product filtering function
function filterProducts() {
  // In a real application, this would filter actual product data
  // For this demo, we'll just show a notification
  showNotification('Products filtered!');
  
  // In a real implementation, you would:
  // 1. Get selected filter values
  // 2. Filter product data based on those values
  // 3. Re-render the product grid with filtered results
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

// Account navigation
function initAccountNavigation() {
  const accountNavLinks = document.querySelectorAll('.account-nav a');
  accountNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all nav items and sections
      document.querySelectorAll('.account-nav li').forEach(li => li.classList.remove('active'));
      document.querySelectorAll('.account-section').forEach(section => section.classList.remove('active'));
      
      // Add active class to clicked nav item
      link.parentElement.classList.add('active');
      
      // Show corresponding section
      const sectionId = link.getAttribute('href').substring(1);
      document.getElementById(sectionId).classList.add('active');
    });
  });
}

// Additional functionality for buttons
document.addEventListener('DOMContentLoaded', function() {
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
      showNotification('Order placed successfully!');
      
      // Clear cart
      cart = [];
      updateCartCount();
      saveCart();
      
      // Redirect to order confirmation
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    });
  }
});