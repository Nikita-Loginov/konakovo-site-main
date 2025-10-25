import { handleAllSliders, slidersConfig } from "./modules/swiper.js";
import { SWIPER_DATA } from "./swiper/index.js";
import { initCertificateCalculate } from "./modules/certificateCalculate.js";
import { programsData } from "./data/programs.js";
import { initRenderProgramm, renderContentTab } from "./modules/renderTab.js";

const swipers = [
  {
    selector: ".swiper--placeInfo",
    breakpoint: 1000000000,
    options: {
      ...SWIPER_DATA.PLACES_INFO,
      navigation: {
        nextEl: ".swiper--placeInfo .arrow-swiper.next",
        prevEl: ".swiper--placeInfo .arrow-swiper.prev",
      },
    },
  },
  {
    selector: ".swiper--prices",
    breakpoint: 767,
    options: {
      ...SWIPER_DATA.CARDS_ITEMS,
      pagination: {
        el: ".swiper--prices .swiper-pagination",
        clickable: true,
      },
    },
  },
  {
    selector: ".swiper--services",
    breakpoint: 767,
    options: {
      ...SWIPER_DATA.CARDS_ITEMS,
      pagination: {
        el: ".swiper--services .swiper-pagination",
        clickable: true,
      },
    },
  },
  {
    selector: ".swiper--imgsSwiperModal",
    breakpoint: 1000000000,
    options: {
      ...SWIPER_DATA.FILES_PROGRAMS,
      pagination: {
        el: ".swiper--imgsSwiperModal .swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper--imgsSwiperModal .arrow-swiper.next",
        prevEl: ".swiper--imgsSwiperModal .arrow-swiper.prev",
      },
    },
  },
];

export const initSwipers = () => {
  swipers.forEach((config) => {
    slidersConfig.push(config);
  });

  handleAllSliders();
};

document.addEventListener("DOMContentLoaded", () => {
  initSwipers();
  initCertificateCalculate();

  renderContentTab(
    programsData[0],
    document.querySelector(".programs [data-render-tab-box]"),
    {
      swiper: "IMGS_PROGRAMS",
      classSwiperBox: ".swiper--card-presentation-img",
    }
  );
});

document.addEventListener("click", (e) => {
  initRenderProgramm(e, "card-presentation cursor", {
    swiper: "IMGS_PROGRAMS",
    classSwiperBox: ".swiper--card-presentation-img",
  });
});


let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleAllSliders, 10);
});
