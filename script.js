/* ===== LIGHTBOX WITH ZOOM + DRAG PAN + SCROLL LOCK ===== */
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

galleryItems.forEach(item => {
    item.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = item.src;

        scale = 1;
        translateX = 0;
        translateY = 0;
        applyTransform();

        document.body.style.overflow = "hidden";
    });
});

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

/* ===== ZOOM WITH MOUSE WHEEL ===== */
lightboxImg.addEventListener("wheel", e => {
    e.preventDefault();

    const zoomSpeed = 0.12;
    const prevScale = scale;

    scale += e.deltaY * -zoomSpeed * 0.01;
    scale = Math.min(Math.max(1, scale), 4);

    // keep zoom centered on cursor
    const rect = lightboxImg.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    translateX -= offsetX * (scale / prevScale - 1);
    translateY -= offsetY * (scale / prevScale - 1);

    applyTransform();
}, { passive: false });

/* ===== CLICK + DRAG TO PAN ===== */
lightboxImg.addEventListener("mousedown", e => {
    if (scale === 1) return; // no drag if not zoomed

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

// change font every 800ms
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


/* ===== SCROLL-BASED BACKGROUND GRADIENT SYSTEM ===== */

const gradients = [
  [
    [255, 0, 0],
    [92, 13, 13]
  ],
  [
    [0, 255, 47],
    [42, 92, 13]
  ],
  [
    [0, 98, 255],
    [0, 255, 251]
  ],
  [
    [255, 0, 242],
    [102, 0, 56]
  ]
];

let current = 0;
let target = 1;
let progress = 0;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function mixColor(c1, c2, t) {
  return [
    Math.round(lerp(c1[0], c2[0], t)),
    Math.round(lerp(c1[1], c2[1], t)),
    Math.round(lerp(c1[2], c2[2], t))
  ];
}

function rgb(c) {
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

function getScrollProgress() {
  const y = window.scrollY || 0;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  return h > 0 ? y / h : 0;
}

function loop() {
  const p = getScrollProgress();

  target = Math.floor(p * gradients.length);
  target = Math.min(gradients.length - 1, target);

  if (target !== current) {
    progress += 0.02; // tween speed

    if (progress >= 1) {
      progress = 0;
      current = target;
    }
  }

  const c1 = gradients[current];
  const c2 = gradients[target];

  const top = mixColor(c1[0], c2[0], progress);
  const bottom = mixColor(c1[1], c2[1], progress);

  document.body.style.backgroundImage =
    `linear-gradient(120deg, ${rgb(top)}, ${rgb(bottom)})`;

  requestAnimationFrame(loop);
}

loop();

/* ===== BACKGROUND MUSIC ===== */

const bgMusic = document.getElementById("bgMusic");

if (bgMusic) {

    bgMusic.volume = 0.35;

    function startMusic() {
        bgMusic.play().catch(() => {});
        
        document.removeEventListener("click", startMusic);
        document.removeEventListener("keydown", startMusic);
    }

    document.addEventListener("click", startMusic);
    document.addEventListener("keydown", startMusic);
}
