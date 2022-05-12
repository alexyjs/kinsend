import { createAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";
import { call, put, delay, takeLatest, fork, select, take } from "redux-saga/effects";

import { authStorage } from "./../utils";
export const addPaymentMethodAsync = createAction("user/addPaymentMethodAsync");

const getAuthorization = () => {
  const headers = authStorage.get();
  return `Bearer ${_.get(headers, "accesstoken")}`;
};
const getHeaders = (headers) => {
  return {
    "Content-Type": "application/json",
    "x-api-key": process.env.REACT_APP_API_KEY,
    Authorization: getAuthorization(),
    ...headers,
  };
};

const handleCallAPI = async (payload, headers) => {
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

export async function addPaymentMethodAPI(data) {
  const payload = {
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/payments/credit-card`,
    data,
  };

  return handleCallAPI(payload);
}

export async function confirmPaymentMethodAPI(paymentMethodId, setupIntentId) {
  const payload = {
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/payments/credit-card/setup-intent/${setupIntentId}/confirm`,
    data: {
      paymentMethodId
    },
  };

  return handleCallAPI(payload);
}

export async function attachPaymentMethodAPI(paymentMethodId) {
  const payload = {
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/payments/credit-card/payment-method/${paymentMethodId}/attach`,
    data: {
      paymentMethodId,
    },
  };

  return handleCallAPI(payload);
}

export async function makeDefaultPaymentMethodAPI(paymentMethodId) {
  const payload = {
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/payments/credit-card/payment-method/${paymentMethodId}/attach-consumer`,
    data: {
      paymentMethodId,
    },
  };

  return handleCallAPI(payload);
}

export async function createPaymentSubscription(stripeCustomerUserId, priceID) {
  const payload = {
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/subscriptions`,
    data: {
      customer: stripeCustomerUserId,
      items: [
        {
          price: priceID,
        }
      ]
    },
  };

  return handleCallAPI(payload);
}

export async function createPaymentCharge(amount, paymentMethodId) {
  const payload = {
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/payments/credit-card/charge`,
    data: {
      amount,
      paymentMethodId,
    },
  };

  return handleCallAPI(payload);
}

// saga
export function* addPaymentMethodSaga(action) {
  const { paymentMethod, user, priceID } = action.payload;
  const { response, errors } = yield call(addPaymentMethodAPI, {
    paymentMethodId: paymentMethod.id,
    type: paymentMethod.type,
  });
  const { responseDefaultPayment, errorsDefaultPayment } = yield call(makeDefaultPaymentMethodAPI, response.stripePaymentMethodId);
  const { response: responseSubscription, errors: errorsSubscription } = yield call(createPaymentSubscription, user.stripeCustomerUserId, priceID);
  if (responseSubscription) {
    yield put(addPaymentSuccess(responseSubscription));
  } else {
    yield put(failed(errors));
  }
}

export function* watchAddPaymentMethodSaga() {
  yield takeLatest(addPaymentMethodAsync, addPaymentMethodSaga);
}

const initialState = {
  isLoading: false,
  errors: [],
  updatedPaymentSuccess: false,
  addPaymentSuccess: false,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    addPaymentSuccess: (state, action) => {
      state.addPaymentSuccess = true;
      state.isLoading = false;
      state.errors = [];
    },
    failed: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPaymentMethodAsync, (state) => {
        state.isLoading = true;
        state.errors = [];
      });
  },
});

export const { addPaymentStart, addPaymentSuccess, failed } = paymentSlice.actions;

export const selectUpdatedUserSuccess = ({ payments }) => {
  return {
    updatedPayentSuccess: payments.updatedUserSuccess,
  };
};

export const selectAddPayment = ({ payments }) => {
  return {
    addPaymentSuccess: payments.addPaymentSuccess,
    isLoading: payments.isLoading,
    errors: payments.errors,
  };
};

export default paymentSlice.reducer;
