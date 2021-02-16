import "babel-polyfill";

import React from "react";
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { all } from 'redux-saga/effects';

import Counter from './counter/Counter';
import { counterReducer, incrementCounter, decrementCounter, syncCounter } from './counter/counter-redux';
import { watchSyncCounter } from './counter/counter-saga';
import { Provider } from "react-redux";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(counterReducer, composeWithDevTools(
  applyMiddleware(sagaMiddleware),
));

function init() {
  console.log('init');
}

export default function* rootSaga() {
  yield all([
    init(),
    watchSyncCounter()
  ]);
}

sagaMiddleware.run(rootSaga);

function render() {

  ReactDOM.render(
    <Provider store={store}>
      <Counter
        onIncrement={() => store.dispatch(incrementCounter())}
        onDecrement={() => store.dispatch(decrementCounter())}
        onIncrementAsync={() => store.dispatch(syncCounter())} />
    </Provider>,
    document.getElementById('root')
  );
}

render();
store.subscribe(render);
