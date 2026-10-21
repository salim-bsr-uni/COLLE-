document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('scrollerTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('#indicators .dot');
    const slides = document.querySelectorAll('.scroller-page');

    let currentIndex = 0;

    // Scroll to specific slide index
    function scrollToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        currentIndex = index;
        const slideWidth = track.clientWidth;
        
        track.scrollTo({
            left: slideWidth * currentIndex,
            behavior: 'smooth'
        });

        updateIndicators();
    }

    // Update dot highlight
    function updateIndicators() {
        dots.forEach((dot, idx) => {
            if (idx === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Next / Previous button event listeners
    nextBtn.addEventListener('click', () => {
        scrollToSlide(currentIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
        scrollToSlide(currentIndex - 1);
    });

    // Dot indicator click event listeners
    dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            const targetIndex = parseInt(e.target.getAttribute('data-index'), 10);
            scrollToSlide(targetIndex);
        });
    });

    // Sync dots if user manually swipes/scrolls on touch devices
    track.addEventListener('scroll', () => {
        const slideWidth = track.clientWidth;
        if (slideWidth > 0) {
            const newIndex = Math.round(track.scrollLeft / slideWidth);
            if (newIndex !== currentIndex && newIndex >= 0 && newIndex < slides.length) {
                currentIndex = newIndex;
                updateIndicators();
            }
        }
    });
});