export const counterActions = {
  SET: 'counter/SET',
  INCREMENT: 'counter/INCREMENT',
  DECREMENT: 'counter/DECREMENT',
  SYNC: 'counter/SYNC'
};

const initialState = {
  count: 0
};

export function counterReducer( state = initialState, { type, payload } ) {
  switch (type) {
    case counterActions.SET: {
      return {
        ...state,
        count: Number(payload)
      };
    }
    case counterActions.INCREMENT: {
      return {
        ...state,
        count: state.count + 1
      };
    }
    case counterActions.DECREMENT: {
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
export const setCounter = (payload) => ({type: counterActions.SET, payload});
export const incrementCounter = () => ({type: counterActions.INCREMENT});
export const decrementCounter = () => ({type: counterActions.DECREMENT});
export const syncCounter = () => ({type: counterActions.SYNC});

// Selectors
export const counterSelector = ({ counter }) => ({
  count: counter.count,
  loading: counter.loading
});
