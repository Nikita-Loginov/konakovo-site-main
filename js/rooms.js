import { classAction } from "./modules/classActions.js";
import { scrollStart } from "./modules/moreContent.js";
import {
  renderImgs,
  renderTags,
  renderBtn,
  initSwiper,
  renderDescrGood,
} from "./modules/renderContent.js";
import { goods } from "./data/goods.js";

const firstActiveNameCategory =
  window.location.search.split("?").at(-1) || "room";
let firstActiveNameGood = "2";
let isMobile = window.innerWidth < 900;

function addTabActive() {
  const tabs = document.querySelectorAll(".goods-sidebar__btn");
  const activeItemCurrent = Array.from(tabs).find(
    (item) => {
      console.log(item, firstActiveNameCategory)
      return item.dataset.tabBtn === firstActiveNameCategory
    }
  );
  const activeItemIndex = Array.from(tabs).findIndex((item) => {
    return item.dataset.tabBtn === activeItemCurrent.dataset.tabBtn;
  });

  const bigItem = goods.find(
    (item) => item.nameTabLink === activeItemCurrent.dataset.tabBtn
  );

  firstActiveNameGood = bigItem.nameTabBlock;

  const text = activeItemCurrent.querySelector('.goods-sidebar__btn-name').textContent;

  tabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  tabs[activeItemIndex].classList.add("active");

  document.querySelector(".goods__title").textContent = text;

  renderGoods(firstActiveNameCategory);
  renderGoodBig(firstActiveNameGood);
}

function getGoodMiniHtml(item, index) {
  const html = `<div class="good-item tab-btn ${
    index === 0 ? "active" : ""
  }" data-tab-btn=${item?.nameTabBlock}>
                      <div class="good-item__img">
                        <picture>
                          <source
                            srcset="
                              ${item?.imgs[0]}.${item?.imgFormat}   1x,
                            "
                          />
                          <img
                            src="${item?.imgs[0]}.${item?.imgFormat}"
                            alt=${item?.name}
                          />
                        </picture>
                      </div>

                      <div class="good-item__content">
                        <h4 class="good-item__name">«${item?.name}»</h4>

                        <div class="good-item__price">${item?.price}</div>
                      </div>
                    </div>`;

  return html;
}

function getGoodBigHtml(item) {
  const html = `<div class="good-big" data-block-tab=${item?.nameTabBlock}>
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
                          ${renderImgs(item).join("")}
                        </div>

                        <div class="swiper-pagination"></div>
                      </div>
                    </div>

                    <div class="good-big__content">
                      <div class="good-big__top">
                        <div class="good-big__info">
                          <h4 class="good-big__name">${item?.name}</h4>

                          <p class="good-big__text">${item?.descr[0]}</p>

                          <p class="good-big__price">${item?.price}</p>
                        </div>

                        <a href="room.html" class="link link--green">подробнее</a>
                      </div>

                      <div class="good-big__textbox">
                        ${renderDescrGood(item.descr).join("")}
                      </div>

                      <div class="good-big__tags">
                        <div class="tags swiper">
                          <div class="swiper-wrapper">
                                ${renderTags(item?.tags).join("")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>`;

  return html;
}

function toggleSidebar() {
  const sidebarBtn = document.querySelector(".sidebar-btn");

  sidebarBtn.addEventListener("click", () => {
    classAction(document.querySelector(".goods"), "open", "toggle");
  });
}

function renderGoods(name) {
  const box = document.querySelector(".goods__items");
  const goodsItemsBox = box.closest(".goods__items-box");
  goodsItemsBox.setAttribute("data-block-tab", name);
  box.innerHTML = "";

  const items = goods.filter((item) => item.nameTabLink === name);

  const goodsInner = document.querySelector(".goods__items-box");

  const btn = goodsInner.querySelector(".more-buuton");

  if (btn) {
    btn.remove();
  }

  if (items) {
    items.forEach((_, index) => {
      if (items.length > 1000 && index === 0) {
        goodsInner.insertAdjacentHTML("beforeend", renderBtn());
      }
    });
  }

  if (items) {
    items.forEach((item, index) => {
      const html = getGoodMiniHtml(item, index);

      box.insertAdjacentHTML("beforeend", html);
    });
  }
}

