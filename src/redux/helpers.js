import axios from "axios";
import _ from "lodash";

import { authStorage } from "../utils";

const getAuthorization = () => {
  const headers = authStorage.get();
  return `Bearer ${_.get(headers, "accesstoken")}`;
};

export const getHeaders = (headers) => {
  return {
    "Content-Type": "application/json",
    "x-api-key": process.env.REACT_APP_API_KEY,
    Authorization: getAuthorization(),
    ...headers,
  };
};


export const handleCallAPI = async (payload, headers) => {
  try {
    const result = await axios({
      method: "post",
      headers: getHeaders(),
      ...payload,
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

export const getHeaderFiles = (headers) => {
  return {
    "x-api-key": process.env.REACT_APP_API_KEY,
    Authorization: getAuthorization(),
    ...headers,
  };
};

export const handleFileCallAPI = async (payload, headers) => {
  try {
    const result = await axios({
      method: "post",
      headers: {
        ...getHeaders(),
        // ...getHeaderFiles(),
        "Content-Type": "multipart/form-data",
      },
      ...payload,
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

export const handleUploadImageCallAPI = async (data) => {
  try {
    const payload = {
      method: "POST",
      url: `${process.env.REACT_APP_API_BASE_URL}/images`,
      data,
    };
    const { response } = await handleFileCallAPI(payload);
    return response;
  } catch (e) {
    return {
      errors: _.get(e, "response.data.message"),
    };
  }
}
