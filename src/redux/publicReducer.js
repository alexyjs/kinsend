import { createAction, createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { notification } from "antd";

import { handleCallAPI } from "./helpers";

export const getFormsSettingDetailAsync = createAction(
  "public/getFormsSettingDetailAsync"
);

export const addFormSubmissionAsync = createAction(
  "public/addFormSubmissionAsync"
);

export async function getFormSettingDetail(id) {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/forms/${id}`,
  };

  return handleCallAPI(payload);
}

export async function addFormSubmission(data) {
  const payload = {
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/form-submission`,
    data,
  };

  return handleCallAPI(payload);
}

export function* getFormDetailSaga(action) {
  const { response, errors } = yield call(getFormSettingDetail, action.payload);
  if (response) {
    yield put(getFormsSettingDetailSuccess(response));
  } else {
    yield put(failed(errors));
  }
}

export function* addFormSubmissionSaga(action) {
  const { response, errors } = yield call(addFormSubmission, action.payload);
  if (response) {
    yield put(addFormSubmissionSuccess(response));
    notification.success({
      title: "Action Completed",
      message: `Success!`,
    });
  } else {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `The request is failed`,
    });
  }
}

export function* watchGetFormSettingDetailSaga() {
  yield takeLatest(getFormsSettingDetailAsync, getFormDetailSaga);
}

export function* watchAddFormSubmissionSaga() {
  yield takeLatest(addFormSubmissionAsync, addFormSubmissionSaga);
}

const initialState = {
  isLoading: false,
  errors: [],
  formSettingDetail: null,
  addedFormSubmission: null,
};

export const publicSlice = createSlice({
  name: "publicReducer",
  initialState,
  reducers: {
    getFormsSettingDetailSuccess: (state, action) => {
      state.formSettingDetail = action.payload;
      state.isLoading = false;
      state.errors = [];
      state.addedFormSubmission = null;
    },
    addFormSubmissionSuccess: (state, action) => {
      state.addedFormSubmission = action.payload;
      state.isNewFormLoading = false;
    },
    failed: (state, action) => {
      state.isLoading = false;
      state.isNewFormLoading = false;
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFormsSettingDetailAsync, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(addFormSubmissionAsync, (state) => {
        state.isNewFormLoading = true;
      });
  },
});

export const {
  failed,
  getFormsSettingDetailSuccess,
  addFormSubmissionSuccess,
} = publicSlice.actions;

export const selectPublic = ({ publicReducer }) => {
  return {
    isLoading: publicReducer.isLoading,
    formSettingDetail: publicReducer.formSettingDetail,
    addedFormSubmission: publicReducer.addedFormSubmission,
  };
};

export default publicSlice.reducer;
