import { classAction } from "./classActions.js";

// ПРИМЕР ИСПОЛЬЗОВАНИЯ ФУНКЦИЙ В КОНЦЕ

// elClass - элемент на которой будет добавляться класс open при клике на burger-menu
export function toggleMenu(elClass) {
  const burgerMenu = document.querySelector(".burger-menu");

  burgerMenu.addEventListener("click", () => {
    classAction(elClass, "open", "toggle");

    classAction(document.body, "open--menu", "toggle");
  });
}

// функция для того, что закрывать меню при клике на какой-то элемент внутри меню, например: пункты меню.
// elClass - это класс того элемента при клике на который будет скрываться меню,elClassRemove - элемент на котором будет удаляться активный класс для открытия меню
export function closeMenuClickElInner(elClass, elClassRemove) {
  const elements = document.querySelectorAll(elClass);

  elements.forEach((item) => {
    item.addEventListener("click", () => {
      classAction(elClassRemove, "open", "remove");

      classAction(document.body, "open--menu", "remove");
    });
  });
}

export function closeMenuClickOutsideMenu(
  classBtn,
  elClassRemove,
  menuBoxClass
) {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(menuBoxClass) && !e.target.closest(classBtn)) {
      classAction(elClassRemove, "open", "remove");

      classAction(document.body, "open--menu", "remove");
    }
  });
}

// ПРИМЕР ИСПОЛЬЗОВАНИЯ ФУНКЦИЙ
/*import { toggleMenu, closeMenuClickElInner, closeMenuClickOutsideMenu } from "./modules/menu.js";

function initMenu() {
    const header = document.querySelector('.header');

    toggleMenu(header);

    closeMenuClickElInner('.menu__link', header);

    closeMenuClickOutsideMenu('.burger-menu', header, '.menu__box');
}

initMenu()*/
