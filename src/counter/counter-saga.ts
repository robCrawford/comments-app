import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import { appActionTypes } from '../app/app-redux';
import { fetchCounter } from '../services/counter';
import { setCounter, counterActionTypes } from './counter-redux';

// Worker Saga
export function* sync(): Generator<StrictEffect, void, number> {
  yield put({ type: appActionTypes.LOADING_STARTED });
  const result = yield call(fetchCounter);
  yield put(setCounter(result));
  yield put({ type: appActionTypes.LOADING_ENDED });
}

// Watcher Saga
export function* watchSyncCounter(): Generator<StrictEffect, void> {
  yield takeEvery(counterActionTypes.SYNCED, sync);
}
