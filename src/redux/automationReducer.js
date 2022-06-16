import { createAction, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import { notification } from "antd";

import { handleCallAPI, handleFileCallAPI } from "./helpers";

export const getAutomationListAsync = createAction(
  "automation/getAutomationListAsync"
);

export async function getAutomationList() {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/automation`,
  };

  return handleCallAPI(payload);
}

export function* watchGetAutomationListSaga() {
  yield takeLatest(getAutomationListAsync, getAutomationList);
}

const initialState = {
  isLoading: false,
  errors: [],
  automationList: [],
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAutomationList, (state) => {
        state.isLoading = true;
        state.errors = [];
      });
  },
});

export const {
  failed,
  getFormsSettingDetailSuccess,
  addFormSubmissionSuccess,
} = automationSlice.actions;

export const selectautomation = ({ automationReducer }) => {
  return {
    isLoading: automationReducer.isLoading,
    automationList: automationReducer.automationList,
  };
};

export default automationSlice.reducer;
