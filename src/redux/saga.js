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
  watchUpdateAvatarSaga,
  watchsyncLocalUserSaga,
} from "./userReducer";
import { watchAddPaymentMethodSaga } from "./paymentReducer";
import { watchGetVCardSaga, watchUpdateVCardSaga } from "./vcardReducer";

import {
  watchgetTagsSaga,
  watchaddTagSaga,
  watchGetCustomFieldsSaga,
  watchAddCustomFieldSaga,
  watchGetFormsSaga,
  watchAddFormSaga,
} from "./settingsReducer";

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
    watchUpdateAvatarSaga(),
    watchsyncLocalUserSaga(),

    watchAddPaymentMethodSaga(),

    watchGetVCardSaga(),
    watchUpdateVCardSaga(),

    // settings
    watchgetTagsSaga(),
    watchaddTagSaga(),
    watchGetCustomFieldsSaga(),
    watchAddCustomFieldSaga(),
    watchGetFormsSaga(),
    watchAddFormSaga(),
  ]);
}
