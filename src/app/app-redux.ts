import { Action } from 'redux';
import { ValueOf } from 'contracts/Utils';

export const appActionTypes = {
  LOADING_STARTED: 'app/LOADING_STARTED',
  LOADING_ENDED: 'app/LOADING_ENDED',
} as const;

type AppState = {
  loading: boolean;
};

export type AppModuleState = {
  app: AppState;
};

type AppActionType = ValueOf<typeof appActionTypes>;

type AppAction = Action<AppActionType>;

const initialState: AppState = {
  loading: false
};

export const appReducer = (state = initialState, { type }: AppAction): AppState => {
  switch (type) {
    case appActionTypes.LOADING_STARTED:
      return {
        ...state,
        loading: true
      };
    case appActionTypes.LOADING_ENDED:
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
export const appSelector = ({ app }: AppModuleState): {
  loading: boolean;
} => ({
  loading: app.loading
});
