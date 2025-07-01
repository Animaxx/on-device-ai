// Advanced animations using GSAP
class FuturisticAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);
        
        // Initialize animations
        this.initTextAnimations();
        this.initHeroAnimations();
        this.initFeatureAnimations();
        this.initScrollAnimations();
        this.initInteractiveElements();
    }
    
    initTextAnimations() {
        // Typewriter effect for hero text
        const heroTitle = document.querySelector('.glitch-text');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            
            gsap.to(heroTitle, {
                duration: 0.05,
                repeat: text.length - 1,
                onRepeat: function() {
                    heroTitle.textContent += text[this.repeat()];
                },
                ease: "none"
            });
        }
        
        // Stagger animation for subtitle
        gsap.from('.subtitle', {
            duration: 1,
            y: 30,
            opacity: 0,
            delay: 2,
            ease: "power2.out"
        });
        
        // Hero description animation
        gsap.from('.hero-description', {
            duration: 1.2,
            y: 40,
            opacity: 0,
            delay: 2.5,
            ease: "power2.out"
        });
        
        // Platform text animation
        gsap.from('.platforms', {
            duration: 1,
            y: 20,
            opacity: 0,
            delay: 3,
            ease: "power2.out"
        });
    }
    
    initHeroAnimations() {
        // Device mockup entrance
        gsap.from('.device-mockup', {
            duration: 1.5,
            scale: 0.8,
            opacity: 0,
            rotationY: -45,
            delay: 1,
            ease: "power2.out"
        });
        
        // CTA button animation
        gsap.from('.cta-container', {
            duration: 1,
            y: 30,
            opacity: 0,
            delay: 3.2,
            ease: "power2.out"
        });
        
        // Floating animation for device
        gsap.to('.device-mockup', {
            duration: 4,
            y: -20,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
        
        // Processing overlay animation
        this.initProcessingAnimation();
    }
    
    initProcessingAnimation() {
        const overlay = document.querySelector('.ai-processing-overlay');
        if (overlay) {
            // Create pulsing effect
            gsap.to(overlay, {
                duration: 2,
                opacity: 0.3,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut"
            });
        }
    }
    
    initFeatureAnimations() {
        // Feature items scroll animations
        const featureItems = document.querySelectorAll('.feature-item');
        
        featureItems.forEach((item, index) => {
            // Initial state
            gsap.set(item, {
                y: 80,
                opacity: 0,
                scale: 0.9
            });
            
            // Scroll trigger animation
            ScrollTrigger.create({
                trigger: item,
                start: "top 80%",
                onEnter: () => {
                    gsap.to(item, {
                        duration: 0.8,
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        delay: index * 0.1,
                        ease: "power2.out"
                    });
                }
            });
            
            // Hover animations
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    duration: 0.3,
                    scale: 1.05,
                    y: -10,
                    ease: "power2.out"
                });
                
                // Glow effect
                const glow = item.querySelector('.feature-glow');
                if (glow) {
                    gsap.to(glow, {
                        duration: 0.3,
                        opacity: 1,
                        scale: 1.1,
                        ease: "power2.out"
                    });
                }
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    duration: 0.3,
                    scale: 1,
                    y: 0,
                    ease: "power2.out"
                });
                
                const glow = item.querySelector('.feature-glow');
                if (glow) {
                    gsap.to(glow, {
                        duration: 0.3,
                        opacity: 0,
                        scale: 1,
                        ease: "power2.out"
                    });
                }
            });
        });
        
        // Feature images hover effect
        const featureImages = document.querySelectorAll('.feature-media img');
        featureImages.forEach(img => {
            img.addEventListener('mouseenter', () => {
                gsap.to(img, {
                    duration: 0.4,
                    scale: 1.1,
                    filter: "brightness(1.2) saturate(1.3)",
                    ease: "power2.out"
                });
            });
            
            img.addEventListener('mouseleave', () => {
                gsap.to(img, {
                    duration: 0.4,
                    scale: 1,
                    filter: "brightness(1) saturate(1)",
                    ease: "power2.out"
                });
            });
        });
    }
    
    initScrollAnimations() {
        // Header background change on scroll
        ScrollTrigger.create({
            start: "top -100",
            end: 99999,
            toggleClass: {
                className: "scrolled",
                targets: "header"
            }
        });
        
        // Section titles animation
        const sectionTitles = document.querySelectorAll('section h2');
        sectionTitles.forEach(title => {
            ScrollTrigger.create({
                trigger: title,
                start: "top 80%",
                onEnter: () => {
                    gsap.from(title, {
                        duration: 1,
                        y: 50,
                        opacity: 0,
                        ease: "power2.out"
                    });
                }
            });
        });
        
        // Parallax effect for background elements
        gsap.to('#neural-network-bg', {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }
    
    initInteractiveElements() {
        // Button hover animations
        const buttons = document.querySelectorAll('.futuristic-btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    duration: 0.3,
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(0, 255, 255, 0.6)",
                    ease: "power2.out"
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    duration: 0.3,
                    scale: 1,
                    boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
                    ease: "power2.out"
                });
            });
            
            btn.addEventListener('click', () => {
                gsap.to(btn, {
                    duration: 0.1,
                    scale: 0.95,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut"
                });
            });
        });
        
        // Navigation link animations
        const navLinks = document.querySelectorAll('header nav a');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    duration: 0.3,
                    scale: 1.1,
                    ease: "power2.out"
                });
            });
            
            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    duration: 0.3,
                    scale: 1,
                    ease: "power2.out"
                });
            });
        });
        
        // Logo hover animation
        const logo = document.querySelector('.logo a');
        if (logo) {
            logo.addEventListener('mouseenter', () => {
                gsap.to(logo, {
                    duration: 0.3,
                    scale: 1.1,
                    textShadow: "0 0 20px rgba(0, 255, 255, 1)",
                    ease: "power2.out"
                });
            });
            
            logo.addEventListener('mouseleave', () => {
                gsap.to(logo, {
                    duration: 0.3,
                    scale: 1,
                    textShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
                    ease: "power2.out"
                });
            });
        }
    }
    
    // Method to trigger random neural activity
    triggerNeuralActivity() {
        // This can be called from neural-network.js
        const features = document.querySelectorAll('.feature-item');
        const randomFeature = features[Math.floor(Math.random() * features.length)];
        
        if (randomFeature) {
            gsap.to(randomFeature, {
                duration: 0.2,
                scale: 1.02,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        }
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.futuristicAnimations = new FuturisticAnimations();
});

// Export for use in other files
window.FuturisticAnimations = FuturisticAnimations;
