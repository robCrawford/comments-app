import { all, call, put, takeEvery } from 'redux-saga/effects';

export const apiCall = () => new Promise(res => setTimeout(() => res(Math.floor(Math.random() * 10) + 100), 1500));

function* init() {
  console.log('init');
  yield undefined;
}

// Worker Saga
export function* setFromApi() {
  yield put({ type: 'LOADING' });
  const result = yield call(apiCall);
  yield put({ type: 'SET', 'payload': result });
  yield put({ type: 'CLEAR_LOADING' });
}

// Watcher Saga
function* watchSetFromApi() {
  yield takeEvery('SET_FROM_API', setFromApi);
}

export default function* rootSaga() {
  yield all([
    init(),
    watchSetFromApi()
  ]);
}
