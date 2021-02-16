export const appActions = {
  LOADING_START: 'app/LOADING_START',
  LOADING_END: 'app/LOADING_END',
};

const initialState = {
  loading: false
};

export const appReducer = (state = initialState, { type }) => {
  switch (type) {
    case appActions.LOADING_START:
      return {
        ...state,
        loading: true
      };
    case appActions.LOADING_END:
      return {
        ...state,
        loading: false
      };
    default: {
      return state;
    }
  }
};

// Selectors
export const appSelector = ({ app }) => ({
  loading: app.loading
});
