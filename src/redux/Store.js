// import { createStore, applyMiddleware, compose } from "redux";
// import createSagaMiddleware from "redux-saga";
// import rootReducer from "./CombineReducer";  // Your combined reducers
// import rootSaga from "./sagas";  

// const sagaMiddleware = createSagaMiddleware();

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(sagaMiddleware))
// );

// sagaMiddleware.run(rootSaga);

// export default store;

import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from "./CombineReducer";
import rootSaga from './sagas'; // Your root saga

const sagaMiddleware = createSagaMiddleware(); // Create the saga middleware

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware) // Apply the middleware
);

sagaMiddleware.run(rootSaga); // Run the root saga

export default store;