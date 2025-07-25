// Mobile Menu Toggle
// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

document.addEventListener('DOMContentLoaded', function () {

    // Add ripple effect styles
    const style1 = document.createElement('style');
    style1.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            background-color: rgba(255, 255, 255, 0.4);
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style1);

    // Add ripple effect to all buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonials Slider
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');

    if (testimonialSlider && testimonialCards.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;

        // Function to slide to specific testimonial
        function showTestimonial(index) {
            if (index < 0) {
                currentIndex = testimonialCards.length - 1;
            } else if (index >= testimonialCards.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }

            testimonialSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        // Event listeners for navigation buttons
        nextBtn.addEventListener('click', () => {
            showTestimonial(currentIndex + 1);
        });

        prevBtn.addEventListener('click', () => {
            showTestimonial(currentIndex - 1);
        });

        // Auto-slide every 5 seconds
        setInterval(() => {
            showTestimonial(currentIndex + 1);
        }, 5000);
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    // Close all other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                            const toggle = otherItem.querySelector('.faq-toggle i');
                            if (toggle) toggle.className = 'fas fa-plus';
                        }
                    });

                    // Toggle current item
                    item.classList.toggle('active');
                    const toggle = item.querySelector('.faq-toggle i');
                    if (toggle) {
                        toggle.className = item.classList.contains('active') ? 'fas fa-minus' : 'fas fa-plus';
                    }
                });
            }
        });
    }

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.feature-card, .step, .area-item');

    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 50) {
                element.classList.add('revealed');
            }
        });
    }

    // Add reveal class for CSS animations
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .step, .area-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .feature-card.revealed, .step.revealed, .area-item.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Check on initial load and scroll
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();


    async function getlocation() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            return data
        }
        catch (e) {
            console.log('error while getting location', e)
            return null
        }

    }

    // SUBMIT FORM
    const demoForm = document.getElementById('demo-form');
    const submitBtn = document.getElementById('book-demo-btn')
    if (demoForm) {
        demoForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            // const location = await getlocation()
            // console.log(location)
            const formData = {
                name: document.getElementById('name').value,
                studentClass: document.getElementById('student-class').value,
                board: document.getElementById('boards').value,
                subject: document.getElementById('subjects').value,
                area: document.getElementById('area').value,
                phone: document.getElementById('phone').value
            };

            const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzWZvfnmmmhNZotPjK9J9ew6dtg-LujDhvuh3qLfDSTvRKSbHHODL12aGyE810ngR2Ngg/exec'; // Replace with your Web App URL
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "text/plain;charset=utf-8"); // IMPORTANT FOR APPS SCRIPT 
            const raw = JSON.stringify(formData);
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            try {
                console.log('Form data:', formData);

                submitBtn.innerHTML = 'Please wait...';
                submitBtn.disabled = true;

                const response = await fetch(SCRIPT_URL, requestOptions);
                console.log('Response: - ', response);
                if (response.ok) {
                    const result = await response.json();
                    alert('Your demo class has been booked successfully!');
                    demoForm.reset();
                } else {
                    alert('Something went wrong. Please try again.');
                }

                submitBtn.innerHTML = 'Book Free Demo Class';
                submitBtn.disabled = false;

            } catch (error) {
                submitBtn.innerHTML = 'Book Free Demo Class';
                submitBtn.disabled = false;
                console.error('Submission error:', error);
                alert('Error submitting form. Please check your internet connection or try again later.');
            }
        });
    }

});

