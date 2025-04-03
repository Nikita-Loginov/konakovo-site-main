import { classAction } from "./classActions.js";

export function getHtmlButton(text) {
  const html = `<button class="button button--gray moreText__btn" type="button">
                  ${text}
                </button>`;

  return html;
}

export function toggleButton(e) {
  const btn = e.target.closest(".moreText__btn");
  if (!btn) return;

  const moreTextBlock = btn.closest('.moreText');
  const contentBox = moreTextBlock?.querySelector('.moreText__content');
  if (!contentBox) return;
  
  const existingBtn = contentBox.querySelector('.moreText__btn');
  existingBtn?.remove();
  
  const buttonText = moreTextBlock.classList.contains('more') ? 'Свернуть' : 'Развернуть';
  contentBox.insertAdjacentHTML('beforeend', getHtmlButton(buttonText));
}

export function initMoreText(e) {
  const { target } = e;

  if (target.classList.contains("moreText__btn")) {
    const moreBoxRelative = target.closest(".moreText");

    classAction(moreBoxRelative, "more", "toggle");
  }
}
