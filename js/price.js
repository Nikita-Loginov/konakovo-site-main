import { searcBlockTab } from "./modules/tab.js";
import { handleAllSliders, slidersConfig } from "./modules/swiper.js";
import { toggleAccordeonItems } from "./modules/accordeon.js";
import { setActiveClass } from "./modules/tab.js";

const swipers = [
  {
    selector: ".price-sidebar.swiper",
    breakpoint: 901,
    options: {
      slidesPerView: "auto",
      spaceBetween: 12,
    },
  },
  {
    selector: ".price__mini-tabs.swiper",
    breakpoint: 7423423542567,
    options: {
      slidesPerView: "auto",
      spaceBetween: 20,
    },
  },
  {
    selector: ".swiper--eat",
    breakpoint: 7423423542567,
    options: {
      slidesPerView: "auto",
      spaceBetween: 20,
    },
  },
];

document.addEventListener("click", (e) => {
  searcBlockTab(e);
  toggleAccordeonItems(e);
});

document.addEventListener("DOMContentLoaded", () => {
  swipers.forEach((config) => {
    slidersConfig.push(config);
  });

  handleAllSliders();

  setActiveClass();
});

// const setActiveClass = () => {
//   const url = new URL(window.location.href);

//   if (url.searchParams.size) {
//     const searchs = url.search.slice(1).split("&");

//     if (searchs.length) {
//       for (let i = 0; i < searchs.length; i++) {
//         const item = searchs[i].split("=");

//         const category = item[0];
//         const name = item[1];

//         // console.log(category);

//         if (!category || !name) return;

//         // const findItemBlock = document.querySelector(
//         //   `[data-url="${category}"]`
//         // );

//         // if (!findItemBlock) return;

//         const findActiveBtnItem = document.querySelector(
//           `[data-url-block="${name}"]`
//         );

//         const findActiveBlockItem = document.querySelector(
//           `[data-block-tab="${name}"]`
//         );

//         // console.log(findItemBlock, `[data-block-tab="${name}"]`)

//         if (findActiveBtnItem && findActiveBtnItem.dataset.btnTab) {
//           findActiveBtnItem.classList.add("active");
//           findActiveBlockItem.classList.add("active");
//         }
//       }
//     }

//     return;
//   }

//   setFirstActiveClasses()
// };

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleAllSliders, 10);
});
