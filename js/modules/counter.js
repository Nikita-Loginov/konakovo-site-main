export const initCounter = (e) => {
  const btn = e.target.closest(".counter__btn");
  if (!btn) return;

  const counter = btn.closest(".counter");
  const numberEl = counter.querySelector(".counter__number");

  if (btn.dataset.action === "plus") {
    plusCounter(numberEl, counter, btn);
  } else {
    minusCounter(numberEl, counter, btn);
  }

  
  summPersons(counter);
};

const plusCounter = (numberEl, counter, btn) => {
  const max = Number(counter.dataset.maxLenght);
  const currentValue = Number(numberEl.textContent);
  const minusBtn = counter.querySelector('[data-action="minus"]');

  if (currentValue < max) {
    const newNumber = currentValue + 1;
    numberEl.textContent = newNumber;

    checkCountPerson(counter);

    if (newNumber === max) {
      btn.classList.add("disabled");
    }

    if (newNumber) {
      minusBtn.classList.remove("disabled");
    }
  }
};

const minusCounter = (numberEl, counter, btn) => {
  const max = Number(counter.dataset.maxLenght);
  const currentValue = Number(numberEl.textContent);
  const plusBtn = counter.querySelector('[data-action="plus"]');
  const min = counter.dataset.minLength || 0;

  if (currentValue > min) {
    const newNumber = currentValue - 1;
    numberEl.textContent = newNumber;

    checkCountPerson(counter);

    if (newNumber === Number(min)) {
      btn.classList.add("disabled");
    }

    if (newNumber < max) {
      console.log(newNumber)
      plusBtn.classList.remove("disabled");
    }
  }
};

const checkCountPerson = (counter) => {
  const maxPerson = 10;

  const item = counter.closest(".guests-item");
  const counterNumbers = item.querySelectorAll(".counter__number");

  const sum = Array.from(counterNumbers).reduce((accumulator, currentValue) => {
    return accumulator + Number(currentValue.textContent);
  }, 0);

  const btnsPlus = item.querySelectorAll("[data-action='plus']");

  btnsPlus.forEach((btn) => {
    if (sum === maxPerson) {
      btn.classList.add("disabled");
    } else {
      btn.classList.remove("disabled");
    }
  });
};

export const summPersons = (counter) => {

  const relative = counter.closest('.guests')
  const counetNumbers = relative.querySelectorAll(".counter__number");
  const textBox = relative.querySelector('.reservation-form__box.guests .reservation-form__text');
  let summPersonOld = 0;
  let summPersonChildren = 0;

  counetNumbers.forEach((item) => {
    const counteChild = item.closest(".child-box");

    if (counteChild) {
      summPersonChildren += Number(item.textContent);
    } else {
      summPersonOld += Number(item.textContent);
    }
  });

  const nameChildren = getChildText(summPersonChildren)

  textBox.textContent = `${summPersonOld} взрослых и ${summPersonChildren} ${nameChildren}`
};

const  getChildText = (count) => {
  const forms = ['ребенок', 'ребенка', 'детей'];
  const idx = (count % 100 > 4 && count % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][Math.min(count % 10, 5)];
  return `${forms[idx]}`;
}
const counters = document.querySelectorAll('.guests');

counters.forEach((counter) => {
  summPersons(counter);
})

