document.addEventListener("DOMContentLoaded", () => {
    // ruta imagen
    const images = [
        "assets/img/banners/banner1.jpg",
        "assets/img/banners/banner2.jpg",
        "assets/img/banners/banner3.jpg"
    ];

    let currentIndex = 0;
    const imgEl = document.getElementById("carrusel-img");
    const indicatorsContainer = document.querySelector(".carrusel-indicators");
    const nextBtn = document.querySelector(".carrusel-btn.next");
    const prevBtn = document.querySelector(".carrusel-btn.prev");
    const carrusel = document.querySelector(".carrusel");
    const intervalMs = 5000;
    let intervalId = null;

    if (!imgEl || !indicatorsContainer || images.length === 0) return;

    // precarga de imágenes
    function preload(src) {
        const i = new Image();
        i.src = src;
    }
    images.forEach(preload);

    // crea indicadores 
    function createIndicators() {
        indicatorsContainer.innerHTML = "";
        images.forEach((_, i) => {
            const dot = document.createElement("span");
            dot.className = "dot";
            dot.setAttribute("role", "button");
            dot.setAttribute("aria-label", `Ir al slide ${i + 1}`);
            dot.tabIndex = 0;
            dot.addEventListener("click", () => goTo(i));
            dot.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") goTo(i);
            });
            indicatorsContainer.appendChild(dot);
        });
    }

    function updateIndicators() {
        const dots = indicatorsContainer.querySelectorAll(".dot");
        dots.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
    }

    function showSlide(index) {
        if (images.length === 0) return;
        currentIndex = ((index % images.length) + images.length) % images.length;
       
        imgEl.style.opacity = 0;
        setTimeout(() => {
            imgEl.src = images[currentIndex];
            imgEl.alt = `Banner ${currentIndex + 1}`;
            imgEl.style.opacity = 1;
        }, 120);
        updateIndicators();
       
        preload(images[(currentIndex + 1) % images.length]);
    }

    function next() { showSlide(currentIndex + 1); }
    function prev() { showSlide(currentIndex - 1); }
    function goTo(i) { showSlide(i); }

    function startAuto() {
        stopAuto();
        intervalId = setInterval(() => next(), intervalMs);
    }
    function stopAuto() {
        if (intervalId) { clearInterval(intervalId); intervalId = null; }
    }

    //  botones
    if (nextBtn) nextBtn.addEventListener("click", () => { next(); startAuto(); });
    if (prevBtn) prevBtn.addEventListener("click", () => { prev(); startAuto(); });

    // Pausa al hover / touch
    if (carrusel) {
        carrusel.addEventListener("mouseenter", stopAuto);
        carrusel.addEventListener("mouseleave", startAuto);
        carrusel.addEventListener("touchstart", stopAuto, { passive: true });
        carrusel.addEventListener("touchend", startAuto, { passive: true });
    }
   
    createIndicators();
    showSlide(0);
    startAuto();
});