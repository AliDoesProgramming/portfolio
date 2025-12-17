/* ===== LIGHTBOX WITH ZOOM + SCROLL LOCK ===== */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const galleryItems = document.querySelectorAll(".gallery-item");
const closeBtn = document.getElementById("close");

let scale = 1;

galleryItems.forEach(item => {
    item.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = item.src;

        scale = 1;
        lightboxImg.style.transform = `scale(${scale})`;

        // lock page scroll
        document.body.style.overflow = "hidden";
    });
});

function closeLightbox() {
    lightbox.style.display = "none";
    lightboxImg.src = "";
    scale = 1;

    // restore page scroll
    document.body.style.overflow = "";
}

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
});

/* ===== ZOOM WITH MOUSE WHEEL ===== */
lightboxImg.addEventListener("wheel", e => {
    e.preventDefault();

    const zoomSpeed = 0.12;
    scale += e.deltaY * -zoomSpeed * 0.01;

    // clamp zoom range
    scale = Math.min(Math.max(1, scale), 4);

    lightboxImg.style.transform = `scale(${scale})`;
}, { passive: false });

/* ===== NAVIGATION SCROLL USING DATA-TARGET (desktop links) ===== */
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('data-target');
        const target = document.getElementById(targetId);
        if (!target) return;

        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;

        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    });
});

/* ===== REVEAL ON SCROLL ===== */
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            el.classList.add('visible');
        }
    });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* ===== LOGO FONT CYCLER (Dancing Script <-> random system fonts; no immediate repeats) ===== */
const logo = document.querySelector('.nav-logo');

// system-safe fonts array
const fonts = [
    "Arial, sans-serif",
    "Verdana, sans-serif",
    "Tahoma, sans-serif",
    "Trebuchet MS, sans-serif",
    "Segoe UI, sans-serif",
    "Helvetica, sans-serif",
    "Georgia, serif",
    "Times New Roman, serif",
    "Palatino Linotype, serif",
    "Garamond, serif",
    "Courier New, monospace",
    "Consolas, monospace",
    "Monaco, monospace",
    "Lucida Console, monospace",
    "Impact, sans-serif",
    "Copperplate, serif",
    "Franklin Gothic Medium, sans-serif"
];

let lastRandomFont = null;
let isDancing = true;

function changeLogoFont() {
    if (!logo) return;
    if (isDancing) {
        // pick a random font not equal to lastRandomFont
        let newFont;
        do {
            newFont = fonts[Math.floor(Math.random() * fonts.length)];
        } while (newFont === lastRandomFont);
        lastRandomFont = newFont;
        logo.style.fontFamily = newFont;
    } else {
        // back to Dancing Script
        logo.style.fontFamily = "'Dancing Script', cursive";
    }
    isDancing = !isDancing;
}

// change font every 2500ms
setInterval(changeLogoFont, 150);

/* ===== MOBILE MENU TOGGLE ===== */
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

function openMobileMenu() {
    mobileMenu.classList.add('open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        if (mobileMenu.classList.contains('open')) closeMobileMenu();
        else openMobileMenu();
    });
}
mobileClose?.addEventListener('click', closeMobileMenu);

// mobile links smooth scroll + close menu
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', e => {
        const targetId = link.getAttribute('data-target');
        const target = document.getElementById(targetId);
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
        closeMobileMenu();
    });
});

// close mobile menu on ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
});
