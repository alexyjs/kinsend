import { all } from "redux-saga/effects";
import { watchGetListPhoneSaga, watchAddPhoneSaga } from "./phoneReducer";
import {
  watchGetListSubscriptionPricesSaga,
  watchGetListSubscriptionSaga,
  watchGetSubscriberByMessageIdSaga,
  watchEditSubscriberSaga,
  watchSendVCardSaga,
} from "./subscriptionReducer";
import {
  userSaga,
  watchLoginSaga,
  watchLoginWithGoogleAsyncSaga,
  watchPatchUserSaga,
  watchGetUserSaga,
  watchResendVerifyEmailSaga,
  watchForgetPPassworSaga,
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
  watcUpdateStatusFormSaga,
  watchGetFormSubmissionsSaga,
  watchGetSubscriberSaga,
  watchImportContactsSaga,
  watchGetImportContactHistorySaga,
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

import {
  watchGetSegmentSaga,
  watchAddSegmentSaga,
  watchGetUpdatesSaga,
  watchGetUpdatesDetailSaga,
  watchAddUpdatesSaga,
  watchEditUpdatesSaga,
  watchDeleteUpdatesSaga,
  watchResetUpdatesSaga,
  watchSendTestMessageSaga,
} from "./updatesReducer";

import {
  watchGetMessageSaga,
  watchGetMessageDetailSaga,
  watchSendSmsSaga,
  watchResetSendSmsSaga,
  watchGetMessageStatisticsSaga,
} from "./messageReducer";

import {
  watchCreateKeyResponsesSettingsSaga,
  watchDeleteKeyResponsesSettingsSaga,
  watchGetFirstContactSettingsSaga,
  watchGetKeyResponsesSettingsSaga,
  watchSaveFirstContactSettingsSaga,
  watchToggleFirstContactSaga,
  watchToggleKeyResponsesSaga,
  watchUpdateKeyResponsesSettingsSaga,
} from "./automatedResponsesReducer";

export default function* rootSaga() {
  yield all([
    watchGetListPhoneSaga(),
    watchAddPhoneSaga(),

    // form submission
    watchGetListSubscriptionSaga(),
    watchGetListSubscriptionPricesSaga(),
    watchGetSubscriberByMessageIdSaga(),
    watchEditSubscriberSaga(),
    watchSendVCardSaga(),

    //
    userSaga(),
    watchLoginSaga(),
    watchLoginWithGoogleAsyncSaga(),
    watchPatchUserSaga(),
    watchGetUserSaga(),
    watchResendVerifyEmailSaga(),
    watchForgetPPassworSaga(),
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
    watcUpdateStatusFormSaga(),
    watchGetFormSubmissionsSaga(),
    watchGetSubscriberSaga(),
    watchImportContactsSaga(),
    watchGetImportContactHistorySaga(),

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

    // update
    watchGetSegmentSaga(),
    watchAddSegmentSaga(),
    watchGetUpdatesSaga(),
    watchGetUpdatesDetailSaga(),
    watchAddUpdatesSaga(),
    watchEditUpdatesSaga(),
    watchDeleteUpdatesSaga(),
    watchResetUpdatesSaga(),
    watchSendTestMessageSaga(),

    // message
    watchGetMessageSaga(),
    watchGetMessageDetailSaga(),
    watchSendSmsSaga(),
    watchResetSendSmsSaga(),
    watchGetMessageStatisticsSaga(),

    // automated responses
    watchToggleFirstContactSaga(),
    watchToggleKeyResponsesSaga(),
    watchSaveFirstContactSettingsSaga(),
    watchGetFirstContactSettingsSaga(),
    watchGetKeyResponsesSettingsSaga(),
    watchCreateKeyResponsesSettingsSaga(),
    watchUpdateKeyResponsesSettingsSaga(),
    watchDeleteKeyResponsesSettingsSaga(),
  ]);
}
