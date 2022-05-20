import { createAction, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
// import { notification } from "antd";

import { handleCallAPI } from './helpers';
export const getTagsAsync = createAction("user/getTagsAsync");
export const addTagAsync = createAction("user/addTagAsync");

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

// saga
export function* getTagsSaga(action) {
  const { response, errors } = yield call(getTags, action.payload);
  if (response) {
    const newResponse = response.map(item => {
      return {
        ...item,
        key: item.id,
      }
    })
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

const initialState = {
  isLoading: false,
  errors: [],
  tags: [],
  addnewTag: null,
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
      state.addnewTag = action.payload;
    },
    failed: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTagsAsync, (state) => {
        state.isLoading = true;
        state.errors = [];
      });
      // .addCase(addTagAsync, (state) => {
      //   state.addnewTag = null;
      // });
  },
});

export const { getTagsSuccess, failed, addTagSuccess } = settingsSlice.actions;

export const selectSettings = ({ settings }) => {
  return {
    tags: settings.tags,
    isLoading: settings.isLoading,
    addnewTag: settings.addnewTag,
  };
};

export default settingsSlice.reducer;
