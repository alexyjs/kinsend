import { all } from 'redux-saga/effects';
import { watchGetListPhoneSaga } from './phoneReducer';
import { userSaga, watchAddPaymentMethodSaga, watchLoginSaga, watchPatchUserSaga } from './userReducer';

export default function* rootSaga() {
  yield all([
    userSaga(),
    watchLoginSaga(),
    watchPatchUserSaga(),
    watchAddPaymentMethodSaga(),
    watchGetListPhoneSaga(),
  ]);
}
