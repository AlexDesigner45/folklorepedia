document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.querySelector('.fp-nav__toggle');
  var menu = document.querySelector('.fp-nav__menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function() {
      menu.classList.toggle('fp-nav__menu--open');
      toggle.setAttribute('aria-expanded',
        menu.classList.contains('fp-nav__menu--open'));
    });
  }
  // Highlight current page
  var path = window.location.pathname;
  var links = document.querySelectorAll('.fp-nav__link');
  links.forEach(function(link) {
    var href = link.getAttribute('href');
    if (href !== '/' && path.indexOf(href.replace('.html', '')) !== -1) {
      link.style.color = 'var(--fp-text)';
    }
  });
});
