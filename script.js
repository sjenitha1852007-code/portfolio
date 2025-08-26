document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // 2. Animate Skill Progress Circles
    const progressCircles = document.querySelectorAll('.progress-circle');

    const animateSkillCircles = () => {
        progressCircles.forEach(circle => {
            const percentage = circle.getAttribute('data-percentage');
            const degree = (percentage / 100) * 360;
            
            // Set the custom CSS variable for the conic gradient
            circle.style.setProperty('--gradient-angle', `${degree}deg`);
        });
    };

    // Use Intersection Observer to trigger the animation when the skills section is visible
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillCircles();
                    observer.unobserve(entry.target); // Stop observing once the animation is triggered
                }
            });
        }, {
            threshold: 0.5 // Trigger when 50% of the section is visible
        });
        observer.observe(skillsSection);
    }

    // 3. Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close the mobile menu after clicking a link
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // 4. Fade-in Animation for Sections on Scroll
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.animation = 'fadeIn 1s forwards';
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the section is visible
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

});