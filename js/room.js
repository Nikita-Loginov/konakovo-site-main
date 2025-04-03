import { searcBlockTab } from "./modules/tab.js";

let roomInfoSwiper = null;



function destroyRoomInfoSwiper() {
  if (roomInfoSwiper) {
    roomInfoSwiper.destroy(true, true);
    roomInfoSwiper = null;
  }
}

function checkScreenWidth(width, callback) {
  return window.innerWidth < width;
}

function handleResize() {
  if (checkScreenWidth(1023)) {
    initRoomInfoSwiper();
  } else {
    destroyRoomInfoSwiper();
  }
}

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleResize, 10);
});

document.addEventListener("DOMContentLoaded", () => {
  if (checkScreenWidth(1023)) {
    initRoomInfoSwiper();
  }
});

const swiperGallery = new Swiper(".roomGallery__swiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,

  pagination: {
    el: ".roomGallery .swiper-pagination",
    clickable: true,
  },

  breakpoints : {
    1360: {
        slidesPerView: 3,
    },
    767: {
        slidesPerView: 2,
    },
    // 550 : {
    //     slidesPerView: 1,
    // }
  },

  navigation: {
    nextEl: ".roomGallery .arrow-swiper.next",
    prevEl: ".roomGallery .arrow-swiper.prev",
  },
});

document.addEventListener("click", (e) => searcBlockTab(e));
