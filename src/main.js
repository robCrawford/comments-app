import "babel-polyfill";

import React from "react";
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import Counter from './Counter';
import reducer from './reducers';
import rootSaga from './sagas';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(sagaMiddleware),
));

sagaMiddleware.run(rootSaga);

function render() {
  const { count, loading } = store.getState();

  ReactDOM.render(
    <Counter
      value={count}
      loading={loading}
      onIncrement={() => store.dispatch({type: 'INCREMENT'})}
      onDecrement={() => store.dispatch({type: 'DECREMENT'})}
      onIncrementAsync={() => store.dispatch({type: 'SET_FROM_API'})} />,
    document.getElementById('root')
  );
}

render();
store.subscribe(render);
