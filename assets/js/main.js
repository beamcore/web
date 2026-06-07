const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const revealItems = document.querySelectorAll('[data-reveal]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
const sections = [...document.querySelectorAll('main section[id]')];

const setHeaderState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 8);
};

const closeMobileMenu = () => {
  if (!menuButton || !mobileMenu) return;
  mobileMenu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  menuButton.querySelector('.material-symbols-outlined').textContent = 'menu';
};

const toggleMobileMenu = () => {
  if (!menuButton || !mobileMenu) return;
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  mobileMenu.hidden = isOpen;
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  menuButton.querySelector('.material-symbols-outlined').textContent = isOpen ? 'menu' : 'close';
};

const updateActiveNavigation = () => {
  const offset = window.scrollY + 120;
  let current = sections[0]?.id;
  sections.forEach((section) => {
    if (section.offsetTop <= offset) current = section.id;
  });
  navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`));
};

const copyInstallCommand = async () => {
  const button = document.querySelector('[data-copy-button]');
  const targetId = button?.getAttribute('data-copy-target');
  const target = targetId ? document.getElementById(targetId) : null;
  const label = button?.querySelector('[data-copy-label]');
  if (!button || !target || !navigator.clipboard) return;

  try {
    await navigator.clipboard.writeText(target.innerText.replace(/^\$ /gm, ''));
    if (label) label.textContent = 'Copied';
    window.setTimeout(() => { if (label) label.textContent = 'Copy'; }, 1600);
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
menuButton?.addEventListener('click', toggleMobileMenu);
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMobileMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMobileMenu();
});
document.querySelector('[data-copy-button]')?.addEventListener('click', copyInstallCommand);

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

const architectureTabs = [...document.querySelectorAll('[data-architecture-tab]')];
const architecturePanels = [...document.querySelectorAll('[data-architecture-panel]')];
const architectureCaption = document.querySelector('[data-architecture-caption]');
const architectureExpand = document.querySelector('[data-architecture-expand]');
const diagramDialog = document.querySelector('[data-diagram-dialog]');
const diagramDialogImage = document.querySelector('[data-diagram-dialog-image]');
const diagramDialogTitle = document.querySelector('[data-diagram-dialog-title]');
const diagramDialogClose = document.querySelector('[data-diagram-close]');

const architectureDiagrams = {
  parallel: {
    title: 'Parallel agent topology',
    src: './assets/diagrams/coding-harness.png',
    alt: 'Distributed Beamcore network with two coding agents, a central enterprise ledger, and memory services'
  },
  runtime: {
    title: 'Provider-neutral runtime routing',
    src: './assets/diagrams/provider-runtime.png',
    alt: 'Beamcore TUI routing F1 Dev, F2 Chat, and F3 Research through provider selection, guarded tools, and OTP services'
  }
};

let activeArchitectureDiagram = 'parallel';

const selectArchitectureDiagram = (name, focusTab = false) => {
  if (!architectureDiagrams[name]) return;
  activeArchitectureDiagram = name;

  architectureTabs.forEach((tab) => {
    const isActive = tab.dataset.architectureTab === name;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
    if (isActive && focusTab) tab.focus();
  });

  architecturePanels.forEach((panel) => {
    const isActive = panel.dataset.architecturePanel === name;
    panel.classList.toggle('is-active', isActive);
    panel.hidden = !isActive;
  });

  if (architectureCaption) architectureCaption.textContent = architectureDiagrams[name].title;
};

architectureTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectArchitectureDiagram(tab.dataset.architectureTab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = architectureTabs.length - 1;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + architectureTabs.length) % architectureTabs.length;
    else nextIndex = (index + 1) % architectureTabs.length;
    selectArchitectureDiagram(architectureTabs[nextIndex].dataset.architectureTab, true);
  });
});

architectureExpand?.addEventListener('click', () => {
  const diagram = architectureDiagrams[activeArchitectureDiagram];
  if (!diagram || !diagramDialog || !diagramDialogImage) return;
  diagramDialogImage.src = diagram.src;
  diagramDialogImage.alt = diagram.alt;
  if (diagramDialogTitle) diagramDialogTitle.textContent = diagram.title;
  if (typeof diagramDialog.showModal === 'function') diagramDialog.showModal();
});

diagramDialogClose?.addEventListener('click', () => diagramDialog?.close());
diagramDialog?.addEventListener('click', (event) => {
  if (event.target === diagramDialog) diagramDialog.close();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && diagramDialog?.open) diagramDialog.close();
});

selectArchitectureDiagram(activeArchitectureDiagram);
