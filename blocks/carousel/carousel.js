function initCarousel() {
  const carousel = document.querySelector('.carousel.block');
  if (!carousel) return;
  const allDivs = carousel.querySelectorAll(':scope > div');
  if (allDivs.length < 3) return;
  const nextArrowDiv = allDivs[0];
  const prevArrowDiv = allDivs[allDivs.length - 1];
  const nextArrow = nextArrowDiv.querySelector('p');
  const prevArrow = prevArrowDiv.querySelector('p');
  // Slides = everything except first & last
  const slides = Array.from(allDivs).slice(1, allDivs.length - 1);
  if (!slides.length) return;
  // Create sliding wrapper
  const slideTrack = document.createElement('div');
  slideTrack.classList.add('slide-track');
  slides.forEach(slide => {
    slideTrack.appendChild(slide);
  });
  carousel.insertBefore(slideTrack, prevArrowDiv);
  let currentIndex = 0;
  const totalSlides = slides.length;
  function updateSlide() {
    slideTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
  // NEXT
  nextArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlide();
  });
  // PREVIOUS
  prevArrow.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlide();
  });
}
  initCarousel();   