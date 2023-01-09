import { createAction, createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { notification } from "antd";

import { handleCallAPI, handleFileCallAPI } from "./helpers";
export const getTagsAsync = createAction("settings/getTagsAsync");
export const addTagAsync = createAction("settings/addTagAsync");
export const getCustomFieldsAsync = createAction(
  "settings/getCustomFieldsAsync"
);
export const addCustomFieldAsync = createAction("settings/addCustomFieldAsync");
export const updateCustomFieldAsync = createAction(
  "settings/updateCustomFieldAsync"
);
export const getFormsAsync = createAction("settings/getFormsAsync");
export const addFormAsync = createAction("settings/addFormAsync");
export const updateFormAsync = createAction("settings/updateFormAsync");
export const updateStatusFormAsync = createAction(
  "automation/updateStatusFormAsync"
);
export const getFormSubmissionsAsync = createAction(
  "settings/getFormSubmissionsAsync"
);
export const getSubscriberLocationsAsync = createAction(
  "settings/getSubscriberLocationsAsync"
);
export const getImportContactHistoryAsync = createAction("settings/getImportContactHistoryAsync");
export const importContactsAsync = createAction("settings/importContactsAsync");

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

export async function updateCustomField(data, id) {
  const payload = {
    method: "PUT",
    url: `${process.env.REACT_APP_API_BASE_URL}/custom-fields/${id}`,
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

export async function getFormDetail(id) {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/forms/${id}`,
  };

  return handleFileCallAPI(payload);
}

export async function getSubscriberLocations() {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/form-submission/locations`,
  };

  return handleFileCallAPI(payload);
}

export async function updateForm(data, id) {
  const payload = {
    method: "PUT",
    url: `${process.env.REACT_APP_API_BASE_URL}/forms/${id}`,
    data,
  };

  return handleFileCallAPI(payload);
}

export async function updateStatusForm(id, status) {
  const payload = {
    method: "PUT",
    url: `${process.env.REACT_APP_API_BASE_URL}/forms/status/${id}`,
    data: {
      status,
    },
  };

  return handleCallAPI(payload);
}

export async function getFormSubmissions(data) {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/form-submission`,
    data,
  };

  return handleCallAPI(payload);
}

export async function importContacts(data) {
  const payload = {
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/contacts/import`,
    data,
  };

  return handleCallAPI(payload);
}

export async function getContactHistory() {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/contacts/history`,
  };

  return handleCallAPI(payload);
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
      message: errors || `Can't create new tag.`,
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
      message: errors || `Can't create new custom field.`,
    });
  }
}

export function* updateCustomFieldSaga(action) {
  const { response, errors } = yield call(
    updateCustomField,
    action.payload.dataUpdate,
    action.payload.id
  );
  if (response) {
    yield call(getCustomFieldsSaga, {});
    yield put(updateCustomFieldSuccess(response));
    notification.success({
      title: "Action Completed",
      message: `The custom field has been updated.`,
    });
  } else {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Can't update custom field.`,
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

export function* updateFormSaga(action) {
  const { response, errors } = yield call(
    updateForm,
    action.payload.dataUpdate,
    action.payload.id
  );
  if (response) {
    yield call(getFormsSaga, {});
    yield put(addFormSuccess(response));
    notification.success({
      title: "Action Completed",
      message: `The form has been updated.`,
    });
  } else {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Can't update new form`,
    });
  }
}

export function* updateStatusFormSaga(action) {
  const { response, errors } = yield call(
    updateStatusForm,
    action.payload.id,
    action.payload.status
  );
  if (response) {
    yield call(getFormsSaga, {});
    notification.success({
      title: "Action Completed",
      message: `The status has been updated.`,
    });
  } else {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Can't updated the status`,
    });
  }
}

export function* getFormSubmissionsSaga(action) {
  const { response, errors } = yield call(getFormSubmissions, action.payload);
  if (response) {
    yield put(getFormSubmissionsSuccess(response));
  } else {
    yield put(failed(errors));
  }
}

export function* getSubscriberSaga(action) {
  const { response, errors } = yield call(
    getSubscriberLocations,
    action.payload
  );
  if (response) {
    yield put(getFormSubmissionsSuccess(response));
  } else {
    yield put(failed(errors));
  }
}