function changeTextMoreBtn(btn, text) {
  btn.textContent = text;
}

function renderGoodBig(name) {
  const box = document.querySelector(".goods__detail");
  box.innerHTML = "";

  console.log(name);

  if (isMobile) {
    const { nameTabLink } = goods.find((item) => item.nameTabBlock === name);
    const items = goods.filter((item) => item.nameTabLink === nameTabLink);
    const goodsInner = document.querySelector(".goods__inner");

    const btn = document.querySelector(".more-buuton");

    if (btn) {
      btn.remove();
    }

    if (items) {
      items.forEach((item, index) => {
        const html = getGoodBigHtml(item);

        box.insertAdjacentHTML("beforeend", html);

        if (items.length > 1000 && index === 0) {
          goodsInner.insertAdjacentHTML("beforeend", renderBtn());
        }
      });
    }
  } else {
    const item = goods.find(
      (item) => item.nameTabBlock.toString() === name.toString()
    );

    if (item) {
      const html = getGoodBigHtml(item);

      box.insertAdjacentHTML("beforeend", html);
    }
  }

  document.querySelectorAll(".good-big__img").forEach((item) => {
    initSwiper(item, {
      loop: "true",
      // effect: 'fade',
      navigation: {
        nextEl: ".goods .arrow-swiper.next",
        prevEl: ".goods .arrow-swiper.prev",
      },

      pagination: {
        el: ".goods .swiper-pagination",
        clickable: true,
      },
    });
  });

  document.querySelectorAll(".tags").forEach((item) => {
    initSwiper(item, {
      slidesPerView: "auto",
    });
  });
}

document.addEventListener("click", (e) => {
  const { target } = e;

  if (target.closest(".goods-sidebar__btn")) {
    const btn = target.closest(".goods-sidebar__btn");
    const text = btn.textContent;
    const nameBtn = btn.dataset.tabBtn;

    if (window.innerWidth < 900) {
      const items = goods.filter((item) => item.nameTabLink === nameBtn);

      items.forEach((item) => {
        renderGoodBig(item.nameTabBlock);
      });
    } else {
      const { nameTabBlock } = goods.find(
        (item) => item.nameTabLink === nameBtn
      );
      renderGoods(nameBtn);
      renderGoodBig(nameTabBlock);
    }

    document.querySelector(".goods__title").textContent = text;

    classAction(
      document.querySelector(".goods-sidebar__btn.active"),
      "active",
      "remove"
    );
    classAction(btn, "active", "add");
  } else if (target.closest(".good-item")) {
    const block = target.closest(".good-item");
    const nameBtn = block.dataset.tabBtn;

    classAction(
      document.querySelector(".good-item.active"),
      "active",
      "remove"
    );
    classAction(block, "active", "add");

    renderGoodBig(nameBtn);
  } else if (target.closest(".more-buuton")) {
    const moreBlock = target.closest(".moreBlock");
    classAction(moreBlock, "more", "toggle");

    if (moreBlock) {
      if (moreBlock.classList.contains("more")) {
        changeTextMoreBtn(target.closest(".more-buuton"), "Показать меньше");
      } else {
        scrollStart(moreBlock, 100);
        changeTextMoreBtn(target.closest(".more-buuton"), "показать все");
      }
    }
  }
});

window.addEventListener("resize", () => {
  const newIsMobile = window.innerWidth < 900;

  if (newIsMobile !== isMobile) {
    isMobile = newIsMobile;
    initBtnsSwiper();
    renderGoodBig(firstActiveNameGood);
  }
});

function initBtnsSwiper() {
  if (window.innerWidth < 1280) {
    initSwiper(".goods-sidebar__btns", {
      slidesPerView: "auto",
      spaceBetween: 16,
    });
  }
}

initSwiper(".rooms-banner__swiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    1400: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2.3,
    },
    500: {
      slidesPerView: 1.4,
    },
  },
  pagination: {
    el: ".rooms-banner .swiper-pagination",
    clickable: true,
  },
});

initBtnsSwiper();
addTabActive();

toggleSidebar();
