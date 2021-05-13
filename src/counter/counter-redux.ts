import { Action } from 'redux';
import { PayloadAction } from '../../contracts/Redux';

export const counterActionTypes = {
  UPDATED: 'counter/UPDATED',
  INCREMENTED: 'counter/INCREMENTED',
  DECREMENTED: 'counter/DECREMENTED',
  SYNCED: 'counter/SYNCED'
} as const;

type CounterState = {
  count: number;
};

export type CounterModuleState = {
  counter: CounterState;
};

export type SetCounterAction = PayloadAction<number, typeof counterActionTypes.UPDATED>;
export type IncrementCounterAction = Action<typeof counterActionTypes.INCREMENTED>;
export type DecrementCounterAction = Action<typeof counterActionTypes.DECREMENTED>;
export type SyncCounterAction = PayloadAction<{ id: number }, typeof counterActionTypes.SYNCED>;

export type CounterAction =
  | SetCounterAction
  | IncrementCounterAction
  | DecrementCounterAction
  | SyncCounterAction;

const initialState: CounterState = {
  count: 0
};

export function counterReducer( state = initialState, action: CounterAction ): CounterState {
  const { type } = action;

  switch (type) {
    case counterActionTypes.UPDATED: {
      return ('payload' in action && typeof action.payload === 'number') ? {
        ...state,
        count: action.payload
      }: state;
    }
    case counterActionTypes.INCREMENTED: {
      return {
        ...state,
        count: state.count + 1
      };
    }
    case counterActionTypes.DECREMENTED: {
      return {
        ...state,
        count: state.count - 1
      };
    }
    default: {
      return state;
    }
  }
}

// Action Creators
export function setCounter(payload: number): SetCounterAction {
  return { type: counterActionTypes.UPDATED, payload };
}
export function incrementCounter(): IncrementCounterAction {
  return { type: counterActionTypes.INCREMENTED };
}
export function decrementCounter(): DecrementCounterAction {
  return { type: counterActionTypes.DECREMENTED };
}
export function syncCounter(id: number): SyncCounterAction {
  return { type: counterActionTypes.SYNCED, payload: { id } };
}

// Selectors
export function counterSelector({ counter }: CounterModuleState): { count: number } {
  return { count: counter.count };
}
