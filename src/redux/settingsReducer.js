import { createAction, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import { notification } from "antd";

import { handleCallAPI, handleFileCallAPI } from "./helpers";
export const getTagsAsync = createAction("settings/getTagsAsync");
export const addTagAsync = createAction("settings/addTagAsync");
export const getCustomFieldsAsync = createAction(
  "settings/getCustomFieldsAsync"
);
export const addCustomFieldAsync = createAction("settings/addCustomFieldAsync");
export const getFormsAsync = createAction("settings/getFormsAsync");
export const addFormAsync = createAction("settings/addFormAsync");

export async function getTags(data) {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/tags`,
    data,
  };

  return handleCallAPI(payload);
}

export async function addTag(data) {
  const payload = {
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/tags`,
    data,
  };

  return handleCallAPI(payload);
}

export async function getCustomFields(data) {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/custom-fields`,
    data,
  };

  return handleCallAPI(payload);
}

export async function addCustomField(data) {
  const payload = {
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/custom-fields`,
    data,
  };

  return handleCallAPI(payload);
}

export async function getForms(data) {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/forms`,
    data,
  };

  return handleCallAPI(payload);
}

export async function addForm(data) {
  const payload = {
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/forms`,
    data,
  };

  return handleFileCallAPI(payload);
}

// saga
export function* getTagsSaga(action) {
  const { response, errors } = yield call(getTags, action.payload);
  if (response) {
    const newResponse = response.map((item) => {
      return {
        ...item,
        key: item.id,
      };
    });
    yield put(getTagsSuccess(newResponse));
  } else {
    yield put(failed(errors));
  }
}

export function* addTagSaga(action) {
  const { response, errors } = yield call(addTag, action.payload);
  if (response) {
    yield call(getTagsSaga, {});
    yield put(addTagSuccess(response));
    notification.success({
      title: "Action Completed",
      message: `The tag has been created.`,
    });
  } else {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: `Can't create new tag.`,
    });
  }
}

// customfields
export function* getCustomFieldsSaga(action) {
  const { response, errors } = yield call(getCustomFields, action.payload);
  if (response) {
    yield put(getCustomFieldsSuccess(response));
  } else {
    yield put(failed(errors));
  }
}

export function* addCustomFieldSaga(action) {
  const { response, errors } = yield call(addCustomField, action.payload);
  if (response) {
    yield call(getCustomFieldsSaga, {});
    yield put(addCustomFieldSuccess(response));
    notification.success({
      title: "Action Completed",
      message: `The custom field has been created.`,
    });
  } else {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: `Can't create new custom field.`,
    });
  }
}

export function* getFormsSaga(action) {
  const { response, errors } = yield call(getForms, action.payload);
  if (response) {
    yield put(getFormsSuccess(response));
  } else {
    yield put(failed(errors));
  }
}

export function* addFormSaga(action) {
  const { response, errors } = yield call(addForm, action.payload);
  if (response) {
    yield call(getFormsSaga, {});
    yield put(addFormSuccess(response));
    notification.success({
      title: "Action Completed",
      message: `The form has been created.`,
    });
  } else {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Can't create new form`,
    });
  }
}

export function* watchgetTagsSaga() {
  yield takeLatest(getTagsAsync, getTagsSaga);
}

export function* watchaddTagSaga() {
  yield takeLatest(addTagAsync, addTagSaga);
}

export function* watchGetCustomFieldsSaga() {
  yield takeLatest(getCustomFieldsAsync, getCustomFieldsSaga);
}

export function* watchAddCustomFieldSaga() {
  yield takeLatest(addCustomFieldAsync, addCustomFieldSaga);
}

export function* watchGetFormsSaga() {
  yield takeLatest(getFormsAsync, getFormsSaga);
}

export function* watchAddFormSaga() {
  yield takeLatest(addFormAsync, addFormSaga);
}

const initialState = {
  isLoading: false,
  errors: [],
  tags: [],
  addedNewTag: null,
  customFields: null,
  addedCustomField: null,
  forms: [],
  addedForm: null,
  isNewFormLoading: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    getTagsSuccess: (state, action) => {
      state.tags = action.payload;
      state.isLoading = false;
      state.errors = [];
    },
    addTagSuccess: (state, action) => {
      state.addedNewTag = action.payload;
    },
    getCustomFieldsSuccess: (state, action) => {
      state.customFields = action.payload;
      state.isLoading = false;
      state.errors = [];
    },
    addCustomFieldSuccess: (state, action) => {
      state.addedCustomField = action.payload;
    },
    getFormsSuccess: (state, action) => {
      state.forms = action.payload;
      state.isLoading = false;
      state.errors = [];
    },
    addFormSuccess: (state, action) => {
      state.addedForm = action.payload;
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
      .addCase(getTagsAsync, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(getCustomFieldsAsync, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(getFormsAsync, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(addFormAsync, (state) => {
        state.isNewFormLoading = true;
      });
  },
});

export const {
  getTagsSuccess,
  failed,
  addTagSuccess,
  getCustomFieldsSuccess,
  addCustomFieldSuccess,
  getFormsSuccess,
  addFormSuccess,
} = settingsSlice.actions;

export const selectSettings = ({ settings }) => {
  return {
    tags: settings.tags,
    isLoading: settings.isLoading,
    addedNewTag: settings.addedNewTag,
    customFields: settings.customFields,
    addedCustomField: settings.addedCustomField,
    forms: settings.forms,
    addedForm: settings.addedForm,
    isNewFormLoading: settings.isNewFormLoading,
  };
};

export default settingsSlice.reducer;
