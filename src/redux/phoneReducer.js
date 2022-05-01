import { createAction, createSlice } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'
import { handleCallAPI } from './helpers'

export const getListPhoneAsync = createAction('phone/getListPhoneAsync')

export async function getListPhoneAPI(data) {
  const payload = {
    method: 'GET',
    url: `${process.env.REACT_APP_API_BASE_URL}/resources/available-phone-number`,
    data,
  }

  return handleCallAPI(payload)
}

export function* getListPhone(action) {
  const { response, errors } = yield call(getListPhoneAPI, action.payload)
  if (response) {
    yield put(getListPhoneSuccess(response))
  } else {
    yield put(failed(errors))
  }
}

export function* watchGetListPhoneSaga() {
  yield takeLatest(getListPhoneAsync, getListPhone)
}

const initialState = {
  isLoading: false,
  listPhone: null,
  errors: [],
  success: false,
}

export const phoneSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getListPhoneSuccess: (state, action) => {
      state.listPhone = action.payload
      state.isLoading = false
    },
    failed: (state, action) => {
      state.isLoading = false
      state.errors = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListPhoneAsync, (state) => {
        state.isLoading = true
        state.errors = []
      })
  },
})

export const {
  getListPhoneSuccess,
  failed,
} = phoneSlice.actions

export const selectPhones = (state) => {
  return {
    ...state.phones,
  }
};


export default phoneSlice.reducer
