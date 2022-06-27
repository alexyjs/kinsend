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

export async function getAutomationList() {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/automations`,
  };

  return handleCallAPI(payload);
}

export async function createAutomation() {
  const payload = {
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/automations`,
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

export function* watchGetAutomationListSaga() {
  yield takeLatest(getAutomationListAsync, getAutomationsSaga);
}

export function* watchCreateAutomationSaga() {
  yield takeLatest(createAutomationAsync, addAutomationSaga);
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
  },
  extraReducers: (builder) => {
    builder.addCase(getAutomationList, (state) => {
      state.isLoading = true;
      state.errors = [];
    });
  },
});

export const { failed, getAutomationListSuccess, addAutomationSuccess } =
  automationSlice.actions;

export const selectautomation = ({ automationReducer }) => {
  return {
    isLoading: automationReducer.isLoading,
    automationList: automationReducer.automationList,
  };
};

export default automationSlice.reducer;
