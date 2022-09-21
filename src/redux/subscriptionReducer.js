import { createAction, createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { handleCallAPI } from "./helpers";
import _ from "lodash";
import { notification } from "antd";

export const getListSubscriptionAsync = createAction(
  "subscription/getListSubscriptionAsync"
);
export const getListSubscriptionPricesAsync = createAction(
  "subscription/getListSubscriptionPricesAsync"
);

export const getSubscriberByMessageIdAsync = createAction(
  "subscription/getSubscriberByMessageIdAsync"
);

export const editSubscriberAsync = createAction(
  "subscription/editSubscriberAsync"
);
export const sendVCardAsync = createAction("subscription/sendVCardAsync");

export async function getListSubscriptionAPI(data) {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/subscriptions`,
    data,
  };

  return handleCallAPI(payload);
}

export function* getListSubscription(action) {
  const { response, errors } = yield call(
    getListSubscriptionAPI,
    action.payload
  );
  if (response) {
    yield put(getListSubscriptionSuccess(response));
  } else {
    yield put(failed(errors));
  }
}

export async function getListSubscriptionPricesAPI(data) {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/subscriptions/prices`,
    data,
  };

  return handleCallAPI(payload);
}

export async function getSubscriberByMessageIdAPI(id) {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/form-submission/${id}`,
  };

  return handleCallAPI(payload);
}

export async function editSubscriberAPI(data, id) {
  const payload = {
    method: "PUT",
    url: `${process.env.REACT_APP_API_BASE_URL}/form-submission/${id}`,
    data,
  };

  return handleCallAPI(payload);
}

export async function sendVCardAPI(id) {
  const payload = {
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/form-submission/${id}/send-vcard`,
  };

  return handleCallAPI(payload);
}

// saga
export function* getListSubscriptionPrices(action) {
  const { response, errors } = yield call(
    getListSubscriptionPricesAPI,
    action.payload
  );
  if (response) {
    yield put(getListSubscriptionPricesSuccess(_.get(response, "data")));
  } else {
    yield put(failed(errors));
  }
}

export function* getSubscriberByMessageId(action) {
  const { response, errors } = yield call(
    getSubscriberByMessageIdAPI,
    action.payload
  );
  if (response) {
    yield put(getSubscriptionByMessageIdSuccess(response));
  } else {
    yield put(failed(errors));
  }
}

export function* editSubscriber(action) {
  const { response, errors } = yield call(
    editSubscriberAPI,
    action.payload.dataUpdate,
    action.payload.id
  );
  if (response) {
    yield put(getSubscriptionByMessageIdSuccess(response));
    notification.success({
      title: "Action Completed",
      message: `The subscriber has been updated`,
    });
  } else {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Can't updated the subscriber`,
    });
  }
}

export function* sendVCard(action) {
  const { response, errors } = yield call(sendVCardAPI, action.payload);
  if (response) {
    notification.success({
      title: "Action Completed",
      message: `The VCard has been sent`,
    });
  } else {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Can't sent the VCard`,
    });
  }
}

export function* watchGetListSubscriptionSaga() {
  yield takeLatest(getListSubscriptionAsync, getListSubscription);
}

export function* watchGetListSubscriptionPricesSaga() {
  yield takeLatest(getListSubscriptionPricesAsync, getListSubscriptionPrices);
}

export function* watchGetSubscriberByMessageIdSaga() {
  yield takeLatest(getSubscriberByMessageIdAsync, getSubscriberByMessageId);
}

export function* watchEditSubscriberSaga() {
  yield takeLatest(editSubscriberAsync, editSubscriber);
}

export function* watchSendVCardSaga() {
  yield takeLatest(sendVCardAsync, sendVCard);
}

const initialState = {
  isLoading: false,
  listSubscription: null,
  listSubscriptionPrices: null,
  errors: [],
  success: false,
  subscriberDetail: null,
};

export const subscriptionSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getListSubscriptionSuccess: (state, action) => {
      state.listSubscription = action.payload;
      state.isLoading = false;
    },
    getListSubscriptionPricesSuccess: (state, action) => {
      state.listSubscriptionPrices = action.payload;
      state.isLoading = false;
    },
    getSubscriptionByMessageIdSuccess: (state, action) => {
      state.subscriberDetail = action.payload;
      // state.isLoading = false;
    },
    failed: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListSubscriptionAsync, (state) => {
      state.isLoading = true;
      state.errors = [];
    });
  },
});

export const {
  getListSubscriptionSuccess,
  getListSubscriptionPricesSuccess,
  getSubscriptionByMessageIdSuccess,
  failed,
} = subscriptionSlice.actions;

export const selectSubscriptions = (state) => {
  return {
    ...state.subscriptions,
  };
};

export default subscriptionSlice.reducer;
