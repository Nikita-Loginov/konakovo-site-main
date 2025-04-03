import { classAction } from "./classActions.js";

export function toggleVideo() {
  const videoBox = document.querySelectorAll(".video__box");

  if (videoBox.length) {
    let prevVideoActive = videoBox[0].querySelector("video");

    videoBox.forEach((item) => {
      item.addEventListener("click", () => {
        const video = item.querySelector("video");

        if (video.paused) {
          video.play();

          if (prevVideoActive && prevVideoActive !== video) {
            prevVideoActive.pause();
            const boxPrev = prevVideoActive.closest(".video__box");
            classAction(boxPrev, "play", "remove");
          }

          prevVideoActive = video;
        } else {
          video.pause();
        }

        classAction(item, "play", "toggle");
      });
    });
  }
}
