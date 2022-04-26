import { all } from 'redux-saga/effects';
import { userSaga, watchLoginSaga } from './userReducer';

export default function* rootSaga() {
  yield all([
    userSaga(),
    watchLoginSaga(),
  ]);
}
