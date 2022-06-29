import { createAction, createSlice } from "@reduxjs/toolkit";
import { takeLatest, call, put } from "redux-saga/effects";
import { notification } from "antd";

import { handleCallAPI } from "./helpers";

export const getAutomationListAsync = createAction(
  "automation/getAutomationListAsync"
);
export const createAutomationAsync = createAction(
  "automation/createAutomationAsync"
);
export const updateAutomationAsync = createAction(
  "automation/updateAutomationAsync"
);
export const deleteAutomationAsync = createAction(
  "automation/deleteAutomationAsync"
);
export const resetAutomationAsync = createAction(
  "automation/resetAutomationAsync"
);
export const updatestatusAutomationAsync = createAction(
  "automation/updatestatusAutomationAsync"
);

export async function getAutomationList() {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/automations`,
  };

  return handleCallAPI(payload);
}

export async function createAutomation(data) {
  const payload = {
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/automations`,
    data,
  };

  return handleCallAPI(payload);
}

export async function updateAutomation(data, id) {
  const payload = {
    method: "PUT",
    url: `${process.env.REACT_APP_API_BASE_URL}/automations/${id}`,
    data,
  };

  return handleCallAPI(payload);
}

export async function deleteAutomation(id) {
  const payload = {
    method: "DELETE",
    url: `${process.env.REACT_APP_API_BASE_URL}/automations/${id}`,
  };

  return handleCallAPI(payload);
}

export async function updateStatusAutomation(id, status) {
  const payload = {
    method: "PUT",
    url: `${process.env.REACT_APP_API_BASE_URL}/automations/status/${id}`,
    data: {
      status,
    },
  };

  return handleCallAPI(payload);
}

// saga
export function* getAutomationsSaga(action) {
  const { response, errors } = yield call(getAutomationList, action.payload);
  if (response) {
    const newResponse = response.map((item) => {
      return {
        ...item,
        key: item.id,
      };
    });
    yield put(getAutomationListSuccess(newResponse));
  } else {
    yield put(failed(errors));
  }
}

export function* addAutomationSaga(action) {
  const { response, errors } = yield call(createAutomation, action.payload);
  if (response) {
    yield put(addAutomationSuccess(response));
    notification.success({
      title: "Action Completed",
      message: `The automation has been created.`,
    });
  } else {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Can't create new automation.`,
    });
  }
}

export function* updateAutomationSaga(action) {
  const { response, errors } = yield call(
    updateAutomation,
    action.payload.dataUpdate,
    action.payload.id
  );
  if (response) {
    yield put(addAutomationSuccess(response));
    notification.success({
      title: "Action Completed",
      message: `The automation has been updated.`,
    });
  } else {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Can't update the automation.`,
    });
  }
}

export function* deleteAutomationSaga(action) {
  const { response, errors } = yield call(deleteAutomation, action.payload);
  if (response) {
    yield call(getAutomationsSaga, {});
    notification.success({
      title: "Action Completed",
      message: `The automation has been deleted.`,
    });
  } else {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Can't delete the automation.`,
    });
  }
}

export function* updateStatusAutomationSaga(action) {
  const { response, errors } = yield call(updateStatusAutomation, action.payload.id, action.payload.status);
  if (response) {
    yield call(getAutomationsSaga, {});
    notification.success({
      title: "Action Completed",
      message: `The automation has been ${action.payload.status}.`,
    });
  } else {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Can't ${action.payload.status} the automation.`,
    });
  }
}

export function* resetAutomationSaga() {
  yield put(resetAutomationSuccess());
}

export function* watchGetAutomationListSaga() {
  yield takeLatest(getAutomationListAsync, getAutomationsSaga);
}

export function* watchCreateAutomationSaga() {
  yield takeLatest(createAutomationAsync, addAutomationSaga);
}

export function* watchUpdateAutomationSaga() {
  yield takeLatest(updateAutomationAsync, updateAutomationSaga);
}
export function* watchDeleteAutomationSaga() {
  yield takeLatest(deleteAutomationAsync, deleteAutomationSaga);
}

export function* watchResetAutomationSaga() {
  yield takeLatest(resetAutomationAsync, resetAutomationSaga);
}


export function* watchUpdateStatusAutomationSaga() {
  yield takeLatest(updatestatusAutomationAsync, updateStatusAutomationSaga);
}

const initialState = {
  isLoading: false,
  errors: [],
  automationList: [],
  newAutomation: null,
};

export const automationSlice = createSlice({
  name: "automationReducer",
  initialState,
  reducers: {
    getAutomationListSuccess: (state, action) => {
      state.automationList = action.payload;
      state.isLoading = false;
      state.errors = [];
    },
    failed: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    addAutomationSuccess: (state, action) => {
      state.newAutomation = action.payload;
      state.isLoading = false;
      state.errors = [];
    },
    resetAutomationSuccess: (state, action) => {
      state.newAutomation = null;
      state.isLoading = false;
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAutomationList, (state) => {
      state.isLoading = true;
      state.errors = [];
    });
  },
});

export const {
  failed,
  getAutomationListSuccess,
  addAutomationSuccess,
  resetAutomationSuccess,
} = automationSlice.actions;

export const selectAutomation = ({ automationReducer }) => {
  return {
    isLoading: automationReducer.isLoading,
    automationList: automationReducer.automationList,
    newAutomation: automationReducer.newAutomation,
  };
};

export default automationSlice.reducer;
