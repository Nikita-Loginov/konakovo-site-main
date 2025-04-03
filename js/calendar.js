import { handleAllSliders, slidersConfig } from "./modules/swiper.js";

const swipers = [
  {
    selector: ".swiper__years",
    breakpoint: 100000,
    options: {
      slidesPerView: "auto",
      spaceBetween: 12,
    },
  },
  {
    selector: ".swiper__month",
    breakpoint: 100000,
    options: {
      slidesPerView: "auto",
      spaceBetween: 20,
    },
  },
  {
    selector: ".swiper__calendar-items",
    breakpoint: 1024,

    options: {
      spaceBetween: 16,
      slidesPerView: 1.1,
      breakpoint : {
        1024 : {
          spaceBetween: 20,
        },

        768 : {
          slidesPerView: 2,
        },


        550 : {
          slidesPerView: 1.2,
        }
      }
    },
  },
];

document.addEventListener("DOMContentLoaded", () => {
  swipers.forEach((config) => {
    slidersConfig.push(config);
  });

  handleAllSliders();
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleAllSliders, 10);
});
