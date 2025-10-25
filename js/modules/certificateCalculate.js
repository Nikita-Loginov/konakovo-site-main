import { resetSelect } from "./validate.js";
import { setInnerHTML, declOfNum } from "../functions.js";

const data = {
  divesWeekdays: {
    totalGuests: 4,
    minGuests: 1,
    guestsInfo: {
      1: {
        summ: "49 500",
        time: 2,
      },
      2: {
        summ: "84 000",
        time: 3,
      },
      3: {
        summ: "118 500",
        time: 4,
      },
      4: {
        summ: "153 000",
        time: 5,
      },
    },

    name: 'Обрядовая программа "Погружения(пн-чт)"',
  },
  divesWeekend: {
    totalGuests: 4,
    minGuests: 1,
    guestsInfo: {
      1: {
        summ: "59 500",
        time: 2,
      },
      2: {
        summ: "99 000",
        time: 3,
      },
      3: {
        summ: "138 500",
        time: 4,
      },
      4: {
        summ: "178 500",
        time: 5,
      },
    },
    name: 'Обрядовая программа "Погружения(пн-чт)"',
  },
  lifeWeekdays: {
    totalGuests: 8,
    minGuests: 1,
    guestsInfo: {
      1: {
        summ: "42 500",
        time: 2,
      },
      2: {
        summ: "70 000",
        time: 3,
      },
      3: {
        summ: "97 500",
        time: 4,
      },
      4: {
        summ: "110 500",
        time: 4,
      },
      5: {
        summ: "137 500",
        time: 5,
      },
      6: {
        summ: "150 000",
        time: 5,
      },
      7: {
        summ: "177 500",
        time: 6,
      },
      8: {
        summ: "190 500",
        time: 6,
      },
    },

    name: 'Процедурная программа "Вкус жизни(пн-чт)"',
  },
  lifeWeekend: {
    totalGuests: 8,
    minGuests: 1,
    guestsInfo: {
      1: {
        summ: "52 500",
        time: 2,
      },
      2: {
        summ: "85 000",
        time: 3,
      },
      3: {
        summ: "117 500",
        time: 4,
      },
      4: {
        summ: "130 000",
        time: 4,
      },
      5: {
        summ: "162 500",
        time: 5,
      },
      6: {
        summ: "175 000",
        time: 5,
      },
      7: {
        summ: "207 500",
        time: 6,
      },
      8: {
        summ: "220 500",
        time: 6,
      },
    },

    name: 'Процедурная программа "Вкус жизни(пт-вс)"',
  },
  сommunityWeekdays: {
    totalGuests: 10,
    minGuests: 2,
    guestsInfo: {
      2: {
        summ: "42 000",
        time: 2,
      },
      3: {
        summ: "63 000",
        time: 3,
      },
      4: {
        summ: "69 000",
        time: 3,
      },
      5: {
        summ: "90 000",
        time: 4,
      },
      6: {
        summ: "96 000",
        time: 4,
      },
      7: {
        summ: "117 000",
        time: 5,
      },
      8: {
        summ: "123 000",
        time: 5,
      },
      9: {
        summ: "129 000",
        time: 5,
      },
      10: {
        summ: "135 000",
        time: 5,
      },
    },

    name: 'Коллективная программа "Община (пн-чт)"',
  },
  сommunityWeekend: {
    totalGuests: 10,
    minGuests: 2,
    guestsInfo: {
      2: {
        summ: "52 000",
        time: 2,
      },
      3: {
        summ: "78 000",
        time: 3,
      },
      4: {
        summ: "84 000",
        time: 3,
      },
      5: {
        summ: "110 000",
        time: 4,
      },
      6: {
        summ: "116 000",
        time: 4,
      },
      7: {
        summ: "142 000",
        time: 5,
      },
      8: {
        summ: "148 000",
        time: 5,
      },
      9: {
        summ: "154 000",
        time: 5,
      },
      10: {
        summ: "160 000",
        time: 5,
      },
    },

    name: 'Коллективная программа "Община (пт-вс)"',
  },
};

const setGuests = (name, form) => {
  if (!data?.[name]) return;

  const { totalGuests, minGuests } = data?.[name];

  const infoGuests = {
    minGuests,
    totalGuests,
  };

  renderGuests(form, infoGuests);
};

const findSummAndTime = (countGuest, form) => {
  if (!countGuest || !form) return;

  const programmInput = form.querySelector(
    "[data-select-programs] .custom-select__active input"
  );

  if (!programmInput) return;

  const { nameId: programmName } = programmInput.dataset;

  if (countGuest && programmName) {

    const { guestsInfo } = data[programmName];

    renderSummAndTime(form, guestsInfo[countGuest]);
  }
};

const findForms = () => {
  const formsCertification = document.querySelectorAll(
    "[data-certificate-form]"
  );

  if (formsCertification.length < 1) return;

  return formsCertification;
};

const renderGuests = (form, { minGuests, totalGuests }) => {
  if (!form) return;

  const selectGuests = form.querySelector("[data-select-guests]");

  if (!selectGuests) return;

  selectGuests.classList.remove("disabled");

  const optionsList = selectGuests.querySelector(".options-list");
  const realSelect = selectGuests.querySelector(".real-select");

  setInnerHTML(optionsList, "");
  setInnerHTML(realSelect, "");

  for (let i = minGuests; i <= totalGuests; i++) {
    const liElement = `<li
                                data-value=${i}
                                data-name-id='${i}'
                              >
                                <span
                                  >${i}</span
                                >

                                <span class="options-list__arrow">
                                  <img
                                    src="./img/icons/arrowReady.svg"
                                    alt="иконка"
                                  />
                                </span>
                              </li>`;

    const optionElement = ` <option value=${i}>${i}</option>`;

    const defaultOption = ` <option value="" selected disabled>
                                Выберите
                              </option>`;

    optionsList.insertAdjacentHTML("beforeend", liElement);

    if (i === minGuests) {
      realSelect.insertAdjacentHTML("beforeend", defaultOption);
    }

    realSelect.insertAdjacentHTML("beforeend", optionElement);
  }
};

const renderSummAndTime = (form, { summ, time } = { summ: "", time: "" }) => {
  const summBox = form.querySelector("[data-certificate-summ]");
  const timeBox = form.querySelector("[data-certificate-time]");

  setInnerHTML(
    summBox,
    `сумма: ${summ ? summ : "выбирите программу и кол-во гостей"}`
  );
  setInnerHTML(
    timeBox,
    `Продолжительность: ${
      time
        ? `${time} ${declOfNum(time, ["час", "часа", "часов"])}`
        : "выберите программу и кол-во гостей"
    }`
  );
};

const submitForm = (form) => {
  renderSummAndTime(form);

  const guestsSelect = form.querySelector('[data-select-guests]');

  if (!guestsSelect) return;

  guestsSelect.classList.add('disabled')
};

export const initCertificateCalculate = () => {
  const formsCertification = findForms();

  if (!formsCertification) return;

  formsCertification.forEach((form) => {
    form.addEventListener("change", (e) => {
      if (e.target.matches("input, select") && e.target.dataset?.nameId) {
        const guestsInput = e.target.closest("[data-select-guests]");
        const programmInput = e.target.closest("[data-select-programs]");

        const name = e.target.dataset?.nameId;

        if (programmInput) {
          const guestBlock = form.querySelector("[data-select-guests-box]");

          resetSelect(guestBlock);

          renderSummAndTime(form);

          setGuests(name, form);
        }

        if (guestsInput) {
          findSummAndTime(name, form);
        }
      }
    });

    form.addEventListener("submit", () => {
      submitForm(form);
    });
  });
};
