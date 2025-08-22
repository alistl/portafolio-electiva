// Animación de escritura
const typingElements = document.querySelectorAll('.typing-animation');
const words = ['Desarrolladora', 'Diseñadora', 'Creativa'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentWord = words[wordIndex];
  const currentChar = currentWord.substring(0, charIndex);

  typingElements.forEach(el => {
    el.textContent = currentChar;
    el.classList.add('cursor');
  });

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(type, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 50);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(type, 1000);
  }
}

// Contador animado
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-count');
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(animateCounters, 1);
    } else {
      counter.innerText = target;
    }
  });
}

// Efecto scroll para la navegación
function handleScroll() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
}

// Menu toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
  this.classList.toggle('active');
  document.querySelector('.nav-links').classList.toggle('active');
});

// Animación de barras de habilidades
const skillBars = document.querySelectorAll('.skill-bar');

const animateSkills = () => {
  skillBars.forEach(bar => {
    const level = bar.style.getPropertyValue('--level');
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = level;
    }, 100);
  });
};

// Toggle para voltear tarjetas de proyectos
document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de animaciones y eventos
  type();

  // Contadores
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll('.stat-card').forEach(card => {
    observer.observe(card);
  });

  // Scroll
  window.addEventListener('scroll', handleScroll);

  // Animación de habilidades
  const skillsSection = document.querySelector('.skills-matrix');
  if (skillsSection) {
    new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkills();
        }
      });
    }).observe(skillsSection);
  }

  // Inicializar partículas (opcional)
  if (typeof particlesJS !== 'undefined') {
    particlesJS.load('particles-js', 'assets/particles.Json', function() {
      console.log('Partículas cargadas');
    });
  }

  // Este es el único código para las tarjetas de proyectos
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });
});