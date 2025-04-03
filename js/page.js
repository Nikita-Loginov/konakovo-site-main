import { toggleMenu, closeMenuClickElInner } from "./modules/menu.js";
import { toggleFormWhenScrollFooter } from "./modules/animation.js";
import { maskTel } from "./modules/masks.js";
import { calendar } from "./modules/calendar.js";
import { initModal } from "./modules/modal.js";
import { setProccent } from "./modules/preloader.js";
import { initFormValidation } from "./modules/validate.js";
import { checkScrollY } from "./modules/header.js";


calendar();
setProccent()

toggleFormWhenScrollFooter();
document.addEventListener("scroll", () => {
  toggleFormWhenScrollFooter();
});


function initMenu() {
  const menu = document.querySelector(".menu");

  toggleMenu(menu);

  closeMenuClickElInner(".menu__link", menu);
}

initMenu();
maskTel();
initModal();


document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('[data-form]')
  
  forms.forEach((form) => {
    initFormValidation(form);
  })

});

document.addEventListener('scroll', checkScrollY)


