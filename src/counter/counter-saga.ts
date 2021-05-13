import { SagaIterator, TakeableChannel } from '@redux-saga/core';
import { actionChannel, call, put, SagaReturnType, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { endLoading, startLoading } from '../app/app-redux';
import { fetchCounter, testWait } from '../services/counter';
import { setCounter, counterActionTypes, SyncCounterAction } from './counter-redux';

/* --------------------------------------
  If you say return type is
    `Generator<StrictEffect, number>`

  Then there is a hidden third argument of `unknown` for the `next()` input type.
  This blocks you from using `SagaReturnType` which has the logic to infer the true return type from the library.
  ```
  const result: SagaReturnType<typeof fetchCounter> = (yield call(fetchCounter, action.payload.id));
  //    ^^^^^^ Type 'unknown' is not assignable to type 'number'.
  ```
   -------------------------------------- */

// Saga called by worker saga `yield call`
export function* getCounterData(action: SyncCounterAction): SagaIterator<number>{
  yield call(testWait, 1000);
  const count: SagaReturnType<typeof fetchCounter> = (yield call(fetchCounter, action.payload.id));
  return count;
}

// Worker Saga
export function* sync(action: SyncCounterAction): SagaIterator<SagaReturnType<typeof endLoading>> {
  yield put(startLoading());
  const result: SagaReturnType<typeof getCounterData> = yield call(getCounterData, action);
  yield put(setCounter(result));
  // Just returning for a `put` result example
  const endLoadingAction: SagaReturnType<typeof endLoading> = yield put(endLoading());
  // console.warn('endLoadingAction', endLoadingAction);
  return endLoadingAction;
}

// Watcher Saga
export const watchSyncCounter = watchSyncCounterChannelSeries;

/* --------------------------------------
    Test implementations for Watcher Saga
   -------------------------------------- */
export function* watchSyncCounterParallelEvery(): SagaIterator<void> {
  // All workers run to completion, in parallel
  yield takeEvery(counterActionTypes.SYNCED, sync);
}

export function* watchSyncCounterParallelLatest(): SagaIterator<void> {
  // Only last worker runs to completion
  // All calls run in parallel but only last result is passed to `const result`
  yield takeLatest(counterActionTypes.SYNCED, sync);
}

export function* watchSyncCounterParallelChannel(): SagaIterator<void> {
  // Same as watchSyncCounterParallelLatest - actionChannel is not used?
  // "You can also pass in a channel as argument and the behaviour is the same as takeLatest(pattern, saga)."
  // https://redux-saga.js.org/docs/api/#takelatestchannel-saga-args
  const requestChannel = (yield actionChannel(counterActionTypes.SYNCED)) as TakeableChannel<SyncCounterAction>;
  yield takeLatest(requestChannel, sync);
}

export function* watchSyncCounterChannelSeries(): SagaIterator<void> {
  // Each worker runs to completion in series
  const requestChannel = (yield actionChannel(counterActionTypes.SYNCED)) as TakeableChannel<SyncCounterAction>;
  while (true) {
    const action = (yield take(requestChannel)) as SyncCounterAction;
    if (action.payload) {
      yield call(sync, action);
    }
  }
}

export function* watchSyncCounterAfterDelayChannel(): SagaIterator<void> {
  // Without the actionChannel, this listener isn't created in time to catch any actions
  const requestChannel = (yield actionChannel(counterActionTypes.SYNCED)) as TakeableChannel<SyncCounterAction>;
  yield call(testWait, 5000);
  yield takeLatest(requestChannel, sync);
}
