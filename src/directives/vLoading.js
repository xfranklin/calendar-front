const elementType = {
  BUTTON: "BUTTON",
  BUTTON_ICON: "BUTTON_ICON"
};

const getElementType = (el) => {
  const isButton = [
    "base-primary-button",
    "base-secondary-button",
    "base-primary-outlined-button",
    "base-secondary-outlined-button"
  ].some((className) => el.classList.contains(className));

  if (isButton) {
    const isIcon = ["only-icon", "icon"].some((className) => el.classList.contains(className));
    return isIcon ? elementType.BUTTON_ICON : elementType.BUTTON;
  }
};

const addLoader = (el) => {
  const type = getElementType(el);
  switch (type) {
    case elementType.BUTTON: {
      el.classList.add("loading");
      const loaderElement = document.createElement("div");
      loaderElement.classList.add("base-loader");
      el.prepend(loaderElement);
      return;
    }
    case elementType.BUTTON_ICON: {
      el.classList.add("loading");
      const loaderElement = document.createElement("div");
      loaderElement.classList.add("base-loader");
      el.prepend(loaderElement);
      el.querySelector(".base-icon").style.display = "none";
      return;
    }
    default:
      return;
  }
};

const removeLoader = (el) => {
  const type = getElementType(el);
  switch (type) {
    case elementType.BUTTON: {
      el.classList.remove("loading");
      el.querySelector(".base-loader").remove();
      return;
    }
    case elementType.BUTTON_ICON: {
      el.classList.remove("loading");
      el.querySelector(".base-loader").remove();
      el.querySelector(".base-icon").style.display = "block";
      return;
    }
    default:
      return;
  }
};

export const vLoading = {
  mounted(el, { value }) {
    if (value) {
      addLoader(el);
    }
  },
  updated(el, { value, oldValue }) {
    if (value === oldValue) return;
    if (value) {
      addLoader(el);
    } else {
      removeLoader(el);
    }
  }
};
