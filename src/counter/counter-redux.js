export const counterActions = {
  UPDATED: 'counter/UPDATED',
  INCREMENTED: 'counter/INCREMENTED',
  DECREMENTED: 'counter/DECREMENTED',
  SYNCED: 'counter/SYNCED'
};

const initialState = {
  count: 0
};

export function counterReducer( state = initialState, { type, payload } ) {
  switch (type) {
    case counterActions.UPDATED: {
      return {
        ...state,
        count: Number(payload)
      };
    }
    case counterActions.INCREMENTED: {
      return {
        ...state,
        count: state.count + 1
      };
    }
    case counterActions.DECREMENTED: {
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
export const setCounter = (payload) => ({type: counterActions.UPDATED, payload});
export const incrementCounter = () => ({type: counterActions.INCREMENTED});
export const decrementCounter = () => ({type: counterActions.DECREMENTED});
export const syncCounter = () => ({type: counterActions.SYNCED});

// Selectors
export const counterSelector = ({ counter }) => ({
  count: counter.count,
  loading: counter.loading
});
