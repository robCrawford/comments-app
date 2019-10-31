import { put, call } from 'redux-saga/effects';
import { sync } from './counter-saga';
import { fetchCounter } from '../services/counter';
import { appActionTypes } from '../app/app-redux';
import { counterActionTypes } from './counter-redux';

describe('sync Saga', () => {
  const gen = sync();

  it ('should fetch and set counter', () => {
    expect(gen.next().value).toEqual(put({type: appActionTypes.LOADING_STARTED}));
    expect(gen.next().value).toEqual(call(fetchCounter));
    expect(gen.next().value).toEqual(put({type: counterActionTypes.UPDATED}));
    expect(gen.next().value).toEqual(put({type: appActionTypes.LOADING_ENDED}));
    expect(gen.next()).toEqual({ done: true });
  });
});
