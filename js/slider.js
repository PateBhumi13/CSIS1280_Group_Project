document.addEventListener("DOMContentLoaded", function () {
    // Automatic Slider
    let currentIndex = 0;
    const slides = document.querySelectorAll("#slider ul li");
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

   
    showSlide(currentIndex);

   
    setInterval(nextSlide, 3000); 

    // Manual Slider with arrows
    const productsContainer = document.querySelector(".products");
    const items = productsContainer.querySelectorAll("summer");
    const leftArrow = document.querySelector(".slider-left-arrow");
    const rightArrow = document.querySelector(".slider-right-arrow");

    let currentSet = 0;
    const itemsPerSet = 5;
    const totalSets = Math.ceil(items.length / itemsPerSet);

    function showSet(setIndex) {
        const start = setIndex * itemsPerSet;
        const end = start + itemsPerSet;
        items.forEach((item, index) => {
            item.style.display = (index >= start && index < end) ? "block" : "none";
        });
    }

    leftArrow.addEventListener("click", () => {
        currentSet = (currentSet - 1 + totalSets) % totalSets;
        showSet(currentSet);
    });

    rightArrow.addEventListener("click", () => {
        currentSet = (currentSet + 1) % totalSets;
        showSet(currentSet);
    });

    // Initial display
    showSet(currentSet);
});
