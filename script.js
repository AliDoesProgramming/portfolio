/* LIGHTBOX */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const galleryItems = document.querySelectorAll(".gallery-item");
const closeBtn = document.getElementById("close");

galleryItems.forEach(item => {
    item.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = item.src;
    });
});

closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

lightbox.addEventListener("click", e => {
    if (e.target === lightbox) lightbox.style.display = "none";
});

/* NAVIGATION SCROLL USING DATA-TARGET */
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

/* REVEAL ON SCROLL */
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            el.classList.add('visible');
        }
    });
}

const logo = document.querySelector('.nav-logo');

// random fonts that exist on all systems
const fonts = ["Arial, sans-serif", "Verdana, sans-serif", "Times New Roman, serif", "Georgia, serif", "Courier New, monospace","Lucida Console, monospace","Consolas, monospace","Monaco, monospace","Source Code Pro, monospace",];
let isDancing = true;

function changeLogoFont() {
    if (isDancing) {
        // pick a random system font
        const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
        logo.style.fontFamily = randomFont;
    } else {
        // back to Dancing Script
        logo.style.fontFamily = "'Dancing Script', cursive";
    }
    isDancing = !isDancing; // toggle
}

// change font every 2.5 seconds
setInterval(changeLogoFont, 250);


window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
