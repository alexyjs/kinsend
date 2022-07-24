import { createAction, createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { notification } from "antd";

import { handleCallAPI } from "./helpers";

export const getSegmentAsync = createAction("public/getSegmentAsync");
export const addSegmentAsync = createAction("public/addSegmentAsync");

export const getUpdatesAsync = createAction("public/getUpdatesAsync");
export const getUpdatesDetailAsync = createAction(
  "public/getUpdatesDetailAsync"
);
export const addUpdatesAsync = createAction("public/addUpdatesAsync");
export const resetUpdatesAsync = createAction("public/resetUpdatesAsync");

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

export async function getUpdates() {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/updates`,
  };

  return handleCallAPI(payload);
}

export async function getUpdatesDetail(id) {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/updates/${id}`,
  };

  return handleCallAPI(payload);
}

export async function addUpdates(data) {
  const payload = {
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/updates`,
    data,
  };

  return handleCallAPI(payload);
}

// send-test

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

export function* getUpdatesSaga(action) {
  const { response, errors } = yield call(getUpdates);
  if (response) {
    yield put(getUpdatesSuccess(response));
  } else {
    yield put(failed(errors));
  }
}

export function* getUpdatesDetailSaga(action) {
  const { response, errors } = yield call(getSegment, action.payload);
  if (response) {
    yield put(getUpdatesDetailSuccess(response));
  } else {
    yield put(failed(errors));
  }
}

export function* addUpdatesSaga(action) {
  const { response, errors } = yield call(addUpdates, action.payload);
  if (response) {
    yield call(getUpdatesSaga, {});
    yield put(addUpdatesSuccess(response));
    notification.success({
      title: "Action Completed",
      message: `The UPDATES has been created`,
    });
  } else {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Can't create the UPDATES`,
    });
  }
}

export function* resetUpdatesSaga() {
  yield put(resetUpdatesSuccess());
}

export function* watchGetSegmentSaga() {
  yield takeLatest(getSegmentAsync, getSegmentSaga);
}

export function* watchAddSegmentSaga() {
  yield takeLatest(addSegmentAsync, addSegmentSaga);
}

export function* watchGetUpdatesSaga() {
  yield takeLatest(getUpdatesAsync, getUpdatesSaga);
}

export function* watchGetUpdatesDetailSaga() {
  yield takeLatest(getUpdatesDetailAsync, getUpdatesDetailSaga);
}

export function* watchAddUpdatesSaga() {
  yield takeLatest(addUpdatesAsync, addUpdatesSaga);
}

export function* watchResetUpdatesSaga() {
  yield takeLatest(resetUpdatesAsync, resetUpdatesSaga);
}

const initialState = {
  isLoading: false,
  errors: [],
  segments: [],
  updates: [],
  updatesDetail: null,
  newUpdate: null,
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
    getUpdatesSuccess: (state, action) => {
      state.updates = action.payload;
      state.isLoading = false;
      state.errors = [];
    },
    getUpdatesDetailSuccess: (state, action) => {
      state.updatesDetail = action.payload;
      state.isLoading = false;
      state.errors = [];
    },
    addUpdatesSuccess: (state, action) => {
      state.isLoading = false;
      state.newUpdate = action.payload;
    },
    resetUpdatesSuccess: (state, action) => {
      state.newUpdate = null;
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
      .addCase(getSegmentAsync, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(addSegmentAsync, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  failed,
  getSegmentSuccess,
  addSegmentSuccess,
  getUpdatesSuccess,
  getUpdatesDetailSuccess,
  addUpdatesSuccess,
  resetUpdatesSuccess,
} = updatesSlice.actions;

export const selectUpdates = (state) => {
  return {
    ...state.updatesReducer,
  };
};

export default updatesSlice.reducer;
