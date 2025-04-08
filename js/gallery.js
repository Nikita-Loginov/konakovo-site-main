import { handleAllSliders, slidersConfig } from "./modules/swiper.js";
import { photos } from "./data/goods.js";
import { initContentMore } from "./functions.js";
import { addClassDisabledBtn } from "./functions.js";

const swipers = [
  {
    selector: ".photos__swiper--small",
    breakpoint: 100000000,
    breakpointMax: 600,
    options: {
      loop: true,
      slidesPerView: 4,
      initialSlide: 3,
      centeredSlides: true,
      spaceBetween: 20,

      navigation: {
        nextEl: ".photos .arrow-swiper.next",
        prevEl: ".photos .arrow-swiper.prev",
      },
    },
  },

  {
    selector: ".photos__swiper--big",
    breakpoint: 100000000,
    breakpointMax: 600,
    options: {
      loop: true,
      slidesPerView: 3,
      initialSlide: 3,
      centeredSlides: true,
      spaceBetween: 20,

      navigation: {
        nextEl: ".photos .arrow-swiper.next",
        prevEl: ".photos .arrow-swiper.prev",
      },
    },
  },

  {
    selector: ".videos__swiper",
    breakpoint: 100000000,
    options: {
      // loop: true,
      slidesPerView: 1.1,
      initialSlide: 1,

      spaceBetween: 12,
      

      navigation: {
        nextEl: ".videos .arrow-swiper.next",
        prevEl: ".videos .arrow-swiper.prev",
      },

      breakpoints : {
        1024 : {
          slidesPerView: 2.5,

          spaceBetween: 20,
          centeredSlides: true,
        },

        768 : {
          slidesPerView: 2,
        },

        550 : {
          slidesPerView: 1.4,
        }
      },

      on: {
        slideChange: (swiper) => {
          addClassDisabledBtn(swiper);
        },
      },
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

document.addEventListener("DOMContentLoaded", () => {
  Fancybox.bind("[data-fancybox='gallery-photo']", {});
  Fancybox.bind("[data-fancybox='gallery-photo-big']", {});
  Fancybox.bind("[data-fancybox='gallery-videos']", {});
});

const contentMore = initContentMore({
  containerSelector: ".photos__content",
  data: [...photos],
  showCount: 4,
  showCountMobile: 2,
  //   maxWidthInitMobile: 1100,
  buttonTexts: {
    expanded: "показать меньше",
    collapsed: "показать еще",
  },
  maxWidthInit: 600,
  functions: {
    getHtmlItem: (item) => {
      return `<picture class="moreContent__item">
                      <source
                        srcset="
                          ${item.imgSrc}.${item.imgFormat}   1x,
                          ${item.imgSrc}2x.${item.imgFormat} 2x
                        "
                      />
                      <img
                        src="${item.imgSrc}.${item.imgFormat}"
                        height="250"
                        alt="фотография дома"
                      />
                    </picture>`;
    },
  },
});