export function* importContactsSaga(action) {
  yield put(beginImportContacts());
  const { response, errors } = yield call(importContacts, action.payload);

  if (errors) {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Failed to import contacts, please try again!`,
    });
  } else {
    yield put(importContactsSuccess(response));
  }
}

export function* getImportContactHistorySaga(action) {
  const { response, errors } = yield call(getContactHistory, action.payload);
  if (response) {
    yield put(getImportContactHistorySuccess(response));
  } else {
    yield put(failed(errors));
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

export function* watchUpdateCustomFieldSaga() {
  yield takeLatest(updateCustomFieldAsync, updateCustomFieldSaga);
}

export function* watchGetFormsSaga() {
  yield takeLatest(getFormsAsync, getFormsSaga);
}

export function* watchAddFormSaga() {
  yield takeLatest(addFormAsync, addFormSaga);
}

export function* watchUpdateFormSaga() {
  yield takeLatest(updateFormAsync, updateFormSaga);
}

export function* watcUpdateStatusFormSaga() {
  yield takeLatest(updateStatusFormAsync, updateStatusFormSaga);
}

export function* watchGetFormSubmissionsSaga() {
  yield takeLatest(getFormSubmissionsAsync, getFormSubmissionsSaga);
}

export function* watchGetSubscriberSaga() {
  yield takeLatest(getSubscriberLocationsAsync, getSubscriberSaga);
}

export function* watchImportContactsSaga() {
  yield takeLatest(importContactsAsync, importContactsSaga);
}

export function* watchGetImportContactHistorySaga() {
  yield takeLatest(getImportContactHistoryAsync, getImportContactHistorySaga);
}

const initialState = {
  isLoading: false,
  errors: [],
  tags: [],
  addedNewTag: null,
  customFields: null,
  addedCustomField: null,
  updatededCustomField: null,
  forms: [],
  addedForm: null,
  isNewFormLoading: false,
  formSubmissions: [],
  subscriberLocations: [],
  mappedFields: [],
  skippedFields: [],
  importContactStatus: null,
  contactHistory: null,
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
    updateCustomFieldSuccess: (state, action) => {
      state.updatededCustomField = action.payload;
    },
    getFormsSuccess: (state, action) => {
      state.forms = action.payload;
      state.isLoading = false;
      state.errors = [];
      state.addedForm = null;
      state.customFields = null;
      state.tags = null;
    },
    addFormSuccess: (state, action) => {
      state.addedForm = action.payload;
      state.isNewFormLoading = false;
    },
    getFormSubmissionsSuccess: (state, action) => {
      state.formSubmissions = action.payload;
      state.isLoading = false;
      state.errors = [];
    },
    getFormSubscriberLocationsSuccess: (state, action) => {
      state.subscriberLocations = action.payload;
    },
    failed: (state, action) => {
      state.isLoading = false;
      state.isNewFormLoading = false;
      state.errors = action.payload;
    },
    fieldMapped: (state, action) => {
      state.mappedFields = state.mappedFields.filter(field => field.from !== action.payload.from);

      if (action.payload.to) {
        state.mappedFields.push(action.payload);
      } else {
        state.skippedFields.push(action.payload.from);
      }
    },
    resetMappedFields: (state) => {
      state.mappedFields = [];
      state.skippedFields = [];
      state.importContactStatus = null;
    },
    beginImportContacts: (state) => {
      state.importContactStatus = "loading"
    },
    importContactsSuccess: (state) => {
      state.importContactStatus = 'success';
    },
    getImportContactHistorySuccess: (state, action) => {
      state.contactHistory = action.payload;
    }
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
  updateCustomFieldSuccess,
  getFormsSuccess,
  addFormSuccess,
  getFormSubmissionsSuccess,
  getFormSubscriberLocationsSuccess,
  beginImportContacts,
  importContactsSuccess,
  fieldMapped,
  resetMappedFields,
  getImportContactHistorySuccess,
} = settingsSlice.actions;

export const selectSettings = ({ settings }) => {
  return {
    tags: settings.tags,
    isLoading: settings.isLoading,
    addedNewTag: settings.addedNewTag,
    customFields: settings.customFields,
    addedCustomField: settings.addedCustomField,
    updatededCustomField: settings.updatededCustomField,
    forms: settings.forms,
    addedForm: settings.addedForm,
    isNewFormLoading: settings.isNewFormLoading,
    formSubmissions: settings.formSubmissions,
    mappedFields: settings.mappedFields,
    skippedFields: settings.skippedFields,
    importContactStatus: settings.importContactStatus,
    contactHistory: settings.contactHistory,
  };
};

export default settingsSlice.reducer;
