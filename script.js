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

let prevScrollPos = window.pageYOffset;
const navbar = document.querySelector('.navbar');

window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
        // scrolling up → show navbar
        navbar.style.top = "0";
    } else {
        // scrolling down → hide navbar
        navbar.style.top = "-100px"; // hide by moving up
    }

    prevScrollPos = currentScrollPos;
}


window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
