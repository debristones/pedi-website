// script.js
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const xbutton = document.getElementById('xbutton');
const closeBtn = document.getElementById('closeBtn');
  

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

// Dropdown toggle
  document.querySelectorAll(".dropdown-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      let dropdown = this.nextElementSibling;
      dropdown.classList.toggle("show");
});
});