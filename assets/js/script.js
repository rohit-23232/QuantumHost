// your code goes here
/**
 * QUANTUMHOST PREMIUM EXCLUSIVE PRODUCTION ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initCounters();
    initAccordions();
    initScrollTop();
    initFormValidations();
});

/* Navigation Engine */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }

        // Active Link Tracking Logic
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetLink.classList.add('active');
                } else {
                    targetLink.classList.remove('active');
                }
            }
        });
    });

    // Mobile Menu Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('open');
        });
    }
}

/* Intersection Observer Scroll Reveal engine */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const appearanceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        appearanceObserver.observe(element);
    });
}

/* High-Performance Counter Animation Module */
function initCounters() {
    const counters = document.querySelectorAll('.counter-target');
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute('data-count'), 10);
                let startValue = 0;
                const duration = 2000;
                const steps = 50;
                const stepTime = duration / steps;
                const increment = endValue / steps;

                const counterInterval = setInterval(() => {
                    startValue += increment;
                    if (startValue >= endValue) {
                        target.innerText = endValue.toLocaleString();
                        clearInterval(counterInterval);
                    } else {
                        target.innerText = Math.floor(startValue).toLocaleString();
                    }
                }, stepTime);

                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

/* FAQ Accordion Sub-Engine */
function initAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close other active panels
            document.querySelectorAll('.faq-item.active').forEach(activeItem => {
                activeItem.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/* Scroll To Top Operations */
function initScrollTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/* Enterprise Form Validations Management */
function initFormValidations() {
    const forms = document.querySelectorAll('form[data-validate]');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff4d4d';
                } else {
                    field.style.borderColor = 'var(--border)';
                }

                if (field.type === 'email') {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(field.value)) {
                        isValid = false;
                        field.style.borderColor = '#ff4d4d';
                    }
                }
            });

            if (isValid) {
                const submitBtn = form.querySelector('[type="submit"]');
                const initialText = submitBtn.innerText;
                submitBtn.innerText = "Processing...";
                submitBtn.disabled = true;

                setTimeout(() => {
                    alert('Success! Your data has been securely processed by QuantumHost servers.');
                    form.reset();
                    submitBtn.innerText = initialText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    });
}
