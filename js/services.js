import { serviceCategories, serviceItems } from "./data/goods.js";
import { initSwiper } from "./modules/renderContent.js";
import { handleAllSliders, slidersConfig } from "./modules/swiper.js";
import { classAction } from "./modules/classActions.js";
import { addClassDisabledBtn } from "./functions.js";
import { initContentMore } from "./functions.js";
import { setDisabledArrow } from "./modules/swiper.js";

const CONFIG = {
  ACTIVE_TAB: 0,
  MAX_COUNT: 4,
};

const swipers = [
  {
    selector: ".places__swiper",
    breakpoint: 1223,
    options: {
      // loop: true,
      slidesPerView: 1.1,
      spaceBetween: 12,

      breakpoints: {
        767: {
          slidesPerView: 2,
        },

        450: {
          slidesPerView: 1.3,
        },
      },
    },
  },
];

let swiperItems;

const getHtmlTabBtn = (item) => {
  const classActive = renderActiveClass(item.id - 1);

  const html = `<div class="swiper-slide">
                        <div
                          class="servicesMore__tab tab-btn btnTab ${classActive}"
                          data-btn-tab=${item?.name || ""}
                        >
                        ${item?.text || ""}
                        </div>
                      </div>`;

  return html;
};

const getHtmlBoxHead = (lenght) => {
  const arrows = lenght > CONFIG.MAX_COUNT ? getArrows() : "";
  const html = `
    <h4 class="servicesMore__content-title">${
      serviceCategories[CONFIG.ACTIVE_TAB].text
    }</h4>

    ${arrows}

    `;

  return html;
};

const getItemServices = (item) => {
  return `<a href="serviceCard.html" class="swiper-slide">
                        <div
                          class="services__slide services-item ${
                            item?.colorClass
                              ? `services-item--${item.colorClass}`
                              : ""
                          }"
                        >
                          <div class="services-item__img">
                            <picture>
                              <source
                                srcset="
                                  ${item?.imgSr || "./img/services/one"}.${
    item.imgFormat || "png"
  }   1x,
                                  ${item?.imgSrc || "./img/services/one"}2x.${
    item.imgFormat || "png"
  } 2x
                                "
                              />
                              <img
                                height="260"
                                src="${
                                  item?.imgSrc || "./img/services/one"
                                }2x.${item.imgFormat || "png"}"
                                alt="${item.name}"
                              />
                            </picture>
                          </div>

                          <div class="services-item__content">
                            <h3 class="services-item__title">${item.name}</h3>


                          </div>
                        </div>
                      </a>`;
};

const getArrows = () => {
  return `
                  <div class="arrows-swiper">
                    <button
                      class="arrow-swiper prev disabled"
                      aria-label="перемотать на предыдущий слайд"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="7.000000"
                        height="14.000000"
                        viewBox="0 0 7 14"
                        fill="none"
                      >
                        <defs />
                        <path
                          id="Vector (Stroke)"
                          d="M0.21 0.19C0.48 -0.07 0.92 -0.07 1.19 0.2L6.38 5.31L6.39 5.33C7.22 6.26 7.19 7.66 6.33 8.56L6.32 8.57L1.2 13.78C0.94 14.06 0.49 14.07 0.21 13.81C-0.07 13.55 -0.08 13.12 0.19 12.85L5.3 7.64C5.68 7.25 5.69 6.64 5.34 6.22L0.19 1.15C-0.08 0.88 -0.07 0.45 0.21 0.19Z"
                          fill="#FFFFFF"
                          fill-opacity="1.000000"
                          fill-rule="evenodd"
                        />
                      </svg>
                    </button>

                    <button
                      class="arrow-swiper next"
                      aria-label="перемотать на предыдущий слайд"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="7.000000"
                        height="14.000000"
                        viewBox="0 0 7 14"
                        fill="none"
                      >
                        <defs />
                        <path
                          id="Vector (Stroke)"
                          d="M0.21 0.19C0.48 -0.07 0.92 -0.07 1.19 0.2L6.38 5.31L6.39 5.33C7.22 6.26 7.19 7.66 6.33 8.56L6.32 8.57L1.2 13.78C0.94 14.06 0.49 14.07 0.21 13.81C-0.07 13.55 -0.08 13.12 0.19 12.85L5.3 7.64C5.68 7.25 5.69 6.64 5.34 6.22L0.19 1.15C-0.08 0.88 -0.07 0.45 0.21 0.19Z"
                          fill="#FFFFFF"
                          fill-opacity="1.000000"
                          fill-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>`;
};

