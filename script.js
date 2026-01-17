// =========================
// ===== DOM Elements =====
// =========================
const darkModeIcon = document.getElementById('darkMode-icon');
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');
const preloader = document.querySelector('.preloader');
const header = document.querySelector('.header');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const formStatus = document.querySelector('.form-status');
const fab = document.querySelector('.fab');
const backToTop = document.querySelector('.back-to-top');
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-box');
const progressBars = document.querySelectorAll('.progress-bar');
const statsNumbers = document.querySelectorAll('.stat-number');

// =========================
// ===== Dark/Light Mode =====
// =========================
darkModeIcon.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  darkModeIcon.classList.toggle('bx-sun');
  darkModeIcon.classList.toggle('bx-moon');

  localStorage.setItem('lightMode', document.body.classList.contains('light-mode'));
});

// Load saved preference
if (localStorage.getItem('lightMode') === 'true') {
  document.body.classList.add('light-mode');
  darkModeIcon.classList.add('bx-sun');
  darkModeIcon.classList.remove('bx-moon');
}

// =========================
// ===== Mobile Menu =====
// =========================
menuIcon.addEventListener('click', () => {
  navbar.classList.toggle('active');
  menuIcon.classList.toggle('bx-x');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('active');
    menuIcon.classList.remove('bx-x');
  });
});

// =========================
// ===== Preloader =====
// =========================
window.addEventListener('load', () => {
  setTimeout(() => {
    preloader.classList.add('loaded');
    document.body.style.overflow = 'auto';
  }, 1500);
});

// =========================
// ===== Sticky Header =====
// =========================
window.addEventListener('scroll', () => {
  header.classList.toggle('sticky', window.scrollY > 100);
});

// =========================
// ===== Active Section Highlight =====
// =========================
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 160;

  sections.forEach(section => {
    const offsetTop = section.offsetTop;
    const offsetHeight = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href*="${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
});

// =========================
// ===== Scroll Reveal =====
// =========================
ScrollReveal({ reset: false, distance: '80px', duration: 1500, delay: 200 });
ScrollReveal().reveal('.home-content, .section-header', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-container, .testimonial-box, .contact-container', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// =========================
// ===== Typing Animation =====
// =========================
new Typed('.typing-text', {
  strings: ['Software Developer', 'Android Specialist', '3D Animator', 'Java Expert', 'Web Developer'],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true,
  showCursor: true,
  cursorChar: '|'
});

// =========================
// ===== Progress Bars =====
// =========================
function animateProgressBars() {
  progressBars.forEach(bar => {
    const percent = bar.getAttribute('data-percent');
    const fill = bar.querySelector('.progress-fill');
    fill.style.width = `${percent}%`;
  });
}

const aboutSection = document.querySelector('.about');
const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateProgressBars();
      aboutObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

if (aboutSection) aboutObserver.observe(aboutSection);

// =========================
// ===== Stats Counter =====
// =========================
function animateStats() {
  statsNumbers.forEach(stat => {
    const target = +stat.getAttribute('data-count');
    const current = +stat.innerText;
    const increment = target / 100;

    if (current < target) {
      stat.innerText = Math.ceil(current + increment);
      setTimeout(animateStats, 20);
    } else {
      stat.innerText = target;
    }
  });
}

const homeSection = document.querySelector('.home');
const homeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
      homeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (homeSection) homeObserver.observe(homeSection);

// =========================
// ===== Portfolio Filter =====
// =========================
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filterValue = button.getAttribute('data-filter');
    portfolioItems.forEach(item => {
      item.style.display = (filterValue === 'all' || item.getAttribute('data-category') === filterValue) ? 'block' : 'none';
    });
  });
});

// =========================
// ===== Testimonial Swiper =====
// =========================
new Swiper('.mySwiper', {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  grabCursor: true,
  speed: 600,
  autoplay: { delay: 5000, disableOnInteraction: false },
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
});

// =========================
// ===== Contact Form =====
// =========================
if (contactForm) {
  emailjs.init('IZzktErZbrY6t2Ews'); // Your EmailJS User ID

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    data.time = new Date().toLocaleString();

    formStatus.textContent = 'Sending message...';
    formStatus.style.color = '#64ffda';

    emailjs.send('service_kumq1si', 'template_t1fs7ow', data)
      .then(() => {
        formStatus.textContent = 'Message sent successfully!';
        formStatus.style.color = '#64ffda';
        contactForm.reset();
        setTimeout(() => formStatus.textContent = '', 3000);
      })
      .catch((error) => {
        formStatus.textContent = 'Failed to send message. Please try again.';
        formStatus.style.color = '#ff5555';
        console.error('EmailJS Error:', error);
      });
  });
}

// =========================
// ===== Floating Action Button =====
// =========================
window.addEventListener('scroll', () => {
  if (fab) fab.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// =========================
// ===== Back to Top Button =====
// =========================
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// =========================
// ===== Current Year =====
// =========================
const yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

// =========================
// ===== Tooltips =====
// =========================
const tooltips = document.querySelectorAll('.tooltip');
tooltips.forEach(tip => {
  tip.addEventListener('mouseenter', () => {
    const text = tip.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip-text';
    tooltip.textContent = text;
    tip.appendChild(tooltip);

    const rect = tip.getBoundingClientRect();
    tooltip.style.left = `${rect.width / 2}px`;

    setTimeout(() => {
      if (tip.contains(tooltip)) tip.removeChild(tooltip);
    }, 2000);
  });
});

// =========================
// ===== Portfolio Animation on Scroll =====
// =========================
const portfolioObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      portfolioObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

portfolioItems.forEach(item => {
  item.style.opacity = 0;
  item.style.transform = 'translateY(50px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  portfolioObserver.observe(item);
});
