// hero section start here ===================================================================================
// Mobile Menu Toggle
const lionfitHamburger = document.getElementById('lionfitHamburger');
const lionfitNavLinks = document.getElementById('lionfitNavLinks');

lionfitHamburger.addEventListener('click', () => {
    lionfitHamburger.classList.toggle('open');
    lionfitNavLinks.classList.toggle('active');

    // Toggle body scroll when menu is open
    if (lionfitNavLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.lionfit-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        lionfitHamburger.classList.remove('open');
        lionfitNavLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});


//calendly trigger

document.addEventListener("DOMContentLoaded", function () {
    // Elements
    const paymentTrigger = document.querySelector(".payment-trigger");
    const paymentModal = document.getElementById("paymentModal");
    const closeModalBtn = document.querySelector(".close-modal");
    const phonePayButton = document.getElementById("phonePayButton");
    const paymentLoader = document.getElementById("paymentLoader");
    const successMessage = document.getElementById("paymentSuccessMessage");

    // PhonePe payment gateway URL - Replace this with your actual URL when available
    const phonePayUrl = "YOUR_PHONEPAY_PAYMENT_URL";

    // Calendly URL
    const calendlyUrl = "https://calendly.com/thefitnesscatalyst02";

    // Check if user is coming back after payment
    function checkPaymentStatus() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('status') === 'success' || urlParams.get('status') === 'paid') {
            successMessage.style.display = "block";

            // Store payment status in localStorage
            localStorage.setItem('paymentStatus', 'paid');
        }

        // Check localStorage for payment status
        if (localStorage.getItem('paymentStatus') === 'paid') {
            successMessage.style.display = "block";
        }
    }

    // Open payment modal
    paymentTrigger.addEventListener("click", function () {
        // If already paid, open Calendly directly
        if (localStorage.getItem('paymentStatus') === 'paid') {
            openCalendly();
            return;
        }

        paymentModal.style.display = "block";
    });

    // Close modal
    closeModalBtn.addEventListener("click", function () {
        paymentModal.style.display = "none";
    });

    // Close modal if clicked outside
    window.addEventListener("click", function (event) {
        if (event.target === paymentModal) {
            paymentModal.style.display = "none";
        }
    });

    // Initiate PhonePe payment
    phonePayButton.addEventListener("click", function () {
        // Show loading spinner
        phonePayButton.style.display = "none";
        paymentLoader.style.display = "block";

        // Redirect to PhonePe after brief delay to show loading
        setTimeout(function () {
            window.location.href = phonePayUrl;
        }, 1000);
    });

    // Open Calendly
    function openCalendly() {
        Calendly.initPopupWidget({
            url: calendlyUrl
        });
    }

    // Calendly trigger
    document.body.addEventListener("click", function (e) {
        if (e.target.classList.contains("calendly-trigger")) {
            openCalendly();
            e.preventDefault();
        }
    });

    // Check payment status on page load
    checkPaymentStatus();
});



// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('lionfitMainNav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Slider Functionality
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.lionfit-slide');
    const controlBtns = document.querySelectorAll('.lionfit-control-btn');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 2000; //  seconds

    // Initialize slider
    function initSlider() {
        // Start auto-sliding
        slideInterval = setInterval(nextSlide, slideDuration);

        // Add click events to control buttons
        controlBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                goToSlide(slideIndex);
            });
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        // Reset current slide and control
        slides[currentSlide].classList.remove('active');
        controlBtns[currentSlide].classList.remove('active');

        // Update current slide
        currentSlide = index;

        // Activate new slide and control
        slides[currentSlide].classList.add('active');
        controlBtns[currentSlide].classList.add('active');

        // Reset timer
        resetInterval();
    }

    // Go to next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    }

    // Reset auto-slide interval
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    // Pause on hover
    const slider = document.querySelector('.lionfit-slider');
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', resetInterval);

    // Initialize the slider
    initSlider();

    // Animate menu items when menu opens
    const menuItems = document.querySelectorAll('.lionfit-nav-links li');

    function animateMenuItems() {
        menuItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    // Initialize
    animateMenuItems();
});
// header section end here ===================================================================================

