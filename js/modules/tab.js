import { classAction } from "./classActions.js";

const TAB__INFO = {
    nameTabBtn: "tab-btn",
    nameTabBlock: "tab-item",
    nameActiveClass : 'active'
  };
  

export function searcBlockTab(e) {

  const { target } = e;
  const btn = target.closest(`.${TAB__INFO.nameTabBtn}`);

  if (!btn) return;

  const nameTab = btn.dataset.btnTab;
  const block = document.querySelector(`[data-block-tab="${nameTab}"]`);

  if (block) {
    toggleClassesTabElements({ btn, block });
  }
}

function toggleClassesTabElements(elements) {
  const { btn, block } = elements;

  if (block) {
    const prevActiveBtn = document.querySelector(`.${TAB__INFO.nameTabBtn}.${TAB__INFO.nameActiveClass}`);
    const prevActiveBlock = document.querySelector(`.${TAB__INFO.nameTabBlock}.${TAB__INFO.nameActiveClass}`);

    if (prevActiveBtn) classAction(prevActiveBtn,TAB__INFO.nameActiveClass, "remove");
    if (prevActiveBlock) classAction(prevActiveBlock, TAB__INFO.nameActiveClass, "remove");

    classAction(btn, TAB__INFO.nameActiveClass, "add");
    classAction(block, TAB__INFO.nameActiveClass, "add");
  }
}
