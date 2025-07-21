/* Star Trek Theme Animations */

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all glass panels for animations
    document.querySelectorAll('.glass-panel').forEach(panel => {
        observer.observe(panel);
    });
    
    // Add floating animation to cards
    function addFloatingAnimation() {
        const cards = document.querySelectorAll('.post-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('floating');
        });
    }
    
    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        if (!element) return;
        
        element.innerHTML = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Apply typing effect to hero title if it exists
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
    
    // Add hover effect for navigation items
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(0, 212, 255, 0.3)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        // Add glow effect to header on scroll
        const header = document.querySelector('.header');
        if (header) {
            if (scrolled > 100) {
                header.style.boxShadow = '0 8px 32px rgba(0, 212, 255, 0.2)';
                header.style.borderColor = 'rgba(0, 212, 255, 0.3)';
            } else {
                header.style.boxShadow = '';
                header.style.borderColor = '';
            }
        }
    });
    
    // Add click ripple effect
    document.querySelectorAll('.btn, .nav-link').forEach(element => {
        element.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Initialize floating animation
    addFloatingAnimation();
    
    // Add custom cursor effect
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
    });
});

// Add CSS for animations
const animationStyles = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .floating {
        animation: float 6s ease-in-out infinite;
    }
    
    .floating:nth-child(even) {
        animation-direction: reverse;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 212, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .custom-cursor {
        width: 20px;
        height: 20px;
        border: 2px solid #00d4ff;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        background: rgba(0, 212, 255, 0.1);
        backdrop-filter: blur(5px);
    }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);