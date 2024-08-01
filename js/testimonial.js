document.addEventListener("DOMContentLoaded", function () {
    // Automatic Slider for Main Slider
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
    setInterval(nextSlide, 3000); // Change slide every 3 seconds

    // Manual Slider for Products with Arrows
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

    // Initial display for products
    showSet(currentSet);

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    let testimonialIndex = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? "block" : "none";
        });
    }

    function nextTestimonial() {
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        showTestimonial(testimonialIndex);
    }

    function prevTestimonial() {
        testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(testimonialIndex);
    }

    document.querySelector('.next').addEventListener('click', nextTestimonial);
    document.querySelector('.prev').addEventListener('click', prevTestimonial);

    showTestimonial(testimonialIndex);
    setInterval(nextTestimonial, 5000); // Change testimonial every 5 seconds
});
