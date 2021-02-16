import "babel-polyfill";

import React from "react";
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { all, fork } from 'redux-saga/effects';

import { appReducer } from './app/app-redux';
import { init } from './app/app-saga';
import Counter from './counter/Counter';
import { counterReducer, incrementCounter, decrementCounter, syncCounter } from './counter/counter-redux';
import { watchSyncCounter } from './counter/counter-saga';
import { Provider } from "react-redux";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  app: appReducer,
  counter: counterReducer
});
const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(sagaMiddleware),
));

function* rootSaga() {
  yield all([
    init(),
    fork(watchSyncCounter)
  ]);
}
sagaMiddleware.run(rootSaga);

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <Counter
        onIncrement={() => store.dispatch(incrementCounter())}
        onDecrement={() => store.dispatch(decrementCounter())}
        onSync={() => store.dispatch(syncCounter())}
      />
    </Provider>,
    document.getElementById('root')
  );
}

render();
store.subscribe(render);
