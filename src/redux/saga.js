import { all } from 'redux-saga/effects';
import { watchGetListPhoneSaga } from './phoneReducer';
import { watchGetListSubscriptionPricesSaga, watchGetListSubscriptionSaga } from './subscriptionReducer';
import { userSaga, watchAddPaymentMethodSaga, watchLoginSaga, watchLoginWithGoogleAsyncSaga, watchPatchUserSaga, watchResendVerifyEmailSaga } from './userReducer';

export default function* rootSaga() {
  yield all([
    userSaga(),
    watchLoginSaga(),
    watchLoginWithGoogleAsyncSaga(),
    watchPatchUserSaga(),
    watchAddPaymentMethodSaga(),
    watchGetListPhoneSaga(),

    watchGetListSubscriptionSaga(),
    watchGetListSubscriptionPricesSaga(),

    watchResendVerifyEmailSaga(),
  ]);
}
