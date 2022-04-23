import { createAction, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'lodash'
import { call, put, takeLatest } from 'redux-saga/effects'

export const createUserAsync = createAction('user/createUserAsync')
export async function createUserAPI(payload) {
  try {
    const result = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_BASE_URL}/users`,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
      data: payload,
    })

    return result
  } catch (e) {
    return {
      errors: _.get(e, 'response.data.message'),
    }
  }
}

export function* createUserSaga(action) {
  const { response, errors } = yield call(createUserAPI, action.payload)
  if (response) {
    yield put(createUser(response))
  } else {
    yield put(createUserFailed(errors))
  }
}

export function* userSaga() {
  yield takeLatest(createUserAsync, createUserSaga)
}

const initialState = {
  isLoading: false,
  user: null,
  errors: [],
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
  },
  extraReducers: (builder) => {
    builder.addCase(createUserAsync, (state) => {
      state.isLoading = true
      state.errors = []
    })
  },
})

export const { createUser, createUserFailed } = userSlice.actions

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

export default userSlice.reducer
