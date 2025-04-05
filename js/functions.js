const CONFIG = {
  CLASS_DISABLED: "disabled",
};

export const addClassDisabledBtn = (swiper) => {
  if (!swiper) return;

  const { hostEl, isEnd, isBeginning } = swiper;
  const { CLASS_DISABLED } = CONFIG;

  const relative = hostEl.closest(".boxSlide");
  const arrowNext = relative.querySelector(".arrow-swiper.next");
  const arrowPrev = relative.querySelector(".arrow-swiper.prev");

  arrowNext.classList.toggle(CLASS_DISABLED, isEnd);
  arrowPrev.classList.toggle(CLASS_DISABLED, isBeginning);
};

export const initContentMore = (options) => {
  const {
    containerSelector,
    data,
    buttonTexts = {
      expanded: "показать меньше",
      collapsed: "показать еще",
    },
    maxWidthInit = 1300,
    functions,
    showCountMobile,
    maxWidthInitMobile,
  } = options;

  let { showCount } = options;

  let currentIndex = 0;
  let tempShowCount = showCount;
  let firstRender = true;
  let endIndex = currentIndex + showCount;
  let isSmallScreen;
  let isScreenMobile;
  updateScreenState();
  let fullItems = false;

  const container = document.querySelector(containerSelector);
  if (!container) return;

  const moreContent = container.closest(".moreContent");
  if (!moreContent) return;

  const moreContentInfo = moreContent.querySelector(".moreContent__info");
  if (!moreContentInfo) return;

  const renderBtn = () => {
    if (data.length <= showCount) return;

    const moreContentBtn = moreContentInfo.querySelector(".moreContent__btn");
    let btnHtml;

    if (moreContentBtn) moreContentBtn.remove();

    if (data.length > container.children.length) {
      btnHtml = `<button class="moreContent__btn button button--gray">${buttonTexts.collapsed}</button>`;
    } else {
      btnHtml = `<button class="moreContent__btn button button--gray">${buttonTexts.expanded}</button>`;
      fullItems = true;
    }

    moreContentInfo.insertAdjacentHTML("beforeend", btnHtml);
    // const items = moreContentInfo.querySelector(".moreContent__items");
    // const length = items.children.length;
    // console.log(length);
    // scrollTop(lastChild)
  };

  function updateScreenState() {
    isSmallScreen = window.innerWidth < maxWidthInit;
    isScreenMobile = window.innerWidth < maxWidthInitMobile;

    if (isScreenMobile && showCountMobile) {
      showCount = showCountMobile;
    } else {
      showCount = tempShowCount;
    }
  }

  const resetState = (count) => {
    currentIndex = 0;
    endIndex = currentIndex + count;
    container.innerHTML = "";
    const btn = moreContentInfo.querySelector(".moreContent__btn");
    if (btn) btn.remove();
    fullItems = false;
  };

  const renderContent = () => {
    if (fullItems) {
      resetState(showCount);
    }

    if (window.innerWidth < maxWidthInit) {
      const itemsToAdd = data.slice(currentIndex, endIndex);
      itemsToAdd.forEach((item) => {
        container.insertAdjacentHTML("beforeend", functions.getHtmlItem(item));
      });

      if (!fullItems) {
        currentIndex = endIndex;
        endIndex = currentIndex + showCount;
      }

      renderBtn();
      const items = moreContentInfo.querySelector(".moreContent__items");
      const btnMore = moreContentInfo.querySelector('.moreContent__btn')
      const length = items.children.length;

      if (length === data.length && btnMore) {
        btnMore.classList.add('full')
      }

      firstRender = false;
    } else {
      data.forEach((item) => {
        container.insertAdjacentHTML("beforeend", functions.getHtmlItem(item));
      });
    }
  };

  const handleButtonClick = (e) => {
    if (
      !e.target.closest(".moreContent__btn") ||
      !moreContent.contains(e.target)
    )
      return;

    const btn = e.target.closest(".moreContent__btn");
    if (btn.classList.contains('full')) {
      const moreContentBox = e.target.closest('.moreContent')
      scrollTop(moreContentBox)
    }

    renderContent();
  };

  const handleResize = () => {
    const prevSmallScreen = isSmallScreen;
    const prevScreenMobile = isScreenMobile;

    updateScreenState();

    if (
      prevSmallScreen !== isSmallScreen ||
      prevScreenMobile !== isScreenMobile
    ) {
      resetState(showCount);
      renderContent();
    }
  };

  const scrollTop = (element) => {
    const offsetY = element.getBoundingClientRect().top + scrollY - 110;
    window.scrollTo({
      top : offsetY,
      behavior: "smooth",
    })
  };

  resetState(showCount);
  renderContent();

  moreContent.addEventListener("click", handleButtonClick);
  window.addEventListener("resize", handleResize);

  return {
    destroy: () => {
      document.removeEventListener("click", handleButtonClick);
      window.removeEventListener("resize", handleResize);
      resetState(showCount);
    },
    updateData: (newData) => {
      data = newData;
      resetState(showCount);
      renderContent();
    },
  };
};

/*пример данных для initContentMore
 const contentMore = initContentMore({
  containerSelector: ".moreContent__items",
  data: [
    {
      name: "Lorem, ipsum dolor.",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, ipsam.",
    },
    {
      name: "Lorem, ipsum dolor.",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, ipsam.",
    },
    {
      name: "Lorem, ipsum dolor.",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, ipsam.",
    },
    {
      name: "Lorem, ipsum dolor.",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, ipsam.",
    },
  ].map((item, index) => ({ ...item, id: index + 1 })),
  showCount: 3,
  showCountMobile : 2,
  maxWidthInitMobile : 1100,
  buttonTexts: {
    expanded: "показать меньше",
    collapsed: "показать еще",
  },
  maxWidthInit: 13300000,
  functions: {
    getHtmlItem: (item) => {
      return `<div class="moreContent__item">
                <h3>${item.id || 0}</h3>
                <p>${item.text || "Текста нет"}</p>
              </div>`;
    },
  },
});
*/
