import { createAction, createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { notification } from "antd";

import { handleCallAPI } from "./helpers";

export const getSegmentAsync = createAction("public/getSegmentAsync");

export const addSegmentAsync = createAction("public/addSegmentAsync");

export async function getSegment() {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/segments`,
  };

  return handleCallAPI(payload);
}

export async function addSegment(data) {
  const payload = {
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/segments`,
    data,
  };

  return handleCallAPI(payload);
}

// saga
export function* getSegmentSaga(action) {
  const { response, errors } = yield call(getSegment);
  if (response) {
    yield put(getSegmentSuccess(response));
  } else {
    yield put(failed(errors));
  }
}

export function* addSegmentSaga(action) {
  const { response, errors } = yield call(addSegment, action.payload);
  if (response) {
    yield call(getSegmentSaga, {});
    yield put(addSegmentSuccess(response));
    notification.success({
      title: "Action Completed",
      message: `The segment has been created`,
    });
  } else {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Can't create the segment`,
    });
  }
}

export function* watchGetSegmentSaga() {
  yield takeLatest(getSegmentAsync, getSegmentSaga);
}

export function* watchAddSegmentSaga() {
  yield takeLatest(addSegmentAsync, addSegmentSaga);
}

const initialState = {
  isLoading: false,
  errors: [],
  segments: [],
};

export const updatesSlice = createSlice({
  name: "updatesReducer",
  initialState,
  reducers: {
    getSegmentSuccess: (state, action) => {
      state.segments = action.payload.map((item) => {
        return {
          ...item,
          label: item.name,
          value: item.id,
        };
      });
      state.isLoading = false;
      state.errors = [];
    },
    addSegmentSuccess: (state, action) => {
      state.isLoading = false;
    },
    failed: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSegmentAsync, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(addSegmentAsync, (state) => {
        state.isLoading = false;
      });
  },
});

export const { failed, getSegmentSuccess, addSegmentSuccess } =
  updatesSlice.actions;

export const selectUpdates = (state) => {
  return {
    ...state.updatesReducer,
  };
};

export default updatesSlice.reducer;
