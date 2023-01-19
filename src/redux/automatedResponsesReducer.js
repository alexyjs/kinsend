import { createAction, createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { notification } from "antd";

import { handleCallAPI } from "./helpers";

export const toggleFirstContactAsync = createAction(
  "public/toggleFirstContactAsync"
);
export const toggleKeyResponsesAsync = createAction(
  "public/toggleKeyResponsesAsync"
);
export const saveFirstContactSettingsAsync = createAction(
  "public/saveFirstContactSettingsAsync"
);
export const getFirstContactSettingsAsync = createAction(
  "public/getFirstContactSettingsAsync"
);
export const getKeyResponsesSettingsAsync = createAction(
  "public/getKeyResponsesSettingsAsync"
);
export const createKeyResponsesSettingsAsync = createAction(
  "public/createKeyResponsesSettingsAsync"
);
export const updateKeyResponsesSettingsAsync = createAction(
  "public/updateKeyResponsesSettingsAsync"
);

export async function toggleFirstContact(isEnabled) {
  const payload = {
    method: "PUT",
    url: `${process.env.REACT_APP_API_BASE_URL}/first-contact`,
    data: {
      isEnable: isEnabled,
    },
  };

  return handleCallAPI(payload);
}

export async function toggleKeyResponses(isEnabled) {
  const payload = {
    method: "PUT",
    url: `${process.env.REACT_APP_API_BASE_URL}/automated-responses/key-repsonses`,
  };

  return handleCallAPI(payload);
}

export async function saveFirstContactSettings(data) {
  const payload = {
    method: "PUT",
    url: `${process.env.REACT_APP_API_BASE_URL}/first-contact`,
    data,
  };

  return handleCallAPI(payload);
}

export async function getFirstContactSettings() {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/first-contact`,
  };

  return handleCallAPI(payload);
}

export async function getKeyResponsesSettings() {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/keyword-response`,
  };

  return handleCallAPI(payload);
}

export async function createKeyResponsesSettings(data) {
  const payload = {
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/keyword-response`,
    data,
  };

  return handleCallAPI(payload);
}

export async function updateKeyResponsesSettings(data) {
  console.log(data);
  const payload = {
    method: "PUT",
    url: `${process.env.REACT_APP_API_BASE_URL}/keyword-response/${data.id}`,
    data,
  };

  return handleCallAPI(payload);
}

export function* toggleFirstContactSaga(action) {
  yield put(
    setFirstContactSettings({
      isTogglingFirstContact: true,
    })
  );
  const { errors } = yield call(toggleFirstContact, action.payload);
  if (errors) {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Something went wrong! Please try again!`,
    });
  } else {
    yield put(
      setFirstContactSettings({
        isEnabled: action.payload,
        isTogglingFirstContact: false,
      })
    );
    notification.success({
      title: "Action Completed",
      message: `${action.payload ? "Enabled" : "Disabled"} First Contact`,
    });
  }
}

export function* toggleKeyResponsesSaga(action) {
  const { errors } = yield call(toggleKeyResponses, action.payload);
  if (errors) {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Something went wrong! Please try again!`,
    });
  }
}

export function* saveFirstContactSettingsSaga(action) {
  const { errors } = yield call(saveFirstContactSettings, action.payload);
  if (errors) {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Something went wrong! Please try again!`,
    });
  } else {
    notification.success({
      title: "Action completed",
      message: `First Contact saved`,
    });
  }
}

export function* getFirstContactSettingsSaga(action) {
  const { response, errors } = yield call(
    getFirstContactSettings,
    action.payload
  );
  if (errors) {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Something went wrong! Please try again!`,
    });
  } else {
    yield put(
      getFirstContactSettingsSuccess({
        tasks: [response.firstTask, response.reminderTask],
        isEnabled: response.isEnable,
      })
    );
  }
}

export function* getKeyResponsesSettingsSaga(action) {
  const { response, errors } = yield call(
    getKeyResponsesSettings,
    action.payload
  );
  // if (errors) {
  //   yield put(failed(errors));
  //   notification.error({
  //     title: "Action failed",
  //     message: errors || `Something went wrong! Please try again!`,
  //   });
  // } else {
  //   yield put(getKeyResponsesSettingsSuccess(response));
  // }
  yield put(
    getKeyResponsesSettingsSuccess([
      {
        response: {
          type: "SEND_MESSAGE",
          message: "This is a message with emoji 😊😊",
          fileAttached: null
        },
        pattern: "😂",
        hashTagOrEmoji: {},
        tagId: "63b81e2b7d8c963ea0f9c2d0",
        type: "HASHTAG_OR_EMOJI",
        id: "63b81e2b7d8c963ea0f9c2d0",
        index: 0,
      },
      {
        response: {
          type: "SEND_MESSAGE",
          message: "This is a message with emoji 😊😊",
          fileAttached: null
        },
        pattern: "😊",
        hashTagOrEmoji: {},
        tagId: "63b81e2b7d8c963ea0f9c2d0",
        type: "HASHTAG_OR_EMOJI",
        id: "63b81e2b7d8c963ea0f9c2d0",
        index: 1,
      },
      {
        response: {
          type: "SEND_MESSAGE",
          message: "This is a message with emoji 😊😊",
          fileAttached: null
        },
        pattern: "😘",
        hashTagOrEmoji: {},
        tagId: "63b81e2b7d8c963ea0f9c2d0",
        type: "HASHTAG_OR_EMOJI",
        id: "63b81e2b7d8c963ea0f9c2d0",
        index: 2,
      }
    ])
  );
}

export function* createKeyResponsesSettingsSaga(action) {
  const { errors } = yield call(createKeyResponsesSettings, action.payload);
  if (errors) {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Something went wrong! Please try again!`,
    });
  } else {
    notification.success({
      title: "Action completed",
      message: `Key responses created`,
    });
    yield put(getKeyResponsesSettingsAsync());
  }
  yield put(getKeyResponsesSettingsAsync());
}

