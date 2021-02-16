/*eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { counterSelector } from './counter-redux';

const Counter = ({ onIncrement, onDecrement, onIncrementAsync }) => {
  const { count, loading } = useSelector(counterSelector);

  return (<div>
    <button onClick={onIncrementAsync}>
      { loading ? 'Loading...' : 'Sync' }
    </button>
    <button onClick={onIncrement}>
      Increment
    </button>
    <button onClick={onDecrement}>
      Decrement
    </button>
    <hr />
    <div>
      Counter: {count}
    </div>
  </div>);
};

export default Counter;
