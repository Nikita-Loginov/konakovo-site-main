import { setInnerHTML } from "../functions.js";
import { getHtmlProgrammCard } from "./renderContent.js";
import { programsData } from "../data/programs.js";
import { initSwiper } from "./renderContent.js";
import { SWIPER_DATA } from "../swiper/index.js";

export const initRenderProgramm = (e, classNamesEl, options) => {
  const { target } = e;

  if (!target.closest("[data-render-tab-btn]")) return;

  const box = e.target.closest("[data-render-tab-btn]");
  const relativeTabBox = box.closest("[data-render-tab-relative]");
  const prevActiveEl = relativeTabBox.querySelector(
    "[data-render-tab-btn].active"
  );

  if (!relativeTabBox) return;

  const boxTabRender = relativeTabBox.querySelector("[data-render-tab-box]");
  const name = box.dataset.renderTabBtn;
  const prevName = prevActiveEl.dataset.renderTabBtn;

  if (name === prevName) return;

  const showEl = programsData.find((item) => item.category === name);

  if (!showEl) return;

  prevActiveEl.className = classNamesEl;

  const { swiper, classSwiperBox } = options;

  renderContentTab(showEl, boxTabRender, {
    swiper: swiper,
    classSwiperBox: classSwiperBox,
  });
};

export const renderContentTab = (el, boxTabRender, options) => {
  if (!el) return;

  const { category, color } = el;
  const btnActive = document.querySelector(`[data-render-tab-btn=${category}]`);

  btnActive.classList.add(color);
  btnActive.classList.add("active");

  setInnerHTML(boxTabRender, "");

  const htmlCard = getHtmlProgrammCard(el);

  boxTabRender.insertAdjacentHTML("beforeend", htmlCard);

  const { swiper, classSwiperBox } = options;

  if (swiper && classSwiperBox) {
    initSwipers({
      swiper: swiper,
      classSwiperBox: classSwiperBox,
    });
  }
};

const initSwipers = (options) => {
  const { swiper, classSwiperBox } = options;

  initSwiper(classSwiperBox, SWIPER_DATA[swiper])
};
