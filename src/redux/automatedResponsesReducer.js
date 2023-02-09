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
export const deleteKeyResponsesSettingsAsync = createAction(
  "public/deleteKeyResponsesSettingsAsync"
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

export async function toggleKeyResponses(isEnable) {
  const payload = {
    method: "PATCH",
    url: `${process.env.REACT_APP_API_BASE_URL}/keyword-response`,
    data: {
      isEnable,
    },
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
  const payload = {
    method: "PUT",
    url: `${process.env.REACT_APP_API_BASE_URL}/keyword-response/${data.id}`,
    data,
  };

  return handleCallAPI(payload);
}

export async function deleteKeyResponsesSettings(id) {
  const payload = {
    method: "DELETE",
    url: `${process.env.REACT_APP_API_BASE_URL}/keyword-response/${id}`,
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
  const { ressponse, errors } = yield call(toggleKeyResponses, action.payload);
  if (errors) {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Something went wrong! Please try again!`,
    });
  } else {
    yield put(setToggleKeyword(ressponse));
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
    const newData = [];
    if (response?.firstTask) {
      newData.push(response?.firstTask);
    }
    if (response?.reminderTask) {
      newData.push(response?.reminderTask);
    }
    yield put(
      getFirstContactSettingsSuccess({
        tasks: [response.firstTask || {}, response.reminderTask || {}],
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
  if (errors) {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Something went wrong! Please try again!`,
    });
  } else {
    yield put(getKeyResponsesSettingsSuccess(response));
  }
}

export function* createKeyResponsesSettingsSaga(action) {
  action.payload.index = action.payload.index + 1;
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
      message: `Keyword response is created`,
    });
    yield put(getKeyResponsesSettingsAsync());
  }
}

export function* updateKeyResponsesSettingsSaga(action) {
  action.payload.index = action.payload.index + 1;
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
      message: `Keyword response is updated`,
    });
    yield put(getKeyResponsesSettingsAsync());
  }
}

export function* deleteKeyResponsesSettingsSaga(action) {
  const { errors } = yield call(deleteKeyResponsesSettings, action.payload);
  if (errors) {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Something went wrong! Please try again!`,
    });
  } else {
    notification.success({
      title: "Action completed",
      message: `Keyword response is deleted`,
    });
    yield put(getKeyResponsesSettingsAsync());
  }
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
  yield takeLatest(
    createKeyResponsesSettingsAsync,
    createKeyResponsesSettingsSaga
  );
}

export function* watchUpdateKeyResponsesSettingsSaga() {
  yield takeLatest(
    updateKeyResponsesSettingsAsync,
    updateKeyResponsesSettingsSaga
  );
}

export function* watchDeleteKeyResponsesSettingsSaga() {
  yield takeLatest(
    deleteKeyResponsesSettingsAsync,
    deleteKeyResponsesSettingsSaga
  );
}

const initialState = {
  isLoading: false,
  errors: [],
  firstContactSettings: [],
  keyResponsesSettings: [],
  hashTagOrEmojiResponsesSettings: [],
  regexResponsesSettings: [],
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
    setToggleKeyword: (state, action) => {
      state.isLoading = false;
      state.errors = [];
      state.keyResponsesSettings = action.payload;
    },
    getKeyResponsesSettingsSuccess: (state, action) => {
      state.isLoading = false;
      state.errors = [];
      state.keyResponsesSettings = action.payload;
      state.hashTagOrEmojiResponsesSettings =
        extractHashTagOrEmojiResponsesSettings(action.payload);
      state.regexResponsesSettings = extractRegexResponsesSettings(
        action.payload
      );
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
  setToggleKeyword,
} = automatedResponsesSlice.actions;

export const selectAutomatedResponses = ({ automatedResponsesReducer }) => {
  return {
    isLoading: automatedResponsesReducer.isLoading,
    firstContactSettings: automatedResponsesReducer.firstContactSettings,
    keyResponsesSettings: automatedResponsesReducer.keyResponsesSettings,
    hashTagOrEmojiResponsesSettings:
      automatedResponsesReducer.hashTagOrEmojiResponsesSettings,
    regexResponsesSettings: automatedResponsesReducer.regexResponsesSettings,
  };
};

export const selectAddPayment = ({ payments }) => {
  return {
    addPaymentSuccess: payments.addPaymentSuccess,
    isLoading: payments.isLoading,
    errors: payments.errors,
  };
};

const extractHashTagOrEmojiResponsesSettings = (settings) => {
  return settings.hashtagAndEmoji.map(transformSetting);
};

const extractRegexResponsesSettings = (settings) => {
  return settings.regex.map(transformSetting);
};

const transformSetting = (setting) => {
  return {
    response: {
      message: setting.response.message,
      type: setting.response.type,
      fileAttached: setting.response.fileAttached,
    },
    keyword: setting.pattern,
    tagId: setting.tag?.id,
    type: setting.type,
    id: setting.id,
    index: setting.index - 1,
  };
};

export default automatedResponsesSlice.reducer;
