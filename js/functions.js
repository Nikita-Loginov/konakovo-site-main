const CONFIG = {
  CLASS_DISABLED: "disabled",
};

export const addClassDisabledBtn = (swiper) => {
  if (!swiper) return;

  const { hostEl, isEnd, isBeginning } = swiper;
  const { CLASS_DISABLED } = CONFIG;

  console.log(isEnd, isBeginning);

  const relative = hostEl.closest(".boxSlide");
  if (!relative) return;

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
    loadMode = "click", // 'click' или 'lazy'
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
  let isLoading = false;

  const container = document.querySelector(containerSelector);
  if (!container) return;

  const moreContent = container.closest(".moreContent");
  if (!moreContent) return;

  const moreContentInfo = moreContent.querySelector(".moreContent__info");
  if (!moreContentInfo) return;

  const checkScrollPosition = () => {
    if (isLoading || !isSmallScreen || loadMode !== "lazy") return;

    const containerRect = container.getBoundingClientRect();
    const containerBottom = containerRect.bottom;
    const windowHeight = window.innerHeight;

    if (containerBottom - windowHeight < 300) {
      loadMoreItems();
    }
  };

  const loadMoreItems = () => {
    if (isLoading || fullItems) return;

    isLoading = true;
    renderContent();
    isLoading = false;
  };

  const renderBtn = () => {
    if (data.length <= showCount || loadMode === "lazy") return;

    const moreContentBtn = moreContentInfo.querySelector(".moreContent__btn");
    const items = container.querySelectorAll(".moreContent__item");
    let btnHtml;

    if (moreContentBtn) moreContentBtn.remove();

    if (items.length && data.length > items.length) {
      btnHtml = `<button class="moreContent__btn button button--gray">${buttonTexts.collapsed}</button>`;
    } else {
      btnHtml = `<button class="moreContent__btn button button--gray">${buttonTexts.expanded}</button>`;
      fullItems = true;
    }

    moreContentInfo.insertAdjacentHTML("beforeend", btnHtml);
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
      if (container.classList.contains("moreContent__two-column")) {
        const moreContentItemBoxs = container.querySelectorAll(
          ".moreContent__item-box"
        );
        const itemBoxOne = document.createElement("div");
        const itemBoxtwo = document.createElement("div");
        itemBoxOne.classList.add("moreContent__item-box");
        itemBoxtwo.classList.add("moreContent__item-box");

        itemsToAdd.forEach((item, index) => {
          const htmlItem = functions.getHtmlItem(item);
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = htmlItem;

          if (index % 2 === 0) {
            itemBoxOne.append(...tempDiv.childNodes);
          } else {
            itemBoxtwo.append(...tempDiv.childNodes);
          }
        });

        container.append(itemBoxOne, itemBoxtwo);
      } else {
        itemsToAdd.forEach((item) => {
          container.insertAdjacentHTML(
            "beforeend",
            functions.getHtmlItem(item)
          );
        });
      }

      if (!fullItems) {
        currentIndex = endIndex;
        endIndex = currentIndex + showCount;
      }

      if (loadMode === "click") {
        renderBtn();
      }

      const items = container.querySelectorAll(".moreContent__item");
      const btnMore = moreContentInfo.querySelector(".moreContent__btn");
      const length = items.length;
      if (length === data.length) {
        fullItems = true;
        if (btnMore) {
          btnMore.classList.add("full");
        }
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
      !moreContent.contains(e.target) ||
      loadMode !== "click"
    )
      return;

    const btn = e.target.closest(".moreContent__btn");
    if (btn.classList.contains("full")) {
      const moreContentBox = e.target.closest(".moreContent");
      scrollTop(moreContentBox);
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
      top: offsetY,
      behavior: "smooth",
    });
  };

  resetState(showCount);
  renderContent();

  if (loadMode === "click") {
    moreContent.addEventListener("click", handleButtonClick);
  } else if (loadMode === "lazy") {
    window.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);
  }

  window.addEventListener("resize", handleResize);

  return {
    destroy: () => {
      if (loadMode === "click") {
        moreContent.removeEventListener("click", handleButtonClick);
      } else if (loadMode === "lazy") {
        window.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", checkScrollPosition);
      }
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

export const setInnerHTML = (box, text = '') => {
  if (!box) return;

  box.innerHTML = text;
};

export const declOfNum = (number, words) => {
  number = Math.abs(number) % 100;
  const n1 = number % 10;

  if (number > 10 && number < 20) return words[2];

  if (n1 > 1 && n1 < 5) return words[1];

  if (n1 === 1) return words[0];
  
  return words[2];
}

