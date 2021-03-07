const carousel = ($container, images) => {
  let currentSlideIndex = 1;
  let delay = 500;
  let intervalTimerId;
  let setTimerId;
  let isClickable = true;

  $container.innerHTML = `<div class="carousel-slides"> ${images.map((image, i) => 
    `<img id="${i + 1}" src="${image}">`
  ).join('')}</div>
  <button class="carousel-control prev">&laquo;</button>
  <button class="carousel-control next">&raquo;</button>
  <div class="page-container">
  ${images.map((_, i) => `<button id="${i + 1}" class="pagination"></button>`).join('')}
  </div>
  </div>`;

  const $carouselSlides = document.querySelector('.carousel-slides');
  const $prevBtn = document.querySelector('.prev');
  const $nextBtn = document.querySelector('.next');
  const $pageContainer = document.querySelector('.page-container');

  const $firstChild = $carouselSlides.firstElementChild;
  const $lastChild = $carouselSlides.lastElementChild;
  const $clonedFirst = $firstChild.cloneNode(true);
  const $clonedLast = $lastChild.cloneNode(true);

  $carouselSlides.appendChild($clonedFirst);
  $carouselSlides.prepend($clonedLast);

  const setPageBtnBackground = (firstElColor, lastElColor ) => {
    $pageContainer.firstElementChild.style.background = firstElColor;
    $pageContainer.lastElementChild.style.background = lastElColor;
  };

  const activeSlide = (() => {
    const $pagination = document.querySelectorAll('.pagination');

    return () => {
      if (currentSlideIndex === 5) {
        setPageBtnBackground('#db5b33', '#ccc');
      } else if (currentSlideIndex === 0) {
        setPageBtnBackground('#ccc', '#db5b33');
      } else {
        [...$pagination].forEach($el => {
          $el.style.background = `${+$el.id === currentSlideIndex? '#db5b33' : '#ccc'}`;
        });
      }
    };
  })();

  const setSlides = () => {
    $carouselSlides.style.setProperty('--currentSlide', currentSlideIndex);
    $carouselSlides.style.setProperty('--duration', delay);
  };

  const goBackSlides = currentSlide => {
    currentSlideIndex = currentSlide;
    delay = 0;
    setSlides();
    activeSlide();
  };

  const slideShow = () => {
    if (currentSlideIndex < images.length + 1) {
      currentSlideIndex += 1;
      delay = 500;
      setSlides();
      activeSlide();
    }
  };

  const resetTimer = () => {
    clearInterval(intervalTimerId);
    clearTimeout(setTimerId);
  };

  const startAutoSlide = () => {
    setTimerId = setTimeout(() => {
      intervalTimerId = setInterval(slideShow, 1000);
    }, 1000);
  };

  $carouselSlides.ontransitionend = () => {
    isClickable = true;
    if (currentSlideIndex === images.length + 1) {
      goBackSlides(1);
    }

    if (currentSlideIndex === 0) {
      goBackSlides(4);
    }
  };

  $carouselSlides.ontransitionstart = () => {
    isClickable = false;
  };

  $nextBtn.onclick = () => {
    if (isClickable) {
      resetTimer();
      slideShow();
    //  startAutoSlide();
    }
  };

  $prevBtn.onclick = () => {
    resetTimer();
    if (isClickable) {
      if (currentSlideIndex > 0) {
        currentSlideIndex -= 1;
        delay = 500;
        activeSlide();
        setSlides();
      }
    // startAutoSlide();
    }
  };

  $pageContainer.onclick = e => {
    if (e.target === e.currentTarget) return;
    currentSlideIndex = +e.target.id;
    resetTimer();
    setSlides();
    activeSlide();
    startAutoSlide();
  };

  window.onload = () => {
    $container.style.opacity = '1';
    // console.log($container.scrollWidth);
    $container.style.width = `${$container.scrollWidth / (images.length + 2)}px`;
    $carouselSlides.style.setProperty('--currentSlide', currentSlideIndex);

    // intervalTimerId = setInterval(slideShow, 1000);
    activeSlide();
  };
};

carousel(document.querySelector('.carousel'), [
  './image/movie-1.jpg',
  './image/movie-2.jpg',
  './image/movie-3.jpg',
  './image/movie-4.jpg'
]);
