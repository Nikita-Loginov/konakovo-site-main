import {
  initMoreText,
  toggleButton,
  getHtmlButton,
} from "./modules/moreText.js";
import { toggleAccordeonItems } from "./modules/accordeon.js";
import { searcBlockTab } from "./modules/tab.js";


function showBtn() {
  const textBoxs = document.querySelectorAll(".moreText__textbox");

  textBoxs.forEach((text) => {
    const textBox = text.closest(".moreText");
    const contentBox = textBox.querySelector(".moreText__content");

    let htmlBtn;
    if (text.clientHeight < 120) {
      return;
    } else {
      htmlBtn = getHtmlButton("Развернуть");
    }

    contentBox.insertAdjacentHTML("beforeend", htmlBtn);
  });
}

showBtn();

document.addEventListener("click", (e) => {
  initMoreText(e);
  toggleButton(e);
  toggleAccordeonItems(e);
  searcBlockTab(e)
});

function initSwipers() {
  const swiperPromo = new Swiper(".promo__swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,

    navigation: {
      nextEl: ".promo .arrow-swiper.next",
      prevEl: ".promo .arrow-swiper.prev",
    },

    pagination: {
      el: ".promo .swiper-pagination",
      clickable: true,
    },

    breakpoints: {
      1024: {
        slidesPerView: 1,
      },
      550: {
        slidesPerView: 2.3,
      },
    },
  });
}

initSwipers();
