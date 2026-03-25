/**
 * On Device AI Website - Anime.js v4 Animations
 * Handles: scroll reveals, hero entrance, hover effects, parallax, 3D tilt
 */

document.addEventListener('DOMContentLoaded', function () {

    // ======================================
    // Reduced Motion Detection
    // ======================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let motionDisabled = prefersReducedMotion.matches;

    prefersReducedMotion.addEventListener('change', (e) => {
        motionDisabled = e.matches;
    });

    // ======================================
    // Animation Config
    // ======================================
    const CONFIG = {
        duration: { fast: 400, normal: 600, slow: 800 },
        stagger: 120,
        threshold: 0.15,
        easing: 'easeOutCubic'
    };

    // ======================================
    // Intersection Observer for Scroll Reveals
    // ======================================
    function createScrollReveal() {
        if (motionDisabled) {
            document.querySelectorAll('.reveal').forEach(el => {
                el.classList.add('revealed');
            });
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = parseInt(el.dataset.delay) || 0;

                    setTimeout(() => {
                        // Use Anime.js if available, else CSS fallback
                        if (typeof anime !== 'undefined' && anime.animate) {
                            anime.animate(el, {
                                opacity: [0, 1],
                                translateY: [30, 0],
                                duration: CONFIG.duration.slow,
                                ease: CONFIG.easing
                            });
                        } else {
                            el.style.transition = `opacity ${CONFIG.duration.slow}ms, transform ${CONFIG.duration.slow}ms`;
                            el.classList.add('revealed');
                        }
                    }, delay);

                    observer.unobserve(el);
                }
            });
        }, {
            threshold: CONFIG.threshold,
            rootMargin: '0px 0px -40px 0px'
        });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    // ======================================
    // Hero Entrance Animation
    // ======================================
    function animateHero() {
        if (motionDisabled) return;
        if (typeof anime === 'undefined' || !anime.createTimeline) return;

        const timeline = anime.createTimeline({
            defaults: { ease: 'outCubic' }
        });

        timeline
            .add('.hero-title-line1', {
                opacity: [0, 1],
                translateY: [40, 0],
                duration: CONFIG.duration.slow
            }, 0)
            .add('.hero-title-line2', {
                opacity: [0, 1],
                translateY: [30, 0],
                duration: CONFIG.duration.slow
            }, 300)
            .add('.hero-description', {
                opacity: [0, 1],
                translateY: [20, 0],
                duration: CONFIG.duration.normal
            }, 400)
            .add('.hero-badge', {
                opacity: [0, 1],
                scale: [0.8, 1],
                duration: CONFIG.duration.fast,
                delay: anime.stagger(80)
            }, 500)
            .add('.hero-cta', {
                opacity: [0, 1],
                translateY: [20, 0],
                duration: CONFIG.duration.normal
            }, 600)
            .add('.hero-platforms', {
                opacity: [0, 1],
                duration: CONFIG.duration.fast
            }, 700)
            .add('.layered-ecosystem .device-mockup', {
                opacity: [0, 1],
                duration: CONFIG.duration.slow
            }, 200)
            .add('.floating-badge', {
                opacity: [0, 1],
                scale: [0.5, 1],
                duration: CONFIG.duration.fast,
                delay: anime.stagger(150)
            }, 600);
    }

    // ======================================
    // Feature Cards Stagger Reveal
    // ======================================
    function initFeatureCards() {
        if (motionDisabled) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.feature-card');
                    if (typeof anime !== 'undefined' && anime.animate) {
                        anime.animate(cards, {
                            opacity: [0, 1],
                            translateY: [40, 0],
                            duration: CONFIG.duration.slow,
                            delay: anime.stagger(CONFIG.stagger),
                            ease: CONFIG.easing
                        });
                    } else {
                        cards.forEach((card, i) => {
                            setTimeout(() => {
                                card.style.transition = `opacity 600ms, transform 600ms`;
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, i * CONFIG.stagger);
                        });
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const grid = document.querySelector('.feature-grid');
        if (grid) {
            grid.querySelectorAll('.feature-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(40px)';
            });
            observer.observe(grid);
        }
    }

    // ======================================
    // Comparison Cards Reveal
    // ======================================
    function initComparisonCards() {
        if (motionDisabled) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.comparison-card');
                    if (typeof anime !== 'undefined' && anime.animate) {
                        anime.animate(cards, {
                            opacity: [0, 1],
                            scale: [0.95, 1],
                            duration: CONFIG.duration.slow,
                            delay: anime.stagger(200),
                            ease: CONFIG.easing
                        });
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        const grid = document.querySelector('.comparison-grid');
        if (grid) {
            grid.querySelectorAll('.comparison-card').forEach(card => {
                card.style.opacity = '0';
            });
            observer.observe(grid);
        }
    }

    // ======================================
    // Privacy Benefits Slide In
    // ======================================
    function initPrivacyAnimations() {
        if (motionDisabled) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.privacy-benefits li');
                    if (typeof anime !== 'undefined' && anime.animate) {
                        anime.animate(items, {
                            opacity: [0, 1],
                            translateX: [-30, 0],
                            duration: CONFIG.duration.normal,
                            delay: anime.stagger(100),
                            ease: CONFIG.easing
                        });
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        const list = document.querySelector('.privacy-benefits');
        if (list) {
            list.querySelectorAll('li').forEach(li => {
                li.style.opacity = '0';
            });
            observer.observe(list);
        }
    }

    // ======================================
    // Platform Cards Stagger + 3D Tilt
    // ======================================
    function initPlatformCards() {
        if (motionDisabled) return;

        // Stagger reveal
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.platform-card');
                    if (typeof anime !== 'undefined' && anime.animate) {
                        anime.animate(cards, {
                            opacity: [0, 1],
                            translateY: [40, 0],
                            duration: CONFIG.duration.slow,
                            delay: anime.stagger(150),
                            ease: CONFIG.easing
                        });
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const grid = document.querySelector('.platform-grid');
        if (grid) {
            grid.querySelectorAll('.platform-card').forEach(card => {
                card.style.opacity = '0';
            });
            observer.observe(grid);
        }

        // 3D tilt on hover
        document.querySelectorAll('.platform-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                if (motionDisabled) return;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -8;
                const rotateY = ((x - centerX) / centerX) * 8;
                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    // ======================================
    // Device Mockup Parallax
    // ======================================
    function initParallax() {
        // Parallax disabled for the multi-device layered ecosystem hero.
        // The CSS translate values on .mockup-mac/.mockup-ipad/.mockup-iphone
        // must not be overridden by JS to preserve their individual positions.
    }

    // ======================================
    // Device Mockup 3D Hover
    // ======================================
    function initMockupHover() {
        // 3D hover is disabled for the layered ecosystem hero.
        // Each device has its own CSS transform positioning that must stay intact.
    }



    // ======================================
    // Stats Counter Animation
    // ======================================
    function initStatsCounters() {
        const statsGrid = document.querySelector('.stats-grid');
        if (!statsGrid) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        const target = parseInt(counter.dataset.target, 10);
                        const suffix = counter.dataset.suffix || '';
                        if (motionDisabled || isNaN(target)) return;

                        if (typeof anime !== 'undefined' && anime.animate) {
                            const obj = { val: 0 };
                            anime.animate(obj, {
                                val: target,
                                duration: 1200,
                                ease: 'easeOutQuart',
                                onUpdate: () => {
                                    counter.textContent = Math.round(obj.val) + suffix;
                                }
                            });
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        observer.observe(statsGrid);
    }

    // ======================================
    // Initialize All Animations
    // ======================================
    createScrollReveal();
    animateHero();
    initFeatureCards();
    initComparisonCards();
    initPrivacyAnimations();
    initPlatformCards();
    initParallax();
    initMockupHover();
    initStatsCounters();
});
