let currentIndex = 1; // Ξεκινάμε από το πρώτο κλωνοποιημένο slide
let slides = document.querySelectorAll('.carousel .slide');
let totalSlides = slides.length;
let carousel = document.getElementById('carousel');
let interval;

// Κλωνοποίηση του πρώτου και του τελευταίου slide
let firstClone = slides[0].cloneNode(true);
let lastClone = slides[totalSlides - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

carousel.querySelector('.carousel').append(firstClone);
carousel.querySelector('.carousel').prepend(lastClone);

// Ενημέρωση του slides και totalSlides
slides = document.querySelectorAll('.carousel .slide');
totalSlides = slides.length;

function updateCarousel() {
    carousel.querySelector('.carousel').style.transform = `translateX(${-currentIndex * 100}%)`;
    carousel.querySelector('.carousel').style.transition = 'transform 0.5s ease-in-out';
}

function nextSlide() {
    currentIndex++;
    updateCarousel();
    if (currentIndex === totalSlides - 1) {
        setTimeout(() => {
            carousel.querySelector('.carousel').style.transition = 'none';
            currentIndex = 1;
            updateCarousel();
            setTimeout(() => {
                carousel.querySelector('.carousel').style.transition = 'transform 0.5s ease-in-out';
            }, 20); // Προσθήκη μικρής καθυστέρησης για να επιτραπεί η ανανέωση
        }, 500); // Πρέπει να είναι ίσο με το χρόνο της μετάβασης
    }
}

function prevSlide() {
    currentIndex--;
    updateCarousel();
    if (currentIndex === 0) {
        setTimeout(() => {
            carousel.querySelector('.carousel').style.transition = 'none';
            currentIndex = totalSlides - 2;
            updateCarousel();
            setTimeout(() => {
                carousel.querySelector('.carousel').style.transition = 'transform 0.5s ease-in-out';
            }, 20); // Προσθήκη μικρής καθυστέρησης για να επιτραπεί η ανανέωση
        }, 500); // Πρέπει να είναι ίσο με το χρόνο της μετάβασης
    }
}

function startAutoSlide() {
    interval = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
    clearInterval(interval);
}

carousel.addEventListener('mouseenter', stopAutoSlide);
carousel.addEventListener('mouseleave', startAutoSlide);

startAutoSlide();
updateCarousel();
