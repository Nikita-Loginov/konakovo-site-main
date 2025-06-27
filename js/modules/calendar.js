export function calendar() {
  const reservationForm = document.querySelectorAll(".reservation-form");

  reservationForm.forEach((item) => {
    let dpMin, dpMax;
    let position;
    const dateMin = item.querySelector("#date-min");
    const dateMax = item.querySelector("#date-max");
    const reservationFormScroll = item.classList.contains(
      "reservation-form--scroll"
    );
    position = reservationFormScroll ? "top left" : "bottom left";

    dpMin = new AirDatepicker(dateMin, {
      position: position,
      onSelect({ date }) {
        dpMax.update({
          minDate: date,
        });
      },

      navTitles: {
        days(dp) {
          if (dp.selectedDates.length) {
            let date = dp.selectedDates[0];
            const box = dateMin.closest(".reservation-form__box");
            const title = box.querySelector(".reservation-form__text");
            title.textContent = dp.formatDate(date, "dd MMMM yyyy");
          }

          const viewDate = dp.currentViewDate;
          const formattedMonthYear = dp.formatDate(viewDate, "MMMM yyyy");
          return `<small>${formattedMonthYear}</small>`;
        },
      },
    });

    dpMax = new AirDatepicker(dateMax, {
      position: position,
      onSelect({ date }) {
        dpMin.update({
          maxDate: date,
        });
      },

      navTitles: {
        days(dp) {
          if (dp.selectedDates.length) {
            let date = dp.selectedDates[0];
            const box = dateMax.closest(".reservation-form__box");
            const title = box.querySelector(".reservation-form__text");
            title.textContent = dp.formatDate(date, "dd MMMM yyyy");
          }

          const viewDate = dp.currentViewDate;
          const formattedMonthYear = dp.formatDate(viewDate, "MMMM yyyy");
          return `<small>${formattedMonthYear}</small>`;
        },
      },
    });
  });
}

calendar();
