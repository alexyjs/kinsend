import { all } from 'redux-saga/effects';
import { createUserSaga } from './userReducer';

export default function* rootSaga() {
  yield all([createUserSaga()]);
}
