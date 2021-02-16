import 'babel-polyfill';

import { put, call } from 'redux-saga/effects';
import { sync } from './counter-saga';
import { fetchCounter } from '../services/counter';
import { appActions } from '../app/app-redux';
import { counterActions } from './counter-redux';

describe('sync Saga', () => {
  const gen = sync();

  it ('should fetch and set counter', () => {
    expect(gen.next().value).toEqual(put({type: appActions.LOADING_START}));
    expect(gen.next().value).toEqual(call(fetchCounter));
    expect(gen.next().value).toEqual(put({type: counterActions.SET}));
    expect(gen.next().value).toEqual(put({type: appActions.LOADING_END}));
    expect(gen.next()).toEqual({ done: true });
  });
});
