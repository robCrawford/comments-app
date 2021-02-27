/*eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { appSelector } from "../app/app-redux";
import { counterSelector } from './counter-redux';

const Counter = ({ onIncrement, onDecrement, onSync }) => {
  const { count } = useSelector(counterSelector);
  const { loading } = useSelector(appSelector);
  const handleIncrement = () => !loading && onIncrement();
  const handleDecrement = () => !loading && onDecrement();
  const handleSync = () => !loading && onSync();

  return (<div>
    <button onClick={handleIncrement}>
      Increment
    </button>
    <button onClick={handleDecrement}>
      Decrement
    </button>
    <button onClick={handleSync}>
      { loading ? 'Loading...' : 'Sync' }
    </button>
    <p>
      Counter: {count}
    </p>
  </div>);
};

export default Counter;
