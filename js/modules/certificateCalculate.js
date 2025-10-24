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
        summ: "153 500",
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
  lifeWeekdays: {
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
//   lifeWeekdays: {
//     totalGuests: 8,
//     minGuests: 1,
//     guestsInfo: {
//       1: {
//         summ: "52 500",
//         time: 2,
//       },
//       2: {
//         summ: "85 000",
//         time: 3,
//       },
//       3: {
//         summ: "117 500",
//         time: 4,
//       },
//       4: {
//         summ: "130 000",
//         time: 4,
//       },
//       5: {
//         summ: "162 500",
//         time: 5,
//       },
//       6: {
//         summ: "175 000",
//         time: 5,
//       },
//       7: {
//         summ: "207 500",
//         time: 6,
//       },
//       8: {
//         summ: "220 500",
//         time: 6,
//       },
//     },

//     name: 'Обрядовая программа "Погружения(пн-чт)"',
//   },
};

const setGuests = () => {
  const formsCertification = findForms();

  if (!formsCertification) return;

  formsCertification.forEach((form) => {
    form.addEventListener("change", (e) => {
      if (e.target.matches("input, select") && e.target.dataset?.nameId) {
        const name = e.target.dataset?.nameId;

        if (!data?.[name]) return;

        const { totalGuests, minGuests } = data?.[name];

        const infoGuests = {
          minGuests,
          totalGuests,
        };

        renderGuests(form, infoGuests);
      }
    });
  });
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

  optionsList.innerHTML = "";
  realSelect.innerHTML = "";

  for (let i = minGuests; i <= totalGuests; i++) {
    const liElement = `<li
                                data-value=${i}
                                data-name-id='guests-${i}'
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

export const initCertificateCalculate = () => {
  setGuests();
};
