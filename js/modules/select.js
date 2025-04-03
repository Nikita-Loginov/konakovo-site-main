export function initSelect() {
  document.querySelectorAll(".custom-select").forEach((customSelect) => {
    const realSelect = customSelect.querySelector(".real-select");
    const selectedOption = customSelect.querySelector(".selected-option");
    const optionsList = customSelect.querySelector(".options-list");
    const options = optionsList.querySelectorAll("li");
    const optionsSelect = customSelect.querySelectorAll('option')

    let selectedIndex = -1;

    selectedOption.addEventListener("click", toggleDropdown);
    selectedOption.addEventListener("keydown", handleKeyDown);

    options.forEach((option, index) => {
      option.addEventListener("click", () => {
        selectOption(option, index);
      });
    });

    document.addEventListener("click", (e) => {
      if (!customSelect.contains(e.target)) {
        closeDropdown();
      }
    });

    function toggleDropdown() {
      optionsList.style.display =
        optionsList.style.display === "block" ? "none" : "block";
      if (optionsList.style.display === "block") {
        highlightSelected();
      }
    }

    function closeDropdown() {
      optionsList.style.display = "none";
      selectedIndex = -1;
    }

    function selectOption(option, index) {
      selectedOption.value = option.textContent;

      realSelect.value = option.dataset.value;

      options.forEach((opt) => opt.classList.remove("selected"));
      option.classList.add("selected");

      optionsSelect.forEach((option) => {
        option.removeAttribute('selected')
      })

      optionsSelect[index + 1].setAttribute('selected', '')

      closeDropdown();

      realSelect.dispatchEvent(new Event("change"));
    }

    function handleKeyDown(e) {
      if (!["ArrowUp", "ArrowDown", "Enter", "Escape"].includes(e.key)) return;

      e.preventDefault();

      if (e.key === "Escape") {
        closeDropdown();
        return;
      }

      if (e.key === "Enter") {
        if (optionsList.style.display === "none") {
          toggleDropdown();
        } else if (selectedIndex >= 0) {
          selectOption(options[selectedIndex], selectedIndex);
        }
        return;
      }

      if (optionsList.style.display !== "block") {
        toggleDropdown();
      }

      const direction = e.key === "ArrowDown" ? 1 : -1;
      const newIndex = selectedIndex + direction;

      if (newIndex >= 0 && newIndex < options.length) {
        selectedIndex = newIndex;
        highlightSelected();
      }
    }

    function highlightSelected() {
      options.forEach((opt, index) => {
        opt.classList.toggle("highlighted", index === selectedIndex);
        if (index === selectedIndex) {
          opt.scrollIntoView({ block: "nearest" });
        }
      });
    }

    if (realSelect.value) {
      const selectedLi = optionsList.querySelector(
        `li[data-value="${realSelect.value}"]`
      );
      if (selectedLi) {
        selectedOption.textContent = selectedLi.textContent;
        selectedLi.classList.add("selected");
      }
    }
  });
}
