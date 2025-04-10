import { serviceCategories, serviceItems } from "./data/goods.js";
import { initSwiper } from "./modules/renderContent.js";
import { handleAllSliders, slidersConfig } from "./modules/swiper.js";
import { classAction } from "./modules/classActions.js";
import { addClassDisabledBtn } from "./functions.js";

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

  clearHtmlBox(box);

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
  });
};

const clearHtmlBox = (box) => {
  box.innerHTML = "";
};

const renderSwiperBox = (
  containerItems = ".servicesMore__items",
  swiperBox = "servicesMore__swiper"
) => {
  const container = document.querySelector(containerItems);
  clearHtmlBox(container);
  const html = `<div class="swiper ${swiperBox}">
                    <div class="swiper-wrapper">
                      
                    </div>
                  </div>`;

  container.insertAdjacentHTML("beforeend", html);
};

const renderInfoServices = (
  containerItems = ".servicesMore__items",
  containerHead = ".servicesMore__content-head"
) => {
  renderSwiperBox();
  const boxHead = document.querySelector(containerHead);
  const boxItems = document.querySelector(`${containerItems} .swiper-wrapper`);
  if (!boxHead || !boxItems) return;

  clearHtmlBox(boxHead);
  clearHtmlBox(boxItems);

  const activeNameCategory = serviceCategories[CONFIG.ACTIVE_TAB]?.name;
  if (!activeNameCategory) return;

  const items = serviceItems.filter((item) => {
    return item.category === activeNameCategory;
  });

  boxHead.insertAdjacentHTML("beforeend", getHtmlBoxHead(items.length));

  items.forEach((item) => {
    const cardHtml = getItemServices(item);

    boxItems.insertAdjacentHTML("beforeend", cardHtml);
  });

  clearSwiper();

  swiperItems = initSwiper(".servicesMore__swiper", {
    slidesPerView: 1.2,
    spaceBetween: 12,

    navigation: {
      nextEl: `.servicesMore .arrow-swiper.next`,
      prevEl: `.servicesMore .arrow-swiper.prev`,
    },

    breakpoints: {
      1330: {
        slidesPerView: 4,
      },

      876: {
        slidesPerView: 2.4,
      },

      600: {
        slidesPerView: 1.7,
        spaceBetween: 20,
      },
    },

    on: {
      slideChange: (swiper) => {
        addClassDisabledBtn(swiper);
      },
    },
  });
};

const clearSwiper = () => {
  if (!swiperItems) return;

  swiperItems.destroy();
  swiperItems = null;
};

const handleClickBtnTab = (e) => {
  const btn = e.target.closest(".servicesMore__tab");

  if (!btn) return;
  const name = btn.dataset.btnTab;
  const itemIndex = serviceCategories.findIndex((item) => item.name === name);

  if (itemIndex !== CONFIG.ACTIVE_TAB) {
    CONFIG.ACTIVE_TAB = itemIndex;
    renderInfoServices();
    classAction(
      document.querySelector(".servicesMore__tab.active"),
      "active",
      "remove"
    );
    classAction(btn, "active", "add");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderBtnTabs();
  renderInfoServices();

  // initSwiper('.places__swiper', {
  //   slidesPerView: 1.1,

  //   spaceBetween: 12,
  //   loop : true,

  //   breakpoints : {
  //     1381 : {
  //       slidesPerView: "auto",
  //       effect: "coverflow",
  //       coverflowEffect: {
  //         rotate: 0,
  //         stretch: 0,
  //         depth: 0,
  //         modifier: 1,
  //         slideShadows: false,
  //       },
  //     },

  //     767 : {
  //       slidesPerView: 2,
  //       spaceBetween: 20,
  //     },

  //     450 : {
  //       slidesPerView: 1.3,
  //     }
  //   },

  //   navigation: {
  //     nextEl: ".places .arrow-swiper.next",
  //     prevEl: ".places .arrow-swiper.prev",
  //   },
  // })
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
