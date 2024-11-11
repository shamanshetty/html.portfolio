document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeSwitch = document.getElementById('theme-switch');
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeSwitch.checked = true;
    }

    // Theme switch event listener
    themeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save theme preference
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Typing Effect
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        const texts = ['Developer', 'Designer', 'Creator'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            if (!typedTextElement) return;

            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typedTextElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 50 : 100);
            }
        }

        type();
    }

    // Smooth Scrolling
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');
            
            if (!nameInput.value.trim()) {
                alert('Please enter your name');
                nameInput.focus();
                return;
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                alert('Please enter a valid email address');
                emailInput.focus();
                return;
            }
            
            if (!messageInput.value.trim()) {
                alert('Please enter your message');
                messageInput.focus();
                return;
            }

            // Simulated form submission (replace with actual submission logic)
            try {
                // Here you would typically send the form data to a backend service
                console.log('Form submitted', {
                    name: nameInput.value,
                    email: emailInput.value,
                    message: messageInput.value
                });

                alert('Message sent successfully!');
                this.reset();
            } catch (error) {
                console.error('Submission error:', error);
                alert('Failed to send message. Please try again.');
            }
        });
    }

    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Optional: Add scroll animations
    function addScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        // Add animation to grid items
        const gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach(item => {
            item.classList.add('fade-in');
            observer.observe(item);
        });
    }

    // Initialize scroll animations
    addScrollAnimations();
});

// Error handling for unhandled promise rejections
window.addEventListener('unhandledrejection', event => {
    console.error('Unhandled promise rejection:', event.reason);
});