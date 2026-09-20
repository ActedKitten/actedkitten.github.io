const MOBILE_IMAGES = [
    'assets/images/background_Mobile1.jpg',
    'assets/images/background_Mobile2.jpg'
];

function setBackground() {
    const isMobile = window.innerWidth <= 768;
    const bgImage = isMobile
        ? MOBILE_IMAGES[Math.floor(Math.random() * MOBILE_IMAGES.length)]
        : 'assets/images/background_PC.jpg';

    document.body.style.backgroundImage = `linear-gradient(rgba(20, 30, 40, 0.28), rgba(20, 30, 40, 0.28)), url('${bgImage}')`;
}

function loadImage(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = src;
    });
}

function revealPage() {
    requestAnimationFrame(() => {
        document.body.classList.add('loaded');
        document.body.classList.remove('is-loading');
    });
}

async function preparePage() {
    const imageList = [
        'assets/images/background_PC.jpg',
        'assets/images/background_Mobile1.jpg',
        'assets/images/background_Mobile2.jpg'
    ];
    const minimumLoaderTime = 3000;
    const startTime = performance.now();

    setBackground();

    await Promise.all(imageList.map((src) => loadImage(src).catch(() => undefined)));

    const elapsed = performance.now() - startTime;
    const remaining = Math.max(0, minimumLoaderTime - elapsed);

    setTimeout(() => {
        revealPage();
    }, remaining);
}

window.addEventListener('resize', setBackground);
window.addEventListener('load', preparePage, { once: true });

if (document.readyState === 'complete') {
    preparePage();
}
