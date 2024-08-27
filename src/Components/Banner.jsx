import React, { useRef, useEffect, useState } from 'react';

function VideoCarousel() {
  const videoRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselItems = useRef([]);

  // Define nextSlide and prevSlide functions
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % carouselItems.current.length;
      showSlide(newIndex);
      return newIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + carouselItems.current.length) % carouselItems.current.length;
      showSlide(newIndex);
      return newIndex;
    });
  };

  // Show slide based on index
  const showSlide = (index) => {
    carouselItems.current.forEach((item, i) => {
      item.classList.toggle('hidden', i !== index);
      if (i === index && videoRefs.current[i]) {
        videoRefs.current[i].play().catch(error => {
          console.error('Autoplay was prevented:', error);
        });
      } else if (videoRefs.current[i]) {
        videoRefs.current[i].pause();
        videoRefs.current[i].currentTime = 0;
      }
    });
  };

  useEffect(() => {
    carouselItems.current = document.querySelectorAll('[data-carousel-item]');
    showSlide(currentIndex);

    // Set up automatic slide transition
    const intervalId = setInterval(nextSlide, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  useEffect(() => {
    const prevButton = document.querySelector('[data-carousel-prev]');
    const nextButton = document.querySelector('[data-carousel-next]');

    if (prevButton) prevButton.addEventListener('click', prevSlide);
    if (nextButton) nextButton.addEventListener('click', nextSlide);

    return () => {
      if (prevButton) prevButton.removeEventListener('click', prevSlide);
      if (nextButton) nextButton.removeEventListener('click', nextSlide);
    };
  }, []);

  return (
    <div id="video-carousel" className="relative w-full h-[110vh] mt-20" data-carousel="slide">
      <div className="relative h-full overflow-hidden rounded-lg">
        <div className="hidden duration-1000 ease-in-out" data-carousel-item>
          <video 
            ref={el => videoRefs.current[0] = el}
            src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/male-auctioneer-asking-bids-for-painting-animation-download-in-lottie-json-gif-static-svg-file-formats--auction-house-man-bidder-buying-pack-e-commerce-shopping-animations-6876692.mp4"
            className="absolute block w-full h-full object-cover"
            alt="Slide 1"
            // controls
          />
        </div>
        <div className="hidden duration-1000 ease-in-out" data-carousel-item>
          <video 
            ref={el => videoRefs.current[1] = el}
            src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/business-auction-animation-download-in-lottie-json-gif-static-svg-file-formats--financial-law-data-audit-pack-animations-5086299.mp4"
            className="absolute block w-full h-full object-cover"
            alt="Slide 2"
            // controls
          />
        </div>
        {/* Add more slides here if needed */}
      </div>

      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        <button type="button" className="w-3 h-3 rounded-full bg-white" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" className="w-3 h-3 rounded-full bg-white" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        {/* Add more indicators here if needed */}
      </div>

      <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-700/70 hover:bg-gray-700/90">
          <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-700/70 hover:bg-gray-700/90">
          <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}

export default VideoCarousel;
