import 'babel-polyfill';
import React from 'react';
import { shallow } from 'enzyme';
// import {runSaga} from 'redux-saga';
import Counter from './Counter';

import { put, call } from 'redux-saga/effects';
import { incrementAsync, delay } from './sagas';

// https://dev.to/phil/the-best-way-to-test-redux-sagas-4hib
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

describe('incrementAsync Saga', () => {
  const gen = incrementAsync();

  it ('must call delay(1000)', () => {
    expect(gen.next().value).toEqual(call(delay, 1000));
  });

  it ('must then dispatch an INCREMENT action', () => {
    expect(gen.next().value).toEqual(put({type: 'INCREMENT'}));
  });

  it ('must then be done', () => {
    expect(gen.next()).toEqual({ done: true, value: undefined });
  });

});

