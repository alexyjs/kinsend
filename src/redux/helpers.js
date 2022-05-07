import axios from "axios";
import _ from "lodash";

import { authStorage } from "../utils";

const getAuthorization = () => {
  const headers = authStorage.get();
  return `Bearer ${_.get(headers, "accesstoken")}`;
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

export const getHeaders = (headers) => {
  return {
    "Content-Type": "application/json",
    "x-api-key": process.env.REACT_APP_API_KEY,
    Authorization: getAuthorization(),
    ...headers,
  };
};
