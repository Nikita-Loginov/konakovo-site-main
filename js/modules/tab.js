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
  const { btn, block, nameTab, functionTab } = elements;

  if (block) {
    const tabsBox = btn.closest(".tabs-box");
    const tabsBoxName = tabsBox.dataset.tabCategory;

    if (tabsBox.dataset.url) {
      const name = tabsBox.dataset.url;

      const url = new URL(window.location.href);

      url.searchParams.set(name, nameTab);

      history.pushState({}, "", url);

      const searchs = url.search.slice(1).split("&");

      if (searchs.length > 1) {
        const currentSearchs = searchs.slice(0, searchs.length - 1);

        currentSearchs.forEach((search, index) => {
          const item = search.split("=");

          const category = item[0];
          const name = item[1];

          const findActiveBlockItem = document.querySelector(
            `[data-block-tab="${name}"]`
          );

          if (!category || !name || !findActiveBlockItem) return;

          const btns = findActiveBlockItem.querySelector(".tabs__btns");

          if (!btns) return;

          const activeBtn = btns.querySelector(
            `.${TAB__INFO.nameTabBtn}.${TAB__INFO.nameActiveClass}`
          );

          const firstBtn = btns.querySelector(
            `.${TAB__INFO.nameTabBtn}`
          )

          const itemNeed = searchs[index + 1].split("=");

          const categoryItem = itemNeed[0];
          const nameItem = itemNeed[1];

          if (activeBtn) {   
            url.searchParams.set(categoryItem, nameItem);
            history.pushState({}, "", url);
          } else {
            firstBtn.click()
          }
        });
      }
    }

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

      const activeBtn = tabsBox.querySelector(
        `.${TAB__INFO.nameTabBtn}.${TAB__INFO.nameActiveClass}.active`
      );

      // if (!activeBtn) {
      //   const blockFind = block.querySelector(`.${TAB__INFO.nameTabBtn}`)
      //   console.log(blockFind)
      //   classAction(
      //     blockFind,
      //     TAB__INFO.nameActiveClass,
      //     "add"
      //   );
      // }

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

export const setFirstActiveClasses = () => {
  const tabsUrl = document.querySelectorAll(".tabs-url");

  tabsUrl.forEach((tabBox) => {
    const firstBtnsBox = tabBox.querySelector(".tabs__btns");

    if (!firstBtnsBox) return;

    const firstBtn = firstBtnsBox.querySelector(`.${TAB__INFO.nameTabBtn}`);

    const nameBox = firstBtn.dataset.btnTab;

    if (!nameBox) return;

    firstBtn.click();

    // console.log(nameBox)

    const block = document.querySelector(`[data-block-tab="${nameBox}"]`);

    const secondBtn = block.querySelector(`.${TAB__INFO.nameTabBtn}`);

    secondBtn.click();
  });
};
