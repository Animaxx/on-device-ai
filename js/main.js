/**
 * On Device AI Website - Core JavaScript
 * Handles: theme toggle, header scroll, mobile menu, smooth scroll, FAQ accordion
 */

document.addEventListener('DOMContentLoaded', function () {

    // ======================================
    // Theme Management
    // ======================================
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;

    function getPreferredTheme() {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    setTheme(getPreferredTheme());

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // ======================================
    // Header Scroll Behavior
    // ======================================
    const header = document.querySelector('.site-header');
    let lastScroll = 0;

    function handleHeaderScroll() {
        const scrollY = window.scrollY;
        if (header) {
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        lastScroll = scrollY;
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    // ======================================
    // Mobile Menu
    // ======================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ======================================
    // Smooth Scroll for Anchor Links
    // ======================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 64;
                const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ======================================
    // FAQ Accordion
    // ======================================
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', function () {
            const item = this.closest('.faq-item');
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');

            // Close all other items
            document.querySelectorAll('.faq-item.active').forEach(openItem => {
                if (openItem !== item) {
                    openItem.classList.remove('active');
                    const openAnswer = openItem.querySelector('.faq-answer');
                    openAnswer.style.maxHeight = null;
                }
            });

            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = null;
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // ======================================
    // Interactive Image Stacks
    // ======================================
    document.querySelectorAll('.interactive-stack').forEach(stack => {
        stack.addEventListener('click', function () {
            this.classList.toggle('swapped');
        });

        // Handle keyboard accessibility (Enter/Space to toggle)
        stack.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('swapped');
            }
        });
    });

    // ======================================
    // Hero Device Mockup Tap-to-Switch
    // ======================================
    const heroEcosystem = document.querySelector('.layered-ecosystem');
    if (heroEcosystem) {
        const mockups = heroEcosystem.querySelectorAll('.device-mockup');
        mockups.forEach(mockup => {
            mockup.addEventListener('click', function () {
                // Remove .front from all siblings, add to clicked
                mockups.forEach(m => m.classList.remove('front'));
                this.classList.add('front');
            });
            // Keyboard accessibility
            mockup.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    mockups.forEach(m => m.classList.remove('front'));
                    this.classList.add('front');
                }
            });
        });
    }

    // ======================================
    // Active Nav Link Highlighting
    // ======================================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // ======================================
    // Mac App Store Direct Link with Fallback
    // ======================================
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isMac = /Macintosh|MacIntel|MacPPC|Mac68K/.test(navigator.userAgent) && !isIOS;

    if (isMac) {
        document.querySelectorAll('a[href^="https://apps.apple.com"]').forEach(link => {
            const originalHref = link.href;
            const macAppStoreHref = originalHref.replace('https://', 'macappstore://');

            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Attempt to open the Mac App Store natively
                window.location.href = macAppStoreHref;

                // Fallback to Apple's website if the App Store doesn't open
                setTimeout(() => {
                    // If the document is still active, the store probably didn't launch
                    if (!document.hidden) {
                        window.location.href = originalHref;
                    }
                }, 2000);
            });
        });
    }
});
