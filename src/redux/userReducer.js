import { createAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import { notification } from "antd";

import { authStorage } from "./../utils";

export const createUserAsync = createAction("user/createUserAsync");
export const loginAsync = createAction("user/loginAsync");
export const resendVerifyEmailAsync = createAction(
  "user/resendVerifyEmailAsync"
);
export const loginWithGoogleAsync = createAction("user/loginWithGoogleAsync");
export const patchUserAsync = createAction("user/patchUserAsync");
export const addPaymentMethodAsync = createAction("user/addPaymentMethodAsync");
export const resetUserAsync = createAction("user/resetUserAsync");

const getAuthorization = () => {
  const headers = authStorage.get();
  return `Bearer ${_.get(headers, "accesstoken")}`;
};
const getHeaders = (headers) => {
  return {
    "Content-Type": "application/json",
    "x-api-key": process.env.REACT_APP_API_KEY,
    Authorization: getAuthorization(),
    ...headers,
  };
};

const handleCallAPI = async (payload, headers) => {
  try {
    const result = await axios({
      method: "post",
      headers: getHeaders(),
      ...payload,
    });
    return {
      response: _.get(result, "data"),
      headers: _.get(result, "headers"),
    };
  } catch (e) {
    return {
      errors: _.get(e, "response.data.message"),
    };
  }
};

export async function createUserAPI(data) {
  const payload = {
    url: `${process.env.REACT_APP_API_BASE_URL}/users`,
    data,
  };
  return handleCallAPI(payload);
}

export async function loginAPI(data) {
  const payload = {
    url: `${process.env.REACT_APP_API_BASE_URL}/auths`,
    data,
  };

  return handleCallAPI(payload);
}

export async function loginWithGoogleAPI(data) {
  const payload = {
    url: `${process.env.REACT_APP_API_BASE_URL}/auths/provider/GOOGLE`,
    data,
  };

  return handleCallAPI(payload);
}

export async function resendVerifyEmailAPI(data) {
  const payload = {
    method: "get",
    url: `${process.env.REACT_APP_API_BASE_URL}/users/resend-verify-email`,
    data,
  };

  return handleCallAPI(payload);
}

export async function patchUserAPI(data) {
  const payload = {
    method: "GET",
    url: `${process.env.REACT_APP_API_BASE_URL}/users/me`,
    data,
  };

  return handleCallAPI(payload);
}

export async function addPaymentMethodAPI(data) {
  const payload = {
    method: "POST",
    url: `${process.env.REACT_APP_API_BASE_URL}/payments/credit-card`,
    data,
  };

  return handleCallAPI(payload);
}

// saga
export function* createUserSaga(action) {
  const { response, errors } = yield call(createUserAPI, action.payload);
  if (response) {
    yield put(createUser(response));

    notification.success({
      title: "Action Completed",
      message: `The user has been created.`,
    });
  } else {
    yield put(createUserFailed(errors));
    notification.error({
      title: "Action failed",
      message: `Can't create new user.`,
    });
  }
}

export function* loginSaga(action) {
  const { response, errors, headers } = yield call(loginAPI, action.payload);

  if (response) {
    authStorage.set(headers);
    yield put(login(response));
    notification.success({
      title: "Action Completed",
      message: `Login successfully.`,
    });
  } else {
    yield put(failed(errors));
    notification.error({
      title: "Action failed",
      message: errors || `Login Failed.`,
    });
  }
}

export function* loginWithGoogleSaga(action) {
  const { response, errors } = yield call(loginWithGoogleAPI, action.payload);

  if (response) {
    yield put(login(response));
    notification.success({
      title: "Action Completed",
      message: `Login With Google successfully.`,
    });
  } else {
    yield put(failed(errors));
  }
}

export function* resendVerifyEmailSaga(action) {
  const { response, errors } = yield call(resendVerifyEmailAPI, action.payload);

  if (response) {
    yield put(resendVerifyEmailSuccess(response));
  } else {
    yield put(failed(errors));
  }
}

export function* patchUserSaga(action) {
  const { response, errors } = yield call(patchUserAPI, action.payload);
  if (response) {
    yield put(updatedUser(response));
  } else {
    yield put(failed(errors));
  }
}

export function* resetUserSaga() {
  yield put(reset());
}

export function* addPaymentMethodSaga(action) {
  const { response, errors } = yield call(addPaymentMethodAPI, action.payload);
  if (response) {
    yield put(addPaymentSuccess(response));
  } else {
    yield put(failed(errors));
  }
}

export function* userSaga() {
  yield takeLatest(createUserAsync, createUserSaga);
}

export function* watchLoginSaga() {
  yield takeLatest(loginAsync, loginSaga);
}

export function* watchLoginWithGoogleAsyncSaga() {
  yield takeLatest(loginWithGoogleAsync, loginWithGoogleSaga);
}

export function* watchResendVerifyEmailSaga() {
  yield takeLatest(resendVerifyEmailAsync, resendVerifyEmailSaga);
}

export function* watchPatchUserSaga() {
  yield takeLatest(patchUserAsync, patchUserSaga);
}

export function* watchAddPaymentMethodSaga() {
  yield takeLatest(addPaymentMethodAsync, addPaymentMethodSaga);
}

export function* watchResetUserSaga() {
  yield takeLatest(resetUserAsync, resetUserSaga);
}

const initialState = {
  isLoading: false,
  user: null,
  errors: [],
  auth: null,
  updatedUserSuccess: false,
  addPaymentSuccess: false,
  resendVerifyEmailSuccess: false,
  signupSuccess: false,
  signupfailed: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, action) => {
      // state.user = action.payload
      state.isLoading = false;
      state.signupSuccess = true;
    },
    createUserFailed: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    login: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    failed: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    reset: (state, action) => {
      // state = {...initialState};
      state.user = null;
      state.errors = [];
      state.auth = null;
    },
    updatedUser: (state, action) => {
      state.user = action.payload;
      state.updatedUserSuccess = true;
    },
    addPaymentSuccess: (state, action) => {
      state.addPaymentSuccess = true;
    },
    resendVerifyEmailSuccess: (state, action) => {
      state.resendVerifyEmailSuccess = true;
    },
    resetResendVerifyEmail: (state, action) => {
      state.resendVerifyEmailSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync, (state) => {
        state.isLoading = true;
        state.errors = [];
        state.signupSuccess = false;
      })
      .addCase(loginAsync, (state) => {
        state.isLoading = true;
        state.errors = [];
      });
  },
});

const { resendVerifyEmailSuccess } = userSlice.actions;
export const {
  createUser,
  createUserFailed,
  login,
  failed,
  updatedUser,
  addPaymentSuccess,
  resetResendVerifyEmail,
  reset,
} = userSlice.actions;

export const selectUsers = (state) => {
  return state.users;
};
export const selectUserError = (state) => state.errors;
export const selectUserLoading = (state) => state.isLoading;
export const selectCreateUser = ({ users }) => {
  return {
    isLoading: users.isLoading,
    errors: users.errors,
    signupSuccess: users.signupSuccess,
  };
};
export const selectAuth = ({ users }) => {
  return {
    isLoading: users.isLoading,
    errors: users.errors,
    auth: users.auth,
  };
};
export const selectUpdatedUserSuccess = ({ users }) => {
  return {
    updatedUserSuccess: users.updatedUserSuccess,
  };
};

export const selectAddPaymentSuccess = ({ users }) => {
  return {
    addPaymentSuccess: users.addPaymentSuccess,
  };
};

export default userSlice.reducer;
