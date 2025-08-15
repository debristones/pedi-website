// JavaScript for the account page

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize common functionality
  if (window.ecommerce) {
    window.ecommerce.initSidebar();
    window.ecommerce.initDropdowns();
  }
  
  // Account navigation
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
});