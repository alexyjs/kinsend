import { createAction, createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { notification } from "antd";
import { isAfter } from "date-fns";

import { handleCallAPI, getErrorMessage } from "./helpers";

export const getSegmentAsync = createAction("updates/getSegmentAsync");
export const addSegmentAsync = createAction("updates/addSegmentAsync");

export const getUpdatesAsync = createAction("updates/getUpdatesAsync");
export const getUpdatesDetailAsync = createAction(
  "updates/getUpdatesDetailAsync"
);
export const addUpdatesAsync = createAction("updates/addUpdatesAsync");
export const editUpdatesAsync = createAction("updates/editUpdatesAsync");
export const deleteUpdatesAsync = createAction("updates/deleteUpdatesAsync");
export const resetUpdatesAsync = createAction("updates/resetUpdatesAsync");
export const sendTestMessageAsync = createAction(
  "updates/sendTestMessageAsync"
);

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

export async function editUpdates(data, id) {
  const payload = {
    method: "PUT",
    url: `${process.env.REACT_APP_API_BASE_URL}/updates/${id}`,
    data,
  };

  return handleCallAPI(payload);
}

export async function deleteUpdates(id) {
  const payload = {
    method: "DELETE",
    url: `${process.env.REACT_APP_API_BASE_URL}/updates/${id}`,
  };

  return handleCallAPI(payload);
}

export async function sendTestMessageAPI(data) {
  const payload = {
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/updates/send-test`,
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
  const { response, errors } = yield call(getUpdatesDetail, action.payload);
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
      message: getErrorMessage(errors) || `Can't create the UPDATES`,
    });
  }
}

export function* editUpdatesSaga(action) {
  const { response, errors } = yield call(
    editUpdates,
    action.payload.dataUpdate,
    action.payload.id
  );
  if (response) {
    yield call(getUpdatesSaga, {});
    yield put(editUpdatesSuccess(response));
    notification.success({
      title: "Action Completed",
      message: `The UPDATES has been updated`,
    });
  } else {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: getErrorMessage(errors) || `Can't update the UPDATES`,
    });
  }
}

export function* deleteUpdatesSaga(action) {
  const { response, errors } = yield call(deleteUpdates, action.payload);
  if (response) {
    yield call(getUpdatesSaga, {});
    yield put(deleteUpdatesSuccess());
    notification.success({
      title: "Action Completed",
      message: `The UPDATES has been deleted`,
    });
  } else {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: getErrorMessage(errors) || `Can't delete the UPDATES`,
    });
  }
}

export function* resetUpdatesSaga() {
  yield put(resetUpdatesSuccess());
}

export function* sendTestMessageSage(action) {
  const { response, errors } = yield call(sendTestMessageAPI, action.payload);
  if (response) {
    // yield put(sendTestMessageSuccess(response));
    notification.success({
      title: "Action Completed",
      message: `Test Message Has Been Sent Successfully!`,
    })
  } else {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: getErrorMessage(errors) || `Test Message Send Failed`,
    });
  }
}

//

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

export function* watchEditUpdatesSaga() {
  yield takeLatest(editUpdatesAsync, editUpdatesSaga);
}

export function* watchDeleteUpdatesSaga() {
  yield takeLatest(deleteUpdatesAsync, deleteUpdatesSaga);
}

export function* watchResetUpdatesSaga() {
  yield takeLatest(resetUpdatesAsync, resetUpdatesSaga);
}

export function* watchSendTestMessageSaga() {
  yield takeLatest(sendTestMessageAsync, sendTestMessageSage);
}

const initialState = {
  isLoading: false,
  errors: [],
  segments: [],
  updates: [],
  updatesDetail: null,
  newUpdate: null,
  isDeleted: false,
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
      // let updates = action.payload.sort((a, b) => {
      //   return new Date(b.createdAt) - new Date(a.createdAt);
      // });

      const updates = [
        ...action.payload
          .filter((item) => isAfter(new Date(item.datetime), new Date()))
          .sort((a, b) => {
            return new Date(a.datetime) - new Date(b.datetime);
          }),
        ...action.payload
          .filter((item) => !isAfter(new Date(item.datetime), new Date()))
          .sort((a, b) => {
            return new Date(a.datetime) - new Date(b.datetime);
          }),
      ];

      state.updates = updates;
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
    editUpdatesSuccess: (state, action) => {
      state.isLoading = false;
      state.newUpdate = action.payload;
    },
    deleteUpdatesSuccess: (state, action) => {
      state.isDeleted = true;
    },
    resetUpdatesSuccess: (state, action) => {
      state.newUpdate = null;
      state.isLoading = false;
      state.isDeleted = false;
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
  editUpdatesSuccess,
  deleteUpdatesSuccess,
  resetUpdatesSuccess,
} = updatesSlice.actions;

export const selectUpdates = (state) => {
  return {
    ...state.updatesReducer,
  };
};

export default updatesSlice.reducer;
