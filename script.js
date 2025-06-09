// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const backToTopBtn = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const hamburgers = mobileMenuBtn.querySelectorAll('.hamburger');
        hamburgers.forEach((hamburger, index) => {
            if (mobileMenu.classList.contains('active')) {
                if (index === 0) hamburger.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                if (index === 1) hamburger.style.opacity = '0';
                if (index === 2) hamburger.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                hamburger.style.transform = 'none';
                hamburger.style.opacity = '1';
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-section') || this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 64; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
            const hamburgers = mobileMenuBtn.querySelectorAll('.hamburger');
            hamburgers.forEach(hamburger => {
                hamburger.style.transform = 'none';
                hamburger.style.opacity = '1';
            });
        });
    });

    // Update active navigation link on scroll
    function updateActiveNavLink() {
        const sections = ['home', 'services', 'about', 'contact'];
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            const navLink = document.querySelector(`[data-section="${sectionId}"]`);
            
            if (section && navLink) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    // Remove active class from all nav links
                    navLinks.forEach(link => link.classList.remove('active'));
                    // Add active class to current section's nav link
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Back to top button functionality
    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    // Scroll event listener
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        toggleBackToTopButton();
    });

    // Back to top button click
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Contact form functionality
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            service: formData.get('service'),
            message: formData.get('message')
        };

        // Validate required fields
        if (!data.firstName || !data.lastName || !data.email || !data.message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        setSubmitButtonLoading(true);
        hideFormMessage();

        // Simulate form submission (replace with actual email service)
        setTimeout(() => {
            // For demo purposes, we'll just show a success message
            // In a real implementation, you would send this data to your email service
            
            try {
                // Here you would typically send the data to your backend/email service
                // Example: sendEmailToService(data);
                
                showFormMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
                contactForm.reset();
                
                // You can integrate with services like:
                // - EmailJS (https://www.emailjs.com/)
                // - Formspree (https://formspree.io/)
                // - Netlify Forms (if hosting on Netlify)
                // - Your own backend API
                
            } catch (error) {
                showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
            } finally {
                setSubmitButtonLoading(false);
            }
        }, 2000); // Simulate network delay
    });

    // Form helper functions
    function setSubmitButtonLoading(isLoading) {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        if (isLoading) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
            submitBtn.disabled = true;
        } else {
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    }

    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                hideFormMessage();
            }, 5000);
        }
    }

    function hideFormMessage() {
        formMessage.style.display = 'none';
    }

    // Initialize active nav link on page load
    updateActiveNavLink();
});

// Email Integration Examples (uncomment and configure as needed)

// Example 1: Using EmailJS
/*
function sendEmailWithEmailJS(data) {
    // First, include EmailJS SDK in your HTML:
    // <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
    
    emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key
    
    const templateParams = {
        from_name: `${data.firstName} ${data.lastName}`,
        from_email: data.email,
        service: data.service,
        message: data.message,
        to_email: 'info@aspenergy.com' // Your business email
    };
    
    return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
}
*/

// Example 2: Using Formspree
/*
function sendEmailWithFormspree(data) {
    return fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
*/

// Example 3: Using your own backend API
/*
function sendEmailWithBackend(data) {
    return fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
*/

// Smooth animations on scroll (optional enhancement)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .about-stat, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations when page loads
document.addEventListener('DOMContentLoaded', initScrollAnimations);