/* ============================================================
   QuantumHost - Main JavaScript File
   Author: QuantumHost Team
   Version: 1.0.0
   Description: Complete interactivity for QuantumHost website
   ============================================================ */

/* ============================================================
   TABLE OF CONTENTS
   1. DOM Ready
   2. Loading Screen
   3. Navigation - Sticky & Mobile
   4. Scroll To Top
   5. Scroll Reveal Animations
   6. Counter Animation
   7. FAQ Accordion
   8. Smooth Scroll
   9. Active Navigation
   10. Newsletter Validation
   11. Hero Particles
   12. Metric Bar Animation
   13. Plan Tabs (Homepage)
   14. Pricing Tier Tabs (Minecraft)
   15. Demo Form Handler
   16. Contact Form Handler
   17. Status Bar Animation
   18. Floating Cards
   19. Typing Effect
   20. Utility Functions
   ============================================================ */

/* ============================================================
   1. DOM READY
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
    initLoadingScreen();
    initNavigation();
    initScrollToTop();
    initScrollReveal();
    initCounterAnimation();
    initFAQAccordion();
    initSmoothScroll();
    initActiveNavigation();
    initNewsletterValidation();
    initHeroParticles();
    initMetricBars();
    initPlanTabs();
    initPricingTierTabs();
    initDemoForm();
    initContactForm();
    initStatusBars();
});

/* ============================================================
   2. LOADING SCREEN
   ============================================================ */
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');

    if (!loadingScreen) return;

    // Hide loading screen after content loads
    window.addEventListener('load', function () {
        setTimeout(function () {
            loadingScreen.classList.add('hidden');

            // Remove from DOM after transition
            setTimeout(function () {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 600);
        }, 800);
    });

    // Fallback: hide after 3 seconds regardless
    setTimeout(function () {
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
        }
    }, 3000);
}

/* ============================================================
   3. NAVIGATION - STICKY & MOBILE
   ============================================================ */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!navbar) return;

    // Sticky navbar on scroll
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll(); // Run on init

    // Mobile menu toggle
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function () {
            const isActive = hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active', isActive);

            // Prevent body scroll when menu is open
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu on link click
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close on resize to desktop
        window.addEventListener('resize', function () {
            if (window.innerWidth > 900) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Dropdown keyboard accessibility
    const dropdownItems = document.querySelectorAll('.nav-item');
    dropdownItems.forEach(function (item) {
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.nav-dropdown');

        if (link && dropdown) {
            link.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    dropdown.style.opacity = dropdown.style.opacity === '1' ? '0' : '1';
                    dropdown.style.visibility = dropdown.style.visibility === 'visible' ? 'hidden' : 'visible';
                }
            });
        }
    });
}

/* ============================================================
   4. SCROLL TO TOP
   ============================================================ */
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');

    if (!scrollTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    // Scroll to top on click
    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================================
   5. SCROLL REVEAL ANIMATIONS
   ============================================================ */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-zoom, .reveal-left, .reveal-right');

    if (revealElements.length === 0) return;

    // Use Intersection Observer for performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Unobserve after animation to save resources
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(function (el) {
        observer.observe(el);
    });
}

/* ============================================================
   6. COUNTER ANIMATION
   ============================================================ */
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-counter]');

    if (counters.length === 0) return;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(function (counter) {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-counter'));
    const suffix = element.getAttribute('data-suffix') || '';
    const prefix = element.getAttribute('data-prefix') || '';
    const duration = parseInt(element.getAttribute('data-duration')) || 2000;
    const decimals = element.getAttribute('data-decimals') || 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease out cubic)
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;

        element.textContent = prefix + current.toFixed(decimals) + suffix;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = prefix + target.toFixed(decimals) + suffix;
        }
    }

    requestAnimationFrame(updateCounter);
}