// image scroll start here ================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Select sections using the new class name
    const sections = document.querySelectorAll('.imagescroll_section_block');
    let ticking = false;

    // Function to check if sections are in viewport and add visibility state class
    const checkSectionsVisibility = () => {
        const triggerBottom = window.innerHeight * 0.8;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            // Use the new state class name
            if (sectionTop < triggerBottom) {
                section.classList.add('imagescroll_state_visible');
            } else {
                // Optional: remove class if you want fade out on scroll up
                // section.classList.remove('imagescroll_state_visible');
            }
        });
    };

    // Function to handle parallax effect on scroll
    const handleScrollEffects = () => {
        const scrollTop = window.scrollY;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = (rect.top < window.innerHeight && rect.bottom >= 0);

            if (isVisible && window.innerWidth > 768) {
                const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + section.offsetHeight);
                const translateValue = Math.min(Math.max(scrollPercent, 0), 1);

                // Select images using the new class names
                const img1 = section.querySelector('.imagescroll_bg_image_left');
                const img2 = section.querySelector('.imagescroll_bg_image_right');

                if (img1 && img2) {
                    const translateY1 = -100 + (translateValue * 200);
                    const translateY2 = 100 - (translateValue * 200);
                    const scaleValue = 1 + translateValue * 0.05;
                    const opacityValue = 0.6 + (translateValue * 0.4);

                    img1.style.transform = `translateY(${translateY1}px) scale(${scaleValue})`;
                    img2.style.transform = `translateY(${translateY2}px) scale(${scaleValue})`;
                    img1.style.opacity = opacityValue;
                    img2.style.opacity = opacityValue;
                }
            }
        });
    };

    // Scroll Event Listener with Throttling
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                checkSectionsVisibility();
                handleScrollEffects();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Add hover effects to buttons using Animate.css
    // Select buttons using the new class name
    const buttons = document.querySelectorAll('.imagescroll_action_button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            // Animate.css classes remain unchanged
            button.classList.add('animate__animated', 'animate__pulse');
        });

        button.addEventListener('mouseleave', () => {
            // Animate.css classes remain unchanged
            button.classList.remove('animate__animated', 'animate__pulse');
        });
    });

    // --- Initial Check ---
    checkSectionsVisibility();
    handleScrollEffects();

});




// image scroll end here  ==================================================================















//get in touch section start here =========================================================================================================
// Interactive hover effect for banner background - Using new class names
const heroVista = document.querySelector('.rimberio-hero-vista'); // Was: banner
const ambientOrbAlpha = document.querySelector('.rimberio-ambient-orb.orb-alpha'); // Was: bg-effect.one
const ambientOrbBeta = document.querySelector('.rimberio-ambient-orb.orb-beta'); // Was: bg-effect.two

// Ensure the elements exist before adding listener
if (heroVista && ambientOrbAlpha && ambientOrbBeta) {
    heroVista.addEventListener('mousemove', (e) => {
        const xRatio = e.clientX / window.innerWidth;
        const yRatio = e.clientY / window.innerHeight;

        // Check if elements still exist (might be removed by other scripts)
        if (ambientOrbAlpha) {
            ambientOrbAlpha.style.left = `${e.clientX - 150}px`;
            ambientOrbAlpha.style.top = `${e.clientY - 150}px`;
        }
        if (ambientOrbBeta) {
            ambientOrbBeta.style.right = `${window.innerWidth - e.clientX - 150}px`;
            ambientOrbBeta.style.bottom = `${window.innerHeight - e.clientY - 150}px`;
        }
    });
} else {
    console.error("Could not find one or more elements for the background effect script.");
}

// 





























//get in touch section end here =========================================================================================================



//footer section start here =========================================================================================================
// Create animated floating elements in the background
document.addEventListener('DOMContentLoaded', function () {
    const footerElements = document.querySelector('.new-footer-floatingelements');

    // Create 10 initial floating elements
    for (let i = 0; i < 10; i++) {
        createFloatingElement();
    }

    // Function to create a single floating element
    function createFloatingElement() {
        const element = document.createElement('div');
        element.classList.add('new-footer-floatingelement');

        // Random size between 50px and 200px
        const size = Math.random() * 150 + 50;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;

        // Random position
        const posX = Math.random() * 100;
        element.style.left = `${posX}%`;

        // Random animation duration
        const duration = Math.random() * 5 + 8;
        element.style.animationDuration = `${duration}s`;

        // Random delay
        const delay = Math.random() * 5;
        element.style.animationDelay = `${delay}s`;

        footerElements.appendChild(element);

        // Remove and recreate when animation ends
        setTimeout(() => {
            element.remove();
            createFloatingElement();
        }, (duration + delay) * 1000);
    }

    // Back to top button functionality
    const scrollTopBtn = document.querySelector('.new-footer-scrolltop');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

//footer section end here =========================================================================================================