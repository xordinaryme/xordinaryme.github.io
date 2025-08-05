/* Typing animation -------------------------------------------------------- */
const texts = [
    "UI/UX Designer",
    "Web Developer",
    "Frontend Engineer",
    "Problem Solver"
    "Automation Maniac",
    "Tech Enthusiast",
    "Creative Thinker",
    "Always Learning",
];
let textIndex = 0, charIndex = 0, isDeleting = false;
const typedTextElement = document.getElementById('typed-text');

function typeText() {
    const current = texts[textIndex];
    typedTextElement.textContent = isDeleting
        ? current.substring(0, charIndex - 1)
        : current.substring(0, charIndex + 1);

    isDeleting ? charIndex-- : charIndex++;

    let delay = isDeleting ? 80 : 120;
    if (!isDeleting && charIndex === current.length) delay = 3000;
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        delay = 500;
    }
    setTimeout(typeText, delay);
}

/* Smooth scroll ----------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

/* Scroll reveal ----------------------------------------------------------- */
const observer = new IntersectionObserver(entries => {
    entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
            target.style.opacity = 1;
            target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

/* Inject partials and start animations ------------------------------------ */
const includes = document.querySelectorAll('[data-include]');
Promise.all([...includes].map(loadSection)).then(() => {
    document.querySelectorAll('.stat-item, .skill-category').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all .6s ease';
        observer.observe(el);
    });
    typeText();
});

function loadSection(el) {
    return fetch(el.dataset.include)
        .then(r => r.text())
        .then(html => el.innerHTML = html);
}