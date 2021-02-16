const initialState = {
  count: 0,
  loading: false
};

export const incrementCounter = () => ({type: 'INCREMENT'});
export const decrementCounter = () => ({type: 'DECREMENT'});
export const syncCounter = () => ({type: 'SYNC_COUNTER'});

export const counterSelector = state => ({
  count: state.count,
  loading: state.loading
});

export function counterReducer( state = initialState, { type, payload } ) {
  switch (type) {
    case 'SET':
      return {
        ...state,
        count: Number(payload)
      };
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      };
    case 'LOADING':
      return {
        ...state,
        loading: true
      };
    case 'CLEAR_LOADING':
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
