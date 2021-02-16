import 'babel-polyfill';

import { put, call } from 'redux-saga/effects';
import { sync } from './counter-saga';
import { fetchCounter } from '../services/counter';

describe('sync Saga', () => {
  const g = sync();

  it ('should fetch and set counter', () => {
    expect(g.next().value).toEqual(put({type: 'LOADING'}));
    expect(g.next().value).toEqual(call(fetchCounter));
    expect(g.next().value).toEqual(put({type: 'SET'}));
    expect(g.next().value).toEqual(put({type: 'CLEAR_LOADING'}));
    expect(g.next()).toEqual({ done: true });
  });
});
