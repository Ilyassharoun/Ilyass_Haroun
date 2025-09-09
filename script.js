const languageToggleBtn = document.getElementById('language-toggle');
const mobileLanguageToggleBtn = document.getElementById('mobile-language-toggle');
const languageText = document.querySelector('#language-toggle .language-text');
const mobileLanguageText = document.querySelector('#mobile-language-toggle .language-text');
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    if (menu && icon) {
        menu.classList.toggle("open");
        icon.classList.toggle("open");
        console.log("Hamburger menu toggled");
    } else {
        console.error("Menu or hamburger icon not found");
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            console.log("Smooth scroll to:", this.getAttribute('href'));
        } else {
            console.error("Scroll target not found:", this.getAttribute('href'));
        }
    });
});

// Theme Toggle
let particles; // Global for theme switching
const themeToggleBtn = document.getElementById('theme-toggle');
const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const mobileThemeIcon = document.getElementById('mobile-theme-icon');
const themeText = document.querySelector('#theme-toggle .theme-text');
const mobileThemeText = document.querySelector('#mobile-theme-toggle .theme-text');
const body = document.body;

// Fallback SVG for day-mode icon (sun) as a data URL
const dayModeIcon = 'data:image/svg+xml;base64,' + btoa(`
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="5" fill="#FFD700"/>
  <path d="M12 2V4M12 20V22M4 12H2M22 12H20M5.64 5.64L4.22 4.22M19.78 19.78L18.36 18.36M5.64 18.36L4.22 19.78M19.78 4.22L18.36 5.64" stroke="#FFD700" stroke-width="2"/>
</svg>
`);

function setTheme(theme) {
    if (!body || !themeIcon || !mobileThemeIcon || !themeText || !mobileThemeText) {
        console.error("Theme toggle elements not found");
        return;
    }
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const iconSrc = theme === 'dark' ? dayModeIcon : './assets/images/night-mode.png';
    const iconAlt = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    const textContent = theme === 'dark' ? 'Light' : 'Dark';
    themeIcon.src = iconSrc;
    themeIcon.alt = iconAlt;
    mobileThemeIcon.src = iconSrc;
    mobileThemeIcon.alt = iconAlt;
    themeText.textContent = textContent;
    mobileThemeText.textContent = textContent;
    if (particles && particles.material) {
        particles.material.color.set(theme === 'dark' ? 0x3b82f6 : 0x2563eb);
        console.log("Particle color updated to:", theme === 'dark' ? '0x3b82f6' : '0x2563eb');
    }
    console.log("Theme set to:", theme, "Icon set to:", iconSrc);
}

const savedTheme = localStorage.getItem('theme') || 'dark';
console.log("Initial theme:", savedTheme);
setTheme(savedTheme);

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme') || 'dark';
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
} else {
    console.error("Desktop theme toggle button not found");
}

if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme') || 'dark';
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
} else {
    console.error("Mobile theme toggle button not found");
}

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        if (name && email && message) {
            contactForm.submit();
            console.log("Form submitted:", { name, email, message });
            alert("Message sent successfully!");
            contactForm.reset();
        } else {
            alert("Please fill out all fields.");
            console.error("Form submission failed: Empty fields");
        }
    });
} else {
    console.error("Contact form not found");
}

