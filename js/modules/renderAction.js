import { handleAllSliders, slidersConfig } from "./swiper.js";
import { addClassDisabledBtn } from "../functions.js";

export const renderMoreSwiper = (block) => {
  if (!block) return;

  const blockItem = document.querySelector(`${block}`);

  if (!blockItem) return 
  const itemsBox = blockItem.querySelector(".items-more");

  if (!itemsBox) return 
  
  const length = itemsBox.children.length;

  const relative = blockItem.closest("section");

  if (length > 1) {
    relative.classList.add("boxSlide");

    new Swiper(`${block} .swiper`, {
      slidesPerView: 1.1,
      watchSlidesProgress: true,
      spaceBetween: 16,
      navigation: {
        nextEl: `${block} .arrow-swiper.next`,
        prevEl: `${block} .arrow-swiper.prev`,
      },

      breakpoints: {
        840: {
          slidesPerView: 1.7,
          spaceBetween: 20,
        }
      },

      on: {
        init: () => {
          console.log("dsad");
        },
        progress: (swiper) => {
          addClassDisabledBtn(swiper);
          console.log("Progress changed!");
        },
      },
    });
  }
};
