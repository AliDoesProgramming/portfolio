// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const galleryItems = document.querySelectorAll('.gallery-item');
const closeBtn = document.getElementById('close');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    lightboxImg.src = item.src;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
function closeLightbox() {
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lightboxImg.src = '';
}

// Staggered reveal animation on load
window.addEventListener('DOMContentLoaded', () => {
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  reveals.forEach((el, i) => {
    // set data attribute for CSS transition delay
    el.setAttribute('data-stagger', String(Math.min(i, 4)));
    // stagger timings: add visible class with small timeouts for nice sequencing
    setTimeout(() => el.classList.add('visible'), i * 120);
  });
});
