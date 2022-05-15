import _ from "lodash";
import { PHONE_REGEX } from "./constants";
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

const getHeaders = (headers) => {
  return {
    "Content-Type": "application/json",
    "x-api-key": process.env.REACT_APP_API_KEY,
    Authorization: getAuthorization(),
    ...headers,
  };
};

const getAuthorization = () => {
  const headers = authStorage.get();
  return `Bearer ${_.get(headers, "accesstoken")}`;
};

export const handleFetchAPI = async (url, method, payload) => {
  try {
    const result = await fetch(`${process.env.REACT_APP_API_BASE_URL}/${url}`, {
      method: method,
      headers: getHeaders(),
      // body: JSON.stringify(
      body: JSON.stringify(payload),
    });
    return {
      response: _.get(result, "data"),
      headers: _.get(result, "headers"),
    };
  } catch (e) {
    return {
      errors: _.get(e, "response.data.message"),
    };
  }
};

export const uploadFileWithProgress = (url, method, body, onUploadProgress) => {
  var xhrObj = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    xhrObj.upload.addEventListener(
      'progress',
      event => {
        onUploadProgress && onUploadProgress(event);
        if (event.loaded === event.total) {
          resolve(true);
        }
      },
      false,
    );

    try {
      xhrObj.open(method, `${process.env.REACT_APP_API_BASE_URL}/${url}`, true);
      xhrObj.setRequestHeader('Content-Type', 'application/json');
      xhrObj.setRequestHeader('x-api-key', process.env.REACT_APP_API_KEY);
      xhrObj.setRequestHeader('Authorization', getAuthorization());
      xhrObj.send(body);
    } catch (err) {
      reject(err);
    }
  });
};