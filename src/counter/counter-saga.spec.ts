import { put, call } from 'redux-saga/effects';
import { getCounterData, sync } from './counter-saga';
import { endLoading, startLoading } from '../app/app-redux';
import { counterActionTypes, setCounter, syncCounter } from './counter-redux';
import { fetchCounter, testWait } from '../services/counter';

describe('sync Saga', () => {
  it ('should fetch and set counter', () => {
    const gen = sync({ type: counterActionTypes.SYNCED, payload: { id: 1 }});
    expect(gen.next().value).toEqual(put(startLoading()));
    expect(gen.next().value).toEqual(call(getCounterData, syncCounter(1)));
    expect(gen.next(101).value).toEqual(put(setCounter(101)));
    expect(gen.next().value).toEqual(put(endLoading()));
    expect(gen.next()).toEqual({ done: true });
  });
});

describe('getCounterData Saga', () => {
  it ('should fetch counter data', () => {
    const gen = getCounterData({ type: counterActionTypes.SYNCED, payload: { id: 1 }});
    expect(gen.next().value).toEqual(call(testWait, 1000));
    expect(gen.next().value).toEqual(call(fetchCounter, 1));
    expect(gen.next()).toEqual({ done: true });
  });
});
