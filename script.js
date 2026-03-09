const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
const header = document.querySelector('.site-header');
const progressBar = document.querySelector('.scroll-progress');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const updateScrollUI = () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? (scrollTop / height) * 100 : 0;

  if (progressBar) progressBar.style.width = `${progress}%`;
  if (header) header.classList.toggle('scrolled', scrollTop > 20);
};

window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    if (entry.target.classList.contains('reveal-stagger')) {
      const children = [...entry.target.children];
      children.forEach((item, index) => {
        item.style.transitionDelay = `${index * 90}ms`;
        item.classList.add('visible');
      });
    } else {
      entry.target.classList.add('visible');
    }

    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => observer.observe(el));

const parallaxItems = document.querySelectorAll('.parallax-item');

const handleParallax = () => {
  const y = window.scrollY;

  parallaxItems.forEach((item) => {
    if (item.classList.contains('hero')) {
      item.style.backgroundPositionY = `calc(50% + ${y * 0.1}px)`;
    } else {
      item.style.transform = `translate3d(0, ${y * 0.03}px, 0)`;
    }
  });
};

window.addEventListener('scroll', handleParallax, { passive: true });


// smooth scroll for same-page anchor links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (!id || id === '#') return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
