import { Action } from 'redux';
import { PayloadAction } from '../../contracts/Redux';
import { ValueOf } from '../../contracts/Utils';

export const counterActionTypes = {
  UPDATED: 'counter/UPDATED',
  INCREMENTED: 'counter/INCREMENTED',
  DECREMENTED: 'counter/DECREMENTED',
  SYNCED: 'counter/SYNCED'
} as const;

type CounterState = {
  count: number;
  loading: boolean;
};

export type CounterModuleState = {
  counter: CounterState;
};

type CounterActionType = ValueOf<typeof counterActionTypes>;

type CounterAction =
  | Action<CounterActionType>
  | PayloadAction<number, CounterActionType>;


const initialState: CounterState = {
  count: 0,
  loading: false
};

export function counterReducer( state = initialState, action: CounterAction ): CounterState {
  const { type } = action;

  switch (type) {
    case counterActionTypes.UPDATED: {
      if ('payload' in action) {
        return {
          ...state,
          count: action.payload
        };
      }
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
export const setCounter = (payload: number): PayloadAction<number, CounterActionType> =>
  ({type: counterActionTypes.UPDATED, payload});
export const incrementCounter = (): Action<CounterActionType> => ({type: counterActionTypes.INCREMENTED});
export const decrementCounter = (): Action<CounterActionType> => ({type: counterActionTypes.DECREMENTED});
export const syncCounter = (): Action<CounterActionType> => ({type: counterActionTypes.SYNCED});

// Selectors
export const counterSelector = ({ counter }: CounterModuleState): {
  count: number;
  loading: boolean;
} => ({
  count: counter.count,
  loading: counter.loading
});
