/**
 * Motion Controller - Centralized motion/animation management
 * Handles reduced motion, scroll listeners, and animation helpers
 */

document.addEventListener('DOMContentLoaded', function () {
    // ======================================
    // Motion Controller Setup
    // ======================================

    // Motion tokens (should match CSS custom properties)
    const MOTION = {
        duration: {
            fast: 200,
            normal: 400,
            slow: 600
        },
        easing: {
            smooth: 'cubicBezier(0.4, 0, 0.2, 1)',
            spring: 'cubicBezier(0.34, 1.56, 0.64, 1)',
            // Anime.js built-in equivalents
            smoothAnime: 'easeOutQuad',
            springAnime: 'easeOutBack'
        }
    };

    // Reduced motion detection
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let motionDisabled = prefersReducedMotion.matches;

    // Listen for preference changes
    prefersReducedMotion.addEventListener('change', (e) => {
        motionDisabled = e.matches;
        if (motionDisabled) {
            // Stop all looping animations
            MotionController.stopAllLoops();
        }
    });

    // ======================================
    // Motion Controller Object
    // ======================================

    const MotionController = {
        observers: [],
        loopAnimations: [],
        scrollHandlers: [],
        scrollTicking: false,

        /**
         * Reveal animation - scroll-triggered fade/translate
         */
        reveal(selector, options = {}) {
            if (motionDisabled) {
                // Skip animation, just show elements
                document.querySelectorAll(selector).forEach(el => {
                    el.style.opacity = '1';
                    el.style.transform = 'none';
                });
                return;
            }

            const defaults = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
                duration: MOTION.duration.slow,
                translateY: 30,
                staggerDelay: 100,
                easing: MOTION.easing.smoothAnime
            };
            const opts = { ...defaults, ...options };

            const elements = document.querySelectorAll(selector);
            if (!elements.length) return;

            // Set initial state
            elements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = `translateY(${opts.translateY}px)`;
                el.style.transition = `opacity ${opts.duration}ms, transform ${opts.duration}ms`;
            });

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const siblings = Array.from(el.parentNode.children).filter(
                            child => child.matches(selector)
                        );
                        const index = siblings.indexOf(el);
                        const delay = index * opts.staggerDelay;

                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                            el.classList.add('animate-in');
                        }, delay);

                        observer.unobserve(el);
                    }
                });
            }, { threshold: opts.threshold, rootMargin: opts.rootMargin });

            elements.forEach(el => observer.observe(el));
            this.observers.push(observer);
        },

        /**
         * Stagger animation - Anime.js stagger wrapper
         */
        stagger(selector, animeOptions = {}) {
            if (motionDisabled || typeof anime === 'undefined') return null;

            const defaults = {
                duration: MOTION.duration.slow,
                easing: MOTION.easing.smoothAnime,
                delay: anime.stagger(MOTION.duration.fast)
            };

            return anime({
                targets: selector,
                ...defaults,
                ...animeOptions
            });
        },

        /**
         * Hover micro-interaction
         */
        hover(selector, enterProps = {}, leaveProps = {}) {
            if (motionDisabled) return;

            const elements = document.querySelectorAll(selector);
            elements.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    if (typeof anime !== 'undefined') {
                        anime({
                            targets: item,
                            duration: MOTION.duration.fast,
                            easing: MOTION.easing.smoothAnime,
                            ...enterProps
                        });
                    }
                });

                item.addEventListener('mouseleave', () => {
                    if (typeof anime !== 'undefined') {
                        anime({
                            targets: item,
                            duration: MOTION.duration.fast,
                            easing: MOTION.easing.smoothAnime,
                            ...leaveProps
                        });
                    }
                });
            });
        },

        /**
         * Decorative loop animation (disabled under reduced motion)
         */
        loop(selector, animeOptions = {}) {
            if (motionDisabled || typeof anime === 'undefined') return null;

            const anim = anime({
                targets: selector,
                loop: true,
                easing: 'easeInOutSine',
                ...animeOptions
            });

            this.loopAnimations.push(anim);
            return anim;
        },

        /**
         * Stop all loop animations
         */
        stopAllLoops() {
            this.loopAnimations.forEach(anim => {
                if (anim && typeof anim.pause === 'function') {
                    anim.pause();
                }
            });
            this.loopAnimations = [];
        },

        /**
         * Register a scroll handler (rAF batched)
         */
        onScroll(handler) {
            this.scrollHandlers.push(handler);
        },

        /**
         * Process all scroll handlers with rAF batching
         */
        processScroll() {
            if (!this.scrollTicking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    this.scrollHandlers.forEach(handler => handler(scrollY));
                    this.scrollTicking = false;
                });
                this.scrollTicking = true;
            }
        },

        /**
         * Clean up all observers
         */
        cleanup() {
            this.observers.forEach(obs => obs.disconnect());
            this.observers = [];
            this.stopAllLoops();
        }
    };

    // Single scroll listener for all scroll-based effects
    window.addEventListener('scroll', () => MotionController.processScroll(), { passive: true });

    // ======================================
    // Initialize Features
    // ======================================

    initHeaderScroll();
    initSmoothScrolling();
    initActiveNavigation();
    initFeatureAnimations();
    initTechnologyAnimations();
    initPrivacyAnimations();
    initPlatformAnimations();
    initHeroAnimations();
    initParallaxEffects();

    // Enhanced animations
    initGlowOrbs();
    initFloatingParticles();
    initFlowArrows();
    initIconPulse();

    // Body loaded class
    document.body.classList.add('loaded');

    // ======================================
    // Header Scroll Effect
    // ======================================

    function initHeaderScroll() {
        const header = document.querySelector('header');
        if (!header) return;

        MotionController.onScroll((scrollY) => {
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ======================================
    // Smooth Scrolling
    // ======================================

    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('header nav a');

        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: motionDisabled ? 'auto' : 'smooth'
                    });
                }
            });
        });
    }

    // ======================================
    // Active Navigation Tracking
    // ======================================

    function initActiveNavigation() {
        const navLinks = document.querySelectorAll('header nav a');
        const sections = [];

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

            navLinks.forEach(link => link.classList.remove('active'));

            if (activeSection) {
                activeSection.link.classList.add('active');
            }
        }

        MotionController.onScroll(updateActiveNavigation);
        window.addEventListener('resize', updateActiveNavigation);
        updateActiveNavigation();
    }

    // ======================================
    // Feature Card Animations
    // ======================================

    function initFeatureAnimations() {
        // Reveal animation for feature cards
        MotionController.reveal('.feature-item', {
            staggerDelay: 100,
            duration: MOTION.duration.slow
        });

        // Hover effects for feature cards
        const featureItems = document.querySelectorAll('.feature-item');
        featureItems.forEach(item => {
            const techIndicator = item.querySelector('.tech-indicator');
            const featureImage = item.querySelector('.feature-media img');

            item.addEventListener('mouseenter', () => {
                if (motionDisabled || typeof anime === 'undefined') return;

                if (techIndicator) {
                    anime({
                        targets: techIndicator,
                        scale: [1, 1.1],
                        duration: MOTION.duration.fast,
                        easing: MOTION.easing.smoothAnime
                    });
                }

                if (featureImage) {
                    anime({
                        targets: featureImage,
                        scale: [1, 1.05],
                        duration: MOTION.duration.normal,
                        easing: MOTION.easing.smoothAnime
                    });
                }
            });

            item.addEventListener('mouseleave', () => {
                if (motionDisabled || typeof anime === 'undefined') return;

                if (techIndicator) {
                    anime({
                        targets: techIndicator,
                        scale: [1.1, 1],
                        duration: MOTION.duration.fast,
                        easing: MOTION.easing.smoothAnime
                    });
                }

                if (featureImage) {
                    anime({
                        targets: featureImage,
                        scale: [1.05, 1],
                        duration: MOTION.duration.normal,
                        easing: MOTION.easing.smoothAnime
                    });
                }
            });
        });
    }

    // ======================================
    // Technology Section Animations
    // ======================================

    function initTechnologyAnimations() {
        const techSection = document.querySelector('.technology-section');
        if (!techSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (motionDisabled) {
                        // Just show elements without animation
                        entry.target.querySelectorAll('.workflow-step, .workflow-arrow').forEach(el => {
                            el.style.opacity = '1';
                            el.style.transform = 'none';
                        });
                        return;
                    }

                    if (typeof anime !== 'undefined') {
                        // Animate workflow steps with stagger
                        const workflowSteps = entry.target.querySelectorAll('.workflow-step');
                        MotionController.stagger(workflowSteps, {
                            translateY: [30, 0],
                            opacity: [0, 1],
                            duration: MOTION.duration.slow,
                            delay: anime.stagger(MOTION.duration.fast)
                        });

                        // Animate arrows with delay
                        const arrows = entry.target.querySelectorAll('.workflow-arrow');
                        anime({
                            targets: arrows,
                            scale: [0, 1],
                            duration: MOTION.duration.normal,
                            delay: 800,
                            easing: MOTION.easing.springAnime
                        });
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(techSection);
        MotionController.observers.push(observer);
    }

    // ======================================
    // Privacy Section Animations
    // ======================================

    function initPrivacyAnimations() {
        const privacySection = document.querySelector('.privacy-section');
        if (!privacySection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (motionDisabled) {
                        entry.target.querySelectorAll('.data-point, .privacy-shield, .privacy-benefit').forEach(el => {
                            el.style.opacity = '1';
                            el.style.transform = 'none';
                        });
                        return;
                    }

                    if (typeof anime !== 'undefined') {
                        // Data points animation
                        const dataPoints = entry.target.querySelectorAll('.data-point');
                        MotionController.stagger(dataPoints, {
                            scale: [0.8, 1],
                            opacity: [0, 1],
                            duration: MOTION.duration.normal,
                            delay: anime.stagger(150)
                        });

                        // Privacy shield animation
                        const shield = entry.target.querySelector('.privacy-shield');
                        if (shield) {
                            anime({
                                targets: shield,
                                scale: [0, 1],
                                rotate: [0, 360],
                                duration: 800,
                                delay: MOTION.duration.slow,
                                easing: MOTION.easing.springAnime
                            });
                        }

                        // Benefits animation
                        const benefits = entry.target.querySelectorAll('.privacy-benefit');
                        MotionController.stagger(benefits, {
                            translateX: [-30, 0],
                            opacity: [0, 1],
                            duration: MOTION.duration.slow,
                            delay: anime.stagger(MOTION.duration.fast, { start: 800 })
                        });
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(privacySection);
        MotionController.observers.push(observer);
    }

    // ======================================
    // Platform Section Animations
    // ======================================

    function initPlatformAnimations() {
        const platformSection = document.querySelector('.platforms-section');
        if (!platformSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (motionDisabled) {
                        entry.target.querySelectorAll('.platform-device, .device-icon').forEach(el => {
                            el.style.opacity = '1';
                            el.style.transform = 'none';
                        });
                        return;
                    }

                    if (typeof anime !== 'undefined') {
                        const platformDevices = entry.target.querySelectorAll('.platform-device');
                        MotionController.stagger(platformDevices, {
                            translateY: [50, 0],
                            opacity: [0, 1],
                            duration: 700,
                            delay: anime.stagger(MOTION.duration.fast)
                        });

                        // Device icons rotation
                        const deviceIcons = entry.target.querySelectorAll('.device-icon');
                        anime({
                            targets: deviceIcons,
                            rotate: [0, 360],
                            duration: 1000,
                            delay: anime.stagger(MOTION.duration.fast, { start: 300 }),
                            easing: MOTION.easing.smoothAnime
                        });
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(platformSection);
        MotionController.observers.push(observer);
    }

    // ======================================
    // Hero Animations
    // ======================================

    function initHeroAnimations() {
        if (motionDisabled || typeof anime === 'undefined') return;

        // Floating UI elements - decorative loops
        const uiElements = document.querySelectorAll('.ui-element');
        uiElements.forEach((element, index) => {
            MotionController.loop(element, {
                translateY: [0, -10, 0],
                duration: 3000 + (index * 500),
                delay: index * 800
            });
        });

        // Hero features entrance
        setTimeout(() => {
            const heroFeatures = document.querySelectorAll('.hero-feature');
            MotionController.stagger(heroFeatures, {
                scale: [0.9, 1],
                opacity: [0, 1],
                duration: MOTION.duration.slow,
                delay: anime.stagger(100, { start: 1000 })
            });
        }, 500);
    }

    // ======================================
    // Parallax Effects (rAF batched)
    // ======================================

    function initParallaxEffects() {
        if (motionDisabled) return;

        const parallaxElements = document.querySelectorAll('.hero-image, .floating-device');
        if (!parallaxElements.length) return;

        MotionController.onScroll((scrollY) => {
            const rate = scrollY * -0.3;
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    // ======================================
    // Enhanced: Glow Orbs Animation
    // ======================================

    function initGlowOrbs() {
        if (motionDisabled || typeof anime === 'undefined') return;

        const orbs = document.querySelectorAll('.glow-orb');
        if (!orbs.length) return;

        orbs.forEach((orb, index) => {
            // Random floating movement
            MotionController.loop(orb, {
                translateX: () => anime.random(-30, 30),
                translateY: () => anime.random(-20, 20),
                scale: [1, 1.1, 1],
                duration: 4000 + (index * 1000),
                direction: 'alternate',
                easing: 'easeInOutSine'
            });

            // Opacity pulse
            MotionController.loop(orb, {
                opacity: [0.4, 0.7, 0.4],
                duration: 3000 + (index * 500),
                easing: 'easeInOutSine'
            });
        });
    }

    // ======================================
    // Enhanced: Floating Particles
    // ======================================

    function initFloatingParticles() {
        if (motionDisabled || typeof anime === 'undefined') return;

        const container = document.getElementById('hero-particles');
        if (!container) return;

        const particleCount = 20;
        const colors = ['#5AC8FA', '#667eea', '#764ba2'];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.width = `${2 + Math.random() * 4}px`;
            particle.style.height = particle.style.width;
            particle.style.opacity = `${0.2 + Math.random() * 0.4}`;
            container.appendChild(particle);

            // Animate each particle
            MotionController.loop(particle, {
                translateY: () => anime.random(-50, 50),
                translateX: () => anime.random(-30, 30),
                opacity: () => [0.2, 0.5, 0.2],
                duration: 3000 + Math.random() * 3000,
                delay: Math.random() * 2000,
                easing: 'easeInOutSine'
            });
        }
    }

    // ======================================
    // Enhanced: Flow Arrow Animation
    // ======================================

    function initFlowArrows() {
        if (motionDisabled || typeof anime === 'undefined') return;

        const privacySection = document.querySelector('.privacy-section');
        if (!privacySection) return;

        const flowLines = privacySection.querySelectorAll('.flow-line');
        if (!flowLines.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate stroke-dashoffset to draw the lines
                    anime({
                        targets: flowLines,
                        strokeDashoffset: [50, 0],
                        duration: MOTION.duration.slow,
                        delay: anime.stagger(300, { start: 500 }),
                        easing: MOTION.easing.smoothAnime
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(privacySection);
        MotionController.observers.push(observer);
    }

    // ======================================
    // Enhanced: Icon Pulse Animation
    // ======================================

    function initIconPulse() {
        if (motionDisabled || typeof anime === 'undefined') return;

        // Privacy shield icon
        const shieldIcon = document.querySelector('.privacy-shield');
        if (shieldIcon) {
            MotionController.loop(shieldIcon, {
                scale: [1, 1.05, 1],
                duration: 2000,
                easing: 'easeInOutSine'
            });
        }

        // Benefit icons hover effect
        const benefitIcons = document.querySelectorAll('.benefit-icon');
        benefitIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                anime({
                    targets: icon,
                    scale: 1.1,
                    rotate: [0, 5, -5, 0],
                    duration: MOTION.duration.normal,
                    easing: MOTION.easing.springAnime
                });
            });

            icon.addEventListener('mouseleave', () => {
                anime({
                    targets: icon,
                    scale: 1,
                    rotate: 0,
                    duration: MOTION.duration.fast,
                    easing: MOTION.easing.smoothAnime
                });
            });
        });

        // Device icons hover effect
        const deviceIcons = document.querySelectorAll('.device-icon');
        deviceIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                anime({
                    targets: icon,
                    scale: 1.1,
                    duration: MOTION.duration.fast,
                    easing: MOTION.easing.springAnime
                });
            });

            icon.addEventListener('mouseleave', () => {
                anime({
                    targets: icon,
                    scale: 1,
                    duration: MOTION.duration.fast,
                    easing: MOTION.easing.smoothAnime
                });
            });
        });
    }
});