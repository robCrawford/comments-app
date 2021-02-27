export const appActions = {
  LOADING_STARTED: 'app/LOADING_STARTED',
  LOADING_ENDED: 'app/LOADING_ENDED',
};

const initialState = {
  loading: false
};

export const appReducer = (state = initialState, { type }) => {
  switch (type) {
    case appActions.LOADING_STARTED:
      return {
        ...state,
        loading: true
      };
    case appActions.LOADING_ENDED:
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
