import { createAction, createSlice } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'
import { handleCallAPI } from './helpers'
import _ from 'lodash';

export const getListSubscriptionAsync = createAction('subscription/getListSubscriptionAsync')
export const getListSubscriptionPricesAsync = createAction('subscription/getListSubscriptionPricesAsync')

export async function getListSubscriptionAPI(data) {
  const payload = {
    method: 'GET',
    url: `${process.env.REACT_APP_API_BASE_URL}/subscriptions`,
    data,
  }

  return handleCallAPI(payload)
}

export function* getListSubscription(action) {
  const { response, errors } = yield call(getListSubscriptionAPI, action.payload)
  if (response) {
    yield put(getListSubscriptionSuccess(response))
  } else {
    yield put(failed(errors))
  }
}

export async function getListSubscriptionPricesAPI(data) {
  const payload = {
    method: 'GET',
    url: `${process.env.REACT_APP_API_BASE_URL}/subscriptions/prices`,
    data,
  }

  return handleCallAPI(payload)
}

export function* getListSubscriptionPrices(action) {
  const { response, errors } = yield call(getListSubscriptionPricesAPI, action.payload)
  if (response) {
    yield put(getListSubscriptionPricesSuccess(_.get(response, 'data')))
  } else {
    yield put(failed(errors))
  }
}

export function* watchGetListSubscriptionSaga() {
  yield takeLatest(getListSubscriptionAsync, getListSubscription)
}

export function* watchGetListSubscriptionPricesSaga() {
  yield takeLatest(getListSubscriptionPricesAsync, getListSubscriptionPrices)
}

const initialState = {
  isLoading: false,
  listSubscription: null,
  listSubscriptionPrices: null,
  errors: [],
  success: false,
}

export const subscriptionSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getListSubscriptionSuccess: (state, action) => {
      state.listSubscription = action.payload
      state.isLoading = false
    },
    getListSubscriptionPricesSuccess: (state, action) => {
      state.listSubscriptionPrices = action.payload
      state.isLoading = false
    },
    failed: (state, action) => {
      state.isLoading = false
      state.errors = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListSubscriptionAsync, (state) => {
        state.isLoading = true
        state.errors = []
      })
  },
})

export const {
  getListSubscriptionSuccess,
  getListSubscriptionPricesSuccess,
  failed,
} = subscriptionSlice.actions

export const selectSubscriptions = (state) => {
  return {
    ...state.subscriptions,
  }
};


export default subscriptionSlice.reducer
