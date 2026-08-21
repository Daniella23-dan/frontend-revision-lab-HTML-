document.addEventListener('DOMContentLoaded', () => {
    initMenuToggle();
    initThemeSwitcher();
    initDynamicGreeting();
    initFormValidation();
});

/* --- MENU TOGGLE --- */
function initMenuToggle() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const overlay = document.getElementById('menu-overlay');
    if (!hamburger || !navLinks) return;

    const closeMenu = () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    };

    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    if (overlay) overlay.addEventListener('click', closeMenu);

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/* --- THEME SWITCHER --- */
function initThemeSwitcher() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (!themeToggleBtn) return;

    const updateButtonText = (isDark) => {
        themeToggleBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    };

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        updateButtonText(true);
    } else {
        updateButtonText(false);
    }

    themeToggleBtn.addEventListener('click', () => {
        const isDarkActive = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkActive ? 'dark' : 'light');
        updateButtonText(isDarkActive);
    });
}

/* --- DYNAMIC GREETING --- */
function initDynamicGreeting() {
    const greetingElement = document.getElementById('dynamic-greeting');
    if (!greetingElement) return;

    const currentHour = new Date().getHours();
    let greeting = 'Hello';

    if (currentHour >= 5 && currentHour < 12) {
        greeting = 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }

    greetingElement.textContent = `${greeting}, welcome to my portfolio!`;
}

/* --- FORM VALIDATION --- */
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let isValid = true;
        const fields = [
            { id: 'name', message: 'Name is required.' },
            { id: 'email', message: 'Email is required.' },
            { id: 'Message', message: 'Message cannot be empty.' }
        ];

        fields.forEach(field => {
            const input = document.getElementById(field.id);
            const errorSpan = document.getElementById(`${field.id}-error`);
            if (!input || !errorSpan) return;

            if (input.value.trim() === '') {
                errorSpan.textContent = field.message;
                errorSpan.style.display = 'block';
                input.classList.add('input-error');
                isValid = false;
            } else {
                errorSpan.textContent = '';
                errorSpan.style.display = 'none';
                input.classList.remove('input-error');
            }
        });

        if (isValid) {
            const successContainer = document.querySelector('.form-success-message');
            if (successContainer) {
                successContainer.textContent = 'Thank you! Your message has been sent successfully.';
                successContainer.style.display = 'block';
            }
            form.reset();
        }
    });
}