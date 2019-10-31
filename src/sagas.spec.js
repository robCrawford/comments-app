// import test from 'tape';


// https://dev.to/phil/the-best-way-to-test-redux-sagas-4hib
// import {runSaga} from 'redux-saga';

// async function recordSaga(saga, initialAction) {
//   const dispatched = [];

//   await runSaga(
//     {
//       dispatch: (action) => dispatched.push(action)
//     },
//     saga,
//     initialAction
//   ).done;

//   return dispatched;
// }



/* import { put, call } from 'redux-saga/effects';
import { incrementAsync, delay } from './sagas';

test('incrementAsync Saga test', (assert) => {
  const gen = incrementAsync();

  assert.deepEqual(
    gen.next().value,
    call(delay, 1000),
    'incrementAsync Saga must call delay(1000)'
  );

  assert.deepEqual(
    gen.next().value,
    put({type: 'INCREMENT'}),
    'incrementAsync Saga must dispatch an INCREMENT action'
  );

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
    'incrementAsync Saga must be done'
  );

  assert.end();
}); */

import React from 'react';
import { shallow } from 'enzyme';
import Counter from './Counter';

describe('Counter', () => {
  it('should render', () => {
    const component = shallow(<Counter
      value={0}
      onIncrement={() => {}}
      onDecrement={() => {}}
      onIncrementAsync={() => {}} />);

    expect(component).toMatchSnapshot();
  });
});

