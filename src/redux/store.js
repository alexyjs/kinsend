
import createSagaMiddleware from 'redux-saga';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootSaga from './saga';
import userReducer from './userReducer';
import phoneReducer from './phoneReducer';
import subscriptionReducer from './subscriptionReducer';

// disalbe thunk and add redux-saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
  reducer: {
    users: userReducer,
    phones: phoneReducer,
    subscriptions: subscriptionReducer
  },
  middleware
});

sagaMiddleware.run(rootSaga);

export default store;
