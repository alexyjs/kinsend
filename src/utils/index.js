import { get as _get, isEqual, isEmpty } from "lodash";

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
  if (isEmpty(phoneNumber)) {
    return "";
  }

  const { phone, code } = phoneNumber;
  return `+${code} ${formatPhoneNumber(phone)}`;
};

export const phoneValidator = {
  validator: async (rule, value) => {
    const phone = _get(value, "phone");
    const code = _get(value, "code");

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
    const phone = _get(value, "phone");
    const code = _get(value, "code");
    const short = _get(value, "short");

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

export const formatArray = (value) => {
  if (typeof value === "string") {
    return [value];
  }

  return value;
};

export const clearEmptyField = (object) => {
  let result = {};
  for (const property in object) {
    if (
      object[property] &&
      !isEqual(object[property], {}) &&
      !isEqual(object[property], [])
    ) {
      result[property] = object[property];
    }
  }

  if (isEqual(result, {})) {
    return null;
  }

  return result;
};

export const getCname = () => {
  const host = window.location.host;
  if (
    (host !== "www.dev.kinsend.io" &&
      host !== "dev.kinsend.io" &&
      // prod
      host !== "kinsend.io" &&
      host.includes(".kinsend.io")) ||
    // development
    (host !== "localhost:3000" && host.includes(".localhost:3000"))
  ) {
    return host
      .replace(".dev.kinsend.io", "")
      .replace(".kinsend.io", "")
      .replace(".localhost:3000", "");
  }
  return "";
};

export const getMainDomain = () => {
  const host = window.location.host;
  if (host.includes("dev.kinsend.io")) {
    return "https://dev.kinsend.io";
  }

  if (host.includes("kinsend.io")) {
    return "https://kinsend.io";
  }

  return "http://localhost:3000";
};

export const formatOptions = (data) => {
  return data.map((item) => {
    return {
      value: item,
      label: item,
    };
  });
};

export const formatOptionsFormDatabase = ({
  data,
  prefixLabel = "",
  typeOption = "",
  disablePrefixValue = false,
}) => {
  return data
    ? data.map((item) => {
        return {
          ...item,
          value:
            (disablePrefixValue ? "" : prefixLabel) + (item.id || item.value),
          label: prefixLabel + (item.name || item.label),
          typeOption: typeOption,
        };
      })
    : [];
};

export const getFilterUpdatesFeature = (data) => {
  if (data.typeOption === "isSegment") {
    return {
      segmentId: data.id,
    };
  }
  if (data.typeOption === "isLocation") {
    return {
      location: data.value,
    };
  }
  if (data.typeOption === "isTagged") {
    return {
      tagId: data.id,
    };
  }
  return {
    key: data.value,
  };
};

export const getSegmentFilterPayload = (data) => {
  if (data.typeOption === "isSegment") {
    return {
      ...data,
      segmentId: data.id,
    };
  }
  if (data.typeOption === "isTagged") {
    return {
      ...data,
      tagId: [data.id],
    };
  }
  return data;
};

export const getFilterUpdatesSelected = (value, data) => {
  const valueSelected =
    value.segmentId || value.location || value.tagId || value.key;
  let dataFilter = [];
  if (value.segmentId) {
    dataFilter = data.filter((item) => item.label === "Segments")[0] || [];
  } else if (value.location) {
    dataFilter = data.filter((item) => item.label === "Location")[0] || [];
  } else if (value.tagId) {
    dataFilter = data.filter((item) => item.label === "Tags")[0] || [];
  } else {
    dataFilter = data.filter((item) => item.label === "Contacts")[0] || [];
  }

  return dataFilter.options.filter((item) => item.value === valueSelected)[0];
};

export const removeEmptyObject = (obj) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => !!v));
};
