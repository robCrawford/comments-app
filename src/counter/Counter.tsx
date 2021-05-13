/*eslint-disable no-unused-vars */
import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { appSelector } from '../app/app-redux';
import { counterSelector } from './counter-redux';

type Props = {
  onIncrement: () => void;
  onDecrement: () => void;
  onSync: (n: number) => void;
};

let syncId = 1;

const Counter: FC<Props> = ({ onIncrement, onDecrement, onSync }) => {
  const { count } = useSelector(counterSelector);
  const { loading } = useSelector(appSelector);

  useEffect(() => {
    // Test many sagas series/parallel
    onSync(syncId++);
    onSync(syncId++);
    onSync(syncId++);
    onSync(syncId++);
  }, []);

  const handleIncrement = (): void => {
    !loading && onIncrement();
  };
  const handleDecrement = (): void => {
    !loading && onDecrement();
  };
  const handleSync = (): void => {
    if (!loading) {
      onSync(syncId++);
    }
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
