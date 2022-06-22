import { AnyAction, combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { reducers } from '../../reducers';
import { middlewares } from '../../middlewares';

const combinedReducer = combineReducers(reducers);
export type AppState = ReturnType<typeof combinedReducer>;

const rootReducer = (state: AppState, action: AnyAction): AppState => {
  if(action.type === 'RESET_APP') state = {} as AppState;
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer as typeof combinedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(...middlewares),
});


export const resetApiStore = () => {
  store.dispatch({ type: 'RESET_APP' });
};

export const getAppState = (): AppState => store.getState() as AppState;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
