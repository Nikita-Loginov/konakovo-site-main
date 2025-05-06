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

const dataToRender = [
  {
      "category": "",
      "name": "Парусный центр россии",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      "imgSrc": "/upload/iblock/aa2/o97fysidbufr2a9dzhdb21lm6nqm0m5p.webp",
      "imgFormat": "",
      "colorClass": "",
      "id": 1
  },
  {
      "category": "",
      "name": "водомоторная техника",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      "imgSrc": "/upload/iblock/731/pmn0bx2u7ajxi5kvgatiqsnkb66sd4t8.webp",
      "imgFormat": "",
      "colorClass": "",
      "id": 2
  },
  {
      "category": "",
      "name": "борд/серф/лыжи",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      "imgSrc": "/upload/iblock/4ec/98rln7p8tak8d20x1y06i8h1x7hubri9.webp",
      "imgFormat": "",
      "colorClass": "",
      "id": 3
  },
  {
      "category": "",
      "name": "Рыбалка",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      "imgSrc": "/upload/iblock/023/8hj5ui80vinyd7j6taj89ux1kkdez7d9.webp",
      "imgFormat": "",
      "colorClass": "",
      "id": 4
  },
  {
      "category": "",
      "name": "Пункт проката",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      "imgSrc": "/upload/iblock/596/6fainxia82v5o1414thjox7qqx8pl4m9.webp",
      "imgFormat": "",
      "colorClass": "",
      "id": 5
  },
  {
      "category": "",
      "name": "Большой теннис",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      "imgSrc": "/upload/iblock/df4/ixxw6tlecmdod0slbt2sg09gv20u49b6.webp",
      "imgFormat": "",
      "colorClass": "",
      "id": 6
  },
  {
      "category": "",
      "name": "Спортивные площадки",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      "imgSrc": "/upload/iblock/874/l1vjm4c5u5pe9cuemdkeuk7thqvvkfjc.webp",
      "imgFormat": "",
      "colorClass": "",
      "id": 7
  },
  {
      "category": "",
      "name": "Квадроциклы и багги",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      "imgSrc": "/upload/iblock/ff4/6a7iknrvhlqe9gxeq6cc9qup417hqs86.webp",
      "imgFormat": "",
      "colorClass": "",
      "id": 8
  },
  {
      "category": "",
      "name": "Яхт-клуб",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      "imgSrc": "/upload/iblock/726/kz2j4bkf1wtz0f7hwyjgr4kvn75ahno8.webp",
      "imgFormat": "",
      "colorClass": "",
      "id": 9
  },
  {
      "category": "",
      "name": "Лыжи",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      "imgSrc": "/upload/iblock/ff4/6a7iknrvhlqe9gxeq6cc9qup417hqs86.webp",
      "imgFormat": "",
      "colorClass": "",
      "id": 10
  }
];

initContentMore({
  containerSelector: ".servicesMore__items",
  data:dataToRender,
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
      // console.log("Элемент внутри getHtmlItem:", item);
      if (!item) return ''; // Защита от undefined

      // Формируем srcset и src для изображения
      const imgBase = item.imgSrc || ''; // Базовый путь без расширения
      const imgFormat = item.imgFormat || 'webp'; // По умолчанию webp (так как у вас .webp)
      const imgSrc = `${imgBase}.${imgFormat}`; // Полный путь к изображению
      const imgSrc2x = `${imgBase}2x.${imgFormat}`; // Путь к изображению 2x (если есть)

      return `
        <div class="card-info moreContent__item">
          <div class="card-info__img">
            <picture>
              <source srcset="${imgSrc} 1x, ${imgSrc2x} 2x">
              <img src="${imgSrc}" alt="${item.name || 'Услуга'}">
            </picture>
          </div>
          <div class="card-info__content">
            <h4 class="card-info__title">${item.name || 'Услуга'}</h4>
          </div>
        </div>
      `;
    },
  },

})
initSwipers();
