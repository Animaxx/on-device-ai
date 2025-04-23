document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
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
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,  // Offset for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Function to determine which section is most visible
    function getVisibleSection() {
        let maxVisibleSection = null;
        let maxVisibleArea = 0;
        
        sections.forEach(section => {
            const rect = section.element.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            
            // Calculate how much of the section is visible
            const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
            const visiblePercent = visibleHeight / rect.height;
            
            // Special case for hero section - make it more dominant when at the top
            const isHero = section.id === '#home';
            const adjustedVisibility = isHero && rect.top < 0 ? 
                visiblePercent * (1 - Math.abs(rect.top) / rect.height / 2) : 
                visiblePercent;
            
            if (visibleHeight > 0 && adjustedVisibility > maxVisibleArea) {
                maxVisibleArea = adjustedVisibility;
                maxVisibleSection = section;
            }
        });
        
        return maxVisibleSection;
    }
    
    // Update active navigation on scroll
    function updateActiveNavigation() {
        const visibleSection = getVisibleSection();
        
        if (visibleSection) {
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section's link
            visibleSection.link.classList.add('active');
        }
    }
    
    // Set initial active state and update on scroll
    window.addEventListener('scroll', updateActiveNavigation);
    window.addEventListener('resize', updateActiveNavigation);
    
    // Simple animation for feature items as they come into view
    const featureItems = document.querySelectorAll('.feature-item');
    
    // Basic detection of elements in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Check if elements are in viewport and add animation class
    function checkVisibility() {
        featureItems.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add('visible');
            }
        });
    }
    
    // Set initial visibility state
    window.addEventListener('load', checkVisibility);
    window.addEventListener('scroll', checkVisibility);
    
    // Add animation classes to feature items
    featureItems.forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });
    
    // Show elements when they become visible
    document.addEventListener('scroll', function() {
        featureItems.forEach(item => {
            if (isInViewport(item)) {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
            }
        });
    });
    
    // Trigger initial checks
    checkVisibility();
    updateActiveNavigation();
});