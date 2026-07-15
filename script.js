// check for saved theme,default to 'light' if none exists//
const savedTheme = localStorage.getItem('theme') || 'light';

//apply the saved theme to the document//

document.documentElement.setAttribute('date-theme', 'savedTheme');

function toggleTheme() {

    const currentTheme = document.documentElement.getAttribute('date-them');

/// switch the theme value//
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';


////update the DOM attribute///
    document.documentElement.setAttribute('date-theme', newTheme);

    
/// save the new preference to localStorage (the bonus)

function loadPreference() {
    const savedState = localStorage.getItem('userPreferences');
    if (savedState) {

        appSTate = JSON.parse(savedState);
        applyPreference();
    }
}


// listening attachment//
    document.getElementById('theme-toggle-btn').addEventListener('click', toggleTheme);
}

// Initialize all feautures once the DOM is fully loaded//
document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitcher();
    initMenuToggle();
    initFormValidation();
    initDynamicGreeting();
});


function initMenuToggle() {


const menuBtn = document.getElementById('hamburger-btn');
const navLinks= document.getElementById('nav-links');

menuBtn.addEventListener('click',() => {


    navLinks.classList.toggle('active');


    // for accssibility//
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
});


// close mene when a link id clicked//
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
    });
});
}
// Theme Stwitcher*/

function initThemeSwitcher() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;


    //check for savedbtheme preference in local storage//

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {

            localStorage.setItem('theme', 'dark');

        } else {
            
        localStorage.setItem('theme', 'light');
      
    }
    
    
    });

}


///Form Validation, prevent submission if fields are empty and display error messages//

function initFormValidation() {
    const form = document.querySelector('contact-form');
    if (!form) return;
    form.addEventListener('submit',(event) => {
        event.preventDefault(); // stop form from submitting

        let isValid = true;
        const inputs = [
            { id: 'name', message: 'Name is required.' },
            {id: 'email', message: 'Email is required.' },
            {id: 'Message', message: 'Message cannot be empty.'}

            
        ];

        inputs.forEach(inputObj => {
            const input = document.getElementById(inputObj.id);
            const errorSpan = document.getElementById(`${inputObj.id}-error`);
        });

        if (!inputElement || errorElement) return;

        if (inputElement.value.trim() === '') {

            errorElement.textContent = inputObj.message;

            errorElement.style.display = 'block';

            inputElement.classList.add('input-erroe');

            isValid = false;
        } else {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            inputElement.classList.remove('input-error');

        }
    });

    if (isValid) {  ///success handling ///

const successContainer = document.querySelector(' .form-success-message');

if (successContainer) {

    successContainer.textContent = 'Thank you!  Your message has been sent successfully.';

    successContainer.style.display = 'block';

    }
       form.reset();
}

        
}


////Dynamic greeting


function initDYnamicGreeting() {

    const greetingElement = document.querySelector(' .dynamic-greeting');

    if (!greetingElement) return;

    const currentHour= new Date().getHours();
    let greetingString = 'Hello';
    
    if (currentHour < 12) {
        greetingString = 'Good morning';

    } else if (currentHour < 18) {

        greetingString = 'Good afternoon';
    } 
    
    else {
     greetingString = 'Good evening';
    }

    greetingElement.textContent = '${greetString}, welcome to my portfolio!';
}