const renderActiveClass = (index) => {
  return index === CONFIG.ACTIVE_TAB ? "active" : "";
};

const renderBtnTabs = (
  container = ".servicesMore .swiper-wrapper",
  tabSwiper = ".servicesMore__tabs-swiper"
) => {
  const box = document.querySelector(container);

  if (!serviceCategories) return;

  serviceCategories.forEach((item) => {
    const tabBtnHtml = getHtmlTabBtn(item);

    if (tabBtnHtml) {
      box.insertAdjacentHTML("beforeend", tabBtnHtml);
    }
  });

  initSwiper(tabSwiper, {
    slidesPerView: "auto",
    spaceBetween: 20,
    navigation: {
      nextEl: ".servicesMore .arrow-swiper.next",
      prevEl: ".servicesMore .arrow-swiper.prev",
    },
    on: {
      init: function (swiper) {
        setDisabledArrow(swiper);
      },
      slideChange: function (swiper) {
        setDisabledArrow(swiper);
      },
      resize: function (swiper) {
        setDisabledArrow(swiper);
      },
    },
  });
};

const handleClickBtnTab = (e) => {
  const btn = e.target.closest(".servicesMore__tab");

  if (!btn) return;

  const name = btn.dataset.btnTab;

  const baseUrl = window.location.origin + window.location.pathname;
  const newUrl = `${baseUrl}?${name}`;

  window.location.href = newUrl;
};

const initialTabs = () => {
  const location = window.location.search;
  const name = location.split("?").at(-1);

  const tab = document.querySelector(`[data-btn-tab="${name}"]`)

  const itemIndex = serviceCategories.findIndex((item) => item.name === name);
  const servicesMoreItem = document.querySelector(
    `.servicesMore__item.${name}`
  );


  if (itemIndex !== CONFIG.ACTIVE_TAB) {
    CONFIG.ACTIVE_TAB = itemIndex;

    classAction(
      document.querySelector(".servicesMore__tab.active"),
      "active",
      "remove"
    );
    classAction(
      document.querySelector(".servicesMore__item.active"),
      "active",
      "remove"
    );
    classAction(servicesMoreItem, "active", "add");
    classAction(tab, "active", "add");
  }

  const items = serviceItems.filter((item) => {
    return item.category === name;
  });

  initContentMore({
    containerSelector: ".servicesMore__item.active .servicesMore__items",
    data: [...items],
    showCount: 4,
    showCountMobile: 2,
    maxWidthInitMobile: 675,
    buttonTexts: {
      expanded: "показать меньше",
      collapsed: "показать еще",
    },
    maxWidthInit: 13300000,
    loadMode: "lazy",
    functions: {
      getHtmlItem: (item) => {
        if (!item) return "";

        const imgBase = item.imgSrc || "";
        const imgFormat = item.imgFormat || "webp";
        const imgSrc = `${imgBase}.${imgFormat}`;
        const imgSrc2x = `${imgBase}2x.${imgFormat}`;
        const name = item.name;

        return `
           <div class="services-item moreContent__item">
                        <div class="services-item__img">
                          <picture>
                            <source
                              srcset="
                                ${imgSrc}         1x,
                                ${imgSrc2x} 2x
                              "
                            />
                            <img
                              height="260"
                              src=${imgSrc}
                              alt=${name}
                            />
                          </picture>
                        </div>

                        <div class="services-item__content">
                          <h3 class="services-item__title">
                              ${name}
                          </h3>
                        </div>
                      </div>
        `;
      },
    },
  });
};

// document.querySelector('.header__logo').click();

document.addEventListener("DOMContentLoaded", () => {
  renderBtnTabs();
  // renderInfoServices();
  initialTabs();
});

const hoverPlacesCards = () => {
  const items = document.querySelectorAll(".places-item");

  items.forEach((item) => {
    const btnsBox = item.querySelector(".places-item__btns");

    if (btnsBox) {
      item.addEventListener("mouseover", () => {
        if (window.innerWidth > 1223) {
          btnsBox.style.maxHeight = btnsBox.scrollHeight + "px";
        }
      });

      item.addEventListener("mouseout", () => {
        if (window.innerWidth > 1223) {
          btnsBox.style.maxHeight = 0;
        }
      });
    }
  });
};

hoverPlacesCards();

document.addEventListener("click", (e) => {
  handleClickBtnTab(e);
});

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
