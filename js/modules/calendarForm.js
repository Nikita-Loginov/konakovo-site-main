export function initCalendatForm() {
  const calendarForm = document.querySelectorAll(".calendar-form");

  calendarForm.forEach((item) => {
    const calendar = item.querySelector('.calendar-form__box');
    console.log(calendar)

    new AirDatepicker(calendar, {
      navTitles: {
        days(dp) {
          if (dp.selectedDates.length) {
            let date = dp.selectedDates[0];
            const box = item.querySelector("input");
            box.value = dp.formatDate(date, "dd MMMM yyyy");
            return `<small>
                               ${dp.formatDate(date, "dd MMMM yyyy")}
                            </small>`;
          }

          return "Выберите дату";
        },
      },
    });
  });
}
