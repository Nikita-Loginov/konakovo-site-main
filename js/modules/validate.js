import { maskTel } from "./masks.js";
import { classAction } from "./classActions.js";

export function initFormValidation(form) {
  if (!form) return;

  maskTel();

  initCustomSelects(form);

  form.addEventListener("input", handleFieldChange);
  form.addEventListener("change", handleFieldChange);
  form.addEventListener("submit", handleFormSubmit);
}

function removeAllElementClass(elements, className) {
  elements.forEach((item) => {
    classAction(item, "active", "remove");
  });
}

let isDocumentListenerAttached = false;

export function initCustomSelects(form) {
  if (!form) return;

  const customSelects = form.querySelectorAll(".custom-select");

  if (!customSelects.length) return;

  customSelects.forEach((select) => {
  
    if (select.dataset.inited === "true") return;
    select.dataset.inited = "true";

    const selectedOption = select.querySelector(".selected-option");
    const optionsList = select.querySelector(".options-list");
    const realSelect = select.querySelector(".real-select");
    const options = optionsList.querySelectorAll("li");

    options.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(option.textContent.trim(), selectedOption.value)
        selectedOption.setAttribute('value',  option.textContent.trim())
        classAction(select, "active", "remove");
        removeAllElementClass(options, "active");
        classAction(option, "active", "add");
      });
    });

    select.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.closest(".custom-select__active")) {
        classAction(select, "active", "toggle");
      }
    });
  });

  if (!isDocumentListenerAttached) {
    document.addEventListener("click", (e) => {
      document.querySelectorAll(".custom-select").forEach((select) => {
        if (!select.contains(e.target)) {
          classAction(select, "active", "remove");
        }
      });
    });
    isDocumentListenerAttached = true;
  }
}

function handleFieldChange(event) {
  const field = event.target;
  const formItem = field.closest(".form__item");

  if (formItem) {
    validateField(field);
    updateSubmitButton(field.closest(".form"));
  }
}

function validateField(field) {
  const formItem = field.closest(".form__item");
  const errorContainer = formItem.querySelector(".form__errors");
  let isValid = true;
  let errorMessage = "";

  // Валидация кастомного селекта
  if (field.classList.contains("selected-option")) {
    const realSelect = field
      .closest(".custom-select")
      .querySelector(".real-select");
    isValid = realSelect.value !== "";
    errorMessage = isValid ? "" : field.dataset.empty;
  }
  // Валидация обычных полей
  else {
    if (field.validity.valueMissing) {
      errorMessage = field.dataset.empty;
      isValid = false;
    } else if (field.validity.patternMismatch) {
      errorMessage = field.dataset.title;
      isValid = false;
    }
  }

  if (errorContainer) {
    errorContainer.textContent = errorMessage;
  }

  classAction(formItem, "error", isValid ? "remove" : "add");
  field.setAttribute("aria-invalid", isValid ? "false" : "true");

  return isValid;
}

function triggerValidation(field) {
  const event = new Event("change", { bubbles: true });
  field.dispatchEvent(event);
}

function updateSubmitButton(form) {
  const submitButton = form.querySelector('button[type="submit"]');
  const formIsValid = checkFormValidity(form);

  classAction(submitButton, "disabled", formIsValid ? "remove" : "add");
}

function checkFormValidity(form) {
  const requiredFields = form.querySelectorAll("[required]");

  return Array.from(requiredFields).every((field) => {
    if (field.classList.contains("selected-option")) {
      const realSelect = field
        .closest(".custom-select")
        .querySelector(".real-select");
      return realSelect.value !== "";
    }
    return field.validity.valid;
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;

  if (checkFormValidity(form)) {
    // Форма валидна, можно отправлять
    form.reset();
    resetSelect(form);
    updateSubmitButton(form);
  } else {
    const requiredFields = form.querySelectorAll("[required]");
    requiredFields.forEach((field) => validateField(field));
  }
}

function resetSelect(form) {
  const selectsRequired = form.querySelectorAll("select[required]");

  selectsRequired.forEach((select) => {
    select.value = "";
  });
}