// Three.js Particle Background
try {
    if (!window.THREE) {
        throw new Error("Three.js library not loaded");
    }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const canvasContainer = document.getElementById('three-canvas');
    if (!canvasContainer) {
        throw new Error("Three.js canvas container (#three-canvas) not found");
    }
    canvasContainer.appendChild(renderer.domElement);
    console.log("Three.js canvas initialized");

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 1000;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const material = new THREE.PointsMaterial({
        size: 2,
        color: savedTheme === 'dark' ? 0x3b82f6 : 0x2563eb,
        transparent: true,
        opacity: 0.6
    });

    particles = new THREE.Points(particlesGeometry, material);
    scene.add(particles);
    console.log("Particles added to scene");

    camera.position.z = 300;

    function animate() {
        requestAnimationFrame(animate);
        if (particles) {
            particles.rotation.y += 0.002;
        }
        renderer.render(scene, camera);
    }

    animate();
    console.log("Three.js animation started");

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        console.log("Window resized, renderer updated");
    });
} catch (error) {
    console.error("Three.js initialization failed:", error.message);
}
// English content
const englishContent = {
    profile: {
        greeting: "Hello, I'm",
        title: "Ilyass Haroun",
        role: "Software Developer",
        cvButton: "Download CV",
        contactButton: "Contact Info"
    },
    about: {
        subtitle: "Get To Know More",
        title: "About Me",
        description: "Hello, I'm Ilyass Haroun, a computer development student passionate about technology and motivated by the idea of making an impact. Since discovering my passion for coding, I've been excited about creating tools and solutions that can help people. I've gained experience in software and mobile application development, but what I love most is getting involved in projects and collaborating with others. Whether it's organizing hackathons or mentoring young girls to learn to code, I want to help create a more inclusive tech space. I constantly push myself to learn and evolve, and I'm excited to see where technology takes me next!",
        education: "Education",
        educationDesc: "Specialized Technician Diploma<br>Computer Development",
        webDev: "Web Development",
        webDevDesc: "Responsive website design",
        database: "Database<br>SQL",
        databaseDesc: "Management and optimization",
        mobileApps: "Mobile Applications",
        mobileAppsDesc: "Cross-platform development"
    },
    cvFile: "./assets/HarounIlyassENG.pdf",
    skills: {
        subtitle: "Explore My",
        title: "Skills",
        experiencedTitle: "Experienced Skills",
        learningTitle: "Recently Learned Skills"
    },
    experience: {
        subtitle: "My Professional Journey",
        title: "Experience",
        internship: "Computer Developer Internship",
        company: "JMCars - Car Rental",
        duration: "March 2025 (1 month)",
        description: "During my internship at JMCars, I developed a Java desktop application to manage car rentals, including vehicle maintenance alerts. I also designed a WordPress website to facilitate online reservations, improving customer experience and operational efficiency."
    },
    projects: {
        subtitle: "Browse My",
        title: "Projects",
        desktopApps: "Desktop Applications",
        jmcarsTitle: "JMCars Rental Management",
        jmcarsDesc: "Java application to manage car rentals with maintenance alerts.",
        autogestionTitle: "Autogestion Application",
        autogestionDesc: "Java desktop application with FlatLaf UI and SQL database for management system.",
        webApps: "Web Applications",
        jmcarsWebTitle: "JMCars Website",
        jmcarsWebDesc: "WordPress site for online car reservations.",
        mobileApps: "Mobile Applications",
        clicknGoTitle: "ClicknGo",
        clicknGoDesc: "Mobile car rental application (Final Year Project)."
    },
    blog: {
        subtitle: "Explore My",
        title: "Blog",
        post1Title: "Building a Java Car Rental App",
        post1Desc: "How I developed a desktop app with Java and SQL for JMCars, including challenges with database optimization.",
        post2Title: "Creating a WordPress Booking Site",
        post2Desc: "My experience integrating Stripe into a WordPress site for JMCars' online reservations.",
        readMore: "Read More"
    },
    contact: {
        subtitle: "Get in Touch",
        title: "Contact Me",
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send Message"
    }
};

