import { classAction } from "./classActions.js";

const TAB__INFO = {
  nameTabBtn: "tab-btn",
  nameTabBlock: "tab-item",
  nameActiveClass: "active",
};

export function searcBlockTab(e, functionTab) {
  const { target } = e;
  const btn = target.closest(`.${TAB__INFO.nameTabBtn}`);

  if (!btn) return;



  const nameTab = btn.dataset.btnTab;

  const block = document.querySelector(`[data-block-tab="${nameTab}"]`);

  if (block) {
    toggleClassesTabElements({ btn, block, nameTab, functionTab });
  }
  
}

function toggleClassesTabElements(elements) {
  const { btn, block ,nameTab, functionTab } = elements;

  if (block) {
    const tabsBox = btn.closest(".tabs-box");
    const tabsBoxName = tabsBox.dataset.tabCategory;



    const prevActiveBtn = tabsBox.querySelector(
      `.${TAB__INFO.nameTabBtn}.${TAB__INFO.nameActiveClass}`
    );
    const prevActiveBlock = tabsBox.querySelector(
      `.${TAB__INFO.nameTabBlock}.${TAB__INFO.nameActiveClass}[data-block-category=${tabsBoxName}]`
    );

    

    if (prevActiveBtn)
      classAction(prevActiveBtn, TAB__INFO.nameActiveClass, "remove");
    if (prevActiveBlock)
      classAction(prevActiveBlock, TAB__INFO.nameActiveClass, "remove");

    if (btn.closest(".tabs__btns")) {
      classAction(btn, TAB__INFO.nameActiveClass, "add");
      classAction(block, TAB__INFO.nameActiveClass, "add");

      if (functionTab) {
        functionTab();
      }

      return;
    }

    const nameBtn = btn.dataset.btnTab;
    const btnFind = document.querySelector(
      `.tabs__btns .tab-btn[data-btn-tab="${nameBtn}"]`
    );

    classAction(btnFind, TAB__INFO.nameActiveClass, "add");
    classAction(block, TAB__INFO.nameActiveClass, "add");

    if (functionTab) {
      functionTab();
    }
  }
}
