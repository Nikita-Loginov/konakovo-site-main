import { classAction } from "./classActions.js";
const currentTime = 1000; // пока что искуственная задержка в одну секунду

export function setProccent() {
  const preloaderProccent = document.querySelector(".preloader__proccent");
  let currentProccent = 0;
  let timer;

  if (preloaderProccent) {
    if (timer) clearInterval(timer);

    const startTime = Date.now();

    timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      currentProccent = Math.min(
        100,
        Math.floor((elapsedTime / currentTime) * 100)
      );

      preloaderProccent.textContent = currentProccent + "%";

      if (currentProccent >= 100) {
        clearInterval(timer);
        hiddenPreloader();
      }
    }, 16);
  } else {
    hiddenPreloader()
  }
}

function hiddenPreloader() {
  classAction(document.body, "ready", "add");
}
