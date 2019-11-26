/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
let sections = undefined;

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

/* https://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/31772470 
 */
function isInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;    
        left += el.offsetLeft;
    }

    return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
    );
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
function buildNav() {
    sections = document.querySelectorAll('main>section');
    const navFrag = document.createDocumentFragment();
    const navList = document.getElementById('navbar__list');

    sections.forEach((section) => {
        buildMenu(section, navFrag);
    });

    navList.appendChild(navFrag);
}



// Add class 'active' to section when near top of viewport

function initActive() {
    const firstLi = document.querySelector('#navbar__list li');
    firstLi.classList.toggle('menu_active');
}

// Scroll to anchor ID using scrollTO event

function addScrollListener() {
    document.addEventListener('scroll', function () {
        sections.forEach((section) => {
            const relativeLi = document.getElementById(section.dataset.nav);
            if (isInViewport(section)) {
                makeActive(relativeLi);
            } else {
                makeActive(relativeLi, false);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    buildNav();
    initActive();
    addScrollListener();
    wrapperATag();
});

/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 
function buildMenu(section, navFrag) {
    const a = document.createElement('a');
    a.href = '#a-' + section.id;
    const li = document.createElement('li');
    li.id = section.dataset.nav;
    li.innerHTML = section.dataset.nav;
    li.classList.add('menu__link');
    a.appendChild(li);
    navFrag.appendChild(a);
}

// Scroll to section on link click
function wrapperATag() {
    sections.forEach((section) => {
        const landingContainer = section.firstElementChild;
        const a = document.createElement('a');
        a.id = 'a-' + section.id;
        a.appendChild(landingContainer);
        section.appendChild(a);
    });
}

// Set sections as active
function makeActive(ele, active = true) {
    if (active) {
        ele.classList.add('menu_active');
    } else {
        ele.classList.remove('menu_active');
    }
}