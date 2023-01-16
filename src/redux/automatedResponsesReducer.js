import { createAction, createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { notification } from "antd";

import { handleCallAPI } from "./helpers";

export const toggleFirstContactAsync = createAction(
  "public/toggleFirstContactAsync"
);

export const toggleKeyResponsesAsync = createAction("public/toggleKeyResponsesAsync");

export async function toggleFirstContact(isEnabled) {
  const payload = {
    method: "PATCH",
    url: `${process.env.REACT_APP_API_BASE_URL}/automated-responses/first-contact`
  };

  return handleCallAPI(payload);
}

export async function toggleKeyResponses(isEnabled) {
  const payload = {
    method: "PATCH",
    url: `${process.env.REACT_APP_API_BASE_URL}/automated-responses/key-repsonses`
  };

  return handleCallAPI(payload);
}

export function* toggleFirstContactSaga(action) {
  const { errors } = yield call(toggleFirstContact, action.payload);
  if (errors) {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Something went wrong! Please try again!`,
    });
  }
}

export function* toggleKeyResponsesSaga(action) {
  const { errors } = yield call(toggleKeyResponses, action.payload);
  if (errors) {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Something went wrong! Please try again!`,
    });
  }
}

export function* watchToggleFirstContactSaga() {
  yield takeLatest(toggleFirstContactAsync, toggleFirstContactSaga);
}

export function* watchToggleKeyResponsesSaga() {
  yield takeLatest(toggleKeyResponsesAsync, toggleKeyResponsesSaga);
}

const initialState = {
  isLoading: false,
  errors: []
};

export const automatedResponsesSlice = createSlice({
  name: "automatedResponsesReducer",
  initialState,
  reducers: {
    failed: (state, action) => {
      state.isLoading = false;
      state.isNewFormLoading = false;
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleFirstContactAsync, (state) => {
        state.isLoading = true;
        state.errors = [];
      });
  },
});

export const {
  failed,
} = automatedResponsesSlice.actions;

export const selectPublic = ({ publicReducer }) => {
  return {
    isLoading: publicReducer.isLoading,
  };
};

export default automatedResponsesSlice.reducer;
