const marginCard = 107;
let animation;

export function initAnimation() {
  setHeightItems();
}

console.log();

function animationCards() {
  const eventsItems = document.querySelectorAll(".events__items .events-item");
  if (!eventsItems.length) return

  animation = gsap.timeline({
    scrollTrigger: {
      trigger: ".events",
      pin: true,
      start: "bottom bottom",
      end: "+=2000",
      scrub: 1,
      id: "eventsAnimation",
    },
  });

  Array.from(eventsItems).slice(1).forEach((item, index) => {
    animation.to(
      item,
      {
        y: (index + 1) * marginCard,
        opacity: 1,
      },
      "+=0"
    );
  });
}

actionAnimation()

function actionAnimation() {
  if (window.matchMedia("(min-width: 1280px)").matches) {
    if (!animation) {
      animationCards();
    }
  } else {
    if (animation) {
      const st = ScrollTrigger.getById("eventsAnimation");
      if (st) st.kill();

      animation.kill();
      animation = null;
    }
  }
}

window.addEventListener("resize", actionAnimation);

function setHeightItems() {
  const eventsItemsBox = document.querySelector(".events__items");
  const eventsItems = document.querySelectorAll(".events__items .events-item");
  let maxHeightItem = 0;

  if (!eventsItemsBox || !eventsItems) return

  eventsItems.forEach((item) => {
    maxHeightItem = Math.max(maxHeightItem, item.clientHeight);
  });

  eventsItemsBox.style.height =
    maxHeightItem + marginCard * (eventsItems.length - 1) + "px";
}
