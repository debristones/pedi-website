// JavaScript for the products page

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize common functionality
  if (window.ecommerce) {
    window.ecommerce.initSidebar();
    window.ecommerce.initDropdowns();
  }
  
  // Product filtering
  initProductFiltering();
});

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
  if (window.ecommerce && window.ecommerce.showNotification) {
    window.ecommerce.showNotification('Products filtered!');
  }
  
  // In a real implementation, you would:
  // 1. Get selected filter values
  // 2. Filter product data based on those values
  // 3. Re-render the product grid with filtered results
}