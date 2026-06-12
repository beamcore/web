const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const revealItems = document.querySelectorAll('[data-reveal]');
const anchorLinks = document.querySelectorAll('a[href^="#"]');
const sections = [...document.querySelectorAll('main section[id]')];

const setHeaderState = () => {
  header?.classList.toggle('shadow-[0_8px_30px_rgba(18,24,38,.08)]', window.scrollY > 8);
};

const closeMenu = () => {
  mobileMenu?.classList.add('hidden');
  mobileMenu?.classList.remove('flex');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open navigation');
};

const toggleMenu = () => {
  if (!menuButton || !mobileMenu) return;
  const isOpen = mobileMenu.classList.toggle('hidden') === false;
  mobileMenu.classList.toggle('flex', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
};

const updateActiveNavigation = () => {
  const offset = window.scrollY + 120;
  let current = sections[0]?.id;
  sections.forEach((section) => {
    if (section.offsetTop <= offset) current = section.id;
  });
  anchorLinks.forEach((link) => {
    link.classList.toggle('text-beam-violet', link.getAttribute('href') === `#${current}`);
  });
};

const copyCommand = async (button) => {
  const targetId = button?.dataset.copyTarget;
  const target = targetId ? document.getElementById(targetId) : null;
  const label = button?.querySelector('[data-copy-label]');
  if (!button || !target || !navigator.clipboard) return;

  try {
    await navigator.clipboard.writeText(target.innerText.trim());
    if (label) label.textContent = 'Copied';
    window.setTimeout(() => { if (label) label.textContent = 'Copy'; }, 1400);
  } catch {
    if (label) label.textContent = 'Unavailable';
  }
};

setHeaderState();
updateActiveNavigation();

window.addEventListener('scroll', () => {
  setHeaderState();
  updateActiveNavigation();
}, { passive: true });

menuButton?.addEventListener('click', toggleMenu);
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});
document.querySelectorAll('[data-copy-button]').forEach((button) => {
  button.addEventListener('click', () => copyCommand(button));
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
