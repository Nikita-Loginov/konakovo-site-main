import { moreContent } from "./modules/moreContent.js";
import { initCalendatForm } from "./modules/calendarForm.js";

const moreBtn = document.querySelectorAll(".more-btn");

moreBtn.forEach((btn) => {
  btn.addEventListener("click", () => moreContent(btn));
});

initCalendatForm()
