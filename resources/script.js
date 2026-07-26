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

    window.showProjectDetails = function(index) {
        const listContainer = document.getElementById('projectsListContainer');
        const detailContainer = document.getElementById('projectDetailContainer');
        if (!detailContainer || !portfolioData.projects || !portfolioData.projects[index]) return;

        const proj = portfolioData.projects[index];
        const images = (proj.images && proj.images.length > 0) ? proj.images : (proj.image ? [proj.image] : []);
        const techPillsHtml = proj.techStack ? proj.techStack.map(t => `<span class="project-detail-tag">${t}</span>`).join('') : '';
        const techBadgesHtml = proj.techStack ? proj.techStack.map(t => `<span class="modal-tech-badge">${t}</span>`).join('') : '';
        const approachHtml = proj.approach && proj.approach.length 
            ? proj.approach.map(step => `<li>${step}</li>`).join('') 
            : '<li>N/A</li>';

        detailContainer.innerHTML = `
            <div class="project-detail-view fade-up visible">
                <div class="project-detail-top-nav">
                    <a href="#projects" class="back-to-projects-btn" id="backToProjectsBtn">
                        <i data-lucide="arrow-left"></i> All Projects
                    </a>
                </div>

                <div class="project-detail-header">
                    <h1 class="project-detail-title">${proj.title}</h1>
                    <p class="project-detail-description">${proj.description}</p>
                    <div class="project-detail-meta">
                        <span>By ${portfolioData.name || 'Somenath Sau'}</span>
                        ${proj.category ? ` • <span>${proj.category}</span>` : ''}
                    </div>
                </div>

                <div class="project-detail-content-grid">
                    <div class="project-detail-main-col">
                        ${proj.keyInsight ? `
                        <div class="project-detail-insight-callout">
                            <h3 class="project-detail-insight-heading"><i data-lucide="lightbulb"></i> Key Insight</h3>
                            <p>${proj.keyInsight}</p>
                        </div>` : ''}

                        ${proj.problem ? `
                        <div class="project-detail-card-section">
                            <h3 class="project-detail-section-title"><i data-lucide="alert-triangle"></i> The Problem</h3>
                            <p>${proj.problem}</p>
                        </div>` : ''}

                        ${proj.dataset ? `
                        <div class="project-detail-card-section">
                            <h3 class="project-detail-section-title"><i data-lucide="database"></i> Dataset</h3>
                            <p>${proj.dataset}</p>
                        </div>` : ''}

                        ${proj.approach && proj.approach.length ? `
                        <div class="project-detail-card-section">
                            <h3 class="project-detail-section-title"><i data-lucide="list-checks"></i> Approach & Methodology</h3>
                            <ul class="project-detail-list">
                                ${approachHtml}
                            </ul>
                        </div>` : ''}

                        ${proj.businessImpact ? `
                        <div class="project-detail-card-section">
                            <h3 class="project-detail-section-title"><i data-lucide="trending-up"></i> Business Impact</h3>
                            <p>${proj.businessImpact}</p>
                        </div>` : ''}

                        ${proj.recommendations && proj.recommendations.length ? `
                        <div class="project-detail-card-section">
                            <h3 class="project-detail-section-title"><i data-lucide="compass"></i> Strategic Recommendations</h3>
                            <ul class="project-detail-list">
                                ${proj.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                            </ul>
                        </div>` : ''}
                    </div>

                    <div class="project-detail-sidebar-col">
                        <div class="project-detail-sidebar-card">
                            <h3 class="project-detail-sidebar-heading"><i data-lucide="wrench"></i> Tools & Tech Stack</h3>
                            <div class="project-detail-sidebar-tags">
                                ${techBadgesHtml}
                            </div>
                            <div class="project-detail-actions">
                                ${proj.codeLink ? `<a href="${proj.codeLink}" class="btn-secondary" target="_blank"><i data-lucide="github"></i> Repository</a>` : ''}
                                ${proj.demoLink ? `<a href="${proj.demoLink}" class="btn-primary" target="_blank"><i data-lucide="external-link"></i> Live Demo</a>` : ''}
                            </div>
                        </div>

                        <div class="project-detail-sidebar-card project-image-card">
                            <div class="project-preview-header">
                                <h3 class="project-detail-sidebar-heading"><i data-lucide="image"></i> Project Preview</h3>
                                ${images.length > 1 ? `<span class="image-counter" id="previewImgCounter">1 / ${images.length}</span>` : ''}
                            </div>
                            <div class="project-preview-slider-container">
                                <div class="project-detail-image-box modal-image-wrapper" id="previewImgWrapper">
                                    <img id="projectPreviewImg" src="${images[0]}" alt="${proj.title}" loading="lazy">
                                </div>
                                ${images.length > 1 ? `
                                    <button class="slider-btn prev-btn" id="prevImgBtn" aria-label="Previous Image">
                                        <i data-lucide="chevron-left"></i>
                                    </button>
                                    <button class="slider-btn next-btn" id="nextImgBtn" aria-label="Next Image">
                                        <i data-lucide="chevron-right"></i>
                                    </button>
                                    <div class="slider-dots" id="sliderDots">
                                        ${images.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('')}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        if (listContainer) listContainer.style.display = 'none';
        detailContainer.style.display = 'block';

        const backBtn = detailContainer.querySelector('#backToProjectsBtn');
        if (backBtn) {
            backBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showProjectsList();
                history.pushState(null, null, '#projects');
            });
        }

        let currentImgIndex = 0;
        const mainImg = detailContainer.querySelector('#projectPreviewImg');
        const imgCounter = detailContainer.querySelector('#previewImgCounter');
        const prevBtn = detailContainer.querySelector('#prevImgBtn');
        const nextBtn = detailContainer.querySelector('#nextImgBtn');
        const dots = detailContainer.querySelectorAll('#sliderDots .dot');
        const imgWrapper = detailContainer.querySelector('#previewImgWrapper');

        function updatePreviewImage(newIndex) {
            if (newIndex < 0) newIndex = images.length - 1;
            if (newIndex >= images.length) newIndex = 0;
            currentImgIndex = newIndex;

            if (mainImg) {
                mainImg.style.opacity = '0.3';
                setTimeout(() => {
                    mainImg.src = images[currentImgIndex];
                    mainImg.style.opacity = '1';
                }, 120);
            }

            if (imgCounter) {
                imgCounter.textContent = `${currentImgIndex + 1} / ${images.length}`;
            }

            dots.forEach((dot, idx) => {
                if (idx === currentImgIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                updatePreviewImage(currentImgIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                updatePreviewImage(currentImgIndex + 1);
            });
        }

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(dot.getAttribute('data-index'), 10);
                updatePreviewImage(idx);
            });
        });

        if (imgWrapper) {
            imgWrapper.addEventListener('click', (e) => {
                e.stopPropagation();
                openImageZoomModal(currentImgIndex);
            });
        }

        function openImageZoomModal(initialIndex = 0) {
            const imageZoomModal = document.getElementById('imageZoomModal');
            const imageZoomTitle = document.getElementById('imageZoomTitle');
            const imageZoomCounter = document.getElementById('imageZoomCounter');
            const imageZoomImg = document.getElementById('imageZoomImg');
            const imageZoomPrevBtn = document.getElementById('imageZoomPrevBtn');
            const imageZoomNextBtn = document.getElementById('imageZoomNextBtn');
            const imageZoomDotsContainer = document.getElementById('imageZoomDots');
            const imageZoomCloseBtn = document.getElementById('imageZoomCloseBtn');

            if (!imageZoomModal || !imageZoomImg) return;
            
            let modalIndex = initialIndex;

            function renderModalImage(idx) {
                if (idx < 0) idx = images.length - 1;
                if (idx >= images.length) idx = 0;
                modalIndex = idx;

                imageZoomImg.style.opacity = '0.3';
                setTimeout(() => {
                    imageZoomImg.src = images[modalIndex];
                    imageZoomImg.style.opacity = '1';
                }, 100);

                if (imageZoomTitle) imageZoomTitle.textContent = proj.title || 'Project Preview';
                if (imageZoomCounter) {
                    imageZoomCounter.textContent = images.length > 1 ? `${modalIndex + 1} / ${images.length}` : '';
                    imageZoomCounter.style.display = images.length > 1 ? 'inline-block' : 'none';
                }

                if (imageZoomPrevBtn) imageZoomPrevBtn.style.display = images.length > 1 ? 'flex' : 'none';
                if (imageZoomNextBtn) imageZoomNextBtn.style.display = images.length > 1 ? 'flex' : 'none';

                if (imageZoomDotsContainer) {
                    if (images.length > 1) {
                        imageZoomDotsContainer.innerHTML = images.map((_, i) => `<span class="dot ${i === modalIndex ? 'active' : ''}" data-index="${i}"></span>`).join('');
                        imageZoomDotsContainer.querySelectorAll('.dot').forEach(dot => {
                            dot.addEventListener('click', (ev) => {
                                ev.stopPropagation();
                                const i = parseInt(dot.getAttribute('data-index'), 10);
                                renderModalImage(i);
                                updatePreviewImage(i);
                            });
                        });
                    } else {
                        imageZoomDotsContainer.innerHTML = '';
                    }
                }
            }

            renderModalImage(modalIndex);
            imageZoomModal.classList.add('active');
            document.body.style.overflow = 'hidden';

            const onPrevClick = (ev) => {
                ev.stopPropagation();
                renderModalImage(modalIndex - 1);
                updatePreviewImage(modalIndex);
            };

            const onNextClick = (ev) => {
                ev.stopPropagation();
                renderModalImage(modalIndex + 1);
                updatePreviewImage(modalIndex);
            };

            const onCloseClick = (ev) => {
                if (ev) ev.stopPropagation();
                closeImageZoomModal();
            };

            const onKeyDown = (ev) => {
                if (!imageZoomModal.classList.contains('active')) return;
                if (ev.key === 'ArrowLeft') {
                    renderModalImage(modalIndex - 1);
                    updatePreviewImage(modalIndex);
                } else if (ev.key === 'ArrowRight') {
                    renderModalImage(modalIndex + 1);
                    updatePreviewImage(modalIndex);
                } else if (ev.key === 'Escape') {
                    closeImageZoomModal();
                }
            };

            if (imageZoomPrevBtn) imageZoomPrevBtn.onclick = onPrevClick;
            if (imageZoomNextBtn) imageZoomNextBtn.onclick = onNextClick;
            if (imageZoomCloseBtn) imageZoomCloseBtn.onclick = onCloseClick;

            imageZoomModal.onclick = (ev) => {
                if (ev.target === imageZoomModal) {
                    closeImageZoomModal();
                }
            };

            document.addEventListener('keydown', onKeyDown);

            function closeImageZoomModal() {
                imageZoomModal.classList.remove('active');
                document.body.style.overflow = '';
                document.removeEventListener('keydown', onKeyDown);
            }
        }

        if (typeof lucide !== 'undefined') lucide.createIcons();
    };

    window.showProjectsList = function() {
        const listContainer = document.getElementById('projectsListContainer');
        const detailContainer = document.getElementById('projectDetailContainer');
        if (detailContainer) detailContainer.style.display = 'none';
        if (listContainer) listContainer.style.display = 'block';
        if (typeof lucide !== 'undefined') lucide.createIcons();
    };

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
                        <button class="btn-primary open-project-btn" data-index="${index}">View Details</button>
                        <a href="${project.codeLink}" class="btn-secondary" target="_blank"><i data-lucide="github"></i> Repository</a>
                    </div>
                </div>
            `;
            projectsGrid.appendChild(card);
        });

        document.querySelectorAll('.open-project-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.currentTarget.getAttribute('data-index');
                history.pushState(null, null, `#project-${idx}`);
                setActiveSection(`#project-${idx}`);
            });
        });
    }

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
            resumeIframe.src = ''; 
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
        const hash = targetHash || '#home';
        let rawId = hash.replace('#', '');
        
        let isProjectDetail = false;
        let projectIndex = null;

        if (rawId.startsWith('project-')) {
            const idxStr = rawId.replace('project-', '');
            const parsedIdx = parseInt(idxStr, 10);
            if (!isNaN(parsedIdx) && portfolioData.projects && portfolioData.projects[parsedIdx]) {
                isProjectDetail = true;
                projectIndex = parsedIdx;
                rawId = 'projects';
            }
        }

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

        if (activeId === 'projects') {
            if (isProjectDetail && projectIndex !== null) {
                if (typeof window.showProjectDetails === 'function') {
                    window.showProjectDetails(projectIndex);
                }
            } else {
                if (typeof window.showProjectsList === 'function') {
                    window.showProjectsList();
                }
            }
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




