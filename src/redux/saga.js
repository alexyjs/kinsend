import { all } from 'redux-saga/effects';
import { userSaga } from './userReducer';

export default function* rootSaga() {
  yield all([userSaga()]);
}
