import { createAction, createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { notification } from "antd";

import { handleCallAPI } from "./helpers";
export const getVCardAsync = createAction("user/getVCardAsync");
export const updateVCardAsync = createAction("user/updateVCardAsync");

export async function getVCard(data) {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/vcards`,
    data,
  };

  return handleCallAPI(payload);
}

export async function updateVCard(data) {
  const payload = {
    method: "PUT",
    url: `${process.env.REACT_APP_API_BASE_URL}/vcards`,
    data,
  };

  return handleCallAPI(payload);
}

// saga
export function* getVCardSaga(action) {
  const { response, errors } = yield call(getVCard, action.payload);
  if (response) {
    yield put(addVCardSuccess(response));
  } else {
    yield put(failed(errors));
  }
}

export function* updateVCardSaga(action) {
  const { response, errors } = yield call(updateVCard, action.payload);
  if (response) {
    yield put(addVCardSuccess(response));
    notification.success({
      title: "Action Completed",
      message: `Vcard update successfully.`,
    });
  } else {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Vcard update Failed.`,
    });
  }
}

export function* watchGetVCardSaga() {
  yield takeLatest(getVCardAsync, getVCardSaga);
}

export function* watchUpdateVCardSaga() {
  yield takeLatest(updateVCardAsync, updateVCardSaga);
}

const initialState = {
  isLoading: false,
  errors: [],
  vcardData: {},
};

export const vcardSlice = createSlice({
  name: "vcard",
  initialState,
  reducers: {
    addVCardSuccess: (state, action) => {
      state.vcardData = action.payload;
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
      .addCase(getVCardAsync, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(updateVCardAsync, (state) => {
        state.isLoading = true;
        state.errors = [];
      });
  },
});

export const { addVCardSuccess, failed } = vcardSlice.actions;

export const selectVCard = ({ vcard }) => {
  return {
    vcardData: vcard.vcardData,
    isLoading: vcard.isLoading,
  };
};

export default vcardSlice.reducer;
