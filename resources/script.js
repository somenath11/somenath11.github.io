document.addEventListener('DOMContentLoaded', () => {

    // --- DYNAMIC CONTENT RENDERING ---

    // 1. Render Hero Section
    const greetingEl = document.querySelector('.greeting');
    if (greetingEl) greetingEl.innerHTML = "Hello, I'm";

    document.getElementById('heroName').textContent = portfolioData.name;
    const heroRoleDisplay = document.getElementById('heroRoleDisplay');
    if (heroRoleDisplay) heroRoleDisplay.textContent = portfolioData.role;

    const heroMicroline = document.getElementById('heroMicroline');
    if (heroMicroline && portfolioData.microline) {
        heroMicroline.textContent = portfolioData.microline;
    }

    const heroBioEl = document.getElementById('heroBio');
    if (heroBioEl) heroBioEl.innerHTML = portfolioData.bio;



    // Update Hero Image
    const heroImageContainer = document.getElementById('heroImageContainer');
    if (heroImageContainer && portfolioData.heroImage) {
        const heroImageSmall = portfolioData.heroImage.replace('.webp', '-small.webp');
        heroImageContainer.innerHTML = `
            <div class="hero-image-wrapper">
                <img src="${portfolioData.heroImage}" 
                     srcset="${heroImageSmall} 600w, ${portfolioData.heroImage} 1200w"
                     sizes="(max-width: 768px) 300px, 400px"
                     alt="${portfolioData.name}" 
                     width="300" height="420"
                     fetchpriority="high">
            </div>
        `;
    }

    // Update both resume buttons
    // Update both resume buttons
    const heroResumeBtn = document.getElementById('heroResumeBtn');
    const contactResumeBtn = document.getElementById('contactResumeBtn');
    
    const downloadResumeBtn = document.getElementById('downloadResumeBtn');
    if (downloadResumeBtn) downloadResumeBtn.href = portfolioData.resumeLink;

    // Render Hero Socials (Buttons)
    const heroSocials = document.getElementById('heroSocials');
    if (heroSocials) {
        const { linkedin, github, email } = portfolioData.socialLinks;
        // Reference uses X, Github, Email. We use LinkedIn, Github, Email.
        heroSocials.innerHTML = `
            <a href="${linkedin}" target="_blank" class="social-pill linkedin">
                <span class="icon-container"><i data-lucide="linkedin"></i></span>
                <span class="social-label">LinkedIn</span>
            </a>
            <a href="${github}" target="_blank" class="social-pill github">
                <span class="icon-container"><i data-lucide="github"></i></span>
                <span class="social-label">Github</span>
            </a>
            <a href="${email}" class="social-pill email">
                <span class="icon-container"><i data-lucide="mail"></i></span>
                <span class="social-label">Email</span>
            </a>
        `;
        lucide.createIcons()
    }

    // Render Hero Highlights (Replacing Ticker)
    const heroSkillsContainer = document.getElementById('heroSkillsTicker');
    // We'll reuse the container but change the class in CSS or here
    heroSkillsContainer.className = 'hero-highlights'; // Change class
    heroSkillsContainer.innerHTML = ''; // Clear


    // 2. Render About Section (Redesigned)
    const knowledgeContainer = document.getElementById('knowledgeContainer');
    if (knowledgeContainer && portfolioData.about.domains) {
        knowledgeContainer.innerHTML = ''; // Clear
        portfolioData.about.domains.forEach((domain, index) => {
            const row = document.createElement('div');
            row.classList.add('knowledge-row', 'fade-up');
            // If you want alternating illustrations similar to the reference, 
            // you can uncomment the next line:
            if (index % 2 !== 0) row.classList.add('reverse');

            const techIconsHtml = domain.techIcons.map(icon => `<i data-lucide="${icon}"></i>`).join('');
            const bulletsHtml = domain.bullets.map(bullet => `<li>${bullet}</li>`).join('');

            row.innerHTML = `
                <div class="row-illustration">
                    <img src="${domain.illustration}" alt="${domain.title}" loading="lazy" width="400" height="300">
                </div>
                <div class="row-content">
                    <h3>${domain.title}</h3>
                    <div class="domain-tech-icons">
                        ${techIconsHtml}
                    </div>
                    <ul class="row-bullets">
                        ${bulletsHtml}
                    </ul>
                </div>
            `;
            knowledgeContainer.appendChild(row);
        });
        // Re-run lucide icons for the new elements
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // 3. Render Education Section
    const educationGrid = document.getElementById('educationGrid');
    if (educationGrid) {
        portfolioData.education.forEach(edu => {
            const card = document.createElement('div');
            card.className = 'edu-card fade-up';
            
            const logoHtml = edu.logo 
                ? `<div class="edu-logo-container"><img src="${edu.logo}" alt="${edu.badge}" class="edu-logo-img"></div>`
                : `<div class="edu-logo-container edu-logo-initials">${edu.badge}</div>`;

            card.innerHTML = `
                <div class="edu-card-top">
                    ${logoHtml}
                    <div class="edu-header-right">
                        <div class="edu-inst">${edu.institution}</div>
                        <div class="edu-years">${edu.years}</div>
                    </div>
                </div>
                <h3 class="edu-degree">${edu.degree}</h3>
                <div class="edu-location">${edu.location}</div>
                <hr class="edu-divider">
                <div class="edu-score-section">
                    <div class="edu-score-left">
                        <div class="edu-score-num">${edu.score}</div>
                        <div class="edu-score-label">${edu.scoreLabel}</div>
                    </div>
                    <div class="edu-tag">${edu.tag}</div>
                </div>
                <p class="edu-desc">${edu.description}</p>
            `;
            educationGrid.appendChild(card);
        });
    }

    // 4. Render Experience Section
    const experienceTimeline = document.getElementById('experienceTimeline');
    if (experienceTimeline) {
        // Helper to parse "Month Year" into Date object
        const parseDate = (dateStr) => {
            if (!dateStr) return new Date(0);
            const parts = dateStr.trim().split(' ');
            if (parts.length < 2) return new Date(0);
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = monthNames.indexOf(parts[0]);
            const year = parseInt(parts[1]);
            return new Date(year, month);
        };

        // Sort by End Date (Descending) - Latest First
        const sortedExperience = [...portfolioData.experience].sort((a, b) => {
            // Extract dates: "Nov 2023 - Dec 2023" -> ["Nov 2023", "Dec 2023"]
            const getEndDate = (duration) => {
                if (!duration) return new Date(0);
                const parts = duration.split('-');
                const endStr = parts[1] ? parts[1].trim() : parts[0].trim(); // If no end, use start (or handle 'Present')
                if (endStr.toLowerCase() === 'present' || endStr.toLowerCase() === 'ongoing') return new Date(); // Future/Now
                return parseDate(endStr);
            };

            return getEndDate(b.duration) - getEndDate(a.duration);
        });

        sortedExperience.forEach((exp, index) => {
            const item = document.createElement('div');
            item.classList.add('timeline-item', 'fade-up');
            item.style.transitionDelay = `${index * 0.1}s`;

            const metricsHtml = exp.metrics ? exp.metrics.map(m => `
                <span class="refined-exp-metric"><span class="metric-dot">•</span><span class="metric-text">${m.val} ${m.label}</span></span>
            `).join('') : '';

            const tagsHtml = exp.techStack ? exp.techStack.map(t => `
                <span class="refined-exp-skill">${t}</span>
            `).join('') : '';

            item.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="refined-exp-card">
                    <div class="refined-exp-header">
                        <div class="exp-header-content">
                            <div class="exp-header-top">
                                <div class="exp-title-wrapper">
                                    <h3 class="refined-exp-title">${exp.role}</h3>
                                </div>
                                <span class="refined-exp-badge">${exp.type}</span>
                            </div>
                            <div class="exp-header-bottom">
                                <p class="refined-exp-company">${exp.company} <span class="muted-dot">·</span> ${exp.location || 'Remote'}</p>
                                <p class="refined-exp-date">${exp.duration}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="refined-exp-body">
                        <div class="refined-exp-metrics">
                            ${metricsHtml}
                        </div>
                        
                        <p class="refined-exp-description">${exp.description}</p>
                        
                        <div class="refined-exp-skills">
                            ${tagsHtml}
                        </div>
                    </div>
                </div>
            `;
            experienceTimeline.appendChild(item);
        });
    }

    // 5. Render Projects Section

    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid) {
        projectsGrid.className = 'projects-grid-2col';
        projectsGrid.innerHTML = ''; 
        
        portfolioData.projects.forEach((project, index) => {
            const card = document.createElement('div');
            card.classList.add('project-card-v2', 'fade-up');
            card.style.transitionDelay = `${index * 0.1}s`;

            const techPillsHtml = project.techStack.map(tech => `<span>${tech}</span>`).join('');
            
            const insightHtml = project.keyInsight 
                ? `<div class="project-insight"><i data-lucide="zap"></i> ${project.keyInsight}</div>` 
                : '';

            card.innerHTML = `
                <div class="project-card-image">
                    <div class="project-image-wrapper">
                        <img src="${project.image}" alt="${project.title}" loading="lazy">
                    </div>
                </div>
                <div class="project-card-content">
                    <h3 class="project-title">${project.title}</h3>
                    ${insightHtml}
                    <div class="tech-stack-v2">${techPillsHtml}</div>
                    <div class="project-card-actions">
                        <button class="btn-primary open-modal-btn" data-index="${index}">View Details</button>
                        <a href="${project.codeLink}" class="btn-secondary" target="_blank"><i data-lucide="github"></i> Repository</a>
                    </div>
                </div>
            `;
            projectsGrid.appendChild(card);
        });

        // Modal Logic
        // Project Modal Logic
        const modal = document.getElementById('projectModal');
        const closeBtn = document.getElementById('modalCloseBtn');
        
        // Resume Modal Logic
        const resumeModal = document.getElementById('resumeModal');
        const resumeCloseBtn = document.getElementById('resumeModalCloseBtn');
        const resumeIframe = document.getElementById('resumeIframe');

        // Open Resume Modal
        document.querySelectorAll('.open-resume-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                if (resumeModal && resumeIframe) {
                    resumeIframe.src = portfolioData.resumeLink;
                    resumeModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close Resume Modal
        if (resumeCloseBtn && resumeModal) {
            resumeCloseBtn.addEventListener('click', () => {
                resumeModal.classList.remove('active');
                resumeIframe.src = ''; // Clear src to stop any loading
                document.body.style.overflow = '';
            });

            resumeModal.addEventListener('click', (e) => {
                if (e.target === resumeModal) {
                    resumeModal.classList.remove('active');
                    resumeIframe.src = '';
                    document.body.style.overflow = '';
                }
            });
        }

        if (modal && closeBtn) {
            // Open Modal
            document.querySelectorAll('.open-modal-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.currentTarget.getAttribute('data-index');
                    const proj = portfolioData.projects[idx];
                    
                    document.getElementById('modalTitle').textContent = proj.title;
                    document.getElementById('modalImage').src = proj.image;
                    
                    document.getElementById('modalProblem').textContent = proj.problem || 'N/A';
                    document.getElementById('modalDataset').textContent = proj.dataset || 'N/A';
                    document.getElementById('modalImpact').textContent = proj.businessImpact || 'N/A';
                    
                    const insightEl = document.getElementById('modalKeyInsight');
                    insightEl.textContent = proj.keyInsight || 'N/A';
                    
                    const approachList = document.getElementById('modalApproach');
                    approachList.innerHTML = proj.approach 
                        ? proj.approach.map(step => `<li>${step}</li>`).join('')
                        : '<li>N/A</li>';
                        
                    const toolsContainer = document.getElementById('modalTools');
                    toolsContainer.innerHTML = proj.techStack.map(t => `<span class="modal-tech-badge">${t}</span>`).join('');
                    
                    document.getElementById('modalCodeLink').href = proj.codeLink;
                    document.getElementById('modalDemoLink').href = proj.demoLink;
                    
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    lucide.createIcons();
                });
            });

            // Image Expansion Toggle
            document.querySelectorAll('.modal-image-wrapper').forEach(wrapper => {
                wrapper.addEventListener('click', (e) => {
                    e.stopPropagation();
                    wrapper.classList.toggle('expanded');
                });
            });
            
            // Close Modal Function
            const closeModal = () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                // Reset image expanded states
                document.querySelectorAll('.modal-image-wrapper').forEach(w => w.classList.remove('expanded'));
            };
            
            closeBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
            });
        }
    }

    // 6. Render Skills Section (Redesigned with Hierarchy)
    const skillsContainer = document.getElementById('skillsContainer');
    if (skillsContainer) {
        skillsContainer.innerHTML = ''; // Clear initial content
        
        const redesignWrapper = document.createElement('div');
        redesignWrapper.classList.add('skills-redesign-container');

        portfolioData.skills.forEach(tier => {
            const tierBlock = document.createElement('div');
            tierBlock.classList.add('skill-tier-block', `tier-${tier.tier}`, 'fade-up');

            const tierTitle = document.createElement('div');
            tierTitle.classList.add('skill-tier-title');
            tierTitle.textContent = tier.category;
            tierBlock.appendChild(tierTitle);

            const itemsGrid = document.createElement('div');
            itemsGrid.classList.add('skill-items-grid');

            tier.items.forEach(item => {
                const itemEl = document.createElement('div');
                
                if (tier.tier === 'primary') {
                    itemEl.classList.add('skill-card-primary');
                    itemEl.innerHTML = `
                        <span class="skill-name">${item.name}</span>
                    `;
                } else if (tier.tier === 'competitive') {
                    itemEl.classList.add('skill-pill-competitive');
                    itemEl.innerHTML = `
                        <span class="skill-name">${item.name}</span>
                    `;
                } else if (tier.tier === 'supporting') {
                    itemEl.classList.add('skill-pill-supporting');
                    itemEl.innerHTML = `
                        <span class="skill-name">${item.name}</span>
                    `;
                } else {
                    itemEl.classList.add('skill-pill-basic');
                    itemEl.innerHTML = `
                        <span class="skill-name">${item.name}</span>
                    `;
                }
                itemsGrid.appendChild(itemEl);
            });

            tierBlock.appendChild(itemsGrid);
            redesignWrapper.appendChild(tierBlock);
        });

        skillsContainer.appendChild(redesignWrapper);
        
        // Re-run lucide icons for the new elements
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // 7. Render Certifications Section
    const certGrid = document.getElementById('certGrid');
    portfolioData.certifications.forEach((cert, index) => {
        const card = document.createElement('div');
        card.classList.add('cert-card-refined', 'fade-up');
        card.style.transitionDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="cert-top-row">
                <div class="cert-purple-icon">🎖️</div>
                <span class="cert-date-pill">${cert.year}</span>
            </div>
            <div class="cert-middle-content">
                <h3 class="cert-title-refined">${cert.title}</h3>
                <p class="cert-issuer-refined">${cert.issuer}</p>
            </div>
            <a href="${cert.credentialLink}" class="cert-action-link" target="_blank">
                ↗ View Credential
            </a>
        `;
        certGrid.appendChild(card);
    });

    // 8. Render Contact Links
    const contactLinksContainer = document.getElementById('contactLinks');
    const { linkedin, github, email } = portfolioData.socialLinks;

    contactLinksContainer.innerHTML = `
        <a href="${email}" class="contact-link"><i data-lucide="mail"></i> ${portfolioData.email}</a>
        <a href="${linkedin}" class="contact-link"><i data-lucide="linkedin"></i> LinkedIn Profile</a>
        <a href="${github}" class="contact-link"><i data-lucide="github"></i> GitHub Profile</a>
    `;

    // Render Footer Socials
    const footerSocials = document.getElementById('footerSocials');
    if (footerSocials) {
        footerSocials.innerHTML = `
            <a href="${linkedin}" target="_blank" class="footer-social-link linkedin" title="LinkedIn"><i data-lucide="linkedin"></i></a>
            <a href="${github}" target="_blank" class="footer-social-link github" title="GitHub"><i data-lucide="github"></i></a>
            <a href="${email}" class="footer-social-link email" title="Email"><i data-lucide="mail"></i></a>
        `;
    }

    // Render Sidebar Socials
    const sidebarSocials = document.getElementById('sidebarSocials');
    if (sidebarSocials) {
        sidebarSocials.innerHTML = `
            <a href="${linkedin}" target="_blank" class="footer-social-link linkedin" title="LinkedIn"><i data-lucide="linkedin"></i></a>
            <a href="${github}" target="_blank" class="footer-social-link github" title="GitHub"><i data-lucide="github"></i></a>
            <a href="${email}" class="footer-social-link email" title="Email"><i data-lucide="mail"></i></a>
        `;
    }

    // Initialize Icons AFTER dynamic content is added
    lucide.createIcons();


    // --- UI/UX INTERATIONS ---

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        // Toggle Menu
        mobileMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close Menu when a Link is Clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });

        // Close Menu when Clicking Outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    }

    // Scroll Progress Bar
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        scrollProgressBar.style.width = scrollPercentage + '%';

        // Navbar Sticky Effect
        const navbar = document.getElementById('navbar');
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Custom Cursor REMOVED

    // Scroll Animations (Intersection Observer)
    const fadeUpElements = document.querySelectorAll('.fade-up');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                target.classList.add('visible');

                // CRITICAL FIX: Clear the transition delay after the entrance animation finishes.
                // Otherwise, this delay applies to the hover effect too, causing lag.
                setTimeout(() => {
                    target.style.transitionDelay = '0s';
                    target.style.transition = 'transform 0.1s ease-out, box-shadow 0.4s ease'; // Enforce snappy hover
                }, 1000); // Wait 1s for entrance to finish

                observer.unobserve(target);
            }
        });
    }, observerOptions);

    fadeUpElements.forEach(el => observer.observe(el));

    // Section Reveal Observer Removed per User Request


    // Typing Effect Logic
    // Must re-select the element as it might have been dynamically affected (though here it's static in HTML, good practice)
    const textElement = document.querySelector('.typing-text');
    if (textElement) {
        const words = portfolioData.typingSkills;
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                textElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                textElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }
        type();
    }
    // 3D Tilt Effect REMOVED
    // Cards now use CSS transform: translateY(-5px) for a subtle lift effect.

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- SINGLE PAGE APPLICATION (SPA) SECTION ROUTING ---
    function setActiveSection(targetHash) {
        const rawId = (targetHash || '#home').replace('#', '');
        const validSections = ['home', 'about', 'projects', 'skills', 'experience', 'education', 'certifications', 'contact'];
        
        let activeId = validSections.includes(rawId) ? rawId : 'home';

        // Hide all sections
        document.querySelectorAll('.hero-section, .section').forEach(sec => {
            sec.classList.remove('active-section');
        });

        // Show active section(s)
        if (activeId === 'home' || activeId === 'about') {
            const homeSec = document.getElementById('home');
            const aboutSec = document.getElementById('about');
            if (homeSec) homeSec.classList.add('active-section');
            if (aboutSec) aboutSec.classList.add('active-section');
            activeId = 'home';
        } else {
            const targetSec = document.getElementById(activeId);
            if (targetSec) targetSec.classList.add('active-section');
        }

        // Trigger animations for .fade-up inside active sections
        document.querySelectorAll('.active-section .fade-up').forEach(el => {
            el.classList.add('visible');
        });

        // Update nav links active state in both desktop sidebar and mobile navbar
        document.querySelectorAll('.nav-links a, .sidebar-nav a').forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                const linkId = href.replace('#', '');
                if (linkId === activeId) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });

        // Scroll to top of main content area
        window.scrollTo({ top: 0, behavior: 'instant' });
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // Attach click listeners to all hash links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                setActiveSection(href);
                history.pushState(null, null, href);
            }
        });
    });

    // Handle browser navigation (back/forward)
    window.addEventListener('popstate', () => {
        setActiveSection(window.location.hash);
    });

    // Initialize SPA section on page load
    setActiveSection(window.location.hash || '#home');

    // --- THEME TOGGLE LOGIC ---
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    
    function updateThemeIcon(theme) {
        themeToggleBtns.forEach(btn => {
            btn.innerHTML = `<i data-lucide="${theme === 'dark' ? 'moon' : 'sun'}"></i>`;
        });
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    // Initialize theme icon on load
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateThemeIcon(currentTheme);
    
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const targetTheme = activeTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('theme', targetTheme);
            updateThemeIcon(targetTheme);
        });
    });

});

// Typewriter Effect for Name
// Typewriter Effect for Role (Headline)
// Typewriter Effect REMOVED

// initTypewriter(); removed




