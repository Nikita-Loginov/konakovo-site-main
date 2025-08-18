import { classAction } from "./modules/classActions.js";
import { addClassDisabledBtn } from "./functions.js";
import { initSwiper } from "./modules/renderContent.js";
import { removeImgTop, animationBlock, showForm } from "./modules/animation.js";

const initSwipers = () => {
  const organizationSwiper = new Swiper(".organization__swiper", {
    slidesPerView: 1.1,
    spaceBetween: 12,
    navigation: {
      nextEl: ".organization .arrow-swiper.next",
      prevEl: ".organization .arrow-swiper.prev",
    },
    breakpoints: {
      1300: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      767: {
        slidesPerView: 2.3,
      },
      550: {
        slidesPerView: 1.6,
      },
    },
    on: {
      slideChange: (swiper) => {
        addClassDisabledBtn(swiper);
      },
    },
  });

  initSwiper(".places__swiper", {
    slidesPerView: 1.1,

    spaceBetween: 12,
    loop: true,

    breakpoints: {
      1381: {
        slidesPerView: 3,
        effect: "coverflow",
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 1,
          slideShadows: false,
        },
      },

      767: {
        slidesPerView: 2,
        spaceBetween: 20,
      },

      450: {
        slidesPerView: 1.3,
      },
    },

    navigation: {
      nextEl: ".places .arrow-swiper.next",
      prevEl: ".places .arrow-swiper.prev",
    },
  });
};

document.addEventListener("scroll", () => {
  removeImgTop();
  animationBlock();
  showForm();
});

document.addEventListener("DOMContentLoaded", () => {
  removeImgTop();
  animationBlock();
  showForm();
  initSwipers();
});
