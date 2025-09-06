
import { handleAllSliders, slidersConfig } from "./modules/swiper.js";

const swipers = [
  {
    selector: ".holiday-variant .swiper",
    breakpoint: 122313213123,
    options: {
      loop: false,
      slidesPerView: 3,
      spaceBetween: 20,
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