import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { all, fork } from 'redux-saga/effects';

import { appReducer } from './app/app-redux';
import { init } from './app/app-saga';
import Counter from './counter/Counter';
import Comments from './comments/Comments';
import { counterReducer, incrementCounter, decrementCounter, syncCounter } from './counter/counter-redux';
import { watchSyncCounter } from './counter/counter-saga';
import { Provider } from 'react-redux';
import { commentAdded, commentsReducer } from './comments/comments-redux';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  app: appReducer,
  counter: counterReducer,
  comments: commentsReducer
});
const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(sagaMiddleware),
));

function* rootSaga(): Generator {
  console.warn('rootSaga start');
  yield all([
    init(), // Delay, resolves after 1s
    fork(watchSyncCounter)
  ]);
  console.warn('rootSaga generator is done');
}
sagaMiddleware.run(rootSaga);

function render(): void {
  ReactDOM.render(
    <Provider store={store}>
      <Counter
        onIncrement={(): void => {
          store.dispatch(incrementCounter());
        }}
        onDecrement={(): void => {
          store.dispatch(decrementCounter());
        }}
        onSync={(id: number): void => {
          store.dispatch(syncCounter(id));
        }}
      />
      <hr />
      <h4>Comments</h4>
      <Comments
        onSubmit={(comment): void => {
          store.dispatch(commentAdded(comment));
        }}
      />
    </Provider>,
    document.getElementById('root')
  );
}

render();
store.subscribe(render);
