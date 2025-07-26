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