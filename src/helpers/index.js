import validator from "validator";

export const updateObject = (oldObject, updatedObjectProperties) => {
  return {
    ...oldObject,
    ...updatedObjectProperties,
  };
};

export const checkFormValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.toString().trim().length !== 0 && isValid;
  }

  if (rules.isEmail) {
    isValid = validator.isEmail(value) && isValid;
  }

  if (rules.isMobilePhone) {
    isValid = validator.isMobilePhone(value, "en-NG") && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.minDate) {
    isValid = value >= new Date().toISOString().substr(0, 10) && isValid;
  }

  if (rules.maxDate) {
    isValid =
      value <=
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 3
        )
          .toISOString()
          .substr(0, 10) && isValid;
  }

  if (rules.min) {
    isValid = +value >= rules.min && isValid;
  }

  if (rules.max) {
    isValid = +value <= rules.max && isValid;
  }

  return isValid;
};

export const getImageDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader(); // eslint-disable-line no-undef
    reader.onload = (e) => resolve({ data: { link: e.target.result } });
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
};

export const truncate = (text, maxLength) => {
  if (!text) {
    return "";
  }

  if (text.length >= maxLength) {
    return `${text.substr(0, maxLength)}...`;
  }

  return text;
};