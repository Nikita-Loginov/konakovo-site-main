import {
  initMoreText,
  toggleButton,
  getHtmlButton,
} from "./modules/moreText.js";
import { toggleAccordeonItems } from "./modules/accordeon.js";
import { searcBlockTab } from "./modules/tab.js";
import { initContentMore } from "./functions.js";
import { serviceItems } from "./data/goods.js";

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


initContentMore({
  containerSelector: ".servicesMore__items",
  data: [...serviceItems.slice(0,10)],
  showCount: 4,
  showCountMobile: 2,
  maxWidthInitMobile: 0,
  buttonTexts: {
    expanded: "показать меньше",
    collapsed: "показать еще",
  },
  maxWidthInit: 13300000,
  functions: {
    getHtmlItem: (item) => {
      return `<div class="card-info moreContent__item">
                    <div class="card-info__img">
                      <picture>
                          <source srcset="${item.imgSrc}.${item.imgFormat || 'png'} 1x, ${item.imgSrc}2x.${item.imgFormat || 'png'} 2x">
                          <img src="${item.imgSrc}.${item.imgFormat || 'png'}" alt="фотография">
                      </picture>
                    </div>

                    <div class="card-info__content">
                      <h4 class="card-info__title">${item.name || 'Услуга'}</h4>
                    </div>
                  </div>`;
    },
  },
});

initSwipers();
