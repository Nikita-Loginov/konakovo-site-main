import {
  getHtmlButton,
  toggleButton,
  initMoreText,
} from "./modules/moreText.js";

const config = {
  BREAKPOINT: 1023,
  DEBOUNCE_TIME: 100,
};

let clickHandler = null;
let resizeTimeout = null;
let firstInitFunc = null;

const showBtnMore = (e) => {
  const moreText = document.querySelector(".moreText");
  if (!moreText) return;

  const textBox = moreText.querySelector(".moreText__textbox");
  const contentBox = moreText.querySelector(".moreText__content");
  const btn = moreText.querySelector(".moreText__btn");

  if (firstInitFunc && clickHandler) return;

  if (btn) {
    btn.remove();
  }

  if (textBox.clientHeight < 140) {
    return;
  } else {
    contentBox.insertAdjacentHTML("beforeend", getHtmlButton("Развернуть"));
  }

  firstInitFunc = true;
};

showBtnMore();

const cleanupEvent = () => {
  if (clickHandler) {
    document.removeEventListener("click", clickHandler);
    clickHandler = null;
  }
};

const checkWidth = () => {
  const shouldAttach = window.innerWidth < config.BREAKPOINT;

  if (shouldAttach && !clickHandler) {
    document.addEventListener("click", showBtnMore);
    clickHandler = showBtnMore;
  } else if (!shouldAttach && clickHandler) {
    cleanupEvent();
  }
};

const handleResize = () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(checkWidth, config.DEBOUNCE_TIME);
};

const initSwipers = () => {
  const gallerySlider = new Swiper(".gallery__swiper", {
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
};

document.addEventListener("click", (e) => {
  initMoreText(e);
  toggleButton(e);
});

checkWidth();
initSwipers()
window.addEventListener("resize", handleResize);
