// ===================================
// HERO SLIDESHOW
// ===================================

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slideshowInterval = 4000; // 4 seconds
let autoPlayTimer;

// Function to show specific slide
function showSlide(index) {
    // Remove active class from all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Add active class to current slide
    slides[index].classList.add('active');
}

// Function to go to next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Function to go to previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Auto-play slideshow
function startSlideshow() {
    autoPlayTimer = setInterval(nextSlide, slideshowInterval);
}

// Reset auto-play
function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startSlideshow();
}

// Initialize slideshow on page load
document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
    startSlideshow();
    
    // Add event listeners for navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });
});


// ===================================
// HEADER SCROLL DETECTION
// ===================================

const header = document.getElementById('header');
const heroSection = document.querySelector('.hero');

// Function to handle scroll
function handleScroll() {
    // Get hero section height
    const heroHeight = heroSection.offsetHeight;
    const scrollPosition = window.scrollY;
    
    // Add 'scrolled' class when scrolled past hero section
    if (scrollPosition > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Listen for scroll events
window.addEventListener('scroll', handleScroll);


// ===================================
// MOBILE MENU TOGGLE
// ===================================

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-links a');

// Toggle mobile menu
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Add click event to hamburger
hamburger.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on a nav link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMobileMenu();
        }
        
        // Update active link
        navItems.forEach(link => link.classList.remove('active'));
        item.classList.add('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !hamburger.contains(e.target)) {
        toggleMobileMenu();
    }
});


// ===================================
// SMOOTH SCROLL WITH ACTIVE LINK UPDATE
// ===================================

// Update active link based on scroll position
function updateActiveLink() {
    const sections = document.querySelectorAll('.section, .hero');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Listen for scroll events to update active link
window.addEventListener('scroll', updateActiveLink);


// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function to limit scroll event frequency
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
const optimizedHandleScroll = debounce(handleScroll, 10);
const optimizedUpdateActiveLink = debounce(updateActiveLink, 10);

window.addEventListener('scroll', optimizedHandleScroll);
window.addEventListener('scroll', optimizedUpdateActiveLink);


// ===================================
// PAGE LOAD ANIMATIONS
// ===================================

window.addEventListener('load', () => {
    // Add fade-in animation to elements
    document.body.style.opacity = '1';
});


// ===================================
// PRODUCT SLIDESHOW
// ===================================

let currentProductStack = 0;
const productStacks = document.querySelectorAll('.product-stack');
const productDots = document.querySelectorAll('.product-dot');
const totalProductStacks = productStacks.length;

// Function to show specific product stack
function showProductStack(index) {
    // Remove active class from all stacks
    productStacks.forEach(stack => {
        stack.classList.remove('active');
    });
    
    // Remove active class from all dots
    productDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Add active class to current stack and dot
    if (productStacks[index]) {
        productStacks[index].classList.add('active');
    }
    if (productDots[index]) {
        productDots[index].classList.add('active');
    }
}

// Function to go to next product stack
function nextProductStack() {
    currentProductStack = (currentProductStack + 1) % totalProductStacks;
    showProductStack(currentProductStack);
}

// Function to go to previous product stack
function prevProductStack() {
    currentProductStack = (currentProductStack - 1 + totalProductStacks) % totalProductStacks;
    showProductStack(currentProductStack);
}

// Add click event to dots
productDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentProductStack = index;
        showProductStack(currentProductStack);
    });
});

// Add click event to arrow buttons
const productPrevBtn = document.getElementById('productPrevBtn');
const productNextBtn = document.getElementById('productNextBtn');

if (productPrevBtn) {
    productPrevBtn.addEventListener('click', prevProductStack);
}

if (productNextBtn) {
    productNextBtn.addEventListener('click', nextProductStack);
}

// Initialize product slideshow
if (productStacks.length > 0) {
    showProductStack(currentProductStack);
}


// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%cKaryemco Landing Page', 'color: #FF6B35; font-size: 24px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS & Vanilla JavaScript', 'color: #ffffff; font-size: 14px;');


// ===================================
// BACK TO TOP BUTTON
// ===================================

const backToTopBtn = document.getElementById('backToTop');

// Show/hide back to top button based on scroll position
function toggleBackToTopButton() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

// Scroll to top smoothly
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add event listeners
window.addEventListener('scroll', toggleBackToTopButton);
backToTopBtn.addEventListener('click', scrollToTop);

// Initial check on page load
toggleBackToTopButton();
