import { createAction, createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";

import { handleCallAPI } from "./helpers";
export const addPaymentMethodAsync = createAction("user/addPaymentMethodAsync");

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
      paymentMethodId,
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

export async function createPaymentSubscription(stripeCustomerUserId, priceID, planPaymentMethod) {
  const payload = {
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/subscriptions`,
    data: {
      customer: stripeCustomerUserId,
      items: [
        {
          price: priceID,
          planPaymentMethod: planPaymentMethod,
        },
      ],
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
  const { paymentMethod, user, priceID, planPaymentMethod } = action.payload;
  const { response, errors } = yield call(addPaymentMethodAPI, {
    paymentMethodId: paymentMethod.id,
    type: paymentMethod.type,
  });
  const { responseDefaultPayment, errorsDefaultPayment } = yield call(
    makeDefaultPaymentMethodAPI,
    response.stripePaymentMethodId
  );
  const { response: responseSubscription, errors: errorsSubscription } =
    yield call(createPaymentSubscription, user.stripeCustomerUserId, priceID, planPaymentMethod);
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
    builder.addCase(addPaymentMethodAsync, (state) => {
      state.isLoading = true;
      state.errors = [];
    });
  },
});

export const { addPaymentStart, addPaymentSuccess, failed } =
  paymentSlice.actions;

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
