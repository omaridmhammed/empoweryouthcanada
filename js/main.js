// ========================================
// EMPOWER YOUTH CANADA - MAIN JAVASCRIPT
// Core Functionality
// ========================================

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || !href) return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active state
            updateActiveNavLink(href);
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('navbarMenu');
            const menuToggle = document.getElementById('mobileMenuToggle');
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navbarMenu = document.getElementById('navbarMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
        document.body.style.overflow = navbarMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Dropdown menu toggle (mobile and desktop)
document.querySelectorAll('.navbar-dropdown').forEach(dropdown => {
    const toggle = dropdown.querySelector('.navbar-dropdown-toggle');
    
    if (toggle) {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
        
        // Desktop hover
        if (window.innerWidth > 768) {
            dropdown.addEventListener('mouseenter', () => {
                dropdown.classList.add('active');
            });
            
            dropdown.addEventListener('mouseleave', () => {
                dropdown.classList.remove('active');
            });
        }
    }
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Update active nav link based on scroll position
function updateActiveNavLink(section) {
    document.querySelectorAll('.navbar-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === section) {
            link.classList.add('active');
        }
    });
}

// Intersection Observer for scroll-based active state
const sections = document.querySelectorAll('section[id]');
const observerOptions = {
    threshold: 0.3,
    rootMargin: '-100px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            updateActiveNavLink(`#${id}`);
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Scroll reveal animations
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Counter animation for stats
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // ~60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stats come into view
const statNumbers = document.querySelectorAll('.stat-number[data-target]');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Form submission handlers
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        try {
            // Replace this with your actual form submission logic
            // Example: await fetch('your-form-endpoint', { method: 'POST', body: JSON.stringify(data) });
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Newsletter form handler
const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = form.querySelector('input[type="email"]').value;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;
        
        try {
            // Replace with actual newsletter subscription logic
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            showNotification('Successfully subscribed to newsletter!', 'success');
            form.reset();
        } catch (error) {
            showNotification('Subscription failed. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 350px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Scroll to top on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
});

// Handle resize events
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reset mobile menu on resize to desktop
        if (window.innerWidth > 768 && navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250);
});
