import createSagaMiddleware from "redux-saga";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootSaga from "./saga";
import userReducer from "./userReducer";
import phoneReducer from "./phoneReducer";
import subscriptionReducer from "./subscriptionReducer";
import paymentReducer from "./paymentReducer";
import vcardReducer from "./vcardReducer";
import settingsReducer from "./settingsReducer";
import publicSlice from "./publicReducer";
import automationSlice from "./automationReducer";
import updatesReducer from "./updatesReducer";
import messageReducer from "./messageReducer";
import automatedResponsesReducer from "./automatedResponsesReducer";

// disalbe thunk and add redux-saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({
    thunk: false,
    serializableCheck: false,
    // Ignore these action types
    ignoredActions: ["your/action/type"],
    // Ignore these field paths in all actions
    ignoredActionPaths: ["meta.arg", "payload.timestamp"],
    // Ignore these paths in the state
    ignoredPaths: ["items.dates"],
  }),
  sagaMiddleware,
];

const store = configureStore({
  reducer: {
    users: userReducer,
    phones: phoneReducer,
    subscriptions: subscriptionReducer,
    payments: paymentReducer,
    vcard: vcardReducer,
    settings: settingsReducer,
    publicReducer: publicSlice,
    automationReducer: automationSlice,
    updatesReducer: updatesReducer,
    messageReducer: messageReducer,
    automatedResponses: automatedResponsesReducer,
  },
  middleware,
});

sagaMiddleware.run(rootSaga);

export default store;
