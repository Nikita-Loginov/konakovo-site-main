import { initCounter } from "./counter.js";
import { summPersons } from "./counter.js";

document.addEventListener("click", (e) => {
  const { target } = e;

  if (target.closest(".counter__btn") || target.closest(".guests__add")) {
    initCounter(e);

    const btn = target.closest(".counter__btn");
    const counter = target.closest(".counter");
    const btnAdd = target.closest(".guests__add");
    const guests = target.closest(".guests");
    const items = guests.querySelector(".guests__items");

    if (btn && counter && counter.classList.contains("child-box")) {
      const guestsItem = counter.closest(".guests-item");
      const childBox = guestsItem.querySelector(".guests-item__child-box");
      const number = counter.querySelector(".counter__number");

      if (btn.dataset.action === "plus") {
        const html = renderHtmlChild(number.textContent);

        childBox.insertAdjacentHTML("beforeend", html);
      } else {
        childBox.children[childBox.children.length - 1].remove();
      }
    }

    if (btnAdd) {
      if (items.children.length + 1 > 4) {
        btnAdd.classList.add("disabled");

        items.insertAdjacentHTML(
          "beforeend",
          renderItem(items.children.length + 1)
        );

        summPersons(target)
        return;
      }

      items.insertAdjacentHTML(
        "beforeend",
        renderItem(items.children.length + 1)
      );

      summPersons(target)
    }

    if (target.closest(".guests-item__close")) {
      const item = target.closest(".guests-item");
      e.preventDefault(); // Блокируем действие по умолчанию
      e.stopPropagation();
      // item.remove()

      // for (let i = 0; i < items.children.length; i++) {
      //     const title = items.children[i].querySelector('.guests-item__title');
      //     console.log(items)
      //     title.textContent = `Номер ${i + 1}`
      // }
    }
  }
});

const renderHtmlChild = (child = 1) => {
  return ` <div class="guests-item__child">
                                <p>Возраст ${child}-го ребенка</p>

                                <div class="custom-select">
                                  <label class="custom-select__active">
                                    <input
                                      minlength="1"
                                      class="selected-option"
                                      tabindex="0"
                                      data-empty="0 лет"
                                      placeholder="0 лет"
                                      readonly
                                    />
            
                                    <span class="custom-select__active-arrow">
                                      <img src="./img/icons/arrowSelect.svg" alt="иконка" />
                                    </span>
                                  </label>
            
                                  <ul class="options-list">
                                    <li data-value="1">
                                      <span>0 год</span>
            
                                      <span class="options-list__arrow">
                                        <img
                                          src="./img/icons/arrowReady.svg"
                                          alt="иконка"
                                        />
                                      </span>
                                    </li>

                                    <li data-value="2">
                                      <span>1 год</span>
            
                                      <span class="options-list__arrow">
                                        <img
                                          src="./img/icons/arrowReady.svg"
                                          alt="иконка"
                                        />
                                      </span>
                                    </li>

                                    <li data-value="3">
                                      <span>2 год</span>
            
                                      <span class="options-list__arrow">
                                        <img
                                          src="./img/icons/arrowReady.svg"
                                          alt="иконка"
                                        />
                                      </span>
                                    </li>

                                    <li data-value="4">
                                      <span>3 год</span>
            
                                      <span class="options-list__arrow">
                                        <img
                                          src="./img/icons/arrowReady.svg"
                                          alt="иконка"
                                        />
                                      </span>
                                    </li>

                                    <li data-value="5">
                                      <span>4 год</span>
            
                                      <span class="options-list__arrow">
                                        <img
                                          src="./img/icons/arrowReady.svg"
                                          alt="иконка"
                                        />
                                      </span>
                                    </li>

                                    <li data-value="6">
                                      <span>5 год</span>
            
                                      <span class="options-list__arrow">
                                        <img
                                          src="./img/icons/arrowReady.svg"
                                          alt="иконка"
                                        />
                                      </span>
                                    </li>

                                    <li data-value="7">
                                      <span>6 год</span>
            
                                      <span class="options-list__arrow">
                                        <img
                                          src="./img/icons/arrowReady.svg"
                                          alt="иконка"
                                        />
                                      </span>
                                    </li>

                                    <li data-value="8">
                                      <span>7 год</span>
            
                                      <span class="options-list__arrow">
                                        <img
                                          src="./img/icons/arrowReady.svg"
                                          alt="иконка"
                                        />
                                      </span>
                                    </li>

                                    <li data-value="9">
                                      <span>8 год</span>
            
                                      <span class="options-list__arrow">
                                        <img
                                          src="./img/icons/arrowReady.svg"
                                          alt="иконка"
                                        />
                                      </span>
                                    </li>

                                    <li data-value="10">
                                      <span>9 год</span>
            
                                      <span class="options-list__arrow">
                                        <img
                                          src="./img/icons/arrowReady.svg"
                                          alt="иконка"
                                        />
                                      </span>
                                    </li>

                                    <li data-value="11">
                                      <span>10 год</span>
            
                                      <span class="options-list__arrow">
                                        <img
                                          src="./img/icons/arrowReady.svg"
                                          alt="иконка"
                                        />
                                      </span>
                                    </li>

                                    <li data-value="12">
                                      <span>11 год</span>
            
                                      <span class="options-list__arrow">
                                        <img
                                          src="./img/icons/arrowReady.svg"
                                          alt="иконка"
                                        />
                                      </span>
                                    </li>
                                  </ul>
            
                                  <select class="real-select" name="my-select">
                                    <option value="" selected disabled>Выберите</option>
                                    <option value="1">1 год</option>
                                    <option value="2">2 год</option>
                                    <option value="3">3 год</option>
                                    <option value="4">4 год</option>
                                    <option value="5">5 год</option>
                                    <option value="6">6 год</option>
                                    <option value="7">7 год</option>
                                    <option value="8">8 год</option>
                                    <option value="9">9 год</option>
                                    <option value="10">10 год</option>
                                    <option value="11">11 год</option>
                                  </select>
                                </div>
                              </div>`;
};

