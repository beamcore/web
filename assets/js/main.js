const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const revealItems = document.querySelectorAll('[data-reveal]');

const setHeaderState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 8);
};

const closeMobileMenu = () => {
  if (!menuButton || !mobileMenu) return;

  mobileMenu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('.material-symbols-outlined').textContent = 'menu';
};

const toggleMobileMenu = () => {
  if (!menuButton || !mobileMenu) return;

  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  mobileMenu.hidden = isOpen;
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.querySelector('.material-symbols-outlined').textContent = isOpen ? 'menu' : 'close';
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });
menuButton?.addEventListener('click', toggleMobileMenu);
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMobileMenu));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
