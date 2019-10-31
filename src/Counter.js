/*eslint-disable no-unused-vars */
import React from "react";
import { Component, PropTypes } from 'prop-types';

const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync }) =>
  <div>
    <button onClick={onIncrementAsync}>
      Increment async
    </button>
    {' '}
    <button onClick={onIncrement}>
      Increment
    </button>
    {' '}
    <button onClick={onDecrement}>
      Decrement
    </button>
    <hr />
    <div>
      Counter: {value}
    </div>
  </div>;

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onIncrementAsync: PropTypes.func.isRequired
};

export default Counter;
