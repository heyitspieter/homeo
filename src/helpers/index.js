import axios from "axios";
import cookie from "cookie";
import moment from "moment"
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

export const setCookieHeaders = (req) => {
  const cookies = ["_token"];

  let headers = {};

  for (const key in cookies) {
    const value = getCookie(cookies[key], req);

    if (value) {
      switch (cookies[key]) {
        case "_token":
          headers["Authorization"] = `Bearer ${value}`;
          break;
        default:
          break;
      }
    }
  }

  return { headers };
};

export const setCustomHeaders = (req) => {
  let headers = {};
  const reqHeaders = [];

  for (const key in reqHeaders) {
    const value = req.headers[reqHeaders[key]];

    if (value) {
      headers[reqHeaders[key]] = value;
    }
  }

  return { headers };
};

export const setCookie = (res, options = {}) => {
  const { key, value, ...rest } = options;

  return res.setHeader(
    "Set-Cookie",
    cookie.serialize(key, value, {
      ...rest,
    })
  );
};

export const catchError = (err) => {
  let error = null;

  if (err && err.response && err.response.data) {
    if (err.response.data.error) {
      error = { message: err.response.data.error };
    } else if (err.response.data.message) {
      error = err.response.data;
    } else {
      error = err.message;
    }
  } else {
    error = "Oops, something went wrong...";
  }

  return error;
};

export const getClientCookie = (key) => {
  return Cookie.get(key);
};

export const getServerCookie = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }

  const rawCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split("=")[1];
};

export const getCookie = (key, req = null) => {
  return process.browser ? getClientCookie(key) : getServerCookie(key, req);
};

export const getCookieFromResponse = (res, key) => {
  let rawCookie = undefined;
  const cookies = res.headers["set-cookie"];

  if (cookies.length > 0) {
    for (let cookie in cookies) {
      const cookiePattern = cookies[cookie]
        .split(";")[0]
        .trim()
        .startsWith(`${key}=`);

      if (cookiePattern) {
        rawCookie = cookies[cookie].split(";")[0].split("=")[1];
      }
    }
  }

  return rawCookie;
};

export const fetcher = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (e) {
    return Promise.reject(catchError(e));
  }
};

export const capitalize = (str) => {
  if (typeof str !== "string") return "";
  const strArr = str.split(" ");
  let newString = "";

  strArr.forEach((s, i) => {
    if (strArr.length - 1 == i) {
      newString += s.charAt(0).toUpperCase() + s.slice(1);
    } else {
      newString += s.charAt(0).toUpperCase() + s.slice(1) + " ";
    }
  });

  return newString;
};

export const formatDate = (date) => {
  if (!date) {
    return undefined;
  }

  return moment(date).format("MMM Do YYYY");
};

export const formatNumber = (num, fixed = false) => {
  if (num === 0) {
    return num + ".00";
  }

  let parts = fixed
    ? Math.abs(num).toFixed(2).toString().split(".")
    : num.toString().split(".");

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return parts.join(".");
};

export const copyToClipboard = (value) => {
  let textArea = document.createElement("textarea");
  textArea.value = value;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
};