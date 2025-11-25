// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const galleryItems = document.querySelectorAll('.gallery-item');
const closeBtn = document.getElementById('close');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = item.src;
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// Add stagger animations to all elements with class "animate"
window.addEventListener("load", () => {
    document.querySelectorAll(".animate").forEach((el, index) => {
        el.style.animationDelay = `${index * 0.25}s`;
    });
});
