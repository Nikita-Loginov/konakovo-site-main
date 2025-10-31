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
  searcBlockTab(e);
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

const dataToRender = [
  {
    category: "",
    name: "Парусный центр россии",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    imgSrc: "/img/serviceInfo-item/four",
    imgFormat: "",
    colorClass: "",
    id: 1,
  },
  {
    category: "",
    name: "водомоторная техника",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    imgSrc: "/img/serviceInfo-item/four",
    imgFormat: "",
    colorClass: "",
    id: 2,
  },
  {
    category: "",
    name: "борд/серф/лыжи",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    imgSrc: "/img/serviceInfo-item/four",
    imgFormat: "",
    colorClass: "",
    id: 3,
  },
  {
    category: "",
    name: "Рыбалка",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    imgSrc: "/img/serviceInfo-item/four",
    imgFormat: "",
    colorClass: "",
    id: 4,
  },
  {
    category: "",
    name: "Пункт проката",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    imgSrc: "/img/serviceInfo-item/four",
    imgFormat: "",
    colorClass: "",
    id: 5,
  },
  {
    category: "",
    name: "Большой теннис",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    imgSrc: "/img/serviceInfo-item/four",
    imgFormat: "",
    colorClass: "",
    id: 6,
  },
  {
    category: "",
    name: "Спортивные площадки",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    imgSrc: "/img/serviceInfo-item/four",
    imgFormat: "",
    colorClass: "",
    id: 7,
  },
  {
    category: "",
    name: "Квадроциклы и багги",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    imgSrc: "/img/serviceInfo-item/four",
    imgFormat: "",
    colorClass: "",
    id: 8,
  },
  {
    category: "",
    name: "Яхт-клуб",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    imgSrc: "/img/serviceInfo-item/four",
    imgFormat: "",
    colorClass: "",
    id: 9,
  },
  {
    category: "",
    name: "Лыжи",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    imgSrc: "/img/serviceInfo-item/four",
    imgFormat: "",
    colorClass: "",
    id: 10,
  },
];

initContentMore({
  containerSelector: ".servicesMore__items",
  data: dataToRender,
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
      if (!item) return "";

      const imgBase = item.imgSrc || "";
      const imgFormat = item.imgFormat || "webp";
      const imgSrc = `${imgBase}.${imgFormat}`;
      const imgSrc2x = `${imgBase}2x.${imgFormat}`;

      return `
        <div class="card-info moreContent__item">
          <div class="card-info__img">
            <picture>
              <source srcset="${imgSrc} 1x, ${imgSrc2x} 2x">
              <img src="${imgSrc}" alt="${item.name || "Услуга"}">
            </picture>
          </div>
          <div class="card-info__content">
            <h4 class="card-info__title">${item.name || "Услуга"}</h4>
          </div>
        </div>
      `;
    },
  },
});
initSwipers();
