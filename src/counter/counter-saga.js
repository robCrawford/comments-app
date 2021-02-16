import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchCounter } from '../services/counter';

// Worker Saga
export function* sync() {
  yield put({ type: 'LOADING' });
  const result = yield call(fetchCounter);
  yield put({ type: 'SET', 'payload': result });
  yield put({ type: 'CLEAR_LOADING' });
}

// Watcher Saga
export function* watchSyncCounter() {
  yield takeEvery('SYNC_COUNTER', sync);
}

