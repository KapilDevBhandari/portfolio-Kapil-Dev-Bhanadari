// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const form = document.querySelector('.contact-form');

// Section colors for nav links
const sectionColors = {
    home: '#2563eb',      // Blue
    about: '#059669',     // Green
    skills: '#7c3aed',    // Purple
    projects: '#dc2626',  // Red
    resume: '#d97706',    // Orange
    blog: '#0891b2',      // Cyan
    contact: '#4f46e5'    // Indigo
};

// Navbar Scroll Effect with Section-based Link Colors
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    // Find the current section
    let currentSection = 'home';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset for better detection
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.id;
        }
    });
    
    // Update navbar style
    if (scrollPosition > 50) {
        navbar.style.background = 'var(--bg-color)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
    
    // Update nav links color based on current section
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
            link.style.color = sectionColors[currentSection];
        } else {
            link.style.color = 'var(--text-color)';
        }
    });
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    themeToggle.querySelector('i').classList.toggle('fa-sun');
    themeToggle.querySelector('i').classList.toggle('fa-moon');
    localStorage.setItem('theme', document.body.dataset.theme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.dataset.theme = savedTheme;
    if (savedTheme === 'dark') {
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
}

// Project Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
                hamburger.classList.remove('active');
            }
        }
    });
});

// Form Validation and Submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Basic form validation
    let isValid = true;
    form.querySelectorAll('input, textarea').forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    if (!isValid) {
        alert('Please fill in all fields');
        return;
    }
    
    // Here you would typically send the form data to a server
    // For now, we'll just log it and show a success message
    console.log('Form data:', data);
    alert('Message sent successfully!');
    form.reset();
});

// Animate progress bars on scroll
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            bar.style.width = bar.parentElement.dataset.progress || '0%';
        }
    });
};

window.addEventListener('scroll', animateProgressBars);
window.addEventListener('load', animateProgressBars);

// Typing animation for hero section
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    const type = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    type();
};

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        typeWriter(heroTitle, text);
    }
});

// Add hover effect to project cards
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Video Showcase Functionality
const videoWrapper = document.querySelector('.video-wrapper');
const video = document.querySelector('#portfolio-video');
const videoOverlay = document.querySelector('.video-overlay');
const playButton = document.querySelector('.play-button');

if (videoWrapper && video && videoOverlay && playButton) {
    // Play video when clicking the overlay or play button
    const playVideo = () => {
        video.play();
        videoOverlay.style.display = 'none';
    };

    videoOverlay.addEventListener('click', playVideo);
    playButton.addEventListener('click', playVideo);

    // Show overlay when video ends
    video.addEventListener('ended', () => {
        videoOverlay.style.display = 'flex';
    });

    // Pause video when it's not in viewport
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && !video.paused) {
                video.pause();
                videoOverlay.style.display = 'flex';
            }
        });
    }, { threshold: 0.5 });

    videoObserver.observe(videoWrapper);

    // Add loading animation
    video.addEventListener('loadstart', () => {
        videoWrapper.classList.add('loading');
    });

    video.addEventListener('canplay', () => {
        videoWrapper.classList.remove('loading');
    });
} 