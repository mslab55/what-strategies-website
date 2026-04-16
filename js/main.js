// === WHAT STRATEGIES — main.js ===

// Nav: compact on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav on any link click
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Scroll reveal via IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Staggered reveal for service and team cards
document.querySelectorAll('.service-card, .team-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 80}ms`;
  card.classList.add('reveal');
  observer.observe(card);
});

// Contact form — front-end feedback only
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const original = btn.textContent;

  btn.textContent = 'MESSAGE SENT ✓';
  btn.disabled = true;
  btn.style.borderColor = '#00AA44';
  btn.style.color = '#00AA44';

  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
    btn.style.borderColor = '';
    btn.style.color = '';
    contactForm.reset();
  }, 3000);
});
