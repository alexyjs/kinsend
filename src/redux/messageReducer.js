import { createAction, createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { notification } from "antd";
import { isAfter } from "date-fns";

import { handleCallAPI, getErrorMessage } from "./helpers";

export const getMessageAsync = createAction("message/getMessageAsync");
export const getMessageDetailAsync = createAction(
  "message/getMessageDetailAsync"
);
export const sendSmsAsync = createAction("message/sendSmsAsync");
export const resetSendSmsAsync = createAction("message/resetSendSmsAsync");
export const getMessageStatisticsAsync = createAction(
  "message/getMessageStatisticsAsync"
);

export async function getMessage() {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/messages`,
  };

  return handleCallAPI(payload);
}

export async function getMessageDetail(id) {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/messages/${id}`,
  };

  return handleCallAPI(payload);
}

export async function sendSmsAPI(data) {
  const payload = {
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/sms`,
    data,
  };

  return handleCallAPI(payload);
}

export async function getMessageStatisticsAPI(id) {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/messages/statistic`,
  };

  return handleCallAPI(payload);
}

// saga
export function* getMessageSaga(action) {
  const { response, errors } = yield call(getMessage);
  if (response) {
    yield put(getMessageSuccess(response));
  } else {
    yield put(failed(errors));
  }
}

export function* getMessageDetailSaga(action) {
  const { response, errors } = yield call(getMessageDetail, action.payload);
  if (response) {
    yield put(getMessageDetailSuccess(response));
  } else {
    yield put(failed(errors));
  }
}

export function* sendSmsAsyncSaga(action) {
  const { response, errors } = yield call(sendSmsAPI, action.payload);
  if (response) {
    yield call(getMessageSaga, {});
    yield put(sendSmsSuccess(true));
    notification.success({
      title: "Action Completed",
      message: `The message has been sent.`,
    });
  } else {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Can't sent new message.`,
    });
  }
}

export function* resetSendSmsSaga() {
  yield put(resetSendSmsSuccess());
}

export function* getMessageStatisticsSaga(action) {
  const { response, errors } = yield call(
    getMessageStatisticsAPI,
    action.payload
  );
  if (response) {
    yield put(getMessageStatisticsSuccess(response));
  } else {
    yield put(failed(errors));
  }
}

//

export function* watchGetMessageSaga() {
  yield takeLatest(getMessageAsync, getMessageSaga);
}
export function* watchGetMessageDetailSaga() {
  yield takeLatest(getMessageDetailAsync, getMessageDetailSaga);
}
export function* watchSendSmsSaga() {
  yield takeLatest(sendSmsAsync, sendSmsAsyncSaga);
}
export function* watchResetSendSmsSaga() {
  yield takeLatest(resetSendSmsAsync, resetSendSmsSaga);
}
export function* watchGetMessageStatisticsSaga() {
  yield takeLatest(getMessageStatisticsAsync, getMessageStatisticsSaga);
}

const initialState = {
  isLoading: false,
  errors: [],
  message: [],
  messageDetail: null,
  smsMessage: null,
  messageStatistics: null,
};

export const messageSlice = createSlice({
  name: "messageReducer",
  initialState,
  reducers: {
    getMessageSuccess: (state, action) => {
      // const message = [
      //   ...action.payload
      //     .filter((item) => isAfter(new Date(item.datetime), new Date()))
      //     .sort((a, b) => {
      //       return new Date(a.datetime) - new Date(b.datetime);
      //     }),
      //   ...action.payload
      //     .filter((item) => !isAfter(new Date(item.datetime), new Date()))
      //     .sort((a, b) => {
      //       return new Date(a.datetime) - new Date(b.datetime);
      //     }),
      // ];
      const message = [
        ...action.payload.sort((a, b) => {
          return new Date(a.datetime) - new Date(b.datetime);
        }),
      ];
      state.message = message;
      state.isLoading = false;
      state.errors = [];
    },
    getMessageDetailSuccess: (state, action) => {
      const result = action.payload || [];
      // Data Test
      state.messageDetail = result;
      state.isLoading = false;
      state.errors = [];
    },
    resetmessageSuccess: (state, action) => {
      state.isLoading = false;
      state.errors = [];
    },
    sendSmsSuccess: (state, action) => {
      state.smsMessage = true;
    },
    resetSendSmsSuccess: (state) => {
      state.smsMessage = null;
    },
    getMessageStatisticsSuccess: (state, action) => {
      state.messageStatistics = action.payload;
      state.errors = [];
    },
    failed: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessageAsync, (state) => {
      state.isLoading = true;
      state.errors = [];
    });
  },
});

export const {
  failed,
  getMessageSuccess,
  getMessageDetailSuccess,
  resetMessageSuccess,
  sendSmsSuccess,
  resetSendSmsSuccess,
  getMessageStatisticsSuccess,
} = messageSlice.actions;

export const selectMessage = (state) => {
  return {
    ...state.messageReducer,
  };
};

export default messageSlice.reducer;
