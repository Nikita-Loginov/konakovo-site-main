import { goods } from "./data/goods.js";
import { renderImgs, initSwiper } from "./modules/renderContent.js";

const config = {
  MAX_COUNT: 3,
  SWIPER_OPTIONS: {
    loop: true,
    pagination: { clickable: true },
    navigation: true,
  },
};

const getHtmlGood = (item) => {
  if (!item) return;

  const html = `<div class="good-big">
                      <div class="good-big__img-box">
                        <div class="arrows-swiper">
                          <button
                            class="arrow-swiper prev"
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
                        </div>
  
                        <div class="good-big__img swiper">
                          <div class="swiper-wrapper">
                            ${renderImgs(item)?.join("") || ""}
                          </div>
  
                          <div class="swiper-pagination"></div>
                        </div>
                      </div>
  
                      <div class="good-big__content">
                        <div class="good-big__top">
                          <div class="good-big__info">
                            <h4 class="good-big__name">${item?.name || ""}</h4>
  
                            <p class="good-big__price">${item?.price || ""}</p>
                          </div>
                        </div>
                      </div>
                    </div>`;

  return html;
};

const renderGoods = (containerSelector = ".good-more__items") => {
  const box = document.querySelector(containerSelector);

  if (!box) return;

  box.innerHTML = "";

  goods.slice(0, config.MAX_COUNT).forEach((item) => {
    const goodHtml = getHtmlGood(item);

    if (!goodHtml) return;

    box.insertAdjacentHTML("beforeend", goodHtml);

    const lastGood = box.lastElementChild;
    initSwiperGood(lastGood);
  });
};

const initSwiperGood = (lastGood) => {
  if (!lastGood) return;

  const swiperInfo = {
    swiperItem: lastGood.querySelector(".good-big__img"),
    nextArrow: lastGood.querySelector(".arrow-swiper.next"),
    prevArrow: lastGood.querySelector(".arrow-swiper.prev"),
    pagination: lastGood.querySelector(".swiper-pagination"),
  };

  return new Swiper(swiperInfo.swiperItem, {
    ...config.SWIPER_OPTIONS,
    navigation: {
      nextEl: swiperInfo.nextArrow,
      prevEl: swiperInfo.prevArrow,
    },

    pagination: {
      el: swiperInfo.pagination,
      clickable: true,
    },
  });
};

document.addEventListener("DOMContentLoaded", () => {
  renderGoods();
  initSwiper(".gallery__swiper", {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 20,

    navigation: {
      nextEl: ".gallery .arrow-swiper.next",
      prevEl: ".gallery .arrow-swiper.prev",
    },

    breakpoints: {
      767: {
        slidesPerView: 4,
      },
    },
  });
});
