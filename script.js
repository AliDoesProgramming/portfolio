/* ===== LIGHTBOX ===== */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const galleryItems = document.querySelectorAll(".gallery-item");
const closeBtn = document.getElementById("close");

let scale = 1;
let isDragging = false;
let startX = 0;
let startY = 0;
let translateX = 0;
let translateY = 0;

function applyTransform() {
    lightboxImg.style.transform =
        `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

/* ===== OPEN IMAGE (PREVIEW → HIGH RES SWAP) ===== */
galleryItems.forEach(item => {
    item.addEventListener("click", () => {

        const preview =
            item.getAttribute("src") ||
            item.getAttribute("data-src");

        const full =
            item.getAttribute("data-full") ||
            preview;

        // show preview instantly
        lightbox.style.display = "flex";
        lightboxImg.src = preview;

        scale = 1;
        translateX = 0;
        translateY = 0;
        applyTransform();

        document.body.style.overflow = "hidden";

        // preload high-res
        const img = new Image();
        img.src = full;

        img.onload = () => {
            lightboxImg.src = full;
        };
    });
});

/* ===== CLOSE ===== */
function closeLightbox() {
    lightbox.style.display = "none";
    lightboxImg.src = "";

    scale = 1;
    translateX = 0;
    translateY = 0;
    applyTransform();

    document.body.style.overflow = "";
}

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
});

/* ===== ZOOM ===== */
lightboxImg.addEventListener("wheel", e => {
    e.preventDefault();

    const zoomSpeed = 0.12;
    const prevScale = scale;

    scale += e.deltaY * -zoomSpeed * 0.01;
    scale = Math.min(Math.max(1, scale), 4);

    const rect = lightboxImg.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    translateX -= offsetX * (scale / prevScale - 1);
    translateY -= offsetY * (scale / prevScale - 1);

    applyTransform();
}, { passive: false });

/* ===== DRAG ===== */
lightboxImg.addEventListener("mousedown", e => {
    if (scale === 1) return;

    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;

    lightboxImg.style.cursor = "grabbing";
});

window.addEventListener("mousemove", e => {
    if (!isDragging) return;

    translateX = e.clientX - startX;
    translateY = e.clientY - startY;

    applyTransform();
});

window.addEventListener("mouseup", () => {
    isDragging = false;
    lightboxImg.style.cursor = scale > 1 ? "grab" : "zoom-in";
});


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
        let newFont;
        do {
            newFont = fonts[Math.floor(Math.random() * fonts.length)];
        } while (newFont === lastRandomFont);
        lastRandomFont = newFont;
        logo.style.fontFamily = newFont;
    } else {
        logo.style.fontFamily = "'Dancing Script', cursive";
    }
    isDancing = !isDancing;
}

setInterval(changeLogoFont, 800);

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

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
});


/* ===== SHOW MORE GALLERY ===== */
const showMoreBtn = document.getElementById('showMoreBtn');
const moreGallery = document.getElementById('moreGallery');

if (showMoreBtn && moreGallery) {
    showMoreBtn.addEventListener('click', () => {
        const hiddenImages = moreGallery.querySelectorAll('img[data-src]');

        hiddenImages.forEach(img => {
            if (!img.getAttribute('src') || img.getAttribute('src').startsWith('data:image/gif;base64')) {
                const realSrc = img.getAttribute('data-src');
                if (realSrc) {
                    img.src = realSrc;
                }
            }
        });

        moreGallery.classList.add('visible');
        moreGallery.setAttribute('aria-hidden', 'false');
        showMoreBtn.setAttribute('aria-expanded', 'true');
        showMoreBtn.style.display = 'none';
    });
}
