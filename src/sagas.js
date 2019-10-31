import { all, put, takeEvery } from 'redux-saga/effects';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* init() {
  console.log('init');
  yield undefined; // Just here for eslint
}

// Worker Saga
function* incrementAsync() {
  yield delay(1000);
  yield put({ type: 'INCREMENT' });
}

// Watcher Saga
function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

export default function* rootSaga() {
  yield all([
    init(),
    watchIncrementAsync()
  ]);
}
