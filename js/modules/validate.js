import { maskTel } from "./masks.js";
import { classAction } from "./classActions.js";
import { openModalStep } from "./modal.js";

export function initFormValidation(form) {
  if (!form) return;

  maskTel();

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

export function initCustomSelects(e) {
  const select = e.target.closest(".custom-select");
  if (!select) return;

  const selectedOption = select.querySelector(".selected-option");
  const optionsList = select.querySelector(".options-list");
  const realSelect = select.querySelector(".real-select");
  const options = optionsList ? optionsList.querySelectorAll("li") : [];

  if (selectedOption && !selectedOption.dataset.listenerAdded) {
    selectedOption.dataset.listenerAdded = "true";

    selectedOption.addEventListener("click", (ev) => {
      classAction(select, "active", "toggle");
      ev.stopPropagation();
    });
  }

  if (e.target.closest(".custom-select__active")) {
    classAction(select, "active", "toggle");
  }

  if (select.dataset.inited !== "true") {
    select.dataset.inited = "true";

    options.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.preventDefault();

        const value = (option.dataset.value || "").replace(/\s+/g, " ").trim();
        const nameId = (option.dataset.nameId || "")
          .replace(/\s+/g, " ")
          .trim();
        const text = (option.textContent || "").replace(/\s+/g, " ").trim();

        selectedOption.value = text;
        selectedOption.setAttribute("value", text);
        selectedOption.dataset.nameId = nameId;

        if (realSelect) realSelect.value = value;

        triggerValidation(selectedOption);

        removeAllElementClass(options, "active");
        classAction(option, "active", "add");

        classAction(select, "active", "remove");
      });
    });
  }

  if (!isDocumentListenerAttached) {
    document.addEventListener("click", (e) => {
      document
        .querySelectorAll(".custom-select.active")
        .forEach((openSelect) => {
          if (!openSelect.contains(e.target)) {
            classAction(openSelect, "active", "remove");
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
    updateSubmitButton(field.closest(".form, [data-form]"));
  }
}

function validateField(field) {
  const formItem = field.closest(".form__item");
  const errorContainer = formItem.querySelector(".form__errors");
  let isValid = true;
  let errorMessage = "";

  if (field.classList.contains("selected-option")) {
    const realSelect = field
      .closest(".custom-select")
      .querySelector(".real-select");
    isValid = realSelect.value !== "";
    errorMessage = isValid ? "" : field.dataset.empty;
  } else {
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

export function checkFormValidity(form) {
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
    form.reset();
    resetSelect(form);
    updateSubmitButton(form);

    const btnModal = event.target.querySelector(
      'button[type="submit"].modal-open, button[type="submit"].modal-close'
    );
    const nameModal = btnModal.dataset.modal;

    if (btnModal && nameModal) {
      openModalStep(
        btnModal,
        document.querySelectorAll(`.modalBlock`),
        document.querySelector(`.${nameModal}`)
      );
    }
  } else {
    const requiredFields = form.querySelectorAll("[required]");
    requiredFields.forEach((field) => validateField(field));
  }
}

export function resetSelect(el) {
  const customSelects = el.querySelectorAll(".custom-select");

  customSelects.forEach((select) => {
    const realSelect = select.querySelector(".real-select");
    const selectedOption = select.querySelector(".selected-option");
    const options = select.querySelectorAll(".options-list li");

    if (realSelect) {
      realSelect.value = "";
    }

    if (selectedOption) {
      selectedOption.value = "";
      selectedOption.removeAttribute("value");
      selectedOption.removeAttribute("data-name-id");
    }

    select.removeAttribute("data-inited");

    removeAllElementClass(options, "active");

    classAction(select, "active", "remove");
  });
}