// French content
const frenchContent = {
    profile: {
        greeting: "Bonjour, je suis",
        title: "Ilyass Haroun",
        role: "Développeur Informatique",
        cvButton: "Télécharger CV",
        contactButton: "Info Contact"
    },
    about: {
        subtitle: "Get To Know More",
        title: "À Propos De Moi",
        description: "Bonjour, je suis Ilyass Haroun, un étudiant en développement informatique passionné par la technologie et motivé par l'idée d'avoir un impact. Depuis que j'ai découvert ma passion pour le codage, j'ai été enthousiasmé à l'idée de créer des outils et des solutions qui peuvent aider les gens. J'ai acquis de l'expérience dans le développement de logiciels et d'applications mobiles, mais ce que j'aime par-dessus tout, c'est m'impliquer dans des projets et collaborer avec d'autres. Que ce soit en organisant des hackathons ou en mentorant de jeunes filles pour apprendre à coder, je veux contribuer à créer un espace technologique plus inclusif. Je me pousse constamment à apprendre et à évoluer, et je suis impatient de voir où la technologie me mènera ensuite !",
        education: "Éducation",
        educationDesc: "Diplôme Technicien Spécialisé<br>Développement Informatique",
        webDev: "Développement Web",
        webDevDesc: "Conception de sites responsifs",
        database: "Base de Données<br>SQL",
        databaseDesc: "Gestion et optimisation",
        mobileApps: "Applications Mobiles",
        mobileAppsDesc: "Développement multi-plateforme"
    },
    cvFile: "./assets/HarounIlyass.pdf",
    skills: {
        subtitle: "Découvrez Mes",
        title: "Compétences",
        experiencedTitle: "Compétences Maîtrisées",
        learningTitle: "Compétences en Apprentissage"
    },
    experience: {
        subtitle: "My Professional Journey",
        title: "Experience",
        internship: "Stage Développeur Informatique",
        company: "JMCars - Location de Voitures",
        duration: "Mars 2025 (1 mois)",
        description: "Lors de mon stage chez JMCars, j'ai développé une application de bureau Java pour gérer les locations de voitures, incluant des alertes pour l'entretien des véhicules. J'ai également conçu un site web WordPress pour faciliter les réservations en ligne, améliorant l'expérience client et l'efficacité opérationnelle."
    },
    projects: {
        subtitle: "Browse My",
        title: "Projects",
        desktopApps: "Desktop Applications",
        jmcarsTitle: "JMCars Gestion Location",
        jmcarsDesc: "Application Java pour gérer les locations de voitures avec alertes d'entretien.",
        autogestionTitle: "Autogestion Application",
        autogestionDesc: "Java desktop application with FlatLaf UI and SQL database for management system.",
        webApps: "Web Applications",
        jmcarsWebTitle: "JMCars Website",
        jmcarsWebDesc: "Site WordPress pour réservations de voitures en ligne.",
        mobileApps: "Mobile Applications",
        clicknGoTitle: "ClicknGo",
        clicknGoDesc: "Application mobile de location de voitures (Projet de Fin d'Études)."
    },
    blog: {
        subtitle: "Explore My",
        title: "Blog",
        post1Title: "Building a Java Car Rental App",
        post1Desc: "How I developed a desktop app with Java and SQL for JMCars, including challenges with database optimization.",
        post2Title: "Creating a WordPress Booking Site",
        post2Desc: "My experience integrating Stripe into a WordPress site for JMCars' online reservations.",
        readMore: "Read More"
    },
    contact: {
        subtitle: "Get in Touch",
        title: "Contact Me",
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send Message"
    }
};

