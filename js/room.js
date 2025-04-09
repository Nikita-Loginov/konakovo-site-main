import { searcBlockTab } from "./modules/tab.js";
import { handleAllSliders, slidersConfig } from "./modules/swiper.js";

const swipers = [
  {
    selector: ".roomGallery__swiper",
    breakpoint: 1000000,
    options: {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,

      pagination: {
        el: ".roomGallery .swiper-pagination",
        clickable: true,
      },

      breakpoints: {
        1360: {
          slidesPerView: 3,
        },
        767: {
          slidesPerView: 2,
        },
        // 550 : {
        //     slidesPerView: 1,
        // }
      },

      navigation: {
        nextEl: ".roomGallery .arrow-swiper.next",
        prevEl: ".roomGallery .arrow-swiper.prev",
      },
    },
  },

  {
    selector: ".roomInfo__btns",
    breakpoint: 1023,
    options: {
      slidesPerView: "auto",
      spaceBetween: 16,
    },
  },
];

document.addEventListener("DOMContentLoaded", () => {
  swipers.forEach((config) => {
    slidersConfig.push(config)
  })

  handleAllSliders();
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleAllSliders, 10);
});

// const swiperGallery = new Swiper(".roomGallery__swiper", {
//   slidesPerView: 1,
//   spaceBetween: 20,
//   loop: true,

//   pagination: {
//     el: ".roomGallery .swiper-pagination",
//     clickable: true,
//   },

//   breakpoints: {
//     1360: {
//       slidesPerView: 3,
//     },
//     767: {
//       slidesPerView: 2,
//     },
//     // 550 : {
//     //     slidesPerView: 1,
//     // }
//   },

//   navigation: {
//     nextEl: ".roomGallery .arrow-swiper.next",
//     prevEl: ".roomGallery .arrow-swiper.prev",
//   },
// });

document.addEventListener("click", (e) => searcBlockTab(e));
