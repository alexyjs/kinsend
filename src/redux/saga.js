import { all } from "redux-saga/effects";
import { watchGetListPhoneSaga } from "./phoneReducer";
import {
  watchGetListSubscriptionPricesSaga,
  watchGetListSubscriptionSaga,
} from "./subscriptionReducer";
import {
  userSaga,
  watchLoginSaga,
  watchLoginWithGoogleAsyncSaga,
  watchPatchUserSaga,
  watchGetUserSaga,
  watchResendVerifyEmailSaga,
  watchResetUserSaga,
  watchResetPasswordSaga,
} from "./userReducer";
import { watchAddPaymentMethodSaga } from './paymentReducer';

export default function* rootSaga() {
  yield all([
    watchGetListPhoneSaga(),
  
    watchGetListSubscriptionSaga(),
    watchGetListSubscriptionPricesSaga(),

    userSaga(),
    watchLoginSaga(),
    watchLoginWithGoogleAsyncSaga(),
    watchPatchUserSaga(),
    watchGetUserSaga(),
    watchResendVerifyEmailSaga(),
    watchResetUserSaga(),
    watchResetPasswordSaga(),

    watchAddPaymentMethodSaga(),
  ]);
}
