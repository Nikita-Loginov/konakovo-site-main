function getPosition(el, mean) {
  return el.getBoundingClientRect()[mean];
}

export function showForm(block) {
  const reservationFormScroll = document.querySelector(
    ".reservation-form--scroll"
  );


  if (reservationFormScroll) {
    const firstSection = document.querySelectorAll("section")[0];

    const firstSectionOffsetBottom = getPosition(firstSection, "bottom");

    if (firstSectionOffsetBottom < 0) {
      document.body.classList.add("showForm");
    } else {
      document.body.classList.remove("showForm");
    }
  }
}

export function toggleBlockWhenScrollFooter(block) {
  const footer = document.querySelector(".footer");

  if (footer && block) {
    const footerBottom = getPosition(footer, "bottom");
    const footerHeight = footer.clientHeight;

    if (footerBottom < window.innerHeight + footerHeight) {
      block.style.opacity = 0;
      block.style.visibility = "hidden";
      
    } else {
      block.style.opacity = 1;
      block.style.visibility = "visible";
    }
  }
}

export function animationBlock() {
  const topInner = document.querySelector(".top__inner");
  const top = document.querySelector(".top");
  const topTitle = document.querySelector(".top__bottom-title");

  if (!top ) return;

  const topInnerOffsetY = getPosition(topInner, "bottom");
  const topTitleOffsetY = getPosition(topTitle, "top");

  if (topInnerOffsetY < topTitleOffsetY) {
    top.classList.add("animationText");
  } else {
    top.classList.remove("animationText");
  }

  //   if (topInnerOffsetY < 0) {
  //     document.body.classList.add("showForm");
  //   } else {
  //     document.body.classList.remove("showForm");
  //   }
}

export function removeImgTop() {
  const blockMain = document.querySelector('.block-main');
  if(!blockMain) return;

  const offsetY = getPosition(blockMain, "top");
  const main = document.querySelector(".main");

  if (offsetY < -100) {
    main.classList.add("bg-none");
    document.querySelector(".top video").pause()
  } else {
    main.classList.remove("bg-none");
    document.querySelector(".top video").play()
  }
}