function setLanguage(lang) {
    const content = lang === 'en' ? englishContent : frenchContent;
    // Update CV download button
    const cvButton = document.querySelector('.btn-color-1');
    if (cvButton) {
        cvButton.setAttribute('onclick', `window.open('${content.cvFile}')`);
    }
    // Update profile section
    document.querySelector('.section__text__p1').textContent = content.profile.greeting;
    document.querySelector('.section__text__p2').textContent = content.profile.role;
    document.querySelector('.btn-color-1').textContent = content.profile.cvButton;
    document.querySelector('.btn-color-2').textContent = content.profile.contactButton;
    
    // Update about section
    document.querySelector('#about .section__text__p1').textContent = content.about.subtitle;
    document.querySelector('#about .title').textContent = content.about.title;
    document.querySelector('#about .text-container p').textContent = content.about.description;
    
    const aboutContainers = document.querySelectorAll('#about .details-container');
    aboutContainers[0].querySelector('h3').textContent = content.about.education;
    aboutContainers[0].querySelector('p').innerHTML = content.about.educationDesc;
    aboutContainers[1].querySelector('h3').textContent = content.about.webDev;
    aboutContainers[1].querySelector('p').textContent = content.about.webDevDesc;
    aboutContainers[2].querySelector('h3').textContent = content.about.database;
    aboutContainers[2].querySelector('p').textContent = content.about.databaseDesc;
    aboutContainers[3].querySelector('h3').textContent = content.about.mobileApps;
    aboutContainers[3].querySelector('p').textContent = content.about.mobileAppsDesc;
    // Update skills section
    document.querySelector('#skills .section__text__p1').textContent = content.skills.subtitle;
    document.querySelector('#skills .title').textContent = content.skills.title;
    const skillsSubtitles = document.querySelectorAll('#skills .skills-sub-title');
    if (skillsSubtitles.length >= 2) {
        skillsSubtitles[0].textContent = content.skills.experiencedTitle;
        skillsSubtitles[1].textContent = content.skills.learningTitle;
    }
    // Update experience section
    document.querySelector('#experience .section__text__p1').textContent = content.experience.subtitle;
    document.querySelector('#experience .title').textContent = content.experience.title;
    const expContainer = document.querySelector('#experience .details-container');
    expContainer.querySelector('h3').textContent = content.experience.internship;
    expContainer.querySelector('.experience-sub-title').textContent = content.experience.company;
    expContainer.querySelectorAll('p')[1].textContent = content.experience.duration;
    expContainer.querySelectorAll('p')[2].textContent = content.experience.description;
    
    // Update projects section
    document.querySelector('#projects .section__title__p1').textContent = content.projects.subtitle;
    document.querySelector('#projects .title').textContent = content.projects.title;
    
    const projectCategories = document.querySelectorAll('.project-category-title');
    projectCategories[0].textContent = content.projects.desktopApps;
    projectCategories[1].textContent = content.projects.webApps;
    projectCategories[2].textContent = content.projects.mobileApps;
    
    const projectContainers = document.querySelectorAll('#projects .details-container');
    projectContainers[0].querySelector('.project-title').textContent = content.projects.jmcarsTitle;
    projectContainers[0].querySelector('.project-description').textContent = content.projects.jmcarsDesc;
    projectContainers[1].querySelector('.project-title').textContent = content.projects.autogestionTitle;
    projectContainers[1].querySelector('.project-description').textContent = content.projects.autogestionDesc;
    projectContainers[2].querySelector('.project-title').textContent = content.projects.jmcarsWebTitle;
    projectContainers[2].querySelector('.project-description').textContent = content.projects.jmcarsWebDesc;
    projectContainers[3].querySelector('.project-title').textContent = content.projects.clicknGoTitle;
    projectContainers[3].querySelector('.project-description').textContent = content.projects.clicknGoDesc;
    
    // Update blog section
    document.querySelector('#blog .section__text__p1').textContent = content.blog.subtitle;
    document.querySelector('#blog .title').textContent = content.blog.title;
    
    const blogContainers = document.querySelectorAll('#blog .details-container');
    blogContainers[0].querySelector('.blog-title').textContent = content.blog.post1Title;
    blogContainers[0].querySelector('.blog-description').textContent = content.blog.post1Desc;
    blogContainers[1].querySelector('.blog-title').textContent = content.blog.post2Title;
    blogContainers[1].querySelector('.blog-description').textContent = content.blog.post2Desc;
    
    // Update contact section
    document.querySelector('#contact .section__text__p1').textContent = content.contact.subtitle;
    document.querySelector('#contact .title').textContent = content.contact.title;
    
    const formLabels = document.querySelectorAll('#contact-form label');
    formLabels[0].textContent = content.contact.name;
    formLabels[1].textContent = content.contact.email;
    formLabels[2].textContent = content.contact.message;
    document.querySelector('#contact-form button').textContent = content.contact.send;
    
    // Update language toggle button
    languageText.textContent = lang === 'en' ? 'FR' : 'EN';
    mobileLanguageText.textContent = lang === 'en' ? 'FR' : 'EN';
    
    // Save language preference
    localStorage.setItem('language', lang);
}

// Initialize language
const savedLanguage = localStorage.getItem('language') || 'fr';
setLanguage(savedLanguage);

// Add event listeners for language toggle
if (languageToggleBtn) {
    languageToggleBtn.addEventListener('click', () => {
        const currentLang = localStorage.getItem('language') || 'fr';
        setLanguage(currentLang === 'en' ? 'fr' : 'en');
    });
}

if (mobileLanguageToggleBtn) {
    mobileLanguageToggleBtn.addEventListener('click', () => {
        const currentLang = localStorage.getItem('language') || 'fr';
        setLanguage(currentLang === 'en' ? 'fr' : 'en');
    });
}