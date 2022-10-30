import { createAction, createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { handleCallAPI } from "./helpers";

import { getUserSaga } from "./userReducer";

export const getListPhoneAsync = createAction("phone/getListPhoneAsync");
export const addPhoneAsync = createAction("phone/addPhoneAsync");

export async function getListPhoneAPI(data) {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/resources/available-phone-numbers`,
    params: data,
  };

  return handleCallAPI(payload);
}

export async function addPhoneAPI(data) {
  const payload = {
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/users/list-phone`,
    data,
  };

  return handleCallAPI(payload);
}

export function* getListPhone(action) {
  const { response, errors } = yield call(getListPhoneAPI, action.payload);
  if (response) {
    yield put(getListPhoneSuccess(response));
  } else {
    yield put(failed(errors));
  }
}

export function* addPhoneSaga(action) {
  const { response, errors } = yield call(addPhoneAPI, action.payload);
  if (response) {
    yield put(addPhoneSuccess(response));
    yield call(getUserSaga, {});
  } else {
    yield put(failed(errors));
  }
}

export function* watchGetListPhoneSaga() {
  yield takeLatest(getListPhoneAsync, getListPhone);
}

export function* watchAddPhoneSaga() {
  yield takeLatest(addPhoneAsync, addPhoneSaga);
}

const initialState = {
  isLoading: false,
  listPhone: null,
  errors: [],
  success: false,
};

export const phoneSlice = createSlice({
  name: "phone",
  initialState,
  reducers: {
    getListPhoneSuccess: (state, action) => {
      state.listPhone = action.payload;
      state.isLoading = false;
    },
    failed: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    addPhoneSuccess: (state, action) => {
      state.isLoading = false;
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListPhoneAsync, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(addPhoneAsync, (state) => {
        state.isLoading = true;
        state.errors = [];
      });
  },
});

export const { getListPhoneSuccess, addPhoneSuccess, failed } =
  phoneSlice.actions;

export const selectPhones = (state) => {
  return {
    ...state.phones,
  };
};

export default phoneSlice.reducer;
