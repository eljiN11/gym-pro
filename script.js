/* ============================================ */
/* GYM-PRO TEMPLATE - MAIN SCRIPT               */
/* ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* 1. MOBILE NAVIGATION (HAMBURGER MENU) */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle hamburger icon between bars and xmark
            const icon = hamburger.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close mobile menu when any navigation link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }


    /* 2. NAVBAR SCROLL EFFECT */
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }


    /* 3. ACTIVE NAVIGATION LINK ON SCROLL (SCROLLSPY) */
    const sections = document.querySelectorAll('section, footer');
    
    if (sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach(section => {
            if (section.id) {
                observer.observe(section);
            }
        });
    }


    /* 4. SMOOTH SCROLLING FALLBACK FOR ANCHOR LINKS */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    /* 5. SIMULATED FORM / BUTTON SUBMISSION HANDLING */
    const actionButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline, .btn-card');

    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const href = button.getAttribute('href');
            if (href && href.startsWith('#')) {
                return;
            }

            if (!href || href === '#') {
                e.preventDefault();
                const buttonText = button.textContent.trim();
                console.log(`Action triggered: ${buttonText}`);
            }
        });
    });


    /* 6. THEME TOGGLE (DARK / LIGHT MODE) */
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    if (themeToggle) {
        // Check LocalStorage for saved theme
        if (localStorage.getItem('gympro_theme') === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i> Light';
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            
            // Save to LocalStorage
            localStorage.setItem('gympro_theme', isDark ? 'dark' : 'light');
            
            // Toggle Icon
            if (isDark) {
                themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i> Light';
            } else {
                themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i> Dark';
            }
        });
    }

});