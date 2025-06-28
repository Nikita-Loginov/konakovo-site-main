import { searcBlockTab } from "./modules/tab.js";
import { handleAllSliders, slidersConfig } from "./modules/swiper.js";
import { toggleAccordeonItems } from "./modules/accordeon.js";

const swipers = [
  {
    selector: ".price-sidebar.swiper",
    breakpoint: 767,
    options: {
      slidesPerView: 'auto',
    },
  },
  {
    selector: ".price__mini-tabs.swiper",
    breakpoint: 7423423542567,
    options: {
      slidesPerView: 'auto',
      spaceBetween: 20,
    },
  },
];

document.addEventListener('click', (e) => {
    searcBlockTab(e);
    toggleAccordeonItems(e);;
})

document.addEventListener('DOMContentLoaded', () => {
 swipers.forEach((config) => {
    slidersConfig.push(config)
  })

  handleAllSliders();
})

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleAllSliders, 10);
});