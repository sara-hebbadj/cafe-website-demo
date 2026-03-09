const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const parallaxItems = document.querySelectorAll('.parallax-item');
const parallax = () => {
  const y = window.scrollY;
  parallaxItems.forEach((item) => {
    if (item.classList.contains('hero')) {
      item.style.backgroundPositionY = `calc(50% + ${y * 0.1}px)`;
    } else {
      item.style.transform = `translate3d(0, ${y * 0.03}px, 0)`;
    }
  });
};

window.addEventListener('scroll', parallax, { passive: true });
