import { call, put, takeEvery } from 'redux-saga/effects';
import { appActions } from '../app/app-redux';
import { fetchCounter } from '../services/counter';
import { setCounter, counterActions } from './counter-redux';

// Worker Saga
export function* sync() {
  yield put({ type: appActions.LOADING_STARTED });
  const result = yield call(fetchCounter);
  yield put(setCounter(result));
  yield put({ type: appActions.LOADING_ENDED });
}

// Watcher Saga
export function* watchSyncCounter() {
  yield takeEvery(counterActions.SYNCED, sync);
}
