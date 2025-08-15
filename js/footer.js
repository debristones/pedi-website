// Footer JavaScript functionality

// Newsletter form submission
document.addEventListener('DOMContentLoaded', function() {
  // Handle newsletter form submission
  const newsletterForms = document.querySelectorAll('footer .contact-info form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;
      
      // Simple email validation
      if (email && email.includes('@')) {
        alert(`Thank you for subscribing with ${email}!`);
        emailInput.value = ''; // Clear the input
      } else {
        alert('Please enter a valid email address.');
      }
    });
  });
  
  // Social media link hover effects
  const socialLinks = document.querySelectorAll('.social-links a');
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
});