/* ============================================================
   7. FAQ ACCORDION
   ============================================================ */
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length === 0) return;

    faqItems.forEach(function (item) {
        const question = item.querySelector('.faq-question');

        if (!question) return;

        question.addEventListener('click', function () {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(function (otherItem) {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active', !isActive);
        });

        // Keyboard accessibility
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('tabindex', '0');

        question.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });

    // Update aria-expanded on active change
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const item = mutation.target;
                const question = item.querySelector('.faq-question');
                if (question) {
                    question.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');
                }
            }
        });
    });

    faqItems.forEach(function (item) {
        observer.observe(item, { attributes: true });
    });
}

/* ============================================================
   8. SMOOTH SCROLL
   ============================================================ */
function initSmoothScroll() {
    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if just "#"
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================================
   9. ACTIVE NAVIGATION
   ============================================================ */
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
    const currentPath = window.location.pathname;

    navLinks.forEach(function (link) {
        const href = link.getAttribute('href');

        if (!href) return;

        // Normalize paths for comparison
        const linkPath = href.replace(/^\.\.\//, '/').replace(/index\.html$/, '');
        const normalizedCurrent = currentPath.replace(/index\.html$/, '');

        if (normalizedCurrent.endsWith(linkPath) && linkPath !== '/') {
            link.classList.add('active');
        } else if (normalizedCurrent === '/' && linkPath === '/') {
            link.classList.add('active');
        }
    });
}

/* ============================================================
   10. NEWSLETTER VALIDATION
   ============================================================ */
function initNewsletterValidation() {
    const forms = document.querySelectorAll('.newsletter-form');

    forms.forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const input = form.querySelector('.newsletter-input');
            const message = form.closest('.newsletter-card')?.querySelector('.newsletter-message');

            if (!input) return;

            const email = input.value.trim();

            if (!email) {
                showMessage(message, 'Please enter your email address.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showMessage(message, 'Please enter a valid email address.', 'error');
                return;
            }

            // Simulate API call
            const submitBtn = form.querySelector('.btn');
            if (submitBtn) {
                submitBtn.textContent = 'Subscribing...';
                submitBtn.disabled = true;
            }

            setTimeout(function () {
                input.value = '';
                showMessage(message, '🎉 Successfully subscribed! Welcome to QuantumHost.', 'success');

                if (submitBtn) {
                    submitBtn.textContent = 'Subscribe';
                    submitBtn.disabled = false;
                }

                // Clear success message after 5 seconds
                setTimeout(function () {
                    if (message) {
                        message.textContent = '';
                        message.className = 'newsletter-message';
                    }
                }, 5000);
            }, 1000);
        });
    });
}

