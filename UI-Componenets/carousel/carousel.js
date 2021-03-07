const carousel = ($container, images) => {
  let currentSlideIndex = 1;
  let delay = 500;
  let intervalTimerId;
  let setTimerId;
  let isClickable = true;

  $container.innerHTML = `<div class="carousel-slides"> ${images.map((image, i) => `
    <img id="${i + 1}" src="${image}">`).join('')}</div>
    <button class="carousel-control prev">&laquo;</button>
    <button class="carousel-control next">&raquo;</button>
    <div class="page-container">
    ${images.map((_, i) => `<button id="${i + 1}" class="pagination"></button>`).join('')}
  </div>`;

  const $carouselSlides = document.querySelector('.carousel-slides');
  const $prevBtn = document.querySelector('.prev');
  const $nextBtn = document.querySelector('.next');
  const $pageContainer = document.querySelector('.page-container');

  const $clonedFirst = $carouselSlides.firstElementChild.cloneNode(true);
  const $clonedLast = $carouselSlides.lastElementChild.cloneNode(true);

  $carouselSlides.appendChild($clonedFirst);
  $carouselSlides.prepend($clonedLast);

  const setPageBtnBackground = (firstElColor, lastElColor) => {
    $pageContainer.firstElementChild.style.background = firstElColor;
    $pageContainer.lastElementChild.style.background = lastElColor;
  };

  const changeIndicatorColor = (() => {
    const $pagination = document.querySelectorAll('.pagination');

    return () => {
      if (currentSlideIndex === 5) {
        setPageBtnBackground('#db5b33', '#ccc');
      } else if (currentSlideIndex === 0) {
        setPageBtnBackground('#ccc', '#db5b33');
      } else {
        [...$pagination].forEach($el => {
          $el.style.background = `${+$el.id === currentSlideIndex ? '#db5b33' : '#ccc'}`;
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
    changeIndicatorColor();
  };

  const slideShow = count => {
    currentSlideIndex += count;
    delay = 500;
    setSlides();
    changeIndicatorColor();
  };

  const resetTimer = () => {
    clearInterval(intervalTimerId);
    clearTimeout(setTimerId);
  };

  const startAutoSlide = () => {
    setTimerId = setTimeout(() => {
      intervalTimerId = setInterval(slideShow, 1000, 1);
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

  // $carouselSlides.ontransitionstart = () => {
  //   isClickable = false;
  // };

  $nextBtn.onclick = () => {
    if (isClickable) {
      resetTimer();
      if (currentSlideIndex < images.length + 1) slideShow(1);
      startAutoSlide();
    }
  };

  $prevBtn.onclick = () => {
    if (isClickable) {
      resetTimer();
      if (currentSlideIndex > 0) slideShow(-1);

      startAutoSlide();
    }
  };

  $pageContainer.onclick = e => {
    if (e.target === e.currentTarget) return;
    currentSlideIndex = +e.target.id;
    resetTimer();
    setSlides();
    changeIndicatorColor();
    startAutoSlide();
  };

  window.onload = () => {
    $container.style.opacity = '1';
    // console.log($container.scrollWidth);
    $container.style.width = `${$container.scrollWidth / (images.length + 2)}px`;
    $carouselSlides.style.setProperty('--currentSlide', currentSlideIndex);

    intervalTimerId = setInterval(slideShow, 1000, 1);
    changeIndicatorColor();
  };
};

carousel(document.querySelector('.carousel'), [
  './image/movie-1.jpg',
  './image/movie-2.jpg',
  './image/movie-3.jpg',
  './image/movie-4.jpg'
]);
