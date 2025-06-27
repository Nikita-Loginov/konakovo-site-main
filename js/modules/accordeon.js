import { classAction } from "./classActions.js";

let prevActiveAccordeonItem;
let currentResizeHandler = null;

export function toggleAccordeonItems(e) {
  const { target } = e;

  if (target.closest(".accordeon__question")) {
    const relative = target.closest(".accordeon");
    const relativeItem = target.closest(".accordeon__item");
    const maxWidth = parseInt(relative.dataset.width) || 1023;

    if (currentResizeHandler) {
      window.removeEventListener("resize", currentResizeHandler);
    }

    if (maxWidth > window.innerWidth) {
      classAction(relativeItem, "active", "toggle");
      setHeightAnswer(relativeItem);

      currentResizeHandler = () => setHeightAnswer(relativeItem);
      window.addEventListener("resize", currentResizeHandler);

      if (prevActiveAccordeonItem && prevActiveAccordeonItem !== relativeItem) {
        if (!relative.classList.contains("accordeon--showMore")) {
          classAction(prevActiveAccordeonItem, "active", "remove");
        }
        setHeightAnswer(prevActiveAccordeonItem);
      }

      prevActiveAccordeonItem = relativeItem;
    }
  }
}

function resetAccordeon() {
  const accordeonItems = document.querySelectorAll(".accordeon__item");
  prevActiveAccordeonItem = null;

  accordeonItems.forEach((item) => {
    classAction(item, "active", "remove");
    const itemAnswer = item.querySelector(".accordeon__answer");
    itemAnswer.style.maxHeight = "";
  });
}

const resizeObserver = new ResizeObserver((entries) => {
  if (window.innerWidth > 1023) {
    resetAccordeon();

    if (currentResizeHandler) {
      window.removeEventListener("resize", currentResizeHandler);
      currentResizeHandler = null;
    }
  }
});

resizeObserver.observe(document.body);

function setHeightAnswer(item) {
  const itemAnswer = item.querySelector(".accordeon__answer");
  if (item.classList.contains("active")) {
    itemAnswer.style.maxHeight = itemAnswer.scrollHeight + 24 + "px";
  } else {
    itemAnswer.style.maxHeight = "0";
  }
}
