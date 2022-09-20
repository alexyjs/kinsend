import { createAction, createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { notification } from "antd";
import { isAfter } from "date-fns";

import { handleCallAPI, getErrorMessage } from "./helpers";

export const getMessageAsync = createAction("message/getMessageAsync");
export const getMessageDetailAsync = createAction(
  "message/getMessageDetailAsync"
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
//

export function* watchGetMessageSaga() {
  yield takeLatest(getMessageAsync, getMessageSaga);
}
export function* watchGetMessageDetailSaga() {
  yield takeLatest(getMessageDetailAsync, getMessageDetailSaga);
}

const initialState = {
  isLoading: false,
  errors: [],
  message: [],
  messageDetail: null,
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
      result.push({
        content: "Hello this is new message" + "isSubscriberMessage",
        createdAt: "2022-09-19T15:56:57.507Z",
        dateSent: "2022-09-19T15:56:56.952Z",
        // formSubmission: {tags: [], isConversationArchived: false, isConversationHidden: false, isVip: false, _id: {},…}
        id: "6328914951496c5d72a1d6b2" + 1,
        isSubscriberMessage: true,
        phoneNumberReceipted: " +1123456789",
        phoneNumberSent: "+18334862552",
        status: "success",
        updatedAt: "2022-09-19T15:56:57.507Z",
        user: {},
      });
      state.messageDetail = result;
      state.isLoading = false;
      state.errors = [];
    },
    resetmessageSuccess: (state, action) => {
      state.isLoading = false;
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
} = messageSlice.actions;

export const selectMessage = (state) => {
  return {
    ...state.messageReducer,
  };
};

export default messageSlice.reducer;
