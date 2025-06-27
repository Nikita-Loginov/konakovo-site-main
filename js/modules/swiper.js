import { classAction } from "./classActions.js";

const swiperInstances = {};

export const slidersConfig = [];


function removeAllElementsActiveClass(items, className) {
  items?.forEach((item) => {
    classAction(item, className, "remove");
  });
}

function initSwiper(config) {
  const elements = document.querySelectorAll(config.selector);
  if (!elements.length) return null;

  // Удаляем предыдущие экземпляры этого селектора
  destroySwipersBySelector(config.selector);

  const swiperOptions = {
    ...config.options,
    ...(config.events ? { on: config.events } : {}),
  };

  // Создаем уникальный ключ для каждого экземпляра
  elements.forEach((element, index) => {
    const instanceKey = `${config.selector}--${index}`;
    swiperInstances[instanceKey] = new Swiper(element, swiperOptions);
  });

  return getSwipersBySelector(config.selector);
}

function destroySwiper(instanceKey) {
  if (swiperInstances[instanceKey]) {
    swiperInstances[instanceKey].destroy(true, true);
    delete swiperInstances[instanceKey];
  }
}

function destroySwipersBySelector(selector) {
  Object.keys(swiperInstances)
    .filter(key => key.startsWith(`${selector}--`))
    .forEach(key => destroySwiper(key));
}

function getSwipersBySelector(selector) {
  return Object.keys(swiperInstances)
    .filter(key => key.startsWith(`${selector}--`))
    .map(key => swiperInstances[key]);
}

function checkBreakpoint(breakpoint) {
  return window.innerWidth < breakpoint;
}

export function handleAllSliders() {
  slidersConfig.forEach((config) => {

    if (config.breakpointMax && checkBreakpoint(config.breakpointMax)) {
      destroySwipersBySelector(config.selector);
      return;
    }

    if (checkBreakpoint(config.breakpoint)) {
      const existingInstances = getSwipersBySelector(config.selector);
      if (!existingInstances.length) {
        initSwiper(config);
      }
    } else {
      if (config.events) {
        const aboutImgs = document.querySelectorAll(".about__swiper-box .about__img");
        if (aboutImgs.length) {
          removeAllElementsActiveClass(aboutImgs, "active");
          classAction(aboutImgs[0], "active", "add");
        }
      }
      destroySwipersBySelector(config.selector);
    }
  });
}

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleAllSliders, 100);
});
