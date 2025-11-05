let currentIndex = 0;
const items = document.querySelectorAll('.carrusel-item');
const dots = document.querySelectorAll('.dot');
const total = items.length;

function showSlide(index) {
    items.forEach((item, i) => {
        item.classList.toggle('active', i === index);
        dots[i].classList.toggle('active', i === index);
    });
}

document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % total;
    showSlide(currentIndex);
});

document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + total) % total;
    showSlide(currentIndex);
});

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        currentIndex = i;
        showSlide(i);
    });
});

// Cambio automático cada 5 segundos
setInterval(() => {
    currentIndex = (currentIndex + 1) % total;
    showSlide(currentIndex);
}, 5000);
