// ===== GLOBAL VARIABLES =====
let currentTestimonial = 0;
let testimonialInterval;
let isTyping = false;
let currentRoleIndex = 0;
let typingTimeout;
let skillsAnimated = false;
let statsAnimated = false;
let particlesEnabled = true;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializePortfolio();
});

// ===== MAIN INITIALIZATION FUNCTION =====
function initializePortfolio() {
    // Check if portfolioData is available
    if (typeof portfolioData === 'undefined') {
        console.error('Portfolio data not found. Make sure data.js is loaded.');
        return;
    }

    // Initialize all components
    initializeTheme();
    populateContent();
    initializeNavigation();
    initializeAnimations();
    initializeInteractions();
    initializeFormHandling();
    
    // Remove loading screen after everything is loaded
    setTimeout(() => {
        hideLoadingScreen();
    }, 1500);
}

// ===== THEME MANAGEMENT =====
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || portfolioData.config.theme.defaultTheme;
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Theme toggle event listener
    if (themeToggle && portfolioData.config.theme.enableThemeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('#theme-toggle i');
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ===== CONTENT POPULATION =====
function populateContent() {
    populatePersonalInfo();
    populateBranding();
    populateAboutSection();
    populateSkills();
    populateProjects();
    populateExperience();
    populateServices();
    populateTestimonials();
    populateBlog();
    populateContact();
    populateSEO();
}

function populatePersonalInfo() {
    const { personal } = portfolioData;
    
    // Update page title
    document.getElementById('page-title').textContent = `${personal.name} - ${personal.title}`;
    
    // Hero section
    document.getElementById('hero-greeting').textContent = "Hello, I'm";
    document.getElementById('hero-name').textContent = personal.name;
    document.getElementById('hero-description').textContent = personal.description;
    
    // Profile images
    const heroImage = document.getElementById('hero-profile-image');
    const aboutImage = document.getElementById('about-profile-image');
    
    if (heroImage && personal.profileImage) {
        heroImage.src = personal.profileImage;
        heroImage.alt = `${personal.name} - Profile Picture`;
    }
    
    if (aboutImage && personal.aboutImage) {
        aboutImage.src = personal.aboutImage;
        aboutImage.alt = `${personal.name} - About Picture`;
    }
    
    // Start typing animation
    if (personal.roles && personal.roles.length > 0) {
        startTypingAnimation(personal.roles);
    }
}

function populateBranding() {
    const { branding } = portfolioData;
    
    // Update logo text
    const navLogo = document.getElementById('nav-logo-text');
    const footerLogo = document.getElementById('footer-logo-text');
    
    if (navLogo) navLogo.textContent = branding.logo;
    if (footerLogo) footerLogo.textContent = branding.logo;
    
    // Update footer content
    const footerDescription = document.getElementById('footer-description');
    const footerCopyright = document.getElementById('footer-copyright');
    
    if (footerDescription) footerDescription.textContent = branding.footerText;
    if (footerCopyright) footerCopyright.textContent = branding.copyright;
}

function populateAboutSection() {
    const { about } = portfolioData;
    
    // About intro
    const aboutIntro = document.getElementById('about-intro');
    if (aboutIntro) {
        aboutIntro.innerHTML = `<p>${about.intro}</p>`;
    }
    
    // About details
    const aboutDetails = document.getElementById('about-details');
    if (aboutDetails && about.details) {
        aboutDetails.innerHTML = about.details.map(detail => `<p>${detail}</p>`).join('');
    }
    
    // Stats
    if (about.stats) {
        const statProjects = document.querySelector('#stat-projects .stat-number');
        const statExperience = document.querySelector('#stat-experience .stat-number');
        const statClients = document.querySelector('#stat-clients .stat-number');
        
        if (statProjects) statProjects.textContent = about.stats.projects;
        if (statExperience) statExperience.textContent = about.stats.experience;
        if (statClients) statClients.textContent = about.stats.clients;
    }
}

function populateSkills() {
    const { skills } = portfolioData;
    const skillsContainer = document.getElementById('skills-categories');
    
    if (!skillsContainer || !skills.categories) return;
    
    skillsContainer.innerHTML = skills.categories.map(category => `
        <div class="skill-category animate-on-scroll">
            <h3><i class="${category.icon}"></i> ${category.name}</h3>
            <div class="skills-list">
                ${category.skills.map(skill => `
                    <div class="skill-item">
                        <div class="skill-info">
                            <span class="skill-name">${skill.name}</span>
                            <span class="skill-level">${skill.level}</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" data-percentage="${skill.percentage}"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function populateProjects() {
    const { projects } = portfolioData;
    const projectsGrid = document.getElementById('projects-grid');
    
    if (!projectsGrid || !projects) return;
    
    // Show featured projects first, then others
    const featuredProjects = projects.filter(project => project.featured);
    const otherProjects = projects.filter(project => !project.featured);
    const displayProjects = [...featuredProjects, ...otherProjects].slice(0, 6);
    
    projectsGrid.innerHTML = displayProjects.map(project => `
        <div class="project-card animate-on-scroll" data-category="${project.category}" onclick="openProjectModal(${project.id})">
            <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.liveUrl ? `<a href="${project.liveUrl}" class="project-link" target="_blank" onclick="event.stopPropagation()"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                    ${project.githubUrl ? `<a href="${project.githubUrl}" class="project-link" target="_blank" onclick="event.stopPropagation()"><i class="fab fa-github"></i> Source Code</a>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function populateExperience() {
    const { experience } = portfolioData;
    
    // Work experience
    const workTimeline = document.getElementById('timeline-work');
    if (workTimeline && experience.work) {
        workTimeline.innerHTML = experience.work.map(work => `
            <div class="timeline-item animate-on-scroll">
                <div class="timeline-date">${work.date}</div>
                <h3 class="timeline-title">${work.title}</h3>
                <div class="timeline-company">${work.company} - ${work.location}</div>
                <p class="timeline-description">${work.description}</p>
                ${work.achievements ? `
                    <ul class="timeline-achievements">
                        ${work.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `).join('');
    }
    
    // Education
    const educationTimeline = document.getElementById('timeline-education');
    if (educationTimeline && experience.education) {
        educationTimeline.innerHTML = experience.education.map(edu => `
            <div class="timeline-item animate-on-scroll">
                <div class="timeline-date">${edu.date}</div>
                <h3 class="timeline-title">${edu.title}</h3>
                <div class="timeline-company">${edu.institution} - ${edu.location}</div>
                <p class="timeline-description">${edu.description}</p>
                ${edu.achievements ? `
                    <ul class="timeline-achievements">
                        ${edu.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `).join('');
    }
    
    // Certifications
    const certificationsTimeline = document.getElementById('timeline-certifications');
    if (certificationsTimeline && experience.certifications) {
        certificationsTimeline.innerHTML = experience.certifications.map(cert => `
            <div class="timeline-item animate-on-scroll">
                <div class="timeline-date">${cert.date}</div>
                <h3 class="timeline-title">${cert.title}</h3>
                <div class="timeline-company">${cert.issuer}</div>
                <p class="timeline-description">${cert.description}</p>
                ${cert.credentialId ? `<p class="timeline-credential">Credential ID: ${cert.credentialId}</p>` : ''}
            </div>
        `).join('');
    }
}

function populateServices() {
    const { services } = portfolioData;
    const servicesGrid = document.getElementById('services-grid');
    const footerServices = document.getElementById('footer-services');
    
    if (servicesGrid && services) {
        servicesGrid.innerHTML = services.map(service => `
            <div class="service-card animate-on-scroll">
                <div class="service-icon">
                    <i class="${service.icon}"></i>
                </div>
                <h3 class="service-title">${service.title}</h3>
                <p class="service-description">${service.description}</p>
            </div>
        `).join('');
    }
    
    if (footerServices && services) {
        footerServices.innerHTML = services.slice(0, 4).map(service => `
            <li><a href="#services">${service.title}</a></li>
        `).join('');
    }
}

function populateTestimonials() {
    const { testimonials } = portfolioData;
    const testimonialsContainer = document.getElementById('testimonials-container');
    const testimonialsDots = document.getElementById('testimonials-dots');
    
    if (testimonialsContainer && testimonials && testimonials.length > 0) {
        testimonialsContainer.innerHTML = testimonials.map((testimonial, index) => `
            <div class="testimonial-item ${index === 0 ? 'active' : ''}" data-index="${index}">
                <p class="testimonial-text">"${testimonial.text}"</p>
                <div class="testimonial-author">
                    <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-avatar">
                    <div class="testimonial-info">
                        <h4>${testimonial.name}</h4>
                        <p>${testimonial.position} at ${testimonial.company}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    if (testimonialsDots && testimonials && testimonials.length > 0) {
        testimonialsDots.innerHTML = testimonials.map((_, index) => `
            <div class="testimonial-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
        `).join('');
    } else {
        // Hide testimonials section if no testimonials
        const testimonialsSection = document.getElementById('testimonials');
        if (testimonialsSection) testimonialsSection.style.display = 'none';
    }
    
    // Initialize testimonials slider
    initializeTestimonialsSlider();
}

function populateBlog() {
    const { blog } = portfolioData;
    const blogGrid = document.getElementById('blog-grid');
    
    if (blogGrid && blog && blog.length > 0 && portfolioData.config.features.enableBlog) {
        blogGrid.innerHTML = blog.map(post => `
            <article class="blog-card animate-on-scroll">
                <img src="${post.image}" alt="${post.title}" class="blog-image" loading="lazy">
                <div class="blog-content">
                    <div class="blog-meta">
                        <span><i class="fas fa-calendar"></i> ${post.date}</span>
                        <span><i class="fas fa-clock"></i> ${post.readTime}</span>
                        <span><i class="fas fa-tag"></i> ${post.category}</span>
                    </div>
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <a href="${post.url}" class="blog-read-more" target="_blank">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `).join('');
    } else {
        const blogSection = document.getElementById('blog');
        if (blogSection) blogSection.style.display = 'none';
    }
}

function populateContact() {
    const { personal, contact, social } = portfolioData;
    
    // Contact information
    const contactEmail = document.querySelector('#contact-email .contact-details p');
    const contactPhone = document.querySelector('#contact-phone .contact-details p');
    const contactLocation = document.querySelector('#contact-location .contact-details p');
    const contactDescription = document.getElementById('contact-description');
    
    if (contactEmail) contactEmail.textContent = personal.email;
    if (contactPhone) {
        if (personal.phone) {
            contactPhone.textContent = personal.phone;
        } else {
            document.getElementById('contact-phone').style.display = 'none';
        }
    }
    if (contactLocation) contactLocation.textContent = personal.location;
    if (contactDescription) contactDescription.textContent = contact.description;
    
    // Social links
    const socialLinksContainer = document.getElementById('social-links');
    const footerSocial = document.getElementById('footer-social');
    
    if (socialLinksContainer && social) {
        socialLinksContainer.innerHTML = social.map(platform => `
            <a href="${platform.url}" class="social-link" target="_blank" rel="noopener noreferrer" style="--hover-color: ${platform.color}">
                <i class="${platform.icon}"></i>
            </a>
        `).join('');
    }
    
    if (footerSocial && social) {
        footerSocial.innerHTML = social.map(platform => `
            <a href="${platform.url}" class="social-link" target="_blank" rel="noopener noreferrer">
                <i class="${platform.icon}"></i>
            </a>
        `).join('');
    }
}

function populateSEO() {
    const { seo } = portfolioData;
    
    // Update meta tags
    document.title = seo.title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.content = seo.description;
    
    // Add additional meta tags if they don't exist
    addMetaTag('keywords', seo.keywords);
    addMetaTag('author', seo.author);
    
    // Open Graph tags
    addMetaTag('og:title', seo.title, 'property');
    addMetaTag('og:description', seo.description, 'property');
    addMetaTag('og:image', seo.image, 'property');
    addMetaTag('og:type', 'website', 'property');
    
    // Twitter Card tags
    addMetaTag('twitter:card', 'summary_large_image', 'name');
    addMetaTag('twitter:title', seo.title, 'name');
    addMetaTag('twitter:description', seo.description, 'name');
    addMetaTag('twitter:image', seo.image, 'name');
}

function addMetaTag(name, content, attribute = 'name') {
    if (!document.querySelector(`meta[${attribute}="${name}"]`)) {
        const meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        meta.content = content;
        document.head.appendChild(meta);
    }
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
    
    // Active navigation highlighting
    updateActiveNavigation();
    window.addEventListener('scroll', updateActiveNavigation);
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Initialize particles if enabled
    if (portfolioData.config.features.enableParticles) {
        initializeParticles();
    }
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize counter animations
    initializeCounterAnimations();
    
    // Initialize skills progress bars
    initializeSkillsAnimation();
}

function initializeParticles() {
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) return;
    
    const particleCount = portfolioData.config.animations.particleCount || 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation delay
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    
    container.appendChild(particle);
}

function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        },
        { threshold: 0.1, rootMargin: '-50px' }
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    animateCounters();
                    statsAnimated = true;
                }
            });
        },
        { threshold: 0.5 }
    );
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 40);
    });
}

