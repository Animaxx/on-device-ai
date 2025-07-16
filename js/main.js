document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initSmoothScrolling();
    initActiveNavigation();
    initScrollAnimations();
    initFeatureAnimations();
    initHeaderScroll();
    initTechnologyAnimations();
    initPrivacyAnimations();
    initPlatformAnimations();
    
    // Header scroll effect
    function initHeaderScroll() {
        const header = document.querySelector('header');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('header nav a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Active navigation tracking
    function initActiveNavigation() {
        const navLinks = document.querySelectorAll('header nav a');
        const sections = [];
        
        // Collect all sections for scroll tracking
        navLinks.forEach(link => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                const section = document.querySelector(targetId);
                if (section) {
                    sections.push({
                        id: targetId,
                        element: section,
                        link: link
                    });
                }
            }
        });
        
        function updateActiveNavigation() {
            let activeSection = null;
            let minDistance = Infinity;
            
            sections.forEach(section => {
                const rect = section.element.getBoundingClientRect();
                const distance = Math.abs(rect.top - 100);
                
                if (rect.top <= 100 && rect.bottom >= 100 && distance < minDistance) {
                    minDistance = distance;
                    activeSection = section;
                }
            });
            
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to current section's link
            if (activeSection) {
                activeSection.link.classList.add('active');
            }
        }
        
        window.addEventListener('scroll', updateActiveNavigation);
        window.addEventListener('resize', updateActiveNavigation);
        updateActiveNavigation(); // Initial call
    }
    
    // Scroll-based animations using Intersection Observer
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Special handling for staggered animations
                    if (entry.target.classList.contains('feature-item')) {
                        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, delay);
                    }
                }
            });
        }, observerOptions);
        
        // Observe all elements that need scroll animations
        const animatedElements = document.querySelectorAll('.feature-item, .comparison-item, .privacy-benefit, .platform-device');
        animatedElements.forEach(el => observer.observe(el));
    }
    
    // Feature cards enhanced animations
    function initFeatureAnimations() {
        const featureItems = document.querySelectorAll('.feature-item');
        
        featureItems.forEach((item, index) => {
            // Set initial state
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            // Hover effects with anime.js if available
            if (typeof anime !== 'undefined') {
                item.addEventListener('mouseenter', () => {
                    anime({
                        targets: item.querySelector('.tech-indicator'),
                        scale: [1, 1.1],
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                    
                    anime({
                        targets: item.querySelector('.feature-media img'),
                        scale: [1, 1.05],
                        duration: 400,
                        easing: 'easeOutQuad'
                    });
                });
                
                item.addEventListener('mouseleave', () => {
                    anime({
                        targets: item.querySelector('.tech-indicator'),
                        scale: [1.1, 1],
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                    
                    anime({
                        targets: item.querySelector('.feature-media img'),
                        scale: [1.05, 1],
                        duration: 400,
                        easing: 'easeOutQuad'
                    });
                });
            }
        });
    }
    
    // Technology section animations
    function initTechnologyAnimations() {
        const techSection = document.querySelector('.technology-section');
        if (!techSection) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && typeof anime !== 'undefined') {
                    // Animate workflow steps
                    const workflowSteps = entry.target.querySelectorAll('.workflow-step');
                    
                    anime({
                        targets: workflowSteps,
                        translateY: [30, 0],
                        opacity: [0, 1],
                        duration: 600,
                        delay: anime.stagger(200),
                        easing: 'easeOutQuad'
                    });
                    
                    // Animate arrows with delay
                    const arrows = entry.target.querySelectorAll('.workflow-arrow');
                    anime({
                        targets: arrows,
                        scale: [0, 1],
                        duration: 400,
                        delay: 800,
                        easing: 'easeOutBack'
                    });
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(techSection);
    }
    
    // Privacy section animations
    function initPrivacyAnimations() {
        const privacySection = document.querySelector('.privacy-section');
        if (!privacySection) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && typeof anime !== 'undefined') {
                    // Animate data flow
                    const dataPoints = entry.target.querySelectorAll('.data-point');
                    
                    anime({
                        targets: dataPoints,
                        scale: [0.8, 1],
                        opacity: [0, 1],
                        duration: 500,
                        delay: anime.stagger(150),
                        easing: 'easeOutQuad'
                    });
                    
                    // Animate privacy shield
                    const shield = entry.target.querySelector('.privacy-shield');
                    if (shield) {
                        anime({
                            targets: shield,
                            scale: [0, 1],
                            rotate: [0, 360],
                            duration: 800,
                            delay: 600,
                            easing: 'easeOutBack'
                        });
                    }
                    
                    // Animate benefits
                    const benefits = entry.target.querySelectorAll('.privacy-benefit');
                    anime({
                        targets: benefits,
                        translateX: [-30, 0],
                        opacity: [0, 1],
                        duration: 600,
                        delay: anime.stagger(200, {start: 800}),
                        easing: 'easeOutQuad'
                    });
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(privacySection);
    }
    
    // Platform section animations
    function initPlatformAnimations() {
        const platformSection = document.querySelector('.platforms-section');
        if (!platformSection) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && typeof anime !== 'undefined') {
                    const platformDevices = entry.target.querySelectorAll('.platform-device');
                    
                    anime({
                        targets: platformDevices,
                        translateY: [50, 0],
                        opacity: [0, 1],
                        duration: 700,
                        delay: anime.stagger(200),
                        easing: 'easeOutQuad'
                    });
                    
                    // Animate device icons
                    const deviceIcons = entry.target.querySelectorAll('.device-icon');
                    anime({
                        targets: deviceIcons,
                        rotate: [0, 360],
                        duration: 1000,
                        delay: anime.stagger(200, {start: 300}),
                        easing: 'easeOutQuad'
                    });
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(platformSection);
    }
    
    // Hero section enhanced animations
    function initHeroAnimations() {
        if (typeof anime !== 'undefined') {
            // Animate floating UI elements
            const uiElements = document.querySelectorAll('.ui-element');
            
            uiElements.forEach((element, index) => {
                anime({
                    targets: element,
                    translateY: [0, -10, 0],
                    duration: 3000 + (index * 500),
                    loop: true,
                    easing: 'easeInOutSine',
                    delay: index * 800
                });
            });
            
            // Animate hero features on scroll
            const heroFeatures = document.querySelectorAll('.hero-feature');
            anime({
                targets: heroFeatures,
                scale: [0.9, 1],
                opacity: [0, 1],
                duration: 600,
                delay: anime.stagger(100, {start: 1000}),
                easing: 'easeOutQuad'
            });
        }
    }
    
    // Initialize hero animations after a short delay
    setTimeout(initHeroAnimations, 500);
    
    // Parallax scroll effect for background elements
    function initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-image, .floating-device');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
    
    // Initialize parallax effects
    initParallaxEffects();
    
    // Performance optimization: Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Apply throttling to scroll events
    const throttledScrollHandler = throttle(() => {
        initParallaxEffects();
    }, 16); // ~60fps
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Loading animation complete
    document.body.classList.add('loaded');
});