const setStorage = (name, value, days, useLocalStorage = false) => {
  if (useLocalStorage) {
    localStorage.setItem(name, value);
  } else {
    const date = new Date();

    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

    const expires = "expires=" + date.toUTCString();

    document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax`;
  }
};

const getStorage = (name, useLocalStorage = false) => {
  if (useLocalStorage) {
    return localStorage.getItem(name);
  } else {
    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");

      if (cookieName === name) return cookieValue;
    }
    return null;
  }
};

export const initStorage = (e) => {
  const { target } = e;

  console.log(target)

  if (target.dataset.storageBtn !== undefined) {
    const element = target.closest("[data-storage-key]");
    if (!element) return;

    const storageKey = element.dataset.storageKey;
    const storageValue = element.dataset.storageValue || "true";
    const storageDays = parseInt(element.dataset.storageDays) || 365;
    const useLocalStorage = element.dataset.storageType === "localstorage";
    const removeElement = element.dataset.storageRemove !== "false";

    setStorage(storageKey, storageValue, storageDays, useLocalStorage);

    if (removeElement) {
      element.remove();
    }
  }

  if (target.dataset.storageClose !== undefined) {
    const element = target.closest("[data-storage-key]");
    if (!element) return;

    const storageKey = element.dataset.storageKey;

    const storageValue = element.dataset.storageValue || "closed";

    const storageDays = parseInt(element.dataset.storageDays) || 365;

    const useLocalStorage = element.dataset.storageType === "localstorage";

    const removeElement = element.dataset.storageRemove !== "false";

    setStorage(storageKey, storageValue, storageDays, useLocalStorage);

    if (removeElement) {
      element.remove();
    }
  }
};

export const checkStorage = () => {
  document.querySelectorAll("[data-storage-key]").forEach((element) => {
    const storageKey = element.dataset.storageKey;

    const useLocalStorage = element.dataset.storageType === "localstorage";

    const storageValue = getStorage(storageKey, useLocalStorage);

    if (storageValue) {
      const removeElement = element.dataset.storageRemove !== "false";

      if (removeElement) {
        element.remove();

        if (element.classList.contains('modalBlock')) {
            document.body.classList.remove('open-modal')
        }
      } else {
        element.style.display = "none";
      }
    }
  });
};

export const removeStorage = (name, useLocalStorage = false) => {
  if (useLocalStorage) {
    localStorage.removeItem(name);
  } else {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
};

export const clearAllStorage = () => {
  localStorage.clear();

  document.cookie.split(";").forEach((cookie) => {
    document.cookie = cookie
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
};