function initializeSkillsAnimation() {
    const skillsSection = document.getElementById('skills');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !skillsAnimated) {
                    animateSkillBars();
                    skillsAnimated = true;
                }
            });
        },
        { threshold: 0.3 }
    );
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const percentage = bar.getAttribute('data-percentage');
            bar.style.width = percentage + '%';
        }, index * 100);
    });
}

// ===== TYPING ANIMATION =====
function startTypingAnimation(roles) {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement || !roles.length) return;
    
    let currentText = '';
    let isDeleting = false;
    
    function type() {
        const currentRole = roles[currentRoleIndex];
        const typingSpeed = portfolioData.config.animations.typingSpeed || 100;
        const deletingSpeed = typingSpeed / 2;
        
        if (isDeleting) {
            currentText = currentRole.substring(0, currentText.length - 1);
        } else {
            currentText = currentRole.substring(0, currentText.length + 1);
        }
        
        typingElement.textContent = currentText;
        
        let timeout = isDeleting ? deletingSpeed : typingSpeed;
        
        if (!isDeleting && currentText === currentRole) {
            timeout = portfolioData.config.animations.typingDelay || 2000;
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            timeout = 500;
        }
        
        typingTimeout = setTimeout(type, timeout);
    }
    
    type();
}

// ===== INTERACTIONS =====
function initializeInteractions() {
    // Project filtering
    initializeProjectFiltering();
    
    // Experience tabs
    initializeExperienceTabs();
    
    // Back to top button
    initializeBackToTop();
    
    // Modal functionality
    initializeModals();
    
    // Smooth scrolling for anchor links
    initializeSmoothScrolling();
    
    // Load more projects
    initializeLoadMoreProjects();
}

function initializeProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function initializeExperienceTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const timelineContents = document.querySelectorAll('.timeline-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show/hide content
            timelineContents.forEach(content => {
                if (content.id === `timeline-${targetTab}`) {
                    content.style.display = 'block';
                    setTimeout(() => {
                        content.style.opacity = '1';
                    }, 50);
                } else {
                    content.style.opacity = '0';
                    setTimeout(() => {
                        content.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton && portfolioData.config.features.enableBackToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function initializeModals() {
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeProjectModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeProjectModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
}

function openProjectModal(projectId) {
    const project = portfolioData.projects.find(p => p.id === projectId);
    if (!project) return;
    
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalBody) return;
    
    modalBody.innerHTML = `
        <div class="project-modal-content">
            <img src="${project.image}" alt="${project.title}" class="project-modal-image">
            <div class="project-modal-info">
                <h2 class="project-modal-title">${project.title}</h2>
                <p class="project-modal-description">${project.description}</p>
                
                ${project.details ? `
                    <div class="project-modal-details">
                        <h3>Overview</h3>
                        <p>${project.details.overview}</p>
                        
                        ${project.details.features ? `
                            <h3>Key Features</h3>
                            <ul>
                                ${project.details.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        ` : ''}
                        
                        ${project.details.challenges ? `
                            <h3>Challenges & Solutions</h3>
                            <p><strong>Challenge:</strong> ${project.details.challenges}</p>
                            <p><strong>Solution:</strong> ${project.details.solution}</p>
                        ` : ''}
                    </div>
                ` : ''}
                
                <div class="project-modal-tech">
                    <h3>Technologies Used</h3>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="project-modal-links">
                    ${project.liveUrl ? `<a href="${project.liveUrl}" class="btn btn-primary" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                    ${project.githubUrl ? `<a href="${project.githubUrl}" class="btn btn-secondary" target="_blank"><i class="fab fa-github"></i> Source Code</a>` : ''}
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initializeLoadMoreProjects() {
    const loadMoreButton = document.getElementById('load-more-projects');
    if (!loadMoreButton) return;
    
    let projectsShown = 6;
    const totalProjects = portfolioData.projects.length;
    
    if (totalProjects <= projectsShown) {
        loadMoreButton.style.display = 'none';
    }
    
    loadMoreButton.addEventListener('click', () => {
        const remainingProjects = portfolioData.projects.slice(projectsShown, projectsShown + 3);
        const projectsGrid = document.getElementById('projects-grid');
        
        remainingProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card animate-on-scroll';
            projectCard.setAttribute('data-category', project.category);
            projectCard.onclick = () => openProjectModal(project.id);
            
            projectCard.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        ${project.liveUrl ? `<a href="${project.liveUrl}" class="project-link" target="_blank" onclick="event.stopPropagation()"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                        ${project.githubUrl ? `<a href="${project.githubUrl}" class="project-link" target="_blank" onclick="event.stopPropagation()"><i class="fab fa-github"></i> Source Code</a>` : ''}
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(projectCard);
        });
        
        projectsShown += 3;
        
        if (projectsShown >= totalProjects) {
            loadMoreButton.style.display = 'none';
        }
    });
}

// ===== TESTIMONIALS SLIDER =====
function initializeTestimonialsSlider() {
    if (portfolioData.testimonials.length === 0) return;
    const prevButton = document.getElementById('testimonial-prev');
    const nextButton = document.getElementById('testimonial-next');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            navigateTestimonial('prev');
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            navigateTestimonial('next');
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Auto-play testimonials
    startTestimonialAutoplay();
}

function navigateTestimonial(direction) {
    const totalTestimonials = portfolioData.testimonials.length;
    
    if (direction === 'next') {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    } else {
        currentTestimonial = currentTestimonial === 0 ? totalTestimonials - 1 : currentTestimonial - 1;
    }
    
    showTestimonial(currentTestimonial);
}

function showTestimonial(index) {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    // Hide all testimonials
    testimonialItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show selected testimonial
    if (testimonialItems[index]) {
        testimonialItems[index].classList.add('active');
    }
    
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    currentTestimonial = index;
}

function startTestimonialAutoplay() {
    if (portfolioData.testimonials.length === 0) return;
    testimonialInterval = setInterval(() => {
        navigateTestimonial('next');
    }, 5000);
    
    // Pause autoplay on hover
    const testimonialsContainer = document.getElementById('testimonials-container');
    if (testimonialsContainer) {
        testimonialsContainer.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialsContainer.addEventListener('mouseleave', () => {
            startTestimonialAutoplay();
        });
    }
}

// ===== FORM HANDLING =====
function initializeFormHandling() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Form validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateFormField);
        input.addEventListener('input', clearFieldError);
    });
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const formStatus = document.getElementById('form-status');
    const submitButton = form.querySelector('.form-submit');
    
    // Validate form
    if (!validateForm(form)) {
        showFormMessage('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate form submission (replace with actual endpoint)
    if (portfolioData.config.form.endpoint && portfolioData.config.form.endpoint !== 'https://formspree.io/f/YOUR_FORM_ID') {
        fetch(portfolioData.config.form.endpoint, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showFormMessage(portfolioData.contact.formMessages.success, 'success');
                form.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showFormMessage(portfolioData.contact.formMessages.error, 'error');
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        });
    } else {
        console.warn("Form endpoint not configured in data.js. Simulating success.");
        // Simulate successful submission
        setTimeout(() => {
            showFormMessage(portfolioData.contact.formMessages.success, 'success');
            form.reset();
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }, 2000);
    }
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateFormField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateFormField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldType = field.type;
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error
    clearFieldError({ target: field });
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'This field is required.';
        isValid = false;
    }
    // Email validation
    else if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address.';
            isValid = false;
        }
    }
    // Name validation (no numbers)
    else if (field.name === 'name' && value) {
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(value)) {
            errorMessage = 'Name should only contain letters and spaces.';
            isValid = false;
        }
    }
    // Minimum length for message
    else if (field.name === 'message' && value && value.length < 10) {
        errorMessage = 'Message should be at least 10 characters long.';
        isValid = false;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function showFormMessage(message, type) {
    const formStatus = document.getElementById('form-status');
    if (!formStatus) return;
    
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
}

// ===== LOADING SCREEN =====
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen && portfolioData.config.features.enableLoadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    } else if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy loading for images
if (portfolioData.config.performance.lazyLoadImages) {
    document.addEventListener('DOMContentLoaded', () => {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// ===== CLEANUP =====
window.addEventListener('beforeunload', () => {
    // Clear intervals
    if (testimonialInterval) {
        clearInterval(testimonialInterval);
    }
    
    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }
});