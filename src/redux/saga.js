import { all } from "redux-saga/effects";
import { watchGetListPhoneSaga, watchAddPhoneSaga } from "./phoneReducer";
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
  watchResendPassworSaga,
  watchResetUserSaga,
  watchResetPasswordSaga,
  watchUpdateAvatarSaga,
  watchsyncLocalUserSaga,
  watchCreateCNAMESaga,
  watchUpdateCNAMESaga,
} from "./userReducer";
import { watchAddPaymentMethodSaga } from "./paymentReducer";
import { watchGetVCardSaga, watchUpdateVCardSaga } from "./vcardReducer";

import {
  watchgetTagsSaga,
  watchaddTagSaga,
  watchGetCustomFieldsSaga,
  watchAddCustomFieldSaga,
  watchUpdateCustomFieldSaga,
  watchGetFormsSaga,
  watchAddFormSaga,
  watchUpdateFormSaga,
} from "./settingsReducer";

import {
  watchGetFormSettingDetailSaga,
  watchAddFormSubmissionSaga,
} from "./publicReducer";

import {
  watchGetAutomationListSaga,
  watchCreateAutomationSaga,
  watchUpdateAutomationSaga,
  watchDeleteAutomationSaga,
  watchResetAutomationSaga,
  watchUpdateStatusAutomationSaga,
} from "./automationReducer";

export default function* rootSaga() {
  yield all([
    watchGetListPhoneSaga(),
    watchAddPhoneSaga(),

    watchGetListSubscriptionSaga(),
    watchGetListSubscriptionPricesSaga(),

    userSaga(),
    watchLoginSaga(),
    watchLoginWithGoogleAsyncSaga(),
    watchPatchUserSaga(),
    watchGetUserSaga(),
    watchResendVerifyEmailSaga(),
    watchResendPassworSaga(),
    watchResetUserSaga(),
    watchResetPasswordSaga(),
    watchUpdateAvatarSaga(),
    watchsyncLocalUserSaga(),

    watchAddPaymentMethodSaga(),

    watchGetVCardSaga(),
    watchUpdateVCardSaga(),
    watchCreateCNAMESaga(),
    watchUpdateCNAMESaga(),

    // settings
    watchgetTagsSaga(),
    watchaddTagSaga(),
    watchGetCustomFieldsSaga(),
    watchAddCustomFieldSaga(),
    watchUpdateCustomFieldSaga(),
    watchGetFormsSaga(),
    watchAddFormSaga(),
    watchUpdateFormSaga(),

    // public
    watchGetFormSettingDetailSaga(),
    watchAddFormSubmissionSaga(),

    // automation
    watchGetAutomationListSaga(),
    watchCreateAutomationSaga(),
    watchUpdateAutomationSaga(),
    watchDeleteAutomationSaga(),
    watchResetAutomationSaga(),
    watchUpdateStatusAutomationSaga(),
  ]);
}
