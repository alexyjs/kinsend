import { createAction, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'lodash'
import { call, put, takeLatest } from 'redux-saga/effects'

export const createUserAsync = createAction('user/createUserAsync')
export const loginAsync = createAction('user/loginAsync')

const getHeaders = (headers) => {
  return {
    'Content-Type': 'application/json',
    'x-api-key': process.env.REACT_APP_API_KEY,
    ...headers,
  }
}

const handleCallAPI = async (payload) => {
  try {
    const result = await axios({
      method: 'post',
      headers: getHeaders(),
      ...payload,
    })

    return { response: _.get(result, 'data') }
  } catch (e) {
    return {
      errors: _.get(e, 'response.data.message'),
    }
  }
}

export async function createUserAPI(data) {
  const payload = {
    url: `${process.env.REACT_APP_API_BASE_URL}/users`,
    data,
  }
  return handleCallAPI(payload)
}

export async function loginAPI(data) {
  const payload = {
    url: `${process.env.REACT_APP_API_BASE_URL}/auths`,
    data,
  }

  return handleCallAPI(payload)
}
// saga
export function* createUserSaga(action) {
  const { response, errors } = yield call(createUserAPI, action.payload)
  if (response) {
    yield put(createUser(response))
  } else {
    yield put(createUserFailed(errors))
  }
}

export function* loginSaga(action) {
  const { response, errors } = yield call(loginAPI, action.payload)
  if (response) {
    yield put(login(response))
  } else {
    yield put(failed(errors))
  }
}

export function* userSaga() {
  yield takeLatest(createUserAsync, createUserSaga)
}

export function* watchLoginSaga() {
  yield takeLatest(loginAsync, loginSaga)
}

const initialState = {
  isLoading: false,
  user: null,
  errors: [],
  auth: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.user = action.payload
      state.isLoading = false
    },
    createUserFailed: (state, action) => {
      state.isLoading = false
      state.errors = action.payload
    },
    login: (state, action) => {
      state.isLoading = false
      state.auth = action.payload
    },
    failed: (state, action) => {
      state.isLoading = false
      state.errors = action.payload
    },
    reset: (state, action) => {
      state = initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createUserAsync, (state) => {
      state.isLoading = true
      state.errors = []
    })
    builder.addCase(loginAsync, (state) => {
      state.isLoading = true
      state.errors = []
    })
  },
})

export const { createUser, createUserFailed, login, failed } = userSlice.actions

export const selectUser = (state) => state.user
export const selectUserError = (state) => state.errors
export const selectUserLoading = (state) => state.isLoading
export const selectCreateUser = ({ users }) => {
  return {
    isLoading: users.isLoading,
    errors: users.errors,
    user: users.user,
  }
}
export const selectAuth = ({ users }) => {
  return {
    isLoading: users.isLoading,
    errors: users.errors,
    auth: users.auth,
  }
}

export default userSlice.reducer
