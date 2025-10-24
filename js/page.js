import { toggleMenu, closeMenuClickElInner } from "./modules/menu.js";
import { toggleBlockWhenScrollFooter } from "./modules/animation.js";
import { maskTel } from "./modules/masks.js";
import { calendar } from "./modules/calendar.js";
import { initModal } from "./modules/modal.js";
import { setProccent } from "./modules/preloader.js";
import { initFormValidation, initCustomSelects } from "./modules/validate.js";
import { checkScrollY } from "./modules/header.js";
import { renderMoreSwiper } from "./modules/renderAction.js";
import { checkStorage } from "./modules/localStorage.js";
import { initStorage } from "./modules/localStorage.js";
import { getHeightHeader } from "./modules/header.js";

calendar();
setProccent();

toggleBlockWhenScrollFooter(
  document.querySelector(".reservation-form--scroll")
);
toggleBlockWhenScrollFooter(document.querySelector(".promo__content .link"));
toggleBlockWhenScrollFooter(document.querySelector(".link--fixed"));

document.addEventListener("scroll", () => {
  toggleBlockWhenScrollFooter();
  getHeightHeader()

  toggleBlockWhenScrollFooter(document.querySelector(".link--fixed"));
});

toggleBlockWhenScrollFooter(
  document.querySelector(".reservation-form--scroll")
);

function initMenu() {
  const menu = document.querySelector(".menu");

  toggleMenu(menu);

  closeMenuClickElInner(".menu__link", menu);
}

initMenu();
maskTel();


const initFractionPagination = () => {
  const swipers = document.querySelectorAll(".swiper");

  swipers.forEach((swiperEl) => {
    if (swiperEl?.swiper) {
      const swiper = swiperEl.swiper;
      const paginationEl = swiperEl.querySelector(".swiper-pagination");

      if (swiper?.slides?.length >= 11 && paginationEl) {
        if (swiper.pagination?.destroy) {
          swiper.pagination.destroy();
          paginationEl.innerHTML = "";
        }

        Object.assign(swiper.params.pagination, {
          el: paginationEl,
          type: "fraction",
          renderFraction: function (currentClass, totalClass) {
            return `<span class="${currentClass}"></span> / <span class="${totalClass}"></span>`;
          },
        });

        swiper.pagination.init();
        swiper.pagination.render();
        swiper.pagination.update();

        paginationEl.classList.add("swiper-pagination-horizontal-site");
      }
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {

  checkStorage();
  initModal();
  getHeightHeader()
  const forms = document.querySelectorAll("[data-form]");

  forms.forEach((form) => {
    initFormValidation(form);
  });

  renderMoreSwiper(".moments");

  setTimeout(() => {
    initFractionPagination();
  }, 200);
});

document.addEventListener("scroll", checkScrollY);

document.addEventListener('click', (e) => {
  initCustomSelects(e)
  initStorage(e)
});
