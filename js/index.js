import { removeImgTop, animationBlock, showForm } from "./modules/animation.js";
import { classAction } from "./modules/classActions.js";
import { handleAllSliders, slidersConfig } from "./modules/swiper.js";
import { initAnimation } from "./modules/animationCardEvents.js";
import { initCustomSelects } from "./modules/validate.js";

const swipers = [
  {
    selector: ".services__slider",
    breakpoint: 1223,
    options: {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,

      breakpoints: {
        800: {
          slidesPerView: 2.4,
        },

        700: {
          slidesPerView: 2,
        },

        500: {
          slidesPerView: 1.3,
        },
      },

      pagination: {
        el: ".services__slider .swiper-pagination",
        clickable: true,
      },
    },
  },
  {
    selector: ".about__swiper",
    breakpoint: 768,
    options: {
      loop: true,
      slidesPerView: 1.2,
      spaceBetween: 16,
    },
    events: {
      slideChange: function (swiper) {
        const aboutImgs = document.querySelectorAll(
          ".about__swiper-box .about__img"
        );
        changeCategory(swiper.realIndex, aboutImgs);
      },
    },
  },
  {
    selector: ".swiper__offers",
    breakpoint: 768,
    options: {
      // loop: true,
      slidesPerView: 1,
      spaceBetween: 12,

      pagination: {
        el: ".swiper__offers .swiper-pagination",
        clickable: true,
      },

      breakpoints: {
        550: {
          slidesPerView: 1.7,
        },
      },
    },
  },
  {
    selector: ".gallery__swiper",
    breakpoint: 100000000,
    breakpointMax: 500,
    options: {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 20,

      navigation: {
        nextEl: ".gallery .arrow-swiper.next",
        prevEl: ".gallery .arrow-swiper.prev",
      },

      breakpoints: {
        767: {
          slidesPerView: 4,
        },
      },
    },
  },
  {
    selector: ".events__swiper",
    breakpoint: 1280,
    options: {
      // loop: true,
      slidesPerView: 1,
      spaceBetween: 20,
      // autoHeight: true,

      pagination: {
        el: ".events .swiper-pagination",
        clickable: true,
      },

      breakpoints: {
        767: {
          slidesPerView: 2,
        },

        600: {
          slidesPerView: 1.4,
        },
      },
    },
  },
];

removeImgTop();
animationBlock();
showForm();
initAnimation();

document.addEventListener("scroll", () => {
  removeImgTop();
  animationBlock();
  showForm();
});

function showAnothetCategory() {
  const aboutImgs = document.querySelectorAll(".about__img");
  const aboutInfoLinks = document.querySelectorAll(".about__info-link");

  if (aboutImgs && aboutInfoLinks) {
    aboutInfoLinks.forEach((item, index) => {
      item.addEventListener("mouseenter", () => {
        changeCategory(index, aboutImgs, aboutInfoLinks);
      });
    });
  }
}

export function changeCategory(activeIndex, imgs, links) {
  if (links) {
    removeAllElementsActiveClass(links, "active");
    classAction(links[activeIndex], "active", "add");
  }

  removeAllElementsActiveClass(imgs, "active");
  classAction(imgs[activeIndex], "active", "add");
}

function removeAllElementsActiveClass(items, className) {
  items.forEach((item) => {
    classAction(item, className, "remove");
  });
}

showAnothetCategory();

document.addEventListener("DOMContentLoaded", () => {
  swipers.forEach((config) => {
    slidersConfig.push(config)
  })

  handleAllSliders();
});


document.addEventListener('click', (e) => {
  if (e.target.closest('.reservation-form__box.guests')) {
    const guests = e.target.closest('.reservation-form__box.guests');

    guests.classList.add('open')
  } else {
    const guests = document.querySelector('.reservation-form__box.guests');

    if (!guests) return

    guests.classList.remove('open')
  }
})

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleAllSliders, 10);
});