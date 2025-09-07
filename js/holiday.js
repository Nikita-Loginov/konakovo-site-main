import { handleAllSliders, slidersConfig } from "./modules/swiper.js";
import {
  searcBlockTab,
  setActiveClass,
  initSwiperTabs,
} from "./modules/tab.js";

const swipers = [
  {
    selector: ".holiday-variant .swiper",
    breakpoint: 122313213123,
    options: {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 12,
      breakpoints: {
        1224: {
          slidesPerView: 3,
        },
        1023: {
          slidesPerView: 2,
        },
        767: {
          spaceBetween: 20,
          slidesPerView: 1.4,
        },
      },
    },
  },
  {
    selector: ".holiday-rooms .swiper--tabs",
    breakpoint: 122313213123,
    options: {
      loop: false,
      slidesPerView: "auto",
      spaceBetween: 20,
    },
  },
  {
    selector: ".holiday-detail .swiper",
    breakpoint: 122313213123,
    options: {
      loop: true,
      slidesPerView: "auto",
      spaceBetween: 20,
      pagination: {
        el: ".holiday-detail .swiper .swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".holiday-detail .swiper .arrow-swiper.next",
        prevEl: ".holiday-detail .swiper .arrow-swiper.prev",
      },
    },
  },
  {
    selector: ".holiday-format .swiper--holiday-format",
    breakpoint: 1024,
    options: {
      slidesPerView: "auto",
      spaceBetween: 20,
    },
  },
  {
    selector: ".gallery__swiper",
    breakpoint: 100000000,
    options: {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,

      navigation: {
        nextEl: ".gallery .arrow-swiper.next",
        prevEl: ".gallery .arrow-swiper.prev",
      },
      pagination: {
        el: ".gallery .swiper .swiper-pagination",
        clickable: true,
      },

      breakpoints: {
        1023: {
          slidesPerView: 4,
        },
        767: {
          slidesPerView: 3,
        },
        600: {
          slidesPerView: 2,
        }
      },
    },
  },
];

document.addEventListener("DOMContentLoaded", () => {
  swipers.forEach((config) => {
    slidersConfig.push(config);
  });

  handleAllSliders();
  initSwiperTabs(
    document.querySelector(
      ".holiday-format .holiday-format__items .tab-item.active"
    )
  );

  document.addEventListener("click", (e) => {
    searcBlockTab(e);
  });

  setActiveClass();
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleAllSliders, 10);
});