function showMessage(element, text, type) {
    if (!element) return;
    element.textContent = text;
    element.className = 'newsletter-message ' + type;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/* ============================================================
   11. HERO PARTICLES
   ============================================================ */
function initHeroParticles() {
    const particlesContainer = document.querySelector('.hero-particles');

    if (!particlesContainer) return;

    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random properties
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 15 + 10;
    const animationDelay = Math.random() * 10;
    const opacity = Math.random() * 0.5 + 0.1;

    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-duration: ${animationDuration}s;
        animation-delay: ${animationDelay}s;
        opacity: ${opacity};
    `;

    container.appendChild(particle);
}

/* ============================================================
   12. METRIC BAR ANIMATION
   ============================================================ */
function initMetricBars() {
    const metricBars = document.querySelectorAll('.metric-bar-fill');

    if (metricBars.length === 0) return;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width') || bar.style.width;
                bar.style.width = '0%';

                setTimeout(function () {
                    bar.style.width = width;
                }, 200);

                observer.unobserve(bar);
            }
        });
    }, observerOptions);

    metricBars.forEach(function (bar) {
        const originalWidth = bar.style.width;
        bar.setAttribute('data-width', originalWidth);
        observer.observe(bar);
    });
}

/* ============================================================
   13. PLAN TABS (HOMEPAGE)
   ============================================================ */
function initPlanTabs() {
    const tabs = document.querySelectorAll('.plan-tab');
    const plansGrid = document.querySelector('.plans-grid');

    if (tabs.length === 0 || !plansGrid) return;

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            // Update active tab
            tabs.forEach(function (t) { t.classList.remove('active'); });
            tab.classList.add('active');

            // Filter plans based on tab
            const tabType = tab.getAttribute('data-tab');
            filterPlans(plansGrid, tabType);
        });
    });
}

function filterPlans(grid, type) {
    const plans = grid.querySelectorAll('.plan-card');

    plans.forEach(function (plan) {
        const planType = plan.getAttribute('data-type');

        if (!type || type === 'all' || planType === type) {
            plan.style.display = '';
            plan.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
            plan.style.display = 'none';
        }
    });
}

/* ============================================================
   14. PRICING TIER TABS (MINECRAFT)
   ============================================================ */
function initPricingTierTabs() {
    const tierTabs = document.querySelectorAll('.tier-tab');

    if (tierTabs.length === 0) return;

    tierTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            // Update active tab
            tierTabs.forEach(function (t) { t.classList.remove('active'); });
            tab.classList.add('active');

            // Show/hide pricing cards based on tier
            const tier = tab.getAttribute('data-tier');
            filterMCPlans(tier);
        });
    });
}

function filterMCPlans(tier) {
    const mcGrid = document.querySelector('.mc-pricing-grid');
    if (!mcGrid) return;

    const cards = mcGrid.querySelectorAll('.mc-plan-card');

    cards.forEach(function (card) {
        const cardTier = card.getAttribute('data-tier');

        if (!tier || tier === 'all' || cardTier === tier) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

/* ============================================================
   15. DEMO FORM HANDLER
   ============================================================ */
function initDemoForm() {
    const demoForm = document.getElementById('demo-form');

    if (!demoForm) return;

    demoForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('demo-name')?.value.trim();
        const email = document.getElementById('demo-email')?.value.trim();
        const discord = document.getElementById('demo-discord')?.value.trim();
        const game = document.getElementById('demo-game')?.value;
        const ram = document.getElementById('demo-ram')?.value;

        // Validate
        if (!name || !email || !discord || !game || !ram) {
            showFormError(demoForm, 'Please fill in all required fields.');
            return;
        }

        if (!isValidEmail(email)) {
            showFormError(demoForm, 'Please enter a valid email address.');
            return;
        }

        // Simulate submission
        const submitBtn = demoForm.querySelector('.form-submit');
        if (submitBtn) {
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
        }

        setTimeout(function () {
            // Show success
            const formContent = demoForm.querySelector('.form-content');
            const formSuccess = demoForm.querySelector('.form-success');

            if (formContent) formContent.style.display = 'none';
            if (formSuccess) formSuccess.classList.add('visible');
        }, 1500);
    });
}

function showFormError(form, message) {
    let errorEl = form.querySelector('.form-error-message');

    if (!errorEl) {
        errorEl = document.createElement('div');
        errorEl.className = 'form-error-message';
        errorEl.style.cssText = 'color: #ef4444; font-size: 0.875rem; font-weight: 600; margin-bottom: 1rem; padding: 0.75rem 1rem; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px;';
        form.insertBefore(errorEl, form.firstChild);
    }

    errorEl.textContent = message;

    // Auto remove after 4 seconds
    setTimeout(function () {
        if (errorEl.parentNode) {
            errorEl.parentNode.removeChild(errorEl);
        }
    }, 4000);
}

/* ============================================================
   16. CONTACT FORM HANDLER
   ============================================================ */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('contact-name')?.value.trim();
        const email = document.getElementById('contact-email')?.value.trim();
        const subject = document.getElementById('contact-subject')?.value.trim();
        const message = document.getElementById('contact-message')?.value.trim();

        if (!name || !email || !subject || !message) {
            showFormError(contactForm, 'Please fill in all required fields.');
            return;
        }

        if (!isValidEmail(email)) {
            showFormError(contactForm, 'Please enter a valid email address.');
            return;
        }

        const submitBtn = contactForm.querySelector('.form-submit');
        if (submitBtn) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        }

        setTimeout(function () {
            const formContent = contactForm.querySelector('.form-content');
            const formSuccess = contactForm.querySelector('.form-success');

            if (formContent) formContent.style.display = 'none';
            if (formSuccess) formSuccess.classList.add('visible');
        }, 1500);
    });
}

/* ============================================================
   17. STATUS BAR ANIMATION
   ============================================================ */
function initStatusBars() {
    const statusBars = document.querySelectorAll('.status-bars');

    statusBars.forEach(function (barGroup) {
        const bars = barGroup.querySelectorAll('.status-bar');

        bars.forEach(function (bar, index) {
            // Random heights to simulate real activity
            const heights = [20, 28, 35, 42, 38, 45, 40, 48, 44, 50, 46, 52, 48, 55, 50];
            const height = heights[index % heights.length] || 30;
            bar.style.height = height + 'px';
        });
    });
}

/* ============================================================
   18. FLOATING CARDS
   ============================================================ */
function initFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');

    floatingCards.forEach(function (card, index) {
        // Add staggered float animation
        card.style.animationDelay = (index * 0.5) + 's';
    });
}

/* ============================================================
   19. TYPING EFFECT
   ============================================================ */
function initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');

    typingElements.forEach(function (element) {
        const text = element.getAttribute('data-typing');
        const speed = parseInt(element.getAttribute('data-speed')) || 80;
        const delay = parseInt(element.getAttribute('data-delay')) || 0;

        element.textContent = '';

        setTimeout(function () {
            typeText(element, text, speed);
        }, delay);
    });
}

function typeText(element, text, speed) {
    let index = 0;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

/* ============================================================
   20. UTILITY FUNCTIONS
   ============================================================ */

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function () {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for scroll events
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(function () {
                inThrottle = false;
            }, limit);
        }
    };
}

/**
 * Format number with commas
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Get scroll percentage
 */
function getScrollPercentage() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    return (scrollTop / docHeight) * 100;
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Add hover effect to cards
 */
function initCardHoverEffect() {
    const cards = document.querySelectorAll('.plan-card, .why-card, .mc-plan-card, .vps-plan-card');

    cards.forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
        });
    });
}

// Initialize card hover effects
document.addEventListener('DOMContentLoaded', function () {
    // Only on non-touch devices
    if (!('ontouchstart' in window)) {
        initCardHoverEffect();
    }
});

/**
 * Copy to clipboard functionality
 */
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function () {
            showToast('Copied to clipboard!');
        });
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Copied to clipboard!');
    }
}

/**
 * Show toast notification
 */
function showToast(message, type) {
    type = type || 'success';

    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: ${type === 'success' ? '#22c55e' : '#ef4444'};
        color: #fff;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-size: 0.875rem;
        font-weight: 600;
        z-index: 9999;
        opacity: 0;
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(function () {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    // Animate out and remove
    setTimeout(function () {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';

        setTimeout(function () {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

/**
 * Lazy load images
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(function (img) {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

/**
 * Animate progress bars
 */
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.metric-bar-fill');

    progressBars.forEach(function (bar) {
        const targetWidth = bar.getAttribute('data-width') || bar.style.width;
        bar.style.width = '0%';

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    setTimeout(function () {
                        bar.style.width = targetWidth;
                    }, 300);
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(bar);
    });
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', animateProgressBars);

/**
 * Handle external links
 */
document.addEventListener('DOMContentLoaded', function () {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(function (link) {
        if (!link.hostname === window.location.hostname) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});

/**
 * Keyboard navigation improvements
 */
document.addEventListener('keydown', function (e) {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');

        if (hamburger && mobileMenu && mobileMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

/**
 * Performance: Reduce animations on low-end devices
 */
function checkReducedMotion() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (mediaQuery.matches) {
        document.documentElement.style.setProperty('--transition-base', '0s');
        document.documentElement.style.setProperty('--transition-slow', '0s');
        document.documentElement.style.setProperty('--transition-fast', '0s');
    }
}

checkReducedMotion();

/**
 * Console branding
 */
console.log(
    '%c⚡ QuantumHost%c\nPremium Game Hosting\nhttps://quantumhost.gg',
    'color: #FFD400; font-size: 24px; font-weight: 900;',
    'color: #a0a0a0; font-size: 12px;'
);
