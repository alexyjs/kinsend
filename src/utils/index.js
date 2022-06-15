import _ from "lodash";

import { PHONE_REGEX } from "./validations";
import { storage } from "../hook/userLocalStorage";
import { STORAGE_AUTH_KEY } from "../utils/constants";

export const authStorage = storage(STORAGE_AUTH_KEY);

let formatPhoneNumber = (str) => {
  //Filter only numbers from the input
  let cleaned = ("" + str).replace(/\D/g, "");
  //Check if the input is of correct
  let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    //Remove the matched extension code
    //Change this to format for any country code.
    let intlCode = match[1] ? "+1 " : "";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }

  return null;
};

export const displayPhoneNumber = (phoneNumber) => {
  if (_.isEmpty(phoneNumber)) {
    return "";
  }

  const { phone, code } = phoneNumber;
  return `+${code} ${formatPhoneNumber(phone)}`;
};

export const phoneValidator = {
  validator: async (rule, value) => {
    const phone = _.get(value, "phone");
    const code = _.get(value, "code");

    if (!code && !phone) {
      return Promise.resolve();
    }

    if (PHONE_REGEX.test(phone) || !phone) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("The phone is invalid"));
  },
};

export const phoneRequireValidator = {
  validator: async (rule, value) => {
    const phone = _.get(value, "phone");
    const code = _.get(value, "code");
    const short = _.get(value, "short");

    if (code && phone && short) {
      return Promise.resolve();
    }

    return Promise.reject(new Error("This field is required"));
  },
};

export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
};

export const parseFormDataValue = (value) => {
  console.log(value);
  if (typeof value === "string" || value instanceof String) {
  }

  return JSON.stringify(value);
};
