/*eslint-disable no-unused-vars */
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { appSelector } from '../app/app-redux';
import { counterSelector } from './counter-redux';

type Props = {
  onIncrement: () => void;
  onDecrement: () => void;
  onSync: () => void;
};

const Counter: FC<Props> = ({ onIncrement, onDecrement, onSync }) => {
  const { count } = useSelector(counterSelector);
  const { loading } = useSelector(appSelector);
  const handleIncrement = (): void => {
    !loading && onIncrement();
  };
  const handleDecrement = (): void => {
    !loading && onDecrement();
  };
  const handleSync = (): void => {
    !loading && onSync();
  };

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
