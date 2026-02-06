// ===================================
// Smooth Scroll for Navigation Links
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking
            const navMenu = document.getElementById('navMenu');
            const hamburger = document.getElementById('hamburger');
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// ===================================
// Mobile Menu Toggle
// ===================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===================================
// Navbar Scroll Effect
// ===================================

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===================================
// Intersection Observer for Fade-in Animation
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// ===================================
// BMI Calculator
// ===================================

const calculateBtn = document.getElementById('calculateBtn');
const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const bmiValue = document.getElementById('bmiValue');
const bmiCategory = document.getElementById('bmiCategory');

// Calculate BMI function
function calculateBMI() {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);
    
    // Validation
    if (!weight || !height || weight <= 0 || height <= 0) {
        alert('Please enter valid weight and height values');
        return;
    }
    
    // BMI formula: weight (kg) / (height (m))^2
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    // Display BMI value with 1 decimal place
    bmiValue.textContent = bmi.toFixed(1);
    
    // Remove all previous category classes
    bmiValue.className = 'bmi-value';
    bmiCategory.className = 'bmi-category';
    
    // Determine category and apply color
    let category = '';
    let categoryClass = '';
    
    if (bmi < 18.5) {
        category = 'Underweight';
        categoryClass = 'underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal Weight';
        categoryClass = 'normal';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        categoryClass = 'overweight';
    } else {
        category = 'Obese';
        categoryClass = 'obese';
    }
    
    // Apply category text and color class
    bmiCategory.textContent = category;
    bmiValue.classList.add(categoryClass);
    bmiCategory.classList.add(categoryClass);
    
    // Add fade-in animation to result
    bmiValue.style.animation = 'fadeInUp 0.6s ease';
    bmiCategory.style.animation = 'fadeInUp 0.6s ease 0.1s backwards';
}

// Event listeners for BMI calculator
calculateBtn.addEventListener('click', calculateBMI);

// Allow Enter key to calculate BMI
weightInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        calculateBMI();
    }
});

heightInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        calculateBMI();
    }
});

// ===================================
// Active Navigation Link on Scroll
// ===================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===================================
// Prevent Empty Form Submission
// ===================================

// This prevents accidental form submissions if any forms are added later
document.addEventListener('submit', (e) => {
    e.preventDefault();
});

// ===================================
// Performance: Debounce Scroll Events
// ===================================

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

// Apply debounce to scroll-heavy functions
const debouncedHighlight = debounce(highlightNavigation, 10);
window.addEventListener('scroll', debouncedHighlight);

// ===================================
// Page Load Animation
// ===================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Image Lazy Loading Error Handling
// ===================================

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        // If image fails to load, replace with a placeholder
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%232a2a2a"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%23666"%3EImage Not Available%3C/text%3E%3C/svg%3E';
    });
});

// ===================================
// Smooth Scroll to Top on Page Load
// ===================================

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// ===================================
// Console Welcome Message
// ===================================

console.log('%c Welcome to Love Fitness! ', 'background: #e74c3c; color: white; font-size: 20px; padding: 10px;');
console.log('%c Build Strength. Build Love. ', 'color: #e74c3c; font-size: 16px;');