const renderItem = (index = 2) => {
  const html = `<div class="guests-item">
                            <div class="guests-item__head">
                              <p class="guests-item__title">Номер ${index}</p>
                            
                              <button type="button" class="guests-item__close"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M13.0568 14.6831C13.4714 15.1056 14.1437 15.1056 14.5584 14.6831C14.973 14.2606 14.973 13.5755 14.5584 13.153L9.51856 8.01752L14.6718 2.99981C15.0957 2.587 15.111 1.90214 14.7059 1.47012C14.3008 1.03811 13.6287 1.02255 13.2047 1.43536L8.0166 6.48705L2.94279 1.31689C2.52815 0.894369 1.85587 0.89437 1.44123 1.31689C1.02658 1.73941 1.02658 2.42445 1.44123 2.84697L6.48091 7.98236L1.32824 12.9995C0.904277 13.4124 0.889004 14.0972 1.29412 14.5292C1.69924 14.9612 2.37134 14.9768 2.7953 14.564L7.98287 9.51283L13.0568 14.6831Z" fill="#4C4C4C" fill-opacity="0.4"/>
</svg></button>
                            </div>

                            <div class="guests-item__actions">
                              <div class="guests-item__person">
                                <div class="guests-item__person-box">
                                  <p class="guests-item__person-head">
                                    Взрослые
                                  </p>

                                  <p class="guests-item__person-text">
                                    от 12 лет
                                  </p>
                                </div>

                                <div class="counter" data-min-length="1" data-max-lenght="10">
                                  <button
                                    class="counter__btn"
                                    data-action="minus"
                                    type="button"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="2"
                                      viewBox="0 0 16 2"
                                      fill="none"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M0 1C0 0.447715 0.447715 0 1 0H15C15.5523 0 16 0.447715 16 1C16 1.55228 15.5523 2 15 2H1C0.447715 2 0 1.55228 0 1Z"
                                        fill="white"
                                      />
                                    </svg>
                                  </button>

                                  <p class="counter__number">2</p>

                                  <button
                                    class="counter__btn"
                                    data-action="plus"
                                    type="button"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M9 1C9 0.447715 8.55229 0 8 0C7.44772 0 7 0.447715 7 1V7H1C0.447715 7 0 7.44772 0 8C0 8.55229 0.447715 9 1 9H7V15C7 15.5523 7.44772 16 8 16C8.55229 16 9 15.5523 9 15V9H15C15.5523 9 16 8.55229 16 8C16 7.44772 15.5523 7 15 7H9V1Z"
                                        fill="white"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>

                              <div class="guests-item__person">
                                <div class="guests-item__person-box">
                                  <p class="guests-item__person-head">Дети</p>

                                  <p class="guests-item__person-text">
                                    до 12 лет
                                  </p>
                                </div>

                                <div
                                  class="counter child-box"
                                  data-max-lenght="9"
                                >
                                  <button
                                    class="counter__btn"
                                    data-action="minus"
                                    type="button"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="2"
                                      viewBox="0 0 16 2"
                                      fill="none"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M0 1C0 0.447715 0.447715 0 1 0H15C15.5523 0 16 0.447715 16 1C16 1.55228 15.5523 2 15 2H1C0.447715 2 0 1.55228 0 1Z"
                                        fill="white"
                                      />
                                    </svg>
                                  </button>

                                  <p class="counter__number">1</p>

                                  <button
                                    class="counter__btn"
                                    data-action="plus"
                                    type="button"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M9 1C9 0.447715 8.55229 0 8 0C7.44772 0 7 0.447715 7 1V7H1C0.447715 7 0 7.44772 0 8C0 8.55229 0.447715 9 1 9H7V15C7 15.5523 7.44772 16 8 16C8.55229 16 9 15.5523 9 15V9H15C15.5523 9 16 8.55229 16 8C16 7.44772 15.5523 7 15 7H9V1Z"
                                        fill="white"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>

                              <div class="guests-item__child-box">
                                ${renderHtmlChild(1)}
                              </div>
                            </div>
                          </div>     `;

  return html;
};

