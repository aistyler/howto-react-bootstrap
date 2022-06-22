/* eslint-disable @typescript-eslint/ban-ts-comment */
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { AnyAction, combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { reducers } from '../../reducers';
import { middlewares } from '../../middlewares';
import {
  hydroApi,
  STORE_KEY_HYDRO_API,
  STORE_KEY_UNI_POSTS,
} from '@howto/rtk-rest-api';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: [STORE_KEY_HYDRO_API, STORE_KEY_UNI_POSTS],
};

const combinedReducer = combineReducers(reducers);
export type AppState = ReturnType<typeof combinedReducer>;

const rootReducer = (state: AppState, action: AnyAction): AppState => {
  if(action.type === 'RESET_APP') state = {} as AppState;
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer as typeof combinedReducer),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // If using Redux-Persist, you should specifically ignore all the action types it dispatches:
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(...middlewares),
});

export const persistor = persistStore(store);
export const pergeStore = () => persistor.purge();

export const getAppState = (): AppState => store.getState() as AppState;

export const resetApiStore = async () => {
  store.dispatch(hydroApi.util.resetApiState());
  persistor.purge();
};

export const resetStore = () => {
  store.dispatch({ type: 'RESET_APP' });
  persistor.purge();
}

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
