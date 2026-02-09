/**
 * On Device AI - Documentation JavaScript
 * Handles: sidebar navigation, mobile toggle, active state, smooth scroll
 */

document.addEventListener('DOMContentLoaded', function () {

    // ======================================
    // Mobile Sidebar Toggle
    // ======================================
    const sidebar = document.querySelector('.docs-sidebar');
    const sidebarToggle = document.querySelector('.docs-sidebar-toggle');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        // Close sidebar when clicking a link on mobile
        sidebar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('open');
                }
            });
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 &&
                sidebar.classList.contains('open') &&
                !sidebar.contains(e.target) &&
                !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });
    }

    // ======================================
    // Active Sidebar Link
    // ======================================
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ======================================
    // Smooth Scroll to Anchors (within page)
    // ======================================
    document.querySelectorAll('.docs-content a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 64;
                const top = target.getBoundingClientRect().top + window.scrollY - headerOffset - 20;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
});
