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


    const testimonials = [
        {
            content: `"My son's grades in Mathematics improved significantly after just 3 months with his TutoPlus tutor. The personalized attention made all the difference!"`,
            authorName: "Priya Sharma",
            authorDetails: "Mother of Class 9 student, Arera Colony",
            authorImage: "https://randomuser.me/api/portraits/women/26.jpg",
            rating: 5
        },
        {
            content: `"Finding a good Science tutor was difficult until we discovered TutoPlus. The verification process gave us confidence, and the free demo class helped us make the right choice."`,
            authorName: "Rajesh Verma",
            authorDetails: "Father of Class 11 student, MP Nagar",
            authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
            rating: 4.5
        },
        {
            content: `"The flexibility in scheduling classes has been a blessing. My daughter's tutor adjusts the timing according to her school activities and exams. Highly recommended!"`,
            authorName: "Sunita Patel",
            authorDetails: "Mother of Class 7 student, Kolar Road",
            authorImage: "https://randomuser.me/api/portraits/women/48.jpg",
            rating: 5
        },
        // More testimonials added dynamically
        {
            content: `"TutoPlus made it so easy to find a great English tutor for my son. The tutor's experience shows in the improvement we have seen in his communication skills."`,
            authorName: "Anil Kumar",
            authorDetails: "Father of Class 8 student, MP Nagar",
            authorImage: "https://randomuser.me/api/portraits/men/40.jpg",
            rating: 5
        },
        {
            content: `"Very impressed with the quality of tutors on TutoPlus. The verification process gives peace of mind, and the progress my daughter made in History is amazing."`,
            authorName: "Meena Joshi",
            authorDetails: "Mother of Class 10 student, Arera Colony",
            authorImage: "https://randomuser.me/api/portraits/women/35.jpg",
            rating: 4
        },
        {
            content: `"The regular updates from tutors through TutoPlus helped me track my son's improvement easily. The platform is trustworthy and easy to use."`,
            authorName: "Rakesh Singh",
            authorDetails: "Father of Class 12 student, Kolar Road",
            authorImage: "https://randomuser.me/api/portraits/men/22.jpg",
            rating: 5
        },
    ];

    // Function to generate stars html based on rating
    function getStarsHtml(rating) {
        let fullStars = Math.floor(rating);
        let halfStar = rating % 1 >= 0.5;
        let starsHtml = '';

        for (let i = 0; i < fullStars; i++) {
            starsHtml += `<i class="fas fa-star"></i>`;
        }
        if (halfStar) {
            starsHtml += `<i class="fas fa-star-half-alt"></i>`;
        }
        let emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        for (let j = 0; j < emptyStars; j++) {
            starsHtml += `<i class="far fa-star"></i>`;
        }
        return starsHtml;
    }

    const slider = document.getElementById('testimonials-slider');
    // Render testimonials dynamically
    function renderTestimonials() {
        slider.innerHTML = ''; // clear

        testimonials.forEach(testimonial => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            card.innerHTML = `
                <div class="testimonial-content">
                    <p>${testimonial.content}</p>
                </div>
                <div class="testimonial-author">
                    <div class="author-image">
                        <img src="${testimonial.authorImage}" alt="Testimonial Author">
                    </div>
                    <div class="author-info">
                        <h4>${testimonial.authorName}</h4>
                        <p>${testimonial.authorDetails}</p>
                        <div class="rating">
                            ${getStarsHtml(testimonial.rating)}
                        </div>
                    </div>
                </div>
            `;
            slider.appendChild(card);
        });
    }

    renderTestimonials();


    // Carousel Controls
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');

    let currentIndex = 0;
    const total = testimonials.length;

    // Auto Slide
    let autoSlide = true
    const autoSlideInterval = setInterval(() => {
        if (autoSlide) {
            if (currentIndex >= total - 1) {
                currentIndex = 0;
            }
            else currentIndex++
            updateCarousel()
        }
    }, 2400);

    function updateCarousel() {
        const gap = '20px';
        const translateValue = `calc(-${currentIndex * 100}% - ${currentIndex * parseInt(gap)}px)`;

        // const translateValue = (currentIndex * 100);
        slider.style.transform = `translateX(${translateValue})`;
        slider.style.gap = gap
        // Optional: disable buttons if at start or end
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === total - 1;
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
            if (autoSlideInterval)
                clearInterval(autoSlideInterval);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < total - 1) {
            currentIndex++;
            updateCarousel();
            if (autoSlideInterval)
                clearInterval(autoSlideInterval);
        }
    });

    updateCarousel();


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

    // // Testimonials Slider
    // const testimonialSlider = document.querySelector('.testimonials-slider');
    // const testimonialCards = document.querySelectorAll('.testimonial-card');
    // const prevBtn = document.getElementById('prev-testimonial');
    // const nextBtn = document.getElementById('next-testimonial');

    // if (testimonialSlider && testimonialCards.length > 0 && prevBtn && nextBtn) {
    //     let currentIndex = 0;

    //     // Function to slide to specific testimonial
    //     function showTestimonial(index) {
    //         if (index < 0) {
    //             currentIndex = testimonialCards.length - 1;
    //         } else if (index >= testimonialCards.length) {
    //             currentIndex = 0;
    //         } else {
    //             currentIndex = index;
    //         }

    //         testimonialSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
    //     }

    //     // Event listeners for navigation buttons
    //     nextBtn.addEventListener('click', () => {
    //         showTestimonial(currentIndex + 1);
    //     });

    //     prevBtn.addEventListener('click', () => {
    //         showTestimonial(currentIndex - 1);
    //     });

    //     // Auto-slide every 5 seconds
    //     setInterval(() => {
    //         showTestimonial(currentIndex + 1);
    //     }, 5000);
    // }

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


const otherAreaInputHTML = `                        
    <label for="area">Enter Other Area</label>
    <input class="form-control" type="search" id="area" name="area" placeholder="Enter Other Area" minlength="2" maxlength="100" pattern="^[a-zA-Z\s]{2,40}$" required>
`

const areaSelectInput = `
    <select id="area" name="area" required onchange="areaChanged()">
        <option value="" disabled selected>Select Area</option>
        <option value="Arera Colony">Arera Colony</option>
        <option value="Kolar Road">Kolar Road</option>
        <option value="MP Nagar">MP Nagar</option>
        <option value="Shahpura">Shahpura</option>
        <option value="Bairagarh">Bairagarh</option>
        <option value="Talaiya">Talaiya</option>
        <option value="Bittan Market">Bittan Market</option>
        <option value="other">Other</option>
    </select>
`

function areaChanged() {
    const value = document.getElementById('area').value
    if (value.toLowerCase() === 'other') {
        document.getElementById('area-select').innerHTML = otherAreaInputHTML
    }
}

function inputChanged() {
    const value = document.getElementById('area').value
    if (value == '') {
        
    }
}


const otherClassInputHTML = `                        
    <label for="student-class">Enter Other Class</label>
    <input class="form-control" type="search" id="student-class" name="student-class" placeholder="Enter Other Class" minlength="2" maxlength="30" pattern="^[a-zA-Z\s]{2,40}$" required>
`
function onClassChange() {
    const value = document.getElementById('student-class').value
    if (value.toLowerCase() === 'others') {
        document.getElementById('class-select').innerHTML = otherClassInputHTML
    }
}