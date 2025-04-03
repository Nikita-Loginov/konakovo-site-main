import { classAction } from "./classActions.js";

const BUTTON_TEXTS = {
  expanded: "показать меньше",
  collapsed: "показать все",
};

export function moreContent(btn) {
  const blockMore = btn.closest(".block-more");

  if (blockMore) {
    classAction(blockMore, "more", "toggle");

    if (blockMore.classList.contains("more")) {
      changeTextBtn(btn, BUTTON_TEXTS.expanded);
    } else {
      scrollStart(blockMore, 100);
      changeTextBtn(btn, BUTTON_TEXTS.collapsed);
    }
  }
}

export function scrollStart(block, offset = 100) {
  const offsetY = block.getBoundingClientRect().top + scrollY - offset;

  window.scrollTo({
    top: offsetY,
    behavior: "smooth",
  });
}

function changeTextBtn(btn, text) {
  btn.textContent = text;
}