export function* updateKeyResponsesSettingsSaga(action) {
  const { errors } = yield call(updateKeyResponsesSettings, action.payload);
  if (errors) {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Something went wrong! Please try again!`,
    });
  } else {
    notification.success({
      title: "Action completed",
      message: `Key responses updated`,
    });
    yield put(getKeyResponsesSettingsAsync());
  }
  yield put(getKeyResponsesSettingsAsync());
}

export function* watchToggleFirstContactSaga() {
  yield takeLatest(toggleFirstContactAsync, toggleFirstContactSaga);
}

export function* watchToggleKeyResponsesSaga() {
  yield takeLatest(toggleKeyResponsesAsync, toggleKeyResponsesSaga);
}

export function* watchSaveFirstContactSettingsSaga() {
  yield takeLatest(saveFirstContactSettingsAsync, saveFirstContactSettingsSaga);
}

export function* watchGetFirstContactSettingsSaga() {
  yield takeLatest(getFirstContactSettingsAsync, getFirstContactSettingsSaga);
}

export function* watchGetKeyResponsesSettingsSaga() {
  yield takeLatest(getKeyResponsesSettingsAsync, getKeyResponsesSettingsSaga);
}

export function* watchCreateKeyResponsesSettingsSaga() {
  yield takeLatest(createKeyResponsesSettingsAsync, createKeyResponsesSettingsSaga);
}

export function* watchUpdateKeyResponsesSettingsSaga() {
  yield takeLatest(updateKeyResponsesSettingsAsync, updateKeyResponsesSettingsSaga);
}

const initialState = {
  isLoading: false,
  errors: [],
  firstContactSettings: [],
  keyResponsesSettings: [],
};

export const automatedResponsesSlice = createSlice({
  name: "automatedResponsesReducer",
  initialState,
  reducers: {
    failed: (state, action) => {
      state.isLoading = false;
      state.isNewFormLoading = false;
      state.errors = action.payload;
    },
    getFirstContactSettingsSuccess: (state, action) => {
      state.isLoading = false;
      state.errors = [];
      state.firstContactSettings = action.payload;
    },
    setFirstContactSettings: (state, action) => {
      state.firstContactSettings = {
        ...state.firstContactSettings,
        ...action.payload,
      };
    },
    getKeyResponsesSettingsSuccess: (state, action) => {
      state.isLoading = false;
      state.errors = [];
      state.keyResponsesSettings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleFirstContactAsync, (state) => {
        state.isTogglingFirstContact = true;
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(toggleKeyResponsesAsync, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(getFirstContactSettingsAsync, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(saveFirstContactSettingsAsync, (state) => {
        state.isLoading = true;
        state.errors = [];
      });
  },
});

export const {
  failed,
  getFirstContactSettingsSuccess,
  getKeyResponsesSettingsSuccess,
  setFirstContactSettings,
} = automatedResponsesSlice.actions;

export const selectAutomatedResponses = ({ automatedResponses }) => {
  return {
    isLoading: automatedResponses.isLoading,
    firstContactSettings: automatedResponses.firstContactSettings,
    keyResponsesSettings: automatedResponses.keyResponsesSettings,
    hashTagOrEmojiResponsesSettings: getHashTagOrEmojiResponsesSettings(automatedResponses.keyResponsesSettings),
    regexResponsesSettings: getRegexResponsesSettings(automatedResponses.keyResponsesSettings)
  };
};

const getHashTagOrEmojiResponsesSettings = (settings) => {
  return settings.filter(setting => setting.type === "HASHTAG_OR_EMOJI");
}

const getRegexResponsesSettings = (settings) => {
  return settings.filter(setting => setting.type === "REGEX");
}

export default automatedResponsesSlice.reducer;
