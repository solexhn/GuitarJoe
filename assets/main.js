document.addEventListener('DOMContentLoaded', function() {
  // Load header
  const headerElement = document.getElementById('site-header');
  if (headerElement) {
    fetch('components/header.html')
      .then(response => response.text())
      .then(data => {
        headerElement.innerHTML = data;
        markActiveNavLink();
        initializeDarkModeToggle();
      });
  }
  // Load footer
  const footerElement = document.getElementById('site-footer');
  if (footerElement) {
    fetch('components/footer.html')
      .then(response => response.text())
      .then(data => {
        footerElement.innerHTML = data;
        updateYear();
      });
  }
  function markActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('#navbarNav .nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
      const linkHref = link.getAttribute('href');
      if (linkHref === currentPage) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }
  function updateYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }
  initializeComponents();
});
function initializeDarkModeToggle() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      darkModeToggle.setAttribute('aria-pressed', 'true');
    }
    darkModeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      darkModeToggle.setAttribute('aria-pressed', isDark);
      localStorage.setItem('darkMode', isDark);
    });
  }
}
function initializeComponents() {
  // Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  // Bootstrap dropdowns
  const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
  dropdownElementList.map(function (dropdownToggleEl) {
    return new bootstrap.Dropdown(dropdownToggleEl);
  });
} 