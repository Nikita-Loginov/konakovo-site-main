const CONFIG = {
  CLASS_SCROLL_TOP: "scrollTop",
  CLASS_SCROLL_BOTTOM: "scrollBottom",
  SCROLL_START_MORE: 230,
  SCROLL_THRESHOLD: 5,
};

const DOM = {
  HEADER: document.querySelector(".header") || document.body,
};

let lastScrollTop = 0;

export const checkScrollY = (e) => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (Math.abs(scrollTop - lastScrollTop) < CONFIG.SCROLL_THRESHOLD) return;

  const isScrollingDown =
    scrollTop > lastScrollTop && scrollY > CONFIG.SCROLL_START_MORE;

  DOM.HEADER.classList.toggle(CONFIG.CLASS_SCROLL_BOTTOM, isScrollingDown);
  DOM.HEADER.classList.toggle(CONFIG.CLASS_SCROLL_TOP, !isScrollingDown);

  document.body.classList.toggle(CONFIG.CLASS_SCROLL_BOTTOM, isScrollingDown);
  document.body.classList.toggle(CONFIG.CLASS_SCROLL_TOP, !isScrollingDown);

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
};

export const getHeightHeader = () => {
  const header = document.querySelector("header.header");

  if (!header) return;

  const styles = window.getComputedStyle(header);
  const height = styles.getPropertyValue("height");

  document.documentElement.style.setProperty("--header-height", `${height}`);
};
